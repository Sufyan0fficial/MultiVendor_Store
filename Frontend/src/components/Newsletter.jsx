import React from 'react'

function Newsletter() {
  return (
    <div className='w-full bg-[#342ac8] px-6 md:px-10 py-10 mt-20'>
        <div className='md:max-w-7xl w-full  mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10'>
            <div className='text-2xl md:text-3xl font-bold text-white md:leading-relaxed leading-8'>
                <span className='text-[#56D879]'>Subscribe</span>
                <span className='text-white pl-2'>us to get Daily News Events</span> <br />
                <span>and Offers</span>
            </div>
            <div className='flex items-center gap-4 flex-wrap mb-4 md:mt-2'>
                <input type="text" placeholder='Enter your email...' className='focus:outline-0 bg-white border border-gray-200 rounded-md px-6 py-2 placeholder:text-gray-400 text-black shrink w-full sm:w-max' />
                <button className='bg-[#56d879] text-center px-6 py-2 rounded-md text-white w-full sm:w-max'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Newsletter