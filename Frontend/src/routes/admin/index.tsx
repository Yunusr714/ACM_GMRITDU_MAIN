import { createFileRoute, Link } from "@tanstack/react-router";
import { useEventStore } from "@/lib/store";
import { CalendarDays, Users, FileText, Image as ImageIcon, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { events } = useEventStore();
  
  const totalEvents = events.length;
  const totalFiles = events.reduce((acc, e) => acc + (e.files?.length || 0), 0);
  const totalImages = events.reduce((acc, e) => acc + (e.details?.gallery?.length || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold font-display text-zinc-900">Welcome Back, Admin</h1>
        <p className="text-zinc-500 mt-2">Here's what's happening with your events today.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={CalendarDays} label="Total Events" value={totalEvents} />
        <StatCard icon={Users} label="Total Registrations" value={"1,240"} />
        <StatCard icon={FileText} label="Uploaded Files" value={totalFiles} />
        <StatCard icon={ImageIcon} label="Gallery Images" value={totalImages} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900">Recent Events</h2>
            <Link to="/admin/events" className="text-sm text-[#ff3b30] hover:text-[#ff3b30]/80 font-medium flex items-center gap-1 group">
              View All <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {events.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl overflow-hidden shrink-0">
                    <img src={e.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900">{e.title}</h3>
                    <p className="text-xs text-zinc-500">{e.date} • {e.category}</p>
                  </div>
                </div>
                <Link to="/admin/events/$id" params={{ id: e.id }} className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-zinc-200 shadow-sm hover:border-zinc-300 transition-all text-zinc-900">
                  Manage
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-6 text-zinc-900">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin/events/new" className="flex items-center gap-3 p-4 rounded-2xl bg-[#ff3b30]/10 border border-[#ff3b30]/20 hover:bg-[#ff3b30]/20 text-[#ff3b30] transition-colors group">
              <div className="p-2 rounded-full bg-[#ff3b30]/20 group-hover:scale-110 transition-transform">
                <CalendarDays className="size-5" />
              </div>
              <span className="font-bold">Create New Event</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform">
      <div className="absolute -right-6 -top-6 size-24 bg-[#ff3b30]/10 rounded-full blur-2xl group-hover:bg-[#ff3b30]/20 transition-colors" />
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-2xl bg-zinc-100 text-zinc-900">
          <Icon className="size-6" />
        </div>
        <div className="text-sm font-medium text-zinc-500">{label}</div>
      </div>
      <div className="text-4xl font-bold font-display text-zinc-900">{value}</div>
    </div>
  );
}
