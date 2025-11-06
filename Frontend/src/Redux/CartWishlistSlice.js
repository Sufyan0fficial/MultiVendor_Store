import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartData: [],
  wishlistData:[]
}

export const CartWishlistSlice = createSlice({
  name: 'CartWishlistSlice',
  initialState,
  reducers: {
   addProducttoCart:(state,action)=>{
     state.cartData = [...state.cartData,action.payload]
   },
   removeFromCart:(state,action)=>{
    const ComingItem = action.payload
     state.cartData = state.cartData?.filter((item, i)=>item?._id !== ComingItem?._id)
     console.log('cart data is',state.cartData)
   },
   addProducttoWishlist:(state,action)=>{
    console.log('receiving product is',action.payload)
    state.wishlistData = [...state.wishlistData,action.payload]
   },
   removeFromWishlist : (state,action)=>{
    const ComingProduct = action.payload
    state.wishlistData = state.wishlistData?.filter((item,i)=>{
        return item?._id !== ComingProduct?._id
    })
    console.log('stat.wishlist dat',state.wishlistData)
   },
   IncrementProductToCart : (state,action)=>{
     const products = state?.cartData?.length > 0 && state?.cartData?.map((item,index)=>{
        const targetItem = item?._id === action.payload
        const data = targetItem ? {...item,qty:item?.qty +1} : item
        return data
     })
     state.cartData = products
   },
   decrementProductToCart : (state,action)=>{
        const products = state?.cartData?.length > 0 && state?.cartData?.map((item,index)=>{
        const targetItem = item?._id === action.payload
        const data = targetItem ? {...item,qty:item?.qty - 1} : item
        return data
     })
     state.cartData = products
   },
   EmptyCart : (state,action)=>{
    state.cartData =  []
   }

  },
})

// Action creators are generated for each case reducer function
export const {addProducttoCart,removeFromCart, addProducttoWishlist, removeFromWishlist, IncrementProductToCart,decrementProductToCart, EmptyCart} = CartWishlistSlice.actions

export default CartWishlistSlice.reducer