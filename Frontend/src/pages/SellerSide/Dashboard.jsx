import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CreateProduct from './CreateProduct'
import ProfileTable from '../../components/Table'
import SellerDashboardSidebar from '../../components/Seller/SellerDashboardSidebar'


function Dashboard() {
    const {screenWidth} = useSelector(state=>state?.UtilReducer)
    const [activeMenu, setActiveMenu] = useState(1)
   
    
  return (
    <div className='flex gap-3 md:gap-10 bg-[#f6f6f5] min-h-[calc(100vh-125px)] md:min-h-[calc(100vh-85px)] max-h-[calc(100vh-125px)] md:max-h-[calc(100vh-85px)]'>
        <div className=' flex-grow mr-4 md:mr-10 overflow-y-auto min-h-0 hide-scrollbar'> 
            
           
        </div>
    </div>
  )
}

export default Dashboard