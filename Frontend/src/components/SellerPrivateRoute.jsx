import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function SellerPrivateRoute() {
    const {sellerData} = useSelector(state=>state?.SellerReducer)
  return (
    sellerData?._id ? <Outlet /> : <Navigate to='/seller-login' />
  )
}

export default SellerPrivateRoute