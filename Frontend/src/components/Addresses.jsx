import { Form, Input, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Country, State, City } from 'country-state-city'
import { useForm } from 'antd/es/form/Form'
import { DeleteAddress, EditAddress, UpdateAddress } from '../api/routes'
import { Message } from '../utils/notifymessage'
import { useDispatch, useSelector } from 'react-redux'
import { storeUserData } from '../Redux/UserSlice'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'

function Addresses() {
    const [replaceButton, setReplaceButton] = useState(false)
    const { screenWidth } = useSelector(state => state?.UtilReducer)
    const [messageApi, contextHolder] = message.useMessage()
    const { userData } = useSelector(state => state?.UserReducer)
    const dispatch = useDispatch()
    const handleAddAddress = async (values) => {
        const isAlreadyAdded = userData?.addresses?.some((item, index) => {
            return item?.address_type === values?.address_type
        })
        if (isAlreadyAdded) {
            return Message(messageApi, 'warning', `Address against "${values?.address_type}" already avaialable. You can edit previous or Delete to add new `)
        }
        try {
            const res = await UpdateAddress(values, userData?._id)
            if (res.status == 200) {
                Message(messageApi, 'success', 'Address added successfully')
                form.resetFields()
                dispatch(storeUserData(res.data?.data))
            }
        } catch (error) {
            Message(messageApi, 'error', error.response.data?.message || 'Failed to add new address')
        }
    }
    const [form] = useForm()
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [addresses, setAddresses] = useState([])
    const [isEditAddress, setIsEditAddress] = useState(false)
    const [addressData, setAddressData] = useState({})
    console.log('address data is', addressData)
    console.log('country selected is', country)

    useEffect(() => {
        if (isEditAddress) {

            form.setFieldsValue(addressData)
        }
        else {
            form.resetFields()
        }
    }, [isEditAddress])
    const AddressType = [
        {
            key: 'default',
            name: 'Default'
        },
        {
            key: 'home',
            name: 'Home'
        },
        {
            key: 'office',
            name: 'Office'
        },
    ]
    const handleEditAddress = async (item) => {

        try {
            const res = await EditAddress(item, userData?._id)
            if (res.status === 200) {
                Message(messageApi, 'success', 'Address updated successfully')
                dispatch(storeUserData(res.data?.data))
            }
        } catch (error) {
            Message(messageApi, 'error', error.response?.data?.message || 'Failed to update the address')
        }
    }

    const handleDeleteAddress = async (item) => {
        try {
            const res = await DeleteAddress(item, userData?._id)
            if (res.status === 200) {
                Message(messageApi, 'success', 'Address deleted successfully')
                dispatch(storeUserData(res.data?.data))
            }
        } catch (error) {
            Message(messageApi, 'error', error.response?.data?.message || 'Failed to delete Address')
        }
    }
    return (
        <div>
            {
                contextHolder
            }
            <div className='flex justify-between items-center w-full mt-6'>
                <div className='font-semibold md:text-2xl tracking-tight'>
                    {
                        replaceButton ?
                            'Add New Address' :
                            'My Addresses'
                    }
                </div>
                {
                    (isEditAddress || replaceButton) ?
                        <RxCross2 onClick={() => {
                            form.resetFields()
                            setReplaceButton(false)
                            setIsEditAddress(false)
                            setAddressData(null)
                        }} size={30} className='cursor-pointer' /> :

                        <button className='bg-black px-6 py-2 flex items-center justify-center text-white rounded-md text-sm md:text-base cursor-pointer' onClick={() => {
                            setReplaceButton(true)
                            setAddressData(null)
                            setIsEditAddress(false)
                            form.resetFields()
                        }}>Add New</button>
                }

            </div>
            <div>
                {
                    (isEditAddress || replaceButton) ?

                        <Form
                            name='address'
                            onFinish={isEditAddress ? handleEditAddress : handleAddAddress}
                            layout='vertical'
                            className='!mb-10 !mt-10'
                            form={form}

                        >
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>



                                <Form.Item
                                    name='country'
                                    label='Country'
                                    rules={[{ required: true, message: 'Country is required' }]}
                                >
                                    <Select
                                        defaultValue={''}
                                        onChange={(value) => setCountry(value)}
                                        className='!min-h-[40px]'
                                    >
                                        <Select.Option value=''>
                                            Choose country
                                        </Select.Option>
                                        {
                                            Country.getAllCountries().map((item, index) => {
                                                return (


                                                    <Select.Option value={item.isoCode} key={index} className='flex'>
                                                        <div>

                                                            {item.name}
                                                        </div>

                                                    </Select.Option>


                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name='state'
                                    label='State'
                                    rules={[{ required: true, message: 'State is required' }]}
                                >
                                    <Select
                                        defaultValue={''}
                                        onChange={(value) => setState(value)}
                                        className='!min-h-[40px]'

                                    >
                                        <Select.Option value=''>
                                            Choose State
                                        </Select.Option>
                                        {
                                            State.getStatesOfCountry(country).map((item, index) => {
                                                return (


                                                    <Select.Option value={item.isoCode} key={index} className='flex'>
                                                        <div>

                                                            {item.name}
                                                        </div>

                                                    </Select.Option>


                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name='city'
                                    label='City'
                                    rules={[{ required: true, message: 'City field is required' }]}
                                >
                                    <Select
                                        defaultValue={''}
                                        onChange={(value) => setState(value)}
                                        className='!min-h-[40px]'

                                    >
                                        <Select.Option value=''>
                                            Choose City
                                        </Select.Option>
                                        {
                                            City.getCitiesOfState(country, state).map((item, index) => {
                                                return (


                                                    <Select.Option value={item.name} key={index} className='flex'>
                                                        <div>

                                                            {item.name}
                                                        </div>

                                                    </Select.Option>


                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name='address1'
                                    label='Address 1'
                                    rules={[{ required: true, message: 'Address 1 is required' }]}
                                >
                                    <Input placeholder='address 1' className='!min-h-[40px]' />
                                </Form.Item>
                                <Form.Item
                                    name='address2'
                                    label='Address 2'
                                >
                                    <Input placeholder='address 2' className='!min-h-[40px]' />
                                </Form.Item>
                                <Form.Item
                                    name='address_type'
                                    label='Address Type'
                                    rules={[{ required: true, message: 'Address type is required' }]}
                                >
                                    <Select
                                        defaultValue={''}
                                        onChange={(value) => setState(value)}
                                        className='!min-h-[40px]'

                                    >
                                        <Select.Option value=''>
                                            Choose Address Type
                                        </Select.Option>
                                        {
                                            AddressType.map((item, index) => {
                                                return (


                                                    <Select.Option value={item.key} key={index} className='flex'>
                                                        <div>

                                                            {item.name}
                                                        </div>

                                                    </Select.Option>


                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='w-full flex justify-center mt-6'>

                                <button type='submit' className='w-full md:w-1/2 mx-auto text-center px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-md'>
                                    {
                                        isEditAddress ?
                                            'Edit' :
                                            'Submit'
                                    }
                                </button>
                            </div>

                        </Form> :
                        <>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-10'>
                                {

                                    userData?.addresses?.length > 0 &&
                                    userData?.addresses?.map((item, index) => {
                                        const country = Country.getCountryByCode(item?.country)?.name
                                        const state = State.getStateByCode(item?.state)?.name

                                        return (
                                            <div key={index} className='w-full border border-gray-300 rounded-md bg-white py-6 px-6 md:px-10 flex justify-center relative'>
                                                <FaRegEdit size={screenWidth <= 768 ? 20 : 25} className='absolute left-3 cursor-pointer'
                                                    onClick={() => {
                                                        setIsEditAddress(true)
                                                        setAddressData(item)
                                                    }}
                                                />
                                                <AiOutlineDelete size={screenWidth <= 768 ? 20 : 25} className='absolute right-2 cursor-pointer'
                                                    onClick={() => handleDeleteAddress(item)}
                                                />
                                                <div className='flex flex-col  gap-y-2 '>


                                                    <div className='w-full'>
                                                        <div className='uppercase text-center mb-6 text-black flex justify-center items-center'>

                                                            <div className='max-w-max bg-green-500 px-4 py-1 font-semibold rounded-md'>

                                                                {item?.address_type}
                                                            </div>


                                                        </div>

                                                    </div>
                                                    <div className='flex gap-2 items-start '>
                                                        <div className='font-bold '>

                                                            Country :
                                                        </div>
                                                        <div className='text-gray-600'>

                                                            {country}
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-2 items-start '>
                                                        <div className='font-bold '>

                                                            State :
                                                        </div>
                                                        <div className='text-gray-600'>

                                                            {state}
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-2 items-start '>
                                                        <div className='font-bold '>

                                                            City :
                                                        </div>
                                                        <div className='text-gray-600'>

                                                            {item?.city}
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-2 items-start '>
                                                        <div className='font-bold '>

                                                            Address 1 :
                                                        </div>
                                                        <div className='text-gray-600 !text-wrap flex-shrink'>

                                                            {item?.address1}
                                                        </div>
                                                    </div>



                                                    {
                                                        item?.address2 &&
                                                        <div className='flex gap-2 items-start '>
                                                            <div className='font-bold '>

                                                                Address 2 :
                                                            </div>
                                                            <div className='text-gray-600 '>

                                                                {item?.address2}
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })


                                }
                            </div>


                            {

                            userData?.addresses?.length === 0 &&

                            <div className='text-gray-600 text-center w-full mt-20'>Address Book is empty</div>
                            }


                        </>






                }
            </div>
        </div>
    )
}

export default Addresses