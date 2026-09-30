import { useEffect, useRef, useState } from "react";

/**
 * Animated Vanta WAVES background (deep-ocean blue).
 *
 * - three + vanta are code-split and only loaded when the component mounts
 *   with WebGL available and reduced motion not requested.
 * - Falls back to a static CSS ocean gradient when WebGL is unavailable,
 *   reduced motion is requested, or effect init fails.
 * - Teardown when scrolled far offscreen / tab hidden keeps GPU cost near zero.
 */
interface WaveBackgroundProps {
  className?: string;
  /** Lower intensity variant for CTA sections. */
  subtle?: boolean;
}

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

export function WaveBackground({ className = "", subtle = false }: WaveBackgroundProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !hasWebGL()) {
      setFallback(true);
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    let effect: VantaEffect | null = null;
    let disposed = false;
    let factory: VantaWavesFactory | null = null;
    // Cache the loaded modules so hide/show cycles re-init without re-fetching.
    let init: (() => void) | null = null;

    const buildEffect = (THREE: unknown) => {
      if (disposed || !factory || !host.isConnected) return;
      try {
        effect = factory({
          el: host,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          // Light aqua theme: soft aqua base, turquoise/cyan crests with subtle teal highlights.
          backgroundColor: 0xe8f5f8,
          color: subtle ? 0x3dbeb4 : 0x4fd1c5,
          waveHeight: subtle ? 10 : 14,
          waveSpeed: subtle ? 0.5 : 0.65,
          zoom: subtle ? 1.05 : 0.95,
          shininess: 38,
        });
      } catch {
        // Effect init failed (driver quirks etc.) — keep the CSS fallback.
        setFallback(true);
      }
    };

    let pending = false;
    init = () => {
      // The mount-time call and the first IntersectionObserver callback can both
      // fire before `effect` is assigned — guard so we never build WAVES twice.
      if (pending || effect || disposed) return;
      pending = true;
      Promise.all([import("three"), import("vanta/dist/vanta.waves.min.js")])
        .then(([THREE, vanta]) => {
          if (disposed) return;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          factory = ((vanta as any).default ?? vanta) as VantaWavesFactory;
          pending = false;
          buildEffect(THREE);
        })
        .catch(() => {
          pending = false;
          setFallback(true);
        });
    };

    init();

    // Destroy the WebGL loop while the element is far offscreen or hidden.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!effect && !disposed) init?.();
          } else if (effect) {
            effect.destroy();
            effect = null;
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden && effect) {
        effect.destroy();
        effect = null;
      } else if (!document.hidden && !effect && !disposed && host.isConnected) {
        init?.();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (effect) effect.destroy();
      effect = null;
    };
  }, [subtle]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`wave-bg ${className}`}
    />
  );
}
