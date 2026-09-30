import { Link } from "react-router-dom";
import { ArrowRight, Waves, Bike, Activity, Trophy, Users, Calendar, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero.webp";
import teamImg from "@/assets/about_octri.webp";
import swimImg from "@/assets/swimming_program.webp";
import cycleImg from "@/assets/cycling_program.webp";
import runImg from "@/assets/running_program.webp";
import communityImg from "@/assets/Organize_your_goals_with_us.webp";
import { SectionHeading } from "@/components/SectionHeading";
import { WaveBackground } from "@/components/WaveBackground";
import { Reveal } from "@/components/Reveal";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { JOIN_FORM } from "@/lib/constants";

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
      {/* HERO — animated Vanta Waves (deep ocean) */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <WaveBackground className="absolute inset-0" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-overlay pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 pt-28 pb-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Egypt · Since 2017
              </div>
              <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.95]">
                <span className="text-gradient-blue">Together</span> <br />
                <span className="text-gradient-teal">We Tri.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-foreground/90 max-w-xl">
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
                <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-background/30 backdrop-blur-sm font-semibold hover:bg-background/60 hover:border-primary/50 transition-smooth">
                  Explore Programs
                </Link>
              </div>

              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
                {stats.map((s) => (
                  <div key={s.label} className="border-l-2 border-primary/70 pl-4">
                    <div className="font-display text-3xl md:text-4xl text-gradient-gold">{s.value}</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Framed hero visual — desktop only, keeps text focus on mobile */}
            <div className="hidden lg:block relative animate-fade-up max-w-[440px] ml-auto w-full" style={{ animationDelay: "200ms" }}>
              <div className="absolute -inset-6 bg-gradient-primary opacity-25 blur-3xl rounded-[2.5rem]" />
              <img
                src={heroImg}
                alt="Ocean Triathlon Team athletes training together"
                width={1280} height={896}
                className="relative rounded-3xl border border-border shadow-card w-full object-cover"
              />
              <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl card-glass px-5 py-4">
                <Trophy className="text-primary" size={22} />
                <div className="leading-tight">
                  <div className="font-display text-sm uppercase">Champions</div>
                  <div className="text-xs text-muted-foreground">in local Triathlon events</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center lg:hidden">
            <a href="#services" aria-label="Scroll to services" className="text-muted-foreground hover:text-primary transition-smooth">
              <ChevronDown size={28} className="animate-float" />
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES — compact premium cards */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <Reveal>
            <SectionHeading eyebrow="What We Offer" title="Our Services" description="Three disciplines, one mindset. Every program is designed by certified coaches to take you from beginner to podium." />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 120} as="article" className="group card-glass rounded-2xl overflow-hidden flex flex-col">
                <div className="h-44 overflow-hidden relative">
                  <img src={p.img} alt={`${p.title} training with OCTRI`} loading="lazy" width={1280} height={896} className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant group-hover:scale-110 transition-smooth">
                    <p.icon className="text-primary-foreground" size={20} />
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-xl uppercase">{p.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between text-sm pt-3 border-t border-border">
                    <span className="text-foreground/75 text-xs">{p.days}</span>
                    <span className="text-primary font-bold text-xs">{p.time}</span>
                  </div>
                  <Link to="/services" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all">
                    Explore <ArrowRight size={15} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative max-w-md w-full">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <img src={teamImg} alt="Ocean Triathlon Team training session" loading="lazy" width={1024} height={1024} className="relative rounded-2xl border border-border shadow-card w-full" />
            <div className="absolute -bottom-6 -right-6 card-glass rounded-2xl p-5 max-w-[190px] hidden md:block">
              <Trophy className="text-primary mb-2" size={26} />
              <div className="font-display text-xl">Champions</div>
              <div className="text-xs text-muted-foreground">in local Triathlon events</div>
            </div>
          </Reveal>

          <Reveal delay={120}>
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
                <span key={t} className="px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm backdrop-blur-sm">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMMUNITY CTA — animated waves with a compact side photo */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <Reveal className="relative overflow-hidden rounded-3xl card-glass">
            <WaveBackground subtle className="absolute inset-0" />
            <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center p-10 md:p-16">
              <div>
                <Users className="text-primary mb-4" size={40} />
                <h2 className="font-display text-4xl md:text-6xl uppercase">
                  Organize your <span className="text-gradient-green">goals</span> <span className="text-gradient-gold">with us.</span>
                </h2>
                <p className="mt-5 text-lg text-muted-foreground">
                  Whether you're chasing your first finish line or your next podium —
                  OCTRI is the team that takes you there.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={JOIN_FORM}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-elegant hover:shadow-glow hover:scale-[1.03] transition-smooth"
                  >
                    Join the Team <ArrowRight size={18} />
                  </a>
                  <Link to="/schedule" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border bg-background/40 backdrop-blur-sm font-semibold hover:border-primary/50 transition-smooth">
                    <Calendar size={18} /> View Schedule
                  </Link>
                </div>
              </div>
              <div className="relative max-w-xs w-full mx-auto lg:mr-0 lg:ml-auto">
                <img
                  src={communityImg}
                  alt="Ocean Triathlon Team athletes achieving their goals together"
                  loading="lazy" width={1280} height={896}
                  className="rounded-2xl border border-border shadow-card w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
