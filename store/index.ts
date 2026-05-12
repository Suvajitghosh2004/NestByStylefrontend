"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

// ── Re-export ContactMessage type ──────────────────────────────────────────
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  read: boolean;
}

// ── Auth Store — persists JWT token only ───────────────────────────────────
interface AuthStore {
  isAuthenticated: boolean;
  token: string | null;
  adminUsername: string | null;
  setAuth: (token: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      adminUsername: null,

      setAuth: (token, username) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("maison_token", token);
        }
        set({ isAuthenticated: true, token, adminUsername: username });
      },

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("maison_token");
        }
        set({ isAuthenticated: false, token: null, adminUsername: null });
      },
    }),
    { name: "auth-store" }
  )
);

// ── Product Store — API-backed ─────────────────────────────────────────────
interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// ── Message Store — API-backed ─────────────────────────────────────────────
interface MessageStore {
  messages: ContactMessage[];
  unreadCount: number;
  loading: boolean;
  setMessages: (messages: ContactMessage[], unreadCount: number) => void;
  setLoading: (loading: boolean) => void;
  markReadLocal: (id: string) => void;
  removeMessage: (id: string) => void;
}

export const useMessageStore = create<MessageStore>()((set) => ({
  messages: [],
  unreadCount: 0,
  loading: false,
  setMessages: (messages, unreadCount) => set({ messages, unreadCount }),
  setLoading: (loading) => set({ loading }),
  markReadLocal: (id) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, read: true } : m
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  removeMessage: (id) =>
    set((state) => {
      const msg = state.messages.find((m) => m.id === id);
      return {
        messages: state.messages.filter((m) => m.id !== id),
        unreadCount:
          msg && !msg.read
            ? Math.max(0, state.unreadCount - 1)
            : state.unreadCount,
      };
    }),
}));
