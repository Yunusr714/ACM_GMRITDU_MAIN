import { createFileRoute, Link } from "@tanstack/react-router";
import { useTeamStore } from "@/lib/teamStore";
import { Plus, Edit, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/team/")({
  component: TeamAdminList,
});

function TeamAdminList() {
  const { members, isLoading, deleteMember } = useTeamStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      await deleteMember(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-zinc-900">Team Management</h1>
          <p className="text-zinc-500 mt-2">Manage faculty and student team members.</p>
        </div>
        <Link
          to="/admin/team/new"
          className="flex items-center gap-2 bg-[#ff3b30] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#ff3b30]/90 transition-colors shadow-sm shadow-[#ff3b30]/20"
        >
          <Plus className="size-5" />
          Add Member
        </Link>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-900 font-semibold">
              <tr>
                <th className="p-4 pl-6">Member</th>
                <th className="p-4">Role</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-500">
                    No team members found. Click "Add Member" to create one.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-zinc-100 shrink-0 overflow-hidden">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full grid place-items-center text-zinc-400 font-bold uppercase">
                              {member.name.slice(0, 2)}
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-zinc-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{member.role}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${member.category === 'faculty' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                        {member.category}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to="/admin/team/$id"
                          params={{ id: member.id }}
                          className="p-2 text-zinc-500 hover:text-zinc-900 bg-white border border-zinc-200 rounded-xl shadow-sm transition-all"
                        >
                          <Edit className="size-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 text-red-500 hover:text-red-600 bg-red-50 border border-red-100 rounded-xl shadow-sm transition-all"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
