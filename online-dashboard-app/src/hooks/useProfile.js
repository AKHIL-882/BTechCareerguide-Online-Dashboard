import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchProfileApi, updateProfileApi } from "@/api/profileApi";

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  status: "Fresher",
  experience_years: "",
  skills: [],
  headline: "",
  summary: "",
  location: "",
  links: [{ label: "LinkedIn", url: "" }],
  education_entries: [
    { school: "", degree: "", field: "", start_year: "", end_year: "" },
  ],
  experience_entries: [
    { company: "", role: "", start_date: "", end_date: "", description: "" },
  ],
  projects: [{ title: "", description: "", link: "" }],
  publications: [{ title: "", publisher: "", date: "", link: "" }],
  certifications: [{ title: "", issuer: "", year: "" }],
};

export const useProfile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = JSON.parse(localStorage.getItem("data"));
      const accessToken = auth?.access_token;
      if (!accessToken) {
        setError("Missing access token. Please log in.");
        return;
      }
      setLoading(true);
      try {
        const res = await fetchProfileApi(accessToken);
        const user = res?.data?.data?.user || {};
        const meta = user?.profile_meta || {};
        setProfile((prev) => ({
          ...prev,
          ...user,
          skills: user.skills || [],
          headline: meta.headline || "",
          summary: meta.summary || "",
          location: meta.location || "",
          links: meta.links?.length ? meta.links : defaultProfile.links,
          education_entries: meta.education?.length ? meta.education : defaultProfile.education_entries,
          experience_entries: meta.experience?.length ? meta.experience : defaultProfile.experience_entries,
          projects: meta.projects?.length ? meta.projects : defaultProfile.projects,
          publications: meta.publications?.length ? meta.publications : defaultProfile.publications,
          certifications: meta.certifications?.length ? meta.certifications : defaultProfile.certifications,
        }));
      } catch (err) {
        console.error(err);
        setError("Unable to load profile. Please retry.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const saveProfile = async (payload) => {
    const auth = JSON.parse(localStorage.getItem("data"));
    const accessToken = auth?.access_token;
    if (!accessToken) {
      setError("Missing access token. Please log in.");
      toast.error("Missing access token. Please log in.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await updateProfileApi(payload, accessToken);
      toast.success("Profile saved");
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message || "Failed to save profile";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { profile, setProfile, loading, saving, error, saveProfile };
};
