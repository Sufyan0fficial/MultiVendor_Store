import { Checkbox, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaEye, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { Trimmer } from '../../utils/trimmer';
import { UserLogin } from '../../api/routes';
import { Message } from '../../utils/notifymessage';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserData } from '../../Redux/UserSlice';


function Login() {
    const [passwordHide, setPasswordHide] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.UserReducer)

    useEffect(() => {
        if (userData?._id) {
            Message(messageApi, 'success', 'User already logged in')
            setTimeout(() => {
                navigate('/')

            }, 1200)
        }
        else return
    }, [])
    const handleLogin = async (values) => {
        setLoading(true)
        const data = Trimmer(values)
        try {
            const res = await UserLogin(data)
            if (res.status === 200) {
                Message(messageApi, 'success', 'User login successfully')
                dispatch(storeUserData(res.data.data))
                navigate('/')
            }
        } catch (error) {
            Message(messageApi, 'error', (error.response?.data?.message || 'Failed to login, Please try again later'))
            console.log('login error is ',error)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-[calc(100vh)] flex items-center justify-center px-4 '>
            {contextHolder}
            <div className='max-h-max w-full md:max-w-[448px] '>
                <div className='font-bold text-xl  md:text-3xl text-black md:tracking-tight mb-6 text-center '>Login to your Account</div>
                <div className='px-6 md:px-10 py-10 border rounded-lg border-gray-200 shadow-lg '>
                    <Form
                        onFinish={handleLogin}
                        className=''
                    >
                        <div>
                            <div className='font-semibold mb-1'>Email Address</div>
                            <Form.Item
                                name='email'
                                rules={[{ required: true, message: 'Email Field is required' }, { type: 'email', message: 'Invalid Email Format' }]}
                            >
                                <Input placeholder='john@gmail.com' className='!py-2' />
                            </Form.Item>
                        </div>
                        <div>
                            <div className='font-semibold mb-1'>Password</div>
                            <Form.Item
                                name='password'
                                rules={[{ required: true, message: 'Password Field is required' }]}
                            >
                                <div className='relative'>
                                    <Input placeholder='Password' type={passwordHide ? 'password' : 'text'} className='!py-2' />
                                    {
                                        passwordHide ?

                                            <FaRegEyeSlash fontSize='large' className='cursor-pointer absolute right-3 top-[10px]' onClick={() => setPasswordHide(false)} />
                                            :
                                            <FaRegEye fontSize='large' className='cursor-pointer absolute right-3 top-[10px]' onClick={() => setPasswordHide(true)} />
                                    }
                                </div>
                            </Form.Item>
                            <div className='flex justify-between items-start gap-4 '>
                                <div className='flex items-start'>
                                    <Form.Item
                                        name='remember_me'
                                        initialValue={true}
                                        valuePropName='checked'
                                        className='flex items-center justify-start gap-4  '
                                    >

                                        <Checkbox id='checkbox' />
                                    </Form.Item>
                                    <label htmlFor="checkbox" className=' ml-2 cursor-pointer mt-1'>Remember me</label>
                                </div>

                                <div className='cursor-pointer text-blue-600 mt-1 font-semibold'>
                                    Forgot your passowrd ?
                                </div>
                            </div>
                            <div className='relative'>
                                <button disabled={loading} className='text-white bg-blue-600 font-medium text-center w-full cursor-pointer rounded-md flex justify-center items-center py-2' type='submit'>
                                    Submit
                                </button>
                                {
                                    loading &&
                                    <Spinner />
                                }
                            </div>
                            <div className='flex items-center gap-2 mt-6'>
                                <span>Not have any account?</span>
                                <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login