import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString() + suffix);
  useEffect(() => {
    if (inView) animate(count, value, { duration: 2, ease: "easeOut" });
  }, [inView, value, count]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { value: 500, label: "Members" },
  { value: 50, label: "Technical Events" },
  { value: 25, label: "Workshops" },
  { value: 10, label: "National Achievements" },
];

export function Stats() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text font-display">
                <Counter value={s.value} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
