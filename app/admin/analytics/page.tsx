"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart2, ArrowLeft, RefreshCw, Eye, Users, ShoppingBag,
  TrendingUp, Clock, CalendarDays, Smartphone, Monitor, Activity,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import { useAuthStore } from "@/store";
import { analyticsApi, AnalyticsSummary } from "@/lib/api";

const GOLD = "#d4a853";
const OBSIDIAN = "#1a1a1a";
const CREAM = "#faf6ee";
const COLORS = [GOLD, "#b8860b", "#8b6914", "#5c4a1e", "#9e8060"];

function StatCard({
  icon: Icon,
  label,
  today,
  week,
  month,
}: {
  icon: React.ElementType;
  label: string;
  today: number;
  week: number;
  month: number;
}) {
  return (
    <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={15} className="text-gold-500" />
        <span className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50">{label}</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Today", val: today },
          { label: "Week", val: week },
          { label: "Month", val: month },
        ].map(({ label, val }) => (
          <div key={label}>
            <p className="text-2xl font-light text-obsidian-900">{val.toLocaleString()}</p>
            <p className="text-[10px] text-obsidian-700/40 tracking-widest uppercase mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-cream-200 rounded-xl px-3 py-2 shadow-card text-xs">
      <p className="text-obsidian-700/50 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) { router.replace("/admin/login"); return; }
    fetchSummary();
  }, [isAuthenticated]);

  const fetchSummary = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await analyticsApi.getSummary();
      setData(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-obsidian-900 text-white flex-col z-40 hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7">
              <img src="https://i.pinimg.com/280x280_RS/a7/21/ca/a721cadc5c4c1cc4a8a5e73825d2a1ec.jpg" alt="logo" className="rounded-full" />
            </div>
            <span className="font-display text-lg font-medium tracking-wider">NestByStyle Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-white/60 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft size={16} />Back to Dashboard
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors bg-gold-400/10 text-gold-400"
          >
            <BarChart2 size={16} />Analytics
          </button>
        </nav>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-obsidian-900 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.push("/admin/dashboard")} className="text-white/60 p-1">
          <ArrowLeft size={20} />
        </button>
        <span className="font-display text-white tracking-wider">Analytics</span>
      </div>

      {/* Main */}
      <div className="md:ml-64 pt-16 md:pt-0 p-6 md:p-10 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-light text-obsidian-900">Analytics</h1>
            <p className="text-sm text-obsidian-700/50 mt-1">Self-hosted · Last 30 days</p>
          </div>
          <button
            onClick={fetchSummary}
            className="p-2 text-obsidian-700/40 hover:text-obsidian-900 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-500">
            {error}
          </div>
        )}

        {loading && !data ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton rounded-2xl h-28" />
            ))}
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* ── Stat Cards ───────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard
                icon={Eye}
                label="Page Views"
                today={data.pageViews.today}
                week={data.pageViews.week}
                month={data.pageViews.month}
              />
              <StatCard
                icon={Users}
                label="Unique Visitors"
                today={data.uniqueVisitors.today}
                week={data.uniqueVisitors.week}
                month={data.uniqueVisitors.month}
              />
            </div>

            {/* ── Best Day / Hour ───────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays size={14} className="text-gold-500" />
                  <span className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50">Best Day</span>
                </div>
                <p className="text-3xl font-light text-obsidian-900">{data.bestDay}</p>
              </div>
              <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={14} className="text-gold-500" />
                  <span className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50">Best Hour</span>
                </div>
                <p className="text-3xl font-light text-obsidian-900">{data.bestHour}</p>
              </div>
            </div>

            {/* ── Daily Visits Line Chart ───────────────────────────────── */}
            <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
              <h2 className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50 mb-4">Daily Visits — Last 30 Days</h2>
              {data.dailyVisits.length === 0 ? (
                <p className="text-center text-obsidian-700/30 text-sm py-10">No data yet</p>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data.dailyVisits} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e8d8" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10, fill: "#999" }}
                      tickFormatter={(v) => v.slice(5)}
                      interval="preserveStartEnd"
                    />
                    <YAxis tick={{ fontSize: 10, fill: "#999" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      stroke={GOLD}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: GOLD }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* ── Pie Charts: Traffic Sources + Device ─────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Traffic Sources */}
              <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
                <h2 className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50 mb-4">Traffic Sources</h2>
                {data.trafficSources.every((s) => s.value === 0) ? (
                  <p className="text-center text-obsidian-700/30 text-sm py-10">No data yet</p>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={data.trafficSources.filter((s) => s.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={3}
                      >
                        {data.trafficSources.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: 11 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Device Breakdown */}
              <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
                <h2 className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50 mb-4">Device Breakdown</h2>
                {data.deviceBreakdown.every((s) => s.value === 0) ? (
                  <p className="text-center text-obsidian-700/30 text-sm py-10">No data yet</p>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={data.deviceBreakdown.filter((d) => d.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={3}
                      >
                        {data.deviceBreakdown.map((_, i) => (
                          <Cell key={i} fill={i === 0 ? GOLD : OBSIDIAN} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* ── Top Viewed Products ───────────────────────────────────── */}
            <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
              <h2 className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50 mb-4">
                Top 10 Most Viewed Products
              </h2>
              {data.topViewed.length === 0 ? (
                <p className="text-center text-obsidian-700/30 text-sm py-6">No views tracked yet</p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={data.topViewed.map((p) => ({ name: p.productName?.slice(0, 20) || p._id.slice(0, 8), views: p.views }))}
                    layout="vertical"
                    margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e8d8" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "#999" }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#666" }} width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="views" fill={GOLD} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* ── Top Clicked Products ──────────────────────────────────── */}
            <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
              <h2 className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50 mb-4">
                Top 10 Buy Now Clicked Products
              </h2>
              {data.topClicked.length === 0 ? (
                <p className="text-center text-obsidian-700/30 text-sm py-6">No clicks tracked yet</p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={data.topClicked.map((p) => ({ name: p.productName?.slice(0, 20) || p._id.slice(0, 8), clicks: p.clicks }))}
                    layout="vertical"
                    margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e8d8" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "#999" }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#666" }} width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="clicks" fill={OBSIDIAN} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* ── CTR Table ─────────────────────────────────────────────── */}
            <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
              <h2 className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50 mb-4 flex items-center gap-1.5">
                <TrendingUp size={13} className="text-gold-500" />
                Click-Through Rate (Views → Buy Now)
              </h2>
              {data.ctrData.length === 0 ? (
                <p className="text-center text-obsidian-700/30 text-sm py-6">No data yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-cream-200">
                        <th className="text-left py-2 pr-4 text-obsidian-700/50 font-medium tracking-widest uppercase">Product</th>
                        <th className="text-right py-2 px-3 text-obsidian-700/50 font-medium tracking-widest uppercase">Views</th>
                        <th className="text-right py-2 px-3 text-obsidian-700/50 font-medium tracking-widest uppercase">Clicks</th>
                        <th className="text-right py-2 pl-3 text-obsidian-700/50 font-medium tracking-widest uppercase">CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.ctrData.map((row, i) => (
                        <tr key={row.productId} className="border-b border-cream-100 last:border-0">
                          <td className="py-2 pr-4 text-obsidian-900 font-medium max-w-[200px] truncate">{row.productName || row.productId.slice(0, 10)}</td>
                          <td className="py-2 px-3 text-right text-obsidian-700/60">{row.views.toLocaleString()}</td>
                          <td className="py-2 px-3 text-right text-obsidian-700/60">{row.clicks.toLocaleString()}</td>
                          <td className="py-2 pl-3 text-right">
                            <span className={`font-semibold ${parseFloat(row.ctr) > 10 ? "text-green-500" : parseFloat(row.ctr) > 3 ? "text-gold-500" : "text-obsidian-700/40"}`}>
                              {row.ctr}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ── Live Activity Feed ────────────────────────────────────── */}
            <div className="bg-white border border-cream-200 rounded-2xl p-5 shadow-card">
              <h2 className="text-xs font-medium tracking-widest uppercase text-obsidian-700/50 mb-4 flex items-center gap-1.5">
                <Activity size={13} className="text-gold-500" />
                Recent Buy Now Clicks
              </h2>
              {data.recentBuyClicks.length === 0 ? (
                <p className="text-center text-obsidian-700/30 text-sm py-6">No buy clicks tracked yet</p>
              ) : (
                <div className="space-y-2">
                  {data.recentBuyClicks.map((click, i) => (
                    <motion.div
                      key={click._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center justify-between gap-4 py-2 border-b border-cream-100 last:border-0"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <ShoppingBag size={13} className="text-gold-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-obsidian-900 truncate">
                            {click.productName || "Unknown Product"}
                          </p>
                          {click.price && (
                            <p className="text-[10px] text-gold-500">{click.price}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] text-obsidian-700/40 flex-shrink-0">
                        {new Date(click.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
