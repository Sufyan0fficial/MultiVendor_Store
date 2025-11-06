import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            {/* <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold">ShopO</span>
            </div> */}
            <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="logo" className='brightness-0 invert' />
            <p className="text-gray-400 text-sm leading-relaxed">
              The home and elements needed to create beautiful products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Store Locations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Our Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Reviews</a></li>
            </ul>
          </div>

          {/* Shop Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Game & Video</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Phone &Tablets</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Computers & Laptop</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Sport Watches</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Events</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Reviews</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Shipping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Live chat</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright and Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">© 2020 Becodemy. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
                <span className="text-gray-600">·</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-stretch space-x-2">
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs ">PayPal</span>
              </div>
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xs ">VISA</span>
              </div>
              <div className="bg-white rounded px-2 py-1 space-x-1 flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1"></div>
              </div>
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
