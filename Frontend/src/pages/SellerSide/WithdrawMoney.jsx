import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  Card, 
  Row, 
  Col, 
  Statistic,
  Button, 
  Form, 
  Input, 
  Select, 
  Modal, 
  Table, 
  Tag, 
  Alert,
  Spin,
  Divider,
  Typography,
  Space,
  InputNumber
} from 'antd'
import { 
  DollarOutlined, 
  BankOutlined, 
  CreditCardOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined
} from '@ant-design/icons'
import { getVendorOrders, requestWithdrawal, getWithdrawalHistory, getFinancialStats } from '../../api/routes'
import Lottie from 'lottie-react'
import animationData from '../../assets/Animations/ShopingCart.json'

const { Title, Text } = Typography
const { Option } = Select

function WithdrawMoney() {
  const [loading, setLoading] = useState(true)
  const [withdrawalModalVisible, setWithdrawModalVisible] = useState(false)
  const [withdrawalHistory, setWithdrawalHistory] = useState([])
  const [form] = Form.useForm()
  
  const { sellerData } = useSelector(state => state.SellerReducer)

  // Financial stats
  const [financialStats, setFinancialStats] = useState({
    totalRevenue: 0,
    availableBalance: 0,
    pendingWithdrawals: 0,
    totalWithdrawn: 0
  })

  useEffect(() => {
    if (sellerData?._id) {
      fetchFinancialData()
    }
  }, [sellerData])

  const fetchFinancialData = async () => {
    try {
      setLoading(true)
      
      // Fetch financial stats from API
      const [statsRes, historyRes] = await Promise.all([
        getFinancialStats(),
        getWithdrawalHistory()
      ])

      if (statsRes.status === 200) {
        setFinancialStats(statsRes.data?.data || {
          totalRevenue: 0,
          availableBalance: 0,
          pendingWithdrawals: 0,
          totalWithdrawn: 0
        })
      }

      if (historyRes.status === 200) {
        const withdrawals = historyRes.data?.data || []
        const formattedHistory = withdrawals.map((withdrawal, index) => ({
          key: withdrawal._id || index,
          id: `WD${withdrawal._id?.slice(-6) || '000'}`,
          amount: withdrawal.amount,
          method: withdrawal.method === 'bank' ? 'Bank Transfer' : 'PayPal',
          status: withdrawal.status,
          date: withdrawal.createdAt,
          accountInfo: withdrawal.account_info?.slice(0, 20) + '...' || 'N/A'
        }))
        setWithdrawalHistory(formattedHistory)
      }
    } catch (error) {
      console.error('Failed to fetch financial data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleWithdraw = async (values) => {
    try {
      const payload = {
        amount: parseFloat(values.amount),
        method: values.method,
        account_info: values.accountInfo
      }

      const response = await requestWithdrawal(payload)
      
      if (response.status === 201) {
        Modal.success({
          title: 'Withdrawal Request Submitted',
          content: `Your withdrawal request for $${values.amount} has been submitted successfully. It will be processed within 2-3 business days.`,
        })
        
        setWithdrawModalVisible(false)
        form.resetFields()
        
        // Refresh data
        fetchFinancialData()
      }
    } catch (error) {
      console.error('Withdrawal failed:', error)
      Modal.error({
        title: 'Withdrawal Failed',
        content: error.response?.data?.message || 'Failed to submit withdrawal request. Please try again.',
      })
    }
  }

  const statsCards = [
    {
      title: 'Total Revenue',
      value: financialStats.totalRevenue,
      prefix: '$',
      icon: <DollarOutlined className="text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      description: 'Total earnings from all sales'
    },
    {
      title: 'Available Balance',
      value: financialStats.availableBalance,
      prefix: '$',
      icon: <BankOutlined className="text-green-600" />,
      color: 'bg-green-50 border-green-200',
      description: 'Amount available for withdrawal'
    },
    {
      title: 'Pending Withdrawals',
      value: financialStats.pendingWithdrawals,
      prefix: '$',
      icon: <ClockCircleOutlined className="text-orange-600" />,
      color: 'bg-orange-50 border-orange-200',
      description: 'Withdrawals being processed'
    },
    {
      title: 'Total Withdrawn',
      value: financialStats.totalWithdrawn,
      prefix: '$',
      icon: <CheckCircleOutlined className="text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      description: 'Total amount withdrawn to date'
    }
  ]

  const withdrawalColumns = [
    {
      title: 'Withdrawal ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Text strong className="text-blue-600">{text}</Text>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text strong>${amount}</Text>
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method) => (
        <Space>
          {method === 'Bank Transfer' ? <BankOutlined /> : <CreditCardOutlined />}
          {method}
        </Space>
      )
    },
    {
      title: 'Account',
      dataIndex: 'accountInfo',
      key: 'accountInfo'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          completed: 'green',
          pending: 'orange',
          failed: 'red'
        }
        const icons = {
          completed: <CheckCircleOutlined />,
          pending: <ClockCircleOutlined />,
          failed: <ExclamationCircleOutlined />
        }
        return (
          <Tag color={colors[status]} icon={icons[status]}>
            {status.toUpperCase()}
          </Tag>
        )
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ]

  if (loading) {
    return (
       <div className='min-h-[calc(100vh-200px)] flex justify-center items-center w-full'>

          <div style={{ width: 300, height: 300 }}>
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <Title level={2} className="!mb-2">
          <DollarOutlined className="mr-2" />
          Withdraw Money
        </Title>
        <Text type="secondary">
          Manage your earnings and withdrawal requests
        </Text>
      </div>

      {/* Financial Overview Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {statsCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className={`${stat.color} border-l-4 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Text type="secondary" className="text-sm block mb-1">
                    {stat.title}
                  </Text>
                  <Statistic  
                    value={stat.value}
                    prefix={stat.prefix}
                    className="!mb-2"
                    valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
                  />
                  <Text type="secondary" className="text-xs">
                    {stat.description}
                  </Text>
                </div>
                <div className="text-3xl opacity-80">
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Withdrawal Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card 
            title={
              <Space>
                <BankOutlined />
                <span>Request Withdrawal</span>
              </Space>
            }
            className="h-full"
          >
            <div className="space-y-4">
              <Alert
                message="Withdrawal Information"
                description="Withdrawals are processed within 2-3 business days. Minimum withdrawal amount is $50. A processing fee of 2% applies to all withdrawals."
                type="info"
                showIcon
                className="mb-4"
              />
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <Text strong className="text-green-800">Available Balance</Text>
                  <Text strong className="text-2xl text-green-600">
                    ${financialStats.availableBalance}
                  </Text>
                </div>
                <Text type="secondary" className="text-sm">
                  This amount is available for immediate withdrawal
                </Text>
              </div>

              <Button
                type="primary"
                size="large"
                icon={<DollarOutlined />}
                onClick={() => setWithdrawModalVisible(true)}
                disabled={financialStats.availableBalance < 50}
                className="w-full"
              >
                Request Withdrawal
              </Button>

              {financialStats.availableBalance < 50 && (
                <Alert
                  message="Minimum withdrawal amount is $50"
                  type="warning"
                  showIcon
                />
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <HistoryOutlined />
                <span>Quick Stats</span>
              </Space>
            }
            className="h-full"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <Text>This Month's Sales</Text>
                <Text strong>${Math.floor(financialStats.totalRevenue * 0.3)}</Text>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <Text>Last Withdrawal</Text>
                <Text strong>Nov 10, 2024</Text>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <Text>Processing Fee</Text>
                <Text strong>2%</Text>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <Text>Processing Time</Text>
                <Text strong>2-3 days</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Withdrawal History */}
      <Card 
        title={
          <Space>
            <HistoryOutlined />
            <span>Withdrawal History</span>
          </Space>
        }
      >
        <Table
          columns={withdrawalColumns}
          dataSource={withdrawalHistory}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} withdrawals`
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Withdrawal Modal */}
      <Modal
        title={
          <Space>
            <DollarOutlined />
            <span>Request Withdrawal</span>
          </Space>
        }
        open={withdrawalModalVisible}
        onCancel={() => {
          setWithdrawModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleWithdraw}
          className="mt-4"
        >
          <Alert
            message={`Available Balance: $${financialStats.availableBalance}`}
            type="info"
            className="mb-4"
          />

          <Form.Item
            label="Withdrawal Amount"
            name="amount"
            rules={[
              { required: true, message: 'Please enter withdrawal amount' },
              { 
                type: 'number', 
                min: 50, 
                max: financialStats.availableBalance,
                message: `Amount must be between $50 and $${financialStats.availableBalance}` 
              }
            ]}
          >
            <InputNumber
              prefix="$"
              type="number"
              placeholder="Enter amount"
              size="large"
              style={{width:`100%`}}
            />
          </Form.Item>

          <Form.Item
            label="Withdrawal Method"
            name="method"
            rules={[{ required: true, message: 'Please select withdrawal method' }]}
          >
            <Select placeholder="Select withdrawal method" size="large">
              <Option value="bank">
                <Space>
                  <BankOutlined />
                  Bank Transfer
                </Space>
              </Option>
              <Option value="paypal">
                <Space>
                  <CreditCardOutlined />
                  PayPal
                </Space>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Account Information"
            name="accountInfo"
            rules={[{ required: true, message: 'Please enter account information' }]}
          >
            <Input.TextArea
              placeholder="Enter bank account details or PayPal email"
              rows={3}
            />
          </Form.Item>

          <Divider />

          <div className="bg-gray-50 p-4 rounded mb-4">
            <div className="flex justify-between mb-2">
              <Text>Withdrawal Amount:</Text>
              <Text strong>$0.00</Text>
            </div>
            <div className="flex justify-between mb-2">
              <Text>Processing Fee (2%):</Text>
              <Text strong>$0.00</Text>
            </div>
            <Divider className="my-2" />
            <div className="flex justify-between">
              <Text strong>You'll Receive:</Text>
              <Text strong className="text-green-600">$0.00</Text>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => {
                setWithdrawModalVisible(false)
                form.resetFields()
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              className="flex-1"
            >
              Submit Request
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default WithdrawMoney
