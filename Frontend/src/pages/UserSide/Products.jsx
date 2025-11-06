import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data'
import ProductCard from '../../components/ProductCard'
import { useSearchParams } from 'react-router'
import { Filters } from '../../api/routes'

function Products() {
    const [products, setProducts] = useState([])
    console.log('products are',products)
    const [searchParam] = useSearchParams()
    let categoryParam = searchParam.get('category')
    if(!categoryParam){
        categoryParam = ''
    }
    else{
        categoryParam = `category=${categoryParam}`
    }
    console.log('category params is',categoryParam)

     useEffect(()=>{
       const fetchProducts = async()=>{
         try {
           const bestSelling = await Filters(categoryParam)
           if(bestSelling.status === 200){
             setProducts(bestSelling.data?.data)
           }
          
         } catch (error) {
           Message(messageApi,'error','Failed to get Products')
         }
       }
       fetchProducts()
     },[categoryParam])
    return (
        <div className='flex  items-center justify-center  my-20 bg-[#f6f6f5]'>
           
            <div className='w-full md:max-w-7xl px-4 md:px-10 mx-auto'>
                
        <div className='grid grid-cols-1 [400]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 grid-flow-row-dense'>
            {
                products?.length > 0 &&
                 products?.map((item, index) => {
                    return (
                        <div key={index}>

                            <ProductCard product={item} />
                        </div>
                    )
                }) 
                
            }
        </div>
        {
            products.length == 0 &&
            <div className='text-black text-lg text-center w-full'>
                    No Product Found !
                </div>
        }
        </div>
        </div>
    )
}

export default Products