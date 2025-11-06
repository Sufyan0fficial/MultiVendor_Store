import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { IoBagHandleOutline } from "react-icons/io5";
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { decrementProductToCart, IncrementProductToCart, removeFromCart } from '../Redux/CartWishlistSlice';
import { useNavigate } from 'react-router';


function Cart({ setOpenCart, count, setCount, openCart }) {
    const data = useSelector(state=>state?.CartWishlistReducer?.cartData)
    // const [Data, setData] = useState()
    const { screenWidth } = useSelector(state => state.UtilReducer)
    const navigate = useNavigate()
    const [activeId, setActiveId] = useState(null)
    const dispatch = useDispatch()
    const totalPriceCalculator = () => {

        let totalPrice = 0
        data?.length > 0 && data?.forEach((item, i) => {
            const { discounted_price, original_price } = item
            const price =( discounted_price ? discounted_price : original_price) * item?.qty
            totalPrice = totalPrice + price
        })
        return totalPrice
    }
    const handleRemoveProduct = (item) => {
        dispatch(removeFromCart(item))
    }


    // useEffect(()=>{
    //     const items = data?.length > 0 && data?.map((item,i)=>{
    //         return ({...item,qty:1})
    //     })
    //     setData(items)
    // },[data])

    const handleIncrement = (id)=>{
        // const items = Data && Data?.map((item, i)=>{
        //     const qty = item?._id === id ? item?.qty +1 : item?.qty
        //     return ({...item,qty})
        // })
        // setData(items)
        dispatch(IncrementProductToCart(id))
    }
    const handleDecrement = (id)=>{
        // const items = Data && Data?.map((item, i)=>{
        //     const qty = item?._id === id ? item?.qty - 1 : item?.qty
        //     return ({...item,qty})
        // })
        // setData(items)
        dispatch(decrementProductToCart(id))
    }
    console.log('total price is', totalPriceCalculator())
    console.log('cart is rendering')
    return (
        <div className={`fixed inset-0  transition-opacity backdrop-blur-sm
 duration-500 ease-in-out  ${openCart ? 'opacity-100 pointer-events-auto'  :  'opacity-0 pointer-events-none min-h-[calc(100vh-60px)] md:min-h-screen'} z-10`}> 
            <div className={`fixed top-0 right-0 w-[80%] md:w-1/2 lg:w-1/3 bg-white h-full z-10 pb-6 pt-2 select-none md:max-h-screen border border-gray-200 rounded-xl  md:min-h-screen flex flex-col transition-all duration-500 ease-in-out ${openCart ? 'translate-x-0' : 'translate-x-full'} z-50`}>
                <div className='relative z-50'>
                    <div className='w-full flex justify-end pr-6 ' onClick={() => setOpenCart(false)}>
                        <RxCross2 size={33} className='cursor-pointer' />
                    </div>
                    <div className='flex itmes-center gap-2 mt-2 mb-10 px-6'>
                        <IoBagHandleOutline size={25} />
                        <div className='text-lg font-semibold'>{data?.length} Items</div>

                    </div>
                    <hr className='text-gray-300 ' />
                </div>


                <div className='px-6 flex-grow overflow-y-auto min-h-0 !relative !z-50'>
                    {
                        data?.length > 0 ?
                            data?.map((item, index) => {
                                const price = item?.discounted_price ? item?.discounted_price : item?.original_price
                                return (

                                    <div className='flex gap-2 items-start border-b border-b-gray-300 py-6 justify-between ' key={index}>
                                        <div className='flex items-center gap-6 '>


                                            <div className='flex items-center '>
                                                <div className='flex flex-col items-center gap-1'>
                                                    <div className='bg-[#e44343] text-white text-lg font-medium w-[22px] cursor-pointer h-[22px] rounded-full flex items-center justify-center' onClick={() =>handleIncrement(item?._id)}>
                                                        <FiPlus /> 
                                                    </div>
                                                    <div className='text-lg font-semibold'>{item?.qty}</div>
                                                    <div className={`bg-gray-300 text-black text-lg  w-[22px] cursor-pointer h-[22px] rounded-full flex items-center justify-center ${item?.qty === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => {
                                                        if (item?.qty == 1) {
                                                            return
                                                        }
                                                        handleDecrement(item?._id)
                                                    }}>
                                                        <FiMinus />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='flex items-center gap-2 '>
                                                <div className='flex shrink-0'>
                                                    <img src={`${import.meta.env.VITE_API_DEV}/uploads/${item?.images?.[0]}`} alt="product_image" className='w-20 h-20 object-contain object-center' />
                                                </div>
                                                <div className=''>
                                                    <div className='text-gray-800 line-clamp-2 text-sm md:text-base leading-snug '>
                                                        {item?.product_name}
                                                    </div>
                                                    <div className='text-gray-400'>${price} * {item?.qty}</div>
                                                    <div className='text-[#d92222] font-bold'>US${price * item?.qty}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <RxCross2 size={screenWidth <= 768 ? 20 : 33} className='cursor-pointer shrink-0 ml-1' onClick={() => handleRemoveProduct(item)} />

                                    </div>
                                )

                            }) :
                            <div className='text-center mt-20 text-gray-500'>No Product found</div>

                    }
                </div>
                <div className='flex justify-center border-t border-t-gray-200 pt-8 relative z-50'>
                    <div className={`mx-8 w-full ${data?.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#e44343]'}  cursor-pointer text-white text-center font-semibold text-base md:text-lg rounded-md py-3 `} onClick={()=>{
                        navigate('/checkout')
                        setOpenCart(false)
                    } }>Checkout Now (USD${totalPriceCalculator() * count})</div>
                </div>
            </div>
        </div>
    )
}

export default Cart