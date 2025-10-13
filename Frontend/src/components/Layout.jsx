import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div className='min-h-screen border flex flex-col '>
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout