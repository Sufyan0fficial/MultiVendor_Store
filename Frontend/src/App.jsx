import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { setScreenWidth } from './Redux/UtilSlice'
import Layout from './components/Layout.jsx'
import PrivateRoute from './components/PrivateRoute'
import BestSelling from './pages/UserSide/BestSelling'
import EventsPage from './pages/UserSide/EventsPage'
import Home from './pages/UserSide/Home'
import Login from './pages/UserSide/Login'
import ProductDetailsPage from './pages/UserSide/ProductDetailsPage'
import Products from './pages/UserSide/Products'
import Profile from './pages/UserSide/Profile'
import SellerActivation from './pages/SellerSide/SellerActivation.jsx'
import SellerLogin from './pages/SellerSide/SellerLogin.jsx'
import SellerSignup from './pages/SellerSide/SellerSignup.jsx'
import Signup from './pages/UserSide/Signup'
import Checkout from './pages/UserSide/Checkout'
import ActivationPage from './pages/UserSide/UserActivation'
import FAQ from './pages/UserSide/FAQ.jsx'
import Dashboard from './pages/SellerSide/Dashboard.jsx'
import SellerPrivateRoute from './components/SellerPrivateRoute.jsx'
import SellerLayout from './components/Seller/SellerLayout.jsx'
import ShopProfile from './pages/SellerSide/ShopProfile.jsx'
import AllProducts from './pages/SellerSide/AllProducts.jsx'
import CreateProduct from './pages/SellerSide/CreateProduct.jsx'
import CreateEvent from './pages/SellerSide/CreateEvent.jsx'
import AllEvents from './pages/SellerSide/AllEvents.jsx'
import CouponCodes from './pages/SellerSide/CouponCodes.jsx'
import SearchProducts from './pages/UserSide/SearchProducts.jsx'
import AllOrders from './pages/SellerSide/AllOrders.jsx'
import OrderDetails from './pages/SellerSide/OrderDetails.jsx'
import OrderDetail from './pages/UserSide/OrderDetail.jsx'
import TrackOrder from './pages/UserSide/TrackOrder.jsx'
import WithdrawMoney from './pages/SellerSide/WithdrawMoney.jsx'
import Inbox from './pages/SellerSide/Inbox.jsx'
import InboxDemo from './pages/UserSide/InboxDemo.jsx'
import ChatDialogDemo from './pages/UserSide/ChatDialogDemo.jsx'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const screenWidthSetter = () => dispatch(setScreenWidth(window.innerWidth))
    window.addEventListener('resize', screenWidthSetter)
    return () => window.removeEventListener('resize', screenWidthSetter)
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/activation/:id' element={<ActivationPage />} />
        <Route element={<Layout />}>

          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:name' element={<ProductDetailsPage />} />
          <Route path='/best-selling' element={<BestSelling />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/search' element={<SearchProducts />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders/:id' element={<OrderDetail />} />
          <Route path='/track-order/:id' element={<TrackOrder />} />
          <Route path='/inbox' element={<InboxDemo />} />
          {/* <Route path='/chat-demo' element={<ChatDialogDemo />} /> */}


          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>


        <Route path='/seller-signup' element={<SellerSignup />} />
        <Route path='/seller-login' element={<SellerLogin />} />
        <Route path='/seller-activation/:id' element={<SellerActivation />} />

        <Route element={<SellerPrivateRoute />}>
          <Route path='/dashboard' element={<SellerLayout />}>
          <Route index element={<Dashboard />} />
          <Route element={<AllProducts />} path='products'/>
          <Route element={<CreateProduct />} path='create-product'/>
          <Route  path='orders' element={<AllOrders />}/>
          <Route  path='orders/:id' element={<OrderDetails />}/>
          <Route  path='create-event' element={<CreateEvent />}/>
          <Route  path='events' element={<AllEvents />}/>
          <Route  path='withdraw-money' element={<WithdrawMoney />}/>
          <Route  path='inbox' element={<Inbox />}/>
          <Route  path='discount-codes' element={<CouponCodes />}/>
          <Route  path='refunds'/>
          <Route  path='settings'/>
          </Route>

        </Route>
        <Route path='/shop/:id' element={<ShopProfile />}/>
        <Route  path='/shop/orders/:id' element={<OrderDetails />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
