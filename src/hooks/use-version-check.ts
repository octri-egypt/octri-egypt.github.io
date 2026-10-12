import { useEffect, useState, useCallback, useRef } from "react";

export interface VersionInfo {
  version: string;
  buildTime: string;
  gitCommit: string;
  gitCommitDate: string;
  buildId: string;
}

export interface VersionCheckState {
  /** Whether a new version is available */
  updateAvailable: boolean;
  /** The latest version info from the server */
  latestVersion: VersionInfo | null;
  /** The current version info (from initial load) */
  currentVersion: VersionInfo | null;
  /** Whether a check is in progress */
  checking: boolean;
  /** Error message if check failed */
  error: string | null;
}

const VERSION_STORAGE_KEY = "octri-version-info";
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function useVersionCheck(): VersionCheckState & {
  checkNow: () => Promise<void>;
  dismissUpdate: () => void;
} {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState<VersionInfo | null>(null);
  const [currentVersion, setCurrentVersion] = useState<VersionInfo | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(true);
  // One-time localStorage initialization guard. Re-setting state from storage on
  // every effect run creates a new object identity, recreates `checkNow` via
  // useCallback, and re-runs this effect forever — an infinite fetch/render
  // loop that starved React's scheduler and broke SPA navigation rendering.
  const initializedRef = useRef(false);

  // Fetch version.json from the server
  const fetchVersion = useCallback(async (): Promise<VersionInfo | null> => {
    try {
      // Add cache-busting query parameter to ensure we get fresh data
      const response = await fetch(`/version.json?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data as VersionInfo;
    } catch (err) {
      console.warn("Version check failed:", err);
      return null;
    }
  }, []);

  // Check for updates
  const checkNow = useCallback(async () => {
    if (checking || !mountedRef.current) return;

    setChecking(true);
    setError(null);

    const version = await fetchVersion();

    if (!mountedRef.current) {
      setChecking(false);
      return;
    }

    if (version) {
      // If we don't have a current version yet, this is the first check
      // Store it as the current version
      if (!currentVersion) {
        setCurrentVersion(version);
        setLatestVersion(version);
        try {
          localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(version));
        } catch {
          // Ignore storage errors
        }
      } else {
        // Compare buildId to detect new deployment.
        // Only touch state when the build actually changed — setting state
        // with a fresh (identical-content) object on every poll recreated
        // `checkNow` via useCallback, re-running this effect and fetching
        // version.json in an infinite loop that starved React's scheduler
        // and broke client-side navigation rendering.
        if (version.buildId !== currentVersion.buildId) {
          setLatestVersion(version);
          setUpdateAvailable(true);
        }
      }
    } else {
      setError("Failed to fetch version info");
    }

    setChecking(false);
  }, [fetchVersion, currentVersion]);

  // Dismiss the update notification
  const dismissUpdate = useCallback(() => {
    setUpdateAvailable(false);
    // Update current version to latest so we don't keep notifying
    if (latestVersion) {
      setCurrentVersion(latestVersion);
      try {
        localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(latestVersion));
      } catch {
        // Ignore storage errors
      }
    }
  }, [latestVersion]);

  // Initial version check and setup periodic checks
  useEffect(() => {
    mountedRef.current = true;

    // Try to load stored version from localStorage (once per mount)
    if (!initializedRef.current) {
      initializedRef.current = true;
      try {
        const stored = localStorage.getItem(VERSION_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as VersionInfo;
          setCurrentVersion(parsed);
        }
      } catch {
        // Ignore storage errors
      }
    }

    // Initial check
    checkNow();

    // Set up periodic checking
    intervalRef.current = setInterval(checkNow, CHECK_INTERVAL);

    // Also check on visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkNow();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkNow]);

  return {
    updateAvailable,
    latestVersion,
    currentVersion,
    checking,
    error,
    checkNow,
    dismissUpdate,
  };
}