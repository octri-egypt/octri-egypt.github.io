import { Waves, Bike, Activity, Check } from "lucide-react";
import swimImg from "@/assets/swim.jpg";
import cycleImg from "@/assets/cycle.jpg";
import runImg from "@/assets/run.jpg";
import { SectionHeading } from "@/components/SectionHeading";
import { useDocumentTitle } from "@/hooks/use-document-title";

const JOIN_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScYG77VfTWyoPcHmD6v5BTTmxFilQskBpwmDKYmyuEIG1qwQw/viewform";

const services = [
  {
    icon: Waves, title: "Swimming Program", img: swimImg,
    desc: "From freestyle technique to open-water race prep — build a stroke that lasts the full distance.",
    bullets: ["Stroke analysis & drills", "Endurance & speed sets", "Open-water sessions"],
    schedule: "Sat · Mon · Wed — 5:30 AM",
  },
  {
    icon: Bike, title: "Cycling Program", img: cycleImg,
    desc: "Long rides, intervals, and climbing sessions to develop power, cadence, and confidence on the road.",
    bullets: ["Group road rides", "FTP & power training", "Bike handling skills"],
    schedule: "Fri · Sat · Tue — 6:30 AM",
  },
  {
    icon: Activity, title: "Running Program", img: runImg,
    desc: "Track work, tempo runs, and long runs structured to make you faster, stronger, and injury-free.",
    bullets: ["Form & cadence work", "Track intervals", "Race pace simulation"],
    schedule: "Sat · Mon · Wed — 6:30 AM",
  },
];

export default function Services() {
  useDocumentTitle("Training Programs", "Explore OCTRI's professional triathlon training programs: Swimming, Cycling, and Running. Certified coaches, structured plans for all levels.");
  return (
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">
            <span className="w-8 h-px bg-primary" /> Programs
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase">
            Train smarter. <span className="text-gradient">Race stronger.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Triathlon Team (Swim · Bike · Run). Pick a single discipline or train the full triathlon.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {services.map((s, i) => (
            <article key={s.title} className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <div className="relative overflow-hidden rounded-2xl shadow-card group">
                <img src={s.img} alt={s.title} loading="lazy" width={1280} height={896} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-smooth duration-700" />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant">
                  <s.icon className="text-primary-foreground" size={22} />
                </div>
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl uppercase">{s.title}</h2>
                <p className="mt-3 text-muted-foreground text-lg">{s.desc}</p>
                <ul className="mt-6 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-foreground">
                      <Check size={18} className="text-primary flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-semibold">{s.schedule}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <SectionHeading center title="Ready to Begin?" description="Sign up today and join Egypt's strongest triathlon community." />
          <a
            href={JOIN_FORM}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:scale-105 transition-smooth"
          >
            Join Us Today
          </a>
        </div>
      </section>
    </div>
  );
}
