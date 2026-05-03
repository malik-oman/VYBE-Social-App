import React from 'react'
import { FaHome, FaPlus, FaSearch, FaVideo } from 'react-icons/fa'
import dp from './../assets/download.jfif'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Naav = () => {

  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user)

  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>

      <div onClick={()=>navigate('/')} className='text-white w-[25px] h-[25px] cursor-pointer'><FaHome/></div>
      <div onClick={()=>navigate('/upload')} className='text-white w-[25px] h-[25px] cursor-pointer'><FaPlus/></div>
      <div className='text-white w-[25px] h-[25px] cursor-pointer'><FaSearch/></div>
      <div className='text-white w-[28px] h-[28px] cursor-pointer'><FaVideo/></div>
         <div onClick={()=>navigate(`/profile/${userData.userName}`)} className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                  <img 
                    src={userData.profileImage || dp} 
                    alt="" 
                    className='w-full h-full object-cover object-center' 
                  />
                </div>
    </div>
  )
}

export default Naav