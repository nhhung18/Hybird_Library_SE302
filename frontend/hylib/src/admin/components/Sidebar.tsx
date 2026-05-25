import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar, CreditCard, UserCheck,
  ArrowRightLeft, Headset, IdCard, Book, FileWarning, LogOut,
  Settings, HelpCircle, User as UserIcon, MoreVertical
} from 'lucide-react';
import logo from '../../image/logo.webp';

const mainMenuItems = [
  { icon: <LayoutDashboard size={18} strokeWidth={2} />, label: 'Thống kê', path: '/' },
  { icon: <Book size={18} strokeWidth={2} />, label: 'Quản lý sách', path: '/books' },
  { icon: <ArrowRightLeft size={18} strokeWidth={2} />, label: 'Quản lý mượn trả', path: '/borrowing' },
  { icon: <IdCard size={18} strokeWidth={2} />, label: 'Thẻ thành viên', path: '/membership-cards' },
  { icon: <UserCheck size={18} strokeWidth={2} />, label: 'Quản lý người dùng', path: '/users' },
  { icon: <Users size={18} strokeWidth={2} />, label: 'Quản lý nhân viên', path: '/employees' },
  { icon: <Calendar size={18} strokeWidth={2} />, label: 'Quản lý ca làm', path: '/shifts' },
  { icon: <CreditCard size={18} strokeWidth={2} />, label: 'Quản lý thanh toán', path: '/payments' },
  { icon: <FileWarning size={18} strokeWidth={2} />, label: 'Phiếu phạt', path: '/fines' },
  { icon: <Headset size={18} strokeWidth={2} />, label: 'Hỗ trợ khách hàng', path: '/support' },
];

const footerMenuItems = [
  { icon: <UserIcon size={18} strokeWidth={2} />, label: 'Chi tiết tài khoản' },
  { icon: <Settings size={18} strokeWidth={2} />, label: 'Cài đặt' },
  { icon: <HelpCircle size={18} strokeWidth={2} />, label: 'Trợ giúp' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen border-none flex flex-col fixed left-0 top-0 bg-[#1a1d27] z-50 text-gray-300 font-sans">
      <div className="p-6 pb-2">
        <div className="mb-8 flex items-center space-x-3 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shadow-inner">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">TLU Hybird Library</span>
        </div>

        <nav className="space-y-1.5 flex-1 pr-2">
          {mainMenuItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
            return (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive
                  ? 'bg-[#2a2d39] text-white'
                  : 'text-gray-400 hover:bg-[#2a2d39]/50 hover:text-gray-200'
                  }`}
              >
                <div className={`${isActive ? 'text-[#0066cc]' : ''}`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-6 py-4">
        <nav className="space-y-1.5 mb-6">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-gray-400 hover:bg-[#2a2d39]/50 hover:text-gray-200"
          >
            <LogOut size={18} strokeWidth={2} />
            <span className="font-medium text-sm">Đăng xuất</span>
          </button>
        </nav>

      </div>
    </aside>
  );
}
