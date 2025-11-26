import React, { useEffect, useState } from 'react'
import { FiHeart, FiEye, FiShoppingCart, FiStar } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import ProductDetails from '../components/ProductDetails.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../utils/notifymessage.js'
import { message } from 'antd'
import { addProducttoCart, addProducttoWishlist, removeFromCart, removeFromWishlist } from '../Redux/CartWishlistSlice.js'

const ProductCard = ({ product, shop, isVendor }) => {
  console.log('shop data in product card is', shop)
  const navigate = useNavigate()
  const [addtoWishlist, setAddtoWishlist] = useState(false)
  const [addtoCart, setAddtoCart] = useState(false)
  const [viewDetails, setViewDetails] = useState(false)
  // Default product data if none provided
  const discountedPrice = product?.discounted_price === 0 ? false : true
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useDispatch()

  const { cartData } = useSelector(state => state?.CartWishlistReducer)
  const { wishlistData } = useSelector(state => state?.CartWishlistReducer)

  const productId = product?.product_name?.replaceAll(" ", "-")

  const handleRemoveProductFromCart = () => {
    setAddtoCart(false)
    Message(messageApi, 'warning', 'Product removed from cart')
    dispatch(removeFromCart(product))
  }
  const handleAddProducttoCart = () => {
    setAddtoCart(true)
    dispatch(addProducttoCart({ ...product, qty: 1 }))
    Message(messageApi, 'success', 'Product added to cart')

  }

  const handleAddtoWishlist = () => {
    setAddtoWishlist(true)
    dispatch(addProducttoWishlist(product))
    Message(messageApi, 'success', 'Product added to wishlist')

  }

  const handleRemoveFromWishlist = () => {
    setAddtoWishlist(false)
    dispatch(removeFromWishlist(product))
    Message(messageApi, 'warning', 'Product removed from wishlist')
  }

  useEffect(() => {
    const productInCart = cartData?.find((item, i) => item?._id === product?._id)
    console.log('product added to CART is', productInCart)

    if (productInCart) {
      setAddtoCart(true)
    }
    else {
      setAddtoCart(false)
    }

    const productInWishlist = wishlistData?.find((item, i) => item?._id === product?._id)
    console.log('product added to wishlist is', productInWishlist)
    if (productInWishlist) {
      setAddtoWishlist(true)
    }
    else {
      setAddtoWishlist(false)
    }
  }, [cartData, wishlistData])



  // Generate star rating
  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`w-4 h-4 ${i <= product?.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
        />
      )
    }
    return stars
  }

  return (
    <div className="bg-white  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 relative cursor-pointer min-h-full ">
      {
        contextHolder
      }
      {/* Action Buttons */}
      {
        !isVendor &&
        <div className="absolute top-7 right-4 flex flex-col space-y-2 ">
          <button className="p-2 bg-white rounded-full shadow-md cursor-pointer"
            onClick={() => {
              if (addtoWishlist) {
                handleRemoveFromWishlist()
              }
              else {
                handleAddtoWishlist()
              }

            }
            }
          >
            <FiHeart className="w-4 h-4 text-gray-600 " fill={addtoWishlist ? 'red' : 'white'} color={addtoWishlist ? 'red' : ''} title={addtoWishlist ? 'Remove from wishlist' : 'Add to wishtlist'} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md cursor-pointer" onClick={() => setViewDetails(true)}>
            <FiEye className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md cursor-pointer" onClick={() => {
            if (addtoCart) {
              handleRemoveProductFromCart()
            }
            else {
              handleAddProducttoCart()
            }

          }
          }
          >
            <FiShoppingCart className="w-4 h-4 text-gray-600" fill={addtoCart ? 'red' : 'white'} color={addtoCart ? 'red' : ''} title={addtoCart ? 'Remove from Cart' : 'Add to Cart'} />
          </button>
        </div>
      }

      {/* Product Image */}
      <div className="mb-4 overflow-hidden rounded-lg" onClick={() => navigate(`/products/${productId}`, { state: { product_id: product._id } })}>
        <img
          src={`${import.meta.env.VITE_API_DEV}/uploads/${product?.images?.[0]}`}
          alt='product_img'
          className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand */}
      <p className="text-blue-500 text-sm font-semibold mb-2 capitalize" onClick={() => navigate(`/shop/${product?.shop?._id}`)}>
        {product?.shop?.shop_name}
      </p>

      {/* Product Name */}
      <h3 className="text-gray-800 font-bold text-base mb-3 line-clamp-2 leading-tight" onClick={() => navigate(`/products/${productId}`, { state: { product_id: product._id } })}>
        {product.product_name}
      </h3>

      {/* Rating */}
      <div className="flex items-center mb-3">
        <div className="flex items-center space-x-1">
          {renderStars()}
        </div>
      </div>

      {/* Price and Sales */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {
            discountedPrice &&
            <span className="text-lg font-bold text-gray-800 ">
              {product.discounted_price}$
            </span>
          }
          {product.original_price && (
            <span className={`text-sm ${discountedPrice ? 'text-red-500 line-through' : 'text-black'} `}>
              {product.original_price}$
            </span>
          )}
        </div>
        <span className="text-sm text-green-500 font-medium">
          {product.sold_out} sold
        </span>
      </div>
      {
        viewDetails ?
          <div className='relative z-50'>

            <ProductDetails product={product} viewDetails={viewDetails} setViewDetails={setViewDetails} shop={shop} />
          </div>
          :
          null
      }
    </div>
  )
}

export default ProductCard
