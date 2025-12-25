import React, { useCallback, useState } from "react";
import {
  Plus,
  Save,
  Link2,
  GraduationCap,
  Briefcase,
  FileText,
  BookOpen,
  Award,
  User2,
  Pencil,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import Spinner from "@/shared/components/atoms/Spinner";

const SectionCard = ({ title, icon: Icon, action, children }) => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-indigo-600 dark:text-indigo-300" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      </div>
      {action}
    </div>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <label className="block text-sm text-gray-700 dark:text-gray-300">
    <span className="block mb-1">{label}</span>
    <input
      {...props}
      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </label>
);

const TextArea = ({ label, ...props }) => (
  <label className="block text-sm text-gray-700 dark:text-gray-300">
    <span className="block mb-1">{label}</span>
    <textarea
      {...props}
      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </label>
);

const ProfilePage = () => {
  const { profile, setProfile, loading, saving, error, saveProfile } = useProfile();
  const [editMode, setEditMode] = useState({
    basics: false,
    links: false,
    education: false,
    experience: false,
    projects: false,
    publications: false,
    certifications: false,
  });

  const toggleEdit = (key) => setEditMode((prev) => ({ ...prev, [key]: !prev[key] }));

  const updateField = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const updateList = useCallback(
    (key, index, field, value) => {
      setProfile((prev) => {
        const updated = [...(prev[key] || [])];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, [key]: updated };
      });
    },
    [setProfile],
  );

  const addListItem = (key, template) => {
    setProfile((prev) => ({ ...prev, [key]: [...(prev[key] || []), template] }));
  };

  const handleSave = async () => {
    const payload = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      status: profile.status,
      experience_years: profile.experience_years,
      skills: profile.skills || [],
      headline: profile.headline,
      summary: profile.summary,
      location: profile.location,
      links: profile.links || [],
      education_entries: profile.education_entries || [],
      experience_entries: profile.experience_entries || [],
      projects: profile.projects || [],
      publications: profile.publications || [],
      certifications: profile.certifications || [],
    };

    try {
      await saveProfile(payload);
    } catch {
      // toast handled in hook
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner loading={loading} color="#7c3aed" size={32} />
      </div>
    );
  }

  return (
    <main className="m-3 flex-1 pt-10 pb-10 bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 min-h-screen space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white shadow-xl px-6 py-7 border border-white/10">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,_#fff_0,_transparent_25%),radial-gradient(circle_at_80%_30%,_#fff_0,_transparent_35%)]" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] bg-white/15 rounded-full px-3 py-1 backdrop-blur">
              <User2 size={14} /> Profile
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Keep your profile up to date—showcase skills, education, and work like on LinkedIn.
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              View cards by default; tap the pencil to edit and add entries in each section.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-4 py-2 rounded-xl shadow-md hover:-translate-y-0.5 transition disabled:opacity-70"
          >
            {saving ? <Spinner loading color="#7c3aed" size={16} /> : <Save size={16} />}
            {saving ? "Saving..." : "Save profile"}
          </button>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200 px-4 py-3">
          {error}
        </div>
      )}

      <section className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-3">
          <SectionCard
            title="Basics"
            icon={User2}
            action={
              <button
                onClick={() => toggleEdit("basics")}
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
              >
                <Pencil size={12} /> {editMode.basics ? "View" : "Edit"}
              </button>
            }
          >
            {editMode.basics ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input label="Full name" value={profile.name || ""} onChange={(e) => updateField("name", e.target.value)} />
                  <Input label="Email" value={profile.email || ""} onChange={(e) => updateField("email", e.target.value)} />
                  <Input label="Phone" value={profile.phone || ""} onChange={(e) => updateField("phone", e.target.value)} />
                  <Input label="Location" value={profile.location || ""} onChange={(e) => updateField("location", e.target.value)} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input label="Headline" value={profile.headline || ""} onChange={(e) => updateField("headline", e.target.value)} />
                  <Input
                    label="Experience (years)"
                    type="number"
                    min="0"
                    value={profile.experience_years || ""}
                    onChange={(e) => updateField("experience_years", e.target.value)}
                  />
                </div>
                <TextArea
                  label="Summary"
                  rows={4}
                  value={profile.summary || ""}
                  onChange={(e) => updateField("summary", e.target.value)}
                />
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Skills (comma separated)</label>
                  <input
                    value={(profile.skills || []).join(", ")}
                    onChange={(e) =>
                      updateField(
                        "skills",
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      )
                    }
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="React, Node.js, SQL"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{profile.name}</p>
                <p>{profile.email}</p>
                <p>{profile.phone}</p>
                <p>{profile.location}</p>
                <p className="font-medium text-indigo-700 dark:text-indigo-200">{profile.headline}</p>
                <p className="text-gray-600 dark:text-gray-400">{profile.summary || "Add your summary to stand out."}</p>
                <div className="flex flex-wrap gap-2">
                  {(profile.skills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Links"
            icon={Link2}
            action={
              <button
                onClick={() => (editMode.links ? addListItem("links", { label: "", url: "" }) : toggleEdit("links"))}
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
              >
                {editMode.links ? <Plus size={12} /> : <Pencil size={12} />} {editMode.links ? "Add" : "Edit"}
              </button>
            }
          >
            {editMode.links ? (
              <div className="space-y-3">
                {profile.links?.map((link, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input
                      label="Label"
                      value={link.label || ""}
                      onChange={(e) => updateList("links", idx, "label", e.target.value)}
                      placeholder="LinkedIn"
                    />
                    <Input
                      label="URL"
                      value={link.url || ""}
                      onChange={(e) => updateList("links", idx, "url", e.target.value)}
                      placeholder="https://"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {profile.links?.map((link, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="font-medium">{link.label}</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-700 dark:text-indigo-200 text-xs"
                    >
                      {link.url}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard
            title="Education"
            icon={GraduationCap}
            action={
              <button
                onClick={() =>
                  editMode.education
                    ? addListItem("education_entries", {
                        school: "",
                        degree: "",
                        field: "",
                        start_year: "",
                        end_year: "",
                      })
                    : toggleEdit("education")
                }
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
              >
                {editMode.education ? <Plus size={12} /> : <Pencil size={12} />} {editMode.education ? "Add" : "Edit"}
              </button>
            }
          >
            {editMode.education ? (
              <div className="space-y-4">
                {profile.education_entries?.map((edu, idx) => (
                  <div key={idx} className="grid gap-3 sm:grid-cols-2">
                    <Input
                      label="School / University"
                      value={edu.school || ""}
                      onChange={(e) => updateList("education_entries", idx, "school", e.target.value)}
                    />
                    <Input
                      label="Degree"
                      value={edu.degree || ""}
                      onChange={(e) => updateList("education_entries", idx, "degree", e.target.value)}
                    />
                    <Input
                      label="Field of study"
                      value={edu.field || ""}
                      onChange={(e) => updateList("education_entries", idx, "field", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Start"
                        value={edu.start_year || ""}
                        onChange={(e) => updateList("education_entries", idx, "start_year", e.target.value)}
                      />
                      <Input
                        label="End"
                        value={edu.end_year || ""}
                        onChange={(e) => updateList("education_entries", idx, "end_year", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {profile.education_entries?.map((edu, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-100 dark:border-gray-800 p-3">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{edu.school}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.degree} · {edu.field}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {edu.start_year} - {edu.end_year}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="Experience"
            icon={Briefcase}
            action={
              <button
                onClick={() =>
                  editMode.experience
                    ? addListItem("experience_entries", {
                        company: "",
                        role: "",
                        start_date: "",
                        end_date: "",
                        description: "",
                      })
                    : toggleEdit("experience")
                }
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
              >
                {editMode.experience ? <Plus size={12} /> : <Pencil size={12} />} {editMode.experience ? "Add" : "Edit"}
              </button>
            }
          >
            {editMode.experience ? (
              <div className="space-y-4">
                {profile.experience_entries?.map((exp, idx) => (
                  <div key={idx} className="space-y-3 rounded-xl border border-gray-200 dark:border-gray-800 p-3">
                    <Input
                      label="Company"
                      value={exp.company || ""}
                      onChange={(e) => updateList("experience_entries", idx, "company", e.target.value)}
                    />
                    <Input
                      label="Role / Title"
                      value={exp.role || ""}
                      onChange={(e) => updateList("experience_entries", idx, "role", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Start"
                        value={exp.start_date || ""}
                        onChange={(e) => updateList("experience_entries", idx, "start_date", e.target.value)}
                      />
                      <Input
                        label="End"
                        value={exp.end_date || ""}
                        onChange={(e) => updateList("experience_entries", idx, "end_date", e.target.value)}
                      />
                    </div>
                    <TextArea
                      label="Description"
                      rows={3}
                      value={exp.description || ""}
                      onChange={(e) => updateList("experience_entries", idx, "description", e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {profile.experience_entries?.map((exp, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-100 dark:border-gray-800 p-3">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {exp.role} · {exp.company}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {exp.start_date} - {exp.end_date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Projects"
            icon={FileText}
            action={
              <button
                onClick={() =>
                  editMode.projects
                    ? addListItem("projects", { title: "", description: "", link: "" })
                    : toggleEdit("projects")
                }
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
              >
                {editMode.projects ? <Plus size={12} /> : <Pencil size={12} />} {editMode.projects ? "Add" : "Edit"}
              </button>
            }
          >
            {editMode.projects ? (
              <div className="space-y-4">
                {profile.projects?.map((proj, idx) => (
                  <div key={idx} className="space-y-3 rounded-xl border border-gray-200 dark:border-gray-800 p-3">
                    <Input
                      label="Title"
                      value={proj.title || ""}
                      onChange={(e) => updateList("projects", idx, "title", e.target.value)}
                    />
                    <TextArea
                      label="Description"
                      rows={3}
                      value={proj.description || ""}
                      onChange={(e) => updateList("projects", idx, "description", e.target.value)}
                    />
                    <Input
                      label="Link"
                      value={proj.link || ""}
                      onChange={(e) => updateList("projects", idx, "link", e.target.value)}
                      placeholder="https://"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {profile.projects?.map((proj, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-100 dark:border-gray-800 p-3">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{proj.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{proj.description}</p>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-700 dark:text-indigo-200 text-xs"
                      >
                        {proj.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="Publications"
            icon={BookOpen}
            action={
              <button
                onClick={() =>
                  editMode.publications
                    ? addListItem("publications", { title: "", publisher: "", date: "", link: "" })
                    : toggleEdit("publications")
                }
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
              >
                {editMode.publications ? <Plus size={12} /> : <Pencil size={12} />} {editMode.publications ? "Add" : "Edit"}
              </button>
            }
          >
            {editMode.publications ? (
              <div className="space-y-4">
                {profile.publications?.map((pub, idx) => (
                  <div key={idx} className="space-y-3 rounded-xl border border-gray-200 dark:border-gray-800 p-3">
                    <Input
                      label="Title"
                      value={pub.title || ""}
                      onChange={(e) => updateList("publications", idx, "title", e.target.value)}
                    />
                    <Input
                      label="Publisher / Journal"
                      value={pub.publisher || ""}
                      onChange={(e) => updateList("publications", idx, "publisher", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Date"
                        value={pub.date || ""}
                        onChange={(e) => updateList("publications", idx, "date", e.target.value)}
                      />
                      <Input
                        label="Link"
                        value={pub.link || ""}
                        onChange={(e) => updateList("publications", idx, "link", e.target.value)}
                        placeholder="https://"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {profile.publications?.map((pub, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-100 dark:border-gray-800 p-3">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{pub.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{pub.publisher}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{pub.date}</p>
                    {pub.link && (
                      <a href={pub.link} target="_blank" rel="noreferrer" className="text-indigo-700 dark:text-indigo-200 text-xs">
                        {pub.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Certifications"
            icon={Award}
            action={
              <button
                onClick={() =>
                  editMode.certifications
                    ? addListItem("certifications", { title: "", issuer: "", year: "" })
                    : toggleEdit("certifications")
                }
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
              >
                {editMode.certifications ? <Plus size={12} /> : <Pencil size={12} />} {editMode.certifications ? "Add" : "Edit"}
              </button>
            }
          >
            {editMode.certifications ? (
              <div className="space-y-4">
                {profile.certifications?.map((cert, idx) => (
                  <div key={idx} className="space-y-3 rounded-xl border border-gray-200 dark:border-gray-800 p-3">
                    <Input
                      label="Title"
                      value={cert.title || ""}
                      onChange={(e) => updateList("certifications", idx, "title", e.target.value)}
                    />
                    <Input
                      label="Issuer"
                      value={cert.issuer || ""}
                      onChange={(e) => updateList("certifications", idx, "issuer", e.target.value)}
                    />
                    <Input
                      label="Year"
                      value={cert.year || ""}
                      onChange={(e) => updateList("certifications", idx, "year", e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {profile.certifications?.map((cert, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-100 dark:border-gray-800 p-3">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{cert.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cert.year}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
