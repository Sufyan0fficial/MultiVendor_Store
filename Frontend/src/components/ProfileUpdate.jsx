import { Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { IoCameraOutline } from 'react-icons/io5'
import { RxAvatar } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Trimmer } from '../utils/trimmer'
import { Message } from '../utils/notifymessage'
import { UpdateProfile } from '../api/routes'
import { storeUserData } from '../Redux/UserSlice'

function ProfileUpdate() {
    const [form] = useForm()
    const [finishFail, setFinishFail] = useState(false)
    const [loading, setloading] = useState(false)
    const [passwordHide, setPasswordHide] = useState(false)
    const { userData } = useSelector(state => state.UserReducer)
    const { screenWidth } = useSelector(state => state.UtilReducer)
    const [avatar, setAvatar] = useState(null)
    const finalAvatar = avatar ? URL.createObjectURL(avatar) : `${import.meta.env.VITE_API_DEV}/uploads/${userData?.avatar}`
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useDispatch()
    const handleProfileUpdate = async (values) => {
        setloading(true)
        const refinedData = Trimmer(values)
        const data = new FormData()
        // const keys = Object.keys(refinedData)
        Object.entries(refinedData).forEach(([key, value]) => {
            if (!value) return
            else if (userData?.email === refinedData[key]) return
            else if (userData?.name === refinedData[key]) return
            else {
                data.append(key, value)
            }
        })
        try {
            if([...data.entries()].length === 0){
                return Message(messageApi,'warning','Please make some change to update the profile')
            }
            const res = await UpdateProfile(data,userData?._id)
            if(res.status === 200){
                Message(messageApi,'success',(res.data?.message || 'Pofile Updated Successfully'))
                dispatch(storeUserData(res.data?.data))
            }
        } catch (error) {
            Message(messageApi,'error','Something went wrong')
        }
        finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (userData) {
            form.setFieldValue('email', userData?.email)
            form.setFieldValue('name', userData?.name)
            form.setFieldValue('phone',userData?.phone)
        }
        else return
    }, [userData])
    return (
        <div className='w-full py-10'>
            {contextHolder}
            <Form
                onChange={() => {
                    console.log('form data is', form.getFieldsValue())

                }}
                onFinish={handleProfileUpdate}
                form={form}
                onFinishFailed={() =>
                    setFinishFail(true)}
                className=''
            >
                <div className='mb-8'>
                    <div className=' mb-2 flex items-center gap-6 '>
                        <Form.Item
                            name='avatar'
                            valuePropName='file'
                            getValueFromEvent={(e) => e.target.files[0]}
                            className='hidden'
                        >
                            <Input type='file' accept='image/*' id='avatar' onChange={(e) => setAvatar(e.target.files[0])} />
                        </Form.Item>

                        <div className='flex justify-center items-center w-full'>
                            <div className='relative'>

                                <img src={finalAvatar} alt="profile_img" className={`${screenWidth <= 788 ? 'w-20 h-20' : 'w-40 h-40'} border-2 border-green-500 rounded-full flex justify-center items-center object-cover self-center`} />
                                <label htmlFor='avatar' className={`absolute ${screenWidth <= 768 ? 'bottom-0 -right-2' : 'bottom-3 right-1'} w-7 h-7 bg-gray-200 flex justify-center items-center rounded-full border border-gray-400 cursor-pointer`}>
                                    <IoCameraOutline color='black' />

                                    <input type="file" id='avatar' hidden accept='image/*' onChange={(e) => setAvatar(e.target.files[0])} />
                                </label>
                            </div>
                        </div>

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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 grid-flow-row-dense'>


                    <div>
                        <div className='font-semibold mb-1'>Full Name</div>
                        <Form.Item
                            name='name'
                            rules={[{ required: true, message: 'Name is required' }]}
                        >
                            <Input placeholder='John' className='!py-2' />
                        </Form.Item>
                    </div>


                    <div>
                        <div className='font-semibold mb-1'>Email Address</div>
                        <Form.Item
                            name='email'
                            rules={[{ required: true, message: 'Email is required' }, { type: 'email', message: 'Invalid email format' }]}
                        >
                            <Input placeholder='john@gmail.com' className='!py-2' />
                        </Form.Item>
                    </div>
                    <div>
                        <div className='font-semibold mb-1'>Phone Number</div>
                        <Form.Item
                            name='phone'
                        >
                            <Input placeholder='john@gmail.com' className='!py-2' type='number' />
                        </Form.Item>
                    </div>
                    <div className=''>
                        <div className='font-semibold mb-1'>Password</div>
                        <Form.Item
                            name='password'
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



                    </div>
                </div>
                <div className='relative'>
                    <button disabled={loading} className='text-white bg-blue-600 font-medium text-center w-full md:w-1/2 mx-auto cursor-pointer rounded-md flex justify-center items-center py-2 mt-6' type='submit'>
                        Update
                    </button>
                    {
                        loading &&
                        <Spinner />
                    }
                </div>
            </Form>

        </div>
    )
}

export default ProfileUpdate