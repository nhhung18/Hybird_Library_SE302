import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Clock, Check, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Notification } from '../types';

interface HeaderProps {
  onProfileClick: () => void;
  onBookClick: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: Notification[];
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  onNotificationClick: (notif: Notification) => void;
}

const Header = ({ 
  onProfileClick, 
  onBookClick, 
  searchQuery, 
  setSearchQuery,
  notifications,
  markAsRead,
  clearAllNotifications,
  onNotificationClick
}: HeaderProps) => {
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const allPossibleBooks = [
    { id: 'stillness', title: 'The Art of Stillness', author: 'Pico Iyer', image: 'https://picsum.photos/seed/stillness/100/100' },
    { id: 'design', title: 'Design Systems', author: 'Alla Kholmatova', image: 'https://picsum.photos/seed/design/100/100' },
    { id: 'earth', title: 'A New Earth', author: 'Eckhart Tolle', image: 'https://picsum.photos/seed/earth/100/100' },
    { id: 'think', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', image: 'https://picsum.photos/seed/think/100/100' },
    { id: 'sapiens', title: 'Sapiens', author: 'Yuval Noah Harari', image: 'https://picsum.photos/seed/sapiens/100/100' },
  ];

  const searchResults = allPossibleBooks.filter(b => 
    searchQuery && (
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ).slice(0, 5);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="h-20 flex items-center justify-between px-10 sticky top-0 bg-white/80 backdrop-blur-md z-[60]">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm sách, tác giả,..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(e.target.value.length > 0);
            }}
            onFocus={() => searchQuery.length > 0 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="w-full bg-[#f0f4f9] border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-[#0066cc]/20 transition-all outline-none text-sm font-medium"
          />

          <AnimatePresence>
            {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 w-full mt-3 bg-white rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-gray-100 overflow-hidden z-50"
              >
                <div className="p-6">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-5 ml-2">SÁCH GỢI Ý</p>
                  <div className="space-y-2">
                    {searchResults.map((result, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#f0f4f9] transition-all group cursor-pointer" onClick={() => onBookClick(result.id)}>
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-50 overflow-hidden shrink-0 shadow-sm">
                            <img src={result.image} alt={result.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-[#0066cc] transition-colors leading-tight">{result.title}</h4>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{result.author}</p>
                          </div>
                        </div>
                        <button className="bg-[#0066cc] text-white px-6 py-2 rounded-xl font-bold text-xs shadow-md shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-95">
                          Xem
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-full transition-all relative ${showNotifications ? 'bg-blue-50 text-[#0066cc]' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute top-full right-0 mt-4 w-[380px] bg-white rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-gray-100 overflow-hidden z-50 origin-top-right"
              >
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 tracking-tight">Thông báo</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                        Bạn có {unreadCount} thông báo mới
                      </p>
                    </div>
                    {notifications.length > 0 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          clearAllNotifications();
                        }}
                        className="text-xs font-bold text-[#0066cc] hover:underline"
                      >
                        Xóa tất cả
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      <div className="p-2">
                        {notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => {
                              markAsRead(notif.id);
                              onNotificationClick(notif);
                              setShowNotifications(false);
                            }}
                            className={`p-4 rounded-[1.5rem] transition-all cursor-pointer group relative mb-1 ${notif.isRead ? 'opacity-60 grayscale-[0.5]' : 'bg-gray-50/50 hover:bg-[#f0f4f9]'}`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${
                                notif.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                                notif.type === 'success' ? 'bg-green-100 text-green-600' : 
                                'bg-blue-100 text-[#0066cc]'
                              }`}>
                                {notif.type === 'warning' ? <Clock size={18} /> : 
                                 notif.type === 'success' ? <Check size={18} /> : 
                                 <Bell size={18} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-bold text-gray-900 text-sm truncate pr-4">{notif.title}</h4>
                                  <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{notif.time}</span>
                                </div>
                                <p className="text-xs font-medium text-gray-500 leading-relaxed pr-2">
                                  {notif.message}
                                </p>
                              </div>
                            </div>
                            {!notif.isRead && (
                              <div className="absolute top-2 right-2 w-2 h-2 bg-[#0066cc] rounded-full" />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 flex flex-col items-center justify-center text-center px-10">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4">
                          <Bell size={32} strokeWidth={1} />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">Hết thông báo rồi</h4>
                        <p className="text-xs font-medium text-gray-400">Chúng tôi sẽ báo cho bạn khi có tin mới!</p>
                      </div>
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <button className="w-full py-4 text-[11px] font-black text-[#0066cc] bg-gray-50/50 hover:bg-gray-50 transition-colors uppercase tracking-[0.2em] border-t border-gray-50">
                      Xem lịch sử thông báo
                    </button>
                  )}
                </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button 
          onClick={onProfileClick}
          className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <User size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
