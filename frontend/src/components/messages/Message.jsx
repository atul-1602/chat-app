import React from 'react';
import { useAuthContext } from "../../context/authContext";
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  // Validate message object
  if (!message || !message._id) {
    console.error('❌ Invalid message object:', message);
    return null;
  }

  const fromMe = message.senderId?._id === authUser?._id || message.senderId === authUser?._id;

  return (
    <div className={`flex ${fromMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${fromMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {!fromMe && (
          <div className='w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0'>
            {message.senderId?.fullName?.charAt(0)?.toUpperCase() || selectedConversation?.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        )}

        {/* Message Bubble */}
        <div className={`relative group ${fromMe ? 'order-1' : 'order-2'}`}>
          <div className={`px-4 py-2 rounded-2xl shadow-lg ${
            fromMe 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md' 
              : 'bg-white/20 backdrop-blur-sm text-gray-200 rounded-bl-md border border-white/20'
          }`}>
            <p className='text-sm leading-relaxed'>{message.message || 'Message content unavailable'}</p>
          </div>
          
          {/* Time */}
          <div className={`text-xs text-gray-400 mt-1 ${fromMe ? 'text-right' : 'text-left'}`}>
            {message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }) : '--:--'}
          </div>
        </div>

        {/* Avatar for own messages */}
        {fromMe && (
          <div className='w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0'>
            {authUser?.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
