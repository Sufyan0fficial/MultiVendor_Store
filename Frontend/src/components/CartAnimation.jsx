import React from 'react'
import Lottie from "lottie-react"
import animationData from '../assets/Animations/ShopingCart.json'

function CartAnimation() {
   return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  )
}

export default CartAnimation