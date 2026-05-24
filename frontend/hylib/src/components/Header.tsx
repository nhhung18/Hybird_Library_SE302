import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Clock, Check, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Notification } from '../types';
import logo from '../image/logo.webp';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onProfileClick: () => void;
  onBookClick: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: Notification[];
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  onNotificationClick: (notif: Notification) => void;
}

const NAV_LINKS = ['Khám phá', 'Sách', 'Sách của tôi', 'Thẻ thành viên', 'Hỗ trợ'];

const Header = ({
  activePage,
  setActivePage,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (!searchQuery) {
          setIsSearchExpanded(false);
        }
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

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
    <header className="h-[72px] px-8 sticky top-0 bg-white/60 backdrop-blur-3xl border-b border-white/40 z-[60] flex items-center justify-between shadow-sm">
      {/* Logo Area */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('Khám phá')}>
        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-white/50 flex items-center justify-center p-2">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-display font-bold text-xl text-[#1e3b2b] hidden md:block tracking-tight">TLU Hybird Library</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-1 bg-white/40 p-1.5 rounded-full border border-white/50 shadow-inner">
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => setActivePage(link)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activePage === link
                ? 'bg-white text-[#1e3b2b] shadow-sm'
                : 'text-gray-600 hover:text-[#1e3b2b] hover:bg-white/50'
              }`}
          >
            {link}
          </button>
        ))}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search */}
        <div className="relative flex items-center justify-end" ref={searchRef}>
          <AnimatePresence>
            {isSearchExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden mr-2"
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm sách, tác giả..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(e.target.value.length > 0);
                  }}
                  onFocus={() => searchQuery.length > 0 && setShowResults(true)}
                  className="w-full bg-white/70 backdrop-blur-md border border-white/60 rounded-full py-2 pl-4 pr-10 focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all outline-none text-sm font-medium shadow-inner"
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => {
              if (isSearchExpanded && searchQuery) {
                setSearchQuery('');
                setShowResults(false);
              } else {
                setIsSearchExpanded(!isSearchExpanded);
              }
            }}
            className={`p-2.5 rounded-full transition-all relative z-10 ${isSearchExpanded ? 'bg-white shadow-sm text-gray-800 absolute right-1.5' : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSearchExpanded && searchQuery ? <X size={18} strokeWidth={2} /> : <Search size={20} strokeWidth={2} />}
          </motion.button>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showResults && searchResults.length > 0 && isSearchExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="absolute top-full right-0 mt-3 w-[340px] bg-white/80 backdrop-blur-3xl rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden z-50"
              >
                <div className="p-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Kết quả tìm kiếm</p>
                  <div className="space-y-1">
                    {searchResults.map((result, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-2xl hover:bg-white/80 transition-all cursor-pointer group" onClick={() => { onBookClick(result.id); setShowResults(false); setIsSearchExpanded(false); }}>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0 shadow-sm">
                            <img src={result.image} alt={result.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-gray-900 text-sm truncate group-hover:text-[#1e3b2b] transition-colors">{result.title}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{result.author}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-gray-300/50 mx-1 hidden sm:block"></div>

        {/* Auth OR Profile/Notifications */}
        {!isLoggedIn ? (
          <div className="flex items-center gap-2">
            <button onClick={onLoginClick} className="px-5 py-2 text-sm font-bold text-gray-700 hover:text-[#1e3b2b] transition-colors">
              Đăng nhập
            </button>
            <button onClick={onRegisterClick} className="px-5 py-2 text-sm font-bold text-white bg-[#1e3b2b] rounded-full shadow-lg shadow-[#1e3b2b]/20 hover:shadow-[#1e3b2b]/30 hover:-translate-y-0.5 transition-all">
              Đăng ký
            </button>
          </div>
        ) : (
          <>
            <div className="relative" ref={notificationRef}>
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2.5 rounded-full transition-all relative ${showNotifications ? 'bg-white shadow-sm text-[#1e3b2b]' : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={20} strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white/80" />
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 w-[360px] bg-white/80 backdrop-blur-3xl rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden z-50 origin-top-right"
                  >
                    <div className="p-5 border-b border-black/5 bg-white/40 flex items-center justify-between">
                      <h3 className="font-bold text-lg text-gray-900">Thông báo</h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearAllNotifications();
                          }}
                          className="text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#1e3b2b] transition-colors"
                        >
                          Xóa tất cả
                        </button>
                      )}
                    </div>

                    <div className="max-h-[380px] overflow-y-auto custom-scrollbar p-2">
                      {notifications.length > 0 ? (
                        <div className="space-y-1">
                          {notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => {
                                markAsRead(notif.id);
                                onNotificationClick(notif);
                                setShowNotifications(false);
                              }}
                              className={`p-3 rounded-[16px] transition-all cursor-pointer group relative ${notif.isRead ? 'opacity-60 hover:bg-white/50' : 'bg-white shadow-sm border border-white/80 hover:bg-gray-50/80'}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notif.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                    notif.type === 'success' ? 'bg-green-100 text-green-600' :
                                      'bg-blue-100 text-blue-600'
                                  }`}>
                                  {notif.type === 'warning' ? <Clock size={14} strokeWidth={2} /> :
                                    notif.type === 'success' ? <Check size={14} strokeWidth={2} /> :
                                      <Bell size={14} strokeWidth={2} />}
                                </div>
                                <div className="flex-1 min-w-0 pr-4">
                                  <div className="flex items-center justify-between mb-0.5">
                                    <h4 className="font-bold text-gray-900 text-sm truncate">{notif.title}</h4>
                                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{notif.time}</span>
                                  </div>
                                  <p className="text-xs font-medium text-gray-500 leading-relaxed line-clamp-2">
                                    {notif.message}
                                  </p>
                                </div>
                              </div>
                              {!notif.isRead && (
                                <div className="absolute top-1/2 -translate-y-1/2 right-3 w-2 h-2 bg-[#1e3b2b] rounded-full" />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                            <Bell size={20} />
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm">Không có thông báo</h4>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={onProfileClick}
              className="p-2.5 rounded-full hover:bg-white/50 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={22} strokeWidth={2} />
            </motion.button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
