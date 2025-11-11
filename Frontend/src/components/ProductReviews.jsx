import React, { useState, useEffect } from 'react';
import { Rate, Avatar, Image, Empty, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getProductReviews } from '../api/routes';

const ProductReviews = ({ productId, setReviews, reviews }) => {
    const [loading, setLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        if (productId) {
            fetchReviews();
        }
    }, [productId]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await getProductReviews(productId);
            if (response.status === 200) {
                const reviewsData = response.data.data;
                setReviews(reviewsData);
                
                // Calculate average rating
                if (reviewsData.length > 0) {
                    const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
                    setAverageRating(totalRating / reviewsData.length);
                }
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className=" rounded-lg p-6 w-full ">
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Reviews</h3>
                {reviews.length > 0 && (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Rate disabled value={averageRating} allowHalf />
                            <span className="text-lg font-medium text-gray-700">
                                {averageRating.toFixed(1)}
                            </span>
                        </div>
                        <span className="text-gray-600">
                            ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                        </span>
                    </div>
                )}
            </div>

            {reviews.length === 0 ? (
                <Empty 
                    description="No reviews yet" 
                    className="py-8"
                />
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex items-start gap-4">
                                <Avatar 
                                    size={48}
                                    src={review.customer_avatar ? 
                                        `${import.meta.env.VITE_API_DEV}/uploads/${review.customer_avatar}` : 
                                        null
                                    }
                                    icon={<UserOutlined />}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                {review.customer_name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(review.createdAt)}
                                            </p>
                                        </div>
                                        <Rate disabled value={review.rating} className="text-sm" />
                                    </div>
                                    
                                    <p className="text-gray-700 mb-3 leading-relaxed">
                                        {review.comment}
                                    </p>
                                    
                                    {/* Review Images */}
                                    {review.images && review.images.length > 0 && (
                                        <div className="flex gap-2 flex-wrap">
                                            <Image.PreviewGroup>
                                                {review.images.map((image, index) => (
                                                    <Image
                                                        key={index}
                                                        width={80}
                                                        height={80}
                                                        src={`${import.meta.env.VITE_API_DEV}/uploads/${image}`}
                                                        className="rounded-lg object-cover"
                                                        alt={`Review image ${index + 1}`}
                                                    />
                                                ))}
                                            </Image.PreviewGroup>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
