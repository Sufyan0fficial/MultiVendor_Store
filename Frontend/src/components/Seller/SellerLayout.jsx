import React from 'react'
import { Outlet } from 'react-router'
import SellerHeader from './Header'
import { useSelector } from 'react-redux'
import SellerDashboardSidebar from './SellerDashboardSidebar'

function SellerLayout() {
    const { screenWidth } = useSelector(state => state?.UtilReducer)
    return (
        <div className='min-h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] md:min-h-screen md:max-h-screen flex flex-col w-full '>

            <SellerHeader />
            <div className='flex gap-3 md:gap-10 bg-[#f6f6f5] min-h-[calc(100vh-125px)] md:min-h-[calc(100vh-85px)] max-h-[calc(100vh-125px)] md:max-h-[calc(100vh-85px)]'>
                <SellerDashboardSidebar screenWidth={screenWidth} />
                <div className='flex-grow mr-4 md:mr-10 overflow-y-auto min-h-0 hide-scrollbar'>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SellerLayout