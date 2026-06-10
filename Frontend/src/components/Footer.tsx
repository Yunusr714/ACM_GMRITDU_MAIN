import { Linkedin, Instagram, Github, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-6 pb-8 pt-16">
      <div className="max-w-7xl mx-auto glass-card rounded-3xl p-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="size-10 rounded-xl gradient-brand grid place-items-center text-white font-bold">A</span>
              <span className="font-display font-bold text-lg">ACM Chapter</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">A student-led community advancing computing, research, and innovation on campus and beyond.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["Home","About","Events","Gallery","Team","Contact"].map(l => (
                <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["ACM Global","Membership","Blogs","Research"].map(l => (
                <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Social</h4>
            <div className="flex gap-2.5">
              {[Linkedin, Instagram, Github, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="size-10 rounded-xl glass grid place-items-center hover:gradient-brand hover:text-white transition-all" aria-label="social">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2026 ACM Student Chapter. All Rights Reserved.</p>
          <p>Designed with Innovation & Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
