import { combineReducers, configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'


const rootReducers = combineReducers({
    UserReducer
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

