import React from 'react';
import logo from '../image/logo.webp';
import {
  Compass,
  Book,
  Library,
  Heart,
  ShoppingBag,
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onLogoutClick: () => void;
}

const Sidebar = ({ activePage, setActivePage, onLogoutClick }: SidebarProps) => {
  const menuItems = [
    { icon: Compass, label: 'Khám phá' },
    { icon: Book, label: 'Sách' },
    { icon: Library, label: 'Sách của tôi' },
    { icon: Heart, label: 'Yêu thích' },
    { icon: ShoppingBag, label: 'Giỏ sách' },
    { icon: CreditCard, label: 'Thẻ thành viên' },
  ];

  return (
    <div className="w-64 h-screen border-r border-gray-100 flex flex-col fixed left-0 top-0 bg-white z-50">
      <div className="p-8">
        <div className="mb-10 cursor-pointer overflow-hidden rounded-xl" onClick={() => setActivePage('Khám phá')}>
          <img
            src={logo}
            alt="Thang Long University Logo"
            className="w-full h-auto object-contain max-h-16"
            referrerPolicy="no-referrer"
          />
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActivePage(item.label)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activePage === item.label
                ? 'bg-[#0066cc] text-white shadow-md shadow-blue-100'
                : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 space-y-1">
        <button
          id="nav-support"
          onClick={() => setActivePage('Hỗ trợ')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activePage === 'Hỗ trợ'
            ? 'bg-[#0066cc] text-white shadow-md shadow-blue-100'
            : 'text-gray-500 hover:bg-gray-50'
            }`}
        >
          <HelpCircle size={20} />
          <span className="font-medium text-sm">Hỗ trợ</span>
        </button>
        <button
          onClick={onLogoutClick}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
