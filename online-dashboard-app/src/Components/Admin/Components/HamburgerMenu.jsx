const HamburgerMenu = ({ toggleSidebar }) => (
  <button
    onClick={toggleSidebar}
    className="lg:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  </button>
);

export default HamburgerMenu;
