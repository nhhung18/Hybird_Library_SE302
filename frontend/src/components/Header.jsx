import React from 'react';
import { Search, Bell, UserCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-white sticky top-0 z-10">
      {/* Search Bar */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search books, authors, or categories"
          className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6 text-gray-600">
        <button className="hover:text-gray-900">
          <Bell size={22} />
        </button>
        <button className="hover:text-gray-900">
          <UserCircle size={26} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
