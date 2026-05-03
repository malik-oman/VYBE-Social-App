import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name:"story",
  initialState:{
    storyData:[]
  },
  reducers:{
    setSotryData:(state,action)=>{
      state.storyData=action.payload
    },
    
  }
})

export const {setSotryData} = storySlice.actions
export default storySlice.reducer