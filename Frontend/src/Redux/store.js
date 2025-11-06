import { combineReducers, configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserSlice'
import UtilReducer from './UtilSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import  SellerReducer  from './SellerSlice'
import  CartWishlistReducer from './CartWishlistSlice'
import  ShippingReducer from './ShippingSlice'
import  OrderReducer from './OrderSlice'


const rootReducers = combineReducers({
    UserReducer,
    UtilReducer,
    SellerReducer,
    CartWishlistReducer,
    ShippingReducer,
    OrderReducer
})
const config = {
    key:'root',
    storage
}
const persistedReducers = persistReducer(config,rootReducers)
export const store = configureStore({
  reducer: persistedReducers,
})

export const Persistor = persistStore(store)

