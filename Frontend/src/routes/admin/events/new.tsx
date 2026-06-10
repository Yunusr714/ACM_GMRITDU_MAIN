import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEventStore } from "@/lib/store";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/events/new")({
  component: AdminEventsNew,
});

function AdminEventsNew() {
  const { addEvent } = useEventStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "Workshops" as const,
    desc: "",
    image: "", // empty initially for file upload
    venue: "",
    duration: "1 Day",
    overview: "",
    registerUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    
    addEvent({
      id,
      title: formData.title,
      date: formData.date,
      category: formData.category,
      desc: formData.desc,
      image: formData.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", // fallback
      registerUrl: formData.registerUrl,
      details: {
        participants: "0",
        teams: "0",
        mentors: "0",
        speakers: [],
        organizers: ["ACM Student Chapter"],
        venue: formData.venue || "TBD",
        overview: formData.overview,
        objectives: [],
        impact: [],
        gallery: [formData.image],
        duration: formData.duration || "1 Day",
      },
      files: [],
    });

    navigate({ to: "/admin/events/$id", params: { id } });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/admin/events" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
        <ArrowLeft className="size-4" /> Back to events
      </Link>

      <div>
        <h1 className="text-3xl font-bold font-display text-zinc-900">Create New Event</h1>
        <p className="text-zinc-500 mt-1">Fill out the basic details to create a new event. You can add files and images later.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-8 space-y-6 text-zinc-900">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold">Event Title</label>
            <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] placeholder:text-zinc-400" placeholder="e.g. React Workshop" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Category</label>
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] appearance-none text-zinc-900">
              <option value="Workshops" className="bg-white text-zinc-900">Workshops</option>
              <option value="Hackathons" className="bg-white text-zinc-900">Hackathons</option>
              <option value="Seminars" className="bg-white text-zinc-900">Seminars</option>
              <option value="Competitions" className="bg-white text-zinc-900">Competitions</option>
              <option value="Research Activities" className="bg-white text-zinc-900">Research Activities</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Date</label>
            <input required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] placeholder:text-zinc-400" placeholder="e.g. Oct 24, 2026" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Venue</label>
            <input value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] placeholder:text-zinc-400" placeholder="e.g. Main Auditorium" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Short Description</label>
          <input required value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] placeholder:text-zinc-400" placeholder="A one-sentence summary for the card..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Detailed Overview</label>
          <textarea rows={4} value={formData.overview} onChange={e => setFormData({ ...formData, overview: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] resize-none placeholder:text-zinc-400" placeholder="Full details about the event..." />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold">Google Form Link (Register URL)</label>
            <input value={formData.registerUrl} onChange={e => setFormData({ ...formData, registerUrl: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] placeholder:text-zinc-400" placeholder="https://forms.gle/..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Upload Cover Image</label>
            <input required={!formData.image} type="file" accept="image/*" onChange={e => {
              const file = e.target.files?.[0];
              if (file) setFormData({ ...formData, image: URL.createObjectURL(file) });
            }} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#ff3b30] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff3b30] file:text-white hover:file:bg-[#ff3b30]/90 text-zinc-600" />
            {formData.image && <p className="text-xs text-green-500 mt-1">Image selected successfully.</p>}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-bold shadow-glow hover:scale-105 transition-transform">
            <Save className="size-5" /> Save Event
          </button>
        </div>
      </form>
    </div>
  );
}
