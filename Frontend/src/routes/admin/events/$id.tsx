import { createFileRoute, Outlet, Link, useParams, useLocation } from "@tanstack/react-router";
import { ArrowLeft, Settings, FolderOpen, Image as ImageIcon } from "lucide-react";
import { useEventStore } from "@/lib/store";

export const Route = createFileRoute("/admin/events/$id")({
  component: AdminEventDetailLayout,
});

function AdminEventDetailLayout() {
  const { id } = useParams({ from: "/admin/events/$id" });
  const { events } = useEventStore();
  const location = useLocation();

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <Link to="/admin/events" className="text-[#ff3b30] mt-4 inline-block">Return to events</Link>
      </div>
    );
  }

  const tabs = [
    { label: "Details", href: `/admin/events/${id}`, icon: Settings, exact: true },
    { label: "Files", href: `/admin/events/${id}/files`, icon: FolderOpen, exact: false },
    { label: "Images", href: `/admin/events/${id}/images`, icon: ImageIcon, exact: false },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <Link to="/admin/events" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
        <ArrowLeft className="size-4" /> Back to events
      </Link>

      <div className="flex items-center gap-4">
        <img src={event.image} alt="" className="size-16 rounded-xl object-cover border border-zinc-200" />
        <div>
          <h1 className="text-3xl font-bold font-display text-zinc-900">{event.title}</h1>
          <p className="text-zinc-500">{event.date} • {event.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-zinc-200 pb-4">
        {tabs.map((tab) => {
          const isActive = tab.exact ? location.pathname === tab.href : location.pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              to={tab.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <tab.icon className="size-4" /> {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="pt-2">
        <Outlet />
      </div>
    </div>
  );
}
