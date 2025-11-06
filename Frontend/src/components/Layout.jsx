import React from 'react'
import Header from './Header'
import Footer from './footer'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div className='min-h-screen border flex flex-col '>
        <Header />
        <main className='bg-[#f6f6f5] text-black '>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout
