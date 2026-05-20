import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 flex items-center justify-between px-10 sticky top-0 bg-white/80 backdrop-blur-md z-[60]">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm sách, tác giả,..."
            className="w-full bg-[#f0f4f9] border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-[#0066cc]/20 transition-all outline-none text-sm font-medium"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={22} />
          </button>
        </div>
        
        <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <User size={22} />
        </button>
      </div>
    </header>
  );
}
