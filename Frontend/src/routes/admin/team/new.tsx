import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTeamStore } from "@/lib/teamStore";
import { ArrowLeft, Upload, Save } from "lucide-react";

export const Route = createFileRoute("/admin/team/new")({
  component: NewTeamMember,
});

function NewTeamMember() {
  const { addMember, uploadImage } = useTeamStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    category: "team",
    githubUrl: "",
    linkedinUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const member = await addMember(formData);
      if (member && file) {
        await uploadImage(member.id, file);
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
          <h1 className="text-3xl font-bold font-display text-zinc-900">Add Team Member</h1>
          <p className="text-zinc-500 mt-1">Create a new faculty or student member profile.</p>
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
                placeholder="e.g. Aarav Mehta"
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
                placeholder="e.g. Chairperson"
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
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900">LinkedIn Profile (Optional)</label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 outline-none transition-all"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-900">Profile Image</label>
            <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-8 text-center hover:bg-zinc-50 transition-colors">
              <div className="mx-auto size-12 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="size-5 text-zinc-500" />
              </div>
              <p className="text-sm text-zinc-600 mb-4">
                {file ? file.name : "Drag and drop an image, or click to browse"}
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
              {isSubmitting ? "Saving..." : "Save Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
