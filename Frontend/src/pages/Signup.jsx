import { Checkbox, Form, Input, message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { RxAvatar } from "react-icons/rx";
import { Trimmer } from '../utils/trimmer';
import { Register } from '../api/routes';
import Spinner from '../components/Spinner';
import { Message } from '../utils/notifymessage';


function Signup() {
    const [passwordHide, setPasswordHide] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const handleSignup = async (values) => {
        setLoading(true)
        const data = Trimmer(values)
        const formData = new FormData()
        formData.append('name', data?.name)
        formData.append('email', data?.email)
        formData.append('password', data?.password)
        formData.append('avatar', data?.avatar)

        try {
            const res = await Register(formData)
            console.log('res is',res)
            if (res.status == 200) {
                Message(messageApi, 'success', 'Please Check your email to activate your account')
               
            }

        } catch (error) {
            console.log('errr is', error.message)
        }
        finally {
            setLoading(false)
        }
    }
    const [finishFail, setFinishFail] = useState(false)
    return (
        <div className='min-h-[calc(100vh)] flex items-center justify-center px-6'>

            <div className='max-h-max w-full md:max-w-[448px]'>
            {contextHolder}
                <div className='font-bold text-xl  md:text-3xl text-black md:tracking-tight mb-6 text-center '>Register as a new User</div>
                <div className='px-6 md:px-10 py-10 border rounded-lg border-gray-200 shadow-lg '>
                    <Form
                        onFinish={handleSignup}
                        form={form}
                        onFinishFailed={() =>
                            setFinishFail(true)}
                        className=''
                    >
                        <div>
                            <div className='font-semibold mb-1'>Full Name</div>
                            <Form.Item
                                name='name'
                                rules={[{ required: true, message: 'Name Field is required' }]}
                            >
                                <Input placeholder='John' className='!py-2' />
                            </Form.Item>
                        </div>
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
                            <div className='mb-8'>
                                <div className=' mt-8 mb-2 flex items-center gap-6 '>
                                    <Form.Item
                                        name='avatar'
                                        valuePropName='file'
                                        getValueFromEvent={(e) => e.target.files[0]}
                                        className='hidden'
                                        rules={[{ required: true, message: 'Please Upload your Profile Image' }]}
                                    >
                                        <Input type='file' accept='image/*' id='avatar' onChange={(e) => setAvatar(e.target.files[0])} />
                                    </Form.Item>
                                    {
                                        avatar ?
                                            <img src={URL.createObjectURL(avatar)} alt="" className='w-8 h-8 rounded-full flex justify-center items-center' />
                                            :
                                            <RxAvatar className='w-8 h-8' />
                                    }

                                    <label htmlFor="avatar" className='border px-6 py-2 rounded-md border-gray-400 font-medium cursor-pointer'>
                                        Upload a file
                                    </label>

                                </div>
                                {
                                    console.log('avatar error is', form.getFieldError('avat'))
                                }
                                {form.getFieldError('avatar').length > 0 && (
                                    <div style={{ color: 'red', marginTop: 0 }}>
                                        {form.getFieldError('avatar')[0]}
                                    </div>
                                )}
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
                                <span>Already have an account?</span>
                                <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/login')}>Login</span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Signup