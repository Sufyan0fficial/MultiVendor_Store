import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { SellerVerification } from '../../api/routes'
import { message } from 'antd'
import { Message } from '../../utils/notifymessage'

function SellerActivation() {
    const activationString = useParams()
    const [messageApi, contextHolder] = message.useMessage()
    const [isVerified, setIsVerified] = useState(false)
    const [isVerificationFailed, setIsVerificationFailed] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const verifySeller = async () => {
            try {

                const res = await SellerVerification({activationString})
                if (res.status == 201) {
                    setIsVerified(true)
                    Message(messageApi,'success',(res.data.message || 'Account Activated successfully, please login to proceed'))
                    setTimeout(()=>{
                        navigate('/seller-login')
                    },1200)
                }
            } catch (error) {
                console.log('errorrr is',error)
                setIsVerificationFailed(true)
                Message(messageApi,'error',(error.response.data.message || 'Verification Failed, please Signup again'))
                setTimeout(()=>{
                    navigate('/seller-signup')
                },1200)
            }
        }
        verifySeller()
    }, [activationString])
    return (
        <div className='min-h-screen flex justify-center items-center'>
            {
                isVerified ?
                    <div className='text-xl text-green-500'>Verified</div> :
                    isVerificationFailed ?
                    <div className='text-red-500 text-xl'>Verification Failed</div> :
                    <div className='text-black'>Verifying...</div>
            }
            {
                contextHolder
            }
        </div>
    )
}

export default SellerActivation