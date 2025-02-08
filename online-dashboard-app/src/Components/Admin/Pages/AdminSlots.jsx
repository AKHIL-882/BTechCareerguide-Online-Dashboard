import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSlots = () => {
  const [bookings, setBookings] = useState([]);

  const data = JSON.parse(localStorage.getItem("data"));
  const accessToken = data ? data.access_token : null;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin/bookings", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setBookings(response.data.booking);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleAction = async (id, status) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/bookings/${id}/update-status`,
        { status },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (error) {
      alert("Error updating status");
    }
  };
  console.log(bookings);
  return (
    <div className="pt-16 pb-5 px-4 lg:pl-60 w-screen">
      <h1 className="font-bold text-white bg-gradient-to-r from-violet-600 pl-2 mt-2 rounded-md">
        Admin Panel - Manage Slots
      </h1>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-lg">
          <thead className="bg-violet-300">
            <tr className="text-white font-semibold">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bookings) ? (
              bookings.map((booking) => (
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
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                      onClick={() => handleAction(booking.id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => handleAction(booking.id, "declined")}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No bookings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSlots;
