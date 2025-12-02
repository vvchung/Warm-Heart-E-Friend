import React from 'react';
import { Message, MessageRole } from '../../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;
  const isSystem = message.role === MessageRole.SYSTEM;

  if (isSystem) {
      return (
          <div className="flex justify-center my-4 animate-fade-in">
              <span className="bg-red-50 text-red-500 text-xs py-1.5 px-4 rounded-full border border-red-100 font-medium">
                  {message.text}
              </span>
          </div>
      )
  }

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${
            isUser ? 'bg-gray-800 text-white hidden md:flex' : 'bg-teal-100 text-teal-600'
        }`}>
          {isUser ? (
             <span className="text-xs font-bold">You</span>
          ) : (
             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 20.2C9.5 20.2 7.29 18.92 6 16.9C6.03 14.91 10 13.8 12 13.8C13.99 13.8 17.97 14.91 18 16.9C16.71 18.92 14.5 20.2 12 20.2Z" fill="currentColor"/>
                <path d="M15.5 13.5C15.5 13.5 16 12.5 17 12.5C18 12.5 18.5 13.5 18.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>

        {/* Bubble */}
        <div 
            className={`px-4 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap shadow-sm
            ${isUser 
                ? 'bg-gray-800 text-white rounded-br-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
            } ${message.isError ? 'border-red-200 bg-red-50 text-red-800' : ''}`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;