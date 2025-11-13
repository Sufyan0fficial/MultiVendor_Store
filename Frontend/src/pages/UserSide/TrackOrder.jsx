import Lottie from 'lottie-react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import OrderProcessing from '../../assets/Animations/OrderProcessing.json'
import Delivered from '../../assets/Animations/Delivered.json'
import Shipped from '../../assets/Animations/shipped.json'

function TrackOrder() {
    const location = useLocation()
    const [orderStatus, setOrderStatus] = useState('Pending')
    console.log('orderStatus is', orderStatus)
    useEffect(() => {
        setOrderStatus(location.state?.status)
    }, [location.state])
    return (
        <div className='w-full !min-h-full flex-grow my-20'>
            <div className='max-w-7xl mx-auto px-6 md:px-10 flex justify-center items-center min-h-full'>
                <div className='flex justify-center items-center'>
                    {
                        orderStatus === 'Processing' ?
                            <div className='flex flex-col justify-center items-center'>

                                <Lottie animationData={OrderProcessing} loop={true} style={{width:'200px',height:'200px'}}/>
                                <p className='text-xl'>Your Order is under Processing</p>
                            </div>
                            :
                            orderStatus === 'Shipped' ?
                                <div className='flex flex-col justify-center items-center'>
                                    <Lottie animationData={Shipped} loop={true} style={{width:'200px',height:'200px'}}/>

                                    <p className='text-xl'>Your Order has been dispatched to be delivered</p>
                                </div>
                                :
                                orderStatus === 'Delivered' ?
                                <div className='flex flex-col items-center justify-center'>
                                    <Lottie animationData={Delivered} loop={true} style={{width:'200px',height:'200px'}}/>
                                    <p className='text-xl'>Order has been delivered Successfully</p>
                                </div>
                                     :
                                    orderStatus === 'Cancelled' ?
                                        <p>Order has been cancelled</p> :
                                        'Pending'
                    }
                </div>
            </div>

        </div>
    )
}

export default TrackOrder