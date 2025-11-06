import React, { useEffect, useState } from 'react'
import { BiMessageDetail } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router'
import { AiOutlineHeart } from "react-icons/ai";
import { GrCart } from "react-icons/gr";
import { MdArrowOutward } from 'react-icons/md';
import { FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { Message } from '../utils/notifymessage';
import { addProducttoCart, addProducttoWishlist, removeFromCart, removeFromWishlist } from '../Redux/CartWishlistSlice';



function ProductDetails({ product, shop, viewDetails, setViewDetails }) {
    console.log('shop data is', shop)
    const navigate = useNavigate()
    const [count, setCount] = useState(0)
    const [addtoWishlist, setAddtoWishlist] = useState(false)
    const [addtoCart, setAddtoCart] = useState(false)
    const discountedPrice = product?.discounted_price === 0 ? false : true
    const dispatch = useDispatch()
    const { cartData } = useSelector(state => state?.CartWishlistReducer)
    const { wishlistData } = useSelector(state => state?.CartWishlistReducer)
    const [messageApi,contextHolder] = message.useMessage()


    const handleRemoveProductFromCart = () => {
        setAddtoCart(false)
        Message(messageApi, 'warning', 'Product removed from cart')
        dispatch(removeFromCart(product))
    }
    const handleAddProducttoCart = () => {
        setAddtoCart(true)
        dispatch(addProducttoCart({...product,qty:1}))
        Message(messageApi, 'success', 'Product added to cart')

    }

    const handleAddtoWishlist = () => {
        setAddtoWishlist(true)
        dispatch(addProducttoWishlist(product))
        Message(messageApi, 'success', 'Product added to wishlist')

    }

    const handleRemoveFromWishlist = () => {
        setAddtoWishlist(false)
        dispatch(removeFromWishlist(product))
        Message(messageApi, 'warning', 'Product removed from wishlist')
    }

    useEffect(() => {
        const productInCart = cartData?.find((item, i) => item?._id === product?._id)

        if (productInCart) {
            setAddtoCart(true)
        }
        else {
            setAddtoCart(false)
        }

        const productInWishlist = wishlistData?.find((item, i) => item?._id === product?._id)
        if (productInWishlist) {
            setAddtoWishlist(true)
        }
        else {
            setAddtoWishlist(false)
        }
    }, [cartData, wishlistData])
    return (
        <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] flex items-center justify-center cursor-auto'>
            <div className='min-h-[calc(70vh)] max-h-[calc(70vh)] w-[90%]  md:w-4/5 overflow-y-auto rounded-lg pb-16 pt-10 !relative bg-white px-10 py-10'>
            {contextHolder}
                <div className=' absolute top-3 right-6 cursor-pointer' onClick={() => setViewDetails(false)}>

                    <RxCross2 size={35} />
                </div>
                <div className='flex flex-col md:flex-row gap-10 imd:tems-stretch h-full'>
                    <div className='w-full md:w-1/2'>
                        <div className=' flex  justify-center my-6'>
                            <img src={`${import.meta.env.VITE_API_DEV}/uploads/${product?.images?.[0]}`} alt='product_img' className='h-[300px] md:h-[400px] object-contain md:object-cover' />
                        </div>
                        <div className=''>
                            <div className='flex items-start gap-4'>
                                <img src={`${import.meta.env.VITE_API_DEV}/uploads/${shop?.avatar}`} alt="shop_img" className='-mt-[2px] w-[50px] h-[50px] border border-gray-200 rounded-full object-center object-cover' />
                                <div onClick={() => {

                                    navigate(`/shop/${shop._id}`)

                                }

                                }>

                                    <div className='text-blue-500 cursor-pointer mb-1 text-lg md:text-xl leading-tight'

                                    >
                                        <div>

                                            {shop?.shop_name}
                                        </div>
                                        <div className='flex items-center gap-1 cursor-pointer hover:text-green-600 transition-colors duration-200 !text-base text-black'>
                                            View Shop
                                            <MdArrowOutward className='mt-1' />


                                        </div>

                                    </div>
                                    {
                                        shop?.rating &&
                                        <div className='text-xs'>

                                            ({shop?.rating}) Ratings
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='flex items-center gap-2 my-4 bg-black px-4 py-[10px] rounded-md text-white max-w-max'>
                                <div>Send Message</div>
                                <BiMessageDetail />

                            </div>
                            <div className='text-red-400 text-lg'>
                                ({product?.sold_out}) Sold out
                            </div>
                        </div>


                    </div>
                    <div className='w-full md:w-1/2 flex flex-col justify-between  '>
                        <div>
                            <div className='line-clamp-2 text-xl md:text-3xl leading-snug tracking-tight text-gray-800 font-bold pr-10'>
                                {product?.product_name}
                            </div>
                            <div className='text-gray-700 mt-4 text-sm md:text-base'>
                                {product?.description}
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-4 mt-10'>
                            <div className='flex items-center justify-start gap-4 text-xl    font-bold'>
                                {
                                    discountedPrice &&

                                    <div>
                                        {product?.discount_price}$
                                    </div>
                                }
                                <div className={`${discountedPrice ? 'text-red-500 line-through' : 'text-black'}`}>
                                    {product?.original_price}$
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>

                                <div className='flex items-center'>
                                    <div className={`text-center text-white bg-[#49b5a8] hover:bg-[#5edbcb] px-4 py-2 rounded-l-sm transition ease-in-out duration-500 cursor-pointer ${count === 0 ? '!cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => {
                                        if (count === 0) {
                                            return
                                        }
                                        setCount(pre => pre - 1)
                                    }}>-</div>
                                    <div className='text-center text-black bg-[#e5e7eb] px-4 py-[10px] '>{count}</div>
                                    <div className='text-center text-white bg-[#49b5a8] hover:bg-[#5edbcb] px-4 py-2 rounded-r-sm transition ease-in-out duration-500 cursor-pointer' onClick={() => setCount(pre => pre + 1)}>+</div>
                                </div>
                                <FiHeart size={30} color={addtoWishlist ? 'red' : ''} title={addtoWishlist ? 'Remove from Cart' : 'Add to Cart'}
                                    fill={addtoWishlist ? 'red' : 'white'}

                                    className='cursor-pointer' onClick={() =>{
                                        if(addtoWishlist){
                                            handleRemoveFromWishlist()
                                        }
                                        else{
                                            handleAddtoWishlist()
                                        }
                                    }} />

                            </div>
                            <div className='bg-black px-6 py-[10px] flex gap-2 items-center text-white max-w-max rounded-sm cursor-pointer' onClick={() =>{
                                        if(addtoCart){
                                            handleRemoveProductFromCart()
                                        }
                                        else{
                                            handleAddProducttoCart()
                                        }
                                    }}>
                                {
                                    addtoCart ?
                                        'Remove from Cart' :
                                        'Add to Cart'
                                }
                                <GrCart color='' />

                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div >
    )
}

export default ProductDetails