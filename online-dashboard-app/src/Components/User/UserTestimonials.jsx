import React, { useState } from "react";

const UserTestimonials = () => {
  const [form, setForm] = useState({
    feedback: "",
    job_role: "",
    company: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Thank you for your feedback!");
        setForm({ feedback: "", job_role: "", company: "" });
      } else {
        setError(result.message || "Submission failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="m-2 flex-1 pt-14 lg:relative lg:pl-56 py-2 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 overflow-auto h-auto">
          <h2 className="text-lg text-blue-950 mb-2 relative flex items-center space-x-2 pb-2 font-display font-bold">
            <div className="flex items-center justify-center space-x-1">
              <span className="w-1 h-4 bg-violet-600"></span>
              <span>Please Submit your Feedback</span>
            </div>
          </h2>

          {message && <p className="text-green-600 mb-4">{message}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                name="job_role"
                placeholder="Job Role"
                value={form.job_role}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded mb-4 md:mb-0"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={form.company}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <textarea
              name="feedback"
              placeholder="Your feedback"
              value={form.feedback}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />

            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserTestimonials;
