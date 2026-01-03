import React, { useEffect, useMemo, useState } from "react";
import { IndianRupee, RefreshCcw, AlertOctagon, ShieldAlert, CreditCard, Clock } from "lucide-react";
import { fetchTransactionsApi } from "@/api/transactionsApi";
import { format } from "date-fns";

const currency = (value = 0) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(value) || 0);

const statusTone = {
  0: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  1: { label: "Success", className: "bg-emerald-100 text-emerald-700" },
  2: { label: "Failed", className: "bg-rose-100 text-rose-700" },
  3: { label: "Due", className: "bg-slate-100 text-slate-700" },
};

const defaultSummary = {
  collected_amount: 0,
  refunds_amount: 0,
  disputes_amount: 0,
  failed_count: 0,
  success_count: 0,
  total_count: 0,
};

const AdminTransactions = () => {
  const [summary, setSummary] = useState(defaultSummary);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ days: 7, status: "" });

  const token = useMemo(() => JSON.parse(localStorage.getItem("data"))?.access_token, []);

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetchTransactionsApi(token, filters);
      const payload = res.data?.data || res.data || {};
      setSummary(payload.summary || defaultSummary);
      setTransactions(payload.transactions || []);
    } catch (error) {
      console.error("Failed to load transactions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const cards = [
    {
      title: "Collected Amount",
      value: currency(summary.collected_amount),
      sub: `${summary.success_count || 0} captured payments`,
      icon: IndianRupee,
      tone: "from-indigo-500 to-blue-500",
    },
    {
      title: "Refunds",
      value: currency(summary.refunds_amount),
      sub: "0 processed",
      icon: RefreshCcw,
      tone: "from-emerald-500 to-teal-500",
    },
    {
      title: "Disputes",
      value: currency(summary.disputes_amount),
      sub: "0 open · 0 under-review",
      icon: ShieldAlert,
      tone: "from-amber-500 to-orange-500",
    },
    {
      title: "Failed",
      value: summary.failed_count || 0,
      sub: "payments",
      icon: AlertOctagon,
      tone: "from-rose-500 to-red-500",
    },
  ];

  return (
    <div className="flex items-start justify-center pt-16 pb-10 px-4 lg:pl-60 w-screen">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitor Razorpay payments, spot failures quickly, and keep project access in sync.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {cards.map(({ title, value, sub, icon: Icon, tone }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone}`} />
              <div className="p-4 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{title}</p>
                  <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sub}</p>
                </div>
                <div className={`p-3 rounded-xl text-white bg-gradient-to-br ${tone} shadow`}>
                  <Icon size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Payments</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {summary.total_count || 0} records · {filters.days || 7}-day window
              </p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={filters.days}
                onChange={(e) => setFilters((f) => ({ ...f, days: Number(e.target.value) }))}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm rounded-lg px-3 py-2"
              >
                {[7, 14, 30, 90].map((day) => (
                  <option key={day} value={day}>
                    Last {day} days
                  </option>
                ))}
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm rounded-lg px-3 py-2"
              >
                <option value="">Status: All</option>
                <option value="1">Success</option>
                <option value="0">Pending</option>
                <option value="2">Failed</option>
              </select>
              <button
                onClick={load}
                className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <RefreshCcw size={14} /> Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
              <thead className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Payment ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Project</th>
                  <th className="px-4 py-3 text-left font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      Loading transactions...
                    </td>
                  </tr>
                )}
                {!loading && transactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      No transactions found for the selected range.
                    </td>
                  </tr>
                )}
                {!loading &&
                  transactions.map((tx) => {
                    const tone = statusTone[tx.status] || statusTone[0];
                    return (
                      <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {tx.razorpay_payment_id || "—"}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Order: {tx.razorpay_order_id || "—"}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium">{tx.project?.name || "—"}</div>
                          <div className="text-xs text-gray-500">ID: {tx.project?.id || "—"}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium">{tx.user?.name || "—"}</div>
                          <div className="text-xs text-gray-500">{tx.user?.email || "—"}</div>
                        </td>
                        <td className="px-4 py-3 font-semibold">{currency(tx.amount)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${tone.className}`}>
                            <CreditCard size={12} />
                            {tone.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {tx.created_at ? format(new Date(tx.created_at), "dd MMM, yyyy HH:mm") : "—"}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransactions;
