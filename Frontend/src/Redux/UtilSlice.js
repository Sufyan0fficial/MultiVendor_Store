import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  screenWidth: window.innerWidth,
}

export const UtilSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setScreenWidth: (state,action)=>{
        state.screenWidth = action.payload
    },
    

  },
})

// Action creators are generated for each case reducer function
export const { setScreenWidth } = UtilSlice.actions

export default UtilSlice.reducer