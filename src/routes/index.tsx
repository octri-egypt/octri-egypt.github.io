import { Link } from "react-router-dom";
import { ArrowRight, Waves, Bike, Activity, Trophy, Users, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-swim.jpg";
import teamImg from "@/assets/team.jpg";
import swimImg from "@/assets/swim.jpg";
import cycleImg from "@/assets/cycle.jpg";
import runImg from "@/assets/run.jpg";
import communityImg from "@/assets/community.jpg";
import { SectionHeading } from "@/components/SectionHeading";
import { useDocumentTitle } from "@/hooks/use-document-title";

const JOIN_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScYG77VfTWyoPcHmD6v5BTTmxFilQskBpwmDKYmyuEIG1qwQw/viewform";

const programs = [
  { icon: Waves, title: "Swimming", desc: "Build endurance and stroke efficiency", days: "Sat · Mon · Wed", time: "5:30 AM", img: swimImg },
  { icon: Bike, title: "Cycling", desc: "Discover the power of the road", days: "Fri · Sat · Tue", time: "6:30 AM", img: cycleImg },
  { icon: Activity, title: "Running", desc: "Run for your health and speed", days: "Sat · Mon · Wed", time: "6:30 AM", img: runImg },
];

const stats = [
  { value: "2017", label: "Established" },
  { value: "200+", label: "Athletes Trained" },
  { value: "50+", label: "Race Podiums" },
  { value: "3", label: "Disciplines" },
];

export default function Home() {
  useDocumentTitle(undefined, "Egypt's premier triathlon team. Professional coaching for swimming, cycling, and running since 2017. Join our community in Cairo.");

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src={heroImg} alt="Triathlete swimming" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="container mx-auto px-6 relative z-10 pt-24">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Egypt · Since 2017
            </div>
            <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.95]">
              Together <br />
              <span className="text-gradient">We Tri.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-xl">
              Ocean Triathlon Team — where swimmers, cyclists, and runners come together
              to train, compete, and become unstoppable.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={JOIN_FORM}
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:scale-105 transition-smooth"
              >
                Join Us Today
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-smooth" />
              </a>
              <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-background/30 backdrop-blur-sm font-semibold hover:bg-background/60 transition-smooth">
                Explore Programs
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-primary pl-4">
                <div className="font-display text-3xl md:text-4xl text-foreground">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading eyebrow="What We Offer" title="Our Services" description="Three disciplines, one mindset. Every program is designed by certified coaches to take you from beginner to podium." />

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <article
                key={p.title}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-glow transition-smooth"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={1280} height={896} className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-elegant">
                    <p.icon className="text-primary-foreground" size={22} />
                  </div>
                  <h3 className="font-display text-2xl uppercase">{p.title}</h3>
                  <p className="text-muted-foreground mt-1">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between text-sm pt-4 border-t border-border">
                    <span className="text-foreground/80">{p.days}</span>
                    <span className="text-primary font-bold">{p.time}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <img src={teamImg} alt="OCTRI team" loading="lazy" width={1024} height={1024} className="relative rounded-2xl shadow-card w-full" />
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-6 shadow-elegant max-w-[200px] hidden md:block">
              <Trophy className="text-primary mb-2" size={28} />
              <div className="font-display text-2xl">Champions</div>
              <div className="text-xs text-muted-foreground">in local Triathlon events</div>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="About OCTRI" title="Built for Athletes Who Refuse to Quit" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Established in 2017, Ocean Triathlon Team focuses on enabling competitive
              professional and amateur athletes. We build your strength, fitness, and agility
              so you can compete and enjoy being fit and strong.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
              Our athletes compete strongly across all local triathlon events. OCTRI's
              professionally designed programs help you escape day-to-day pressures and
              recharge your energy. Get outdoors and join us to build a stronger you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Pro Coaching", "All Levels", "Community", "Race Ready"].map((t) => (
                <span key={t} className="px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl">
            <img src={communityImg} alt="OCTRI community" loading="lazy" width={1280} height={896} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
            <div className="relative p-10 md:p-20 max-w-2xl">
              <Users className="text-primary mb-4" size={40} />
              <h2 className="font-display text-4xl md:text-6xl uppercase">
                Organize your goals <span className="text-gradient">with us.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Whether you're chasing your first finish line or your next podium —
                OCTRI is the team that takes you there.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={JOIN_FORM}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-elegant hover:shadow-glow transition-smooth"
                >
                  Join the Team <ArrowRight size={18} />
                </a>
                <Link to="/schedule" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border bg-background/40 backdrop-blur-sm font-semibold">
                  <Calendar size={18} /> View Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
