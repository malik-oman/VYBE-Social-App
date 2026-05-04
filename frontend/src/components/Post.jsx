import React from 'react'
import dp from './../assets/download.jfif'
import VideoPlayer from './VideoPlayer'


const Post = ({postData}) => {
  return (
    <div className='w-[90%] min-h-[450px] flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl'>

      <div className='w-full h-[80px] flex justify-between items-center px-[10px]'>

        <div className='flex justify-center items-center md:gap-[20px] gap-[10px]'>

          <div className='w-[40px] h-[40px]  md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden shrink-0'>
                    <img 
                      src={postData.author.profileImage || dp} 
                      alt="" 
                      className='w-full h-full object-cover object-center' 
                    />
                  </div>

                  <div className='w-[200px] font-semibold truncate'>{postData.author.userName}</div>

                </div>  

                <button className='px-[10px] w-[80px] md:w-[100px] py-[5px] h-[30px] md:h-[40px] bg-black text-white rounded-2xl text-[14px] md:text-[16px]'>Follow</button>
      </div>

                            <div className="w-full flex items-center justify-center py-4 mb-30 ">
                    {postData.mediaType === "image" && (
                      <div className="w-[95%] sm:w-[90%] max-w-[600px] flex flex-col items-center justify-center">
                        <div className="w-full rounded-2xl overflow-hidden shadow-lg shadow-black/20 border border-white/10">
                          <img
                            src={postData.media}
                            alt="Post media"
                            className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover "
                          />
                        </div>
                      </div>
                    )}

                    {postData.mediaType === "video" && (
                      <div className="w-[95%] sm:w-[85%] max-w-[550px] flex flex-col items-center justify-center mt-6">
                        <div className="w-full rounded-2xl overflow-hidden shadow-lg shadow-black/20 border border-white/10">
                          <VideoPlayer media={postData.media} />
                        </div>
                      </div>
                    )}
                  </div>    

                   <div>
                    
                   </div>
    </div>
  )
}

export default Post