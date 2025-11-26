import React, { useEffect, useState } from 'react'
import EventCard from '../../components/EventCard'
import { Get_All_Events, Get_Events } from '../../api/routes'
import { Message } from '../../utils/notifymessage'
import { message } from 'antd'
import Lottie from 'lottie-react'
import animationData from '../../assets/Animations/ShopingCart.json'


function EventsPage() {
  const [events, setEvents] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    const FetchEvents = async()=>{
      setLoading(true)
      try {
        
        const res  = await Get_All_Events()
        if(res.status === 200){
          setEvents(res.data?.data)
        }
      } catch (error) {
        Message(messageApi, 'error', 'Failed to get events')
      }
      finally{
        setLoading(false)
      }
    }
    FetchEvents()
  },[])
  return (
    loading ?
     <div className='min-h-[calc(100vh-200px)] flex justify-center items-center w-full'>

          <div style={{ width: 300, height: 300 }}>
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
        :
    <div className='mt-16 md:my-20 mb-16 bg-[#f6f6f5] mx-auto max-w-7xl px-6 md:px-10 '>
      {contextHolder}
      <div>
        {
          events?.length > 0 && 
          events.map((item,index)=>{
            return(

              <EventCard data={item}/>
            )
          })
        }
        {
            events?.length === 0 &&
            <div className='text-black text-lg text-center w-full'>
              No Event Found !
            </div>
          }
      </div>
    </div>
  )
}

export default EventsPage