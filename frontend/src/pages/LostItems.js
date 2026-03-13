import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { List, MapPin, Search } from "lucide-react";

function LostItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/lost")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <List size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Lost Items Registry</h1>
            <p className="text-gray-500 mt-1">Browse items recently reported as lost by users.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <Search size={40} className="text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No lost items reported</h3>
          <p className="text-gray-500 max-w-md">The registry is currently empty. Whenever an item is reported as lost, it will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border border-gray-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
              <div className="h-56 overflow-hidden relative bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-200">
                    <Search size={48} />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-800 px-3 py-1.5 rounded-full shadow-sm">
                  Lost
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                  {item.itemName}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {item.description || "No description provided."}
                </p>

                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-center text-sm font-medium text-indigo-600">
                    <MapPin size={16} className="mr-1.5 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default LostItems;