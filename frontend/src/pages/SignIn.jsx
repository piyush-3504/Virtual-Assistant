import React, { useContext, useState } from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios"

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setUserData(null);
      setLoading(false);
      setErr(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[#0a0a0a] relative overflow-hidden">

      {/* Background cyber grid effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-20"></div>
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent animate-pulse"></div>
      </div>

      {/* Animated neon lines */}
      <div className="absolute w-[200%] h-[200%] bg-[repeating-linear-gradient(90deg,transparent,transparent_49px,rgba(0,255,255,0.15)_50px)] animate-[moveX_15s_linear_infinite]"></div>
      <div className="absolute w-[200%] h-[200%] bg-[repeating-linear-gradient(0deg,transparent,transparent_49px,rgba(192,132,252,0.15)_50px)] animate-[moveY_20s_linear_infinite]"></div>

      {/* SignIn Form */}
      <form
        className="w-[90%] max-w-[480px] bg-[#121212cc] border border-cyan-400/40 backdrop-blur-lg 
                   shadow-[0_0_25px_rgba(0,255,255,0.3)] 
                   rounded-2xl p-8 flex flex-col items-center gap-6 z-10"
        onSubmit={handleSignIn}
      >
        <h1 className="text-cyan-400 text-3xl font-bold tracking-wide text-center mb-6">
          Sign In to <span className="glitch text-purple-400" data-text="Virtual Assistant">Virtual Assistant</span>
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full h-[55px] px-5 rounded-xl bg-transparent text-white 
                     border-2 border-gray-600 placeholder-gray-400 outline-none 
                     focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,255,255,0.5)] 
                     transition-all duration-300"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        {/* Password */}
        <div className="w-full h-[55px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full px-5 pr-12 rounded-xl bg-transparent text-white 
                       border-2 border-gray-600 placeholder-gray-400 outline-none 
                       focus:border-purple-400 focus:shadow-[0_0_12px_rgba(192,132,252,0.5)] 
                       transition-all duration-300"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword ? (
            <IoEye
              className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 text-gray-300 hover:text-cyan-400 cursor-pointer transition"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <IoEyeOff
              className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 text-gray-300 hover:text-purple-400 cursor-pointer transition"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {/* Error */}
        {err.length > 0 && (
          <p className="text-red-500 text-sm font-medium">*{err}</p>
        )}

        {/* Button */}
        <button
          className="w-full h-[55px] mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 
                     text-black font-bold rounded-xl text-lg tracking-wide 
                     hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:scale-[1.02] 
                     transition-all duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        {/* Link */}
        <p className="text-gray-300 text-base mt-4 cursor-pointer">
          Want to create a new account?{" "}
          <span
            className="text-cyan-400 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>

      {/* Custom keyframes & glitch effect */}
      <style>{`
        @keyframes moveX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes moveY {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        .glitch {
          position: relative;
          display: inline-block;
          animation: glitchAnim 1.5s infinite;
        }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
        }
        .glitch::before {
          animation: glitchTop 2s infinite linear alternate-reverse;
          color: #0ff;
        }
        .glitch::after {
          animation: glitchBottom 1.5s infinite linear alternate-reverse;
          color: #f0f;
        }

        @keyframes glitchAnim {
          0% { transform: none; }
          20% { transform: skew(1deg); }
          40% { transform: skew(-1deg); }
          60% { transform: skew(1deg); }
          80% { transform: skew(-1deg); }
          100% { transform: none; }
        }

        @keyframes glitchTop {
          0% { clip: rect(0, 9999px, 0, 0); }
          20% { clip: rect(0, 9999px, 50%, 0); transform: translate(-2px, -2px); }
          40% { clip: rect(0, 9999px, 20%, 0); transform: translate(2px, 2px); }
          60% { clip: rect(0, 9999px, 70%, 0); transform: translate(-2px, 0); }
          80% { clip: rect(0, 9999px, 40%, 0); transform: translate(2px, -1px); }
          100% { clip: rect(0, 9999px, 0, 0); }
        }

        @keyframes glitchBottom {
          0% { clip: rect(0, 9999px, 0, 0); }
          20% { clip: rect(50%, 9999px, 100%, 0); transform: translate(2px, 2px); }
          40% { clip: rect(20%, 9999px, 100%, 0); transform: translate(-2px, -2px); }
          60% { clip: rect(70%, 9999px, 100%, 0); transform: translate(2px, 0); }
          80% { clip: rect(40%, 9999px, 100%, 0); transform: translate(-2px, 1px); }
          100% { clip: rect(0, 9999px, 0, 0); }
        }
      `}</style>
    </div>
  );
}

export default SignIn;
