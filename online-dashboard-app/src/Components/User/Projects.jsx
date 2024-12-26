import React from "react";

const Projects = () => (
  <section>
    <div className="grid grid-cols-3 gap-4">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h4 className="font-semibold">Coalition Technology</h4>
            <iframe
              className="mt-2 rounded-lg"
              width="100%"
              height="200px"
              src="https://www.youtube.com/embed/IRWpHLcSkYw"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="flex justify-between mt-4">
              <span className="text-red-500">Youtube</span>
              <button className="text-blue-500">Get Code</button>
            </div>
          </div>
        ))}
    </div>
  </section>
);

export default Projects;
