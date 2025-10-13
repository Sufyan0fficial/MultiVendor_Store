import React, { useState } from 'react'
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { MdChevronRight } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { RxAvatar } from 'react-icons/rx';




const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-[#f6f6f5] shadow-sm">
      {/* Mobile Header */}
      <div className="md:hidden bg-white px-4 py-3 flex items-center justify-between">
        <button
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <BiMenuAltLeft className="w-10 h-10 text-black " />
        </button>

        <img src='https://shopo.quomodothemes.website/assets/images/logo.svg' alt="logo" />

        <button className="relative cursor-pointer">
          <FiShoppingCart className="w-6 h-6 text-black" />
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
        </button>
      </div>

      {/* Desktop Top Header */}
      <div className="hidden md:block bg-[#f6f6f5]  min-h-[50px] my-[20px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-10">
          {/* Logo */}
          <img src='https://shopo.quomodothemes.website/assets/images/logo.svg' alt="logo" />
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Product..."
                className="w-full px-4 py-2 rounded-lg focus:outline-none border-2 border-[#3321c8] bg-white"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <FiSearch className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>

          {/* Become Seller Button */}
          <button className="hidden md:flex md:items-center cursor-pointer bg-black  text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Become Seller
            <MdChevronRight className='mt-1 w-6 h-6' />

          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <div className="hidden md:flex bg-[#3321c8] min-h-[70px] items-center  w-full">
        <div className="max-w-7xl mx-auto  w-full px-10">
          <div className="flex items-center justify-between">
            {/* Categories Dropdown */}
            <div className="hidden lg:block cursor-pointer ">
              <button className="bg-white cursor-pointer text-black px-4 min-h-[60px] rounded-none -mb-3 min-w-[270px] rounded-t-lg flex justify-between items-center hover:bg-gray-50">
                <div className='flex '>
                  <BiMenuAltLeft className='w-8 h-8 -mt-[6px] ' />
                  <div className='font-semibold text-lg'>

                    All Categories
                  </div>
                </div>
                <IoIosArrowDown className='-mt-1 w-6 h-6' />

              </button>
            </div>

            {/* Navigation Links */}
            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-indigo-600 md:bg-transparent z-50`}>
              <ul className="flex flex-col md:flex-row md:items-center space-y-2 font-semibold md:space-y-0 md:space-x-8 p-4 md:p-0">
                <li><a href="#" className="text-green-400 hover:text-green-300 ">Home</a></li>
                <li><a href="#" className="text-white hover:text-gray-200">Best Selling</a></li>
                <li><a href="#" className="text-white hover:text-gray-200">Products</a></li>
                <li><a href="#" className="text-white hover:text-gray-200">Events</a></li>
                <li><a href="#" className="text-white hover:text-gray-200">FAQ</a></li>
              </ul>
            </nav>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="relative">
                <FiHeart className="w-6 h-6 text-white hover:text-gray-200 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </button>
              <button className="relative">
                <FiShoppingCart className="w-6 h-6 text-white hover:text-gray-200 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </button>
              <button>
                <RxAvatar className='w-8 h-8 text-white hover:text-gray-200 cursor-pointer' />

              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-transparent  backdrop-blur-xs z-50">
          <div className="bg-white w-80 h-full shadow-lg  ">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center relative">
                <FiHeart className="w-6 h-6 text-black mr-2" />
                <span className="bg-green-500 absolute -top-1 -right-[2px] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">9</span>
              </div>
              <button
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiX className="w-6 h-6 text-black" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Product..."
                  className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <nav className="px-4">
              <ul className="space-y-6">
                <li><a href="#" className="text-green-500 font-medium text-lg cursor-pointer">Home</a></li>
                <li><a href="#" className="text-black text-lg cursor-pointer">Best Selling</a></li>
                <li><a href="#" className="text-black text-lg cursor-pointer">Products</a></li>
                <li><a href="#" className="text-black text-lg cursor-pointer">Events</a></li>
                <li><a href="#" className="text-black text-lg cursor-pointer">FAQ</a></li>
              </ul>
            </nav>

            <div className="p-4 mt-8">
              <button className="flex w-full items-center justify-center md:items-center cursor-pointer bg-black  text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg">
            Become Seller
            <MdChevronRight className='mt-[2px] w-6 h-6' />

          </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
