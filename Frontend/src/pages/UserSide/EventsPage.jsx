import React, { useEffect, useState } from 'react'
import EventCard from '../../components/EventCard'
import { Get_All_Events, Get_Events } from '../../api/routes'
import { Message } from '../../utils/notifymessage'
import { message } from 'antd'

function EventsPage() {
  const [events, setEvents] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(()=>{
    const FetchEvents = async()=>{
      try {
        
        const res  = await Get_All_Events()
        if(res.status === 200){
          setEvents(res.data?.data)
        }
      } catch (error) {
        Message(messageApi, 'error', 'Failed to get events')
      }
    }
    FetchEvents()
  },[])
  return (
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
      </div>
    </div>
  )
}

export default EventsPage