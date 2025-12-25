import React from "react";
import AddProjects from "../Components/Projects/AddProjects";
const AdminMaterials = () => {
  return (
    <div className="pt-16 pb-5 px-4 lg:pl-60 w-screen">
      <h1 className="lg:hidden font-bold text-white bg-gradient-to-r from-violet-600 pl-2 mt-2 rounded-md">
        Materials
      </h1>
      <AddProjects />
    </div>
  );
};

export default AdminMaterials;
