import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Stay Updated With ACM</h2>
            <p className="mt-4 text-white/85 max-w-xl mx-auto">Subscribe for event announcements, workshops, and opportunities — straight to your inbox.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) { toast.success("Subscribed! Welcome aboard 🎉"); setEmail(""); } }}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="flex-1 rounded-xl bg-white/95 px-5 py-3.5 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-white"
              />
              <button type="submit" className="rounded-xl gradient-warm text-white px-6 py-3.5 font-semibold hover:opacity-90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
