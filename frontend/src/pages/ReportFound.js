import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { UploadCloud, MapPin, Tag, FileText, CheckCircle2, Search } from "lucide-react";

function ReportFound() {
  const [formData, setFormData] = useState({
    itemName: "", description: "", location: "", lat: "", lng: "", image: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userEmail = localStorage.getItem("userEmail");
      await axios.post("http://localhost:5000/api/found", { ...formData, userEmail });
      setSuccess(true);
      setFormData({ itemName: "", description: "", location: "", lat: "", lng: "", image: "" });
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error(error);
      alert("Failed to report found item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-emerald-100/80 text-emerald-600 rounded-xl">
              <Search size={28} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Report Found Item</h1>
          </div>
          <p className="text-gray-500 ml-14">Help reunite someone with their lost property by submitting details.</p>
        </div>

        {success && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700 animate-pulse">
            <CheckCircle2 size={24} />
            <p className="font-medium">Found item reported successfully! You're a hero!</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-5 h-full">
            <div className="md:col-span-2 bg-gradient-to-br from-emerald-900 to-teal-900 p-10 text-white flex flex-col justify-between hidden md:flex">
              <div>
                <h3 className="text-2xl font-bold mb-4">Found Something?</h3>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Provide descriptive information so we can accurately match this to incoming lost reports in our system database.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-emerald-200">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">1</div>
                  <p className="text-sm font-medium">Record specifics</p>
                </div>
                <div className="flex items-center gap-4 text-emerald-200">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">2</div>
                  <p className="text-sm font-medium">Capture evidence</p>
                </div>
                <div className="flex items-center gap-4 text-emerald-200">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">3</div>
                  <p className="text-sm font-medium">Log location</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">What did you find?</label>
                  <div className="relative flex items-center">
                    <Tag className="absolute left-4 text-gray-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Blue Hydroflask, Keys, Wallet" 
                      value={formData.itemName}
                      onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 block p-3.5 pl-12 transition duration-300 outline-none" 
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Description</label>
                  <div className="relative flex items-start">
                    <FileText className="absolute left-4 top-4 text-gray-400" size={18} />
                    <textarea 
                      required
                      rows="3"
                      placeholder="Provide identifying details..." 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 block p-3.5 pl-12 transition duration-300 outline-none resize-none" 
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Location Found</label>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-4 text-gray-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Central Library, Main Street" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 block p-3.5 pl-12 transition duration-300 outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Latitude (Optional)</label>
                    <input 
                      type="number" step="any"
                      placeholder="e.g. 40.7128" 
                      value={formData.lat}
                      onChange={(e) => setFormData({...formData, lat: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 block p-3.5 transition duration-300 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Longitude (Optional)</label>
                    <input 
                      type="number" step="any"
                      placeholder="e.g. -74.0060" 
                      value={formData.lng}
                      onChange={(e) => setFormData({...formData, lng: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 block p-3.5 transition duration-300 outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Upload Evidence</label>
                  <div className="w-full flex items-center justify-center">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-emerald-400 transition duration-300 overflow-hidden relative group">
                      {formData.image ? (
                        <>
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex flex-col items-center justify-center text-white transition duration-300">
                            <UploadCloud size={24} className="mb-2" />
                            <p className="text-sm font-medium">Change image</p>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                          <UploadCloud size={32} className="mb-3 text-emerald-500" />
                          <p className="mb-1 text-sm"><span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF (MAX. 10MB)</p>
                        </div>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImage} />
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-xl text-sm px-5 py-4 text-center transition-all duration-300 shadow-xl shadow-emerald-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReportFound;