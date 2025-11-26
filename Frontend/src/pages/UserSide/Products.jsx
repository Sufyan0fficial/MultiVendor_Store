import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data'
import ProductCard from '../../components/ProductCard'
import { useSearchParams } from 'react-router'
import { Filters } from '../../api/routes'
import Lottie from 'lottie-react'
import animationData from '../../assets/Animations/ShopingCart.json'

function Products() {
  const [products, setProducts] = useState([])
  console.log('products are', products)
  const [searchParam] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const Param = searchParam.get('category') || ''
  const [increaseIndex, setIncreaseIndex] = useState(0)
  const [queryParam, setQueryParam] = useState('')
  const [isLoadMore, setIsLoadMore] = useState(false)
  console.log('queryParam is', queryParam)
  useEffect(() => {
    const SearchParam = new URLSearchParams(location.search)
    if (Param) {
      SearchParam.set('category', Param)
    }
    SearchParam.set('index', increaseIndex)
    setQueryParam(SearchParam.toString())
  }, [increaseIndex])

  useEffect(() => {


    const fetchProducts = async () => {
      setLoading(true)
      try {
        const bestSelling = await Filters(queryParam)
        if (bestSelling.status === 200) {
          setProducts(pre => ([...pre, ...bestSelling.data?.data]))
          if (bestSelling.data?.data?.length < 9) {
            setIsLoadMore(false)
          } else {
            setIsLoadMore(true)
          }
        }

      } catch (error) {
        Message(messageApi, 'error', 'Failed to get Products')
      }
      finally {
        setLoading(false)
      }
    }
    queryParam && fetchProducts()
  }, [Param, queryParam])
  return (
    loading ?
      <div className='min-h-[calc(100vh-200px)] flex justify-center items-center w-full'>

        <div style={{ width: 300, height: 300 }}>
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
      :
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
            isLoadMore &&

            <div className='w-full flex justify-center items-center'>
              <button className='px-6 py-2 bg-blue-600 text-white text-center text-sm rounded-md mt-16' onClick={() => {
                setIncreaseIndex(products?.length + 9)
              }}>Load More</button>
            </div>
          }
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