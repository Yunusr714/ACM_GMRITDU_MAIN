import { Bell, Search, UserCircle } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="h-20 bg-white text-zinc-900 border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-full px-4 py-2 w-96 focus-within:ring-2 ring-[#ff3b30] transition-all">
        <Search className="size-4 text-zinc-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search events, files..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-400 text-zinc-900"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors">
          <Bell className="size-5" />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-[#ff3b30]"></span>
        </button>
        <div className="h-8 w-px bg-zinc-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-sm font-bold">Admin User</div>
            <div className="text-xs text-zinc-500">admin@acm.org</div>
          </div>
          <UserCircle className="size-9 text-zinc-400" />
        </div>
      </div>
    </header>
  );
}
