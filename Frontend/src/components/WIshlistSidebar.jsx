import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addProducttoCart, removeFromWishlist } from '../Redux/CartWishlistSlice';
import { Message } from '../utils/notifymessage';
import { message } from 'antd';



function Wishlist({ setOpenWishlist, openWishlist }) {
    const {wishlistData} =  useSelector(state=>state?.CartWishlistReducer)
    const {cartData} =  useSelector(state=>state?.CartWishlistReducer)
    const {screenWidth} = useSelector(state=>state.UtilReducer)
    const dispatch = useDispatch()
    const [messageApi, contextHolder] =  message.useMessage()
    const handleRemoveProduct = (item)=>{
        dispatch(removeFromWishlist(item))
    }

    const handleAddtoCart = (comingItem)=>{
        const alreadyInCart = cartData?.find((item)=>item?._id === comingItem?._id )
        console.log('status is',!!alreadyInCart)
        if(alreadyInCart){
            Message(messageApi,'warning','Product already availabe in cart')
        }
        else{
            dispatch(addProducttoCart({...comingItem,qty:1}))
            Message(messageApi,'success','Product added to cart')
        }
    }

    return (
        <div className={`fixed inset-0 z-10  transition-opacity backdrop-blur-sm duration-500 ease-in-out  ${openWishlist ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none '}`}>
            {
                contextHolder
            }
            <div className={`fixed top-0 right-0 w-[80%] md:w-1/2 lg:w-1/3 bg-white h-full border border-gray-200 rounded-xl z-10 pb-6 pt-2 select-none md:max-h-screen md:min-h-screen flex flex-col transition-all duration-500 ease-in-out ${openWishlist ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='relative z-50'>
                    <div className='w-full flex justify-end pr-6 mt-2' onClick={() => setOpenWishlist(false)}>
                        <RxCross2 size={33} className='cursor-pointer' />
                    </div>
                    <div className='flex itmes-center gap-2 mt-2 mb-10 px-6'>
                        <AiOutlineHeart size={33} />

                        <div className='text-lg font-semibold mt-[2px]'>{wishlistData?.length} Items</div>

                    </div>
                    <hr className='text-gray-300 ' />
                </div>


                <div className='px-6 flex-grow overflow-y-auto min-h-0 '>
                    {
                        wishlistData?.length > 0 ? wishlistData?.map((item, index) => {
                            const alreadyInCart = cartData?.find((product,i)=>product?._id === item?._id)
                            const price = item?.discounted_price ? item?.discounted_price : item?.original_price
                            return (
                                <div className=' border-b border-b-gray-300  py-6' key={index}>
                                    <div className='cursor-pointer' onClick={()=>handleRemoveProduct(item)}>
                                        <RxCross2 size={screenWidth <= 768 ? 20 : 30}/>
                                    </div>
                                    <div className='flex items-center justify-between'>

                                    
                                    <div className='flex items-center gap-4'>

                                    
                                    <div className='flex shrink-0'>
                                        <img src={`${import.meta.env.VITE_API_DEV}/uploads/${item?.images?.[0]}`} alt="product_img" className='w-20 h-20 object-contain object-center' />
                                    </div>

                                        <div className=''>
                                            <div className='text-gray-800 line-clamp-2'>{item?.product_name}</div>
                                            <div className='text-[#d92222] font-bold'>US$ {price}</div>
                                        </div>
                                        </div>
                                        <BsCart3 size={screenWidth <= 768 ? 18 : 33} color={alreadyInCart ? '#e5e7eb' : 'black'} className='cursor-pointer shrink-0 ml-2' onClick={()=>handleAddtoCart(item)}/>


                                </div>
                                </div>
                            )

                        }) :
                        <div className='text-center mt-20 text-gray-500'>No product found</div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Wishlist