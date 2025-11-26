import { Collapse } from 'antd'
import React from 'react'

function FAQ() {
   const FAQList = [
  {
    key: 1,
    label: <p className='font-semibold text-lg'>How do I track my order?</p>,
    children: (
      <p className='text-base'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores inventore ullam quasi iusto nihil? Fugit, beatae quas nostrum aliquid labore est consectetur, impedit dicta vel, animi voluptatibus quibusdam deleniti corporis!
      </p>
    ),
  },
  {
    key: 2,
    label: <p className='font-semibold text-lg'>What is your return policy?</p>,
    children: (
      <p className='text-base'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores inventore ullam quasi iusto nihil? Fugit, beatae quas nostrum aliquid labore est consectetur, impedit dicta vel, animi voluptatibus quibusdam deleniti corporis!
      </p>
    ),
  },
  {
    key: 3,
    label: <p className='font-semibold text-lg'>How do I track my order?</p>,
    children: (
      <p className='text-base'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores inventore ullam quasi iusto nihil? Fugit, beatae quas nostrum aliquid labore est consectetur, impedit dicta vel, animi voluptatibus quibusdam deleniti corporis!
      </p>
    ),
  },
  {
    key: 4,
    label: <p className='font-semibold text-lg'>How do I contact Customer Support?</p>,
    children: (
      <p className='text-base'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores inventore ullam quasi iusto nihil? Fugit, beatae quas nostrum aliquid labore est consectetur, impedit dicta vel, animi voluptatibus quibusdam deleniti corporis!
      </p>
    ),
  },
  {
    key: 5,
    label: <p className='font-semibold text-lg'>Can I change or cancel my order?</p>,
    children: (
      <p className='text-base'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores inventore ullam quasi iusto nihil? Fugit, beatae quas nostrum aliquid labore est consectetur, impedit dicta vel, animi voluptatibus quibusdam deleniti corporis!
      </p>
    ),
  },
  {
    key: 6,
    label: <p className='font-semibold text-lg'>Do you offer International Shipping?</p>,
    children: (
      <p className='text-base'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores inventore ullam quasi iusto nihil? Fugit, beatae quas nostrum aliquid labore est consectetur, impedit dicta vel, animi voluptatibus quibusdam deleniti corporis!
      </p>
    ),
  },
  {
    key: 7,
    label: <p className='font-semibold text-lg'>What Payment methods do we accept?</p>,
    children: (
      <p className='text-base'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores inventore ullam quasi iusto nihil? Fugit, beatae quas nostrum aliquid labore est consectetur, impedit dicta vel, animi voluptatibus quibusdam deleniti corporis!
      </p>
    ),
  },
]

    return (
        <div className='w-full flex items-center justify-center mt-24 md:mt-10 mb-16 bg-[#f6f6f5]'>
            <div className='max-w-7xl w-full'>
            <div className='mx-auto px-6 md:px-10 '>
            <div className='text-2xl md:text-3xl font-bold text-black mb-6'>FAQ</div>
            <Collapse items={FAQList} defaultActiveKey={[1]} accordion={true} className=''/>
            </div>
            </div>
        </div>
    )
}

export default FAQ