import { MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold tracking-widest text-[#ff3b30]">GET IN TOUCH</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Contact <span className="gradient-text">Us</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <div className="glass-card rounded-2xl p-6 flex gap-4">
              <div className="size-12 rounded-xl gradient-brand grid place-items-center text-white shrink-0"><MapPin className="size-5" /></div>
              <div>
                <h4 className="font-bold">Address</h4>
                <p className="text-sm text-muted-foreground mt-1">Department of Computer Science, College Campus, City – 560001, India</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 flex gap-4">
              <div className="size-12 rounded-xl gradient-brand grid place-items-center text-white shrink-0"><Mail className="size-5" /></div>
              <div>
                <h4 className="font-bold">Email</h4>
                <p className="text-sm text-muted-foreground mt-1">acm.chapter@college.edu</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 flex gap-4">
              <div className="size-12 rounded-xl gradient-brand grid place-items-center text-white shrink-0"><Phone className="size-5" /></div>
              <div>
                <h4 className="font-bold">Phone</h4>
                <p className="text-sm text-muted-foreground mt-1">+91 98765 43210</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden h-64">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.55%2C12.95%2C77.65%2C13.02&layer=mapnik"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll get back to you soon."); (e.target as HTMLFormElement).reset(); }}
            className="glass-card rounded-3xl p-8 space-y-5"
          >
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input required className="mt-2 w-full rounded-xl bg-white border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff3b30]/40" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input required type="email" className="mt-2 w-full rounded-xl bg-white border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff3b30]/40" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm font-semibold">Message</label>
              <textarea required rows={5} className="mt-2 w-full rounded-xl bg-white border border-border px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff3b30]/40 resize-none" placeholder="How can we help?" />
            </div>
            <button type="submit" className="w-full rounded-xl gradient-brand text-white py-3.5 font-semibold shadow-soft hover:shadow-glow transition-shadow">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
