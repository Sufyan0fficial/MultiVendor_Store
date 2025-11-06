import React from 'react'
import { GoGift } from "react-icons/go";
import { GoTag } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';



function SellerHeader() {
    const {sellerData} = useSelector(state=>state.SellerReducer)
    const navigate = useNavigate()
  return (
    <div className=' py-2 bg-white border-b shadow-sm border-gray-200'>
        <div className='gwidth mx-auto flex items-center justify-between'>

        
        <div className='cursor-pointer'>
            <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="logo" className='object-cover object-center h-7 md:h-12' />
        </div>
        <div className='flex items-center gap-8 '>
            <div className='hidden md:flex items-center gap-8'>
                <GoGift size={28} className='cursor-pointer hover:text-red-500 transition-colors duration-500 ease-in-out'/>
                <GoTag size={25} className='cursor-pointer hover:text-red-500 transition-colors duration-500 ease-in-out'/>
                <LuShoppingBag size={25} className='cursor-pointer hover:text-red-500 transition-colors duration-500 ease-in-out'/>
                <AiFillProduct size={25} className='cursor-pointer hover:text-red-500 transition-colors duration-500 ease-in-out'/>
                <IoChatboxEllipsesOutline size={25} className='cursor-pointer hover:text-red-500 transition-colors duration-500 ease-in-out' />

            </div>
            <div className='flex items-center cursor-pointer' onClick={()=>navigate(`/shop/${sellerData?._id}`)}>
                <img src={`${import.meta.env.VITE_API_DEV}/uploads/${sellerData?.avatar}`} alt="profile_img" className='w-12 h-12 md:h-16 md:w-16 rounded-full flex items-center justify-center border-2 border-green-500'/>
            </div>
            
        </div>
        </div>

    </div>
  )
}

export default SellerHeader