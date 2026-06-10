import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { upcomingEvents } from "@/lib/events-data";

export function UpcomingEventsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 35 },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative px-4 sm:px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#ff3b30]/10 text-[#ff3b30] px-3 py-1 text-xs font-bold tracking-wide">
              <Sparkles className="size-3.5" /> UPCOMING
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Register for <span className="gradient-text">what's next</span>
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={prev} aria-label="Previous" className="size-11 rounded-full bg-white border border-border shadow-sm hover:gradient-brand hover:text-white transition-all grid place-items-center">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={next} aria-label="Next" className="size-11 rounded-full bg-white border border-border shadow-sm hover:gradient-brand hover:text-white transition-all grid place-items-center">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden shadow-card border border-white/60">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {upcomingEvents.map((e) => (
                <div key={e.id} className="relative flex-[0_0_100%] min-w-0">
                  <div className="grid md:grid-cols-5 min-h-[460px] md:min-h-[520px]">
                    {/* Poster */}
                    <div className="relative md:col-span-3 aspect-[16/10] md:aspect-auto overflow-hidden">
                      <img src={e.poster} alt={e.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1280} height={720} />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="rounded-full gradient-brand text-white px-3 py-1 text-xs font-bold">{e.category}</span>
                        <span className="rounded-full bg-white/95 text-foreground px-3 py-1 text-xs font-bold">UPCOMING</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 bg-white p-6 md:p-8 flex flex-col justify-between gap-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={e.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.35 }}
                        >
                          <h3 className="text-2xl md:text-3xl font-bold leading-tight">{e.title}</h3>
                          <p className="mt-3 text-muted-foreground leading-relaxed">{e.tagline}</p>
                          <div className="mt-5 space-y-2 text-sm">
                            <div className="flex items-center gap-2"><Calendar className="size-4 text-[#ff3b30]" /> <span className="font-semibold">{e.date}</span></div>
                            <div className="flex items-center gap-2"><MapPin className="size-4 text-[#ff3b30]" /> {e.venue}</div>
                          </div>
                          {/* Supporting thumbnails */}
                          <div className="mt-5 grid grid-cols-2 gap-2">
                            {e.supporting.map((src, i) => (
                              <div key={i} className="relative aspect-[16/10] rounded-xl overflow-hidden">
                                <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <a
                        href={e.registerUrl}
                        className="group inline-flex items-center justify-center gap-2 rounded-2xl gradient-brand text-white px-6 py-4 font-bold text-base shadow-glow hover:scale-[1.02] transition-transform"
                      >
                        Register Now
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
            {upcomingEvents.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${selected === i ? "w-8 gradient-brand" : "w-2 bg-white/70"}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop dots */}
        <div className="hidden md:flex justify-center gap-2 mt-5">
          {upcomingEvents.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${selected === i ? "w-10 gradient-brand" : "w-2 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
