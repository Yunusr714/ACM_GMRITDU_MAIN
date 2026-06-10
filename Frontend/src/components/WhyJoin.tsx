import { motion } from "framer-motion";
import { Users, Building2, Crown, Rocket, Microscope, Award } from "lucide-react";

const benefits = [
  { icon: Users, title: "Networking Opportunities", desc: "Connect with peers, alumni, and global ACM members." },
  { icon: Building2, title: "Industry Exposure", desc: "Engage with leading tech companies via talks and visits." },
  { icon: Crown, title: "Leadership Development", desc: "Lead committees, events, and initiatives that shape the chapter." },
  { icon: Rocket, title: "Technical Skill Growth", desc: "Master modern stacks through workshops and hands-on projects." },
  { icon: Microscope, title: "Research Opportunities", desc: "Collaborate on papers and explore frontier research domains." },
  { icon: Award, title: "National Competitions", desc: "Represent your chapter on the biggest stages in the country." },
];

export function WhyJoin() {
  return (
    <section id="join" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-bold tracking-widest text-[#ff3b30]">MEMBER BENEFITS</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Why <span className="gradient-text">Join ACM</span>?</h2>
          <p className="mt-4 text-muted-foreground">Unlock a platform for growth, innovation, and lifelong connection in the world of computing.</p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-3xl p-7 hover:-translate-y-2 hover:shadow-glow transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity gradient-brand" style={{ opacity: 0 }} />
              <div className="size-14 rounded-2xl gradient-brand grid place-items-center text-white shadow-soft mb-5 group-hover:scale-110 transition-transform">
                <b.icon className="size-6" />
              </div>
              <h3 className="font-bold text-lg">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
