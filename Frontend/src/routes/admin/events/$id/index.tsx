import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEventStore } from "@/lib/store";
import { Save, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/events/$id/")({
  component: AdminEventEdit,
});

function AdminEventEdit() {
  const { id } = useParams({ from: "/admin/events/$id/" });
  const { events, updateEvent } = useEventStore();
  
  const event = events.find(e => e.id === id);
  const [saved, setSaved] = useState(false);

  // We keep a local copy of formData for editing
  const [formData, setFormData] = useState(event || {} as any);

  useEffect(() => {
    if (event) setFormData(event);
  }, [event]);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent(id, formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
  return (
    <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-8 space-y-8 text-zinc-900">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold">Event Title</label>
          <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30]" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Category</label>
          <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] appearance-none text-zinc-900">
            <option value="Workshops" className="bg-white text-zinc-900">Workshops</option>
            <option value="Hackathons" className="bg-white text-zinc-900">Hackathons</option>
            <option value="Seminars" className="bg-white text-zinc-900">Seminars</option>
            <option value="Competitions" className="bg-white text-zinc-900">Competitions</option>
            <option value="Research Activities" className="bg-white text-zinc-900">Research Activities</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Date</label>
          <input value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30]" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Venue</label>
          <input value={formData.details?.venue} onChange={e => setFormData({ ...formData, details: { ...formData.details, venue: e.target.value }})} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30]" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold">Short Description</label>
        <input value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30]" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold">Detailed Overview</label>
        <textarea rows={5} value={formData.details?.overview} onChange={e => setFormData({ ...formData, details: { ...formData.details, overview: e.target.value }})} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] resize-none" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold">Google Form Link (Register URL)</label>
          <input value={formData.registerUrl || ""} onChange={e => setFormData({ ...formData, registerUrl: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#ff3b30] placeholder:text-zinc-400" placeholder="https://forms.gle/..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Upload Cover Image</label>
          <input type="file" accept="image/*" onChange={e => {
            const file = e.target.files?.[0];
            if (file) setFormData({ ...formData, image: URL.createObjectURL(file) });
          }} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 outline-none focus:ring-2 ring-[#ff3b30] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff3b30] file:text-white hover:file:bg-[#ff3b30]/90 text-zinc-600" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        {saved && <span className="text-sm text-green-500 flex items-center gap-1 font-bold"><CheckCircle className="size-4" /> Saved!</span>}
        <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-bold shadow-glow hover:scale-105 transition-transform">
          <Save className="size-5" /> Save Changes
        </button>
      </div>
    </form>
  );
}
