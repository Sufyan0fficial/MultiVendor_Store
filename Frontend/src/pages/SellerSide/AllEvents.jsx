import React, { useEffect, useState } from 'react'
import ProfileTable from '../../components/Table';
import { useSelector } from 'react-redux';
import { DeleteEvent, Get_Events, Get_Products } from '../../api/routes';
import { message } from 'antd';
import { Message } from '../../utils/notifymessage';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';
import Lottie from 'lottie-react';
import animationData from '../../assets/Animations/ShopingCart.json'

function AllEvents() {
    const [Events, setEvents] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const { screenWidth } = useSelector(state => state?.UtilReducer)
    const [loading, setLoading] = useState(false)
    const headers = [
        { key: "_id", name: "Product ID" },
        { key: "product_name", name: "Name" },
        { key: "original_price", name: "Price" },
        { key: "stock", name: "Stock" },
        { key: "sold_out", name: "Sold out" },
        { key: "delete", name: "Delete" },
    ];
    const { sellerData } = useSelector(state => state?.SellerReducer)
    useEffect(() => {
        const getEvents = async () => {
            setLoading(true)
            try {
                const res = await Get_Events(sellerData?._id)
                if (res.status === 200) {
                    const data = res.data?.data?.length > 0 && res.data?.data?.map((item, index) => ({
                        ...item,
                        //  preview: <IoEyeOutline size={screenWidth <= 768 ? 20 : 25} className='cursor-pointer hover:text-green-600 text-gray-500' />,
                         delete: <MdOutlineDelete size={screenWidth <= 768 ? 20 : 25} className='cursor-pointer hover:text-red-500 text-gray-500' onClick={()=>handleDeleteEvent(item)}/>

                    }))
                    setEvents(data)
                }
            } catch (error) {
                Message(messageApi, 'error', 'Something went Wrong')
            }
            finally {
                setLoading(false)
            }
        }
        getEvents()
    }, [])

    const handleDeleteEvent = async (data) => {
        try {
            const res = await DeleteEvent(data?._id)
            if (res.status === 200) {
                Message(messageApi, 'success', 'Event Deleted Successfully')
                const data = res.data?.data?.length > 0 && res.data?.data?.map((item, index) => ({
                    ...item,
                    //  preview: <IoEyeOutline size={screenWidth <= 768 ? 20 : 25} className='cursor-pointer hover:text-green-600 text-gray-500' />,
                     delete: <MdOutlineDelete size={screenWidth <= 768 ? 20 : 25} className='cursor-pointer hover:text-red-500 text-gray-500' onClick={()=>handleDeleteEvent(item)}/>

                }))
                setEvents(data)
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
                <ProfileTable headers={headers} className={'min-w-[1200px]'} data={Events} type={'event'} handleDelete={handleDeleteEvent} />

            </div>
    )
}

export default AllEvents