import ai from "@/assets/event-ai.jpg";
import web from "@/assets/event-web.jpg";
import hack from "@/assets/event-hack.jpg";
import cp from "@/assets/event-cp.jpg";
import upAi1 from "@/assets/upcoming-ai-1.jpg";
import upAi2 from "@/assets/upcoming-ai-2.jpg";
import upHack1 from "@/assets/upcoming-hack-1.jpg";
import upHack2 from "@/assets/upcoming-hack-2.jpg";
import upWeb1 from "@/assets/upcoming-web-1.jpg";
import upWeb2 from "@/assets/upcoming-web-2.jpg";
import a1 from "@/assets/achievement-1.jpg";
import a2 from "@/assets/achievement-2.jpg";
import a3 from "@/assets/achievement-3.jpg";

export type Event = {
  id: string;
  title: string;
  date: string;
  category: "Workshops" | "Hackathons" | "Seminars" | "Competitions" | "Research Activities";
  desc: string;
  image: string;
  registerUrl?: string;
  overview?: string;
  venue?: string;
};

export const events: Event[] = [
  { id: "ai-workshop", title: "AI Workshop", date: "Nov 12, 2025", category: "Workshops", desc: "Hands-on session on building modern LLM apps with retrieval-augmented generation.", image: ai },
  { id: "web-bootcamp", title: "Web Development Bootcamp", date: "Oct 28, 2025", category: "Workshops", desc: "Full-stack curriculum spanning React, TypeScript, and edge deployment.", image: web },
  { id: "hackathon-2025", title: "Hackathon 2025", date: "Oct 14, 2025", category: "Hackathons", desc: "24-hour innovation marathon with 150+ participants and ₹2L prize pool.", image: hack },
  { id: "cp-contest", title: "Competitive Programming Contest", date: "Sep 30, 2025", category: "Competitions", desc: "Algorithmic showdown featuring problems curated by national-level coders.", image: cp },
  { id: "research-talk", title: "Research Talk: Quantum Computing", date: "Sep 20, 2025", category: "Seminars", desc: "Industry expert discusses the future of quantum algorithms.", image: ai },
  { id: "open-source-day", title: "Open Source Contribution Day", date: "Sep 10, 2025", category: "Research Activities", desc: "Guided contributions to flagship OSS projects with mentor pairing.", image: web },
  { id: "design-jam", title: "UI/UX Design Jam", date: "Aug 22, 2025", category: "Workshops", desc: "Designing accessible interfaces with Figma and modern tooling.", image: hack },
  { id: "iot-summit", title: "IoT Innovation Summit", date: "Aug 5, 2025", category: "Seminars", desc: "Exploring connected devices and edge intelligence with industry leaders.", image: cp },
];

export type UpcomingEvent = {
  id: string;
  title: string;
  date: string;
  venue: string;
  tagline: string;
  category: Event["category"];
  poster: string;
  registerUrl: string;
};

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "ai-summit-2026",
    title: "AI & ML Summit 2026",
    date: "Jan 18, 2026",
    venue: "CS Auditorium, Main Block",
    tagline: "Build production-ready LLM applications with RAG, agents and fine-tuning.",
    category: "Workshops",
    poster: upAi1,
    registerUrl: "#register-ai-summit-2026",
  },
  {
    id: "hackfest-2026",
    title: "HackFest 2026 — 36 Hour Hackathon",
    date: "Feb 7, 2026",
    venue: "Innovation Hub, Block C",
    tagline: "₹3L prize pool. 200+ hackers. One unforgettable weekend of building.",
    category: "Hackathons",
    poster: upHack1,
    registerUrl: "#register-hackfest-2026",
  },
  {
    id: "web-bootcamp-2026",
    title: "Full-Stack Web Bootcamp",
    date: "Feb 22, 2026",
    venue: "Lab 204, IT Block",
    tagline: "React, TypeScript, edge deployment — ship a real product in 5 days.",
    category: "Workshops",
    poster: upWeb1,
    registerUrl: "#register-web-bootcamp-2026",
  },
];

export type EventDetail = {
  participants: string;
  teams: string;
  mentors: string;
  speakers: string[];
  organizers: string[];
  venue: string;
  overview: string;
  objectives: string[];
  impact: { value: string; label: string }[];
  gallery: string[];
  duration: string;
};

const defaultDetail: EventDetail = {
  participants: "180+",
  teams: "40+",
  mentors: "8",
  speakers: ["Dr. Anjali Rao — IIT Bombay", "Karthik Menon — Google DeepMind"],
  organizers: ["ACM Student Chapter", "Department of CSE"],
  venue: "CS Auditorium, Main Block",
  overview:
    "A flagship ACM Chapter event that brought together students, faculty, and industry mentors for an immersive learning experience. Attendees gained hands-on exposure, networked with peers, and walked away with practical takeaways they can apply immediately in projects and research.",
  objectives: [
    "Expose students to industry-grade tooling and workflows",
    "Foster collaborative problem solving through real-world challenges",
    "Connect students with mentors and recruiters",
    "Showcase ACM Chapter's research and innovation culture",
  ],
  impact: [
    { value: "200+", label: "Students upskilled" },
    { value: "12", label: "Projects shipped" },
    { value: "40%", label: "Chapter engagement boost" },
    { value: "8", label: "Industry partners onboarded" },
  ],
  gallery: [a1, a2, a3, ai, hack, web, cp, upAi2, upHack2],
  duration: "1 Day",
};

export const eventDetails: Record<string, EventDetail> = {
  "ai-workshop": {
    ...defaultDetail,
    participants: "250+",
    teams: "—",
    mentors: "10",
    overview:
      "An immersive AI Workshop where students built end-to-end LLM applications using retrieval-augmented generation. Across two intensive days, attendees worked through embeddings, vector stores, prompt engineering, evaluation, and deployment to the edge.",
    objectives: [
      "Demystify modern LLM architectures and tooling",
      "Build a working RAG application from scratch",
      "Introduce evaluation, guardrails and observability",
      "Deploy production-ready AI on edge runtimes",
    ],
    impact: [
      { value: "250+", label: "Students upskilled in LLM dev" },
      { value: "60+", label: "RAG apps prototyped" },
      { value: "100%", label: "Hands-on lab completion" },
      { value: "12", label: "Mentor-led project pods" },
    ],
    speakers: ["Dr. Anjali Rao — IIT Bombay", "Karthik Menon — Google DeepMind", "Priya Shah — OpenAI Research"],
    duration: "2 Days",
  },
  "web-bootcamp": {
    ...defaultDetail,
    participants: "180+",
    teams: "36",
    overview:
      "A five-day Web Development Bootcamp covering React, TypeScript, modern CSS, and edge deployment. Participants shipped a portfolio-grade full-stack application by the final day.",
    impact: [
      { value: "180+", label: "Students learned full-stack" },
      { value: "36", label: "Apps deployed live" },
      { value: "40%", label: "Increased chapter engagement" },
      { value: "5", label: "Industry mentors onboarded" },
    ],
    duration: "5 Days",
  },
  "hackathon-2025": {
    ...defaultDetail,
    participants: "320+",
    teams: "65",
    mentors: "15",
    overview:
      "A 24-hour Hackathon featuring tracks across AI, Web3, sustainability and dev tooling. Teams pitched to a panel of industry judges with a combined ₹2L prize pool.",
    impact: [
      { value: "320+", label: "Hackers participated" },
      { value: "65", label: "Teams shipped MVPs" },
      { value: "₹2L", label: "Prize pool distributed" },
      { value: "15", label: "Industry mentors" },
    ],
    duration: "24 Hours",
  },
};

export const getEventDetail = (id: string): EventDetail => eventDetails[id] ?? defaultDetail;
