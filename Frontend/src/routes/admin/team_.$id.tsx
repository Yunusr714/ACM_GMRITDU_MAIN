import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTeamStore } from "@/lib/teamStore";
import { ArrowLeft, Upload, Save } from "lucide-react";

export const Route = createFileRoute("/admin/team_/$id")({
  component: EditTeamMember,
});

function EditTeamMember() {
  const { id } = Route.useParams();
  const { members, updateMember, uploadImage } = useTeamStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const member = members.find((m) => m.id === id);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    category: "team",
    githubUrl: "",
    linkedinUrl: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        role: member.role || "",
        category: member.category || "team",
        githubUrl: member.githubUrl || "",
        linkedinUrl: member.linkedinUrl || "",
      });
    }
  }, [member]);

  if (!member) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateMember(id, formData);
      if (file) {
        await uploadImage(id, file);
      }
      navigate({ to: "/admin/team" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Link to="/admin/team" className="p-2 rounded-xl hover:bg-zinc-100 transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-display text-zinc-900">Edit Team Member</h1>
          <p className="text-zinc-500 mt-1">Update profile information for {member.name}.</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Name *</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">Role *</label>
              <input
                required
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-900">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 outline-none transition-all bg-white"
            >
              <option value="team">Student Team</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">GitHub Profile (Optional)</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">LinkedIn Profile (Optional)</label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-900">Profile Image</label>
            <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-8 text-center hover:bg-zinc-50 transition-colors">
              <div className="mx-auto size-16 rounded-xl overflow-hidden mb-4 bg-zinc-100 flex items-center justify-center">
                {file ? (
                  <span className="text-xs text-zinc-500 font-semibold truncate px-2">{file.name}</span>
                ) : member.image ? (
                  <img src={member.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="size-5 text-zinc-500" />
                )}
              </div>
              <p className="text-sm text-zinc-600 mb-4">
                {file ? "New image selected" : "Drag and drop to replace image, or click to browse"}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-semibold cursor-pointer hover:bg-zinc-50 transition-colors"
              >
                Browse Files
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex justify-end gap-4">
            <Link
              to="/admin/team"
              className="px-6 py-3 rounded-xl font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#ff3b30] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#ff3b30]/90 transition-all disabled:opacity-50"
            >
              <Save className="size-5" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
