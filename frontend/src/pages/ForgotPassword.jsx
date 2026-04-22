import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';

const ForgotPassword = () => {

  const [loading, setLoading] = useState(false);
 const [step,setStep] = useState(3)
 const [email,setEmail] = useState("")
 const [otp,setOtp] = useState("")
 const [newPassword,setNewPassword] = useState("")
 const [confirmNewPassword, setConfirmNewPassword] = useState("")

   const [inpuClicked, setInputClicked] = useState({
     
     email: false,
     otp:false,
     newPassword:false,
     confirmNewPassword:false
   });

  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>

      {/* STEP 1============================================= */}
      {step==1 &&   <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>

           <div
            className="relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inpuClicked, email: true })}
            
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inpuClicked.email ? "top-[-15px]" : ""} `}
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

            <button
           
            disabled={loading}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "  Send OTP"}
          </button>

      </div>
      }

      {/* STEP 2========================================= */}

      {step==2 &&  <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>

           <div
            className="relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inpuClicked, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inpuClicked.otp ? "top-[-15px]" : ""} `}
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </div>

            <button
           
            disabled={loading}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit"}
          </button>

      </div> }

      {/* STEP 3===================================== */}

      {step==3 &&  <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Reset Password</h2>

           <div
            className="relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inpuClicked, newPassword: true })}
          >
            <label
              htmlFor="newPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inpuClicked.newPassword ? "top-[-15px]" : ""} `}
            >
              Enter New Password
            </label>
            <input
              type="text"
              id="newPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>

            <div
            className="relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inpuClicked, confirmNewPassword: true })}
          >
            <label
              htmlFor="confirmNewPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inpuClicked.confirmNewPassword ? "top-[-15px]" : ""} `}
            >
              Confirm New Password
            </label>
            <input
              type="text"
              id="confirmNewPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={setConfirmNewPassword}
            />
          </div>

            <button
           
            disabled={loading}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Reset Password"}
          </button>

      </div> }
    
    </div>
  )
}

export default ForgotPassword