import React, { useState } from 'react';
import { Modal, Rate, Input, Upload, Button, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { createReview } from '../api/routes';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const WriteReviewDialog = ({ visible, onClose, product, orderId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    
    const { userData } = useSelector(state => state.UserReducer);

    const handleSubmit = async () => {
        if (rating === 0) {
            messageApi.error('Please provide a rating');
            return;
        }
        if (!comment.trim()) {
            messageApi.error('Please write a comment');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('customer_id', userData._id);
            formData.append('product_id', product._id);
            formData.append('order_id', orderId);
            formData.append('rating', rating);
            formData.append('comment', comment);
            formData.append('customer_name', userData.name);
            formData.append('customer_avatar', userData.avatar || '');

            // Add images to formData
            fileList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append('images', file.originFileObj);
                }
            });

            const response = await createReview(formData);
            
            if (response.status === 201) {
                messageApi.success('Review submitted successfully!');
                // Reset form
                setRating(0);
                setComment('');
                setFileList([]);
                onClose();
            }
        } catch (error) {
            console.log('error is',error)
            messageApi.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setRating(0);
        setComment('');
        setFileList([]);
        onClose();
    };

    const uploadProps = {
        fileList,
        onChange: ({ fileList: newFileList }) => setFileList(newFileList),
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                messageApi.error('You can only upload image files!');
                return false;
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                messageApi.error('Image must be smaller than 5MB!');
                return false;
            }
            return false; // Prevent auto upload
        },
        listType: 'picture-card',
        maxCount: 5,
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            {contextHolder}
            <Modal
                title="Write a Review"
                open={visible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        loading={loading}
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Submit Review
                    </Button>,
                ]}
                width={600}
                className="write-review-modal"
            >
                <div className="space-y-6">
                    {/* Product Info */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img 
                            src={`${import.meta.env.VITE_API_DEV}/uploads/${product?.images?.[0]}`}
                            alt={product?.product_name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                            <h4 className="font-medium text-gray-800">{product?.product_name}</h4>
                            <p className="text-sm text-gray-600">Share your experience with this product</p>
                        </div>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating *
                        </label>
                        <Rate 
                            value={rating} 
                            onChange={setRating}
                            className="text-2xl"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {rating === 0 && 'Please select a rating'}
                            {rating === 1 && 'Poor'}
                            {rating === 2 && 'Fair'}
                            {rating === 3 && 'Good'}
                            {rating === 4 && 'Very Good'}
                            {rating === 5 && 'Excellent'}
                        </p>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review *
                        </label>
                        <TextArea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts about this product..."
                            rows={4}
                            maxLength={500}
                            showCount
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Add Photos (Optional)
                        </label>
                        <Upload {...uploadProps}>
                            {fileList.length >= 5 ? null : uploadButton}
                        </Upload>
                        <p className="text-xs text-gray-500 mt-1">
                            Upload up to 5 images (max 5MB each)
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default WriteReviewDialog;
