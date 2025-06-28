import React, { createContext, useContext, useState } from 'react'

export const SocketContext = createContext()

export const useSocketContext = () => useContext(SocketContext)

export const SocketContextProvider = ({ children }) => {
    const [onlineUsers] = useState([])

    // Mock socket functionality for Vercel deployment
    // Real-time features are disabled since Vercel doesn't support WebSockets
    const mockSocket = {
        emit: (event, data) => {
            console.log(`Mock socket emit: ${event}`, data)
        },
        on: (event) => {
            console.log(`Mock socket listener: ${event}`)
        },
        disconnect: () => {
            console.log('Mock socket disconnected')
        }
    }
    
    return (
        <SocketContext.Provider value={{ socket: mockSocket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}
