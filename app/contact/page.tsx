"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { messagesApi } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      await messagesApi.send(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to send message. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 bg-cream-50">
        <div className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cream-100 to-cream-200" />
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold-400/8 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-blush-100 blur-3xl" />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-xs font-medium tracking-widest uppercase text-gold-500 mb-3">
              Get in Touch
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-display text-5xl md:text-6xl font-light text-obsidian-900 mb-4">
              Let&rsquo;s Talk
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-obsidian-700/60 text-base">
              Have a question about a product? A collaboration idea? We&rsquo;d love to hear from you.
            </motion.p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="relative bg-white/70 backdrop-blur-xl border border-cream-200 rounded-3xl p-8 md:p-12 shadow-luxury">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

            {status === "success" ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center text-center py-8 gap-4">
                <CheckCircle size={48} className="text-gold-500" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-light text-obsidian-900">Message Sent</h3>
                <p className="text-obsidian-700/60 text-sm">Thank you for reaching out. We&rsquo;ll be in touch shortly.</p>
                <button onClick={() => setStatus("idle")} className="mt-4 text-sm text-gold-500 hover:text-gold-600 underline">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-500">
                    <AlertCircle size={14} /> {errorMsg}
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium tracking-widest uppercase text-obsidian-700/60">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
                    className={`w-full px-5 py-4 bg-cream-50 border rounded-xl text-sm text-obsidian-900 placeholder:text-obsidian-700/30 focus:outline-none transition-colors duration-200 ${errors.name ? "border-red-300 focus:border-red-400" : "border-cream-200 focus:border-gold-400"}`} />
                  {errors.name && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} /> {errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium tracking-widest uppercase text-obsidian-700/60">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                    className={`w-full px-5 py-4 bg-cream-50 border rounded-xl text-sm text-obsidian-900 placeholder:text-obsidian-700/30 focus:outline-none transition-colors duration-200 ${errors.email ? "border-red-300 focus:border-red-400" : "border-cream-200 focus:border-gold-400"}`} />
                  {errors.email && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} /> {errors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium tracking-widest uppercase text-obsidian-700/60">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us what's on your mind..." rows={5}
                    className={`w-full px-5 py-4 bg-cream-50 border rounded-xl text-sm text-obsidian-900 placeholder:text-obsidian-700/30 focus:outline-none transition-colors duration-200 resize-none ${errors.message ? "border-red-300 focus:border-red-400" : "border-cream-200 focus:border-gold-400"}`} />
                  {errors.message && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={11} /> {errors.message}</p>}
                </div>
                <motion.button type="submit" disabled={status === "loading"} whileHover={{ scale: status === "loading" ? 1 : 1.01 }} whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-obsidian-900 hover:bg-obsidian-700 disabled:opacity-60 text-white text-sm font-medium tracking-widest uppercase rounded-xl transition-colors duration-300">
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <><Send size={15} />Send Message</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
