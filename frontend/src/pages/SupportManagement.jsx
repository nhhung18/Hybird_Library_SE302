import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import CreateTicketModal from '../components/CreateTicketModal';

export default function SupportManagement() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  // Initial mock data based on the screenshot
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('supportTickets');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: '#TK-9021',
        customerInitials: 'MK',
        customerName: 'Michael Kim',
        title: 'Lỗi truy cập tài khoản',
        category: 'Lỗi hệ thống',
        status: 'Mới',
        time: '2 giờ trước'
      },
      {
        id: '#TK-9020',
        customerInitials: 'SL',
        customerName: 'Sarah Lee',
        title: 'Hỏi về quy định mượn sách',
        category: 'Thông tin / Quy định',
        status: 'Đang xử lý',
        time: '4 giờ trước'
      },
      {
        id: '#TK-9018',
        customerInitials: 'DP',
        customerName: 'David Pham',
        title: 'Gia hạn sách trực tuyến không được',
        category: 'Lỗi hệ thống',
        status: 'Đã xử lý',
        time: 'Hôm qua'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('supportTickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleCreateTicket = (newTicketData) => {
    // Generate a new ID based on current timestamp logic or just random
    const newId = `#TK-90${Math.floor(Math.random() * 100)}`;
    const initials = newTicketData.customerName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    
    const newTicket = {
      id: newId,
      customerInitials: initials,
      customerName: newTicketData.customerName,
      title: newTicketData.title,
      category: newTicketData.category,
      status: 'Mới',
      time: 'Vừa xong'
    };
    
    setTickets([newTicket, ...tickets]);
    setIsCreateModalOpen(false);
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Mới':
        return 'bg-red-100 text-red-600';
      case 'Đang xử lý':
        return 'bg-gray-200 text-gray-700';
      case 'Đã xử lý':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fb]">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Header />
        
        <div className="p-10 flex-1 overflow-y-auto flex flex-col">
          {/* Header section */}
          <div className="flex justify-between items-start mb-8 shrink-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Hỗ trợ khách hàng</h1>
              <p className="text-gray-500 text-sm">Theo dõi và xử lý các yêu cầu từ người dùng thư viện.</p>
            </div>
            
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-[#0056b3] hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors shadow-sm"
            >
              <Plus size={18} />
              Tạo Ticket Mới
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 flex flex-col flex-1 shadow-sm overflow-hidden">
            
            {/* Search and Filters */}
            <div className="p-5 flex justify-between items-end border-b border-gray-100">
              <div className="w-[400px]">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">TÌM KIẾM</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Mã ticket, tên khách hàng..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveFilter('Tất cả')}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${activeFilter === 'Tất cả' ? 'bg-white border border-gray-300 text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  Tất cả
                </button>
                <button 
                  onClick={() => setActiveFilter('Mới')}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${activeFilter === 'Mới' ? 'bg-red-100 text-red-600' : 'bg-red-50 text-red-400 hover:bg-red-100'}`}
                >
                  Mới (12)
                </button>
                <button 
                  onClick={() => setActiveFilter('Đang xử lý')}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${activeFilter === 'Đang xử lý' ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  Đang xử lý
                </button>
                <button 
                  onClick={() => setActiveFilter('Đã xử lý')}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${activeFilter === 'Đã xử lý' ? 'bg-blue-100 text-blue-700' : 'bg-[#e6f0fa] text-[#0056b3] hover:bg-blue-100'}`}
                >
                  Đã xử lý
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                    <th className="px-6 py-5">MÃ TICKET</th>
                    <th className="px-6 py-5">KHÁCH HÀNG</th>
                    <th className="px-6 py-5">TIÊU ĐỀ / PHÂN LOẠI</th>
                    <th className="px-6 py-5">TRẠNG THÁI</th>
                    <th className="px-6 py-5 text-right">THỜI GIAN</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-gray-700">
                  {tickets.map((ticket, index) => (
                    <tr 
                      key={ticket.id || index} 
                      onClick={() => navigate(`/support/${ticket.id.replace('#', '')}`)}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                    >
                      <td className="px-6 py-5 font-bold text-gray-900">{ticket.id}</td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0">
                               {ticket.customerInitials}
                            </div>
                            <span className="font-medium text-gray-800">{ticket.customerName}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <p className="font-medium text-gray-800 mb-1">{ticket.title}</p>
                         <p className="text-xs text-gray-500 font-medium">{ticket.category}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold ${getStatusStyle(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right text-gray-500 font-medium">
                        {ticket.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-5 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 bg-white">
              <span className="font-medium">Hiển thị 1-3 của 124 kết quả</span>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CreateTicketModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreateTicket} 
      />
    </div>
  );
}
