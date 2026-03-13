import { useState } from "react";
import axios from "axios";
import { Mail, Lock, KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password", { email });
      setMessage(res.data.message || "OTP sent to your email!");
      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/reset-password", { email, otp, password });
      setMessage(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to reset password.");
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

      <div className="flex w-full max-w-5xl bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10 z-10 m-4">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center w-1/2 p-16 bg-gradient-to-br from-indigo-900/50 to-slate-900/50 border-r border-white/5 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Secure Account <br />
              <span className="text-indigo-400">Recovery</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
              We'll help you get back into your account. Follow the instructions sent to your email to verify your identity.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </h2>
            <p className="text-slate-400">
              {step === 1 ? "Enter your email to receive an OTP" : "Enter your OTP and new password"}
            </p>
          </div>

          <form className="space-y-6" autoComplete="off">
            {/* Step 1: Email */}
            {step === 1 && (
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent block p-4 pl-12 transition duration-300 outline-none"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  />
                </div>
              </div>
            )}

            {/* Step 2: OTP & New Password */}
            {step === 2 && (
              <>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">One-Time Password (OTP)</label>
                  <div className="relative">
                    <KeyRound size={20} className="absolute left-4 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      autoComplete="one-time-code"
                      placeholder="6-digit OTP"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent block p-4 pl-12 transition duration-300 outline-none tracking-widest"
                      value={otp}
                      onChange={(e) => { setOtp(e.target.value); setError(""); }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">New Password</label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-4 top-3.5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent block p-4 pl-12 transition duration-300 outline-none"
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
              </>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm font-medium flex items-center justify-center animate-pulse">
                {error}
              </div>
            )}
            
            {message && !error && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-xl text-emerald-200 text-sm font-medium flex items-center justify-center animate-pulse">
                {message}
              </div>
            )}

            <button
              onClick={step === 1 ? sendOTP : resetPassword}
              disabled={loading}
              className="w-full bg-indigo-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : step === 1 ? (
                "Send OTP"
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-10 text-sm">
            Remember your password?{" "}
            <button
              type="button"
              className="text-white font-semibold hover:text-indigo-400 transition ml-1"
              onClick={() => navigate("/")}
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;