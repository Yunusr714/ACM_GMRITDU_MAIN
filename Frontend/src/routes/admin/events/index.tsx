import { createFileRoute, Link } from "@tanstack/react-router";
import { useEventStore } from "@/lib/store";
import { PlusCircle, Search, Edit, Trash2, FolderOpen, Image as ImageIcon, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/events/")({
  component: AdminEventsList,
});

function AdminEventsList() {
  const { events, deleteEvent } = useEventStore();
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      deleteEvent(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-zinc-900">Manage Events</h1>
          <p className="text-zinc-500 mt-1">Create, edit, and organize all your events.</p>
        </div>
        <Link to="/admin/events/new" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl gradient-brand text-white font-bold shadow-glow hover:scale-105 transition-transform">
          <PlusCircle className="size-5" />
          Create Event
        </Link>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 w-full max-w-sm focus-within:ring-2 ring-[#ff3b30] transition-all">
            <Search className="size-4 text-zinc-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search by title or category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-500 text-zinc-900"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
              <tr>
                <th className="px-6 py-4">Event Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Assets</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-900">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-zinc-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={e.image} alt="" className="size-12 rounded-lg object-cover" />
                      <div className="font-bold text-base">{e.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-zinc-900">{e.date}</div>
                    {(e.venue || e.details?.venue) && (
                      <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                        <MapPin className="size-3" /> {e.venue || e.details?.venue}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold">{e.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500">
                      <span className="flex items-center gap-1" title="Files">
                        <FolderOpen className="size-4" /> {e.files?.length || 0}
                      </span>
                      <span className="flex items-center gap-1" title="Images">
                        <ImageIcon className="size-4" /> {e.details?.gallery?.length || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 transition-opacity">
                      <Link to="/admin/events/$id" params={{ id: e.id }} className="p-2 rounded-lg bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 transition-colors text-zinc-900" title="Edit">
                        <Edit className="size-4" />
                      </Link>
                      <button onClick={() => handleDelete(e.id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="Delete">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    No events found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
