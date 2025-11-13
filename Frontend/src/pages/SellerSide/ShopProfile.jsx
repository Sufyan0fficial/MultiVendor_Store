import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Message } from '../../utils/notifymessage'
import { message, Modal } from 'antd'
import { deleteSellerData, updateSellerData } from '../../Redux/SellerSlice'
import { Get_ShopData, Logout_Seller } from '../../api/routes'
import ProductCard from '../../components/ProductCard'
import useToken from 'antd/es/theme/useToken'
import EditShopDialog from '../../components/EditShopDialog'

function ShopProfile() {
    const params = useParams()
    const { sellerData } = useSelector(state => state?.SellerReducer)
    const [shopData, setShopData] = useState(null)
    console.log('shopdata',shopData)
    const [OpenSidebar, setOpenSidebar] = useState(false)
    const [renderData, setRenderData] = useState('products')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isShopOwner, setIsShopOwner] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [failedApi, setFailedApi] = useState(false)
    const [sureToLogout, setSureToLogout] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const handleLogout = async () => {
        try {
            const res = await Logout_Seller()
            if (res.status === 200) {
                Message(message, 'success', 'Logged out successfully')
                setTimeout(() => {
                    dispatch(deleteSellerData())
                    navigate('/seller-login')
                }, 1000);
            }
        } catch (error) {
            Message(message, 'error', 'Something went wrong during logout')
        }
    }
    useEffect(() => {
        const fetchShopData = async () => {
            try {
                const res = await Get_ShopData(params?.id)
                if (res.status === 200) {
                    setShopData(res.data?.data)
                    if (sellerData?._id !== res.data?.data?._id) {
                        setIsShopOwner(false)
                    }
                    else {
                        setIsShopOwner(true)
                    }
                }
            } catch (error) {
                Message(messageApi, 'error', 'Failed to fetch requested shop data')
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }
        }
        fetchShopData()
    }, [params])
    return (
        <div className='w-full bg-[#f6f6f5] '>
            {
                contextHolder
            }



            <div className='w-screen max-w-screen flex gap-3 md:gap-6 min-h-[calc(100vh-60px)] md:min-h-[calc(100vh)] max-h-[calc(100vh-60px)] md:!max-h-[calc(100vh)'>
                <>


                    <div className={`w-max md:min-w-[25%] min-h-0 !overflow-y-auto px-4 md:px-6 hidden md:flex flex-col gap-y-6 md:gap-y-7 border-r border-gray-200 rounded-xl py-6 bg-white `}>
                        <div className='w-full flex flex-col items-center'>

                            <img src={`${import.meta.env.VITE_API_DEV}/uploads/${shopData?.avatar}`} alt="image" className='w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-green-500 ' />
                            <div className='text-2xl font-bold tracking-tight capitalize'>
                                {shopData?.shop_name}
                            </div>
                        </div>
                        <div className='md:flex flex-col gap-y-6 md:gap-y-7 hidden'>

                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>

                                    Email
                                </div>
                                <div className='text-sm text-slate-500 md:text-base'>
                                    {shopData?.email}
                                </div>
                            </div>
                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>

                                    Phone Number
                                </div>
                                <div className='text-sm text-slate-500 md:text-base'>
                                    {shopData?.phone}
                                </div>
                            </div>
                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>
                                    Total Products
                                </div>
                                <div className='text-sm text-slate-500 md:text-base'>
                                    {shopData?.products?.length}
                                </div>
                            </div>
                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>

                                    Shop Ratings
                                </div>
                                <div className='text-sm text-slate-500 md:text-base'>
                                    0/5
                                </div>
                            </div>

                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>

                                    Joined On
                                </div>
                                <div className='text-sm text-slate-500 md:text-sm font-medium'>
                                    {(shopData?.createdAt)?.split('T')[0]}
                                </div>
                            </div>
                            {
                                isShopOwner && (

                                    <div className='flex flex-col gap-y-2'>

                                        <div className='cursor-pointer text-white bg-black text-center w-full px-6 py-[10px] text-sm md:text-base rounded-md flex items-center justify-center' onClick={() => setEditDialogOpen(true)}>
                                            Edit Shop
                                        </div>
                                        <div className='cursor-pointer text-white bg-black text-center w-full px-6 py-[10px] text-sm md:text-base rounded-md flex items-center justify-center' onClick={()=>setSureToLogout(true)}>
                                            Logout
                                        </div>
                                    </div>
                                )
                            }


                        </div>


                    </div>
                    <div className={`min-w-max md:min-w-[25%] min-h-full !overflow-y-auto px-4 md:px-6 flex md:hidden flex-col gap-y-6 md:gap-y-7 border-r border-gray-200 rounded-xl py-6 bg-white max-w-max ${OpenSidebar ? 'min-w-[80%]' : 'w-max'} transition-all ease-in-out duration-500`}>
                        <div className='flex items-center justify-between'>
                            <img src={`${import.meta.env.VITE_API_DEV}/uploads/${shopData?.avatar}`} alt="image" className='w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-green-500 ' />
                            <RxCross2 size={33} color='gray' className={`${OpenSidebar ? 'block' : 'hidden'}`} onClick={() => setOpenSidebar(false)} />
                        </div>
                        <div className={`block md:hidden cursor-pointer text-xs underline ${OpenSidebar ? 'hidden' : 'block'}`} onClick={() => setOpenSidebar(true)}>
                            View Details
                        </div>
                        <div className={` flex-col gap-y-6 md:gap-y-7 ${OpenSidebar ? 'flex' : 'hidden'} mt-6`}>

                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>

                                    Email
                                </div>
                                <div className='text-sm text-slate-500 md:text-base'>
                                    {shopData?.email}
                                </div>
                            </div>
                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>

                                    Phone Number
                                </div>
                                <div className='text-sm text-slate-500 md:text-base'>
                                    {shopData?.phone}
                                </div>
                            </div>
                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>

                                    Total Products
                                </div>
                                <div className='text-sm text-slate-500 md:text-base'>
                                    {shopData?.products?.length}
                                </div>
                            </div>
                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>

                                    Shop Ratings
                                </div>
                                <div className='text-sm text-slate-500 md:text-base'>
                                    0/5
                                </div>
                            </div>

                            <div className=''>
                                <div className='md:text-xl tracking-tight font-semibold'>

                                    Joined On
                                </div>
                                <div className='text-sm text-slate-500 md:text-sm font-medium'>
                                    {(shopData?.createdAt)?.split('T')[0]}
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-2'>

                                <div className='cursor-pointer text-white bg-black text-center w-full px-6 py-[10px] text-sm md:text-base rounded-md flex items-center justify-center'>
                                    Edit Shop
                                </div>
                                <div className='cursor-pointer text-white bg-black text-center w-full px-6 py-[10px] text-sm md:text-base rounded-md flex items-center justify-center'>
                                    Logout
                                </div>
                            </div>

                        </div>
                    </div>
                </>
                <div className=' flex flex-col !flex-grow py-10 mr-3 md:mr-6 px-3 md:px-6 border border-gray-200 bg-[#f6f6f5]'>


                    <div className='flex items-center gap-x-20 justify-between  w-full max-w-[calc(100vw-150px)] md:max-w-[calc(100vw-26%)] overflow-x-auto min-h-max'>


                        <div className='flex items-center gap-6 min-w-max'>
                            <div className={`md:text-xl font-semibold md:font-bold cursor-pointer min-w-max ${renderData === 'products' ? 'text-red-500' : ''}`} onClick={() => setRenderData('products')}>
                                Shop Products
                            </div>
                            <div className={`md:text-xl font-semibold md:font-bold cursor-pointer min-w-max ${renderData === 'events' ? 'text-red-500' : ''}`} onClick={() => setRenderData('events')}>
                                Running Events
                            </div>
                            <div className={`md:text-xl font-semibold md:font-bold cursor-pointer min-w-max ${renderData === 'reviews' ? 'text-red-500' : ''}`} onClick={() => setRenderData('reviews')}>
                                Shop Reviews
                            </div>
                        </div>

                        {
                            isShopOwner && (

                                <div className='text-white bg-black text-center px-6 py-3 rounded-md flex items-center  cursor-pointer min-w-max text-sm md:text-base' onClick={() => navigate('/dashboard')}>
                                    Go Dashboard
                                </div>
                            )
                        }
                    </div>
                    <div className='flex-grow overflow-y-auto mt-6 border-t border-gray-200'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

                    {
                        renderData === 'products' &&
                         (
                            shopData?.products?.length > 0 ? 
                                shopData?.products?.map((item, index) => (
                                    <div key={index}>

                                        <ProductCard product={item} shop={shopData} isVendor={true} />
                                    </div>
                                ))
                                :
                                <div className='text-center'>
                                    No Products Found
                                </div>
                        )
                    }
                        </div>


                        {
                            renderData === 'events' && (
                                <div>
                                    events
                                </div>
                            )
                        }
                        {
                            renderData === 'reviews' && (
                                <div>
                                    reviews
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
            <Modal
            open={sureToLogout}
            onCancel={()=>setSureToLogout(false)}
            onOk={handleLogout}
            title='Are you sure to logout'
            >

            </Modal>


            <EditShopDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                shopData={shopData}
                onUpdate={(updatedData) => {
                    setShopData(prevData => ({
                        ...updatedData,
                        products: prevData?.products || [],
                        events: prevData?.events || []
                    }))
                    if (isShopOwner) {
                        dispatch(updateSellerData(updatedData))
                    }
                }}
            />

        </div>
    )
}

export default ShopProfile
