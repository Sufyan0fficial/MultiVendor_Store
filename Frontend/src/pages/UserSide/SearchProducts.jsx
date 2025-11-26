import { Checkbox, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Filters } from '../../api/routes'
import { Message } from '../../utils/notifymessage'
import ProductCard from '../../components/ProductCard'
import Lottie from 'lottie-react'
import animationData from '../../assets/Animations/ShopingCart.json'

function SearchProducts() {
    const [filters, setFilters] = useState({
        searchTerm: '',
        order: 'desc',
        sortBy: 'createdAt',
        discount: false
    })
    const [discount, setDiscount] = useState(true)

    const [sortingOption, setSortingOption] = useState('latest')
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [productsData, setProductsData] = useState([])

    useEffect(() => {
        setLoading(true)
        const queryParams = new URLSearchParams(window.location.search)
        const searchTerm = queryParams.get('searchTerm') || ''
        const order = queryParams.get('order') || 'desc'
        const sortBy = queryParams.get('sortBy') || 'createdAt'
        const discount = queryParams.get('discount') === 'true'
        setFilters({
            searchTerm,
            order,
            sortBy,
            discount
        })
        if (order === 'desc' && sortBy === 'createdAt') {
            setSortingOption('latest')
        }
        if (order === 'asc' && sortBy === 'createdAt') {
            setSortingOption('oldest')
        }
        if (order === 'desc' && sortBy === 'original_price') {
            setSortingOption('high_to_low')
        }
        if (order === 'asc' && sortBy === 'original_price') {
            setSortingOption('low_to_high')
        }
        setDiscount(discount)

        const queryString = queryParams.toString()

        const fetchProducts = async () => {
            setLoading(true)
            try {

                const res = await Filters(queryString)
                if (res.status === 200) {
                    setProductsData(res.data?.data)
                }
            } catch (error) {
                Message(messageApi, 'error', 'Failed to fetch Products')
            }
            finally {
                setLoading(false)
            }

        }
        fetchProducts()

    }, [location.search])

    const handleSorting = (e) => {
        const queryParams = new URLSearchParams(window.location.search)
        const { value } = e.target
        setSortingOption(value)
        if (value === 'latest') {

            queryParams.set('sortBy', 'createdAt')
            queryParams.set('order', 'desc')
        } else if (value === 'oldest') {

            queryParams.set('sortBy', 'createdAt')
            queryParams.set('order', 'asc')
        } else if (value === 'high_to_low') {

            queryParams.set('sortBy', 'original_price')
            queryParams.set('order', 'desc')
        }
        else if (value === 'low_to_high') {
            queryParams.set('sortBy', 'original_price')
            queryParams.set('order', 'asc')
        }
        const queryString = queryParams.toString()
        navigate(`/search?${queryString}`)
    }

    const handleDiscount = (e) => {
        const queryParams = new URLSearchParams(location.search)
        const { checked } = e.target
        setDiscount(checked)
        queryParams.set('discount', checked)
        const queryString = queryParams.toString()
        navigate(`/search?${queryString}`)
    }
    return (
        loading ?
            <div className='min-h-[calc(100vh-200px)] flex justify-center items-center w-full'>

                <div style={{ width: 300, height: 300 }}>
                    <Lottie animationData={animationData} loop={true} />
                </div>
            </div>
            :
            <div className='w-full mb-20'>
                <div className='max-w-7xl w-full px-6 md:px-10 mx-auto'>
                    <div className='w-full flex justify-end gap-x-6 gap-y-6 flex-col md:flex-row mt-20 md:mt-10 mb-10'>
                        <div className='flex gap-4 items-center'>
                            <div>
                                Sort by:
                            </div>

                            <select onChange={handleSorting} className='border focus:outline-0 rounded-md px-4 md:px-6 py-2 font-semibold cursor-pointer' value={sortingOption}>
                                <option value='latest'>Latest</option>
                                <option value='oldest'>Oldest</option>
                                <option value='high_to_low'>Price high to low</option>
                                <option value='low_to_high'>Price low to high</option>
                            </select>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <div>
                                Discount:
                            </div>
                            <Checkbox checked={discount} style={{ transform: 'scale(1.5)' }} onChange={handleDiscount} />
                        </div>

                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {
                            productsData?.length > 0 &&
                            productsData?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ProductCard product={item} shop={item?.shop} />
                                    </div>
                                )
                            })



                        }
                    </div>
                    {
                        productsData?.length === 0 &&

                        <div className='text-center flex justify-center mt-10 text-gray-500'>
                            No Products Found
                        </div>
                    }
                </div>
            </div>
    )
}

export default SearchProducts