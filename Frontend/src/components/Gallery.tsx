import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ai from "@/assets/event-ai.jpg";
import web from "@/assets/event-web.jpg";
import hack from "@/assets/event-hack.jpg";
import cp from "@/assets/event-cp.jpg";
import a1 from "@/assets/achievement-1.jpg";
import a2 from "@/assets/achievement-2.jpg";
import a3 from "@/assets/achievement-3.jpg";

const imgs = [ai, web, hack, cp, a1, a2, a3];

export function Gallery() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [Autoplay({ delay: 2800, stopOnInteraction: false })]);
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-bold tracking-widest text-[#ff3b30]">CAPTURED MOMENTS</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Photo <span className="gradient-text">Gallery</span></h2>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 px-4">
          {[...imgs, ...imgs].map((src, i) => (
            <div key={i} className="min-w-0 flex-[0_0_70%] sm:flex-[0_0_40%] lg:flex-[0_0_25%]">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-card group">
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
