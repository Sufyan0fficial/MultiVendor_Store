import { DatePicker, Form, Input, message, Select, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go';
import { Trimmer } from '../../utils/trimmer';
import { useSelector } from 'react-redux';
import { Create_Event, Create_Product } from '../../api/routes';
import { Message } from '../../utils/notifymessage';
import dayjs from 'dayjs';

function CreateEvent() {
    const [fileList, setFileList] = useState([])
    const [loading, setLoading] = useState(false)
    const { sellerData } = useSelector(state => state?.SellerReducer)
    const [messageApi, contextHolder] = message.useMessage()
    const [startDate, setStartDate] = useState(null);

    // Disable past dates for start date
    const disableStartDate = (current) => {
        return current && current < dayjs().startOf("day");
    };

    // Disable end dates less than 3 days after start date
    const disableEndDate = (current) => {
        if (!startDate) {
            return true; // disable all until start date is selected
        }
        const minEndDate = dayjs(startDate).add(3, "day").startOf("day");
        return current && current < minEndDate;
    };

    console.log('file list si', fileList)
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const handleCreateEvent = async (values) => {
        console.log('values are', values)
        const formData = new FormData()
        const startDate = new Date(values?.start_date)
        const finishDate = new Date(values?.finish_date)
        const files = values?.images
        files?.forEach((item) => {
            formData?.append('images', item?.originFileObj)
        })
        formData.append('product_name', values?.product_name)
        formData.append('description', values?.description)
        formData.append('category', values?.category)
        formData.append('tags', values?.tags)
        formData.append('original_price', Number(values?.original_price))
        formData.append('discounted_price', (Number(values?.discounted_price || 0)))
        formData.append('shop_id', sellerData?._id)
        formData.append('stock', Number(values?.stock))
        formData.append('start_date', startDate)
        formData.append('finish_date', finishDate)
        console.log('form data is', [...formData.entries()])

        try {
            setLoading(true)
            const res = await Create_Event(formData)
            if (res.status === 201) {
                Message(messageApi, 'success', 'Event created successfully')

            }
        } catch (error) {
            Message(messageApi, 'error', 'Something went wrong')
        }

    }
    return (
        <div>
            {contextHolder}
            <div className='text-xl md:text-2xl tracking-tight  text-center font-semibold md:font-bold mb-6 md:mb-10 mt-4 md:mt-6'>
                Create Event
            </div>
            <Form
                name='Create Event'
                onFinish={handleCreateEvent}
                className='grid grid-cols-1 md:grid-cols-2 gap-x-6 grid-flow-row-dense'
                layout='vertical'
            >
                <Form.Item
                    name='product_name'
                    label='Name'
                    rules={[{ required: true, message: 'Product Name is required' }]}


                >
                    <Input placeholder='Event Product Name' className='md:!py-2' />
                </Form.Item>
                <Form.Item
                    name='description'
                    label='Description'
                    rules={[{ required: true, message: 'Description is required' }]}
                >
                    <TextArea rows={1} placeholder='description' className='md:!py-2' />
                </Form.Item>
                <Form.Item
                    name='category'
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
                <Form.Item
                    name='tags'
                    label='Tags'
                >
                    <Input placeholder='Enter your Product Tags' className='md:!py-2' />
                </Form.Item>
                <Form.Item
                    name='original_price'
                    label='Original Price'
                    rules={[{ required: true, message: 'Original Price is required' }]}
                >
                    <Input placeholder='Enter Original Price' type='number' className='md:!py-2' />
                </Form.Item>
                <Form.Item
                    name='discounted_price'
                    label='Discounted Price'
                >
                    <Input placeholder='Enter Original Price' type='number' className='md:!py-2' />
                </Form.Item>
                <Form.Item
                    name='stock'
                    label='Stock'
                    rules={[{ required: true, message: 'Product Stock is required' }]}
                >
                    <Input placeholder='2' type='number' className='md:!py-2' />
                </Form.Item>
                <Form.Item
                    name='start_date'
                    label='Start Date'
                    rules={[{ required: true, message: 'Start Date is required' }]}
                >
                    <DatePicker showTime format={'YYY-MM-DD HH:mm'} disabledDate={disableStartDate}
                        onChange={(date) => setStartDate(date)} />
                </Form.Item>
                <Form.Item
                    name='finish_date'
                    label='Finish Date'
                    rules={[{ required: true, message: 'Finish Date is required' }]}
                >
                    <DatePicker showTime format={'YYY-MM-DD HH:mm'} disabledDate={disableEndDate}
                        disabled={!startDate} />
                </Form.Item>
                <Form.Item className='md:col-span-2' name='images' label="Upload" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Product Images are required' }]}>
                    <Upload listType="picture-card" accept='image/*' multiple={true} beforeUpload={() => false} fileList={fileList} onChange={({ fileList: newList }) => setFileList(newList)} maxCount={3}>

                        <button
                            className='flex flex-col items-center justify-center'
                        >
                            <GoPlus />

                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <button className='w-full md:col-span-2 text-center flex justify-center mt-6 mb-20' type='submit'>
                    <div className='border md:w-1/2 w-full py-2 rounded-md cursor-pointer hover:bg-white hover:border-gray-400 transition-all duration-300'>
                        Submit
                    </div>
                </button>
            </Form>
        </div>
    )
}

export default CreateEvent