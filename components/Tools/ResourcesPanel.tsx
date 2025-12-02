import React from 'react';
import { Clinic } from '../../types';

const MOCK_CLINICS: Clinic[] = [
  { id: '1', name: '安心身心診所', address: '台北市大安區和平東路二段', distance: '0.8 km', rating: 4.8 },
  { id: '2', name: '暖陽心理諮商所', address: '台北市中正區羅斯福路三段', distance: '1.2 km', rating: 4.9 },
  { id: '3', name: '市立聯合醫院松德院區', address: '台北市信義區松德路', distance: '3.5 km', rating: 4.5 },
];

const ResourcesPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-40 bg-gray-100 flex flex-col md:inset-auto md:absolute md:top-16 md:right-4 md:w-96 md:h-[calc(100vh-6rem)] md:rounded-xl md:shadow-xl md:border md:border-gray-200 overflow-hidden transform transition-transform">
      <div className="bg-white p-4 border-b flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-lg font-bold text-gray-800">專業資源轉介</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
               <svg className="h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-orange-700">
                如果情況緊急，請勿猶豫，直接撥打 <span className="font-bold">1925</span> 或 <span className="font-bold">119</span>。
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-4">附近推薦診所 (模擬數據)</h3>
        
        {MOCK_CLINICS.map(clinic => (
          <div key={clinic.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-800">{clinic.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{clinic.address}</p>
              </div>
              <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">
                {clinic.distance}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center">
                 <span className="text-yellow-400 mr-1">★</span>
                 <span className="text-sm font-bold text-gray-700">{clinic.rating}</span>
              </div>
              <button className="text-teal-600 text-sm font-medium hover:underline">
                查看地圖 &rarr;
              </button>
            </div>
          </div>
        ))}

        <div className="bg-blue-50 p-4 rounded-lg mt-6">
            <h4 className="font-bold text-blue-800 mb-2">心理衛教小知識</h4>
            <p className="text-sm text-blue-700">
                感到焦慮時，試著將注意力轉移到腳底踩在地板的感覺，這稱為「著地練習 (Grounding)」，能幫助你快速回到當下。
            </p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPanel;
