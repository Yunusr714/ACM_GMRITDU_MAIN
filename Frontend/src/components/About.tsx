import { motion } from "framer-motion";
import { Wrench, Code, FlaskConical, Briefcase } from "lucide-react";
import aboutImg from "@/assets/about-team.jpg";

const features = [
  { icon: Wrench, title: "Technical Workshops", desc: "Hands-on training in cutting-edge technologies." },
  { icon: Code, title: "Hackathons", desc: "24-hour innovation marathons with real-world impact." },
  { icon: FlaskConical, title: "Research Activities", desc: "Publish papers, explore AI, systems and beyond." },
  { icon: Briefcase, title: "Industry Interaction", desc: "Connect with leaders from top tech companies." },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/5]">
            <img src={aboutImg} alt="ACM Team collaborating" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-5 max-w-[200px]">
            <div className="text-3xl font-bold gradient-text">2018</div>
            <div className="text-xs text-muted-foreground mt-1">Founded with a vision for excellence</div>
          </div>
          <div className="absolute -top-6 -left-6 size-24 rounded-3xl gradient-brand opacity-20 blur-2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-bold tracking-widest text-[#ff3b30]">ABOUT US</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            Who <span className="gradient-text">We Are</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Our ACM Student Chapter is a thriving hub of innovation, where students, faculty, and industry partners converge to push the boundaries of computing. We cultivate a culture of curiosity, collaboration, and technical excellence — empowering members to lead, research, build, and inspire.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition-transform group"
              >
                <div className="size-11 rounded-xl gradient-brand grid place-items-center text-white shadow-soft group-hover:shadow-glow transition-shadow">
                  <f.icon className="size-5" />
                </div>
                <div className="mt-4 font-semibold">{f.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
