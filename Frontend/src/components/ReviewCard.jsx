import React, { useState } from 'react'
import { Rate, Modal } from 'antd'

function ReviewCard({ review }) {
    const [previewImage, setPreviewImage] = useState(null)
    const [previewVisible, setPreviewVisible] = useState(false)

    const handleImagePreview = (image) => {
        setPreviewImage(image)
        setPreviewVisible(true)
    }

    return (
        <>
            <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'>
                <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0'>
                        {review?.customer_avatar ? (
                            <img 
                                src={`${import.meta.env.VITE_API_DEV}/uploads/${review.customer_avatar}`} 
                                alt={review.customer_name}
                                className='w-12 h-12 rounded-full object-cover border-2 border-gray-100'
                            />
                        ) : (
                            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center'>
                                <span className='text-white font-semibold text-lg'>
                                    {review?.customer_name?.charAt(0)?.toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    <div className='flex-1'>
                        <div className='flex items-center justify-between mb-2'>
                            <h4 className='font-semibold text-gray-900 text-lg'>{review.customer_name}</h4>
                            <span className='text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md'>
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        
                        <div className='mb-3'>
                            <Rate disabled defaultValue={review.rating} className='text-sm' />
                            <span className='ml-2 text-sm text-gray-600'>({review.rating}/5)</span>
                        </div>
                        
                        <p className='text-gray-700 mb-4 leading-relaxed'>{review.comment}</p>
                        
                        {review.images && review.images.length > 0 && (
                            <div className='flex gap-2 flex-wrap'>
                                {review.images.map((image, index) => (
                                    <img 
                                        key={index}
                                        src={`${import.meta.env.VITE_API_DEV}/uploads/${image}`}
                                        alt={`Review image ${index + 1}`}
                                        className='w-20 h-20 object-cover rounded-md border cursor-pointer hover:opacity-80 transition-opacity'
                                        onClick={() => handleImagePreview(image)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                open={previewVisible}
                title="Review Image"
                footer={null}
                onCancel={() => setPreviewVisible(false)}
                centered
            >
                <img 
                    src={`${import.meta.env.VITE_API_DEV}/uploads/${previewImage}`}
                    alt="Preview"
                    className='w-full h-auto'
                />
            </Modal>
        </>
    )
}

export default ReviewCard
