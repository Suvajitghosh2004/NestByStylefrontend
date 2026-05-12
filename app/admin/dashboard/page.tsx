"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Plus, Pencil, Trash2, X, Save, LayoutGrid,
  ImageIcon, AlertTriangle, Mail, MailOpen, Upload,
  Link as LinkIcon, MessageSquare, RefreshCw,
} from "lucide-react";
import { useAuthStore, useProductStore, useMessageStore } from "@/store";
import { productsApi, messagesApi } from "@/lib/api";
import { Product } from "@/types";

type Mode = "list" | "create" | "edit" | "messages";
const emptyForm = { title: "", description: "", image: "", buyLink: "", category: "Fashion", price: "" };
const CATEGORIES = ["Fashion", "Home", "Accessories", "Kitchen", "Other"];

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const { products, loading: prodLoading, setProducts, setLoading: setProdLoading } = useProductStore();
  const { messages, unreadCount, setMessages, markReadLocal, removeMessage } = useMessageStore();

  const [mode, setMode] = useState<Mode>("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleteMsgTarget, setDeleteMsgTarget] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [dragging, setDragging] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<string | null>(null);
  const [msgLoading, setMsgLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated) { router.replace("/admin/login"); return; }
    loadProducts();
  }, [isAuthenticated]);

  const loadProducts = async () => {
    setProdLoading(true);
    try {
      const res = await productsApi.getAll();
      setProducts(res.data);
    } catch { } finally { setProdLoading(false); }
  };

  const loadMessages = async () => {
    setMsgLoading(true);
    try {
      const res = await messagesApi.getAll();
      setMessages(res.data, res.unreadCount);
    } catch { } finally { setMsgLoading(false); }
  };

  useEffect(() => {
    if (mode === "messages") loadMessages();
  }, [mode]);

  if (!isAuthenticated) return null;

  const handleLogout = () => { logout(); router.replace("/admin/login"); };

  const handleSave = async () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title required";
    if (!form.description.trim()) errs.description = "Description required";
    if (!form.buyLink.trim()) errs.buyLink = "Buy link required";
    const hasImage = (imageMode === "url" && form.image.trim()) || (imageMode === "upload" && uploadFile);
    if (!hasImage && mode === "create") errs.image = "Image required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("buyLink", form.buyLink);
      fd.append("category", form.category);
      fd.append("price", form.price);
      if (imageMode === "upload" && uploadFile) {
        fd.append("image", uploadFile);
      } else if (imageMode === "url" && form.image) {
        fd.append("imageUrl", form.image);
      }

      if (mode === "create") {
        await productsApi.create(fd);
      } else if (mode === "edit" && editId) {
        await productsApi.update(editId, fd);
      }

      await loadProducts();
      setMode("list");
      setForm(emptyForm);
      setEditId(null);
      setUploadPreview("");
      setUploadFile(null);
      setImageMode("url");
    } catch (err: any) {
      setErrors({ general: err.message || "Failed to save. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setForm({ title: product.title, description: product.description, image: product.image, buyLink: product.buyLink, category: product.category, price: product.price || "" });
    setEditId(product.id);
    setMode("edit");
    setUploadPreview("");
    setUploadFile(null);
    setImageMode("url");
  };

  const handleDelete = async (id: string) => {
    try {
      await productsApi.delete(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch { } finally { setDeleteTarget(null); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploadFile(file);
    const reader = new FileReader();
    reader.onload = (e) => { setUploadPreview(e.target?.result as string); };
    reader.readAsDataURL(file);
    if (errors.image) setErrors((p) => ({ ...p, image: "" }));
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) processFile(f); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) processFile(f); };

  const handleMarkRead = async (id: string) => {
    markReadLocal(id);
    try { await messagesApi.markRead(id); } catch { }
  };

  const handleDeleteMsg = async (id: string) => {
    removeMessage(id);
    try { await messagesApi.delete(id); } catch { }
    setDeleteMsgTarget(null);
    if (selectedMsg === id) setSelectedMsg(null);
  };

  const inputCls = (field: string) => `w-full px-4 py-3 bg-white border rounded-xl text-sm text-obsidian-900 placeholder:text-obsidian-700/30 focus:outline-none transition-colors ${errors[field] ? "border-red-300 focus:border-red-400" : "border-cream-200 focus:border-gold-400"}`;
  const currentImage = imageMode === "upload" ? uploadPreview : form.image;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-obsidian-900 text-white flex-col z-40 hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7">
              <img src="https://i.pinimg.com/280x280_RS/a7/21/ca/a721cadc5c4c1cc4a8a5e73825d2a1ec.jpg" alt="logo" className="rounded-full"/>
            </div>
            <span className="font-display text-lg font-medium tracking-wider">NestByStyle Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "list", icon: LayoutGrid, label: "All Products" },
            { id: "create", icon: Plus, label: "Create Post" },
          ].map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => { setMode(id as Mode); setForm(emptyForm); setEditId(null); setUploadPreview(""); setUploadFile(null); setImageMode("url"); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${mode === id ? "bg-gold-400/10 text-gold-400" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              <Icon size={16} />{label}
            </button>
          ))}
          <button onClick={() => setMode("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${mode === "messages" ? "bg-gold-400/10 text-gold-400" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
            <MessageSquare size={16} />Messages
            {unreadCount > 0 && <span className="ml-auto bg-gold-400 text-obsidian-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>}
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors">
            <LogOut size={16} />Logout
          </button>
        </div>
      </aside>

      {/* Mobile bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-obsidian-900 px-4 py-4 flex items-center justify-between">
        <span className="font-display text-white tracking-wider">Admin</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setMode("messages")} className="p-2 text-white/60 relative">
            <MessageSquare size={20} />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-gold-400 rounded-full" />}
          </button>
          <button onClick={() => { setMode("create"); setForm(emptyForm); }} className="p-2 text-gold-400"><Plus size={20} /></button>
          <button onClick={handleLogout} className="p-2 text-white/60"><LogOut size={20} /></button>
        </div>
      </div>

      {/* Main */}
      <div className="md:ml-64 pt-16 md:pt-0">
        <div className="p-6 md:p-10 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-light text-obsidian-900">
                {mode === "list" ? "Products" : mode === "create" ? "Create Post" : mode === "edit" ? "Edit Post" : "Messages"}
              </h1>
              <p className="text-sm text-obsidian-700/50 mt-1">
                {mode === "list" ? `${products.length} products` : mode === "messages" ? `${messages.length} messages · ${unreadCount} unread` : "Fill in the details below"}
              </p>
            </div>
            {mode === "list" && (
              <div className="flex items-center gap-2">
                <button onClick={loadProducts} className="p-2 text-obsidian-700/40 hover:text-obsidian-900 transition-colors" title="Refresh">
                  <RefreshCw size={16} className={prodLoading ? "animate-spin" : ""} />
                </button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => { setMode("create"); setForm(emptyForm); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-obsidian-900 text-white text-sm font-medium tracking-widest uppercase rounded-xl hover:bg-obsidian-700 transition-colors">
                  <Plus size={15} />New Post
                </motion.button>
              </div>
            )}
          </div>

          {/* Messages */}
          {mode === "messages" && (
            <div className="space-y-3">
              <div className="flex justify-end mb-2">
                <button onClick={loadMessages} className="flex items-center gap-1.5 text-xs text-obsidian-700/40 hover:text-obsidian-900 transition-colors">
                  <RefreshCw size={12} className={msgLoading ? "animate-spin" : ""} /> Refresh
                </button>
              </div>
              {msgLoading && messages.length === 0 ? (
                <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white border border-cream-200 rounded-2xl p-4"><div className="skeleton h-4 rounded w-1/3 mb-2" /><div className="skeleton h-3 rounded w-1/2" /></div>)}</div>
              ) : messages.length === 0 ? (
                <div className="text-center py-20 text-obsidian-700/40 flex flex-col items-center gap-3">
                  <Mail size={40} strokeWidth={1} /><p>No messages yet.</p>
                </div>
              ) : messages.map((msg, i) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className={`bg-white border rounded-2xl overflow-hidden transition-shadow hover:shadow-card ${msg.read ? "border-cream-200" : "border-gold-300"}`}>
                  <div role="button" tabIndex={0}
                    onClick={() => { setSelectedMsg(selectedMsg === msg.id ? null : msg.id); if (!msg.read) handleMarkRead(msg.id); }}
                    onKeyDown={(e) => { if (e.key === "Enter") { setSelectedMsg(selectedMsg === msg.id ? null : msg.id); if (!msg.read) handleMarkRead(msg.id); } }}
                    className="w-full flex items-center gap-4 p-4 text-left cursor-pointer hover:bg-cream-50/50 transition-colors">
                    <div className="flex-shrink-0">{msg.read ? <MailOpen size={18} className="text-obsidian-700/30" /> : <Mail size={18} className="text-gold-500" />}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${msg.read ? "font-normal text-obsidian-700" : "font-semibold text-obsidian-900"}`}>{msg.name}</p>
                      <p className="text-xs text-obsidian-700/40 truncate">{msg.email}</p>
                    </div>
                    <div className="flex-shrink-0 text-xs text-obsidian-700/40">{new Date(msg.receivedAt).toLocaleDateString()}</div>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteMsgTarget(msg.id); }}
                      className="flex-shrink-0 p-1.5 text-obsidian-700/30 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {selectedMsg === msg.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <div className="px-4 pb-4 pt-0 border-t border-cream-100">
                          <p className="text-sm text-obsidian-700/80 leading-relaxed mt-3 whitespace-pre-wrap">{msg.message}</p>
                          <a href={`mailto:${msg.email}`} className="inline-flex items-center gap-1.5 mt-3 text-xs text-gold-500 hover:text-gold-600 font-medium">
                            <Mail size={12} /> Reply to {msg.email}
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          {/* Form */}
          {(mode === "create" || mode === "edit") && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-cream-200 p-6 md:p-8 shadow-card">
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-500">{errors.general}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50">Product Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Silk Slip Dress" className={inputCls("title")} />
                  {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50">Image *</label>
                  <div className="flex rounded-xl border border-cream-200 overflow-hidden mb-3">
                    <button onClick={() => { setImageMode("url"); setUploadPreview(""); setUploadFile(null); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium tracking-widest uppercase transition-colors ${imageMode === "url" ? "bg-obsidian-900 text-white" : "bg-white text-obsidian-700/50 hover:text-obsidian-900"}`}>
                      <LinkIcon size={11} /> URL
                    </button>
                    <button onClick={() => { setImageMode("upload"); setForm((p) => ({ ...p, image: "" })); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium tracking-widest uppercase transition-colors ${imageMode === "upload" ? "bg-obsidian-900 text-white" : "bg-white text-obsidian-700/50 hover:text-obsidian-900"}`}>
                      <Upload size={11} /> Upload
                    </button>
                  </div>
                  {imageMode === "url" ? (
                    <>
                      <input name="image" value={form.image} onChange={handleChange} placeholder="https://any-image-url.com/photo.jpg" className={inputCls("image")} />
                      {errors.image && <p className="text-xs text-red-400">{errors.image}</p>}
                    </>
                  ) : (
                    <>
                      <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative flex flex-col items-center justify-center gap-2 h-32 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${dragging ? "border-gold-400 bg-gold-400/5" : "border-cream-200 hover:border-gold-300 bg-cream-50"}`}>
                        <Upload size={20} className="text-obsidian-700/30" />
                        <p className="text-xs text-obsidian-700/50 text-center">Drag & drop or <span className="text-gold-500 font-medium">click to upload</span></p>
                        <p className="text-[10px] text-obsidian-700/30">PNG, JPG, WEBP, GIF — max 10MB</p>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFilePick} />
                      </div>
                      {errors.image && <p className="text-xs text-red-400">{errors.image}</p>}
                    </>
                  )}
                  {currentImage && (
                    <div className="relative h-32 rounded-xl overflow-hidden bg-cream-100 mt-2">
                      <Image src={currentImage} alt="Preview" fill className="object-cover" unoptimized />
                      {uploadPreview && imageMode === "upload" && (
                        <button onClick={() => { setUploadPreview(""); setUploadFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                          className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-obsidian-700 shadow hover:bg-red-50 hover:text-red-400 transition-colors">
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50">Buy Link *</label>
                  <input name="buyLink" value={form.buyLink} onChange={handleChange} placeholder="https://shop.example.com/product" className={inputCls("buyLink")} />
                  {errors.buyLink && <p className="text-xs text-red-400">{errors.buyLink}</p>}
                  <label className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50 block mt-4">Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className={inputCls("category")}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <label className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50 block mt-4">Price (optional)</label>
                  <input name="price" value={form.price} onChange={handleChange} placeholder="$199" className={inputCls("price")} />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50">Description *</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the product in detail..." rows={4} className={inputCls("description") + " resize-none"} />
                  {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-cream-200">
                <button onClick={() => { setMode("list"); setForm(emptyForm); setEditId(null); setErrors({}); setUploadPreview(""); setUploadFile(null); setImageMode("url"); }}
                  className="flex items-center gap-2 px-5 py-3 border border-cream-200 hover:border-obsidian-700/30 text-obsidian-700 text-sm font-medium tracking-widest uppercase rounded-xl transition-colors">
                  <X size={14} />Cancel
                </button>
                <motion.button whileHover={{ scale: saving ? 1 : 1.01 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-obsidian-900 hover:bg-obsidian-700 disabled:opacity-60 text-white text-sm font-medium tracking-widest uppercase rounded-xl transition-colors">
                  {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
                  {mode === "create" ? "Publish Post" : "Save Changes"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Product list */}
          {mode === "list" && (
            <div className="space-y-3">
              {prodLoading && products.length === 0 ? (
                <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white border border-cream-200 rounded-2xl p-4">
                    <div className="skeleton w-14 h-14 rounded-xl" />
                    <div className="flex-1 space-y-2"><div className="skeleton h-4 rounded w-1/3" /><div className="skeleton h-3 rounded w-1/4" /></div>
                  </div>
                ))}</div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 text-obsidian-700/40 flex flex-col items-center gap-3">
                  <ImageIcon size={40} strokeWidth={1} /><p>No products yet. Create your first post.</p>
                </div>
              ) : products.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 bg-white border border-cream-200 rounded-2xl p-4 hover:shadow-card transition-shadow">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                    <Image src={p.image} alt={p.title} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-obsidian-900 text-sm truncate">{p.title}</p>
                    <p className="text-xs text-obsidian-700/40 mt-0.5">{p.category}{p.price && ` · ${p.price}`}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleEdit(p)} className="p-2 text-obsidian-700/40 hover:text-gold-500 hover:bg-gold-400/10 rounded-lg transition-colors"><Pencil size={15} /></button>
                    <button onClick={() => setDeleteTarget(p.id)} className="p-2 text-obsidian-700/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={15} /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete product modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-900/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto"><AlertTriangle size={22} className="text-red-400" /></div>
              <h3 className="font-display text-xl text-obsidian-900">Delete Product?</h3>
              <p className="text-sm text-obsidian-700/60">This action cannot be undone.</p>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 border border-cream-200 rounded-xl text-sm font-medium text-obsidian-700 hover:bg-cream-50 transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteTarget)} className="flex-1 py-3 bg-red-400 hover:bg-red-500 rounded-xl text-sm font-medium text-white transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete message modal */}
      <AnimatePresence>
        {deleteMsgTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-900/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto"><AlertTriangle size={22} className="text-red-400" /></div>
              <h3 className="font-display text-xl text-obsidian-900">Delete Message?</h3>
              <p className="text-sm text-obsidian-700/60">This action cannot be undone.</p>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setDeleteMsgTarget(null)} className="flex-1 py-3 border border-cream-200 rounded-xl text-sm font-medium text-obsidian-700 hover:bg-cream-50 transition-colors">Cancel</button>
                <button onClick={() => handleDeleteMsg(deleteMsgTarget)} className="flex-1 py-3 bg-red-400 hover:bg-red-500 rounded-xl text-sm font-medium text-white transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
