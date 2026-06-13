const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("maison_token") : null;

  const headers: Record<string, string> = {
    ...(options.body && !(options.body instanceof FormData)
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(data.message || "Something went wrong", res.status);
  }

  return data as T;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (username: string, password: string) =>
    apiFetch<{ success: boolean; token: string; admin: { username: string } }>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }
    ),

  verify: () =>
    apiFetch<{ success: boolean; admin: { username: string } }>(
      "/api/auth/verify"
    ),
};

// ── Products ──────────────────────────────────────────────────────────────────
export const productsApi = {
  getAll: (params?: { category?: string; search?: string }) => {
    const qs = new URLSearchParams(
      Object.entries(params || {}).filter(([, v]) => v) as [string, string][]
    ).toString();

    return apiFetch<{
      success: boolean;
      data: import("@/types").Product[];
    }>(`/api/products${qs ? `?${qs}` : ""}`);
  },

  // ✅ Added for Admin Dashboard pagination
  getPaginated: (params: { page: number; limit: number }) =>
    apiFetch<{
      success: boolean;
      data: import("@/types").Product[];
      pagination: {
        page: number;
        pages: number;
        total: number;
      };
    }>(
      `/api/products?page=${params.page}&limit=${params.limit}`
    ),

  getOne: (id: string) =>
    apiFetch<{
      success: boolean;
      data: import("@/types").Product;
      related: import("@/types").Product[];
    }>(`/api/products/${id}`),

  create: (formData: FormData) =>
    apiFetch<{
      success: boolean;
      data: import("@/types").Product;
    }>("/api/products", {
      method: "POST",
      body: formData,
    }),

  update: (id: string, formData: FormData) =>
    apiFetch<{
      success: boolean;
      data: import("@/types").Product;
    }>(`/api/products/${id}`, {
      method: "PUT",
      body: formData,
    }),

  delete: (id: string) =>
    apiFetch<{
      success: boolean;
      message: string;
    }>(`/api/products/${id}`, {
      method: "DELETE",
    }),
};

// ── Messages ──────────────────────────────────────────────────────────────────
export const messagesApi = {
  send: (data: { name: string; email: string; message: string }) =>
    apiFetch<{ success: boolean; message: string }>("/api/messages", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAll: () =>
    apiFetch<{
      success: boolean;
      data: import("@/store").ContactMessage[];
      unreadCount: number;
    }>("/api/messages"),

  markRead: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/messages/${id}/read`, {
      method: "PATCH",
    }),

  delete: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/messages/${id}`, {
      method: "DELETE",
    }),
};

// ── Analytics (fire-and-forget) ───────────────────────────────────────────────
const API = API_URL;

export const analyticsApi = {
  pageView: (page: string, referrer?: string) => {
    fetch(`${API}/api/analytics/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, referrer: referrer || document.referrer || "" }),
    }).catch(() => {});
  },

  productView: (productId: string, productName: string) => {
    fetch(`${API}/api/analytics/productview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, productName }),
    }).catch(() => {});
  },

  buyClicked: (productId: string, productName: string, price: string) => {
    fetch(`${API}/api/analytics/buyclicked`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        productName,
        price,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    }).catch(() => {});
  },

  getSummary: () =>
    apiFetch<{ success: boolean; data: AnalyticsSummary }>("/api/analytics/summary"),
};

// ── Analytics Types ───────────────────────────────────────────────────────────
export interface AnalyticsSummary {
  pageViews: { today: number; week: number; month: number; total: number };
  uniqueVisitors: { today: number; week: number; month: number };
  topViewed: Array<{ _id: string; productName: string; views: number }>;
  topClicked: Array<{ _id: string; productName: string; clicks: number }>;
  ctrData: Array<{
    productId: string;
    productName: string;
    views: number;
    clicks: number;
    ctr: string;
  }>;
  trafficSources: Array<{ name: string; value: number }>;
  deviceBreakdown: Array<{ name: string; value: number }>;
  dailyVisits: Array<{ date: string; visits: number }>;
  bestDay: string;
  bestHour: string;
  recentBuyClicks: Array<{
    _id: string;
    productId: string;
    productName: string;
    price: string;
    referrer: string;
    createdAt: string;
  }>;
}

export { ApiError };