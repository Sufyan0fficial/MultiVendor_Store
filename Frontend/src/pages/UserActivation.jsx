import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import Spinner from '../components/Spinner'
import { ActivateUserAccount } from '../api/routes'
import { Message } from '../utils/notifymessage'
import { message } from 'antd'

function UserActivation() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [activationMessage, setActivationMessage] = useState('')
    const [messageApi, contextHolder] = message.useMessage()
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    useEffect(() => {
        const verifyUser = async () => {
            setLoading(true)
            try {
                const res = await ActivateUserAccount({ activationString: id })
                if (res.status == 200 || res.status == 201 ) {
                    setActivationMessage('Verified!')
                    Message(messageApi, 'success', 'User Verification Successfull')
                    setTimeout(() => {
                        navigate('/login')
                    }, 1500);
                }
            } catch (error) {
                setError(true)
                setErrorMessage(error.response.data?.message)
                Message(messageApi, 'error', 'Verification Failed')
                setTimeout(() => {

                    navigate('/signup')
                }, 1500);
            }
            finally {
                setLoading(false)
            }
        }
        verifyUser()
    }, [])
    return (
        <div className='min-h-screen flex items-center justify-center text-2xl font-semibold'>
            {contextHolder}
            {
                loading ?

                    <div className='flex items-center gap-4'>

                        <span>User Getting Verified...</span>
                        <span>
                            <Spinner className={'translate-x-1/2 translate-y-1/2'} size={'medium'} />
                        </span>

                    </div> :
                    error ?

                        <div className='text-red-500'>
                            {errorMessage}
                        </div>
                        :
                        <div className='text-green-500'>
                            {activationMessage}
                        </div>

            }
        </div>
    )
}

export default UserActivation