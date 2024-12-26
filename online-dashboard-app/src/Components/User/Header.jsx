import React from "react";

const Header = ({ handleLogout }) => (
  <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
    <div className="text-2xl font-bold">
      <img src="logo.PNG" alt="Logo" className="h-10 w-40" />
    </div>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  </header>
);

export default Header;
