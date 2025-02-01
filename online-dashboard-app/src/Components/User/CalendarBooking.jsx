// App.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dialog } from "@headlessui/react";

const CalendarBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [title, setTitle] = useState(""); // Added title state
  const [bookedSlots, setBookedSlots] = useState([]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsOpen(true);
  };

  const handleBookSlot = () => {
    if (time && title) {
      const newSlot = {
        date: selectedDate.toDateString(),
        time,
        title, // Save title
      };
      setBookedSlots((prev) => [...prev, newSlot]);
      setTime("");
      setTitle(""); // Reset title
      setIsOpen(false);
    }
  };

  return (
    <div className="m-2 flex-1 pt-14 lg:relative lg:pl-56 py-2">
      <div className="flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-xl md:max-w-4xl rounded-lg p-6 overflow-hidden">
            <h1 className="text-2xl font-bold text-center mb-6">
              Book Slot for Assistance
            </h1>
            <div className="calendar-container flex items-center justify-center rounded-lg p-4">
              <Calendar
                onClickDay={handleDateClick}
                tileClassName={({ date }) => {
                  const isBooked = bookedSlots.some(
                    (slot) => slot.date === date.toDateString(),
                  );
                  return isBooked ? "booked-slot" : "";
                }}
                className="custom-calendar"
              />
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    Book Slot for {selectedDate?.toDateString()}
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
                      Book Slot
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>

            {bookedSlots.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Booked Slots</h2>
                <ul className="bg-gray-50 shadow rounded-lg p-4 divide-y">
                  {bookedSlots.map((slot, index) => (
                    <li key={index} className="py-2 text-gray-800">
                      <strong>{slot.title}</strong> - {slot.date} - {slot.time}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-calendar {
          width: 100%;
          max-width: 100%;
        }

        .react-calendar__tile {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          width: 40px;
          max-width: 100%;
        }

        .react-calendar__tile.booked-slot {
          background-color: #f87171;
          color: white;
        }

        .react-calendar__tile.booked-slot:hover {
          background-color: #ef4444;
        }

        @media (min-width: 768px) {
          .react-calendar__tile {
            height: 50px;
            width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default CalendarBooking;
