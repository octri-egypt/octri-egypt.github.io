import { useVersionCheck } from "@/hooks/use-version-check";
import { RefreshCw, X, Loader2 } from "lucide-react";

/**
 * Version Update Toast Component
 *
 * Uses the useVersionCheck hook to periodically check for new deployments
 * by fetching version.json and comparing buildId.
 * Shows a dismissible toast when a new version is detected.
 */
export function VersionUpdateToast() {
  const {
    updateAvailable,
    latestVersion,
    checking,
    dismissUpdate,
  } = useVersionCheck();

  const handleReload = () => {
    window.location.reload();
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-fade-up"
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto px-6 pb-6">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-card backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-foreground">
                  New Version Available
                </h3>
                <p className="text-xs text-muted-foreground">
                  A new deployment is ready. Reload to get the latest updates.
                </p>
                {latestVersion && (
                  <p className="text-[10px] text-muted-foreground/70 mt-1 font-mono">
                    Build: {latestVersion.buildId}
                  </p>
                )}
              </div>
              <button
                onClick={dismissUpdate}
                className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Dismiss update notification"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={handleReload}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-smooth"
                disabled={checking}
              >
                {checking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" aria-hidden="true" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-1.5" aria-hidden="true" />
                    Reload Now
                  </>
                )}
              </button>
              <button
                onClick={dismissUpdate}
                className="px-4 py-2.5 rounded-xl border border-border bg-background/50 text-sm font-medium text-foreground hover:bg-background transition-smooth"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}