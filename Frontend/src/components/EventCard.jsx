import React from 'react'
import Timer from './Timer'
import { useNavigate } from 'react-router'

function EventCard({data}) {
    const navigate = useNavigate()
    const discountedPrice = data?.discounted_price ? true : false
    
    const handleSeeDetails = () => {
        navigate(`/product/${data?._id}`)
    }

    const calculateDiscount = () => {
        if (discountedPrice) {
            const discount = ((data.original_price - data.discounted_price) / data.original_price) * 100
            return Math.round(discount)
        }
        return 0
    }

    return (
        <div className='bg-white px-6 md:px-10 pb-16 md:pt-16 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
            <div className='flex flex-col md:flex-row md:items-center gap-x-20'>
                <div className='w-full md:w-1/3 flex justify-center mb-2 md:mb-0 relative'>
                    <img 
                        src={`${import.meta.env.VITE_API_DEV}/uploads/${data?.images?.[0]}`} 
                        alt="event image" 
                        className='object-cover object-center rounded-lg max-h-64 w-full' 
                    />
                    {discountedPrice && (
                        <div className='absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold'>
                            {calculateDiscount()}% OFF
                        </div>
                    )}
                </div>
                <div className='w-full md:w-2/3'>
                    <div className='text-2xl font-bold pr-10 line-clamp-2 tracking-tight text-gray-800 mb-2'>
                        {data?.product_name}
                    </div>
                    <div className='text-gray-700 mt-2 line-clamp-3 mb-4'>
                        {data?.description}
                    </div>
                    
                    <div className='flex justify-between items-center mt-2 mb-4'>
                        <div className='flex gap-4 items-center'>
                            <div className={`${discountedPrice == false ? 'text-black' : 'text-red-600 line-through'} text-lg font-semibold`}>
                                ${data?.original_price}
                            </div>
                            {discountedPrice && (
                                <div className='text-black text-xl font-bold'>
                                    ${data?.discounted_price}
                                </div>
                            )}
                        </div>
                        <div className='text-green-600 font-semibold text-lg bg-green-50 px-3 py-1 rounded-full'>
                            {data?.sold_out} Sold
                        </div>
                    </div>
                    
                    <div className='mb-6'>
                        <div className='text-sm text-gray-600 mb-2'>Event ends in:</div>
                        <Timer time={data?.finish_date}/>
                    </div>
                    
                    <div className='flex items-center justify-center md:justify-start gap-x-4 flex-wrap gap-y-2'>
                        <button 
                            onClick={handleSeeDetails}
                            className='text-white bg-black hover:bg-gray-800 rounded-xl text-center px-6 py-3 flex justify-center items-center cursor-pointer transition-colors duration-200 min-w-[150px]'
                        >
                            See Details
                        </button>
                        <button 
                            onClick={handleSeeDetails}
                            className='text-black bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl text-center px-6 py-3 flex justify-center items-center cursor-pointer transition-colors duration-200 min-w-[150px]'
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard
