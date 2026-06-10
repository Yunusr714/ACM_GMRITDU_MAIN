import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/#about", label: "About" },
  { to: "/#team", label: "Team" },
  { to: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 inset-x-4 z-50 mx-auto max-w-6xl"
    >
      <nav className="glass-card rounded-2xl px-5 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="size-9 rounded-xl gradient-brand grid place-items-center text-white font-bold shadow-glow">A</span>
          <span className="font-display font-bold text-lg">ACM <span className="text-muted-foreground font-medium">Chapter</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links.map(l => (
            <a key={l.to} href={l.to} className="text-foreground/70 hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </div>
        <a href="/#join" className="hidden md:inline-flex items-center gap-2 rounded-xl gradient-brand text-white px-4 py-2 text-sm font-semibold shadow-soft hover:shadow-glow transition-shadow">
          Join ACM
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden mt-2 glass-card rounded-2xl p-4 flex flex-col gap-3">
          {links.map(l => (
            <a key={l.to} href={l.to} onClick={() => setOpen(false)} className="text-sm font-medium">{l.label}</a>
          ))}
          <a href="/#join" className="rounded-xl gradient-brand text-white px-4 py-2 text-sm font-semibold text-center">Join ACM</a>
        </div>
      )}
    </motion.header>
  );
}
