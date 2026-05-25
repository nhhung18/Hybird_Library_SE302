import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header({ title = "Tổng quan" }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[72px] px-8 sticky top-0 bg-white/60 backdrop-blur-3xl border-b border-white/40 z-[60] flex items-center justify-between shadow-sm shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Messages */}
        {/* <button className="p-2.5 rounded-full text-gray-600 hover:bg-white/50 hover:text-gray-900 transition-colors">
          <MessageSquare size={20} strokeWidth={2} />
        </button> */}

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <motion.button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-full transition-all relative ${showNotifications ? 'bg-white shadow-sm text-[#0066cc]' : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white/80" />
          </motion.button>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-gray-300/50 mx-1 hidden sm:block"></div>

        {/* Profile */}
        <motion.div
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer ml-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </header>
  );
}
