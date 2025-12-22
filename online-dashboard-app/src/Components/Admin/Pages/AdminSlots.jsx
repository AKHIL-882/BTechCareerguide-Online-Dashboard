import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../api/apiConfig";

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
    } catch (error) {
      alert("Error updating status");
    }
  };

  // Filter bookings based on status
  const pendingBookings = bookings.filter((booking) => booking.status === 2);
  const processedBookings = bookings.filter((booking) => booking.status !== 2);

  return (
    <div className="pt-16 pb-5 px-4 lg:pl-60 w-screen">
      <h1 className="font-bold text-white bg-gradient-to-r from-violet-600 pl-2 mt-2 rounded-md">
        Admin Panel - Manage Slots
      </h1>

      {/* Pending Bookings Table */}
      <div className="mt-4 overflow-x-auto">
        <h2 className="text-lg font-semibold text-gray-800">
          Pending Bookings
        </h2>
        <table className="w-full border border-gray-300 shadow-lg">
          <thead className="bg-violet-300">
            <tr className="text-white font-semibold">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">User Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.length > 0 ? (
              pendingBookings.map((booking) => (
                <tr key={booking.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.time}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.user?.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.user?.phone || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => handleAction(booking.id, "1")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => handleAction(booking.id, "0")}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-2">
                  No pending bookings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Accepted & Declined Bookings Table */}
      <div className="mt-8 overflow-x-auto">
        <h2 className="text-lg font-semibold text-gray-800">
          Processed Bookings
        </h2>
        <table className="w-full border border-gray-300 shadow-lg">
          <thead className="bg-gray-300">
            <tr className="text-gray-800 font-semibold">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">User Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {processedBookings.length > 0 ? (
              processedBookings.map((booking) => (
                <tr key={booking.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.time}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.user?.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.user?.phone || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.status === 1 ? (
                      <span className="text-green-600 font-semibold">
                        Link Sent
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Declined
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-2">
                  No accepted or declined bookings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSlots;
