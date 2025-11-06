import React from 'react'
import { productData } from '../static/data'
import ProductCard from './ProductCard'
import { RxArrowRight } from 'react-icons/rx'
import { useNavigate } from 'react-router'

function DiscountedItems({ data }) {
    const navigate = useNavigate()

    return (
        <div className='flex  items-center justify-center  relative -z-0 mt-12'>

            <div className='w-full md:max-w-7xl px-4 md:px-10 mx-auto'>
                <div className='flex justify-between items-start'>

                    <div className='w-full flex justify-start text-xl md:text-3xl font-bold mb-12'>
                        Discounted Products
                    </div>
                    <div className='min-w-max mt-2 flex items-center gap-1 cursor-pointer hover:text-green-500 transition-colors duration-300 ease-in' onClick={() => navigate('/search?discount=true')}>
                        <div>

                            See All
                        </div>
                        <RxArrowRight />
                    </div>
                </div>
                <div className='grid grid-cols-1 [400]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 grid-flow-row-dense'>
                    {
                        data?.length > 0 && data?.map((item, index) => {
                            return (
                                <div key={index}>

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

export default DiscountedItems