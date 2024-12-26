import React, { useState, useEffect } from "react";
import dummyJobs from "../Temp/DummyJobs.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Projects from "./Projects.jsx";

const ProjectHome = ({ handleLogout }) => {
    const [projects, setProjects] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showProjects, setShowProjects] = useState(true);
    const [showPaymentForm, setShowPaymentForm] = useState(false); 

    const dummyProjectData = [
        { id: 1, title: "Project 1", technology: "React, Node.js", description: "Sample project with React and Node.js.", status: "In Progress" },
        { id: 2, title: "Project 2", technology: "Laravel, Vue.js", description: "Full-stack project using Laravel and Vue.js.", status: "Completed" },
        { id: 3, title: "Project 3", technology: "Angular, Firebase", description: "Angular project with Firebase backend.", status: "Pending" },
    ];

    useEffect(() => {
        setProjects(dummyProjectData);
        setUserProjects(dummyProjectData);
    }, []);

    const handleUploadPaymentClick = () => {
        setShowPaymentForm(true); 
        setShowForm(false); 
        setShowProjects(false); 
    };

    const handleShowProjectsClick = () => {
        setShowProjects(true); 
        setShowForm(false);
        setShowPaymentForm(false); 
    };

    const handleShowRequestNewProject = () => {
        setShowForm(true); 
        setShowProjects(false); 
        setShowPaymentForm(false); 
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header handleLogout={handleLogout} />
            <div className="flex flex-1">
                <Sidebar handleLogout={handleLogout} />
                <main className="flex-1 p-6">
                    <div className="p-4">
                        <div className="mt-4 flex justify-between mb-4">
                            <div className="flex space-x-4">
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                    onClick={handleShowRequestNewProject}
                                >
                                    Request New Project
                                </button>
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                                    onClick={handleShowProjectsClick}
                                >
                                    Show Projects
                                </button>
                            </div>
                            <div className="flex">
                                <button
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                                    onClick={handleUploadPaymentClick}
                                >
                                    Upload Payment Screenshot
                                </button>
                            </div>
                        </div>

                        {/* Request New Project Form */}
                        {showForm && (
                            <div className="mt-8 border p-4 rounded-lg bg-white shadow-lg mx-auto">
                                <h2 className="text-lg font-semibold">Submission Request</h2>
                                <p className="text-sm text-gray-500 mt-2">
                                    Ensure all the details entered are correct!!
                                </p>
                                <form>
                                    {/* Project Title */}
                                    <div className="flex justify-between mt-6">
                                        <div className="w-3/5">
                                            <label className="block text-gray-700">Project Title</label>
                                            <input
                                                type="text"
                                                className="border border-gray-300 p-2 rounded-md w-full"
                                                placeholder="Project Title"
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <label className="block text-gray-700">Days to Complete</label>
                                            <select
                                                className="border border-gray-300 p-2 rounded-md w-full"
                                                defaultValue="Days"
                                            >
                                                <option disabled>Days</option>
                                                <option value="7">7</option>
                                                <option value="14">14</option>
                                                <option value="30">30</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Technology */}
                                    <div className="mt-4">
                                        <label className="block text-gray-700">
                                            Technology to be used (Comma Separated) | Ex: React JS, Laravel
                                        </label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 rounded-md w-full"
                                            placeholder="Technologies"
                                        />
                                    </div>

                                    {/* Project Description */}
                                    <div className="mt-4">
                                        <label className="block text-gray-700">Project Description</label>
                                        <textarea
                                            className="border border-gray-300 p-2 rounded-md w-full"
                                            rows="4"
                                            placeholder="Project Description"
                                        ></textarea>
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-6 flex justify-between items-center">
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                        >
                                            Upload File
                                        </button>
                                        <div className="space-x-4">
                                            <button
                                                type="button"
                                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800"
                                            >
                                                Send Request
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Payment Upload Form */}
                        {showPaymentForm && (
                            <div className="mt-8 border p-6 rounded-lg bg-white shadow-lg">
                                <h2 className="text-lg font-semibold">Upload Payment Screenshot</h2>
                                <p className="text-sm text-gray-500">Please select the project and upload your payment screenshot.</p>
                                <div className="mt-4">
                                    <select className="border-gray-300 p-2 rounded-md w-full mb-4">
                                        <option>Select Project</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.title}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Upload File</button>
                                    <button
                                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 ml-4"
                                        onClick={() => setShowPaymentForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Projects Section */}
                        {showProjects && (
                            <div className="mt-8">
                                <h2 className="text-lg font-semibold mb-4">Projects</h2>
                                <Projects />
                                <div className="mt-8">
                                    <h3 className="text-md font-semibold mb-4">Project Table</h3>
                                    <table className="table-auto w-full border-collapse border border-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="border px-4 py-2">ID</th>
                                                <th className="border px-4 py-2">Title</th>
                                                <th className="border px-4 py-2">Technology</th>
                                                <th className="border px-4 py-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projects.map((project) => (
                                                <tr key={project.id}>
                                                    <td className="border px-4 py-2">{project.id}</td>
                                                    <td className="border px-4 py-2">{project.title}</td>
                                                    <td className="border px-4 py-2">{project.technology}</td>
                                                    <td className="border px-4 py-2">{project.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProjectHome;
