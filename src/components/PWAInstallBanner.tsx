import { useEffect, useState } from "react";
import { X, Download, Smartphone, Share2 } from "lucide-react";
import { usePWAInstall } from "@/hooks/use-pwa-install";

/**
 * PWA Installation Banner Component
 *
 * Platform-aware installation banner that appears at the bottom of the page.
 * Shows different UI based on platform capabilities:
 * - Android/Chromium: Native install button triggering beforeinstallprompt
 * - iOS/iPadOS: Instructions for "Share → Add to Home Screen"
 * - Desktop: Native install button or browser menu instructions
 * - Unsupported: No banner shown
 *
 * Respects user dismissal and doesn't show when already installed.
 */
export function PWAInstallBanner() {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isUnsupported,
    installInstructions,
    promptInstall,
    dismissBanner,
    wasBannerDismissed,
  } = usePWAInstall();

  const [showBanner, setShowBanner] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Determine if we should show the banner
  useEffect(() => {
    // Don't show if already installed
    if (isInstalled) {
      setShowBanner(false);
      return;
    }

    // Don't show if permanently dismissed
    if (wasBannerDismissed()) {
      setShowBanner(false);
      return;
    }

    // Don't show if installation is unsupported
    if (isUnsupported) {
      setShowBanner(false);
      return;
    }

    // Show banner after a brief delay for better UX
    const timer = setTimeout(() => {
      if (isInstallable || isIOS || installInstructions) {
        setShowBanner(true);
        if (isIOS || installInstructions) {
          setShowInstructions(true);
        }
      }
    }, 5000); // 5 second delay

    return () => clearTimeout(timer);
  }, [isInstalled, isInstallable, isIOS, isUnsupported, installInstructions, wasBannerDismissed]);

  // Handle install button click
  const handleInstall = async () => {
    if (isIOS || installInstructions) {
      // On iOS or when only instructions available, show detailed instructions
      setShowInstructions(true);
      return;
    }

    const success = await promptInstall();
    if (success) {
      setShowBanner(false);
    }
  };

  // Handle dismiss
  const handleDismiss = (permanent = false) => {
    setShowBanner(false);
    if (permanent) {
      dismissBanner();
    }
  };

  // Don't render if not showing
  if (!showBanner) {
    return null;
  }

  // iOS / Instructional mode
  if (showInstructions) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 animate-fade-up"
        role="dialog"
        aria-label="Install OCTRI on iOS"
        aria-describedby="ios-install-instructions"
      >
        <div className="container mx-auto px-6 pb-6">
          <div className="max-w-md mx-auto">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Install OCTRI
                  </h3>
                  <p id="ios-install-instructions" className="mt-1 text-sm text-muted-foreground">
                    {isIOS
                      ? "Tap the Share button <Share2 className=\"inline w-3 h-3\" aria-hidden=\"true\" /> then <strong>\"Add to Home Screen\"</strong> to install OCTRI."
                      : installInstructions || "Use your browser's menu to install OCTRI."}
                  </p>
                </div>
                <button
                  onClick={() => handleDismiss(true)}
                  className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label="Dismiss installation banner"
                >
                  <X size={20} />
                </button>
              </div>

              {isIOS && (
                <div className="mt-4 p-3 bg-background/50 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Share2 className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="font-medium">Step by step:</span>
                  </div>
                  <ol className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 flex items-center justify-center text-[10px] font-medium bg-primary/20 text-primary rounded-full">
                        1
                      </span>
                      Tap the <strong>Share</strong> button (square with arrow up) at the bottom of Safari
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 flex items-center justify-center text-[10px] font-medium bg-primary/20 text-primary rounded-full">
                        2
                      </span>
                      Scroll down and tap <strong>"Add to Home Screen"</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 flex items-center justify-center text-[10px] font-medium bg-primary/20 text-primary rounded-full">
                        3
                      </span>
                      Tap <strong>"Add"</strong> in the top right corner
                    </li>
                  </ol>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background/50 text-sm font-medium text-foreground hover:bg-background transition-smooth"
                >
                  Got it
                </button>
                <button
                  onClick={() => handleDismiss(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-elegant hover:shadow-glow transition-smooth"
                >
                  Don't show again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard install banner (Android, Desktop Chromium, etc.)
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-fade-up"
      role="dialog"
      aria-label="Install OCTRI app"
    >
      <div className="container mx-auto px-6 pb-6">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-card backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Download className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-foreground">
                  Install OCTRI
                </h3>
                <p className="text-xs text-muted-foreground">
                  Get faster access and app-like experience
                </p>
              </div>
              <button
                onClick={() => handleDismiss(false)}
                className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Dismiss"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant hover:shadow-glow transition-smooth"
                disabled={!isInstallable}
              >
                <Download className="w-4 h-4 mr-1.5" aria-hidden="true" />
                Install
              </button>
              <button
                onClick={() => handleDismiss(true)}
                className="px-4 py-2.5 rounded-xl border border-border bg-background/50 text-sm font-medium text-foreground hover:bg-background transition-smooth"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}