import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Images, ArrowRight, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEventStore, type StoredEvent } from "@/lib/store";

const categories = ["All", "Workshops", "Hackathons", "Seminars", "Competitions", "Research Activities"] as const;

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Activities — ACM Student Chapter" },
      { name: "description", content: "Browse workshops, hackathons, seminars, competitions, and research activities organized by our ACM Chapter." },
      { property: "og:title", content: "Events & Activities — ACM" },
      { property: "og:description", content: "All ACM Student Chapter events in one place." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { events, isLoading } = useEventStore();
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = filter === "All" ? events : events.filter(e => e.category === filter);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="absolute -top-32 left-1/4 size-[500px] rounded-full bg-[#ff3b30]/15 blur-3xl animate-blob" />
        <div className="absolute -top-20 right-1/4 size-[400px] rounded-full bg-[#ffb800]/20 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Events & <span className="gradient-text">Activities</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our calendar of workshops, hackathons, seminars, competitions, and research activities — designed to spark curiosity and accelerate growth.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 mb-10">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                filter === c
                  ? "gradient-brand text-white shadow-glow"
                  : "glass-card hover:bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24">
        {!mounted || isLoading ? (
          <div className="max-w-7xl mx-auto text-center py-20">
            <div className="size-10 border-4 border-zinc-200 border-t-[#ff3b30] rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading events...</p>
          </div>
        ) : (
          <>
            <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((e, i) => (
                <EventCard key={e.id} e={e} i={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-20">No events in this category yet.</p>
            )}
          </>
        )}
      </section>

      {/* Dynamic stats */}
      {mounted && !isLoading && events.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto glass-card rounded-3xl p-10 grid grid-cols-3 gap-6 text-center">
            {[
              { v: events.length.toString(), l: "Total Events" },
              { v: events.reduce((acc, e) => acc + (e.files?.length || 0), 0).toString(), l: "Resources Shared" },
              { v: events.reduce((acc, e) => acc + (e.details?.gallery?.length || 0), 0).toString(), l: "Gallery Photos" },
            ].map(s => (
              <div key={s.l}>
                <div className="text-4xl md:text-5xl font-bold gradient-text font-display">{s.v}</div>
                <div className="mt-2 text-sm text-muted-foreground font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

function EventCard({ e, i }: { e: StoredEvent; i: number }) {
  const galleryCount = e.details?.gallery?.length || 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="group glass-card rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={e.image} alt={e.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <span className="absolute top-3 left-3 rounded-full gradient-brand text-white px-3 py-1 text-xs font-bold">{e.category}</span>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {e.date}</span>
          {(e.venue || e.details?.venue) && <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {e.venue || e.details?.venue}</span>}
        </div>
        <h3 className="mt-2 font-bold text-xl leading-snug">{e.title}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{e.desc || e.overview || e.details?.overview}</p>
        <div className="mt-5 flex items-center justify-between">
          <Link to="/events/$id" params={{ id: e.id }} className="text-sm font-semibold gradient-text inline-flex items-center gap-1 group/btn">
            View Details <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          {galleryCount > 0 && (
            <Link to="/events/$id" params={{ id: e.id }} className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full glass px-3 py-1.5 hover:gradient-brand hover:text-white transition-all">
              <Images className="size-3.5" /> {galleryCount} Photos
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
