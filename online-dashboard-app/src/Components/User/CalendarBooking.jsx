import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const CalendarBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setTitle("");
    setTime("");
    setErrorMessage("");
    setIsOpen(true);
  };

  const data = JSON.parse(localStorage.getItem("data"));
  const accessToken = data ? data.access_token : null;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/bookings/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => setBookedSlots(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleBookSlot = async () => {
    if (!time || !title) return;

    const payload = {
      date: selectedDate.toLocaleDateString("en-CA"),
      time,
      title,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/bookings/create", payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const updatedSlots = await axios.get(
        "http://127.0.0.1:8000/api/bookings/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      setBookedSlots(updatedSlots.data);
      setTime("");
      setTitle("");
      setIsOpen(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error booking slot");
    }
  };

  return (
    <div className="w-full px-6 py-10 flex flex-col items-center min-h-screen bg-slate-50">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 mt-10">
      <SectionHeading text="book exam slot"/>
        <div className="p-5 bg-blue-50 rounded-lg shadow-md flex justify-center">
          <Calendar
            onClickDay={handleDateClick}
            className="mx-auto custom-calendar"
          />
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transition-all transform scale-95 hover:scale-100">
            <h2 className="text-2xl font-semibold text-center mb-5 font-display">
              Book Slot
            </h2>
            <input
              type="text"
              className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-violet-400 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
            <input
              type="time"
              className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-violet-400 outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleBookSlot}
                className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl mt-8 p-8">
      <SectionHeading text="booked slots"/>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700 font-sans">
                <th className="border p-3">Date</th>
                <th className="border p-3">Time</th>
                <th className="border p-3">Title</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookedSlots.map((slot) => (
                <tr
                  key={slot.id}
                  className="odd:bg-gray-100 hover:bg-gray-200 transition font-sans"
                >
                  <td className="border p-3 text-center">{slot.date}</td>
                  <td className="border p-3 text-center">{slot.time}</td>
                  <td className="border p-3 text-center">{slot.title}</td>
                  <td className="border p-3 text-center">
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
          .custom-calendar {
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            padding: 10px;
            background: white;
          }

          .react-calendar {
            width: 100%;
            max-width: 350px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
          }

          .react-calendar__tile {
            padding: 15px;
            font-size: 16px;
            border-radius: 8px;
            transition: background 0.3s ease;
          }

          .react-calendar__tile--active {
            background: #2563eb !important;
            color: white !important;
          }
        `}
      </style>
    </div>
  );
};

export default CalendarBooking;
