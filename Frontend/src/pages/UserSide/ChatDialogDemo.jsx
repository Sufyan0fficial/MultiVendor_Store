import React, { useState } from 'react';
import ChatDialog from '../../components/ChatDialog';
import { BiMessageDetail } from 'react-icons/bi';

const ChatDialogDemo = () => {
  const [chatDialogOpen, setChatDialogOpen] = useState(false);

  const sampleProduct = {
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    image: 'https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=Headphones'
  };

  const sampleShop = {
    name: 'TechStore Pro'
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Chat Dialog Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Product Card */}
            <div className="bg-gray-50 rounded-lg p-6 flex-1">
              <img
                src={sampleProduct.image}
                alt={sampleProduct.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{sampleProduct.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">${sampleProduct.price}</p>
              
              {/* Send Message Button */}
              <button
                onClick={() => setChatDialogOpen(true)}
                className="flex items-center gap-2 bg-[#6443d1] px-6 py-3 rounded-md text-white w-full justify-center hover:bg-[#5a3bc4] transition-colors"
              >
                <span>Send Message</span>
                <BiMessageDetail />
              </button>
            </div>

            {/* Instructions */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-4">How it works:</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  Click "Send Message" button on any product
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  Chat dialog opens with product context
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  Start conversation with the vendor
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                  Click "Go to full inbox" for complete chat experience
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BiMessageDetail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Quick Messaging</h3>
            <p className="text-gray-600 text-sm">Start conversations directly from product pages</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold">📱</span>
            </div>
            <h3 className="font-semibold mb-2">Mobile Friendly</h3>
            <p className="text-gray-600 text-sm">Responsive design works on all devices</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold">💬</span>
            </div>
            <h3 className="font-semibold mb-2">Context Aware</h3>
            <p className="text-gray-600 text-sm">Shows product info in chat for better context</p>
          </div>
        </div>
      </div>

      {/* Chat Dialog */}
      <ChatDialog
        isOpen={chatDialogOpen}
        onClose={() => setChatDialogOpen(false)}
        shopInfo={sampleShop}
        productInfo={sampleProduct}
      />
    </div>
  );
};

export default ChatDialogDemo;
