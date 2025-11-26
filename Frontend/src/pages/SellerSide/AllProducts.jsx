import React, { useEffect, useState } from 'react'
import ProfileTable from '../../components/Table';
import { useSelector } from 'react-redux';
import { DeleteProduct, Get_Products } from '../../api/routes';
import { message } from 'antd';
import { Message } from '../../utils/notifymessage';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';
import Lottie from 'lottie-react';
import animationData from '../../assets/Animations/ShopingCart.json'
import { useNavigate } from 'react-router';

function AllProducts() {
    const [products, setProducts] = useState([])
    console.log('products are', products)
    const [messageApi, contextHolder] = message.useMessage()
    const { screenWidth } = useSelector(state => state?.UtilReducer)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const headers = [
        { key: "_id", name: "Product ID" },
        { key: "product_name", name: "Name" },
        { key: "original_price", name: "Price" },
        { key: "stock", name: "Stock" },
        { key: "sold_out", name: "Sold out" },
        { key: "preview", name: "Preview" },
        { key: "delete", name: "Delete" },
    ];
    const { sellerData } = useSelector(state => state?.SellerReducer)
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const res = await Get_Products(sellerData?._id)
                if (res.status === 200) {
                    const data = res.data?.data?.length > 0 && res.data?.data?.map((item, index) => {
                          const productId = item?.product_name?.replaceAll(" ", "-")

                        return (

                            {
                                ...item, preview: <IoEyeOutline size={screenWidth <= 768 ? 20 : 25} className='cursor-pointer hover:text-green-600 text-gray-500' onClick={() => navigate(`/products/${productId}`, { state: { product_id: item?._id } })} />
                                , delete: <MdOutlineDelete size={screenWidth <= 768 ? 20 : 25} className='cursor-pointer hover:text-red-500 text-gray-500' />

                            }
                        )
                    }
                    )
                    setProducts(data)
                }
            } catch (error) {
                Message(messageApi, 'error', 'Something went Wrong')
            }
            finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [])

    const handleDeleteProduct = async (data) => {
        try {
            const res = await DeleteProduct(data?._id)
            if (res.status === 200) {
                Message(messageApi, 'success', 'Product Deleted Successfully')
                const data = res.data?.data?.length > 0 && res.data?.data?.map((item, index) => ({
                    ...item, preview: <IoEyeOutline size={screenWidth <= 768 ? 20 : 25} className='cursor-pointer hover:text-green-600 text-gray-500' />
                    , delete: <MdOutlineDelete size={screenWidth <= 768 ? 20 : 25} className='cursor-pointer hover:text-red-500 text-gray-500' />

                }))
                setProducts(data)
            }
        } catch (error) {
            Message(messageApi, 'error', 'Oops something went wrong')
        }
    }
    return (
        loading ?
            <div className='min-h-[calc(100vh-200px)] flex justify-center items-center w-full'>

                <div style={{ width: 300, height: 300 }}>
                    <Lottie animationData={animationData} loop={true} />
                </div>
            </div>
            :

            <div className='min-h-full border border-gray-200 border-r-0 border-t-0 rounded-xl'>
                {contextHolder}
                <ProfileTable headers={headers} className={'min-w-[1400px]'} data={products} type={'product'} messageApi={messageApi} setData={setProducts} handleDelete={handleDeleteProduct} />

            </div>
    )
}

export default AllProducts