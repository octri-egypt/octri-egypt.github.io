import { CalendarDays, MapPin, Phone, PartyPopper, Waves } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { CONTACT, JOIN_FORM } from "@/lib/constants";

type Event = {
  title: string;
  tagline?: string;
  date: string;
  location: string;
  detail: string;
};

const events: Event[] = [
  {
    title: "SOMABAY Endurance Festival",
    tagline: "Feature event of the season",
    date: "Seasonal",
    location: "Soma Bay, Red Sea, Egypt",
    detail: "OCTRI takes on the SOMABAY Endurance Festival — a multi-sport test of swim, bike, and run endurance on the Red Sea coast.",
  },
  {
    title: "OCTRI Celebrated with THE TRI FACTORY",
    tagline: "Run for Your Health — Health is wealth",
    date: "Open session",
    location: "OCTRI training location",
    detail: "A complimentary training session held at our training location. Train together, get stronger, and join the #Be_strong_Be_octri movement.",
  },
  {
    title: "Celebrate New Year with OCTRI — FREE Cycling Sessions",
    tagline: "Free Friday cycling",
    date: "Every Friday · 01/01/2021 – 30/02/2021 · 7:00 AM",
    location: "Green Heights, 6th of October, behind Mall of Arabia",
    detail: "Start the year on two wheels. Free cycling sessions every Friday morning — all levels welcome. Contact us to reserve your spot.",
  },
];

export default function Events() {
  useDocumentTitle("Upcoming Events & Training Camps", "OCTRI team events, training camps, and race calendar for triathletes in Egypt. From endurance festivals to free community sessions.");
  return (
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-6">
        <PageHeader
          eyebrow="Events"
          title={<>Show up. <span className="text-gradient">Race on.</span></>}
          description="From endurance festivals to free community sessions — here's where OCTRI trains, races, and celebrates."
        />

        <div className="mt-16 space-y-6">
          {events.map((e, i) => (
            <article key={i} className="grid md:grid-cols-4 gap-6 p-7 rounded-2xl bg-card border border-border shadow-card hover:border-primary/50 transition-smooth">
              <div className="md:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  {i === 0 ? <Waves className="text-primary-foreground" size={22} /> : <PartyPopper className="text-primary-foreground" size={22} />}
                </div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold">
                  <CalendarDays size={14} /> {e.date}
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-display text-2xl uppercase">{e.title}</h3>
                {e.tagline && <p className="text-primary text-sm font-semibold mt-1">{e.tagline}</p>}
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{e.detail}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {e.location}</span>
                  <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-primary transition-smooth"><Phone size={14} className="text-primary" /> {CONTACT.phoneDisplay}</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading center title="Join the Next One" description="Never miss a session — join OCTRI and train with the team." />
          <div className="flex justify-center">
            <a
              href={JOIN_FORM}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:scale-105 transition-smooth"
            >
              Join Us Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
