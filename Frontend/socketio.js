import {io} from 'socket.io-client'

export const socket = io(import.meta.env.VITE_API_DEV,{
    withCredentials:true,
    autoConnect:true,
    transports: ["websocket"]
})

socket.on('reply',(data)=>console.log(data))
