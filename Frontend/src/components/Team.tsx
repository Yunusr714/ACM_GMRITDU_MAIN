import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";

const faculty = [
  { name: "Dr. Anjali Verma", role: "Faculty Advisor", initials: "AV" },
  { name: "Prof. Ramesh Iyer", role: "Faculty Co-Advisor", initials: "RI" },
];

const team = [
  { name: "Aarav Mehta", role: "Chairperson", initials: "AM" },
  { name: "Priya Sharma", role: "Vice Chairperson", initials: "PS" },
  { name: "Rohan Kapoor", role: "Secretary", initials: "RK" },
  { name: "Neha Patel", role: "Treasurer", initials: "NP" },
  { name: "Ishaan Rao", role: "Technical Lead", initials: "IR" },
  { name: "Sara Khan", role: "Design Lead", initials: "SK" },
];

function Card({ name, role, initials, accent }: { name: string; role: string; initials: string; accent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group glass-card rounded-3xl p-6 hover:-translate-y-2 transition-transform relative overflow-hidden"
    >
      <div className={`size-20 rounded-2xl ${accent ? "gradient-brand" : "gradient-warm"} grid place-items-center text-white font-bold text-2xl mx-auto shadow-soft`}>
        {initials}
      </div>
      <div className="mt-4 text-center">
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
      <div className="mt-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <a className="size-9 rounded-full glass grid place-items-center hover:gradient-brand hover:text-white transition-all" href="#" aria-label="LinkedIn"><Linkedin className="size-4" /></a>
        <a className="size-9 rounded-full glass grid place-items-center hover:gradient-brand hover:text-white transition-all" href="#" aria-label="GitHub"><Github className="size-4" /></a>
        <a className="size-9 rounded-full glass grid place-items-center hover:gradient-brand hover:text-white transition-all" href="#" aria-label="Email"><Mail className="size-4" /></a>
      </div>
    </motion.div>
  );
}

export function Team() {
  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold tracking-widest text-[#ff3b30]">OUR PEOPLE</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Faculty & <span className="gradient-text">Team</span></h2>
        </div>

        <h3 className="font-bold text-xl mb-6">Faculty Coordinators</h3>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mb-14">
          {faculty.map(f => <Card key={f.name} {...f} accent />)}
        </div>

        <h3 className="font-bold text-xl mb-6">Student Team</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {team.map(m => <Card key={m.name} {...m} />)}
        </div>
      </div>
    </section>
  );
}
