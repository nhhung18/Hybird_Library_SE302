import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    <aside className="w-64 h-screen bg-[#f8f9fb] border-r border-gray-200 flex flex-col justify-between fixed left-0 top-0">
      <div>
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-center border-b border-transparent mt-4 mb-4">
          <div className="flex flex-col items-center">
             <span className="text-red-600 text-3xl font-bold italic tracking-tighter relative">
                1L <span className="absolute -bottom-3 left-1 text-[8px] text-blue-900 not-italic uppercase tracking-widest font-sans">Thang Long<br/>University</span>
             </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 px-4 mt-8">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#e5ecf6] text-[#0056b3]' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6">
        <button className="flex items-center gap-4 text-gray-600 hover:text-gray-900 font-medium text-sm">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
