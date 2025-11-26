import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getorderdetails } from '../../api/routes'
import { useState } from 'react'
import { Message } from '../../utils/notifymessage'
import { message, Select, Button } from 'antd'
import { IoArrowBack } from 'react-icons/io5'
import { MdRateReview } from 'react-icons/md'
import WriteReviewDialog from '../../components/WriteReviewDialog'
import Lottie from 'lottie-react'
import animationData from '../../assets/Animations/ShopingCart.json'

function OrderDetail() {
    const { id } = useParams()
    const [orderDetails, setOrderDetails] = useState({})
    const [messageApi, contextHolder] = message.useMessage()
    const [qty, setQty] = useState(1)
    const [reviewDialogVisible, setReviewDialogVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCustomerOrderDetail = async () => {
            try {
                const res = await getorderdetails(id)
                if (res.status === 200) {
                    setOrderDetails(res.data?.data)
                    const noOfItems = res.data?.data?.products?.reduce((acc, current) => acc + current?.qty, 0)
                    setQty(noOfItems)
                }
            } catch (error) {
                Message(messageApi, 'error', 'Failed to get order details')
            }
            finally{
                setLoading(false)
            }
        }
        fetchCustomerOrderDetail()
    }, [id])

    const handleWriteReview = (product) => {
        setSelectedProduct(product)
        setReviewDialogVisible(true)
    }

    const handleCloseReviewDialog = () => {
        setReviewDialogVisible(false)
        setSelectedProduct(null)
    }

    return (
        loading ?
            <div className='min-h-[calc(100vh-200px)] flex justify-center items-center w-full'>

                <div style={{ width: 300, height: 300 }}>
                    <Lottie animationData={animationData} loop={true} />
                </div>
            </div>
            :
            <div>
                {contextHolder}

                <div className='w-full bg-gray-50 min-h-screen'>
                    <div className='max-w-7xl px-6 md:px-10 mx-auto py-6'>

                        {/* Header */}
                        <div className='flex items-center gap-4 mb-6'>
                            <IoArrowBack
                                className='text-2xl cursor-pointer hover:text-blue-600'
                                onClick={() => navigate('/profile')}
                            />
                            <h1 className='text-2xl font-semibold text-gray-800'>Order Details</h1>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

                            {/* Main Order Info */}
                            <div className='lg:col-span-2 space-y-6'>

                                {/* Order Summary Card */}
                                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                                    <div className='flex justify-between items-start mb-4'>
                                        <div>
                                            <h2 className='text-xl font-semibold text-gray-800'>Order # {orderDetails?._id}</h2>
                                            <p className='text-gray-600'>Placed on {new Date(orderDetails?.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-2xl font-bold text-gray-800'>${orderDetails?.total_price}</p>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${orderDetails.payment_status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {orderDetails.payment_status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200'>
                                        <div>
                                            <p className='text-gray-600 text-sm'>Payment Method</p>
                                            <p className='font-medium'>Credit Card</p>
                                        </div>
                                        <div>
                                            <p className='text-gray-600 text-sm'>Tracking Number</p>
                                            <p className='font-medium'>{orderDetails.tracking_number}</p>
                                        </div>
                                        <div>
                                            <p className='text-gray-600 text-sm'>Items</p>
                                            <p className='font-medium'>{qty} items</p>
                                        </div>
                                        <div>
                                            <p className='text-gray-600 text-sm'>Order Status</p>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${orderDetails.order_status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                orderDetails.order_status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                    orderDetails.order_status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {orderDetails.order_status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>Order Items</h3>
                                    <div className='space-y-4'>
                                        {orderDetails.products?.length > 0 && orderDetails.products.map((item) => {
                                            const price = item?.couponedPrice ? item?.couponedPrice : item?.discounted_price ? item?.discounted_price : item?.original_price
                                            return (
                                                <div key={item?._id} className='flex items-center gap-4 p-4 border border-gray-100 rounded-lg'>
                                                    <img src={`${import.meta.env.VITE_API_DEV}/uploads/${item?.images?.[0]}`} alt='product_img' className='w-16 h-16 object-cover rounded-lg' />
                                                    <div className='flex-1'>
                                                        <h4 className='font-medium text-gray-800'>{item?.product_name}</h4>
                                                        <p className='text-gray-600'>Quantity: {item.qty}</p>
                                                    </div>
                                                    <div className='text-right'>
                                                        <p className='font-semibold text-gray-800'>${(price * item.qty).toFixed(2)}</p>
                                                        <p className='text-sm text-gray-600'>${price} each</p>
                                                    </div>
                                                    {/* Write Review Button - Only show if order is delivered */}
                                                    {orderDetails.order_status === 'Delivered' && (
                                                        <div className='ml-4'>
                                                            <Button
                                                                type="primary"
                                                                icon={<MdRateReview />}
                                                                onClick={() => handleWriteReview(item)}
                                                                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                                                                size="small"
                                                            >
                                                                Write Review
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            )

                                        })}

                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className='space-y-6'>

                                {/* Shipping Address */}
                                {
                                    Object.keys(orderDetails)?.length > 0 &&
                                    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                                        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Shipping Address</h3>
                                        <div className='space-y-2 text-gray-700'>
                                            <p className='font-medium'>{orderDetails.shipping_address?.address1}</p>
                                            <p>{orderDetails.shipping_address?.phone}</p>
                                            <p>{orderDetails.shipping_address?.city}, {orderDetails.shipping_address?.state}</p>
                                            <p>{orderDetails.shipping_address?.country}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Write Review Dialog */}
                <WriteReviewDialog
                    visible={reviewDialogVisible}
                    onClose={handleCloseReviewDialog}
                    product={selectedProduct}
                    orderId={id}
                />
            </div>
    )
}

export default OrderDetail
