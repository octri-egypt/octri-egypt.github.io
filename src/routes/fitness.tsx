import { Dumbbell, Hand, Flame, Waves, Bike, Activity, Footprints, PersonStanding, Wind } from "lucide-react";
import swimImg from "@/assets/swim.jpg";
import cycleImg from "@/assets/cycle.jpg";
import runImg from "@/assets/run.jpg";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { JOIN_FORM } from "@/lib/constants";

// Reference site lists these 9 fitness focus areas. The source has no body
// copy per area, so we keep concise, on-brand descriptions. Images are only
// used where a fitting local asset exists; the rest are icon cards.
type Focus = {
  name: string;
  icon: typeof Dumbbell;
  desc: string;
  img?: string;
};

const focusAreas: Focus[] = [
  { name: "Upper Body", icon: Hand, desc: "Build pulling and pushing strength for swim strokes and bike control." },
  { name: "Lower Body", icon: Footprints, desc: "Powerful quads, glutes, and calves for climbs, kicks, and sprints." },
  { name: "Core", icon: Dumbbell, desc: "A stable, efficient torso that transfers power across all three disciplines." },
  { name: "Swimming Fitness", icon: Waves, desc: "Conditioning that extends your distance and sharpens open-water endurance.", img: swimImg },
  { name: "Cycling Fitness", icon: Bike, desc: "Sustained power and cadence for long rides and time trials.", img: cycleImg },
  { name: "Running Fitness", icon: Activity, desc: "Running economy and resilience for faster, injury-free miles.", img: runImg },
  { name: "Triathlon Fitness", icon: Flame, desc: "Brick sessions that blend swim, bike, and run into race-ready fitness." },
  { name: "Mobility", icon: PersonStanding, desc: "Joint range and movement quality that keep you training consistently." },
  { name: "Flexibility", icon: Wind, desc: "Targeted stretching to recover faster and move without restriction." },
];

export default function Fitness() {
  useDocumentTitle("Fitness & Conditioning", "Strength, conditioning, and fitness training programs designed for triathletes by OCTRI coaches. Upper body, lower body, core, mobility, and triathlon-specific fitness.");
  return (
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-6">
        <PageHeader
          eyebrow="Fitness"
          title={<>Train every <span className="text-gradient">angle.</span></>}
          description="Focused fitness tracks that complement your swim, bike, and run — from strength and mobility to full triathlon conditioning."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((f) => (
            <article key={f.name} className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:border-primary/50 hover:-translate-y-1 transition-smooth">
              {f.img ? (
                <>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={f.img} alt={f.name} loading="lazy" width={1280} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl uppercase">{f.name}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                </>
              ) : (
                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                    <f.icon className="text-primary-foreground" size={22} />
                  </div>
                  <h3 className="font-display text-xl uppercase">{f.name}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{f.desc}</p>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading center title="Want the Details?" description="Click join to check the full program details and start training." />
          <div className="flex justify-center">
            <a
              href={JOIN_FORM}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:scale-105 transition-smooth"
            >
              Join OCTRI
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
