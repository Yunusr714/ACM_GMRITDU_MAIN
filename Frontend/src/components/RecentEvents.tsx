import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEventStore } from "@/lib/store";

export function RecentEvents() {
  const { events, isLoading } = useEventStore();
  const recent = events.slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="size-10 border-4 border-zinc-200 border-t-[#ff3b30] rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (recent.length === 0) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-sm font-bold tracking-widest text-[#ff3b30]">WHAT'S HAPPENING</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Recent <span className="gradient-text">Events</span></h2>
          </div>
          <Link to="/events" className="inline-flex items-center gap-2 font-semibold text-foreground/80 hover:text-foreground group">
            View All Events <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recent.map((e, i) => (
            <motion.article
              key={e.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group glass-card rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={e.image} alt={e.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-3 left-3 rounded-full gradient-brand text-white px-3 py-1 text-xs font-bold">{e.category}</span>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {e.date}</span>
                  {(e.venue || e.details?.venue) && <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {e.venue || e.details?.venue}</span>}
                </div>
                <h3 className="mt-2 font-bold text-lg leading-snug">{e.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{e.desc || e.overview || e.details?.overview}</p>
                <Link to="/events/$id" params={{ id: e.id }} className="mt-4 text-sm font-semibold gradient-text inline-flex items-center gap-1 group/btn">
                  Read More <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
