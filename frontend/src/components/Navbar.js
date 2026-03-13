import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-blue-600">
        Lost & Found
      </h1>

      <div className="space-x-6 font-medium">
        <Link to="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/report-lost" className="hover:text-blue-600">
          Report Lost
        </Link>

        <Link to="/report-found" className="hover:text-blue-600">
          Report Found
        </Link>
      </div>

    </div>
  );
}

export default Navbar;