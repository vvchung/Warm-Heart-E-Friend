import React, { useState, useEffect, useRef } from 'react';
import { Message, MessageRole } from './types';
import { CRISIS_KEYWORDS } from './constants';
import { sendMessageToGemini } from './services/gemini';
import MessageBubble from './components/Chat/MessageBubble.tsx';
import ChatInput from './components/Chat/ChatInput.tsx';
import BreathingExercise from './components/Tools/BreathingExercise.tsx';
import ResourcesPanel from './components/Tools/ResourcesPanel.tsx';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [isCrisis, setIsCrisis] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const checkForCrisis = (text: string) => {
    const lowerText = text.toLowerCase();
    const detected = CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
    if (detected) {
        setIsCrisis(true);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    checkForCrisis(text);

    try {
      const responseText = await sendMessageToGemini(text);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      checkForCrisis(responseText);

    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.SYSTEM,
        text: "連線發生錯誤，請稍後再試。",
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Welcome state suggestions
  const suggestions = [
      "最近工作壓力有點大...",
      "我不確定該怎麼處理這種情緒",
      "覺得自己什麼都做不好",
      "只是想找人說說話"
  ];

  return (
    <div className="flex flex-col h-screen bg-teal-50 relative overflow-hidden font-sans">
      
      {/* Header */}
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-teal-100 z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-2xl shadow-sm">🤗</div>
           <div>
               <h1 className="font-bold text-gray-800 text-lg leading-tight">暖心 E 友</h1>
               <div className="flex items-center gap-1.5 mt-0.5">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   <span className="text-xs text-gray-500 font-medium">24/7 在線傾聽</span>
               </div>
           </div>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setShowBreathing(true)}
                className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors duration-200" 
                title="正念呼吸"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </button>
            <button 
                onClick={() => setShowResources(!showResources)}
                className={`p-2 rounded-full transition-colors duration-200 ${showResources ? 'bg-teal-100 text-teal-700' : 'text-gray-400 hover:bg-white/50'}`}
                title="尋求專業協助"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
      </header>

      {/* Crisis Banner */}
      {isCrisis && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-4 mt-4 rounded-r shadow-sm flex flex-wrap items-center justify-between gap-4 z-30">
              <div className="flex items-center gap-3">
                  <span className="bg-red-100 p-2 rounded-full text-red-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold text-red-800">你需要立即的協助嗎？</p>
                    <p className="text-sm text-red-600">請不要獨自承受，專業人員隨時準備幫助你。</p>
                  </div>
              </div>
              <a href="tel:1925" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-colors whitespace-nowrap">
                  撥打 1925 安心專線
              </a>
          </div>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto relative scrollbar-hide">
         <div className="max-w-3xl mx-auto w-full px-4 py-6 min-h-full flex flex-col">
             
             {messages.length === 0 ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                     <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-sm ring-1 ring-teal-50">
                        🤗
                     </div>
                     <h2 className="text-2xl font-bold text-gray-800 mb-2">你好，我是暖心 E 友</h2>
                     <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
                         無論是工作壓力、生活煩惱，或只是想找人聊聊。<br/>
                         這裡是一個安全、匿名且不帶評判的空間。
                     </p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
                         {suggestions.map((text, idx) => (
                             <button 
                                key={idx}
                                onClick={() => handleSendMessage(text)}
                                className="text-left p-4 rounded-xl border border-teal-100 bg-white hover:bg-teal-50 hover:border-teal-200 hover:shadow-sm transition-all duration-200 group"
                             >
                                 <span className="text-gray-600 group-hover:text-teal-700 text-sm font-medium">{text}</span>
                             </button>
                         ))}
                     </div>
                 </div>
             ) : (
                 <div className="space-y-6 pb-4">
                     {messages.map((msg) => (
                         <MessageBubble key={msg.id} message={msg} />
                     ))}
                     {isLoading && (
                         <div className="flex justify-start w-full animate-pulse">
                             <div className="flex items-center bg-white border border-teal-50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-teal-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-teal-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-teal-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                             </div>
                         </div>
                     )}
                     <div ref={messagesEndRef} />
                 </div>
             )}
         </div>
      </main>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />

      {/* Floating Action Button (1925) - Mobile only */}
      <a href="tel:1925" className="fixed bottom-24 right-5 md:hidden bg-red-500 hover:bg-red-600 text-white p-3.5 rounded-full shadow-lg z-20 flex items-center justify-center transition transform hover:scale-105 active:scale-95">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
      </a>

      {/* Modals/Panels */}
      {showResources && <ResourcesPanel onClose={() => setShowResources(false)} />}
      {showBreathing && <BreathingExercise onClose={() => setShowBreathing(false)} />}

    </div>
  );
};

export default App;