import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
}

/**
 * Inner-page hero. The site-wide Vanta WAVES layer (see GlobalWaves) shows
 * through behind it; a faint technical grid adds texture over the waves.
 */
export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-50" />

      <div className="relative max-w-3xl">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">
            <span className="w-8 h-px accent-bar" /> {eyebrow}
          </div>
        )}
        <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] animate-fade-up">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-lg text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
