import { Form, Input, message, Select, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go';
import { Trimmer } from '../../utils/trimmer';
import { useSelector } from 'react-redux';
import { Create_Product } from '../../api/routes';
import { Message } from '../../utils/notifymessage';

function CreateProduct() {
    const [fileList, setFileList]  = useState([])
    const [loading, setLoading] = useState(false)
    const {sellerData} =  useSelector(state=>state?.SellerReducer)
    const [messageApi, contextHolder] = message.useMessage()
    const [form] = Form.useForm()

    console.log('file list si',fileList)
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const handleCreateProduct = async(values) => {
        console.log('values are',values)
        const formData = new FormData()
        const files = values?.images
        const discount = values?.discounted_price ? true : false
        files?.forEach((item)=>{
            formData?.append('images',item?.originFileObj)
        })
        formData.append('product_name',values?.product_name)
        formData.append('description',values?.description)
        formData.append('category',values?.category)
        formData.append('tags',values?.tags)
        formData.append('original_price',Number(values?.original_price))
        formData.append('discounted_price',(Number(values?.discounted_price || 0) ))
        formData.append('shop_id',sellerData?._id)
        formData.append('stock',Number(values?.stock))
        formData.append('discount',discount)

        try {
            setLoading(true)
            const res = await Create_Product(formData)
            if(res.status ===  201){
                Message(messageApi, 'success', 'Product created successfully')
                form.resetFields()
                setFileList([])
                setLoading(false)
                
            }
        } catch (error) {
            Message(messageApi,'error','Something went wrong')
        }

    }
    return (
        <div>
            {contextHolder}
            <div className='text-xl md:text-2xl tracking-tight  text-center font-semibold md:font-bold mb-6 md:mb-10 mt-4 md:mt-6'>
                Create Product
            </div>
            <Form
                name='Create Product'
                onFinish={handleCreateProduct}
                className='grid grid-cols-1 md:grid-cols-2 gap-x-6 grid-flow-row-dense'
                layout='vertical'
                form={form}
            >
                <Form.Item
                    name='product_name'
                    label='Name'
                    rules={[{ required: true, message: 'Product Name is required' }]}


                >
                    <Input placeholder='HeadPhone' className='md:!py-2' />
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
                    rules={[{required:true, message:'Product Stock is required'}]}
                >
                    <Input placeholder='2' type='number' className='md:!py-2' />
                </Form.Item>
                <Form.Item className='md:col-span-2' name='images' label="Upload" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Product Images are required' }]}>
                    <Upload listType="picture-card" accept='image/*' multiple={true} beforeUpload={()=>false} fileList={fileList} onChange={({fileList:newList})=>setFileList(newList)} maxCount={3}>

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

export default CreateProduct