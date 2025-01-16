import React, { useState } from "react";
import InputField from "../DashBoard/InputField"
import { useCreateProject } from "../../../../Api";
import Spinner from "../Spinner";

const AddProjects = ({ addProject }) => {
  const [formData, setFormData] = useState({
    project_name: "",
    youtube_link: "",
    payment_link: "",
  });

  const { loading, error, createProject } = useCreateProject();

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject(formData, setFormData, addProject);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-blue-50 p-6 space-y-4 rounded-lg my-4 shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">
        Add Project
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="companyName"
          label="Project Name"
          type="text"
          value={formData.project_name}
          onChange={(e) =>
            setFormData({ ...formData, project_name: e.target.value })
          }
          placeholder="Enter Project Name"
        />
        <InputField
          id="Youtube Link"
          label="Youtube Link"
          type="url"
          value={formData.youtube_link}
          onChange={(e) => setFormData({ ...formData, youtube_link: e.target.value })}
          placeholder="Enter Youtube Link"
        />
        <InputField
          id="Payment url"
          label="Payment url"
          type="url"
          value={formData.payment_link}
          onChange={(e) => setFormData({ ...formData, payment_link: e.target.value })}
          placeholder="Enter Payment URL"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 transition text-sm font-medium"
      >
        {loading ? (
          <p className="flex items-center justify-center">
            <Spinner loading={loading} color={"#800080"} size={20} />
            <span className="pl-1">Adding project...</span>
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          "Add project"
        )}
      </button>
    </form>
  );
};

export default AddProjects;
