import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEventStore } from "@/lib/store";
import { Upload, Trash2, Eye } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/events/$id/images")({
  component: AdminEventImages,
});

function AdminEventImages() {
  const { id } = useParams({ from: "/admin/events/$id/images" });
  const { events, addImage, deleteImage } = useEventStore();
  const event = events.find(e => e.id === id);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  if (!event) return null;


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Simulate upload delay and convert to local object URL
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      addImage(id, url);
      setUploading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="bg-white border-dashed border-2 border-zinc-300 shadow-sm rounded-3xl p-8 text-center hover:border-[#ff3b30] transition-colors cursor-pointer relative h-full flex flex-col justify-center min-h-[200px] text-zinc-900">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileUpload} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            disabled={uploading}
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 rounded-full bg-zinc-50 text-zinc-500">
              {uploading ? <div className="size-8 border-4 border-zinc-200 border-t-[#ff3b30] rounded-full animate-spin" /> : <Upload className="size-8" />}
            </div>
            <div>
              <h3 className="font-bold text-lg text-zinc-900">Upload Image</h3>
              <p className="text-sm text-zinc-500 mt-1">Select an image file from your device</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-zinc-900">Event Gallery ({event.details?.gallery?.length || 0})</h3>
        </div>
        
        {(!event.details?.gallery || event.details.gallery.length === 0) && (
          <p className="text-zinc-500 text-sm italic">No images in gallery yet.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {event.details?.gallery?.map((img, i) => (
            <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-sm">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                <a href={img} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white text-zinc-900 hover:bg-zinc-100 transition-colors">
                  <Eye className="size-4" />
                </a>
                <button onClick={() => deleteImage(id, img)} className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
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
