import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { RecentEvents } from "@/components/RecentEvents";
import { WhyJoin } from "@/components/WhyJoin";
import { Team } from "@/components/Team";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACM Student Chapter — Empowering Future Innovators" },
      { name: "description", content: "Join our ACM Student Chapter — workshops, hackathons, research, and a thriving community of innovators." },
      { property: "og:title", content: "ACM Student Chapter" },
      { property: "og:description", content: "Empowering future innovators through technology and research." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Achievements />
        <RecentEvents />
        <WhyJoin />
        <Team />
        <Gallery />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
