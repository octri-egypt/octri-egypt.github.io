import { Trophy, Target, Heart, Zap, Eye, Flag } from "lucide-react";
import teamImg from "@/assets/team.jpg";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { useDocumentTitle } from "@/hooks/use-document-title";

const values = [
  { icon: Trophy, title: "Performance", desc: "Race-ready training programs designed to deliver podium results." },
  { icon: Heart, title: "Community", desc: "A team that pushes each other and celebrates every finish line together." },
  { icon: Target, title: "Discipline", desc: "Structured plans for every level — from first-timers to seasoned pros." },
  { icon: Zap, title: "Energy", desc: "Recharge from daily life through outdoor training and shared goals." },
];

const principles = [
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be Egypt's leading community for swimmers, cyclists, and runners — where athletes of every level train together, compete boldly, and grow stronger in body and mind.",
  },
  {
    icon: Flag,
    title: "Our Mission",
    text: "To enable competitive professional and amateur athletes by building strength, fitness, and agility — helping them compete, enjoy being fit and strong, and escape the day-to-day pressures of life.",
  },
];

export default function About() {
  useDocumentTitle("About OCTRI", "Learn about Ocean Triathlon Team Egypt, established in 2017. Professional coaching for competitive and amateur triathletes in Cairo.");
  return (
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-6">
        <PageHeader
          eyebrow="Who We Are"
          title={<>Built for those who <span className="text-gradient">refuse to quit.</span></>}
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-16 items-start">
          <img src={teamImg} alt="OCTRI team" loading="lazy" width={1024} height={1024} className="rounded-2xl shadow-card w-full" />
          <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              Established in <span className="text-foreground font-semibold">2017</span>,
              Ocean Triathlon Team (OCTRI) focuses on enabling competitive professional
              and amateur athletes. We build your strength, fitness, and agility to be
              able to compete and enjoy being fit and strong.
            </p>
            <p>
              Our athletes compete strongly in all local Triathlon and sports events.
              OCTRI's professionally designed training programs empower you to get over
              the day-to-day pressures of life and recharge your positive energy.
            </p>
            <p className="text-foreground font-medium">
              Get outdoors and join us to build a strong YOU.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {principles.map((p) => (
            <div key={p.title} className="p-7 rounded-2xl bg-card border border-border shadow-card">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                <p.icon className="text-primary-foreground" size={22} />
              </div>
              <h3 className="font-display text-2xl uppercase mb-2">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <SectionHeading center eyebrow="What We Stand For" title="Our Values" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:-translate-y-1 transition-smooth">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <v.icon className="text-primary-foreground" size={22} />
                </div>
                <h3 className="font-display text-xl uppercase mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
