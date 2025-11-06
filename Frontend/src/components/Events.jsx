import React from 'react'
import EventCard from './EventCard'
import { useNavigate } from 'react-router'
import { RxArrowRight } from 'react-icons/rx'

function Events({ data }) {
  const navigate = useNavigate()
  return (
    <div className='w-full'>
      <div className='w-full md:max-w-7xl mx-auto px-4 md:px-10'>
        <div className='flex justify-between items-start  my-12'>

          <div className='text-2xl md:text-3xl font-bold text-black '>Popular Event</div>

          <div className='min-w-max mt-2 flex items-center gap-1 cursor-pointer hover:text-green-500 transition-colors duration-300 ease-in' onClick={() => navigate('/events')}>
            <div>

              See All
            </div>
            <RxArrowRight />
          </div>
        </div>
        <EventCard data={data} />
      </div>
    </div>
  )
}

export default Events