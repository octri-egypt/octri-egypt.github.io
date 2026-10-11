import { useEffect, useState } from "react";
import { RefreshCw, X } from "lucide-react";

/**
 * Service Worker Update Toast Component
 *
 * Listens for the `sw-update-available` event dispatched when a new
 * service worker version is installed and ready to activate.
 * Shows a dismissible toast prompting the user to reload for the latest version.
 */
export function SWUpdateToast() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => {
      setShowToast(true);
    };

    // Listen for the custom event dispatched in main.tsx
    window.addEventListener("sw-update-available", handleUpdateAvailable);

    // Also listen for the controllerchange event as a fallback
    // This fires when the active service worker changes
    const handleControllerChange = () => {
      // Only show if we already had a controller (not first load)
      if (navigator.serviceWorker.controller) {
        setShowToast(true);
      }
    };

    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    return () => {
      window.removeEventListener("sw-update-available", handleUpdateAvailable);
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    };
  }, []);

  const handleReload = () => {
    // Reload the page to activate the new service worker
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowToast(false);
  };

  if (!showToast) {
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
                  Update Available
                </h3>
                <p className="text-xs text-muted-foreground">
                  A new version of OCTRI is ready. Reload to get the latest features.
                </p>
              </div>
              <button
                onClick={handleDismiss}
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
              >
                <RefreshCw className="w-4 h-4 mr-1.5" aria-hidden="true" />
                Reload Now
              </button>
              <button
                onClick={handleDismiss}
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