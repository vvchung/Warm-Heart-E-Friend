import React, { useState, useEffect } from 'react';

const BreathingExercise: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes total
  const [instruction, setInstruction] = useState('吸氣 (Inhale)');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Breathing cycle: 4-7-8 technique simplified to 4-4-4 for easy UI
  // 4s Inhale, 4s Hold, 4s Exhale
  useEffect(() => {
    const cycleLength = 12000; // 12 seconds total cycle
    const now = Date.now();
    
    const interval = setInterval(() => {
       const cycleTime = (Date.now() - now) % cycleLength;
       if (cycleTime < 4000) {
           setPhase('inhale');
           setInstruction('緩慢吸氣...');
       } else if (cycleTime < 8000) {
           setPhase('hold');
           setInstruction('屏住呼吸...');
       } else {
           setPhase('exhale');
           setInstruction('慢慢吐氣...');
       }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getCircleSize = () => {
    switch (phase) {
      case 'inhale': return 'scale-150 bg-teal-300';
      case 'hold': return 'scale-150 bg-teal-400'; // Stay expanded
      case 'exhale': return 'scale-100 bg-teal-200';
      default: return 'scale-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center relative overflow-hidden">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <h3 className="text-2xl font-bold text-teal-800 mb-2">正念呼吸</h3>
        <p className="text-gray-500 text-sm mb-8">跟隨圓圈的節奏，放鬆身心</p>

        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            {/* Outer Ring */}
            <div className={`absolute w-32 h-32 rounded-full opacity-50 transition-all duration-[4000ms] ease-in-out ${getCircleSize()}`}></div>
            {/* Inner Ring */}
            <div className={`absolute w-24 h-24 bg-teal-500 rounded-full shadow-lg z-10 flex items-center justify-center text-white font-semibold transition-all duration-[4000ms] ease-in-out`}>
                <span className="text-xs">Relax</span>
            </div>
        </div>

        <div className="text-xl font-medium text-teal-700 mb-4 h-8">{instruction}</div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div className="bg-teal-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${(timeLeft / 180) * 100}%` }}></div>
        </div>
        <p className="text-xs text-gray-400">剩餘時間: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
        
        {timeLeft === 0 && (
            <div className="mt-4 text-center">
                <p className="text-teal-600 font-bold mb-2">練習結束，做得很好！</p>
                <button onClick={onClose} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                    回到對話
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
