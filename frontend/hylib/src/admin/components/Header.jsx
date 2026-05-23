import React from 'react';
import { Bell, MessageSquare } from 'lucide-react';

export default function Header({ title = "Tổng quan" }) {
  return (
    <header className="h-[72px] flex items-center justify-between px-8 bg-white border-b border-gray-200 z-40 sticky top-0 font-sans">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center space-x-5">
        <button className="text-gray-500 hover:text-gray-900 transition-colors">
          <MessageSquare size={20} strokeWidth={2} />
        </button>
        
        <div className="relative">
          <button className="text-gray-500 hover:text-gray-900 transition-colors relative">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute 1 top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
        </div>
        
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 cursor-pointer ml-2">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
