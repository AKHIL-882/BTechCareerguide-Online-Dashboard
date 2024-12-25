import { Link } from "react-router-dom";
const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className="flex items-center hover:text-blue-500 text-gray-700"
    >
      {icon}
      <span className="pl-2">{label}</span>
    </Link>
  );
  
  export default NavLink;
  