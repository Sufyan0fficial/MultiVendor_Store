import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import Categories from '../../components/Categories'
// import ProductCard from '../../components/ProductCard'
import BestDeals from '../../components/BestDeals'
import FeaturedSection from '../../components/FeaturedSection.jsx'
import Events from '../../components/Events.jsx'
import Newsletter from '../../components/Newsletter.jsx'
import { message } from 'antd'
import { Message } from '../../utils/notifymessage.js'
import { fetchallProducts, Filters, Get_All_Events } from '../../api/routes.js'
import DiscountedItems from '../../components/FeaturedSection.jsx'
import { CustomerSocket } from '../../../customer.socketio.js'
import { useSelector } from 'react-redux'

function Home() {
  const [messageApi, contextHolder] =  message.useMessage()
  const [bestSellingProducts, setBestSellingProducts] = useState([])
  const [discountedProducts, setDiscountedProducts]  = useState([])
  const [event, setEvent] = useState([])
  const {userData} = useSelector(state=>state?.UserReducer)
  console.log('event data is',event)

  useEffect(()=>{
    CustomerSocket.emit('updateOnlineStatus',{id:userData,online:true, user_type:'customer_id'})
  },[])

  useEffect(()=>{
    const fetchProducts = async()=>{
      const bestSellingQuery =  'best_selling=true'
      const discountedItemsQuery = 'discount=true'
      try {
        const bestSelling = await Filters(bestSellingQuery)
        const discountedItems = await Filters(discountedItemsQuery)
        const event = await Get_All_Events('popular=true')
        if(bestSelling.status === 200){
          setBestSellingProducts(bestSelling.data?.data)
        }
        if(discountedItems.status === 200){
          setDiscountedProducts(discountedItems.data?.data)
        }
        if(event.status === 200){
          console.log('event block tirggering  ???')
          setEvent(event.data?.data)
        }
      } catch (error) {
        console.log('error is',error)
        Message(messageApi,'error','Something went wrong')
      }
    }
    fetchProducts()
  },[])

  return (
    <div className='bg-[#f6f6f5] relative'>
      {
        contextHolder
      }
        <Hero />
        <Categories />
        <BestDeals data={bestSellingProducts}/>
        <Events data={event?.[0]}/>
        <DiscountedItems data={discountedProducts}/>
        <Newsletter />
    </div>
  )
}

export default Home