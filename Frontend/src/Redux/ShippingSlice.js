import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shipping_address: null,
}

export const ShippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    storeShippingData: (state,action)=>{
        state.shipping_address = action.payload
    },
    deleteShippingData:(state)=>{
        state.shipping_address = null
    }

  },
})

// Action creators are generated for each case reducer function
export const { storeShippingData,deleteShippingData } = ShippingSlice.actions

export default ShippingSlice.reducer