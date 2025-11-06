import React from 'react'
import { FiTruck, FiRefreshCw, FiDollarSign, FiShield, FiMonitor, FiShoppingBag, FiWatch, FiSmartphone, FiHeadphones, FiGift, FiHeart, FiMoreHorizontal } from 'react-icons/fi'
import { GiClothes } from "react-icons/gi";

import { useNavigate } from 'react-router'

function Categories() {
  const navigate = useNavigate()
  // Features data
  const features = [
    {
      icon: <FiTruck className="w-8 h-8 text-[#ffbb38]" />,
      title: "Free Shipping",
      description: "From all orders over 100$"
    },
    {
      icon: <FiRefreshCw className="w-8 h-8 text-[#ffbb38]" />,
      title: "Daily Surprise Offers",
      description: "Save up to 25% off"
    },
    {
      icon: <FiDollarSign className="w-8 h-8 text-[#ffbb38]" />,
      title: "Affordable Prices",
      description: "Get factory direct price"
    },
    {
      icon: <FiShield className="w-8 h-8 text-[#ffbb38]" />,
      title: "Secure Payments",
      description: "100% protected payments"
    }
  ]

  // Categories data
  const categories = [
    {
      name: "Computers and Laptops",
      icon: <FiMonitor className="w-12 h-12 text-gray-600" />,
      key:'computers'

    },
    {
      name: "cosmetics and body care",
      icon: <FiShoppingBag className="w-12 h-12 text-gray-600" />,
      key:'cosmetics'
    },
    {
      name: "Accesories",
      icon: <FiWatch className="w-12 h-12 text-gray-600" />,
      key:'accessories'
    },
    {
      name: "Cloths",
      icon: <GiClothes className="w-12 h-12 text-gray-600" />,
      key:'clothes'
    },
    {
      name: "Shoes",
      icon: <FiShoppingBag className="w-12 h-12 text-gray-600" />,
      key:'shoes'
    },
    {
      name: "Gifts",
      icon: <FiGift className="w-12 h-12 text-gray-600" />,
      key:'gifts'
    },
    {
      name: "Pet Care",
      icon: <FiHeart className="w-12 h-12 text-gray-600" />,
      key:'pets'
    },
    {
      name: "Mobile and Tablets",
      icon: <FiSmartphone className="w-12 h-12 text-gray-600" />,
      key:'mobile'
    },
    {
      name: "Music and Gaming",
      icon: <FiHeadphones className="w-12 h-12 text-gray-600" />,
      key:'gaming'
    },
    {
      name: "Others",
      icon: <FiMoreHorizontal className="w-12 h-12 text-gray-600" />,
      key:'others'
    }
  ]

  return (
    <section className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features?.length > 0 && features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-black">
                    {feature.title}
                  </h3>
                  <p className="text-black text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                onClick={()=>navigate(`/search?category=${category?.key}`) }
              >
                <div className="mb-3">
                  {category.icon}
                </div>
                <h3 className="text-gray-800 font-medium text-sm leading-tight">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Categories
