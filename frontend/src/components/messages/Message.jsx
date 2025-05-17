import React from 'react';
import { useAuthContext } from "../../context/authContext";
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;

  return (
    <div className={`flex flex-col my-2 ${fromMe ? 'items-end' : 'items-start'}`}>
      <div className="flex items-end gap-2">
        {!fromMe && (
          <img
            src={profilePic}
            className="w-8 h-8 rounded-full object-cover"
            alt="profile"
          />
        )}

        <div className={`flex flex-col ${fromMe ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-2 rounded-lg max-w-xs ${fromMe ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {message.message}
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        {fromMe && (
          <img
            src={profilePic}
            className="w-8 h-8 rounded-full object-cover"
            alt="profile"
          />
        )}
      </div>
    </div>
  );
};

export default Message;
