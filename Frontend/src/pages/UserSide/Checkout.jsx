import React, { useEffect, useRef, useState } from 'react'
import Shipping from '../../components/Shipping'
import Payment from '../../components/Payment'
import { Trimmer } from '../../utils/trimmer'
import { ApplyCoupon, CreateOrder, StripeCheckOutSession, StripeCheckOutSessionVerification } from '../../api/routes'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../utils/notifymessage'
import { message } from 'antd'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import Success from '../../assets/Animations/Success.json'
import Lottie from 'lottie-react'
import { EmptyCart } from '../../Redux/CartWishlistSlice'
import { storeShippingData } from '../../Redux/ShippingSlice'
import { storeOrderData } from '../../Redux/OrderSlice'


function Checkout() {
    const [activeStep, setActiveStep] = useState(1)
    const [shippingData, setShippingData] = useState(null)
    const [paymentData, setPaymentData] = useState({})
    const [couponCode, setCouponCode] = useState('')
    const [couponAppliedProducts, setCouponAppliedProducts] = useState([])
    console.log('coupon applied products are', couponAppliedProducts)
    const [messageApi, contextHolder] = message.useMessage()
    const { cartData } = useSelector(state => state?.CartWishlistReducer)
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [shippingCost, setShippingCost] = useState(0)
    const [discountPercentage, setDiscountPercentage] = useState(0)
    const shippingRef = useRef(null)
    const [payload, setPayload] = useState([])
    console.log('coupon code is', couponCode)
    const [params] = useSearchParams()
    const success = params.get('success') === 'true'
    const failure = params.get('cancel') === 'true'
    const success_id = params.get('session_id')
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentVerificaiton, setPaymentVerification] = useState(false)
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state?.UserReducer)
    const {shipping_address} = useSelector(state=>state?.ShippingReducer)
    const {orderDetails} =  useSelector(state=>state?.OrderReducer)
    const navigate = useNavigate()




    const handlePayment = async (values) => {
        dispatch(storeShippingData(values))
        dispatch(storeOrderData(payload))
        try {
            const res = await StripeCheckOutSession(payload)
            if (res.status === 200) {
                window.location.href = res.data?.data
            }
        } catch (error) {
            Message(messageApi, 'error', error?.response?.message?.data || 'Oops something went wrong')
        }
    }
    const handleCouponCode = async () => {
        const TrimmedCoupon = couponCode.trim()
        const payload = {
            coupon: TrimmedCoupon,
            products: cartData
        }
        try {
            const res = await ApplyCoupon(payload)
            if (res.status === 200) {
                Message(messageApi, 'success', 'Coupon code applied successfully')
                setCouponAppliedProducts(res.data?.data)
            }
        } catch (error) {
            Message(messageApi, 'error', error?.response?.data?.message || 'Failed to apply coupon code')
        }
        finally {
            setCouponCode('')
        }
    }


    useEffect(() => {
        if (success) {
            setActiveStep(3)
            const paymentVerificaiton = async () => {

                try {
                    const res = await StripeCheckOutSessionVerification({id: success_id })
                    if (res.status === 200) {
                        Message(messageApi, 'success', 'Payment Verified successfully')
                        setPaymentSuccess(true)
                        dispatch(EmptyCart())
                        const response = await CreateOrder({
                            user: userData,
                            items:orderDetails,
                            shipping_address:shipping_address

                        })
                        if(response.status == 200){
                            navigate('/')
                            
                        }
                        
                    }
                } catch (error) {
                    console.log('error is',error)
                    Message(messageApi, 'error', 'Failed to verify payment')
                }
                finally {
                    setPaymentVerification(true)
                }
            }
            paymentVerificaiton()

        }

        if (failure) {
            setActiveStep(1)
        }
        setPayload(cartData)
        let subtotal = 0
        cartData?.forEach((item, i) => {
            const price = (item?.discounted_price ? item?.discounted_price : item?.original_price) * item?.qty
            subtotal = subtotal + price
        })
        const shippingCost = subtotal ? (subtotal * 0.1) : 0
        let discountPercentage = 0
        let total = shippingCost + subtotal
        if (couponAppliedProducts?.length > 0) {
            const ps = cartData && cartData?.flatMap((cartitem, i) => {
                const products = couponAppliedProducts?.map((item, index) => {
                    const product = cartitem?._id === item?._id ? item : cartitem
                    return product
                })
                return products
            })
            setPayload(ps)
            const couponedSubtotal = ps?.length > 0 && ps.reduce((acc, current) => acc + ((current?.couponedPrice ? current?.couponedPrice : current?.discounted_price ? current?.discounted_price : current?.original_price) * current?.qty), 0)


            total = couponedSubtotal + shippingCost
            discountPercentage = Math.ceil(100 - ((couponedSubtotal / subtotal) * 100))
        }


        setSubtotal(subtotal)
        setShippingCost(shippingCost)
        setDiscountPercentage(discountPercentage)
        setTotal(total)
    }, [couponAppliedProducts])

    return (
        <div className='w-full'>
            {contextHolder}
            <div className='max-w-7xl px-6 md:px-10 mx-auto mt-24 md:mt-10 mb-10'>
                        <div className='flex w-full  max-w-full overflow-x-auto md:justify-center mb-10'>
                            <div className='flex items-center'>
                                <div className={`${(activeStep === 1 || activeStep === 2 || activeStep === 3) ? 'text-white bg-[#f63b60]' : 'text-[#dc143c]  bg-[#fde1e6]'} px-6 py-2 flex items-center justify-center rounded-full  cursor-pointer font-semibold`} onClick={() => setActiveStep(1)}>
                                    1.Shipping
                                </div>
                                <div className={`min-w-[100px] h-[6px] ${((activeStep === 2 || activeStep === 3)) ? 'bg-[#f63b60]' : 'bg-[#fde1e6]'} `}>

                                </div>
                                <div className={`${(activeStep === 2 || activeStep === 3) ? 'text-white bg-[#f63b60]' : 'text-[#dc143c]  bg-[#fde1e6]'} px-6 py-2 flex items-center justify-center rounded-full cursor-pointer font-semibold`}>
                                    2.Payment
                                </div>
                                <div className={`min-w-[100px] h-[6px] ${(activeStep === 3) ? 'bg-[#f63b60]' : 'bg-[#fde1e6]'} `}>

                                </div>
                                <div className={`${activeStep === 3 ? 'text-white bg-[#f63b60]' : 'text-[#dc143c]  bg-[#fde1e6]'} px-6 py-2 flex items-center justify-center rounded-full  cursor-pointer font-semibold`}>
                                    2.Success
                                </div>
                            </div>
                        </div>
                {
                    (activeStep === 1 || activeStep === 2) &&
                    <>

                        <div className='flex flex-col md:flex-row gap-10 '>
                            <div className='w-full md:w-2/3 border border-gray-200 bg-white rounded-lg'>
                                {
                                    activeStep === 1 && <Shipping ref={shippingRef} handleFinish={handlePayment} />
                                }
                                {
                                    activeStep === 2 && <Payment />
                                }

                            </div>
                            <div className='w-full md:w-1/3 border border-gray-200 bg-white rounded-lg px-6 py-10 flex flex-col gap-y-6 max-h-max'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-gray-500'>subtotal : </span>
                                    <span className='font-semibold text-lg'>${subtotal}</span>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-gray-500'>shipping : </span>
                                    <span className='font-semibold text-lg'>${shippingCost}</span>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-gray-500'>Discount : </span>
                                    <span className='font-semibold text-lg text-red-500'>-{discountPercentage}%</span>
                                </div>
                                <hr color='gray' className='border-gray-300' />
                                <div className='flex justify-end font-semibold text-lg'>
                                    ${total}
                                </div>
                                {
                                    activeStep == 1 &&
                                    <div className='flex flex-col gap-y-6'>
                                        <input type="text" placeholder='Coupon Code' className='focus:outline-0 border border-gray-400 rounded-md py-2 text-black px-4 w-full placeholder:text-gray-400' onChange={(e) => setCouponCode(e.target.value)} value={couponCode} />
                                        <div className='focus:outline-0 border border-[#f63b60] rounded-md py-2 text-[#f63b60] px-4 w-full text-center cursor-pointer' onClick={handleCouponCode}>
                                            Apply Code
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            activeStep === 1 &&

                            <div className='w-full flex justify-center mt-10'>
                                <button className='bg-black text-white text-center py-3 w-[250px] rounded-md cursor-pointer' onClick={() => shippingRef.current.submit()}>
                                    Go to Payment
                                </button>
                            </div>
                        }
                    </>
                }
                {
                    activeStep === 3 &&
                    <div className='w-full h-full flex justify-center '>
                        {
                            paymentVerificaiton ?
                                <div>
                                    {

                                        paymentSuccess === true &&

                                        <div style={{ width: 300 }}>
                                            <Lottie animationData={Success} loop={false} />
                                        </div>
                                    }
                                    {

                                        paymentSuccess === false &&
                                        <div className='text-center text-red-500'>Payment Verification Failed !</div>
                                    }
                                </div>

                                :

                                <div className='text-center'>
                                    Vefrifying Payment ...
                                </div>
                        }

                    </div>
                }
            </div>
        </div>
    )
}

export default Checkout