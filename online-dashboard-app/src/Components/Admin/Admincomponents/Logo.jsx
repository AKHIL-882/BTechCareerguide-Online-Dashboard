import { Link } from "react-router-dom";
const Logo = () => (
    <div className="text-2xl font-bold">
      <Link to={"/admindashboard"}>
        <img
          src="logo.PNG"
          alt="Logo"
          className="h-8 w-28 lg:h-10 lg:w-40 transition-all"
        />
      </Link>
    </div>
  );
  
  export default Logo;
  