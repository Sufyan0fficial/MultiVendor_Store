import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData: (state,action)=>{
        state.userData = action.payload
    },
    deleteUserData:(state)=>{
        state.userData = null
    }

  },
})

// Action creators are generated for each case reducer function
export const { storeUserData,deleteUserData } = userSlice.actions

export default userSlice.reducer