import {io} from 'socket.io-client'

export const VendorSocket = io(import.meta.env.VITE_API_DEV,{
    withCredentials:true,
    autoConnect:true,
    transports: ["websocket"]
})



