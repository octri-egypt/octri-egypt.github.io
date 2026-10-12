import { useEffect, useRef } from "react";

/**
 * Site-wide Vanta WAVES background — exactly ONE instance for the whole app.
 *
 * A fixed, full-viewport layer at z-index -1 sits above the body's static
 * gradient fallback but below every page element, so scrolling never moves
 * the canvas and routes don't re-create it (it lives in App, outside the
 * router outlet). The wrapper has pointer-events: none so it can never
 * block clicks, touch, or keyboard interaction.
 *
 * - three + vanta are code-split and only loaded when WebGL is available
 *   and reduced motion is not requested.
 * - Falls back to the static CSS ocean gradient (`.wave-bg`) when WebGL is
 *   unavailable, reduced motion is requested, or effect init fails.
 * - Destroyed while the tab is hidden to keep GPU cost near zero.
 */
interface VantaEffect {
  destroy: () => void;
}

type VantaWavesFactory = (opts: Record<string, unknown>) => VantaEffect;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function GlobalWaves() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // No WebGL or reduced motion requested: do nothing — the host keeps its
    // static `.wave-bg` ocean gradient.
    if (prefersReducedMotion() || !hasWebGL()) return;

    const host = hostRef.current;
    if (!host) return;

    let effect: VantaEffect | null = null;
    let disposed = false;
    let pending = false;

    const buildEffect = (THREE: unknown, factory: VantaWavesFactory) => {
      if (disposed || effect || !host.isConnected) return;
      try {
        effect = factory({
          el: host,
          THREE,
          // Canvas can't receive pointer events (pointer-events: none), so
          // disable Vanta's own input handling.
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          // Light water: pale sky-blue base with 0x4b8aa7 steel-blue crests.
          backgroundColor: 0xcbe6f9,
          color: 0x4b8aa7,
          waveHeight: 15,
          waveSpeed: 1,
          zoom: 1,
          shininess: 30,
        });
      } catch {
        // Effect init failed (driver quirks etc.) — the host keeps its
        // static CSS ocean gradient.
      }
    };

    const init = () => {
      if (pending || effect || disposed) return;
      pending = true;
      Promise.all([import("three"), import("vanta/dist/vanta.waves.min.js")])
        .then(([THREE, vanta]) => {
          pending = false;
          if (disposed) return;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const factory = ((vanta as any).default ?? vanta) as VantaWavesFactory;
          buildEffect(THREE, factory);
        })
        .catch(() => {
          pending = false;
        });
    };

    init();

    // Pause the WebGL loop while the tab is hidden.
    const onVisibility = () => {
      if (document.hidden && effect) {
        effect.destroy();
        effect = null;
      } else if (!document.hidden && !effect && !disposed && host.isConnected) {
        init();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", onVisibility);
      if (effect) effect.destroy();
      effect = null;
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`wave-bg fixed inset-0 -z-10 pointer-events-none`}
    />
  );
}
