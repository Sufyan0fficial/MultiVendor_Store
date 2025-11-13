import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, message, Upload } from 'antd'
import { RxAvatar } from "react-icons/rx"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { Update_ShopProfile } from '../api/routes'
import { Message } from '../utils/notifymessage'

function EditShopDialog({ open, onClose, shopData, onUpdate }) {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (open && shopData) {
            form.setFieldsValue({
                shop_name: shopData.shop_name,
                email: shopData.email,
                phone: shopData.phone,
                address: shopData.address,
                zip_code: shopData.zip_code
            })
        }
    }, [open, shopData, form])

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('shop_name', values.shop_name)
            formData.append('email', values.email)
            formData.append('phone', values.phone)
            formData.append('address', values.address)
            formData.append('zip_code', values.zip_code)
            
            if (values.password) {
                formData.append('password', values.password)
            }
            
            if (avatar) {
                formData.append('avatar', avatar)
            }

            const res = await Update_ShopProfile(shopData._id, formData)
            
            if (res.status === 200) {
                Message(messageApi, 'success', 'Shop profile updated successfully')
                onUpdate(res.data.data)
                onClose()
                form.resetFields()
                setAvatar(null)
            }
        } catch (error) {
            Message(messageApi, 'error', 'Failed to update shop profile')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        form.resetFields()
        setAvatar(null)
        onClose()
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Edit Shop Profile"
                open={open}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    className="mt-4"
                >
                    <Form.Item
                        label="Shop Name"
                        name="shop_name"
                        rules={[{ required: true, message: 'Shop name is required' }]}
                    >
                        <Input placeholder="Enter shop name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Email is required' },
                            { type: 'email', message: 'Invalid email format' }
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Phone number is required' }]}
                    >
                        <Input placeholder="Enter phone number" />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Address is required' }]}
                    >
                        <Input placeholder="Enter address" />
                    </Form.Item>

                    <Form.Item
                        label="Zip Code"
                        name="zip_code"
                        rules={[{ required: true, message: 'Zip code is required' }]}
                    >
                        <Input placeholder="Enter zip code" />
                    </Form.Item>

                    <Form.Item
                        label="New Password (optional)"
                        name="password"
                    >
                        <div className="relative">
                            <Input 
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Enter new password" 
                            />
                            <div 
                                className="absolute right-3 top-2 cursor-pointer"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item label="Profile Image">
                        <div className="flex items-center gap-4">
                            {avatar ? (
                                <img 
                                    src={URL.createObjectURL(avatar)} 
                                    alt="Avatar" 
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : shopData?.avatar ? (
                                <img 
                                    src={`${import.meta.env.VITE_API_DEV}/uploads/${shopData?.avatar}`} 
                                    alt="Current Avatar" 
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <RxAvatar className="w-12 h-12" />
                            )}
                            <div className=' w-full flex '>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setAvatar(e.target.files[0])}
                                className="hidden"
                                id="avatar-upload"
                                
                            />
                            <label 
                                htmlFor="avatar-upload"
                                className="border px-4 py-2 rounded-md border-gray-400 cursor-pointer hover:bg-gray-50 min-w-max "
                            >
                                Change Image
                            </label>
                            </div>
                        </div>
                    </Form.Item>

                    <div className="flex gap-3 justify-end">
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={loading}
                        >
                            Update Profile
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default EditShopDialog
