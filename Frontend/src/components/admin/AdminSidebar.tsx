import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, CalendarDays, PlusCircle, Settings, LogOut, ShieldAlert } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: CalendarDays, label: "Events", href: "/admin/events" },
  { icon: PlusCircle, label: "New Event", href: "/admin/events/new" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white text-zinc-900 h-screen fixed left-0 top-0 border-r border-zinc-200 flex flex-col z-40">
      <div className="p-6 border-b border-zinc-200">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span>Admin <span className="gradient-text">ACM</span></span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">Menu</div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== "/admin" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                  ? "gradient-brand text-white shadow-glow"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-200 space-y-2">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-all">
          <LogOut className="size-4" />
          Exit Admin
        </Link>
      </div>
    </aside>
  );
}
