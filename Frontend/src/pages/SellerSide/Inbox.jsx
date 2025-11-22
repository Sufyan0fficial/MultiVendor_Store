import React from 'react'
import Inbox from '../../components/Inbox'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { Message } from '../../utils/notifymessage'
import { FetchVendorChat } from '../../api/routes'
import { Socket } from '../../../socketio'
function VendorInbox() {
    const [chat, setChat] = useState([])
    const { sellerData } = useSelector((state) => state?.SellerReducer)
    const [selectedChat, setSelectedChat] = useState({});
    const [messageApi, contextHolder] = message.useMessage()
    const [Message, setMessage] = useState('')
    console.log('message is', Message)
    console.log('selectedMessage is', selectedChat)
    useEffect(() => {
        const handleMessageEvent = (data) => {
            // if(Object.keys(selectedChat)?.length > 0){
                 setSelectedChat(pre => ({...pre,messages : [...pre?.messages, data?.message] }))
            // }
            // else return
        }
        Socket.on('message',handleMessageEvent)
        return ()=>Socket.off('message',handleMessageEvent)
    }, [])
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
                sender: 'vendor',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setSelectedChat(pre => ({ ...pre, messages: [...pre.messages, newMessage] }))
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

            <Inbox chats={chat} userType={'vendor'} handleSendMessage={handleSendMessage} selectedChat={selectedChat} setSelectedChat={setSelectedChat} message={Message} setMessage={setMessage} />

        </div>
    )
}

export default VendorInbox