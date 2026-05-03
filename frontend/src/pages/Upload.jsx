import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setpostData } from '../redux/postSlice'
import { setSotryData } from '../redux/storySlice'
import { setLoopData } from '../redux/loopSlice'
import { ClipLoader } from 'react-spinners'

const Upload = () => {

const [uploadType,setUploadType] = useState("post")

const [frontendMedia, setFrontendMedia] = useState("")
const [backendMedia, setBackendMedia] = useState("")
const mediaInput = useRef()

const dispatch = useDispatch()
const {postData} = useSelector(state=>state.post)
const {storyData} = useSelector(state=>state.story)
const {loopData} = useSelector(state=>state.loop)

const [loading,setLoading] = useState(false)

const [mediaType,setMediaType] = useState("")
const [caption,setCaption] = useState("")


const handleMedia = (e) => {
  const file = e.target.files[0]
  if (file.type.includes("image")) {
    setMediaType("image")
  }else{
    setMediaType("video")
  }
 
  setBackendMedia(file)
  setFrontendMedia(URL.createObjectURL(file))
}

 const uploadPost = async () => {

  try {
    const formData = new FormData()
    formData.append("caption", caption)
    formData.append("mediaType",mediaType)
    formData.append("media",backendMedia)

    const result = await axios.post(`${serverUrl}/api/post/upload`,formData,{withCredentials:true})
    dispatch(setpostData([...postData, result.data]))
   setLoading(false)
    navigate('/')
  } catch (error) {
    console.log(error)
  }
 }

  const uploadStory = async () => {
  try {
    const formData = new FormData()

    formData.append("mediaType",mediaType)
      formData.append("media", backendMedia)

    const result = await axios.post(`${serverUrl}/api/story/upload`,formData,{withCredentials:true})
      dispatch(setSotryData([...storyData, result.data]))
         setLoading(false)
    navigate('/')
  } catch (error) {
    console.log(error)
  }
 }

  const uploadLoop = async () => {
  try {
    const formData = new FormData()
    formData.append("caption", caption)

    formData.append("media",backendMedia)

    const result = await axios.post(`${serverUrl}/api/loop/upload`,formData,{withCredentials:true})
      dispatch(setLoopData([...loopData, result.data]))
         setLoading(false)
    navigate('/')
  } catch (error) {
    console.log(error)
  }
 }

 const handleUpload = () => {
  setLoading(true)
  if (uploadType=="post") {
    uploadPost()
    
  }else if (uploadType=="story") {
    uploadStory()
  }else{
    uploadLoop()
  }
 }

  const navigate = useNavigate()
  return (
    <div className='w-full h-[100vh] bg-black flex flex-col items-center'>
          <div className='w-full h-[80px] left-[20px] flex items-center gap-[20px] px-[20px]'>
                  <IoMdArrowRoundBack
                    onClick={()=>navigate('/')}
                    className='text-white w-[25px] h-[25px] cursor-pointer'
                  />
                  <h1 className='text-white text-[20px] font-semibold'>Upload Media</h1>
                </div>

                <div  className='w-[90%] max-w-[600px] h-[80px] bg-white rounded-full flex justify-around items-center gap-[10px]'>

       

                  <div className={` ${uploadType=="post"?"bg-black shadow-2xl text-white shadow-black" :""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-black hover:shadow-2xl`}
                  onClick={()=>setUploadType("post")}
                  >Post</div>

                  <div  className={` ${uploadType=="story"?"bg-black shadow-2xl text-white shadow-black" :""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-black hover:shadow-2xl`} 
                   onClick={()=>setUploadType("story")}
                  >Story</div>

                  <div  className={` ${uploadType=="loop"?"bg-black shadow-2xl text-white shadow-black" :""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-black hover:shadow-2xl`}
                   onClick={()=>setUploadType("loop")}
                  >Loop</div>
                </div>


                {!frontendMedia && <div onClick={()=>mediaInput.current.click()} className='w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]'>

                  <input onChange={handleMedia} type="file" hidden ref={mediaInput} />

                  <FaPlusCircle className='text-white cursor-pointer w-[25px] h-[25px]'/>
             <div className='text-white text-[19px] font-semibold'>Upload {uploadType}</div>
                </div>
                }

                {frontendMedia && 
                 <div className='w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[15vh]'>

                  {mediaType=="image" &&   <div className='w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]'>

                      <img src={frontendMedia} alt="" className='h-[60%] rounded-2xl' />
                      {uploadType != "story" && <input onChange={(e)=>setCaption(e.target.value)} value={caption} type="text" className='w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption'/>}
                      


                  </div>}

                  
                  {mediaType=="video" &&   <div className='w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]'>
                    
                        <VideoPlayer media={frontendMedia}/> 
                      {uploadType != "story" && <input onChange={(e)=>setCaption(e.target.value)} value={caption} type="text" className='w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption'/>}
                      


                  </div>}



                </div> 
                }
              {frontendMedia &&  <button className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white mt-[50px] cursor-pointer rounded-2xl' 
              onClick={handleUpload}
              >{loading ? <ClipLoader size={30} color='black'/>:`upload ${uploadType}`}</button> }
           


    </div>
  )
}

export default Upload