import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderDetails: null,
}

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    storeOrderData: (state,action)=>{
        state.orderDetails = action.payload
    },
    deleteOrderData:(state)=>{
        state.orderDetails = null
    }

  },
})

// Action creators are generated for each case reducer function
export const { storeOrderData,deleteOrderData } = OrderSlice.actions

export default OrderSlice.reducer