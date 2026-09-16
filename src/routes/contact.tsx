import { Mail, MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { JOIN_FORM, CONTACT, SOCIAL } from "@/lib/constants";

export default function Contact() {
  useDocumentTitle("Contact Us", "Get in touch with Ocean Triathlon Team Egypt. Join us, ask about coaching programs, or partner with OCTRI. Location in Cairo, email, phone, and WhatsApp.");
  return (
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-6">
        <PageHeader
          eyebrow="Get In Touch"
          title={<>Let's <span className="text-gradient">talk.</span></>}
          description="Questions about programs, schedules, or joining the team? We're here."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Location", value: CONTACT.location, sub: CONTACT.locationDetail, href: undefined as string | undefined },
              { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { icon: Phone, label: "Phone", value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
              { icon: MessageCircle, label: "WhatsApp", value: "Message us on WhatsApp", href: SOCIAL.whatsapp },
            ].map((c) => {
              const inner = (
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <c.icon className="text-primary-foreground" size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                    <div className="font-semibold text-lg mt-1">{c.value}</div>
                    {c.sub && <div className="text-sm text-muted-foreground mt-0.5">{c.sub}</div>}
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="block hover:border-primary/50 transition-smooth rounded-2xl">
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              );
            })}

            <a
              href={JOIN_FORM}
              target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-primary text-primary-foreground font-bold shadow-elegant hover:shadow-glow transition-smooth"
            >
              <span className="text-lg">Join Us Today</span>
              <ArrowRight className="group-hover:translate-x-1 transition-smooth" />
            </a>
          </div>

          <form className="p-8 rounded-2xl bg-card border border-border space-y-4">
            <h2 className="font-display text-2xl uppercase mb-4">Send a Message</h2>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
              <input type="text" className="mt-2 w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary outline-none transition-smooth" placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <input type="email" className="mt-2 w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary outline-none transition-smooth" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea rows={5} className="mt-2 w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary outline-none transition-smooth resize-none" placeholder="Tell us about your goals..." />
            </div>
            <button type="button" className="w-full px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-bold shadow-elegant hover:shadow-glow transition-smooth">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
