import React from 'react'
import ProfileUpdate from './ProfileUpdate'
import ProfileTable from './Table.jsx'
import Logout from './Logout.jsx'
import Addresses from './Addresses.jsx';
import { useEffect } from 'react';
import { getCustomerOrders } from '../api/routes.js';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Message } from '../utils/notifymessage.js';
import { message } from 'antd';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { useNavigate } from 'react-router';

function ProfilePageWrapper({activeMenu, setActiveMenu}) {
    const [customerOrders, setCustomerOrders] = useState([])
    const {userData} = useSelector(state=>state?.UserReducer)
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    
    const headers = [
        { key: "_id", name: "Order ID" },
        { key: "total_price", name: "Total Price" },
        { key: "order_status", name: "Order Status" },
        { key: "payment_status", name: "Payment Status" },
        { key: "view_detail", name: "View Detail" },
    ];

    useEffect(()=>{
        const handleGetCustomerOrders = async()=>{
            try {
                const res = await getCustomerOrders(userData?._id)
                if(res.status === 200){
                    const data = res.data?.data && res.data?.data?.map((item,i)=>{
                        return(
                            {
                                ...item,view_detail : <MdOutlineArrowOutward onClick={()=>navigate(`/orders/${item?._id}`)} className='cursor-pointer'/>
                            }
                        )
                    })
                    setCustomerOrders(data)
                }
            } catch (error) {
                Message(messageApi,'error','Failed to get Orders data')
            }
        }
        handleGetCustomerOrders()
    },[])


    const orders = [
        { _id: "ORD-1001", status: "Reviewed", Qty: 3, total: 2450 },
        { _id: "ORD-1002", status: "Processing", Qty: 3, total: 2450 },
        { _id: "ORD-1003", status: "Delivered", Qty: 5, total: 2450 },
        { _id: "ORD-1004", status: "Processing", Qty: 3, total: 2450 },
        { _id: "ORD-1005", status: "Pending", Qty: 2, total: 2450 },
        { _id: "ORD-1006", status: "Processing", Qty: 3, total: 2450 },
        { _id: "ORD-1007", status: "Processing", Qty: 1, total: 2450 },
        { _id: "ORD-1008", status: "Pending", Qty: 3, total: 2450 },
        { _id: "ORD-1009", status: "Completed", Qty: 6, total: 2450 },
        { _id: "ORD-1010", status: "Delivering", Qty: 3, total: 2450 },
    ];
  return (
    <div className='max-h-[calc(100vh-60px)] md:max-h-[calc(100vh-200px)] border border-gray-200 px-3 md:px-6 rounded-xl overflow-x-auto overflow-y-auto w-full'>
        {
            contextHolder
        }
        {
            activeMenu === 1 &&
        <ProfileUpdate />
        }
        {
            activeMenu === 2 &&
        <ProfileTable headers={headers} data={customerOrders} className={'min-w-[1000px]'}/>
        }
        {
            activeMenu === 3 &&
        <ProfileTable headers={headers} data={orders} className={'min-w-[800px]'}/>
        }
        {
            activeMenu === 5 &&
        <ProfileTable headers={headers} data={orders} className={'min-w-[800px]'}/>
        }
        {
            activeMenu === 8 &&
        <Logout setActiveMenu={setActiveMenu}/>
        }
        {
            activeMenu === 7 &&
        <Addresses />
        }
        
    </div>
  )
}

export default ProfilePageWrapper