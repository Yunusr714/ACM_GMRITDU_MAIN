import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEventStore } from "@/lib/store";
import { Upload, FileText, Trash2, ShieldAlert } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/events/$id/files")({
  component: AdminEventFiles,
});

function AdminEventFiles() {
  const { id } = useParams({ from: "/admin/events/$id/files" });
  const { events, addFile, deleteFile } = useEventStore();
  const event = events.find(e => e.id === id);
  const [uploading, setUploading] = useState(false);

  if (!event) return null;

  // Fake file upload handler for demo purposes since there's no real backend
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      const newFile = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        url: URL.createObjectURL(file), // Local object URL for demo
        size: (file.size / 1024).toFixed(2) + " KB",
      };
      addFile(id, newFile);
      setUploading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 rounded-2xl p-4 flex items-start gap-3">
        <ShieldAlert className="size-5 text-[#ff3b30] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-[#ff3b30]">Admin Only Access</h3>
          <p className="text-sm text-[#ff3b30]/80 mt-1">Files uploaded here are strictly accessible to administrators and will not be displayed on the student-facing event pages.</p>
        </div>
      </div>

      <div className="bg-white border-dashed border-2 border-zinc-300 shadow-sm rounded-3xl p-8 text-center hover:border-[#ff3b30] transition-colors cursor-pointer relative text-zinc-900">
        <input 
          type="file" 
          onChange={handleFileUpload} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          disabled={uploading}
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-zinc-50 text-zinc-500">
            {uploading ? <div className="size-8 border-4 border-zinc-200 border-t-[#ff3b30] rounded-full animate-spin" /> : <Upload className="size-8" />}
          </div>
          <div>
            <h3 className="font-bold text-lg text-zinc-900">Upload Event Files</h3>
            <p className="text-sm text-zinc-500 mt-1">Drag and drop or click to select files (PDFs, ZIPs, Docs)</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="font-bold text-xl text-zinc-900">Uploaded Files ({event.files.length})</h3>
        {event.files.length === 0 && (
          <p className="text-zinc-500 text-sm italic">No files uploaded yet.</p>
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          {event.files.map(f => (
            <div key={f.id} className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-4 flex items-center justify-between group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-zinc-100 text-zinc-900 shrink-0">
                  <FileText className="size-5" />
                </div>
                <div className="truncate">
                  <p className="font-bold text-sm truncate text-zinc-900">{f.name}</p>
                  <p className="text-xs text-zinc-500">{f.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href={f.url} download={f.name} target="_blank" rel="noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-900">
                  View
                </a>
                <button onClick={() => deleteFile(id, f.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
