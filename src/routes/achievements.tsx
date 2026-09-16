import { Trophy, Medal, Flag } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { useDocumentTitle } from "@/hooks/use-document-title";

type Achievement = { title: string; year: string; discipline: string };

const achievements: Achievement[] = [
  { title: "IRONMAN EGYPT", year: "2021", discipline: "Ironman" },
  { title: "Republic Championship — AQUAbike", year: "29 Oct 2021", discipline: "AQUAbike" },
  { title: "Republic Championship — Triathlon", year: "26 Mar 2021", discipline: "Triathlon" },
  { title: "Republic Championship — Duathlon", year: "26 Mar 2021", discipline: "Duathlon" },
  { title: "Republic Championship — Triathlon", year: "25 Dec 2020", discipline: "Triathlon" },
  { title: "Republic Championship — AQUAbike", year: "8 Jan 2022", discipline: "AQUAbike" },
  { title: "Republic Championship — Triathlon", year: "8 Feb 2020", discipline: "Triathlon" },
  { title: "Republic Championship", year: "8 Feb 2020", discipline: "Multi-sport" },
  { title: "3rd Place — Universities Championships (Cycling)", year: "2020", discipline: "Universities" },
  { title: "Universities Athletics Championship", year: "2021", discipline: "Universities" },
];

const galleryTags = [
  "celebrate", "fight to achieve our goals", "focusing", "friends",
  "fun after run", "fun", "pain", "Power of swimming", "run forward", "support", "we can do it",
];

export default function Achievements() {
  useDocumentTitle("Achievements & Race Results", "OCTRI athletes' race results, podium finishes, and championship titles in Egypt triathlon events since 2017.");
  return (
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-6">
        <PageHeader
          eyebrow="Achievements"
          title={<>Podiums & <span className="text-gradient">milestones.</span></>}
          description="Some of our team's achievements and milestones over the past couple of years — earned in pools, on the road, and across the finish line."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => (
            <article key={i} className="group p-6 rounded-2xl bg-card border border-border shadow-card hover:border-primary/50 hover:-translate-y-1 transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center">
                  {i < 3 ? <Trophy className="text-primary-foreground" size={20} /> : <Medal className="text-primary-foreground" size={20} />}
                </div>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">{a.year}</span>
              </div>
              <h3 className="font-display text-xl uppercase leading-tight">{a.title}</h3>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border text-xs text-muted-foreground">
                <Flag size={12} className="text-primary" /> {a.discipline}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeading center eyebrow="In Training" title="What Drives Us" description="The moments, the mindset, and the team behind every result." />
          <div className="flex flex-wrap justify-center gap-2.5">
            {galleryTags.map((t) => (
              <span key={t} className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
