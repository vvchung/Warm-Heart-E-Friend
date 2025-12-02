import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="bg-white/90 backdrop-blur pb-6 pt-2 px-4 w-full">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-gray-100 rounded-[28px] px-4 py-3 focus-within:ring-2 focus-within:ring-teal-100 focus-within:bg-white focus-within:shadow-md transition-all duration-300">
            <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="輸入訊息..."
                className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 py-1.5 text-gray-700 placeholder-gray-400 outline-none leading-relaxed"
                rows={1}
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`p-2 mb-0.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                    !input.trim() || isLoading
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                }`}
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                )}
            </button>
        </form>
        <p className="text-center text-[10px] text-gray-400 mt-2">
            AI 能夠提供支持，但無法取代專業醫療建議。如遇緊急狀況請撥打 1925。
        </p>
      </div>
    </div>
  );
};

export default ChatInput;