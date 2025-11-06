import React, { useEffect, useState } from 'react'
import ProfileTable from '../../components/Table'
import { Form, Input, message, Select } from 'antd';
import { Create_Coupon, DeleteCoupon, Get_Coupons } from '../../api/routes';
import { Message } from '../../utils/notifymessage';
import { useSelector } from 'react-redux';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';

function CouponCodes() {
    const { screenWidth } = useSelector(state => state?.UtilReducer)
    const [isCreateCoupon, setIsCreateCoupon] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()
    const { sellerData } = useSelector(state => state?.SellerReducer)
    const [coupons, setCoupons] = useState([])
    console.log('coupons are', coupons)
    useEffect(() => {
        const FetchCoupons = async () => {
            try {
                const res = await Get_Coupons(sellerData?._id)
                if (res.status === 200) {
                    const data = res.data?.data?.length > 0 && res.data?.data?.map((item, index) => ({
                        ...item, delete: <MdOutlineDelete size={screenWidth <= 768 ? 20 : 22} className='cursor-pointer hover:text-red-500 text-gray-500' />

                    }))
                    setCoupons(data)
                }
            } catch (error) {
                Message(messageApi, 'error', 'Something went wrong while fetching coupons')
            }
        }
        FetchCoupons()
    }, [])
    const headers = [
        { key: "_id", name: "ID" },
        { key: "coupon_name", name: "Coupon Code" },
        { key: "discount", name: "Discount %" },
        { key: "delete", name: "Delete" },
    ];
    const handleCreateCoupon = async (values) => {
        try {
            const res = await Create_Coupon({ ...values, shop_id: sellerData?._id })
            if (res.status === 200) {
                const data = res.data?.data?.length > 0 && res.data?.data?.map((item, index) => ({
                    ...item, delete: <MdOutlineDelete size={screenWidth <= 768 ? 20 : 22} className='cursor-pointer hover:text-red-500 text-gray-500' />

                }))
                Message(messageApi, 'success', 'Coupon created successfully')
                setTimeout(() => {

                    setIsCreateCoupon(false)
                    setCoupons(data)
                }, 1000)
            }
        } catch (error) {
            Message(messageApi, 'error', (error.response?.data?.message || 'Something went wrong'))

        }
    }

    const handleDeleteCoupon = async (data) => {
        try {
            const res = await DeleteCoupon(data?._id)
            if (res.status === 200) {
                Message(messageApi, 'success', 'Coupon Deleted Successfully')
                const data = res.data?.data?.length > 0 && res.data?.data?.map((item, index) => ({ ...item, delete: <MdOutlineDelete size={screenWidth <= 768 ? 20 : 22} className='cursor-pointer hover:text-red-500 text-gray-500' /> }))
                setTimeout(() => {
                    setCoupons(data)
                }, 1000);
            }
        } catch (error) {
            Message(messageApi, 'error', 'Oops something went wrong')
        }
    }


    return (
        <div>
            {contextHolder}
            <div className='w-full flex justify-end items-center mb-6'>
                    <button className='bg-black text-white px-6 py-[10px] cursor-pointer flex items-center justify-center rounded-md text-xs md:text-base mt-4' onClick={() => setIsCreateCoupon(pre => !pre)}>
                        {
                            isCreateCoupon ? 'Return to Coupons List' : 'Create Coupon Code'
                        }
                    </button>
            </div>
            <div>
                {
                    isCreateCoupon ?
                        <div>
                            {contextHolder}
                            <div className='text-xl md:text-2xl tracking-tight  text-center font-semibold md:font-bold mb-6 md:mb-10 mt-4 md:mt-6'>
                                Create Coupon Code
                            </div>
                            <Form
                                name='Create Coupon'
                                onFinish={handleCreateCoupon}
                                className='grid grid-cols-1 md:grid-cols-2 gap-x-6 grid-flow-row-dense'
                                layout='vertical'
                            >
                                <Form.Item
                                    name='coupon_name'
                                    label='Name'
                                    rules={[{ required: true, message: 'Coupon Name is required' }]}


                                >
                                    <Input placeholder='Enter coupon name' className='md:!py-2' />
                                </Form.Item>


                                <Form.Item
                                    name='discount'
                                    label='Discount (%)'
                                    rules={[{ required: true, message: 'Dicount % is required' }]}
                                >
                                    <Input placeholder='Enter Discount Percentage' className='md:!py-2' type='number' min={1} max={100} />
                                </Form.Item>
                                <Form.Item
                                    name='min_amount'
                                    label='Minimum Amount'

                                >
                                    <Input placeholder='Min. amount to apply coupon code' type='number' className='md:!py-2' min={0} />
                                </Form.Item>
                                <Form.Item
                                    name='max_amount'
                                    label='Maximum Amount'
                                >
                                    <Input placeholder='Max amount beyond which coupon is inapplicable' type='number' className='md:!py-2' min={0} />
                                </Form.Item>
                                <Form.Item
                                    name='selected_product'
                                    label='Category'
                                    rules={[{ required: true, message: 'Category is required' }]}
                                    initialValue={''}
                                >
                                    <Select className='selector-padding md:!h-[40px]'>
                                        <Select.Option value=''>Choose a category</Select.Option>
                                        <Select.Option value='computers'>Computers and Laptops</Select.Option>
                                        <Select.Option value='cosmetics'>Cosmetics and Body Care</Select.Option>
                                        <Select.Option value='accessories'>Accessories</Select.Option>
                                        <Select.Option value='clothes'>Clothes</Select.Option>
                                        <Select.Option value='shoes'>Shoes</Select.Option>
                                        <Select.Option value='gifts'>Gifts</Select.Option>
                                        <Select.Option value='pets'>Pet Cares</Select.Option>
                                        <Select.Option value='mobile'>Mobile and Tablets</Select.Option>
                                        <Select.Option value='gaming'>Gaming and Music</Select.Option>
                                        <Select.Option value='others'>Others</Select.Option>
                                    </Select>
                                </Form.Item>


                                <button className='w-full md:col-span-2 text-center flex justify-center mt-6 mb-20' type='submit'>
                                    <div className='border md:w-1/2 w-full py-2 rounded-md cursor-pointer hover:bg-white hover:border-gray-400 transition-all duration-300'>
                                        Submit
                                    </div>
                                </button>
                            </Form>
                        </div>
                        :
                        <div className='border border-r-0 border-gray-200 rounded-xl'>

                            <ProfileTable headers={headers} className={'min-w-[800px]'} data={coupons} handleDelete={handleDeleteCoupon} />
                        </div>
                }
            </div>
        </div>
    )
}

export default CouponCodes