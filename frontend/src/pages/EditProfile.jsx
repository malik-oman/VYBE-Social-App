import React, { useRef, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from './../assets/download.jfif'

const EditProfile = () => {

  const {userData} = useSelector(state=>state.user)
  const [frontendImage, setFrontendImage] = useState(userData?.profileImage || dp)
  const [backendImage, setBackendImage] = useState(null)

  const [name,setName] = useState(userData?.name || "")
  const [userName,setUserName] = useState(userData?.userName || "")
  const [bio,setBio] = useState(userData?.bio || "")
  const [profession,setProfession] = useState(userData?.profession || "")
  const [gender,setGender] = useState(userData?.gender || "")

  const imageInput = useRef()
  const navigate = useNavigate()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFrontendImage(URL.createObjectURL(file))  // ✅ preview update
    setBackendImage(file)                         // ✅ actual file for upload
  }

  return (
    <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] pt-[20px]'>  {/* ✅ space fix */}
        <div className='w-full h-[80px] left-[20px] flex items-center gap-[20px] px-[20px]'>
          <IoMdArrowRoundBack 
            onClick={()=>navigate(`/profile/${userData.userName}`)}
            className='text-white w-[25px] h-[25px]'
          />
          <h1 className='text-white text-[20px] font-semibold'>Edit Profile</h1>
        </div>

      {/* PROFILE IMAGE */}
      <div 
        className='w-[90px] h-[90px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0' 
        onClick={()=>imageInput.current.click()}
      >
        <input type="file" accept='image/*' ref={imageInput} hidden onChange={handleImage} />
        <img 
          src={frontendImage} 
          alt="" 
          className='w-full h-full object-cover object-center' 
        />
      </div>

        {/* EDIT PROFILE INPUT FIELDS */}
      <div  onClick={()=>imageInput.current.click()} className='text-blue-500 text-center text-[18px] font-semibold mb-4 cursor-pointer'>
        Change Your Profile Picture
      </div>

      <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold mb-4' placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)} value={name} />

      <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold mb-4' placeholder='Enter User Name' onChange={(e)=>setUserName(e.target.value)} value={userName} />

      <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold mb-4' placeholder='Bio' onChange={(e)=>setBio(e.target.value)} value={bio} />

      <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold mb-4' placeholder='Profession' onChange={(e)=>setProfession(e.target.value)} value={profession} />

      <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold' placeholder='Gender' onChange={(e)=>setGender(e.target.value)} value={gender} />


      <button className='px-[10px] mt-7 w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white cursor-pointer rounded-2xl'>Save Profile</button>
    </div>
  )
}

export default EditProfile