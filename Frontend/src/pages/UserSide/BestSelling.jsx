import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data'
import ProductCard from '../../components/ProductCard'
import { useSearchParams } from 'react-router'
import { Filters } from '../../api/routes'
import Lottie from 'lottie-react'
import animationData from '../../assets/Animations/ShopingCart.json'

function BestSelling() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
     useEffect(()=>{
       const fetchProducts = async()=>{
        setLoading(true)
         const bestSellingQuery =  'best_selling=true'
         try {
           const bestSelling = await Filters(bestSellingQuery)
           if(bestSelling.status === 200){
             setProducts(bestSelling.data?.data)
           }
           
         } catch (error) {
           Message(messageApi,'error','Failed to get Products')
         }
         finally{
            setLoading(false)
         }
       }
       fetchProducts()
     },[])
    return (
        

      
        loading ?
         <div className='min-h-[calc(100vh-200px)] flex justify-center items-center w-full'>

          <div style={{ width: 300, height: 300 }}>
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
        :
        <div className='flex  items-center justify-center  py-20 bg-[#f6f6f5]'>

            <div className='w-full md:max-w-7xl px-4 md:px-10 mx-auto'>

                <div className='grid grid-cols-1 [400]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 grid-flow-row-dense'>
                    {
                        products?.length > 0 && products?.map((item, index) => {
                            return (
                                <div key={item.id}>

                                    <ProductCard product={item} />
                                </div>
                            )
                        })
                    }
                </div>
                {
                    products?.length === 0 && 
                    <div className='text-center w-full'>
                        Products not found
                    </div>
                }
            </div>
        </div>
          
    )
}

export default BestSelling