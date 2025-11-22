import React from 'react'
import Inbox from './Inbox'
import { message } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { FetchCustomerChat } from '../api/routes'
import { useSelector } from 'react-redux'
import { Message } from '../utils/notifymessage'
import { Socket } from '../../socketio'
function CustomerInbox() {

  const [chat, setChat] = useState([])
  const { userData } = useSelector((state) => state?.UserReducer)
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageApi, contextHolder] = message.useMessage()
  const [Message, setMessage] = useState('')
  console.log('message is', Message)
  console.log('selectedMessage is', selectedChat)
  useEffect(() => {
    const handleMessageEvent = (data) => {
      console.log('message is...', data)
      setSelectedChat(pre => ({ ...pre, messages: [...pre.messages, data?.message] }))
    }
    Socket.on('message', handleMessageEvent)
    return () => Socket.off('message', handleMessageEvent)
  }, [])

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await FetchCustomerChat(userData?._id)
        const formattedData = res.data?.data?.length > 0 && res.data?.data?.map((data) => {
          const id = data?._id
          const shopName = data?.profileData?.vendor?.shop_name
          const shopAvatar = data?.profileData?.vendor?.avatar
          const isOnline = data?.onlineStatus?.vendor
          const messages = data?.messages
          const lastMessage = data?.lastMessage
          console.log('last message is', lastMessage)
          const profileData = data?.profileData

          return {
            id,
            shopName,
            shopAvatar,
            isOnline,
            messages,
            lastMessage,
            profileData
          }
        })
        setChat(formattedData)

      } catch (error) {
        Message(messageApi, 'error', 'Failed to fetch Customer chat')
      }
    }
    fetchChat()
  }, [])
  const handleSendMessage = () => {
    if (Message.trim() && selectedChat) {
      // Add message to selected chat (in real app, this would be an API call)
      const newMessage = {
        id: Date.now(),
        text: Message,
        sender: 'customer',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSelectedChat(pre => ({ ...pre, messages: [...pre.messages, newMessage] }))
      Socket.emit('customer message', {
        customer_id: selectedChat?.profileData?.customer?._id,
        vendor_id: selectedChat?.profileData?.vendor?._id,
        lastMessage: Message,
        message: newMessage
      })
      setMessage('');
      // In real implementation, update the chat messages
    }
  };
  return (
    <div>
      {contextHolder}

      <Inbox chats={chat} userType={'customer'} handleSendMessage={handleSendMessage} selectedChat={selectedChat} setSelectedChat={setSelectedChat} message={Message} setMessage={setMessage} />

    </div>
  )
}

export default CustomerInbox