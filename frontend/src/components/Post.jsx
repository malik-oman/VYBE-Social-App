import React, { useState } from 'react'
import dp from './../assets/download.jfif'
import VideoPlayer from './VideoPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegHeart } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { MdModeComment } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import { serverUrl } from '../App';
import { setpostData } from '../redux/postSlice';
import { setUserData } from '../redux/userSlice';
import FollowButton from './FollowButton';

const Post = ({ post }) => {

  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  const { postData } = useSelector(state => state.post)


  const [showComment, setShowComment] = useState(false)
  const [message,setMessage] = useState('')

  const handleSaved = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/post/saved/${post._id}`, { withCredentials: true })
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
     try {
      const result = await axios.get(`${serverUrl}/api/post/like/${post._id}`, { withCredentials: true })
      const updatedPost = result.data

       const updatedPosts = postData.map(p=>p._id==post._id?updatedPost:p)
       dispatch(setpostData(updatedPosts)) 
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/post/comment/${post._id}`,{message},{withCredentials:true})
      const updatedPost = result.data

      const updatedPosts = postData.map(p=>p._id==post._id?updatedPost:p)
      dispatch(setpostData(updatedPosts))
    } catch (error) {
      
    }
  }


  return (
    <div className='w-[90%] min-h-[450px] flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl'>

      <div className='w-full h-[80px] flex justify-between items-center px-[10px]'>

        <div className='flex justify-center items-center md:gap-[20px] gap-[10px]'>

          <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0'>
            <img
              src={post.author.profileImage || dp}
              alt=""
              className='w-full h-full object-cover object-center'
            />
          </div>

          <div className='w-[200px] font-semibold truncate'>{post.author.userName}</div>

        </div>

        {userData._id!=post.author._id &&    <FollowButton tailwind={'px-[10px] w-[80px] md:w-[100px] py-[5px] h-[30px] md:h-[40px] bg-black text-white rounded-2xl text-[14px] md:text-[16px]'} targetUserId={post.author._id}/>}
      
     

      </div>

      <div className="w-full flex items-center justify-center py-4">

        {post.mediaType === "image" && (
          <div className="w-[95%] sm:w-[90%] max-w-[600px]">
            <img
              src={post.media}
              alt="Post media"
              className="w-full h-[300px] object-cover rounded-2xl"
            />
          </div>
        )}

        {post.mediaType === "video" && (
          <div className="w-[95%] sm:w-[85%] max-w-[550px]">
            <VideoPlayer media={post.media} />
          </div>
        )}

      </div>

      {/* LIKE + COMMENT */}
      <div className='w-full h-[60px] flex justify-between items-center px-[20px] mt-[10px]'>

        <div className='flex gap-[10px]'>

          <div className='flex gap-[5px]'>
            {!post.likes.includes(userData._id)
              ? <FaRegHeart onClick={handleLike} className='w-[25px] h-[25px] cursor-pointer' />
              : <IoMdHeart onClick={handleLike} className='w-[25px] h-[25px] text-red-600 cursor-pointer' />
            }
            <span>{post.likes.length}</span>
          </div>

          <div onClick={()=>setShowComment(!showComment)} className='flex gap-[5px]'>
            <MdModeComment className='w-[25px] h-[25px] cursor-pointer' />
            <span>{post.comments.length}</span>
          </div>

        </div>

        {/* SAVE */}
     <div onClick={handleSaved}>
  {!userData.saved.includes(post?._id) && 
    <FaBookmark  className='w-[25px] h-[25px] cursor-pointer'
   />}
  {userData?.saved?.includes(post?._id) && 
    <CiBookmark className='w-[25px] h-[25px] cursor-pointer' />  
   }
   
      
  
</div>

      </div>

      {/* CAPTION */}
      {post.caption && (
        <div className='w-full px-[20px] flex gap-[10px]'>
          <h1>{post.author.userName}</h1>
          <div>{post.caption}</div>
        </div>
      )}

      {/* COMMENT INPUT */}
      {showComment && (
        <div className='w-full pb-[20px]'>
          <div className='w-full h-[80px] flex items-center px-[20px] relative'>

            <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full overflow-hidden'>
              <img
                src={userData.profileImage || dp}
                alt=""
                className='w-full h-full object-cover'
              />
            </div>

            <input
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
              type="text"
              className='px-[10px] border-b-2 border-b-gray-500 w-full outline-none h-[40px]'
              placeholder='Write Comment'
            />

            <button onClick={handleComment} className='absolute right-[20px]'>
              <IoMdSend className='w-[25px] h-[25px]' />
            </button>
            </div>

            <div className='w-full max-h-[300px] overflow-auto'>
              {post.comments?.map((com,index)=>(
                <div key={index} className='w-full px-[20px] py-[20px] flex items-center gap-[20px] border-b-2 border-b-gray-200' >
                 <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full overflow-hidden'>
              <img
                src={com.author.profileImage || dp}
                alt=""
                className='w-full h-full object-cover'
              />
            </div>
            <div>{com.message}</div>
              </div>
              ))}
              
            </div>
        </div>
      )}

    </div>
  )
}

export default Post