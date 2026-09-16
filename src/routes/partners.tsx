import { MapPin, Facebook, Instagram, Globe, Linkedin, MessageCircle, Youtube, ExternalLink } from "lucide-react";

interface TikTokProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const TikTok = ({ size = 18, className }: TikTokProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.5 7.5a5.5 5.5 0 0 1 0 9h-3a3.5 3.5 0 0 1 0-7h3a2 2 0 0 1 0 4H8a5 5 0 0 0 0 10h3.5a1.5 1.5 0 0 0 1.5-1.5V11h2.5v6h-2.5v-3.5a1.5 1.5 0 0 1 3 0V17h2.5a1.5 1.5 0 0 0 1.5-1.5v-6.5A1.5 1.5 0 0 0 17.5 7.5z" />
  </svg>
);
import { SectionHeading } from "@/components/SectionHeading";
import { PageHeader } from "@/components/PageHeader";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { JOIN_FORM } from "@/lib/constants";

type SocialIcon = typeof Facebook | typeof Instagram | typeof Youtube | typeof Linkedin | typeof Globe | typeof MessageCircle | typeof TikTok;

type Social = { icon: SocialIcon; href: string; label: string };

type Partner = {
  name: string;
  tagline: string;
  desc: string;
  location?: string;
  socials: Social[];
};

const partners: Partner[] = [
  {
    name: "Bike Masters",
    tagline: "Up to 50% discount on selected items",
    desc: "Bike Masters supports OCTRI athletes with premium cycling gear and accessories — members train and shop with exclusive discounts.",
    location: "Maadi as Sarayat Al Gharbeyah, Tura, Cairo Governorate",
    socials: [
      { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
      { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
    ],
  },
  {
    name: "BLK Cat AGNC",
    tagline: "Creative & athletic partner",
    desc: "BLK Cat AGNC collaborates with OCTRI across creative and athletic projects, helping bring the team's story and brand to life.",
    socials: [
      { icon: Globe, href: "https://www.behance.net/", label: "Behance" },
      { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
      { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
      { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" },
      { icon: TikTok, href: "https://www.tiktok.com/", label: "TikTok" },
      { icon: Globe, href: "https://blkcatagnc.com", label: "Website" },
    ],
  },
  {
    name: "Ocean Triathlon Academy",
    tagline: "OCTRI's training academy",
    desc: "The home of Ocean Triathlon Team — coaching, programs, and a community that pushes every athlete toward their next finish line.",
    socials: [
      { icon: Facebook, href: "https://www.facebook.com/OceanTriathlonAcademy", label: "Facebook" },
      { icon: Instagram, href: "https://www.instagram.com/octri_team", label: "Instagram" },
      { icon: Youtube, href: "https://www.youtube.com/@octri", label: "YouTube" },
      { icon: TikTok, href: "https://www.tiktok.com/@octri_team", label: "TikTok" },
      { icon: MessageCircle, href: "https://wa.me/201030230039", label: "WhatsApp" },
      { icon: Linkedin, href: "https://www.linkedin.com/company/imc-hub", label: "LinkedIn" },
    ],
  },
];

export default function Partners() {
  useDocumentTitle("Partners & Sponsors", "Organizations and brands supporting Ocean Triathlon Team Egypt: Bike Masters, BLK Cat AGNC, and Ocean Triathlon Academy.");
  return (
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-6">
        <PageHeader
          eyebrow="Our Partners"
          title={<>Stronger <span className="text-gradient">together.</span></>}
          description="The brands and academy that power Ocean Triathlon Team — on the road, in the water, and across every finish line."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p) => (
            <article key={p.name} className="p-7 rounded-2xl bg-card border border-border shadow-card hover:border-primary/50 hover:-translate-y-1 transition-smooth">
              <h3 className="font-display text-2xl uppercase">{p.name}</h3>
              <p className="text-primary text-sm font-semibold mt-1">{p.tagline}</p>
              <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{p.desc}</p>
              {p.location && (
                <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>{p.location}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-5">
                {p.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading center title="Join the Team" description="Become part of OCTRI and train with our partners' support." />
          <div className="flex justify-center">
            <a
              href={JOIN_FORM}
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:scale-105 transition-smooth"
            >
              Join OCTRI <ExternalLink size={18} className="group-hover:translate-x-1 transition-smooth" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
