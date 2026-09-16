import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { JOIN_FORM } from "@/lib/constants";

const CLOSE_DELAY = 200;

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About", end: false },
  { to: "/services", label: "Programs", end: false },
  { to: "/offers", label: "Offers", end: false },
  { to: "/achievements", label: "Achievements", end: false },
  { to: "/events", label: "Events", end: false },
  { to: "/partners", label: "Partners", end: false },
  { to: "/fitness", label: "Fitness", end: false },
  { to: "/schedule", label: "Schedule", end: false },
  { to: "/contact", label: "Contact", end: false },
] as const;

// Top-level items with optional dropdown menus for a cleaner bar.
const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Programs" },
  { to: "/offers", label: "Offers" },
  {
    label: "Team",
    children: [
      { to: "/achievements", label: "Achievements" },
      { to: "/events", label: "Events" },
      { to: "/partners", label: "Partners" },
    ],
  },
  {
    label: "Training",
    children: [
      { to: "/fitness", label: "Fitness" },
      { to: "/schedule", label: "Schedule" },
    ],
  },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clear any pending close timer on unmount to avoid setting state after teardown.
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Open immediately and cancel any pending close (re-entry tolerance).
  const openMenuNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  // Delay closing so moving the cursor from trigger to dropdown doesn't snap it shut.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/favicon.svg" alt="OCTRI logo" width={40} height={40} className="w-10 h-10 group-hover:scale-110 transition-smooth" />
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wider text-foreground">OCTRI</div>
            <div className="text-[10px] tracking-[0.2em] text-primary uppercase">Together We Tri</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            "children" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openMenuNow(item.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth inline-flex items-center gap-1"
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.label}
                  onClick={() => (openMenu === item.label ? scheduleClose() : openMenuNow(item.label))}
                  onFocus={() => openMenuNow(item.label)}
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-smooth ${openMenu === item.label ? "rotate-180" : ""}`} />
                </button>
                {openMenu === item.label && (
                  <div className="absolute top-full left-0 pt-2 min-w-[200px]">
                    <div className="rounded-xl bg-card border border-border shadow-card p-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-secondary/60 transition-smooth"
                          onMouseEnter={() => openMenuNow(item.label)}
                          onClick={() => setOpenMenu(null)}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={"end" in item ? item.end : false}
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 text-sm font-medium text-primary transition-smooth"
                    : "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
          <a
            href={JOIN_FORM}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-elegant hover:shadow-glow transition-smooth"
          >
            Join Us
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-foreground border-b border-border/50"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={JOIN_FORM}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 px-5 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm text-center"
            >
              Join Us Today
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
