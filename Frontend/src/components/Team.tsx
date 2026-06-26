import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";
import { useTeamStore, TeamMember } from "@/lib/teamStore";

function Card({ member, accent }: { member: TeamMember; accent?: boolean }) {
  const initials = member.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group glass-card rounded-3xl p-4 hover:-translate-y-2 transition-transform relative overflow-hidden"
    >
      {member.image ? (
        <div className="size-28 rounded-2xl overflow-hidden mx-auto shadow-soft">
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={`size-20 rounded-2xl ${accent ? "gradient-brand" : "gradient-warm"} grid place-items-center text-white font-bold text-2xl mx-auto shadow-soft`}>
          {initials}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <h4 className="font-bold">{member.name}</h4>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {member.linkedinUrl && (
          <a className="size-9 rounded-full glass grid place-items-center hover:gradient-brand hover:text-white transition-all" href={member.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="size-4" />
          </a>
        )}
        {member.githubUrl && (
          <a className="size-9 rounded-full glass grid place-items-center hover:gradient-brand hover:text-white transition-all" href={member.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="size-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Team() {
  const { members, isLoading } = useTeamStore();

  const faculty = members.filter(m => m.category === "faculty");
  const team = members.filter(m => m.category === "team");

  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold tracking-widest text-[#ff3b30]">OUR PEOPLE</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Faculty & <span className="gradient-text">Team</span></h2>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground animate-pulse">Loading team...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Team data not available yet.</div>
        ) : (
          <>
            {faculty.length > 0 && (
              <>
                <h3 className="font-bold text-xl mb-6">Faculty Coordinators</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-14">
                  {faculty.map(f => <Card key={f.id} member={f} accent />)}
                </div>
              </>
            )}

            {team.length > 0 && (
              <>
                <h3 className="font-bold text-xl mb-6">Student Team</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                  {team.map(m => <Card key={m.id} member={m} />)}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
