import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Message } from '../../utils/notifymessage'
import { message, Modal } from 'antd'
import { deleteSellerData } from '../../Redux/SellerSlice'
import { Get_ShopData, Logout_Seller, Get_Events, getTotalShopReviews } from '../../api/routes'
import ProductCard from '../../components/ProductCard'
import EventCard from '../../components/EventCard'
import ReviewCard from '../../components/ReviewCard'
import LoadingSpinner from '../../components/LoadingSpinner'

function ShopProfile() {
    const params = useParams()
    const { sellerData } = useSelector(state => state?.SellerReducer)
    const [shopData, setShopData] = useState(null)
    const [shopEvents, setShopEvents] = useState([])
    const [shopReviews, setShopReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [OpenSidebar, setOpenSidebar] = useState(false)
    const [renderData, setRenderData] = useState('products')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isShopOwner, setIsShopOwner] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [sureToLogout, setSureToLogout] = useState(false)

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

    const fetchShopEvents = async (shopId) => {
        try {
            const res = await Get_Events(shopId)
            if (res.status === 200) {
                const activeEvents = res.data?.data?.filter(event => {
                    const eventEndDate = new Date(event.finish_date)
                    const now = new Date()
                    return eventEndDate > now
                }) || []
                setShopEvents(activeEvents)
            }
        } catch (error) {
            console.error('Failed to fetch shop events:', error)
            setShopEvents([])
        }
    }

    const fetchShopReviews = async (shopId) => {
        try {
            const res = await getTotalShopReviews(shopId)
            if (res.status === 200) {
                setShopReviews(res.data?.data || [])
            }
        } catch (error) {
            console.error('Failed to fetch shop reviews:', error)
            setShopReviews([])
        }
    }

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                setLoading(true)
                const res = await Get_ShopData(params?.id)
                if (res.status === 200) {
                    setShopData(res.data?.data)
                    setIsShopOwner(sellerData?._id === res.data?.data?._id)
                    
                    await Promise.all([
                        fetchShopEvents(res.data?.data?._id),
                        fetchShopReviews(res.data?.data?._id)
                    ])
                }
            } catch (error) {
                Message(messageApi, 'error', 'Failed to fetch requested shop data')
                setTimeout(() => navigate('/'), 1000);
            } finally {
                setLoading(false)
            }
        }
        fetchShopData()
    }, [params])

    const calculateAverageRating = () => {
        if (shopReviews.length === 0) return 0
        const totalRating = shopReviews.reduce((sum, review) => sum + review.rating, 0)
        return (totalRating / shopReviews.length).toFixed(1)
    }

    return (
        <div className='w-full bg-[#f6f6f5]'>
            {contextHolder}

            <div className='w-screen max-w-screen flex gap-3 md:gap-6 min-h-[calc(100vh-60px)] md:min-h-[calc(100vh)] max-h-[calc(100vh-60px)] md:!max-h-[calc(100vh)]'>
                <div className={`w-max md:min-w-[25%] min-h-0 !overflow-y-auto px-4 md:px-6 hidden md:flex flex-col gap-y-6 md:gap-y-7 border-r border-gray-200 rounded-xl py-6 bg-white`}>
                    <div className='w-full flex flex-col items-center'>
                        <img src={`${import.meta.env.VITE_API_DEV}/uploads/${shopData?.avatar}`} alt="image" className='w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-green-500' />
                        <div className='text-2xl font-bold tracking-tight capitalize'>
                            {shopData?.shop_name}
                        </div>
                    </div>
                    <div className='md:flex flex-col gap-y-6 md:gap-y-7 hidden'>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Email</div>
                            <div className='text-sm text-slate-500 md:text-base'>{shopData?.email}</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Phone Number</div>
                            <div className='text-sm text-slate-500 md:text-base'>{shopData?.phone}</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Total Products</div>
                            <div className='text-sm text-slate-500 md:text-base'>{shopData?.products?.length || 0}</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Shop Ratings</div>
                            <div className='text-sm text-slate-500 md:text-base'>{calculateAverageRating()}/5 ({shopReviews.length} reviews)</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Running Events</div>
                            <div className='text-sm text-slate-500 md:text-base'>{shopEvents.length}</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Joined On</div>
                            <div className='text-sm text-slate-500 md:text-sm font-medium'>{(shopData?.createdAt)?.split('T')[0]}</div>
                        </div>
                        {isShopOwner && (
                            <div className='flex flex-col gap-y-2'>
                                <div className='cursor-pointer text-white bg-black text-center w-full px-6 py-[10px] text-sm md:text-base rounded-md flex items-center justify-center'>
                                    Edit Shop
                                </div>
                                <div className='cursor-pointer text-white bg-black text-center w-full px-6 py-[10px] text-sm md:text-base rounded-md flex items-center justify-center' onClick={()=>setSureToLogout(true)}>
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`min-w-max md:min-w-[25%] min-h-full !overflow-y-auto px-4 md:px-6 flex md:hidden flex-col gap-y-6 md:gap-y-7 border-r border-gray-200 rounded-xl py-6 bg-white max-w-max ${OpenSidebar ? 'min-w-[80%]' : 'w-max'} transition-all ease-in-out duration-500`}>
                    <div className='flex items-center justify-between'>
                        <img src={`${import.meta.env.VITE_API_DEV}/uploads/${shopData?.avatar}`} alt="image" className='w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-green-500' />
                        <RxCross2 size={33} color='gray' className={`${OpenSidebar ? 'block' : 'hidden'}`} onClick={() => setOpenSidebar(false)} />
                    </div>
                    <div className={`block md:hidden cursor-pointer text-xs underline ${OpenSidebar ? 'hidden' : 'block'}`} onClick={() => setOpenSidebar(true)}>
                        View Details
                    </div>
                    <div className={`flex-col gap-y-6 md:gap-y-7 ${OpenSidebar ? 'flex' : 'hidden'} mt-6`}>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Email</div>
                            <div className='text-sm text-slate-500 md:text-base'>{shopData?.email}</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Phone Number</div>
                            <div className='text-sm text-slate-500 md:text-base'>{shopData?.phone}</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Total Products</div>
                            <div className='text-sm text-slate-500 md:text-base'>{shopData?.products?.length || 0}</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Shop Ratings</div>
                            <div className='text-sm text-slate-500 md:text-base'>{calculateAverageRating()}/5 ({shopReviews.length} reviews)</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Running Events</div>
                            <div className='text-sm text-slate-500 md:text-base'>{shopEvents.length}</div>
                        </div>
                        <div>
                            <div className='md:text-xl tracking-tight font-semibold'>Joined On</div>
                            <div className='text-sm text-slate-500 md:text-sm font-medium'>{(shopData?.createdAt)?.split('T')[0]}</div>
                        </div>
                        {isShopOwner && (
                            <div className='flex flex-col gap-y-2'>
                                <div className='cursor-pointer text-white bg-black text-center w-full px-6 py-[10px] text-sm md:text-base rounded-md flex items-center justify-center'>
                                    Edit Shop
                                </div>
                                <div className='cursor-pointer text-white bg-black text-center w-full px-6 py-[10px] text-sm md:text-base rounded-md flex items-center justify-center' onClick={()=>setSureToLogout(true)}>
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col !flex-grow py-10 mr-3 md:mr-6 px-3 md:px-6 border border-gray-200 bg-[#f6f6f5]'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center'>
                            <div className='text-2xl font-bold text-blue-600'>{shopData?.products?.length || 0}</div>
                            <div className='text-sm text-gray-600'>Products</div>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center'>
                            <div className='text-2xl font-bold text-green-600'>{shopEvents.length}</div>
                            <div className='text-sm text-gray-600'>Active Events</div>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center'>
                            <div className='text-2xl font-bold text-purple-600'>{shopReviews.length}</div>
                            <div className='text-sm text-gray-600'>Reviews</div>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center'>
                            <div className='text-2xl font-bold text-orange-600'>{calculateAverageRating()}</div>
                            <div className='text-sm text-gray-600'>Rating</div>
                        </div>
                    </div>

                    <div className='flex items-center gap-x-20 justify-between w-full max-w-[calc(100vw-150px)] md:max-w-[calc(100vw-26%)] overflow-x-auto min-h-max'>
                        <div className='flex items-center gap-6 min-w-max'>
                            <div className={`md:text-xl font-semibold md:font-bold cursor-pointer min-w-max ${renderData === 'products' ? 'text-red-500' : ''}`} onClick={() => setRenderData('products')}>
                                Shop Products ({shopData?.products?.length || 0})
                            </div>
                            <div className={`md:text-xl font-semibold md:font-bold cursor-pointer min-w-max ${renderData === 'events' ? 'text-red-500' : ''}`} onClick={() => setRenderData('events')}>
                                Running Events ({shopEvents.length})
                            </div>
                            <div className={`md:text-xl font-semibold md:font-bold cursor-pointer min-w-max ${renderData === 'reviews' ? 'text-red-500' : ''}`} onClick={() => setRenderData('reviews')}>
                                Shop Reviews ({shopReviews.length})
                            </div>
                        </div>
                        {isShopOwner && (
                            <div className='text-white bg-black text-center px-6 py-3 rounded-md flex items-center cursor-pointer min-w-max text-sm md:text-base' onClick={() => navigate('/dashboard')}>
                                Go Dashboard
                            </div>
                        )}
                    </div>

                    <div className='flex-grow overflow-y-auto mt-6 border-t border-gray-200 pt-6'>
                        {loading && <LoadingSpinner />}

                        {renderData === 'products' && !loading && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                {shopData?.products?.length > 0 ? 
                                    shopData?.products?.map((item, index) => (
                                        <div key={index}>
                                            <ProductCard product={item} shop={shopData} isVendor={true} />
                                        </div>
                                    ))
                                    :
                                    <div className='col-span-full text-center py-10'>
                                        <div className='text-gray-500 text-lg'>No Products Found</div>
                                        <p className='text-gray-400 mt-2'>This shop hasn't added any products yet.</p>
                                    </div>
                                }
                            </div>
                        )}

                        {renderData === 'events' && !loading && (
                            <div className='space-y-6'>
                                {shopEvents.length > 0 ? 
                                    shopEvents.map((event, index) => (
                                        <div key={index}>
                                            <EventCard data={event} />
                                        </div>
                                    ))
                                    :
                                    <div className='text-center py-10'>
                                        <div className='text-gray-500 text-lg'>No Running Events</div>
                                        <p className='text-gray-400 mt-2'>This shop doesn't have any active events at the moment.</p>
                                    </div>
                                }
                            </div>
                        )}

                        {renderData === 'reviews' && !loading && (
                            <div className='space-y-4'>
                                {shopReviews.length > 0 ? 
                                    shopReviews.map((review, index) => (
                                        <div key={index}>
                                            <ReviewCard review={review} />
                                        </div>
                                    ))
                                    :
                                    <div className='text-center py-10'>
                                        <div className='text-gray-500 text-lg'>No Reviews Yet</div>
                                        <p className='text-gray-400 mt-2'>This shop hasn't received any reviews yet.</p>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                open={sureToLogout}
                onCancel={()=>setSureToLogout(false)}
                onOk={handleLogout}
                title='Are you sure to logout'
            />
        </div>
    )
}

export default ShopProfile
