import React, { useState, useEffect } from "react";
import { getUserDetails, postTestimonial } from "../../Api";

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
