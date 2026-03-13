import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { ListCollapse, Search, ShieldAlert, BarChart3 } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({ lost: 0, found: 0 });
  const [matchesCount, setMatchesCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail") || "";
        const [statsRes, matchesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/stats?email=${userEmail}`),
          axios.get(`http://localhost:5000/api/matches?email=${userEmail}`)
        ]);
        setStats(statsRes.data);
        setMatchesCount(matchesRes.data.length);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Lost Items", count: stats.lost, icon: ShieldAlert, color: "from-red-500 to-rose-400", shadow: "shadow-red-500/30" },
    { title: "Found Items", count: stats.found, icon: Search, color: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/30" },
    { title: "Matches Made", count: matchesCount, icon: ListCollapse, color: "from-blue-600 to-indigo-500", shadow: "shadow-blue-500/30" }
  ];

  return (
    <Layout>
      <div className="mb-10 flex items-center gap-3">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
          <BarChart3 size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Monitor the state of lost and found items across the platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-lg ${card.shadow} transform transition duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group`}>
              <div className="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 transition duration-500">
                <Icon size={120} />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Icon size={24} className="text-white" />
                </div>
                <h2 className="text-white/90 text-sm font-medium uppercase tracking-wider mb-1">{card.title}</h2>
                <p className="text-4xl font-extrabold">{card.count}</p>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Platform Activity</h3>
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <ListCollapse size={48} className="mb-4 text-gray-200" />
          <p>No recent activity logs available. Items will appear here when reported.</p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;