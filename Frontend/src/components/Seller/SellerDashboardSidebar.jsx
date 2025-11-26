import React, { useEffect, useState } from 'react'
import { AiFillProduct } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { GoGift, GoTag } from 'react-icons/go'
import { HiOutlineReceiptRefund } from 'react-icons/hi'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { LuShoppingBag } from 'react-icons/lu'
import { MdEmojiEvents, MdOutlineCreateNewFolder, MdOutlineEventAvailable } from 'react-icons/md'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import { useLocation, useNavigate } from 'react-router'

function SellerDashboardSidebar({ screenWidth }) {
    const [activeMenu, setActiveMenu] = useState('dashboard')
    console.log('active menu is',activeMenu)
    const location = useLocation()
    useEffect(()=>{
        const loc = location.state
         setActiveMenu(loc)
    },[location])

    const sideBar = [
        {
            name: 'Dashboard',
            icon: <RxDashboard size={screenWidth <= 768 ? 20 : 33} color={(activeMenu === ('dashboard') || !activeMenu) ? '#dc143c' : ''}/>,
            navigate: '/dashboard',
            key:'dashboard'

        },
        {
            name: 'All Orders',
            icon: <LuShoppingBag size={screenWidth <= 768 ? 20 : 33}  color={activeMenu === 'orders' ? '#dc143c' : ''}/>,
            navigate: '/dashboard/orders',
            key:'orders'


        },
        {
            name: 'All Products',
            icon: <AiFillProduct size={screenWidth <= 768 ? 20 : 33}  color={activeMenu === 'products' ? '#dc143c' : ''}/>,
            navigate: '/dashboard/products',
            key:'products'


        },
        {
            name: 'Create Product',
            icon: <MdOutlineCreateNewFolder size={screenWidth <= 768 ? 20 : 33}  color={activeMenu === 'create-product' ? '#dc143c' : ''}/>,
            navigate: '/dashboard/create-product',
            key:'create-product'


        },
        {
            name: 'Create Event',
            icon: <MdEmojiEvents size={screenWidth <= 768 ? 20 : 33} color={activeMenu === 'create-event' ? '#dc143c' : ''} />,
            navigate: '/dashboard/create-event',
            key:'create-event'


        },
        {
            name: 'All Events',
            icon: <MdOutlineEventAvailable size={screenWidth <= 768 ? 20 : 33}  color={activeMenu === 'events' ? '#dc143c' : ''}/>,
            navigate: '/dashboard/events',
            key:'events'


        },
        {
            name: 'Withdraw Money',
            icon: <RiMoneyDollarCircleLine size={screenWidth <= 768 ? 20 : 33}  color={activeMenu === 'withdraw' ? '#dc143c' : ''}/>,
            navigate: '/dashboard/withdraw-money',
            key:'withdraw'


        },
        {
            name: 'Shop Inbox',
            icon: <IoChatboxEllipsesOutline size={screenWidth <= 768 ? 20 : 33}  color={activeMenu === 'inbox' ? '#dc143c' : ''}/>,
            navigate: '/dashboard/inbox',
            key:'inbox'


        },
        {
            name: 'Discount Codes',
            icon: <GoGift size={screenWidth <= 768 ? 20 : 33}  color={activeMenu === 'discount' ? '#dc143c' : ''}/>,
            navigate: '/dashboard/discount-codes',
            key:'discount'


        },
        // {
        //     name: 'Refunds',
        //     icon: <HiOutlineReceiptRefund size={screenWidth <= 768 ? 20 : 33}  color={activeMenu === 'refunds' ? '#dc143c' : ''}/>,
        //     navigate: '/dashboard/refunds',
        //     key:'refunds'


        // },
        // {
        //     name: 'settings',
        //     icon: <FiSettings size={screenWidth <= 768 ? 20 : 33}  color={activeMenu === 'settings' ? '#dc143c' : ''}/>,
        //     navigate: '/dashboard/settings',
        //     key:'settings'
            


        // },
    ]
    const navigate = useNavigate()
    return (
        <div className=' !overflow-y-auto px-4 shrink-0 md:px-6 flex flex-col gap-y-6 md:gap-y-7 border-r border-gray-200 rounded-xl py-6 bg-white hide-scrollbar'>
            {
                sideBar?.map((item, index) => {
                    return (
                        <div className='flex gap-4 items-center cursor-pointer  ' key={index} onClick={() => navigate(item?.navigate,{state:item?.key})}>
                            <div>
                                {item?.icon}
                            </div>
                            <div className={`text-lg  md:block hidden ${activeMenu === item?.key ? 'text-red-600' : ''}`}>{item?.name}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SellerDashboardSidebar