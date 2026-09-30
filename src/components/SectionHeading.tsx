import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  center?: boolean;
}
export function SectionHeading({ eyebrow, title, description, center }: Props) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">
          <span className="w-8 h-px accent-bar" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl uppercase">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground text-lg">{description}</p>}
    </div>
  );
}
