import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './authContext'
import io from "socket.io-client"

export const SocketContext = createContext()

export const useSocketContext = () => useContext(SocketContext)

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    const { authUser } = useAuthContext()

    useEffect(() => {
        if (!authUser) {
            setSocket(null)
            setOnlineUsers([])
            return
        }
    
        const newSocket = io("http://localhost:5000", {
            auth: {
                userId: authUser._id
            }
        })
    
        // Store the socket in state
        setSocket(newSocket)
    
        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users)
        })
    
        return () => {
            newSocket.disconnect()
            setSocket(null)
            setOnlineUsers([])
        }
    }, [authUser])
    
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}
