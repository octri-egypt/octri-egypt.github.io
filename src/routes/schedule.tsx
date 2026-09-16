import { Waves, Bike, Activity, Clock } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const sessions: Record<string, { name: string; time: string; icon: typeof Waves }[]> = {
  Sat: [{ name: "Swimming", time: "5:30 AM", icon: Waves }, { name: "Running", time: "6:30 AM", icon: Activity }, { name: "Cycling", time: "6:30 AM", icon: Bike }],
  Sun: [{ name: "Recovery / Rest", time: "—", icon: Clock }],
  Mon: [{ name: "Swimming", time: "5:30 AM", icon: Waves }, { name: "Running", time: "6:30 AM", icon: Activity }],
  Tue: [{ name: "Cycling", time: "6:30 AM", icon: Bike }],
  Wed: [{ name: "Swimming", time: "5:30 AM", icon: Waves }, { name: "Running", time: "6:30 AM", icon: Activity }],
  Thu: [{ name: "Strength / Mobility", time: "Open", icon: Clock }],
  Fri: [{ name: "Cycling — Long Ride", time: "6:30 AM", icon: Bike }],
};

export default function Schedule() {
  useDocumentTitle("Weekly Training Schedule", "Weekly training schedule for swimming, cycling, and running sessions with OCTRI Egypt. Consistent daily sessions across Cairo locations.");
  return (
    <div className="pt-32 pb-16">
      <section className="container mx-auto px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">
            <span className="w-8 h-px bg-primary" /> Weekly Schedule
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase">
            Show up. <span className="text-gradient">Every week.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Consistency wins races. Here's where we'll be — every day of the week.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {days.map((d) => (
            <div key={d} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-2xl uppercase">{d}</h3>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Day</div>
              </div>
              <div className="space-y-3">
                {sessions[d].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60">
                    <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <s.icon className="text-primary-foreground" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
