import React, { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from the API
    const fetchProjects = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("data"));
        const accessToken = data ? data.access_token : null;

        const response = await fetch("http://127.0.0.1:8000/api/admin-projects", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        setProjects(responseData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error fetching projects: {error}</p>;
  }

  return (
    <section>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h4 className="font-semibold">{project.company_name}</h4>
            {project.youtube_video_link ? (
              <iframe
                className="mt-2 rounded-lg"
                width="100%"
                height="200px"
                src={project.youtube_video_link.replace("youtu.be/", "www.youtube.com/embed/")}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                className="mt-2 rounded-lg"
                width="100%"
                height="100px"
                src="https://yt3.ggpht.com/-9yBZjOArhmmByU_lHhGKsMUombz9cVy_beno4PBwKm18Z8MGBhAFB2ThrFtBYPBT5wRKJU8oM0=s176-c-k-c0x00ffffff-no-rj"
                alt="Placeholder"
              />
            )}


            <div className="flex justify-between mt-4">
              <span className="text-red-500">YouTube</span>
              <a
                href={project.payment_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Get Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
