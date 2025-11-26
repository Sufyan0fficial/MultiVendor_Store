import React from 'react'
import ProfileTable from '../../components/Table'
import { useEffect } from 'react'
import { getVendorOrders } from '../../api/routes'
import useSelection from 'antd/es/table/hooks/useSelection'
import { useSelector } from 'react-redux'
import { Message } from '../../utils/notifymessage'
import { useState } from 'react'
import { message } from 'antd'
import { MdOutlineArrowOutward } from 'react-icons/md'
import { useNavigate } from 'react-router'
import Lottie from 'lottie-react'
import animationData from '../../assets/Animations/ShopingCart.json'

function AllOrders() {
    const [Orders, setOrders] = useState([])
    console.log('products are', Orders)
    const [messageApi, contextHolder] = message.useMessage()
    const { screenWidth } = useSelector(state => state?.UtilReducer)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const headers = [
        { key: "_id", name: "Product ID" },
        { key: "total_price", name: "Total Price" },
        { key: 'payment_status', name: 'payment Status' },
        { key: 'order_status', name: 'Order Status' },
        { key: 'view_detail', name: 'View Details' }
    ];
    const { sellerData } = useSelector(state => state?.SellerReducer)

    useEffect(() => {
        const FetchVendorOrders = async () => {
            setLoading(true)
            try {
                const res = await getVendorOrders(sellerData?._id)
                if (res.status === 200) {
                    const orders = res.data?.data?.length > 0 && res.data?.data?.map((item) => ({
                        ...item, view_detail: <MdOutlineArrowOutward onClick={() => navigate(`/shop/orders/${item?._id}`)} className='cursor-pointer' />,
                    }))
                    setOrders(orders)
                }
            } catch (error) {
                console.log('error is', error)
                Message(messageApi, 'error', 'Failed to fetch Orders')
            }
            finally {
                setLoading(false)
            }
        }
        FetchVendorOrders()
    }, [])


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
                <ProfileTable headers={headers} className={'min-w-[1000px]'} data={Orders} messageApi={messageApi} setData={setOrders} />

            </div>
    )
}

export default AllOrders