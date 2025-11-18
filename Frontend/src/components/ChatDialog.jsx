import React, { useState } from 'react';
import { IoClose, IoSendSharp } from 'react-icons/io5';
import { BiMessageDetail } from 'react-icons/bi';
import { useNavigate } from 'react-router'; 
import { CustomerSocket } from '../../customer.socketio';

import { useSelector } from 'react-redux';
const ChatDialog = ({ isOpen, onClose, shopInfo, productInfo }) => {
  console.log('shopinfo',shopInfo,'prodcut inof',productInfo)
  const [message, setMessage] = useState(`Hi! I'm interested in "${productInfo?.name}". Is it available?`);
  const userData = useSelector(state=>state?.UserReducer?.userData)
 

  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'customer',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const MessageTobeStored = {
        customer_id: userData?._id,
        vendor_id: shopInfo?.id,
        timeStamp:{
          customer: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        onlineStatus:{
          customer:true
        },
        lastMessage:{
          customer:message
        },
        messages:{
          customer:{
            productInfo,
            message
          }
        }

      }

      setMessages([...messages, newMessage]);
      setMessage('');
      CustomerSocket.emit('customer message', MessageTobeStored)
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const goToInbox = () => {
    onClose();
    navigate('/profile');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 shadow-2xl bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[500px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-lg">
          <div className="flex items-center space-x-3">
              
            <img src={`${import.meta.env.VITE_API_DEV}/uploads/${shopInfo?.image}`} className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold" alt="shop_img" />
            <div>
              <h3 className="font-medium text-gray-900">{shopInfo?.name || 'Shop Name'}</h3>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <IoClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-3 bg-blue-50 border-b border-gray-200 flex items-center space-x-3">
          <img
            src={`${import.meta.env.VITE_API_DEV}/uploads/${productInfo?.image || 'https://via.placeholder.com/40'}`}
            alt={productInfo?.name}
            className="w-10 h-10 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {productInfo?.name || 'Product Name'}
            </p>
            <p className="text-sm text-gray-600">
              ${productInfo?.price || '0.00'}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  msg.sender === 'customer'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'customer' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <IoSendSharp className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-center">
            <button
              onClick={goToInbox}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Go to full inbox →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDialog;
