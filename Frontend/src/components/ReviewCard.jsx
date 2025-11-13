import React from 'react'
import { Rate } from 'antd'

function ReviewCard({ review }) {
    return (
        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'>
            <div className='flex items-start gap-4'>
                {/* Customer Avatar */}
                <div className='flex-shrink-0'>
                    {review?.customer_avatar ? (
                        <img 
                            src={`${import.meta.env.VITE_API_DEV}/uploads/${review.customer_avatar}`} 
                            alt={review.customer_name}
                            className='w-12 h-12 rounded-full object-cover border-2 border-gray-200'
                        />
                    ) : (
                        <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-lg'>
                            {review?.customer_name?.charAt(0)?.toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Review Content */}
                <div className='flex-1'>
                    <div className='flex items-center justify-between mb-2'>
                        <h4 className='font-semibold text-gray-800 text-lg'>
                            {review.customer_name}
                        </h4>
                        <span className='text-sm text-gray-500'>
                            {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className='mb-3'>
                        <Rate disabled defaultValue={review.rating} className='text-sm' />
                        <span className='ml-2 text-sm text-gray-600'>
                            ({review.rating}/5)
                        </span>
                    </div>

                    {/* Comment */}
                    <p className='text-gray-700 mb-4 leading-relaxed'>
                        {review.comment}
                    </p>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                        <div className='flex gap-2 flex-wrap'>
                            {review.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`${import.meta.env.VITE_API_DEV}/uploads/${image}`}
                                    alt={`Review image ${index + 1}`}
                                    className='w-16 h-16 object-cover rounded-md border border-gray-200 hover:scale-105 transition-transform duration-200 cursor-pointer'
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
