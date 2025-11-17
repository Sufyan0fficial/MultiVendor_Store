import React, { useState } from 'react';
import { IoSearchOutline, IoSendSharp } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdArrowBack } from 'react-icons/md';

const CustomerInbox = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Static chat data
  const chats = [
    {
      id: 1,
      shopName: 'TechStore Pro',
      shopAvatar: 'https://via.placeholder.com/40/4F46E5/FFFFFF?text=TS',
      lastMessage: 'Your order has been shipped!',
      timestamp: '2:30 PM',
      unreadCount: 2,
      isOnline: true,
      messages: [
        { id: 1, text: 'Hello! I have a question about my order', sender: 'customer', timestamp: '2:25 PM' },
        { id: 2, text: 'Hi! I\'d be happy to help. What\'s your order number?', sender: 'shop', timestamp: '2:26 PM' },
        { id: 3, text: 'It\'s #12345', sender: 'customer', timestamp: '2:27 PM' },
        { id: 4, text: 'Perfect! I can see your order here. Your order has been shipped!', sender: 'shop', timestamp: '2:30 PM' }
      ]
    },
    {
      id: 2,
      shopName: 'Fashion Hub',
      shopAvatar: 'https://via.placeholder.com/40/EC4899/FFFFFF?text=FH',
      lastMessage: 'Thank you for your purchase!',
      timestamp: '1:15 PM',
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: 1, text: 'Is this dress available in size M?', sender: 'customer', timestamp: '1:10 PM' },
        { id: 2, text: 'Yes, we have it in stock!', sender: 'shop', timestamp: '1:12 PM' },
        { id: 3, text: 'Great! I\'ll order it now', sender: 'customer', timestamp: '1:13 PM' },
        { id: 4, text: 'Thank you for your purchase!', sender: 'shop', timestamp: '1:15 PM' }
      ]
    },
    {
      id: 3,
      shopName: 'Home Essentials',
      shopAvatar: 'https://via.placeholder.com/40/10B981/FFFFFF?text=HE',
      lastMessage: 'We have a new collection!',
      timestamp: 'Yesterday',
      unreadCount: 1,
      isOnline: true,
      messages: [
        { id: 1, text: 'Hi! We have a new collection of home decor items', sender: 'shop', timestamp: 'Yesterday' },
        { id: 2, text: 'Would you like to check it out?', sender: 'shop', timestamp: 'Yesterday' }
      ]
    },
    {
      id: 4,
      shopName: 'Sports World',
      shopAvatar: 'https://via.placeholder.com/40/F59E0B/FFFFFF?text=SW',
      lastMessage: 'Your return has been processed',
      timestamp: 'Monday',
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: 1, text: 'I need to return this item', sender: 'customer', timestamp: 'Monday' },
        { id: 2, text: 'Sure! Please provide the reason for return', sender: 'shop', timestamp: 'Monday' },
        { id: 3, text: 'Wrong size delivered', sender: 'customer', timestamp: 'Monday' },
        { id: 4, text: 'Your return has been processed', sender: 'shop', timestamp: 'Monday' }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // Add message to selected chat (in real app, this would be an API call)
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'customer',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessage('');
      // In real implementation, update the chat messages
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat List */}
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/3 border-r border-gray-200`}>
        {/* Header */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
          <div className="mt-3 relative">
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat?.id === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={chat.shopAvatar}
                    alt={chat.shopName}
                    className="w-12 h-12 rounded-full"
                  />
                  {chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{chat.shopName}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-col flex-1`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-1 hover:bg-gray-200 rounded-full"
                >
                  <MdArrowBack className="w-5 h-5" />
                </button>
                <img
                  src={selectedChat.shopAvatar}
                  alt={selectedChat.shopName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{selectedChat.shopName}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedChat.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-full">
                <BsThreeDotsVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
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
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <IoSendSharp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoSearchOutline className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInbox;
