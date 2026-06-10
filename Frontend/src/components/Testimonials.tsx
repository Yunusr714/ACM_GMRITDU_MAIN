import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";

const items = [
  { name: "Aditya Singh", role: "B.Tech CSE, 4th Year", feedback: "ACM gave me the platform to lead projects, win hackathons, and land my dream internship. The mentorship is unmatched." },
  { name: "Meera Joshi", role: "B.Tech IT, 3rd Year", feedback: "From shy fresher to research publication co-author — the community here pushes you to dream bigger every single day." },
  { name: "Karan Desai", role: "B.Tech ECE, 4th Year", feedback: "The workshops are world-class. I learned more in one bootcamp than in an entire semester of self-study." },
  { name: "Ananya Reddy", role: "B.Tech CSE, 2nd Year", feedback: "Being part of ACM means being surrounded by brilliant minds who challenge and inspire you constantly." },
];

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 5000 })]);
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-bold tracking-widest text-[#ff3b30]">VOICES</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">What Our <span className="gradient-text">Members Say</span></h2>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((t, i) => (
              <div key={i} className="min-w-0 flex-[0_0_90%] md:flex-[0_0_50%] lg:flex-[0_0_33%]">
                <div className="glass-card rounded-3xl p-7 h-full">
                  <Quote className="size-8 text-[#ff3b30]" />
                  <p className="mt-4 text-foreground/80 leading-relaxed">{t.feedback}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="size-11 rounded-full gradient-brand grid place-items-center text-white font-bold">{t.name[0]}</div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
