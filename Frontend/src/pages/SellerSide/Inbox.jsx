import React from 'react'
import Inbox from '../../components/Inbox'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { FetchUserChat, FetchVendorChat } from '../../api/routes'
import { Socket } from '../../../socketio'
function VendorInbox() {
    const [chat, setChat] = useState([])
    const { sellerData } = useSelector((state) => state?.SellerReducer)
    const [selectedChat, setSelectedChat] = useState({});
    const [messageApi, contextHolder] = message.useMessage()
    const [Message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    console.log('messages are', messages)
    console.log('selectedMessage is', selectedChat)
    useEffect(() => {
        const handleMessageEvent = (data) => {
            console.log('is data triggering',data)
            setMessages(pre => ([...pre, data?.message]))
        }

            Socket.on('message-t-vendor', handleMessageEvent)
        return () => Socket.off('message-t-vendor', handleMessageEvent)
    }, [])
    useEffect(() => {
        const fetchParticularChat = async () => {
            try {
                const res = await FetchUserChat(selectedChat?.id)
                if (res.status === 200) {
                    setMessages(res.data?.data)
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Failed to Fetch Customer Chat'
                })
            }

        }
        if (selectedChat?.id) {
            fetchParticularChat()
        }
    }, [selectedChat?.id])
    useEffect(() => {
        const fetchChat = async () => {
            try {
                const res = await FetchVendorChat(sellerData?._id)
                const formattedData = res.data?.data?.length > 0 && res.data?.data?.map((data) => {
                    const id = data?._id
                    const shopName = data?.profileData?.customer?.name
                    const shopAvatar = data?.profileData?.customer?.avatar
                    const isOnline = data?.onlineStatus?.customer
                    const messages = data?.messages
                    const lastMessage = data?.lastMessage
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
                messageApi.open({
                    type: 'error',
                    content: 'Failed to Fetch Chats'
                })
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
                sender: 'vendor',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(pre => ([...pre, newMessage]))

            Socket.emit('vendor message', {
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

            <Inbox chats={chat} userType={'vendor'} handleSendMessage={handleSendMessage} selectedChat={selectedChat} setSelectedChat={setSelectedChat} message={Message} setMessage={setMessage} messages={messages} />

        </div>
    )
}

export default VendorInbox