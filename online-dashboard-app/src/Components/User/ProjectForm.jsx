import React from "react";

const ProjectForm = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  setShowForm,
  setShowProjects,
}) => (
  <div className="mt-8 border p-4 rounded-lg bg-white shadow-lg mx-auto w-full">
    <h2 className="text-lg font-semibold text-violet-800 font-display">
      Submission Request
    </h2>
    <form onSubmit={handleSubmit}>
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 font-sans">Project Title</label>
          <input
            type="text"
            name="project_name"
            value={formData.project_name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500"
            placeholder="Project Title"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-sans">
            Days to Complete
          </label>
          <select
            name="days_to_complete"
            value={formData.days_to_complete}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-4/6 lg:w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500 "
            required
          >
            <option value="">Select Days</option>
            <option value="0">Asap</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="14">In a Week</option>
            <option value="30">In a Month</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-sans">Technology</label>
        <input
          type="text"
          name="technical_skills"
          value={formData.technical_skills}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500"
          placeholder="Technologies"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-sans">
          Project Description
        </label>
        <textarea
          name="project_description"
          value={formData.project_description}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500"
          rows="4"
          placeholder="Description"
          required
        ></textarea>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-sans">Upload File</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-md w-full font-sans focus:outline-none focus:ring-1 focus:ring-violet-500"
          required
        />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          type="submit"
          className="bg-violet-800 text-white py-2 px-4 rounded-md hover:bg-violet-600 font-sans"
        >
          Submit Request
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 font-sans"
          onClick={() => {
            setShowForm(false);
            setShowProjects(true);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

export default ProjectForm;
