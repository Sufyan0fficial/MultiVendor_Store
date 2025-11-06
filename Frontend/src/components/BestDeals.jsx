import React, { useState } from 'react'
import { productData } from '../static/data'
import ProductCard from './ProductCard'
import { RxArrowRight } from 'react-icons/rx'
import { Navigate, useNavigate } from 'react-router'

function BestDeals({ data }) {
    const navigate = useNavigate()
    const productData = data?.length > 0 && data?.sort((a, b) => b?.sold_out - a?.sold_out).slice(0, 8)
    return (
        <div className='flex  items-center justify-center relative -z-0'>

            <div className='w-full md:max-w-7xl px-4 md:px-10 mx-auto'>
                <div className='flex items-start  justify-between'>

                    <div className='w-full flex justify-start text-2xl md:text-3xl font-bold mb-12'>
                        Best Selling
                    </div>
                    <div className='min-w-max mt-2 flex items-center gap-1 cursor-pointer hover:text-green-500 transition-colors duration-300 ease-in' onClick={()=>navigate('/best-selling')}>
                        <div>

                        See All 
                        </div>
                        <RxArrowRight />
                    </div>
                </div>
                <div className='grid grid-cols-1 [400px]:grid-cols-4  md:grid-cols-3 lg:grid-cols-4 gap-6 grid-flow-row-dense items-stretch h-full'>
                    {
                        productData?.length > 0 && productData?.map((item, index) => {
                            return (
                                <div key={index} className='min-h-full'>

                                    <ProductCard product={item} shop={item?.shop} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BestDeals