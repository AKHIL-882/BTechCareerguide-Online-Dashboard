import React, { useState, useEffect } from "react";
import { getUserDetails, postTestimonial } from "../../Api";
import SectionHeading from "./SectionHeading";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

const UserTestimonials = ({ onClose }) => {
  const [form, setForm] = useState({
    user_id: "",
    feedback: "",
    job_role: "dev",
    company: "", // new dropdown field
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = JSON.parse(localStorage.getItem("data"));
      const accessToken = data?.access_token;

      try {
        const result = await getUserDetails(accessToken);
        setForm((prev) => ({ ...prev, user_id: result.id }));
      } catch (err) {
        setError(err.message || "Could not fetch user info");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);

    const data = JSON.parse(localStorage.getItem("data"));
    const accessToken = data?.access_token;

    try {
      await postTestimonial(form, accessToken);
      setMessage("Thank you for your feedback!");
      setForm((prev) => ({
        ...prev,
        feedback: "",
        job_role: "",
        company: "",
      }));
      setTimeout(() => onClose(), 1500); // Auto close after success
    } catch (err) {
      setError(err.message || "Submission failed.");
    }
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {" "}
        {/* increased width */}
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X />
        </button>
        <SectionHeading text="Please Submit your Feedback" />
        <form onSubmit={handleSubmit} className="mt-4">
          {message && <p className="text-green-600 mb-4">{message}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <select
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-violet-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Job">Job</option>
                <option value="Project">Project</option>
                <option value="Interview">Interview</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <textarea
              name="feedback"
              placeholder="Your feedback"
              value={form.feedback}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 p-2 rounded focus:outline-violet-500"
              required
            />

            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  return ReactDOM.createPortal(modalContent, document.body);
};

export default UserTestimonials;
