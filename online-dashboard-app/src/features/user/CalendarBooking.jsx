// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { Dialog } from "@headlessui/react";
// import axios from "axios";
// import { FaTrash } from "react-icons/fa";
// import SectionHeading from "./SectionHeading";

// const CalendarBooking = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [time, setTime] = useState("");
//   const [title, setTitle] = useState("");
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setTitle("");
//     setTime("");
//     setErrorMessage("");
//     setIsOpen(true);
//   };

//   const data = JSON.parse(localStorage.getItem("data"));
//   const accessToken = data ? data.access_token : null;

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/bookings/", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//       .then((response) => setBookedSlots(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   const handleBookSlot = async () => {
//     if (!time || !title) return;

//     const payload = {
//       date: selectedDate.toLocaleDateString("en-CA"),
//       time,
//       title,
//     };

//     try {
//       await axios.post("http://127.0.0.1:8000/api/bookings/create", payload, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });

//       const updatedSlots = await axios.get(
//         "http://127.0.0.1:8000/api/bookings/",
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         },
//       );

//       setBookedSlots(updatedSlots.data);
//       setTime("");
//       setTitle("");
//       setIsOpen(false);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Error booking slot");
//     }
//   };

//   return (
//     <div className="w-full px-3 py-10 flex flex-col min-h-screen bg-slate-50">
//       <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 mt-10">
//         <SectionHeading text="book exam slot" />
//         <div className="p-5 bg-blue-50 rounded-lg shadow-md flex justify-center">
//           <Calendar
//             onClickDay={handleDateClick}
//             className="mx-auto custom-calendar"
//           />
//         </div>
//       </div>

//       <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4">
//           <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transition-all transform scale-95 hover:scale-100">
//             <h2 className="text-2xl font-semibold text-center mb-5 font-display">
//               Book Slot
//             </h2>
//             <input
//               type="text"
//               className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-violet-400 outline-none"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter Title"
//             />
//             <input
//               type="time"
//               className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-violet-400 outline-none"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//             />
//             {errorMessage && (
//               <p className="text-red-500 text-center">{errorMessage}</p>
//             )}
//             <div className="flex justify-between mt-6">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="px-4 py-2 border rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleBookSlot}
//                 className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
//               >
//                 Book
//               </button>
//             </div>
//           </div>
//         </div>
//       </Dialog>

//       <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl mt-8 p-8">
//         <SectionHeading text="booked slots" />
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse text-sm md:text-base shadow-md">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700 font-sans">
//                 <th className="border p-3">Date</th>
//                 <th className="border p-3">Time</th>
//                 <th className="border p-3">Title</th>
//                 <th className="border p-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookedSlots.map((slot) => (
//                 <tr
//                   key={slot.id}
//                   className="odd:bg-gray-100 hover:bg-gray-200 transition font-sans"
//                 >
//                   <td className="border p-3 text-center">{slot.date}</td>
//                   <td className="border p-3 text-center">{slot.time}</td>
//                   <td className="border p-3 text-center">{slot.title}</td>
//                   <td className="border p-3 text-center">
//                     <button className="text-red-500 hover:text-red-700">
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <style>
//         {`
//           .custom-calendar {
//             border-radius: 10px;
//             box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//             padding: 10px;
//             background: white;
//           }

//           .react-calendar {
//             width: 100%;
//             max-width: 350px;
//             background: white;
//             border-radius: 10px;
//             box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
//           }

//           .react-calendar__tile {
//             padding: 15px;
//             font-size: 16px;
//             border-radius: 8px;
//             transition: background 0.3s ease;
//           }

//           .react-calendar__tile--active {
//             background: #2563eb !important;
//             color: white !important;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default CalendarBooking;

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import addMinutes from "date-fns/addMinutes";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@headlessui/react";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

const genId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

// default mock data
const defaultMock = [
  {
    id: genId(),
    rawTitle: "Frontend Interview",
    interviewer: "Alice Johnson",
    start: new Date("2025-09-22T10:00:00"),
    end: new Date("2025-09-22T10:30:00"),
    status: "sent",
  },
  {
    id: genId(),
    rawTitle: "Backend Interview",
    interviewer: "Bob Smith",
    start: new Date("2025-09-23T14:00:00"),
    end: new Date("2025-09-23T14:30:00"),
    status: "accepted",
  },
  {
    id: genId(),
    rawTitle: "Fullstack Interview",
    interviewer: "Charlie Lee",
    start: new Date("2025-09-24T11:30:00"),
    end: new Date("2025-09-24T12:00:00"),
    status: "rejected",
  },
];

const interviewersMock = [
  {
    id: 1,
    name: "Alice Johnson",
    company: "Google",
    experience: 5,
    profilePic: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Bob Smith",
    company: "Microsoft",
    experience: 7,
    profilePic: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Charlie Lee",
    company: "Amazon",
    experience: 4,
    profilePic: "https://i.pravatar.cc/100?img=3",
  },
];

const CalendarBooking = () => {
  const [events, setEvents] = useState(defaultMock);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [interviewers] = useState(interviewersMock);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);

  const makeTitle = (rawTitle, interviewerName) =>
    `${rawTitle} — ${interviewerName}`;

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end || addMinutes(slotInfo.start, 30),
    });
    setTime(format(slotInfo.start, "HH:mm"));
    setTitle("");
    setInterviewer("");
    setEditingId(null);
    setErrorMessage("");
    setIsOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedSlot({ start: event.start, end: event.end });
    setTitle(event.rawTitle);
    setTime(format(event.start, "HH:mm"));
    setInterviewer(event.interviewer);
    setEditingId(event.id);
    setErrorMessage("");
    setIsOpen(true);
  };

  const handleDeleteEvent = (eventId) => {
    const found = events.find((e) => e.id === eventId);
    if (!found) return;
    if (found.status === "accepted") {
      alert("You cannot delete an accepted interview.");
      return;
    }
    if (!window.confirm("Delete this slot?")) return;
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setIsOpen(false);
  };

  const handleBookSlot = () => {
    if (!title || !time || !interviewer) {
      setErrorMessage("All fields are required.");
      return;
    }

    const [hh, mm] = time.split(":").map((s) => parseInt(s, 10));
    const baseDate = selectedSlot?.start ? new Date(selectedSlot.start) : new Date();
    const start = new Date(baseDate.setHours(hh, mm, 0, 0));
    const end = addMinutes(start, 30);

    if (editingId) {
      const orig = events.find((e) => e.id === editingId);
      if (orig?.status === "accepted") {
        setErrorMessage("Accepted events cannot be edited.");
        return;
      }
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? { ...e, rawTitle: title, title: makeTitle(title, interviewer), interviewer, start, end }
            : e
        )
      );
    } else {
      const newEvent = {
        id: genId(),
        rawTitle: title,
        title: makeTitle(title, interviewer),
        interviewer,
        start,
        end,
        status: "sent",
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    setIsOpen(false);
  };

  const eventPropGetter = (event) => {
    let backgroundColor = "#2563eb";
    if (event.status === "accepted") backgroundColor = "#16a34a";
    if (event.status === "rejected") backgroundColor = "#dc2626";
    return {
      style: { backgroundColor, color: "white", borderRadius: "6px", padding: "2px 4px" },
    };
  };

  const EventComponent = ({ event }) => (
    <div className="flex flex-col">
      <span className="font-medium text-sm truncate">{event.rawTitle}</span>
      <span className="text-xs opacity-80 truncate">{event.interviewer}</span>
      <span className="text-[10px] opacity-90 mt-1">{event.status.toUpperCase()}</span>
    </div>
  );

  const currentEditingEvent = editingId ? events.find((e) => e.id === editingId) : null;
  const isReadOnly = currentEditingEvent?.status === "accepted";
  const canDelete = currentEditingEvent && currentEditingEvent.status !== "accepted";
  const canEdit = currentEditingEvent && currentEditingEvent.status === "sent";

  const statusColors = {
    sent: "text-blue-600 bg-blue-100",
    accepted: "text-green-600 bg-green-100",
    rejected: "text-red-600 bg-red-100",
  };

  return (
    <div className="p-4 sm:p-6 mt-12 bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Book Interview Slot</h1>
          <Calendar
            localizer={localizer}
            events={events}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            defaultView={Views.MONTH}
            views={["day", "week", "month"]}
            step={30}
            style={{ height: "70vh", minHeight: "400px" }}
            eventPropGetter={eventPropGetter}
            components={{ event: EventComponent }}
          />
        </div>

        {/* Interviewers */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-4 sm:p-6 max-h-[70vh] overflow-auto border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-4">Interviewers</h2>
          <ul className="space-y-4">
            {interviewers.map((i) => (
              <li
                key={i.id}
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-3 border-gray-200 dark:border-gray-800"
                onClick={() => setSelectedInterviewer(i)}
              >
                <img src={i.profilePic} alt={i.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{i.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{i.company}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{i.experience} years exp.</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4 z-50 overflow-auto">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
              {editingId ? (isReadOnly ? "View Slot" : "Edit Slot") : "Book Interview Slot"}
            </h2>
            {selectedSlot && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {format(selectedSlot.start, "PPP")} at {format(selectedSlot.start, "hh:mm a")}
              </p>
            )}
            {currentEditingEvent && (
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${statusColors[currentEditingEvent.status]}`}
              >
                Status: {currentEditingEvent.status}
              </div>
            )}

            <input
              type="text"
              placeholder="Candidate Name / Title"
              className="w-full border rounded-lg p-2 mb-3 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-slate-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isReadOnly}
            />
            <input
              type="time"
              className="w-full border rounded-lg p-2 mb-3 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-slate-900 dark:text-slate-100"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={isReadOnly}
            />
            <select
              className="w-full border rounded-lg p-2 mb-3 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-slate-900 dark:text-slate-100"
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              disabled={isReadOnly}
            >
              <option value="">Select Interviewer</option>
              {interviewers.map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <div className="flex flex-wrap justify-end mt-4 gap-2">
              <button
                className="px-4 py-2 border rounded-lg text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              {!editingId && (
                <button
                  className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
                  onClick={handleBookSlot}
                >
                  Book
                </button>
              )}
              {editingId && canEdit && (
                <button
                  className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
                  onClick={handleBookSlot}
                >
                  Update
                </button>
              )}
              {editingId && canDelete && (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => handleDeleteEvent(editingId)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </Dialog>

      {/* Interviewer Profile Modal */}
      <Dialog open={!!selectedInterviewer} onClose={() => setSelectedInterviewer(null)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-auto">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-800">
            {selectedInterviewer && (
              <>
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedInterviewer.profilePic}
                    alt={selectedInterviewer.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{selectedInterviewer.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{selectedInterviewer.company}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{selectedInterviewer.experience} years experience</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 bg-violet-500 text-white rounded-lg"
                    onClick={() => setSelectedInterviewer(null)}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CalendarBooking;

