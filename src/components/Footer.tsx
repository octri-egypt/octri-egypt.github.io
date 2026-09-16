import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin, MessageCircle, Mail, MapPin, Phone, Map, ArrowRight } from "lucide-react";
import { SOCIAL, CONTACT, JOIN_FORM } from "@/lib/constants";

const MAPS_URL = "https://maps.app.goo.gl/97daZ8knbEExrAtJ6";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 mt-24">
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" width={40} height={40} className="w-10 h-10" />
            <div>
              <div className="font-display text-2xl tracking-wider">OCTRI</div>
              <div className="text-[10px] tracking-[0.2em] text-primary uppercase">Together We Tri</div>
            </div>
          </div>
          <p className="mt-5 text-muted-foreground max-w-md">
            Ocean Triathlon Team — Egypt's home for swim, bike, and run athletes.
            Building stronger bodies and sharper minds since 2017.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={JOIN_FORM}
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-elegant hover:shadow-glow transition-smooth"
            >
              Join OCTRI <ArrowRight size={16} className="group-hover:translate-x-1 transition-smooth" />
            </a>
            <a
              href={MAPS_URL}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background/40 backdrop-blur-sm font-semibold text-sm hover:bg-background/60 transition-smooth"
            >
              <Map size={16} className="text-primary" /> Find Us on Maps
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-foreground">Explore</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-smooth">About</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-smooth">Programs</Link></li>
            <li><Link to="/offers" className="hover:text-primary transition-smooth">Offers</Link></li>
            <li><Link to="/achievements" className="hover:text-primary transition-smooth">Achievements</Link></li>
            <li><Link to="/events" className="hover:text-primary transition-smooth">Events</Link></li>
            <li><Link to="/partners" className="hover:text-primary transition-smooth">Partners</Link></li>
            <li><Link to="/fitness" className="hover:text-primary transition-smooth">Fitness</Link></li>
            <li><Link to="/schedule" className="hover:text-primary transition-smooth">Schedule</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-foreground">Connect</h4>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin size={16} className="text-primary flex-shrink-0" /> {CONTACT.location}</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-primary flex-shrink-0" /> {CONTACT.email}</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-primary flex-shrink-0" /> <a href={CONTACT.phoneHref} className="hover:text-primary transition-smooth">{CONTACT.phoneDisplay}</a></li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Instagram size={18} /></a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Facebook size={18} /></a>
            <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Youtube size={18} /></a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><MessageCircle size={18} /></a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ocean Triathlon Team. All rights reserved.
      </div>
    </footer>
  );
}
