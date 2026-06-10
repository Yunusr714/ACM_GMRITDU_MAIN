import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import a1 from "@/assets/achievement-1.jpg";
import a2 from "@/assets/achievement-2.jpg";
import a3 from "@/assets/achievement-3.jpg";

const items = [
  { img: a1, title: "Smart India Hackathon Finalist", year: "2025", category: "Hackathon", desc: "Selected among top 100 teams nationally for our AI-powered civic tech solution." },
  { img: a2, title: "National Coding Competition Winner", year: "2024", category: "Competition", desc: "1st place in the inter-university competitive programming championship." },
  { img: a3, title: "Research Paper Publication", year: "2024", category: "Research", desc: "Published in IEEE on graph neural networks for academic recommendations." },
  { img: a1, title: "Open Source Contributions", year: "2025", category: "Open Source", desc: "100+ accepted PRs across major OSS projects during Hacktoberfest." },
  { img: a2, title: "Innovation Challenge Winner", year: "2023", category: "Innovation", desc: "Awarded for sustainable IoT solution at the National Innovation Summit." },
];

export function Achievements() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4500, stopOnInteraction: false })]);

  return (
    <section className="py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[#ffb800]/10 blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-sm font-bold tracking-widest text-[#ff3b30]">PROUD MOMENTS</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Our <span className="gradient-text">Achievements</span></h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => embla?.scrollPrev()} className="size-11 rounded-full glass-card grid place-items-center hover:gradient-brand hover:text-white transition-all">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={() => embla?.scrollNext()} className="size-11 rounded-full glass-card grid place-items-center hover:gradient-brand hover:text-white transition-all">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((it, i) => (
              <div key={i} className="min-w-0 flex-[0_0_85%] md:flex-[0_0_55%] lg:flex-[0_0_40%]">
                <article className="glass-card rounded-3xl overflow-hidden h-full group">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={it.img} alt={it.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-semibold">{it.category}</span>
                    <span className="absolute top-4 right-4 rounded-full gradient-brand text-white px-3 py-1 text-xs font-bold">{it.year}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl">{it.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{it.desc}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
