import React, { useEffect, useState, useCallback } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
const API_BASE_URL = import.meta.env.VITE_API_URL;
const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const [retryCount, setRetryCount] = useState(0)
    const { messages, setMessages, selectedConversation } = useConversation()
    
    const getMessages = useCallback(async (isRetry = false) => {
        if (!selectedConversation?._id) {
            console.log('📥 No conversation selected, clearing messages')
            setMessages([])
            setRetryCount(0)
            return
        }
        
        console.log('📥 Getting messages for conversation:', selectedConversation._id, isRetry ? '(retry)' : '')
        setLoading(true)
        
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
            
            const res = await fetch(`${API_BASE_URL}/messages/${selectedConversation._id}`, {
                credentials: 'include',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId)
            
            if (res.status === 429) {
                throw new Error('Rate limit exceeded. Please wait a moment and try again.')
            }
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            
            const data = await res.json();
            
            if (data.error) {
                throw new Error(data.error)
            }
            
            console.log('📥 Received messages:', data.length)
            setMessages(data || [])
            setRetryCount(0) // Reset retry count on success
            
        } catch (error) {
            console.error("❌ Get messages error:", error)
            
            // Handle rate limiting
            if (error.message.includes('Rate limit')) {
                toast.error('Too many requests. Please wait a moment.')
                return
            }
            
            // Handle timeout
            if (error.name === 'AbortError') {
                toast.error('Request timeout. Please check your connection.')
                return
            }
            
            // Retry logic for network errors
            if (!isRetry && retryCount < 3 && (error.message.includes('fetch') || error.message.includes('network'))) {
                console.log(`🔄 Retrying message fetch (${retryCount + 1}/3)...`)
                setRetryCount(prev => prev + 1)
                setTimeout(() => getMessages(true), 1000 * (retryCount + 1)) // Exponential backoff
                return
            }
            
            toast.error(error.message || "Failed to load messages")
            setMessages([]) // Set empty array on error to prevent white screen
            setRetryCount(0)
        } finally {
            setLoading(false)
        }
    }, [selectedConversation?._id, setMessages, retryCount])
    
    // Only fetch messages when conversation changes, not when messages are updated
    useEffect(() => {
        console.log('📥 Conversation changed, fetching messages for:', selectedConversation?._id)
        getMessages()
    }, [getMessages, selectedConversation?._id]) // Only depend on conversation ID, not the getMessages function
    
    return {messages, loading, retry: () => getMessages()}
}

export default useGetMessages