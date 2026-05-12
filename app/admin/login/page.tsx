"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle, Lock } from "lucide-react";
import { useAuthStore } from "@/store";
import { authApi } from "@/lib/api";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authApi.login(form.username, form.password);
      setAuth(res.token, res.admin.username);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gold-400/3 blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative w-full max-w-md">
        <div className="bg-obsidian-800 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gold-400/10 border border-gold-400/30 rounded-2xl flex items-center justify-center mb-4">
              <Lock size={20} className="text-gold-400" />
            </div>
            <h1 className="font-display text-3xl font-light text-white">Admin Panel</h1>
            <p className="text-white/30 text-sm mt-1 tracking-wide">Maison — Secure Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-widest uppercase text-white/40">Username</label>
              <input value={form.username} onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                placeholder="admin"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-gold-400/60 transition-colors" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium tracking-widest uppercase text-white/40">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-gold-400/60 transition-colors" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-xs p-3 bg-red-400/10 rounded-xl border border-red-400/20">
                <AlertCircle size={14} />{error}
              </motion.div>
            )}

            <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.01 }} whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gold-400 hover:bg-gold-500 disabled:opacity-60 text-obsidian-900 font-medium text-sm tracking-widest uppercase rounded-xl transition-colors duration-300 mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-obsidian-900/30 border-t-obsidian-900 rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : "Sign In"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
