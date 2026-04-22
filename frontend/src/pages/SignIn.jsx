import React, { useState } from "react";
import logo from "../assets/logoblack.png";
import logo1 from "../assets/logowhite.png";
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [inpuClicked, setInputClicked] = useState({
    userName: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    setErr('');
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { userName, password },
        { withCredentials: true },
      );
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[1100px] min-h-[620px] bg-white/95 backdrop-blur-sm rounded-3xl flex justify-center items-center overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
        {/* INPUT FIELD================================================== */}

        <div className="w-full lg:w-[50%] min-h-[620px] bg-white flex flex-col items-center justify-center p-6 gap-5">
          <div className="flex gap-2 items-center text-[22px] font-bold mt-4 tracking-tight">
            <span className="text-gray-800">Sign In to</span>
            <img src={logo} alt="VYBE" className="w-[75px] object-contain" />
          </div>

          <p className="text-gray-400 text-sm font-medium -mt-2">Welcome back! Please enter your details</p>

          {/* USERNAME FIELD================================= */}
          <div
            className="relative flex items-center justify-start w-[92%] h-[52px] rounded-xl mt-4 border border-gray-200 bg-gray-50/50 transition-all duration-300 hover:border-gray-400 focus-within:border-black focus-within:bg-white focus-within:shadow-lg focus-within:shadow-black/5"
            onClick={() => setInputClicked({ ...inpuClicked, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`text-gray-500 absolute left-4 px-1 bg-transparent text-[13px] font-medium transition-all duration-300 pointer-events-none ${inpuClicked.userName || userName ? "-top-2.5 text-xs text-black bg-white" : "top-1/2 -translate-y-1/2"} `}
            >
              Enter Your User Name
            </label>
            <input
              type="text"
              id="userName"
              className="w-full h-full rounded-xl px-5 bg-transparent outline-none border-0 text-gray-800 text-[15px] font-medium placeholder-transparent"
              required
              onChange={(e) => setUserName(e.target.value)}
              onFocus={() => setInputClicked({ ...inpuClicked, userName: true })}
              onBlur={() => !userName && setInputClicked({ ...inpuClicked, userName: false })}
            />
          </div>

          {/* PASSWORD FIELD======================================= */}
          <div
            className="relative flex items-center justify-start w-[92%] h-[52px] rounded-xl border border-gray-200 bg-gray-50/50 transition-all duration-300 hover:border-gray-400 focus-within:border-black focus-within:bg-white focus-within:shadow-lg focus-within:shadow-black/5"
            onClick={() => setInputClicked({ ...inpuClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-gray-500 absolute left-4 px-1 bg-transparent text-[13px] font-medium transition-all duration-300 pointer-events-none ${inpuClicked.password || password ? "-top-2.5 text-xs text-black bg-white" : "top-1/2 -translate-y-1/2"}`}
            >
              Enter Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full h-full rounded-xl px-5 pr-14 bg-transparent outline-none border-0 text-gray-800 text-[15px] font-medium placeholder-transparent"
              required
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setInputClicked({ ...inpuClicked, password: true })}
              onBlur={() => !password && setInputClicked({ ...inpuClicked, password: false })}
            />

            {showPassword ? (
              <IoEye
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(false);
                }}
                className="absolute cursor-pointer right-5 w-5 h-5 text-gray-400 hover:text-gray-700 transition-colors duration-200"
              />
            ) : (
              <FaEyeSlash
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(true);
                }}
                className="absolute cursor-pointer right-5 w-5 h-5 text-gray-400 hover:text-gray-700 transition-colors duration-200"
              />
            )}
          </div>

          {/* FORGOT PASSWORD================================ */}
          <div 
            onClick={() => navigate('/forgot-password')} 
            className="w-[92%] flex justify-end px-1"
          >
            <span className="text-sm font-medium text-gray-500 hover:text-black cursor-pointer transition-colors duration-200">
              Forgot Password?
            </span>
          </div>

          {err && (
            <div className="w-[92%] bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
              <p className="text-red-600 text-sm font-medium">{err}</p>
            </div>
          )}

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-[85%] px-6 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-semibold h-[52px] cursor-pointer rounded-xl shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-wide"
          >
            {loading ? <ClipLoader size={24} color="white" /> : "Sign In"}
          </button>

          <div className="w-[85%] flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <p
            onClick={() => navigate("/signup")}
            className="cursor-pointer text-gray-500 text-sm font-medium hover:text-gray-800 transition-colors duration-200 pb-2"
          >
            Want To Create A New Account?{" "}
            <span className="text-black font-semibold border-b-2 border-black pb-0.5 hover:text-gray-700 hover:border-gray-700 transition-colors duration-200">
              Sign Up
            </span>
          </p>
        </div>

        {/* LOGO=========================================================== */}
        <div className="w-[50%] min-h-[620px] hidden lg:flex justify-center items-center bg-gradient-to-br from-gray-950 via-black to-gray-900 flex-col gap-4 text-white rounded-l-[40px] shadow-2xl relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-4">
            <img src={logo1} alt="VYBE" className="w-[45%] object-contain drop-shadow-2xl" />
            <p className="text-[18px] font-semibold tracking-wide text-gray-300">Not Just a Platform, It's A VYBE</p>
            <div className="w-16 h-1 bg-white/20 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;