import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sellerData: null,
}

export const SellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    storeSellerData: (state,action)=>{
        state.sellerData = action.payload
    },
    deleteSellerData:(state)=>{
        state.sellerData = null
    }

  },
})

// Action creators are generated for each case reducer function
export const { storeSellerData,deleteSellerData } = SellerSlice.actions

export default SellerSlice.reducer