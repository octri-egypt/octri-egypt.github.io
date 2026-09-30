import type { ReactNode } from "react";
import { WaveBackground } from "@/components/WaveBackground";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
}

/**
 * Inner-page hero. The animated Vanta WAVES backdrop is full-bleed (50vw
 * trick) and masked out toward the bottom so it blends into the page
 * background. Falls back to the static ocean gradient when WebGL is
 * unavailable or reduced motion is requested.
 */
export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <div className="relative">
      {/* Full-bleed wave band — the wrapper here spans the full container
          width so left-1/2 lands on the viewport center; masked out toward
          the bottom so it blends into the page background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-screen -top-40 -bottom-12"
        style={{ maskImage: "linear-gradient(180deg, black 55%, transparent 100%)", WebkitMaskImage: "linear-gradient(180deg, black 55%, transparent 100%)" }}
      >
        <WaveBackground subtle className="absolute inset-0" />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>

      <div className="relative max-w-3xl">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">
            <span className="w-8 h-px accent-bar" /> {eyebrow}
          </div>
        )}
        <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] animate-fade-up">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-lg text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
