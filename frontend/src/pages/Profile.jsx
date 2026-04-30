import axios from 'axios'
import React from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { useEffect } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from './../assets/download.jfif'
import Naav from '../components/Naav'

const Profile = () => {

  const navigate = useNavigate()

  const {userName} = useParams()
  const dispatch = useDispatch()
  const {profileData,userData} = useSelector(state=>state.user)

const handleProfile = async () => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/getProfile/${userName}`,{withCredentials:true})
    dispatch(setProfileData(result.data))
  } catch (error) {
    console.log(error)  
  }
}  

 const handleLogout = async () => {
  try {
    const result = await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
    dispatch(setUserData(null))
  } catch (error) {
      console.log(error)
  }
 }

useEffect(()=>{
  handleProfile()
},[userName,dispatch])

  return (
    <div className='w-full min-h-screen bg-black'>

      {/* USERNAME AND LOGOUT ================= BACK ICON */}
      <div className='w-full h-[80px] flex justify-between items-center px-[30px] text-white'>
        <div onClick={()=>navigate('/')}><IoMdArrowRoundBack className='text-white w-[25px] h-[25px]'/></div>
        <div className='font-semibold text-[20px]'>{profileData.userName}</div>
        <div onClick={handleLogout} className='font-semibold cursor-pointer text-[20px] text-blue-500'>Log Out</div>
      </div>

      {/* PROFILE IMAGE ============================= */}
      <div className='w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center'>
         <div className='w-[80px] h-[80px] md:w-[140px] h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0'>
                    <img 
                      src={profileData?.profileImage || dp} 
                      alt="" 
                      className='w-full h-full object-cover object-center' 
                    />
                  </div>

                  {/* NAME===========================BIO DATA=========== */}
                  <div>
                    <div className='font-semibold text-[22px] text-white '>{profileData?.name}</div>
                    <div className='text-[17px] text-[#ffffffe8]'>{profileData?.profession || "New User"}</div>
                    <div className='text-[17px] text-[#ffffffe8]'>{profileData?.bio}</div>

                  </div>
                  </div>

                    {/* FOLLOWERS SECTION \\ POST DATA */}
                  <div className='w-full h-[100px]  flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white'>
                    <div>
                      <div className='text-white text-[22px] md:text-[30px] font-semibold'>{profileData?.posts?.length}</div>
                      <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Posts</div>
                    </div>

                      {/* FOLOOWERS======================= */}
                    <div>
                      <div className='flex items-center justify-center gap-[20px]'>
                        <div className='flex relative'>
                         
                     <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0'>
                    <img 
                      src={profileData?.profileImage || dp} 
                      alt="" 
                      className='w-full h-full object-cover object-center' 
                    />
                  </div>
                    <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0 absolute left-[16px]'>
                    <img 
                      src={profileData?.profileImage || dp} 
                      alt="" 
                      className='w-full h-full object-cover object-center' 
                    />
                  </div>
                    <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0 absolute left-[26px]'>
                    <img 
                      src={profileData?.profileImage || dp} 
                      alt="" 
                      className='w-full h-full object-cover object-center' 
                    />
                  </div>
                    
                        </div>
                        <div className='text-white text-[22px] md:text-[30px] font-semibold ml-3.5'>
                        {profileData?.followers?.length}
                        </div>
                      </div>


                      <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Followers</div>
                    </div>

                    {/* FOLLOWING=============================== */}

                    <div>
                      <div className='flex items-center justify-center gap-[20px]'>
                         <div className='flex relative'>
                         
                     <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0'>
                    <img 
                      src={profileData?.profileImage || dp} 
                      alt="" 
                      className='w-full h-full object-cover object-center' 
                    />
                  </div>
                    <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0 absolute left-[16px]'>
                    <img 
                      src={profileData?.profileImage || dp} 
                      alt="" 
                      className='w-full h-full object-cover object-center' 
                    />
                  </div>
                    <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0 absolute left-[26px]'>
                    <img 
                      src={profileData?.profileImage || dp} 
                      alt="" 
                      className='w-full h-full object-cover object-center' 
                    />
                  </div>
                    
                        </div>
                         <div className='text-white text-[22px] md:text-[30px] font-semibold ml-3.5'>
                        {profileData?.following?.length}
                        </div>
                        </div>
                      <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>Following</div>
                    </div>

                  </div>

                  {/* EDIT PROFILE AND BUTTONS SECTION=====================  */}

                  <div className='w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]'>
                  {profileData?._id==userData._id && 
                  <button onClick={()=>navigate('/editprofile')} className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl'>Edit Profile</button>
                  }

                  {profileData?._id != userData._id
                  &&
                  <>
                  <button  className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl'>Follow</button>
                  <button  className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl'>Message</button>
                  </>
                  }
                  </div>

                  {/* POST============================ */}
                  <div className='w-full min-h-[100vh] flex justify-center'> 
                    <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]'>
                      <Naav/>
                    </div>
                  </div>
       
    </div>
  )
}

export default Profile