import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, Row, Col, Statistic, Table, Tag, Progress, Avatar, Button, Select, DatePicker, Spin } from 'antd'
import { 
  DollarOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  EyeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { getVendorOrders, Get_Products, getProductReviews, getTotalShopReviews } from '../../api/routes'
import { Message } from '../../utils/notifymessage'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const { RangePicker } = DatePicker
const { Option } = Select

function Dashboard() {
  const [dateRange, setDateRange] = useState('7days')
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    productViews: 0
  })
  const [reviews, setReviews] = useState([])

    const { sellerData } = useSelector(state => state.SellerReducer)
  


  useEffect(() => {
    if (sellerData?._id) {
      fetchDashboardData()
    }
  }, [sellerData])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [ordersRes, productsRes, Reviews] = await Promise.all([
        getVendorOrders(sellerData._id),
        Get_Products(sellerData._id),
        getTotalShopReviews(sellerData?._id)
      ])

      if (ordersRes.status === 200) {
        const ordersData = ordersRes.data?.data || []
        setOrders(ordersData)
        calculateStats(ordersData)
      }

      if (productsRes.status === 200) {
        setProducts(productsRes.data?.data || [])
      }
      if (Reviews.status === 200) {
        setReviews(Reviews.data?.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (ordersData) => {
    const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total_price || 0), 0)
    const totalOrders = ordersData.length
    const uniqueCustomers = new Set(ordersData.map(order => order.customer_id)).size
    
    setStats({
      totalRevenue,
      totalOrders,
      totalCustomers: uniqueCustomers,
      productViews: products.length * 150 // Estimated views
    })
  }

  // Dynamic statistics data
  const statsCards = [
    {
      title: 'Total Revenue',
      value: stats.totalRevenue,
      prefix: '$',
      change: 12.5, // You can calculate this based on previous period
      trend: 'up',
      icon: <DollarOutlined className="text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      change: 8.2,
      trend: 'up',
      icon: <ShoppingCartOutlined className="text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      change: -2.1,
      trend: 'down',
      icon: <UserOutlined className="text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Total Products',
      value: products.length,
      change: 15.3,
      trend: 'up',
      icon: <EyeOutlined className="text-orange-600" />,
      color: 'bg-orange-50 border-orange-200'
    }
  ]

  // Process recent orders data
  const recentOrders = orders.slice(0, 5).map((order, index) => ({
    key: index,
    orderId: `#${order._id?.slice(-6)}`,
    customer: order.customer_detail?.name || 'Unknown Customer',
    avatar: `/${import.meta.env.VITE_API_DEV}/uploads/${order.customer_detail?.avatar}`,
    product: order.products?.[index]?.product_name || 'Multiple Products',
    amount: order.total_price,
    status: order.order_status?.toLowerCase() || 'pending',
    date: new Date(order.createdAt).toLocaleDateString()
  }))

  // Process top products data
  const topProducts = products.slice(0, 5).map(product => {
    const sales = product?.sold_out // Random sales for demo  
    const revenue = sales * (product?.couponedPrice || product?.discounted_price || product?.original_price)
    const growth = Math.floor(Math.random() * 40) - 10 // Random growth between -10 and 30
    
    return {
      name: product.product_name,
      sales,
      revenue,
      growth
    }
  })

  // Generate dynamic chart data
  const generateSalesChartData = () => {
    const last7Months = []
    const salesData = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      last7Months.push(date.toLocaleDateString('en-US', { month: 'short' }))
      
      // Calculate sales for this month
      const monthSales = orders.filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear()
      }).reduce((sum, order) => sum + order.total_price, 0)
      
      salesData.push(monthSales)
    }
    
    return {
      labels: last7Months,
      datasets: [
        {
          label: 'Sales',
          data: salesData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        }
      ]
    }
  }

  const generateOrderStatusData = () => {
    const statusCounts = orders.reduce((acc, order) => {
      const status = order.order_status || 'pending'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})

    return {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: [
            '#10B981',
            '#F59E0B',
            '#3B82F6',
            '#EF4444',
            '#6B7280'
          ]
        }
      ]
    }
  }

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <span className="font-medium text-blue-600">{text}</span>
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar size="small" icon={<UserOutlined />} />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span className="font-semibold">${amount}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          completed: 'green',
          processing: 'orange',
          shipped: 'blue',
          pending: 'red'
        }
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    }
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={dateRange}
              onChange={setDateRange}
              className="w-32"
            >
              <Option value="7days">Last 7 days</Option>
              <Option value="30days">Last 30 days</Option>
              <Option value="90days">Last 90 days</Option>
            </Select>
            <RangePicker />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {statsCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className={`${stat.color} border-l-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <Statistic  
                    value={stat.value}
                    prefix={stat.prefix}
                    className="mb-2"
                  />
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <ArrowUpOutlined className="text-green-500" />
                    ) : (
                      <ArrowDownOutlined className="text-red-500" />
                      
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="text-gray-500 text-sm">vs last period</span>
                  </div>
                </div>
                <div className="text-3xl">
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card title="Sales Overview" className="h-full">
            <div className="h-80">
              <Line
                data={generateSalesChartData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Order Status Distribution" className="h-full">
            <div className="h-80">
              <Doughnut
                data={generateOrderStatusData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders and Top Products */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={14}>
          <Card 
            title="Recent Orders" 
            extra={<Button type="link">View All</Button>}
          >
            <Table
              columns={orderColumns}
              dataSource={recentOrders}
              pagination={false}
              size="small"
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Top Products">
            <div className="space-y-4">
              {topProducts?.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">{product.sales} sales</span>
                      <span className="text-sm font-semibold text-green-600">${product.revenue}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${product.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {product.growth >= 0 ? (
                        <ArrowUpOutlined className="text-xs" />
                      ) : (
                        <ArrowDownOutlined className="text-xs" />
                      )}
                      <span className="text-sm font-medium">{Math.abs(product.growth)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

    </div>
  )
}

export default Dashboard
