import React, { useEffect, useState } from 'react'
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { MdChevronRight } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { RxAvatar } from 'react-icons/rx';
import { categoriesData } from '../static/data';
import { Link, useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Cart from './Cart';
import Wishlist from './WIshlistSidebar';




const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [active, setActive] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [openCart, setOpenCart] = useState(false)
  const [openWishlist, setOpenWishlist] = useState(false)
  const [count, setCount] = useState(1)
  console.log('cart state is', openCart)
  console.log('active link is', activeLink)
  const location = useLocation()
  const currentLocation = location.pathname.split('/')[1]
  console.log('current location is', currentLocation)
  const { userData } = useSelector(state => state.UserReducer)
  const { sellerData } = useSelector(state => state?.SellerReducer)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const {cartData} =  useSelector(state=>state?.CartWishlistReducer)
  const {wishlistData} =  useSelector(state=>state?.CartWishlistReducer)
  console.log('parent wishlist data',wishlistData)


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 95) {
        setActive(true);
      } else {
        setActive(false);
      }
    };


    window.addEventListener("scroll", handleScroll);

    // cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const searchTerm = queryParams.get('searchTerm') || ''
    setSearchTerm(searchTerm)
  }, [location.search])

  useEffect(() => {
    if (currentLocation !== undefined || currentLocation !== null) {
      if (!currentLocation) {
        setActiveLink('home')
      }
      else {
        setActiveLink(currentLocation)
      }
    }
    else {
      setActiveLink('home')
    }

  }, [currentLocation])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }



  const handleSearch = async () => {
    const queryParams = new URLSearchParams(location.search)
    queryParams.set('searchTerm', searchTerm)
    const queryString = queryParams.toString()
    navigate(`/search?${queryString}`)
  }

  return (
    <header className="w-full bg-[#f6f6f5] shadow-sm relative">
      {/* Mobile Header */}
      <div className="md:hidden bg-white fixed top-0 z-10 w-full px-4 py-3 flex items-center justify-between">
        <button
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <BiMenuAltLeft className="w-10 h-10 text-black " />
        </button>

        <img src='https://shopo.quomodothemes.website/assets/images/logo.svg' alt="logo" onClick={() => navigate('/')} />

        <button className="relative cursor-pointer" onClick={() => setOpenCart(true)}>
          <FiShoppingCart className="w-6 h-6 text-black" />
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartData?.length}</span>
        </button>
        <Cart setOpenCart={setOpenCart} count={count} setCount={setCount} openCart={openCart} data={cartData}/>


      </div>

      {/* Desktop Top Header */}
      <div className="hidden md:block bg-[#f6f6f5]  min-h-[50px] my-[20px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-10">
          {/* Logo */}
          <img src='https://shopo.quomodothemes.website/assets/images/logo.svg' alt="logo" onClick={()=>navigate('/')} className='cursor-pointer'/>
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Product..."
                className="w-full px-4 py-2 rounded-lg focus:outline-none border-2 border-[#3321c8] bg-white"
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleSearch}>
                <FiSearch className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>

          {/* Become Seller Button */}
          <button className="hidden md:flex md:items-center cursor-pointer bg-black  text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors" onClick={() => navigate(sellerData?._id ? '/dashboard' : '/seller-signup')}>
            {
              sellerData?._id ? 'Go Dashboard' : 'Become Seller'
            }
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
      <div className={`hidden md:flex ${active && 'fixed z-10 top-0 right-0'}  bg-[#3321c8] min-h-[70px] items-center  w-full`}>
        <div className="max-w-7xl mx-auto  w-full px-10 ">
          <div className="flex items-center justify-between ">
            {/* Categories Dropdown */}
            <div className="hidden relative lg:block cursor-pointer" >
              <button className="bg-white cursor-pointer text-black px-4 min-h-[60px] rounded-none -mb-3 min-w-[270px] rounded-t-lg flex justify-between items-center hover:bg-gray-50 border-b border-b-gray-200" onClick={() => setShowCategories(pre => !pre)}>
                <div className='flex '>
                  <BiMenuAltLeft className='w-8 h-8 -mt-[6px]' />
                  <div className='font-semibold text-lg'>

                    All Categories
                  </div>
                </div>
                <IoIosArrowDown className={`-mt-1 w-6 h-6 ${showCategories ? 'rotate-0' : 'rotate-180'}  transition-all duration-500 ease-in-out`} />

              </button>
              <div className={`absolute w-full z-10  mt-3 overflow-y-auto   ${showCategories ? 'max-h-[450px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-5'} transition-all duration-400 ease-in-out`}>
                <div className='px-4 pb-8 pt-2 rounded-b-lg bg-white border border-gray-200  flex flex-col gap-y-2 max-h-[450px] overflow-y-auto '>
                  {
                    categoriesData?.length > 0 && categoriesData?.map((item, index) => {
                      return (
                        <div className='flex items-center gap-x-4' key={item?.id} onClick={() => {
                          navigate(`/products?category=${item?.key}`)
                          setShowCategories(false)
                        }}>
                          <img src={item?.image_Url} alt="" className='object-contain w-8 h-8' />
                          <div>{item?.title}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-indigo-600 md:bg-transparent`}>
              <ul className="flex flex-col md:flex-row md:items-center space-y-2 font-semibold md:space-y-0 md:space-x-8 p-4 md:p-0">
                <li><Link to={'/'} className={`${activeLink == 'home' ? 'text-green-400 hover:text-green-300' : 'text-white hover:text-gray-200'} relative  cursor-pointer`} onClick={() => setActiveLink('home')}>Home</Link></li>
                <li><Link to={'/best-selling'} className={`${activeLink == 'best-selling' ? 'text-green-400 hover:text-green-300' : 'text-white hover:text-gray-200'}`} onClick={() => setActiveLink('best-selling')}>Best Selling</Link></li>
                <li><Link to={'/products'} className={`${activeLink == 'products' ? 'text-green-400 hover:text-green-300' : 'text-white hover:text-gray-200'}`} onClick={() => setActiveLink('products')}>Products</Link></li>
                <li><Link to={'/events'} className={`${activeLink == 'events' ? 'text-green-400 hover:text-green-300' : 'text-white hover:text-gray-200'}`} onClick={() => setActiveLink('events')}>Events</Link></li>
                <li><Link to={'/faq'} className={`${activeLink == 'faq' ? 'text-green-400 hover:text-green-300' : 'text-white hover:text-gray-200'}`} onClick={() => setActiveLink('faq')}>FAQ</Link></li>
              </ul>
            </nav>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="relative cursor-pointer" onClick={() => setOpenWishlist(true)}>
                <FiHeart className="w-6 h-6 text-white hover:text-gray-200 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlistData?.length}</span>
              </button>
              <button className="relative cursor-pointer" onClick={() => setOpenCart(true)}>
                <FiShoppingCart className="w-6 h-6 text-white hover:text-gray-200 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartData?.length}</span>
              </button>
              {
                userData?._id ?
                  <img src={`${import.meta.env?.VITE_API_DEV}/uploads/${userData?.avatar}`} alt="profile_img" className='w-8 h-8 rounded-full border border-gray-100 cursor-pointer' onClick={() => navigate('/profile')} />
                  :

                  <button onClick={() => navigate('/login')}>
                    <RxAvatar className='w-8 h-8 text-white hover:text-gray-200 cursor-pointer' />
                  </button>
              }
            </div>
          </div>

          <Cart setOpenCart={setOpenCart} count={count} setCount={setCount} openCart={openCart} data={cartData} />
          <Wishlist openWishlist={openWishlist} setOpenWishlist={setOpenWishlist}/>



        </div>
      </div>


      {/* Mobile Menu Overlay */}
      <div className={`
    fixed inset-0 z-50 md:hidden 
    bg-black/40 backdrop-blur-xs transition-all duration-500 ease-in-out
    ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `}>
        <div className={`
      absolute left-0 top-0 h-full w-64 bg-white shadow-xl transition-transform duration-500 ease-in-out
      ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center relative" onClick={() => {
              setIsMenuOpen(false)
              setOpenWishlist(true)
            }}>
              <FiHeart className="w-6 h-6 text-black mr-2" />
              <span className="bg-green-500 absolute -top-1 -right-[2px] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlistData?.length}</span>

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
                 onKeyDown={handleKeyDown}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
          </div>

          <nav className="px-4">
            <ul className="space-y-6">
              <li><Link to={'/'} className={`${activeLink == 'home' ? 'text-green-400 hover:text-green-300' : 'text-black'}   cursor-pointer  text-lg`}
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveLink('home')
                }}
              >Home</Link></li>
              <li><Link to={'/best-selling'} className={`${activeLink == 'best-selling' ? 'text-green-400 hover:text-green-300' : 'text-black'} text-lg`}
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveLink('best-selling')
                }}
              >
                Best Selling</Link></li>
              <li><Link to={'/products'} className={`${activeLink == 'products' ? 'text-green-400 hover:text-green-300' : 'text-black'} text-lg`} onClick={() => {
                setIsMenuOpen(false)
                setActiveLink('products')
              }}>Products</Link></li>
              <li><Link to={'/events'} className={`${activeLink == 'events' ? 'text-green-400 hover:text-green-300' : 'text-black'} text-lg`} onClick={() => {
                setIsMenuOpen(false)
                setActiveLink('events')
              }}>Events</Link></li>
              <li><Link to={'/faq'} className={`${activeLink == 'faq' ? 'text-green-400 hover:text-green-300' : 'text-black'} text-lg`} onClick={() => {
                setIsMenuOpen(false)
                setActiveLink('faq')
              }}>FAQ</Link></li>
            </ul>
          </nav >

          <div className="p-4 mt-8" onClick={() => navigate(sellerData?._id ? '/dashboard' : '/seller-signup')}>
            <button className="flex w-full items-center justify-center md:items-center cursor-pointer bg-black  text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg">
              {
                sellerData?._id ? 'Go Dashboard' : 'Become Seller'
              }
              <MdChevronRight className='mt-[2px] w-6 h-6' />

            </button>
          </div>
          <div className='flex w-full items-center justify-center'>
            {
              userData?._id ?
                <img src={`${import.meta.env?.VITE_API_DEV}/uploads/${userData?.avatar}`} alt="profile_img" className='w-16 mt-2 h-16 rounded-full  cursor-pointer border-2 border-green-500' onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/Profile')
                }} />
                :

                <button onClick={() => navigate('/login')}>
                  <RxAvatar className='w-8 h-8 text-black cursor-pointer' />
                </button>
            }
          </div>

        </div >
      </div >
      <Wishlist openWishlist={openWishlist} setOpenWishlist={setOpenWishlist}/>

    </header >
  )
}

export default Header
