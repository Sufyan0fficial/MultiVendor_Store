import React, { useEffect, useState } from 'react'
import { IoBagOutline } from 'react-icons/io5'
import { RxPerson } from 'react-icons/rx'
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { BsChatDots } from 'react-icons/bs';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegAddressBook } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import ProfilePageWrapper from '../../components/ProfilePageWrapper';



function Profile() {
    const [width, setWidth] = useState(window.innerWidth)
    const [activeMenu, setActiveMenu] = useState(1)
    console.log('screen width is',width)
    const sideBarInfo = [
        {
            text:'Profile',
            icon: <RxPerson size={width <= 768 ? 20 : 25} color={activeMenu === 1 && 'red'}/>

        },
        {
            text:'Orders',
            icon: <IoBagOutline size={width <= 768 ? 20 : 25} color={activeMenu === 2 && 'red'}  />


        },
        // {
        //     text:'Refunds',
        //     icon: <HiOutlineReceiptRefund size={width <= 768 ? 20 : 25} color={activeMenu === 3 && 'red'}/>


        // },
        {
            text:'Inbox',
            icon: <BsChatDots size={width <= 768 ? 20 : 25} color={activeMenu === 4 && 'red'}/>


        },
        // {
        //     text:'Track Order',
        //     icon: <MdOutlineTrackChanges size={width <= 768 ? 20 : 25} color={activeMenu === 5 && 'red'}/>


        // },
        // {
        //     text:'Change Password',
        //     icon: <RiLockPasswordLine size={width <= 768 ? 20 : 25} color={activeMenu === 6 && 'red'}/>


        // },
        {
            text:'Address',
            icon: <FaRegAddressBook size={width <= 768 ? 20 : 25} color={activeMenu === 5 && 'red'}/>


        },
        {
            text:'Logout',
            icon: <IoMdLogOut size={width <= 768 ? 20 : 25} color={activeMenu === 6 && 'red'}/>


        },

    ]
    useEffect(()=>{
        const handleScreenResize = ()=>setWidth(window.innerWidth)
        window.addEventListener('resize',handleScreenResize)
        return ()=>window.removeEventListener('resize',handleScreenResize)
    },[])
  return (
    <div className='mt-20 md:mt-0 '>
            <div className='max-w-7xl mx-auto pr-3 md:pr-0 md:!px-10'>
                <div className='flex gap-2 md:gap-6 my-10'>
                    <div className={`px-5 md:px-6 py-12 flex flex-col gap-y-6 bg-white rounded-xl border border-gray-200 md:!max-h-[calc(100vh-200px)] !max-h-[calc(100vh-60px)] overflow-y-auto ${width <= 768 ? '' : 'w-1/4'}`}>
                        {
                            sideBarInfo?.map((item,index)=>{
                                return(
                                    <div className='flex items-center gap-5 cursor-pointer' key={index} onClick={()=>setActiveMenu(index + 1)}>
                                        <div className={``} >
                                            {
                                                item?.icon
                                            }
                                        </div>
                                        <div className={`text-lg ${activeMenu === (index + 1) ? 'text-red-500' : 'text-black'} ${width <= 768 ? 'hidden' : 'block'}`}>
                                            {
                                             item?.text
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <ProfilePageWrapper activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                </div>
            </div>
    </div>
  )
}

export default Profile