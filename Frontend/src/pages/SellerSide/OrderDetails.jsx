import React, { useState } from 'react'
import SellerHeader from '../../components/Seller/header'
import { Select, Button, message } from 'antd'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { useEffect } from 'react'
import { getorderdetails, getVendorOrders, updateorderstatus } from '../../api/routes'
import { Message } from '../../utils/notifymessage'

function OrderDetails() {
    const [orderStatus, setOrderStatus] = useState('Processing')
    console.log('orders status is',orderStatus)
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const { id } = useParams()
    console.log('id is', id)
    const [orderDetails, setOrderDetails] = useState({})
    console.log('order details are',orderDetails)
    const [qty, setQty] = useState(1)
    useEffect(() => {
        const getOrderDetails = async () => {
            try {
                const res = await getorderdetails(id)
                if (res.status === 200) {
                    setOrderDetails(res.data?.data)
                    const noOfItems = res.data?.data?.products?.reduce((acc, current) => acc + current?.qty, 0)
                    setQty(noOfItems)
                }
            } catch (error) {
                Message(messageApi, 'error', 'Failed to fetch Order Details')
                // navigate('/dashboard')
            }
        }
        getOrderDetails()
    }, [id])

    // Hardcoded order data
    //   const orderDetails = {
    //     _id: "ORD123456789",
    //     order_date: "2024-11-06",
    //     total_price: 299.97,
    //     payment_status: "Paid",
    //     order_status: "Processing",
    //     shipping_address: {
    //       name: "John Doe",
    //       phone: "+1234567890",
    //       address: "123 Main Street",
    //       city: "New York",
    //       state: "NY",
    //       zipcode: "10001",
    //       country: "USA"
    //     },
    //     items: [
    //       {
    //         _id: "1",
    //         name: "Premium Wireless Headphones",
    //         price: 149.99,
    //         quantity: 1,
    //         image: "https://via.placeholder.com/80x80"
    //       },
    //       {
    //         _id: "2", 
    //         name: "Smartphone Case",
    //         price: 24.99,
    //         quantity: 2,
    //         image: "https://via.placeholder.com/80x80"
    //       },
    //       {
    //         _id: "3",
    //         name: "USB-C Cable",
    //         price: 19.99,
    //         quantity: 5,
    //         image: "https://via.placeholder.com/80x80"
    //       }
    //     ],
    //     payment_method: "Credit Card",
    //     tracking_number: "TRK987654321"
    //   }

    const handleStatusUpdate = async() => {
        // API call would go here
        try {
            const res = await updateorderstatus(orderDetails?._id, {order_status:orderStatus})
            if(res.status === 201){
                setOrderDetails(res.data?.data)
            }
        } catch (error) {
            Message(messageApi,'error','Failed to update Order Status')
        }
        messageApi.success('Order status updated successfully')
    }

    const statusOptions = [
        { value: 'Processing', label: 'Processing' },
        { value: 'Shipped', label: 'Shipped' },
        { value: 'Delivered', label: 'Delivered' },
        { value: 'Cancelled', label: 'Cancelled' }
    ]

    return (
        <div>
            {contextHolder}
            <SellerHeader />
            <div className='w-full bg-gray-50 min-h-screen'>
                <div className='max-w-7xl px-6 md:px-10 mx-auto py-6'>

                    {/* Header */}
                    <div className='flex items-center gap-4 mb-6'>
                        <IoArrowBack
                            className='text-2xl cursor-pointer hover:text-blue-600'
                            onClick={() => navigate('/dashboard/orders')}
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
                                            </div>
                                        )
                                        
                                    })}

                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className='space-y-6'>

                            {/* Status Update */}
                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Update Status</h3>
                                <div className='space-y-4'>
                                    <Select
                                        value={orderStatus}
                                        onChange={setOrderStatus}
                                        className='w-full'
                                        options={statusOptions}
                                    />
                                    <Button
                                        type="primary"
                                        className='w-full bg-blue-600 hover:bg-blue-700'
                                        onClick={handleStatusUpdate}
                                    >
                                        Update Status
                                    </Button>
                                </div>
                            </div>

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

                            {/* Order Summary */}
                            {/* <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Order Summary</h3>
                                <div className='space-y-3'>
                                    <div className='flex justify-between text-gray-700'>
                                        <span>Subtotal</span>
                                        <span>${(orderDetails.total_price - 10).toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-700'>
                                        <span>Shipping</span>
                                        <span>$10.00</span>
                                    </div>
                                    <div className='border-t border-gray-200 pt-3'>
                                        <div className='flex justify-between font-semibold text-gray-800'>
                                            <span>Total</span>
                                            <span>${orderDetails.total_price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
