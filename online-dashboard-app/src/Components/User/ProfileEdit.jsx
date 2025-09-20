import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Save, X } from "lucide-react";

const allSkills = [
    "React",
    "Node.js",
    "UI/UX",
    "JavaScript",
    "MongoDB",
    "Tailwind",
    "Next.js",
    "Express",
];

const ProfileEdit = ({ profile: initialProfile, onCancel, onSave }) => {
    const [profile, setProfile] = useState(initialProfile);
    const [skillInput, setSkillInput] = useState("");
    const [dropdownOptions, setDropdownOptions] = useState({
        degrees: [],
        branches: {},
        batches: [],
    });

    // Fetch dropdown data on mount
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/standard-data");
                setDropdownOptions(response.data.data);
            } catch (error) {
                console.error("Error fetching dropdown options:", error);
            }
        };
        fetchDropdownData();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const avatarUrl = URL.createObjectURL(e.target.files[0]);
            setProfile({ ...profile, avatar: avatarUrl });
        }
    };

    const handleResumeUpload = (e) => {
        setProfile({ ...profile, resume: e.target.files[0] });
    };

    const handleStatusChange = (e) => {
        setProfile({ ...profile, status: e.target.value });
    };

    const handleAddSkill = (skill) => {
        if (skill && !profile.skills.includes(skill)) {
            setProfile({ ...profile, skills: [...profile.skills, skill] });
        }
        setSkillInput("");
    };

    const handleRemoveSkill = (skill) => {
        setProfile({
            ...profile,
            skills: profile.skills.filter((s) => s !== skill),
        });
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-4">
                <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border mb-3"
                />
                <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer text-gray-600 hover:border-purple-500 hover:text-purple-600">
                    <Upload size={16} className="mr-2" />
                    Change Photo
                    <input type="file" className="hidden" onChange={handleAvatarChange} />
                </label>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <label className="block font-medium">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
                    />
                </div>

                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
                    />
                </div>

                <div>
                    <label className="block font-medium">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
                    />
                </div>

                <div>
                    <label className="block font-medium">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
                    />
                </div>

                <div>
                    <label className="block font-medium">Status</label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="status"
                                value="Fresher"
                                checked={profile.status === "Fresher"}
                                onChange={handleStatusChange}
                            />
                            Fresher
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="status"
                                value="Experienced"
                                checked={profile.status === "Experienced"}
                                onChange={handleStatusChange}
                            />
                            Experienced
                        </label>
                    </div>
                </div>

                {/* Status Based Fields */}
                {profile.status === "Fresher" ? (
                    <>
                        <div>
                            <label className="block font-medium">Degree</label>
                            <select
                                name="degree"
                                value={profile.degree}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
                            >
                                <option value="">Select Degree</option>
                                {dropdownOptions.degrees.map((deg) => (
                                    <option key={deg} value={deg}>
                                        {deg}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium">Branch</label>
                            <select
                                name="branch"
                                value={profile.branch}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
                            >
                                <option value="">Select Branch</option>
                                {Object.entries(dropdownOptions.branches).map(([code, name]) => (
                                    <option key={code} value={code}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium">Batch</label>
                            <select
                                name="year"
                                value={profile.year}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
                            >
                                <option value="">Select Batch</option>
                                {dropdownOptions.batches.map((batch) => (
                                    <option key={batch} value={batch}>
                                        {batch}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                ) : (
                    <div>
                        <label className="block font-medium">Experience</label>
                        <select
                            name="experience"
                            value={profile.experience}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
                        >
                            <option value="">Select Years</option>
                            {[...Array(11).keys()].map((yr) => (
                                <option key={yr} value={`${yr} Years`}>
                                    {yr} {yr === 1 ? "Year" : "Years"}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Resume */}
                <div className="md:col-span-2">
                    <label className="block font-medium">Resume</label>
                    <label className="flex items-center justify-center mt-1 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer text-gray-600 hover:border-purple-500 hover:text-purple-600">
                        <Upload size={16} className="mr-2" />
                        {profile.resume ? profile.resume.name : "Choose file"}
                        <input type="file" className="hidden" onChange={handleResumeUpload} />
                    </label>
                </div>

                {/* Skills */}
                {/* Skills */}
                <div className="md:col-span-2 relative">
                    <label className="block font-medium">Skills</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profile.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs flex items-center gap-1"
                            >
                                {skill}
                                <button
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Search a skill..."
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="w-full mt-2 px-3 py-2 rounded-lg border bg-white"
                    />

                    {skillInput && (
                        <div className="absolute mt-1 w-full border rounded-lg bg-white shadow z-10 max-h-40 overflow-y-auto">
                            {allSkills
                                .filter(
                                    (s) =>
                                        s.toLowerCase().includes(skillInput.toLowerCase()) &&
                                        !profile.skills.includes(s)
                                )
                                .map((s, idx) => (
                                    <div
                                        key={idx}
                                        className="px-3 py-1 cursor-pointer hover:bg-purple-100"
                                        onClick={() => handleAddSkill(s)}
                                    >
                                        {s}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

            </div>

            {/* Save + Cancel */}
            <div className="flex justify-between items-center mt-4">
                <p className="text-xs text-gray-400">
                    👤 Member since: {profile.memberSince}
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={onCancel}
                        className="flex items-center px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(profile)}
                        className="flex items-center px-3 py-1 rounded-lg text-sm bg-purple-600 text-white hover:bg-purple-700"
                    >
                        <Save size={16} className="mr-1" /> Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;

