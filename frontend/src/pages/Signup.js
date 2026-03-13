import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Search, Eye, EyeOff } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/signup", { name, email, password });
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex w-full max-w-5xl bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10 z-10 m-4 flex-row-reverse">
        
        {/* Right Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center w-1/2 p-16 bg-gradient-to-br from-purple-900/50 to-slate-900/50 border-l border-white/5 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30">
              <User className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Join the <br />
              <span className="text-purple-400">Community</span><br />
              Today
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
              Create an account in seconds to report lost properties or help someone find what belongs to them.
            </p>
          </div>
        </div>

        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400">Register to start reporting items</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Full Name</label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent block p-4 pl-12 transition duration-300 outline-none"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Email Address</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent block p-4 pl-12 transition duration-300 outline-none"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-3.5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent block p-4 pl-12 transition duration-300 outline-none"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                />
                <button
                  type="button"
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-300 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm font-medium flex items-center justify-center animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:bg-purple-400 hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-10 text-sm">
            Already have an account?{" "}
            <button
              className="text-white font-semibold hover:text-purple-400 transition ml-1"
              onClick={() => navigate("/")}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;