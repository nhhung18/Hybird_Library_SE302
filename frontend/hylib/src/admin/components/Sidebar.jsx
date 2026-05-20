import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../image/logo.webp';
import { 
  LayoutDashboard, Users, Calendar, CreditCard, UserCheck, 
  ArrowRightLeft, Headset, IdCard, Book, FileWarning, LogOut 
} from 'lucide-react';

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Thống kê', path: '/' },
  { icon: <Users size={20} />, label: 'Quản lý nhân viên', path: '/employees' },
  { icon: <Calendar size={20} />, label: 'Quản lý ca làm', path: '/shifts' },
  { icon: <CreditCard size={20} />, label: 'Quản lý thanh toán', path: '/payments' },
  { icon: <UserCheck size={20} />, label: 'Quản lý người dùng', path: '/users' },
  { icon: <ArrowRightLeft size={20} />, label: 'Quản lý mượn trả', path: '/borrowing' },
  { icon: <Headset size={20} />, label: 'Quản lý hỗ trợ khách hàng', path: '/support' },
  { icon: <IdCard size={20} />, label: 'Quản lý thẻ thành viên', path: '/membership-cards' },
  { icon: <Book size={20} />, label: 'Quản lý sách', path: '/books' },
  { icon: <FileWarning size={20} />, label: 'Quản lý phiếu phạt', path: '/fines' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen border-r border-gray-100 flex flex-col fixed left-0 top-0 bg-white z-50">
      <div className="p-8">
        <div className="mb-10 cursor-pointer overflow-hidden rounded-xl">
          <Link to="/">
            <img 
              src={logo} 
              alt="Thang Long University Logo" 
              className="w-full h-auto object-contain max-h-16"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
            return (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#0066cc] text-white shadow-md shadow-blue-100' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 space-y-1">
        <button 
          onClick={() => {
            // handle logout
            window.location.reload();
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
