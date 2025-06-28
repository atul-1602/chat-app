import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useAuthContext } from './authContext'

export const SocketContext = createContext()

export const useSocketContext = () => useContext(SocketContext)

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const { authUser } = useAuthContext()
    const reconnectTimeoutRef = useRef(null)

    useEffect(() => {
        let currentSocket = null

        if (authUser) {
            console.log('🔌 Connecting socket for user:', authUser._id)
            
            currentSocket = io('http://localhost:5000', {
                withCredentials: true,
                transports: ['websocket', 'polling'],
                timeout: 20000,
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000
            })

            setSocket(currentSocket)

            // Debug socket events
            currentSocket.on('connect', () => {
                console.log('✅ Socket connected:', currentSocket.id)
                setIsConnected(true)
                
                // Clear any existing reconnect timeout
                if (reconnectTimeoutRef.current) {
                    clearTimeout(reconnectTimeoutRef.current)
                    reconnectTimeoutRef.current = null
                }
            })

            currentSocket.on('disconnect', (reason) => {
                console.log('❌ Socket disconnected:', reason)
                setIsConnected(false)
                
                // Attempt to reconnect if it wasn't a manual disconnect
                if (reason !== 'io client disconnect') {
                    console.log('🔄 Attempting to reconnect...')
                    reconnectTimeoutRef.current = setTimeout(() => {
                        if (currentSocket && !currentSocket.connected) {
                            currentSocket.connect()
                        }
                    }, 2000)
                }
            })

            currentSocket.on('connect_error', (error) => {
                console.error('❌ Socket connection error:', error)
                setIsConnected(false)
            })

            currentSocket.on('reconnect', (attemptNumber) => {
                console.log('✅ Socket reconnected after', attemptNumber, 'attempts')
                setIsConnected(true)
            })

            currentSocket.on('reconnect_error', (error) => {
                console.error('❌ Socket reconnection error:', error)
            })

            currentSocket.on('reconnect_failed', () => {
                console.error('❌ Socket reconnection failed')
                setIsConnected(false)
            })

            // Emit user connected event
            currentSocket.emit('userConnected', authUser._id)
            console.log('📤 Emitted userConnected for:', authUser._id)

            // Listen for online users updates
            currentSocket.on('getOnlineUsers', (users) => {
                console.log('👥 Online users updated:', users)
                setOnlineUsers(users)
            })

            // Listen for new messages
            currentSocket.on('newMessage', (message) => {
                console.log('📨 Received newMessage via socket:', message)
                console.log('📨 Message details:', {
                    id: message._id,
                    content: message.message,
                    sender: message.senderId?.fullName || message.senderId,
                    receiver: message.receiverId
                })
            })

        } else {
            console.log('🔌 No auth user, clearing socket')
            setSocket(null)
            setOnlineUsers([])
            setIsConnected(false)
        }

        return () => {
            if (currentSocket) {
                console.log('🔌 Cleaning up socket connection')
                currentSocket.close()
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current)
                reconnectTimeoutRef.current = null
            }
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}
