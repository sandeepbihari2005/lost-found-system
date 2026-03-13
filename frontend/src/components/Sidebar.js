import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Search, List, Users, LogOut } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Report Lost Item", path: "/report-lost", icon: FileText },
    { name: "Report Found Item", path: "/report-found", icon: Search },
    { name: "All Lost Items", path: "/lost-items", icon: List },
    { name: "Possible Matches", path: "/matches", icon: Users }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-72 bg-indigo-900 border-r border-indigo-800 text-white flex flex-col shadow-2xl z-20 transition-all duration-300">
      <div className="h-20 flex items-center px-8 border-b border-indigo-800/50">
        <div className="bg-white/10 p-2 rounded-lg mr-3 shadow-inner">
          <Search className="text-indigo-300" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-wider text-white">FindIt<span className="text-indigo-400">Fast</span></h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-8 px-4">
        <ul className="space-y-2">
          {menu.map((item, index) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 font-medium ${
                  active 
                    ? "bg-indigo-600 shadow-lg shadow-indigo-600/30 text-white" 
                    : "text-indigo-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={20} className={active ? "text-white" : "text-indigo-300"} />
                {item.name}
              </li>
            )
          })}
        </ul>
      </div>
      
      <div className="p-4 border-t border-indigo-800/50 mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-300 hover:bg-red-500/10 transition duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;