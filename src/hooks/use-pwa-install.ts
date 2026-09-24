import { useState, useEffect, useCallback, useRef } from "react";

/**
 * PWA Installation detection and management hook.
 * Handles cross-platform PWA installation detection and native prompt management.
 */

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: readonly string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PWAInstallState {
  /** Whether the PWA can be installed (native prompt available) */
  isInstallable: boolean;
  /** Whether the app is running in standalone/installed mode */
  isInstalled: boolean;
  /** Whether the user is on iOS/iPadOS */
  isIOS: boolean;
  /** Whether the user is on a supported platform but PWA installation is not available */
  isUnsupported: boolean;
  /** The deferred beforeinstallprompt event */
  deferredPrompt: BeforeInstallPromptEvent | null;
  /** Platform-specific installation instructions */
  installInstructions: string | null;
}

export interface PWAInstallActions {
  /** Trigger the native installation prompt */
  promptInstall: () => Promise<boolean>;
  /** Dismiss the install banner */
  dismissBanner: () => void;
  /** Check if banner was permanently dismissed */
  wasBannerDismissed: () => boolean;
}

export type UsePWAInstallReturn = PWAInstallState & PWAInstallActions;

const DISMISSED_PERMANENTLY_KEY = "octri-pwa-banner-dismissed-permanently";

export function usePWAInstall(): UsePWAInstallReturn {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isUnsupported, setIsUnsupported] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installInstructions, setInstallInstructions] = useState<string | null>(null);
  const promptHandledRef = useRef(false);

  // Detect iOS/iPadOS
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);
  }, []);

  // Detect if already running as installed PWA
  useEffect(() => {
    const checkInstalled = () => {
      // Check display-mode media query (works on all platforms)
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      // Check iOS standalone (legacy)
      const isIOSStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
      // Check for minimal-ui or fullscreen modes
      const isMinimalUI = window.matchMedia("(display-mode: minimal-ui)").matches;
      const isFullscreen = window.matchMedia("(display-mode: fullscreen)").matches;

      const installed = isStandalone || isIOSStandalone || isMinimalUI || isFullscreen;
      setIsInstalled(installed);
    };

    checkInstalled();

    // Listen for display-mode changes (e.g., user installs app while site is open)
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handler = () => checkInstalled();
    mediaQuery.addEventListener?.("change", handler);

    return () => mediaQuery.removeEventListener?.("change", handler);
  }, []);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser prompt (we'll show our own banner)
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);
      setIsUnsupported(false);
      setInstallInstructions(null); // Clear fallback instructions when native prompt available
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setInstallInstructions(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Check if installation is supported but no prompt fired yet
    // This can happen if the user already dismissed the prompt or doesn't meet engagement criteria
    const checkSupport = () => {
      // If not iOS and not already installed, check if PWA is theoretically supported
      if (!isIOS && !isInstalled) {
        // Modern Chromium-based browsers support PWA installation
        const isChromium = /Chrome|Edg|Opera|Brave|Vivaldi/.test(navigator.userAgent);
        const isFirefox = /Firefox/.test(navigator.userAgent);
        const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

        if (isChromium || isFirefox) {
          // These browsers support PWA installation
          // We'll wait for beforeinstallprompt - DO NOT show fallback instructions
          // The banner will only show when isInstallable becomes true
        } else if (isSafari && !isIOS) {
          // Desktop Safari - limited PWA support
          setIsUnsupported(true);
        } else {
          // Unknown/unsupported browser
          setIsUnsupported(true);
        }
      }
    };

    checkSupport();

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [isIOS, isInstalled]);

  // Handle iOS-specific installation instructions
  useEffect(() => {
    if (isIOS && !isInstalled) {
      setIsInstallable(false);
      setIsUnsupported(false);
      setInstallInstructions("Tap the Share button □↗ then 'Add to Home Screen' to install OCTRI");
    }
  }, [isIOS, isInstalled]);

  // Check if banner was permanently dismissed
  const wasBannerDismissed = useCallback((): boolean => {
    try {
      return localStorage.getItem(DISMISSED_PERMANENTLY_KEY) === "true";
    } catch {
      return false;
    }
  }, []);

  // Dismiss banner permanently
  const dismissBanner = useCallback(() => {
    try {
      localStorage.setItem(DISMISSED_PERMANENTLY_KEY, "true");
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Trigger native installation prompt
  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt || promptHandledRef.current) {
      return false;
    }

    promptHandledRef.current = true;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      } else {
        // User dismissed the native prompt
        // Don't show it again automatically
        setDeferredPrompt(null);
        setIsInstallable(false);
        return false;
      }
    } catch (error) {
      console.error("PWA installation prompt failed:", error);
      return false;
    } finally {
      promptHandledRef.current = false;
    }
  }, [deferredPrompt]);

  return {
    isInstallable,
    isInstalled,
    isIOS,
    isUnsupported,
    deferredPrompt,
    installInstructions,
    promptInstall,
    dismissBanner,
    wasBannerDismissed,
  };
}