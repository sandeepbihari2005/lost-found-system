import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Users, Link as LinkIcon, AlertCircle, CheckCircle2 } from "lucide-react";

function Matches(){
  const [matches,setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/matches")
    .then(res=>{
      setMatches(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
    .finally(()=>{
      setLoading(false);
    });
  },[]);

  return(
    <Layout>
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Potential Matches</h1>
            <p className="text-gray-500 mt-1">Found items that seem to match reported lost items.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : matches.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <LinkIcon size={40} className="text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No matches found yet</h3>
          <p className="text-gray-500 max-w-md">Our system constantly analyzes reported items to find potential matches. Check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {matches.map((m,index)=>(
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 relative">
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-indigo-100 flex items-center justify-center z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <LinkIcon size={20} className="text-indigo-500" />
              </div>

              <div className="grid grid-cols-2 h-full">
                <div className="p-6 bg-red-50/50 border-r border-red-100">
                  <div className="flex items-center gap-2 text-red-600 mb-4">
                    <AlertCircle size={18} />
                    <h2 className="text-sm font-bold uppercase tracking-wider">Reported Lost</h2>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={m.lost.itemName}>{m.lost.itemName}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{m.lost.description}</p>
                  <div className="inline-block bg-white border border-red-100 text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg w-full truncate text-center">
                    📍 {m.lost.location}
                  </div>
                </div>

                <div className="p-6 bg-emerald-50/50">
                  <div className="flex items-center gap-2 text-emerald-600 mb-4">
                    <CheckCircle2 size={18} />
                    <h2 className="text-sm font-bold uppercase tracking-wider">Found Evidence</h2>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={m.found.itemName}>{m.found.itemName}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{m.found.description}</p>
                  <div className="inline-block bg-white border border-emerald-100 text-emerald-600 text-xs font-medium px-3 py-1.5 rounded-lg w-full truncate text-center">
                    📍 {m.found.location}
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default Matches;