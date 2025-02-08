import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const CalendarBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [editingSlot, setEditingSlot] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEditingSlot(null);
    setTitle("");
    setTime("");
    setIsOpen(true);
  };

  const data = JSON.parse(localStorage.getItem("data"));
  const accessToken = data ? data.access_token : null;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/bookings/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setBookedSlots(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleBookSlot = async () => {
    if (!time || !title) return;
  
    const payload = {
      date: selectedDate.toISOString().split("T")[0],
      time,
      title,
    };
  
    try {
      let response;
      if (editingSlot) {
        response = await axios.put(
          `http://127.0.0.1:8000/api/bookings/${editingSlot.id}`,
          payload,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      } else {
        response = await axios.post(
          "http://127.0.0.1:8000/api/bookings/create",
          payload,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      }
  
      // Fetch updated slots immediately after booking
      const updatedSlots = await axios.get("http://127.0.0.1:8000/api/bookings/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      setBookedSlots(updatedSlots.data);
  
      setTime("");
      setTitle("");
      setIsOpen(false);
      setEditingSlot(null);
    } catch (error) {
      alert(error.response?.data?.error || "Error booking slot");
    }
  };
  

  const handleEdit = (slot) => {
    setSelectedDate(new Date(slot.date));
    setTitle(slot.title);
    setTime(slot.time);
    setEditingSlot(slot);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setBookedSlots(bookedSlots.filter((slot) => slot.id !== id));
    } catch (error) {
      alert("Error deleting slot");
    }
  };

  return (
    <div className="m-2 flex-1 pt-14 lg:relative lg:pl-56 py-2 w-full">
      <div className="flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-xl md:max-w-4xl rounded-lg p-6 overflow-hidden">
            <h1 className="text-2xl font-bold text-center mb-6">
              Book Slot for Assistance
            </h1>

            <div className="calendar-container flex items-center justify-center rounded-lg p-4">
              <Calendar
                onClickDay={handleDateClick}
                tileClassName={({ date }) =>
                  bookedSlots.some(
                    (slot) => slot.date === date.toISOString().split("T")[0],
                  )
                    ? "booked-slot"
                    : ""
                }
                className="custom-calendar w-full"
              />
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    {editingSlot ? "Edit Booking" : "Book Slot"} for{" "}
                    {selectedDate?.toDateString()}
                  </h2>
                  <label className="block mb-2">
                    Booking Title:
                    <input
                      type="text"
                      className="border rounded-lg p-2 w-full mt-2"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter booking title"
                    />
                  </label>
                  <label className="block mb-2">
                    Select Time:
                    <input
                      type="time"
                      className="border rounded-lg p-2 w-full mt-2"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </label>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 border rounded-lg text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBookSlot}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      disabled={!time || !title}
                    >
                      {editingSlot ? "Update" : "Book"} Slot
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>

            {bookedSlots.length > 0 && (
              <div className="mt-8 w-full">
                <h2 className="text-xl font-bold mb-4">Booked Slots</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 shadow-lg">
                    <thead className="bg-violet-300">
                      <tr className="t-200 text-white-800 font-semibold whitespace-nowrap">
                        <th className="border border-gray-300 px-4 py-2">
                          Title
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Date
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Time
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookedSlots.map((slot) => (
                        <tr key={slot.id || `${slot.date}-${slot.time}`} className="text-center">

                          <td className="border border-gray-300 px-4 py-2">
                            {slot.title}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {slot.date}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {slot.time}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <button
                              className="text-blue-500 hover:text-blue-700 mx-2"
                              onClick={() => handleEdit(slot)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 mx-2"
                              onClick={() => handleDelete(slot.id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarBooking;
