import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { serverUrl } from '../App';
import { IoArrowBack } from 'react-icons/io5';

const ForgotPassword = () => {

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [err, setErr] = useState('')

  const [inpuClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmNewPassword: false
  });

  const handleStep1 = async () => {
    setLoading(true)
    setErr('')
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendOtp`, { email },
        { withCredentials: true })
      console.log(result.data)
      setStep(2)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error.response?.data?.message)
    }
  }

  const handleStep2 = async () => {
    setLoading(true)
    setErr('')
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyOtp`, { email, otp },
        { withCredentials: true })
      console.log(result.data)
      setStep(3)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error.response?.data?.message)
    }
  }

  const handleStep3 = async () => {
    if (newPassword !== confirmNewPassword) {
      return setErr("Password Do not match")
    }
    setErr('')
    setLoading(true)
    try {

      const result = await axios.post(`${serverUrl}/api/auth/resetPassword`,
        { email, password: newPassword },
        { withCredentials: true }
      )
      console.log(result.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error.response?.data?.message)
    }
  }

  const stepTitles = {
    1: "Forgot Password",
    2: "Verify OTP",
    3: "Reset Password"
  }

  const stepSubtitles = {
    1: "Enter your email to receive a verification code",
    2: "Enter the OTP sent to your email",
    3: "Create a new password for your account"
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800 flex flex-col justify-center items-center p-4'>

      {/* STEP 1============================================= */}
      {step == 1 && <div className='w-full max-w-[480px] min-h-[520px] bg-white/95 backdrop-blur-sm rounded-3xl flex justify-center items-center flex-col p-8 shadow-2xl shadow-black/40 border border-white/10'>
        <div className='flex flex-col items-center gap-2'>
          <h2 className='text-[26px] font-bold text-gray-800 tracking-tight'>{stepTitles[1]}</h2>
          <p className='text-gray-400 text-sm font-medium text-center max-w-[320px]'>{stepSubtitles[1]}</p>
        </div>

        {/* Step Indicator */}
        <div className='flex items-center gap-2 mt-6'>
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-8 h-1.5 rounded-full transition-all duration-300 ${s === 1 ? 'bg-black w-10' : 'bg-gray-200'}`} />
          ))}
        </div>

        <div
          className="relative flex items-center mt-8 justify-start w-full h-[52px] rounded-xl border border-gray-200 bg-gray-50/50 transition-all duration-300 hover:border-gray-400 focus-within:border-black focus-within:bg-white focus-within:shadow-lg focus-within:shadow-black/5"
          onClick={() => setInputClicked({ ...inpuClicked, email: true })}
        >
          <label
            htmlFor="email"
            className={`text-gray-500 absolute left-4 px-1 bg-transparent text-[13px] font-medium transition-all duration-300 pointer-events-none ${inpuClicked.email || email ? "-top-2.5 text-xs text-black bg-white" : "top-1/2 -translate-y-1/2"} `}
          >
            Enter Your Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full h-full rounded-xl px-5 bg-transparent outline-none border-0 text-gray-800 text-[15px] font-medium placeholder-transparent"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onFocus={() => setInputClicked({ ...inpuClicked, email: true })}
            onBlur={() => !email && setInputClicked({ ...inpuClicked, email: false })}
          />
        </div>

        {err && (
          <div className="w-full bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mt-4">
            <p className="text-red-600 text-sm font-medium">{err}</p>
          </div>
        )}

        <button
          onClick={handleStep1}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-semibold h-[52px] cursor-pointer rounded-xl mt-6 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-wide"
        >
          {loading ? <ClipLoader size={24} color="white" /> : "Send OTP"}
        </button>

      </div>
      }

      {/* STEP 2========================================= */}

      {step == 2 && <div className='w-full max-w-[480px] min-h-[520px] bg-white/95 backdrop-blur-sm rounded-3xl flex justify-center items-center flex-col p-8 shadow-2xl shadow-black/40 border border-white/10'>
        <div className='flex flex-col items-center gap-2'>
          <h2 className='text-[26px] font-bold text-gray-800 tracking-tight'>{stepTitles[2]}</h2>
          <p className='text-gray-400 text-sm font-medium text-center max-w-[320px]'>{stepSubtitles[2]}</p>
        </div>

        {/* Step Indicator */}
        <div className='flex items-center gap-2 mt-6'>
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-8 h-1.5 rounded-full transition-all duration-300 ${s === 2 ? 'bg-black w-10' : s < 2 ? 'bg-gray-800' : 'bg-gray-200'}`} />
          ))}
        </div>

        <div
          className="relative flex items-center mt-8 justify-start w-full h-[52px] rounded-xl border border-gray-200 bg-gray-50/50 transition-all duration-300 hover:border-gray-400 focus-within:border-black focus-within:bg-white focus-within:shadow-lg focus-within:shadow-black/5"
          onClick={() => setInputClicked({ ...inpuClicked, otp: true })}
        >
          <label
            htmlFor="otp"
            className={`text-gray-500 absolute left-4 px-1 bg-transparent text-[13px] font-medium transition-all duration-300 pointer-events-none ${inpuClicked.otp || otp ? "-top-2.5 text-xs text-black bg-white" : "top-1/2 -translate-y-1/2"} `}
          >
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            className="w-full h-full rounded-xl px-5 bg-transparent outline-none border-0 text-gray-800 text-[15px] font-medium placeholder-transparent text-center tracking-[8px] font-bold"
            required
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            maxLength={6}
            onFocus={() => setInputClicked({ ...inpuClicked, otp: true })}
            onBlur={() => !otp && setInputClicked({ ...inpuClicked, otp: false })}
          />
        </div>

        {err && (
          <div className="w-full bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mt-4">
            <p className="text-red-600 text-sm font-medium">{err}</p>
          </div>
        )}

        <button
          onClick={handleStep2}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-semibold h-[52px] cursor-pointer rounded-xl mt-6 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-wide"
        >
          {loading ? <ClipLoader size={24} color="white" /> : "Verify OTP"}
        </button>

        <button
          onClick={() => setStep(1)}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200"
        >
          <IoArrowBack className="w-4 h-4" />
          Back to Email
        </button>

      </div>}

      {/* STEP 3===================================== */}

      {step == 3 && <div className='w-full max-w-[480px] min-h-[520px] bg-white/95 backdrop-blur-sm rounded-3xl flex justify-center items-center flex-col p-8 shadow-2xl shadow-black/40 border border-white/10'>
        <div className='flex flex-col items-center gap-2'>
          <h2 className='text-[26px] font-bold text-gray-800 tracking-tight'>{stepTitles[3]}</h2>
          <p className='text-gray-400 text-sm font-medium text-center max-w-[320px]'>{stepSubtitles[3]}</p>
        </div>

        {/* Step Indicator */}
        <div className='flex items-center gap-2 mt-6'>
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-8 h-1.5 rounded-full transition-all duration-300 ${s === 3 ? 'bg-black w-10' : s < 3 ? 'bg-gray-800' : 'bg-gray-200'}`} />
          ))}
        </div>

        <div
          className="relative flex items-center mt-8 justify-start w-full h-[52px] rounded-xl border border-gray-200 bg-gray-50/50 transition-all duration-300 hover:border-gray-400 focus-within:border-black focus-within:bg-white focus-within:shadow-lg focus-within:shadow-black/5"
          onClick={() => setInputClicked({ ...inpuClicked, newPassword: true })}
        >
          <label
            htmlFor="newPassword"
            className={`text-gray-500 absolute left-4 px-1 bg-transparent text-[13px] font-medium transition-all duration-300 pointer-events-none ${inpuClicked.newPassword || newPassword ? "-top-2.5 text-xs text-black bg-white" : "top-1/2 -translate-y-1/2"} `}
          >
            Enter New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full h-full rounded-xl px-5 bg-transparent outline-none border-0 text-gray-800 text-[15px] font-medium placeholder-transparent"
            required
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            onFocus={() => setInputClicked({ ...inpuClicked, newPassword: true })}
            onBlur={() => !newPassword && setInputClicked({ ...inpuClicked, newPassword: false })}
          />
        </div>

        <div
          className="relative flex items-center mt-5 justify-start w-full h-[52px] rounded-xl border border-gray-200 bg-gray-50/50 transition-all duration-300 hover:border-gray-400 focus-within:border-black focus-within:bg-white focus-within:shadow-lg focus-within:shadow-black/5"
          onClick={() => setInputClicked({ ...inpuClicked, confirmNewPassword: true })}
        >
          <label
            htmlFor="confirmNewPassword"
            className={`text-gray-500 absolute left-4 px-1 bg-transparent text-[13px] font-medium transition-all duration-300 pointer-events-none ${inpuClicked.confirmNewPassword || confirmNewPassword ? "-top-2.5 text-xs text-black bg-white" : "top-1/2 -translate-y-1/2"} `}
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            className="w-full h-full rounded-xl px-5 bg-transparent outline-none border-0 text-gray-800 text-[15px] font-medium placeholder-transparent"
            required
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            value={confirmNewPassword}
            onFocus={() => setInputClicked({ ...inpuClicked, confirmNewPassword: true })}
            onBlur={() => !confirmNewPassword && setInputClicked({ ...inpuClicked, confirmNewPassword: false })}
          />
        </div>

        {err && (
          <div className="w-full bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mt-4">
            <p className="text-red-600 text-sm font-medium">{err}</p>
          </div>
        )}

        <button
          onClick={handleStep3}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-semibold h-[52px] cursor-pointer rounded-xl mt-6 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-wide"
        >
          {loading ? <ClipLoader size={24} color="white" /> : "Reset Password"}
        </button>

        <button
          onClick={() => setStep(2)}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200"
        >
          <IoArrowBack className="w-4 h-4" />
          Back to OTP
        </button>

      </div>}

    </div>
  )
}

export default ForgotPassword