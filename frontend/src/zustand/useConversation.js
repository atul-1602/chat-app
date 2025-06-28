import {create} from 'zustand'

const useConversation = create((set, get)=>({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation)=> {
        console.log('🔄 Setting selected conversation:', selectedConversation?._id || 'null')
        // Validate conversation object
        if (selectedConversation && !selectedConversation._id) {
            console.error('❌ Invalid conversation object:', selectedConversation)
            return
        }
        // Clear messages when switching conversations to prevent stale data
        set({selectedConversation, messages: []})
    },
    messages: [],
    setMessages: (messages)=> {
        console.log('🔄 Setting messages:', messages?.length || 0)
        
        // Validate messages array
        if (messages && !Array.isArray(messages)) {
            console.error('❌ Messages must be an array:', messages)
            set({messages: []})
            return
        }
        // Filter out invalid messages
        const validMessages = messages?.filter(msg => msg && msg._id) || []
        if (validMessages.length !== messages?.length) {
            console.warn('⚠️ Filtered out invalid messages:', messages?.length - validMessages.length)
        }
        console.log('🔄 Setting valid messages:', validMessages.length)
        set({messages: validMessages})
    },
    // Add a message to the current conversation
    addMessage: (newMessage) => {
        console.log('🔄 Adding new message to conversation:', newMessage._id)
        const { messages } = get()
        
        // Check if message already exists to prevent duplicates
        const messageExists = messages.some(msg => msg._id === newMessage._id)
        if (messageExists) {
            console.log('🔄 Message already exists, skipping')
            return
        }
        
        set({ messages: [...messages, newMessage] })
    },
    // Clear conversation state
    clearConversation: () => {
        console.log('🔄 Clearing conversation state')
        set({selectedConversation: null, messages: []})
    }
}))

export default useConversation