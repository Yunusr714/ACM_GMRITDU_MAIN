import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use the environment variable for production, fallback to localhost for development
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const apiUrl = `${baseUrl}/api/admin/login`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_token", data.token);
        toast.success("Login successful!");
        navigate({ to: "/admin" });
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100">
        <div className="bg-zinc-900 px-8 pt-10 pb-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 bg-[#ff3b30]/20 rounded-full blur-3xl mix-blend-screen" />
          <div className="relative z-10">
            <h1 className="text-3xl font-display font-bold">Admin Portal</h1>
            <p className="text-zinc-400 mt-2 text-sm">Sign in to manage the ACM GMRIT Chapter</p>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-zinc-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 outline-none transition-all bg-zinc-50 focus:bg-white text-zinc-900"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-zinc-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:border-[#ff3b30] focus:ring-2 focus:ring-[#ff3b30]/20 outline-none transition-all bg-zinc-50 focus:bg-white text-zinc-900"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff3b30] hover:bg-[#ff3b30]/90 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
