import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { events } from "@/lib/events-data";

export function RecentEvents() {
  const recent = events.slice(0, 4);
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
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" /> {e.date}
                </div>
                <h3 className="mt-2 font-bold text-lg leading-snug">{e.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{e.desc}</p>
                <button className="mt-4 text-sm font-semibold gradient-text inline-flex items-center gap-1 group/btn">
                  Read More <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
