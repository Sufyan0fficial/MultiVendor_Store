import React from 'react'
import Timer from './Timer'
import Lottie from 'lottie-react'
import animationData from '../assets/Animations/Empty.json'

function EventCard({ data }) {
    const discountedPrice = data?.discounted_price ? true : false
    return (

        !data ?
        <div className='w-full flex justify-center items-center'>
            <div style={{ width: 300, height: 300 }}>
                <Lottie animationData={animationData} loop={true} />
                <div className='text-center text-lg font-semibold -mt-6'>No Event currently avilable !</div>
            </div>
        </div>
            :
            <div className='bg-white px-6  md:px-10 pb-16 md:pt-16  rounded-xl'>
                <div className='flex flex-col md:flex-row md:items-center gap-x-20'>
                    <div className='w-full md:w-1/3 flex justify-center mb-2 md:mb-0 '>
                        <img src={`${import.meta.env.VITE_API_DEV}/uploads/${data?.images?.[0]}`} alt="event image" className='object-cover object-center' />
                    </div>
                    <div className='w-full md:w-2/3'>
                        <div className='text-2xl font-bold pr-10 line-clamp-1 tracking-tight text-gray-800'>
                            {data?.product_name}
                        </div>
                        <div className='text-gray-700 mt-2'>
                            {data?.description}
                        </div>
                        <div className='flex justify-between items-center mt-2'>

                            <div className='flex gap-4 items-center'>
                                <div className={`${discountedPrice == false ? 'text-black' : 'text-red-600 line-through'} text-lg font-semibold`}>${data?.original_price}</div>
                                {
                                    discountedPrice &&

                                    <div className='text-black text-lg font-semibold'>${data?.discounted_price}</div>
                                }
                            </div>
                            <div className='text-green-500 font-semibold text-lg'>
                                {data?.sold_out} Sold out
                            </div>
                        </div>
                        <Timer time={data?.finish_date} />
                        <div className='flex items-center justify-center md:justify-start gap-x-10 flex-wrap gap-y-2'  >
                            <div className='text-white bg-black rounded-xl text-center w-[150px] h-[50px] flex justify-center items-center cursor-pointer'>See Details</div>
                            <div className='text-white bg-black rounded-xl text-center w-[150px] h-[50px] flex justify-center items-center cursor-pointer'>Buy Now</div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default EventCard