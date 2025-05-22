import React, { useState, useEffect } from "react";
import { getUserDetails, postTestimonial } from "../../Api";
import SectionHeading from "./SectionHeading";

const UserTestimonials = () => {
  const [form, setForm] = useState({
    user_id: "",
    feedback: "",
    job_role: "",
    company: "",
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
    } catch (err) {
      setError(err.message || "Submission failed.");
    }
  };

  return (
    <div className="m-3 flex-1 pt-14 lg:relative py-2 min-h-screen bg-slate-50">
      <SectionHeading text="Please Submit your Feedback" />
      <form onSubmit={handleSubmit}>
        <div className=" mx-auto bg-white shadow-lg rounded-lg p-6 overflow-auto h-auto">
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
                className="w-full border border-gray-300 p-2 rounded mb-4 md:mb-0 focus:outline-violet-500"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={form.company}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-violet-500"
                required
              />
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
