import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Sparkles, Users, Trophy, Mic, Building2, Target, CheckCircle2, Clock, Tag, X, ArrowRight, FileText, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEventStore, type StoredEvent } from "@/lib/store";

export const Route = createFileRoute("/events_/$id")({
  component: EventDetail,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Event not found</h1>
        <Link to="/events" className="mt-4 inline-flex items-center gap-2 gradient-text font-semibold">
          <ArrowLeft className="size-4" /> Back to events
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center px-6">
      <button onClick={reset} className="rounded-xl gradient-brand text-white px-5 py-3">Retry</button>
    </div>
  ),
});

function EventDetail() {
  const { id } = Route.useParams();
  const { events, isLoading } = useEventStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <div className="pt-40 grid place-items-center">
          <div className="text-center">
            <div className="size-10 border-4 border-zinc-200 border-t-[#ff3b30] rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading event...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const e = events.find(ev => ev.id === id);

  if (!e) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <div className="pt-40 grid place-items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Event not found</h1>
            <Link to="/events" className="mt-4 inline-flex items-center gap-2 gradient-text font-semibold">
              <ArrowLeft className="size-4" /> Back to events
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const d = e.details || {} as any;
  const today = new Date().toISOString().split("T")[0];
  const isUpcoming = e.date >= today;
  const galleryImages = (d.gallery || []).filter((src: string) => src !== e.image);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Poster hero */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="size-4" /> Back to all events
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl overflow-hidden shadow-card aspect-[21/9] relative">
            <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-white">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full gradient-brand px-3 py-1 text-xs font-bold">{e.category}</span>
                <span className="rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold">
                  {isUpcoming ? "UPCOMING" : "COMPLETED"}
                </span>
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold max-w-3xl">{e.title}</h1>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1.5"><Calendar className="size-4" /> {e.date}</span>
                {(e.venue || d.venue) && <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> {e.venue || d.venue}</span>}
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Description + sidebar */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold">About the event</h2>
              {e.desc && <p className="mt-4 text-lg font-medium text-foreground">{e.desc}</p>}
              {(e.overview || d.overview) && <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">{e.overview || d.overview}</p>}

              {d.objectives && d.objectives.length > 0 && (
                <>
                  <h3 className="mt-8 text-xl font-bold flex items-center gap-2"><Target className="size-5 text-[#ff3b30]" /> Objectives & Activities</h3>
                  <ul className="mt-4 space-y-3">
                    {d.objectives.map((o: string) => (
                      <li key={o} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="size-5 text-[#ff3b30] shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Impact - only show if data exists */}
            {d.impact && d.impact.length > 0 && (
              <div className="rounded-3xl p-8 gradient-brand text-white shadow-glow">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5" />
                  <h3 className="text-xl font-bold">Impact & Achievements</h3>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {d.impact.map((i: { value: string; label: string }) => (
                    <div key={i.label} className="rounded-2xl bg-white/15 backdrop-blur p-5">
                      <div className="text-3xl font-bold font-display leading-none">{i.value}</div>
                      <div className="text-sm mt-2 opacity-90">{i.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            {isUpcoming && e.registerUrl && (
              <a href={e.registerUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl gradient-brand text-white font-bold text-lg shadow-glow hover:scale-[1.02] transition-transform">
                Register Now <ArrowRight className="size-5" />
              </a>
            )}
            <div className="glass-card rounded-2xl p-6">
              <div className="text-xs font-bold text-muted-foreground tracking-wide">DATE</div>
              <div className="mt-1 font-semibold flex items-center gap-2"><Calendar className="size-4 text-[#ff3b30]" /> {e.date}</div>
            </div>
            {(e.venue || d.venue) && (
              <div className="glass-card rounded-2xl p-6">
                <div className="text-xs font-bold text-muted-foreground tracking-wide">VENUE</div>
                <div className="mt-1 font-semibold flex items-center gap-2"><MapPin className="size-4 text-[#ff3b30]" /> {e.venue || d.venue}</div>
              </div>
            )}
            {d.duration && (
              <div className="glass-card rounded-2xl p-6">
                <div className="text-xs font-bold text-muted-foreground tracking-wide">DURATION</div>
                <div className="mt-1 font-semibold flex items-center gap-2"><Clock className="size-4 text-[#ff3b30]" /> {d.duration}</div>
              </div>
            )}

            {d.speakers && d.speakers.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <div className="text-xs font-bold text-muted-foreground tracking-wide flex items-center gap-2"><Mic className="size-3.5" /> SPEAKERS & MENTORS</div>
                <ul className="mt-2 space-y-1 text-sm font-medium">
                  {d.speakers.map((s: string) => <li key={s}>• {s}</li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Gallery - only show if images exist */}
      {galleryImages.length > 0 && (
        <section className="px-4 sm:px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Event <span className="gradient-text">Gallery</span></h2>
            <p className="text-muted-foreground mb-8">Captured moments from the event</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((src: string, i: number) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-card group cursor-pointer" onClick={() => setSelectedImage(src)}>
                  <img src={src} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X className="size-8" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={selectedImage}
              alt="Gallery Preview"
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
