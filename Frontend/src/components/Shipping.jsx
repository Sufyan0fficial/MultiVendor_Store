import { Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Country, State, City } from 'country-state-city'
import useSelection from 'antd/es/table/hooks/useSelection'
import { useSelector } from 'react-redux'
import { useForm } from 'antd/es/form/Form'

function Shipping({ref,handleFinish}) {
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [addressType, setAddrssType] = useState('')
    const { userData } = useSelector(state => state?.UserReducer)
    const [form] = useForm()

    useEffect(() => {
        const address = userData?.addresses && userData?.addresses?.find((item, i) => {
            return item?.address_type === addressType
        })
        console.log('addrss is', address)
        form.setFieldValue('country', address?.country)
        form.setFieldValue('state', address?.state)
        form.setFieldValue('city', address?.city)
        form.setFieldValue('address1', address?.address1)
        form.setFieldValue('address2', address?.address2)
        setCountry(address?.country)
        setState(address?.state)

    }, [addressType])
    console.log('country is', country)

    return (
        <div className='px-6 md:px-10 py-10'>
            <div className='text-lg md:text-2xl font-semibold tracking-tight mb-10'>
                Shipping Address
            </div>
            <Form
                name={'shipping form'}
                layout='vertical'
                className='w-full grid grid-cols-1 lg:grid-cols-2 gap-x-6 '
                form={form}
                ref={ref}
                onFinish={(values)=>handleFinish(values)}
            >
                <Form.Item
                    name='name'
                    label='Full Name'
                    initialValue={userData?.name}
                >
                    <Input placeholder='John Doe' />
                </Form.Item>
                <Form.Item
                    name='email'
                    label='Email Address'
                    initialValue={userData?.email}
                >
                    <Input placeholder='john@gmail.com' />
                </Form.Item>
                <Form.Item
                    name='phone'
                    label='Phone Number'
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item
                    name='country'
                    label='Country'
                    rules={[{ required: true, message: 'Country is required' }]}
                >
                    <Select onChange={(value) => setCountry(value)}>
                        <Select.Option value=''>
                            Choose country
                        </Select.Option>
                        {
                            Country.getAllCountries().map((item, i) => {
                                return (
                                    <Select.Option key={i} value={item?.isoCode}>
                                        {item?.name}
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
                    <Select onChange={(value) => setState(value)}>
                        <Select.Option value=''>
                            Choose state
                        </Select.Option>
                        {
                            State.getStatesOfCountry(country).map((item, i) => {
                                return (
                                    <Select.Option key={i} value={item?.isoCode}>
                                        {item?.name}
                                    </Select.Option>
                                )
                            })
                        }

                    </Select>
                </Form.Item>
                <Form.Item
                    name='city'
                    label='City'
                    rules={[{ required: true, message: 'City is required' }]}
                >
                    <Select onChange={(value) => setCity(value)}>
                        <Select.Option value=''>
                            Choose city
                        </Select.Option>
                        {
                            City.getCitiesOfState(country, state).map((item, i) => {
                                return (
                                    <Select.Option key={i} value={item?.name}>
                                        {item?.name}
                                    </Select.Option>
                                )
                            })
                        }

                    </Select>
                </Form.Item>
                <Form.Item
                    name='address1'
                    label='Address 1'
                    rules={[{ required: true, message: 'Address1 is required' }]}
                >
                    <Input placeholder='address 1' />
                </Form.Item>
                <Form.Item
                    name='address2'
                    label='Address 2'
                >
                    <Input placeholder='' />
                </Form.Item>

                <Form.Item
                    name={'address_type'}
                    label='Choose from Saved address'
                >
                    <Select onChange={(value) => setAddrssType(value)}>
                        {
                            userData?.addresses && userData?.addresses?.map((item, i) => {
                                return (

                                    <Select.Option value={item?.address_type}>
                                        {item?.address_type}
                                    </Select.Option>
                                )
                            })
                        }
                        
                    </Select>

                </Form.Item>

            </Form>
        </div>
    )
}

export default Shipping