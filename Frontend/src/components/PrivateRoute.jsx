import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function PrivateRoute() {
    const { userData } = useSelector(state => state.UserReducer)
    return (


        userData?._id ? <Outlet /> : <Navigate to={'/login'} />

    )
}

export default PrivateRoute