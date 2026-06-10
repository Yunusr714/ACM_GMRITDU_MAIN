import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Trophy, Network } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import heroVisual from "@/assets/hero-visual.jpg";
import a1 from "@/assets/achievement-1.jpg";
import a2 from "@/assets/achievement-2.jpg";
import a3 from "@/assets/achievement-3.jpg";
import e1 from "@/assets/event-hack.jpg";
import e2 from "@/assets/event-ai.jpg";

const slides = [heroVisual, a1, e1, a2, e2, a3];

export function Hero() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 4200, stopOnInteraction: false })]
  );

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0 -z-10">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((src, i) => (
              <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Warm overlay — solid, no blur */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,59,48,0.70) 0%, rgba(255,122,26,0.55) 45%, rgba(255,184,0,0.70) 100%)",
          }}
        />
      </div>

      {/* Soft blobs */}
      <div className="absolute -top-20 -left-32 size-[420px] rounded-full bg-[#ff3b30]/25 blur-3xl animate-blob -z-10" />
      <div className="absolute top-40 -right-40 size-[480px] rounded-full bg-[#ffb800]/30 blur-3xl animate-blob -z-10" style={{ animationDelay: "3s" }} />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 rounded-3xl p-8 md:p-10"
        >
          <span className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide">
            <Sparkles className="size-3.5 text-[#ff3b30]" />
            ACM STUDENT CHAPTER
          </span>
          <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
            Empowering Future <span className="gradient-text">Innovators</span> Through Technology & Research
          </h1>
          <p className="mt-5 text-base text-muted-foreground max-w-xl leading-relaxed">
            Join a vibrant community of developers, researchers, and innovators. Workshops, hackathons, coding contests, and industry-driven events.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/events"
              className="group inline-flex items-center gap-2 rounded-2xl gradient-brand text-white px-6 py-3.5 font-semibold hover:scale-[1.02] transition-transform"
            >
              Explore Events <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#join"
              className="inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-6 py-3.5 font-semibold hover:bg-muted transition-colors"
            >
              Join ACM
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="size-9 rounded-full border-2 border-background gradient-brand"
                  style={{ filter: `hue-rotate(${i * 15}deg)` }}
                />
              ))}
            </div>
            <div>
              <div className="font-bold">500+ Members</div>
              <div className="text-muted-foreground text-xs">Active across 4 years</div>
            </div>
          </div>
        </motion.div>

        {/* Floating stat cards — clean, no neumorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[420px] lg:h-[500px] hidden lg:block"
        >
          <motion.div
            className="absolute top-6 left-4 bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="size-12 rounded-2xl gradient-warm grid place-items-center text-white">
              <Code2 className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Active Projects</div>
              <div className="font-bold text-lg">24 Live</div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <div className="size-12 rounded-2xl gradient-brand grid place-items-center text-white">
              <Trophy className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Awards</div>
              <div className="font-bold text-lg">10+ National</div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-6 left-12 bg-white rounded-3xl p-5 flex items-center gap-3 shadow-sm"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
          >
            <div className="size-12 rounded-2xl gradient-warm grid place-items-center text-white">
              <Network className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Network</div>
              <div className="font-bold text-lg">50+ Events</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
