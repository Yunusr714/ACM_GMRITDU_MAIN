import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import image1 from "@/assets/caurosel_images/image1.jpeg";
import image2 from "@/assets/caurosel_images/image2.jpeg";
import image3 from "@/assets/caurosel_images/image3.jpeg";
import image4 from "@/assets/caurosel_images/image4.jpeg";

const slides = [image1, image2, image3, image4];

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

      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm">
            <Sparkles className="size-3.5 text-yellow-300" />
            ACM STUDENT CHAPTER
          </span>
          <h1 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-white drop-shadow-[0_4px_8px_rgba(200,70,62,0.8)]">
            Empowering Future Innovators<br className="hidden md:block" /> Through Technology & Research
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-sm">
            Join a vibrant community of developers, researchers, and innovators. Workshops, hackathons, coding contests, and industry-driven events.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/events"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white text-rose-600 px-8 py-4 font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl"
            >
              Explore Events <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#join"
              className="inline-flex items-center gap-2 rounded-2xl bg-black/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 font-bold text-lg hover:bg-black/30 transition-colors shadow-lg"
            >
              Join ACM
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
