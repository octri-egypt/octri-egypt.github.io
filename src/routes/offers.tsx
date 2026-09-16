import { Check, ArrowRight, MapPin, Globe } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { JOIN_FORM } from "@/lib/constants";

type Row = { name: string; onsite: string; online: string };

const onsiteRows: Row[] = [
  { name: "1 Sport (Swim OR Cycle OR Run)", onsite: "1,500 EGP", online: "800 EGP" },
  { name: "2 Sports (any pairing)", onsite: "2,500 EGP", online: "1,500 EGP" },
  { name: "3 Sports — Triathlon", onsite: "3,000 EGP", online: "2,000 EGP" },
  { name: "Fitness only", onsite: "1,000 EGP", online: "600 EGP" },
  { name: "Nutrition only", onsite: "500 EGP", online: "500 EGP" },
  { name: "One-to-One Private Session", onsite: "1,000 EGP", online: "500 EGP" },
];

const addons = [
  "Family / Friends discount: 10% (on-site) · 20% (online)",
  "Choose any single discipline or train the full triathlon",
  "Swim · Cycle · Run · Fitness · Nutrition programs available",
];

function PriceCard({ title, icon: Icon, rows, badge }: { title: string; icon: typeof MapPin; rows: Row[]; badge: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Icon className="text-primary-foreground" size={20} />
        </div>
        <div>
          <h3 className="font-display text-2xl uppercase">{title}</h3>
          <span className="text-xs uppercase tracking-widest text-primary">{badge}</span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center justify-between gap-4 px-6 py-4">
            <span className="text-sm text-foreground">{r.name}</span>
            <span className="font-display text-lg text-primary whitespace-nowrap">{r.online}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Offers() {
  useDocumentTitle("Membership Offers & Pricing", "View current OCTRI Egypt membership offers and training packages for Swimming, Cycling, Running, Fitness, and Nutrition programs.");
  return (
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-6">
        <PageHeader
          eyebrow="Training Offers"
          title={<>Train with <span className="text-gradient">OCTRI.</span></>}
          description="Flexible on-site and online training plans. Pick a single discipline or the full triathlon — Swim, Bike, Run, Fitness, and Nutrition."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          <PriceCard title="On-Site Programs" icon={MapPin} badge="Train with us in Cairo" rows={onsiteRows} />
          <PriceCard title="Online Programs" icon={Globe} badge="Train anywhere" rows={onsiteRows} />
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {addons.map((a) => (
            <div key={a} className="flex items-start gap-3 p-5 rounded-2xl bg-secondary/50 border border-border">
              <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{a}</span>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading center title="Ready to Start?" description="Subscribe to check your offer and join Egypt's strongest triathlon community." />
          <div className="flex justify-center">
            <a
              href={JOIN_FORM}
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:scale-105 transition-smooth"
            >
              Subscribe Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-smooth" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
