import React, { useEffect, useState } from 'react'
import { BiMessageDetail } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { useLocation, useNavigate, useParams } from 'react-router'
import { AiOutlineHeart } from "react-icons/ai";
import { GrCart } from "react-icons/gr";
import { productData } from '../../static/data';
import ProductCard from '../../components/ProductCard';
import ProductReviews from '../../components/ProductReviews';
import { Message } from '../../utils/notifymessage';
import { message } from 'antd';
import { fetchProduct } from '../../api/routes';
import { MdArrowOutward } from 'react-icons/md';
import { FiHeart } from 'react-icons/fi';
import { addProducttoCart, addProducttoWishlist, removeFromCart, removeFromWishlist } from '../../Redux/CartWishlistSlice';
import { useDispatch, useSelector } from 'react-redux';



function ProductDetailsPage() {

    const navigate = useNavigate()
    const location = useLocation()
    const { name } = useParams()
    const refinedName = name.replaceAll('-', ' ')
    console.log('refined name is ', refinedName)
    const [product, setProduct] = useState(null)
    console.log('product is', product)
    const [count, setCount] = useState(0)
    const [addtoWishlist, setAddtoWishlist] = useState(false)
    console.log('wishlist status',addtoWishlist)
    const [addtoCart, setAddtoCart] = useState(false)
    const [activeInfoSection, setActiveInfoSection] = useState(1)
    const [relatedProducts, setRelatedProducts] = useState([])
    console.log('related products are', relatedProducts)
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useDispatch()
    const [productReviews, setProductReviews] = useState([])

    useEffect(() => {
        const FetchProduct = async () => {
            try {
                const res = await fetchProduct(location.state?.product_id)
                if (res.status === 200) {
                    setProduct(res.data?.data)
                    setRelatedProducts(res.data?.data?.relatedProducts)
                }
            } catch (error) {
                Message(messageApi, 'error', 'Failed to fetch product details')
            }
        }
        FetchProduct()
    }, [refinedName, location.state])


    const { cartData } = useSelector(state => state?.CartWishlistReducer)
    const { wishlistData } = useSelector(state => state?.CartWishlistReducer)

    useEffect(() => {
        const productInCart = cartData?.find((item, i) => item?._id === product?._id)
        console.log('product added to CART is', productInCart)

        if (productInCart) {
            setAddtoCart(true)
        }
        else {
            setAddtoCart(false)
        }

        const productInWishlist = wishlistData?.find((item, i) => item?._id === product?._id)
        console.log('product added to wishlist is',productInWishlist)
        if (productInWishlist) {
            setAddtoWishlist(true)
        }
        else {
            setAddtoWishlist(false)
        }
    }, [cartData, wishlistData,product])


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

    




    return (

        product ?
            <div className=' w-full flex items-center justify-center cursor-auto my-10 h-full'>
                <div className='max-auto !max-w-7xl '>
                    {
                        contextHolder
                    }

                    <div className='flex flex-col md:flex-row gap-10 md:tems-stretch h-full bg-white px-6 md:px-10 py-10 md:rounded-md'>
                        <div className='w-full md:w-1/2'>
                            <div className=' flex  justify-center'>
                                <img src={`${import.meta.env.VITE_API_DEV}/uploads/${product?.images?.[0]}`} alt='product_img' className='h-[300px] md:h-[400px] object-contain md:object-cover' />
                            </div>
                            <div className='flex gap-6 items-center mt-6'>
                                {
                                    product?.images?.[1] &&

                                    <img src={`${import.meta.env.VITE_API_DEV}/uploads/${product?.images?.[1]}`} alt="image" className='w-1/2 object-center object-contain' />
                                }
                                {
                                    product?.images?.[2] &&

                                    <img src={`${import.meta.env.VITE_API_DEV}/uploads/${product?.images?.[2]}`} alt="image" className='w-1/2 object-center object-contain' />
                                }
                            </div>
                            <div className=''>


                            </div>


                        </div>
                        <div className='w-full md:w-1/2 flex flex-col justify-between  '>
                            <div>
                                <div className='line-clamp-2 text-xl md:text-3xl leading-snug tracking-tight text-gray-800 font-bold pr-10 pt-6'>
                                    {product?.product_name}
                                </div>
                                <div className='text-gray-700 mt-4 text-sm md:text-base'>
                                    {product?.description}
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-4 mt-10'>
                                <div className='flex items-center justify-start gap-4 text-xl    font-bold'>

                                    {
                                        product?.discounted_price &&

                                        <div>
                                            {product?.discounted_price}$
                                        </div>
                                    }
                                    <div className={`${product?.discounted_price !== 0 ? 'text-red-500 line-through' : 'text-black'}`}>
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
                                    <FiHeart size={30} color={addtoWishlist ? 'red' : ''} title={addtoWishlist ? 'Remove from Cart' : 'Add to Cart'} className='cursor-pointer' onClick={() => {
                                        if (addtoWishlist) {
                                            handleRemoveFromWishlist()
                                        }
                                        else {
                                            handleAddtoWishlist()
                                        }
                                    }}
                                        fill={addtoWishlist ? 'red' : 'white'}
                                    />


                                </div>
                                <div className='bg-black px-6 py-[10px] flex gap-2 items-center text-white max-w-max rounded-sm cursor-pointer'
                                    onClick={() => {
                                        if (addtoCart) {
                                            handleRemoveProductFromCart()
                                        }
                                        else {
                                            handleAddProducttoCart()
                                        }
                                    }}
                                >
                                    {
                                        addtoCart ?
                                            'Remove from cart' :
                                            'Add to cart'
                                    }
                                    <GrCart />

                                </div>
                                <div className='flex items-start justify-between mt-10 flex-wrap gap-y-4 gap-x-2 '>
                                    <div className='flex items-center gap-4'>
                                        <div className='flex items-start gap-4'>
                                            <img src={`${import.meta.env.VITE_API_DEV}/uploads/${product?.shop?.avatar}`} alt="shop_img" className='-mt-[2px] w-[50px] h-[50px] border border-gray-200 rounded-full object-center object-cover' />

                                        </div>
                                        <div>
                                            <div className='text-blue-500 cursor-pointer mb-1 text-lg md:text-xl leading-tight' onClick={() => navigate(`/shop/${product?.shop?._id}`)}>
                                                {product?.shop?.shop_name}

                                            </div>
                                            <div className='text-xs'>
                                                ({product?.shop?.rating}) Ratings
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className='flex items-center gap-x-6 flex-wrap gap-y-2'>
                                    <div className='flex items-center gap-2 bg-[#6443d1] px-4 py-[10px] rounded-md text-white max-w-max cursor-pointer '>
                                        <div>Send Message</div>
                                        <BiMessageDetail />

                                    </div>
                                    <div className='text-red-400 text-lg'>
                                        ({product?.sold_out}) Sold out
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='bg-[#f5f6fb] px-6 md:px-10 py-10 md:pt-20  md:rounded-md border border-gray-200 rounded-lg mt-10'>
                        <div className='flex items-center justify-between text-lg md:text-2xl font-semibold tracking-tight leading-tight'>
                            <div className='max-w-max mb-1 relative cursor-pointer' onClick={() => setActiveInfoSection(1)}>
                                <div>

                                    Product Details
                                </div>
                                <div className={`${activeInfoSection === 1 ? 'block' : 'hidden'} absolute w-full border-2 border-red-600 rounded-full`}></div>
                            </div>
                            <div className='max-w-max mb-1 relative cursor-pointer' onClick={() => setActiveInfoSection(2)}>
                                <div>

                                    Product Reveiws
                                </div>
                                <div className={`${activeInfoSection === 2 ? 'block' : 'hidden'} absolute w-full border-2 border-red-600 rounded-full`}></div>
                            </div>
                            <div className='max-w-max mb-1 relative cursor-pointer' onClick={() => setActiveInfoSection(3)}>
                                <div>

                                    Seller Information
                                </div>
                                <div className={`${activeInfoSection === 3 ? 'block' : 'hidden'} absolute w-full border-2 border-red-600 rounded-full`}></div>
                            </div>
                        </div>
                        <div className='w-full  border border-slate-200'></div>
                        <div className='py-10 '>

                            {
                                activeInfoSection === 1 &&

                                <div className='md:text-lg'>
                                    {product?.description}
                                </div>
                            }
                            {
                                activeInfoSection === 2 &&

                                <div className='min-h-36 max-h-96 flex items-center justify-center overflow-y-auto pt-10'>
                                    <ProductReviews productId={product?._id} setReviews={setProductReviews} reviews={productReviews} />
                                </div>
                            }
                            {
                                activeInfoSection === 3 &&
                                <div className='flex flex-col md:flex-row gap-y-10 md:items-start md:justify-between '>
                                    <div className='w-full md:w-1/2'>
                                        <div className='flex items-center gap-4'>
                                            <div className='flex items-start gap-4'>
                                                <img src={`${import.meta.env.VITE_API_DEV}/uploads/${product?.shop?.avatar}`} alt="shop_img" className='-mt-[2px] w-[50px] h-[50px] border border-gray-200 rounded-full object-center object-cover' />

                                            </div>
                                            <div onClick={() => navigate(`/shop/${product?.shop?._id}`)}>
                                                <div className='text-blue-500 cursor-pointer mb-1 text-lg md:text-xl leading-tight'>
                                                    {product.shop.shop_name}

                                                </div>
                                                <div className='flex items-center gap-1 cursor-pointer hover:text-green-600 transition-colors duration-200'>
                                                    View Shop
                                                    <MdArrowOutward className='mt-1' />


                                                </div>
                                                {/* <div className='text-xs'>
                                                    ({product?.shop.ratings}) Ratings
                                                </div> */}
                                            </div>


                                        </div>
                                        <div className='text-wrap mt-2 text-lg'>
                                            <div className='mt-6'>
                                                <div className='flex gap-2 items-center'>
                                                    <div className='font-semibold'>
                                                        Email :
                                                    </div>
                                                    <div className='text-base text-gray-500'>
                                                        {product?.shop?.email}
                                                    </div>
                                                </div>
                                                <div className='flex gap-2 items-center'>
                                                    <div className='font-semibold'>
                                                        Phone Number :
                                                    </div>
                                                    <div className='text-base text-gray-500'>
                                                        {product?.shop?.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full md:w-1/2 font-semibold flex flex-col md:items-end gap-y-2  '>
                                        <div className='flex items-center gap-2'>
                                            <div className='font-semibold text-lg'>

                                                Joined On:
                                            </div>

                                            <div className='text-base text-gray-600'>
                                                {product?.shop?.createdAt?.split('T')[0]}
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <div className='font-semibold text-lg'>

                                                Total Products :
                                            </div>

                                            <div className='text-base text-gray-600'>
                                                {product?.shop?.total_products}
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <div className='font-semibold text-lg'>

                                                Total Reviews:
                                            </div>

                                            <div className='text-base text-gray-600'>
                                                {product?.shop?.rating}
                                            </div>
                                        </div>
                                        <div className='text-center bg-black rounded-sm px-10 py-2 text-white cursor-pointer max-w-max'>
                                            Visit Shop
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>


                    </div>

                    {/* Product Reviews Section */}
                    {/* <div className='px-6 md:px-10 lg:px-0 mt-10'>
                        <ProductReviews productId={product?._id} />
                    </div> */}

                    <div className='px-6 md:px-10 lg:px-0'>
                        <div className='text-2xl md:text-3xl font-semibold mb-6 mt-10'>
                            Related Products
                        </div>
                        <div className='border border-gray-200 w-full mb-6'></div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 grid-flow-row-dense gap-y-6'>
                            {
                                relatedProducts?.length > 0 &&
                                relatedProducts?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <ProductCard product={item} shop={item?.shop} />
                                        </div>
                                    )
                                })

                            }

                        </div>
                        {
                            relatedProducts?.length === 0 &&
                            <div className='text-center w-full my-10'>
                                Related Products not found !
                            </div>
                        }
                    </div>

                </div>
            </div>


            :

            <div className='mt-24  mb-10 md:mt-10 text-center tracking-wide'>
                Detail not found !
            </div>




    )
}

export default ProductDetailsPage
