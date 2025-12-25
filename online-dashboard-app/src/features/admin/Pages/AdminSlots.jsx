import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../api/apiConfig";
import { CalendarClock, CheckCircle2, XCircle } from "lucide-react";

const AdminSlots = () => {
  const [bookings, setBookings] = useState([]);

  const data = JSON.parse(localStorage.getItem("data"));
  const accessToken = data ? data.access_token : null;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/bookings`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setBookings(response.data.booking);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleAction = async (id, status) => {
    try {
      await axios.put(
        `${API_BASE_URL}/admin/bookings/${id}/update-status`,
        { status },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      setBookings(
        bookings.map((booking) =>
          booking.id === id
            ? { ...booking, status: parseInt(status) }
            : booking,
        ),
      );
    } catch {
      alert("Error updating status");
    }
  };

  const pendingBookings = bookings.filter((booking) => booking.status === 2);
  const processedBookings = bookings.filter((booking) => booking.status !== 2);

  return (
    <div className="pt-16 pb-8 px-4 lg:pl-60 w-screen space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white shadow-lg px-6 py-6">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_left,_#fff_0,_transparent_35%),radial-gradient(circle_at_bottom_right,_#fff_0,_transparent_30%)]" />
        <div className="relative space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">
            Admin · Slots
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Manage Interview Slots
          </h1>
          <p className="text-sm text-white/80 max-w-2xl">
            Review pending bookings, approve or decline, and track processed
            requests.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <CalendarClock className="text-indigo-600" size={18} />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Pending bookings
            </h2>
          </div>
          <span className="text-xs text-gray-500">
            {pendingBookings.length} pending
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.length > 0 ? (
                pendingBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <td className="px-4 py-2">{booking.title}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">{booking.time}</td>
                    <td className="px-4 py-2">{booking.user?.name || "N/A"}</td>
                    <td className="px-4 py-2">
                      <span className="truncate block max-w-[180px]">
                        {booking.user?.email || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-2">{booking.user?.phone || "N/A"}</td>
                    <td className="px-4 py-2 text-right space-x-2 whitespace-nowrap">
                      <button
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-xs"
                        onClick={() => handleAction(booking.id, "1")}
                      >
                        <CheckCircle2 size={14} /> Accept
                      </button>
                      <button
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-rose-100 text-rose-700 hover:bg-rose-200 text-xs"
                        onClick={() => handleAction(booking.id, "0")}
                      >
                        <XCircle size={14} /> Decline
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No pending bookings
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <CalendarClock className="text-indigo-600" size={18} />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Processed bookings
            </h2>
          </div>
          <span className="text-xs text-gray-500">
            {processedBookings.length} processed
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {processedBookings.length > 0 ? (
                processedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <td className="px-4 py-2">{booking.title}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">{booking.time}</td>
                    <td className="px-4 py-2">{booking.user?.name || "N/A"}</td>
                    <td className="px-4 py-2">
                      <span className="truncate block max-w-[180px]">
                        {booking.user?.email || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-2">{booking.user?.phone || "N/A"}</td>
                    <td className="px-4 py-2">
                      {booking.status === 1 ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                          <CheckCircle2 size={14} /> Link Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-semibold">
                          <XCircle size={14} /> Declined
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No processed bookings
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSlots;
