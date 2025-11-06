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

function AllOrders() {
    const [Orders, setOrders] = useState([])
    console.log('products are', Orders)
    const [messageApi, contextHolder] = message.useMessage()
    const { screenWidth } = useSelector(state => state?.UtilReducer)
    const navigate = useNavigate()
    const headers = [
        { key: "_id", name: "Product ID" },
        { key: "total_price", name: "Total Price" },
        { key: 'payment_status', name: 'payment Status' },
        { key: 'order_status', name: 'Order Status' },
        { key: 'view_detail', name: 'View Details' }
    ];
    const {sellerData} = useSelector(state=>state?.SellerReducer)

    useEffect(()=>{
        const FetchVendorOrders = async ()=>{
            try {
                const res = await getVendorOrders(sellerData?._id)
                if(res.status === 200){
                    const orders = res.data?.data?.length > 0 && res.data?.data?.map((item)=>({...item,view_detail:<MdOutlineArrowOutward onClick={()=>navigate(`/shop/orders/${item?._id}`)}/>,
                    }))
                    setOrders(orders)
                }
            } catch (error) {
                console.log('error is',error)
                Message(messageApi,'error','Failed to fetch Orders')
            }
        }
        FetchVendorOrders()
    },[])

    
    return (
        <div className='min-h-full border border-gray-200 border-r-0 border-t-0 rounded-xl'>
            {contextHolder}
            <ProfileTable headers={headers} className={'min-w-[1000px]'} data={Orders} messageApi={messageApi} setData={setOrders} />

        </div>
    )
}

export default AllOrders