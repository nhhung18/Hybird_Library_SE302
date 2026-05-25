import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Plus, ChevronDown, Filter } from 'lucide-react';
import CreateTicketModal from '../components/CreateTicketModal';

interface Ticket {
  id: string;
  customerInitials: string;
  customerName: string;
  title: string;
  category: string;
  status: string;
  time: string;
}

export default function SupportManagement() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial mock data based on the screenshot
  const [tickets, setTickets] = useState<Ticket[]>(() => {
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

  const handleCreateTicket = (newTicketData: any) => {
    const newId = `#TK-90${Math.floor(Math.random() * 100)}`;
    const initials = newTicketData.customerName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
    
    const newTicket: Ticket = {
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

  const handleToggleStatus = (id: string, newStatus: string) => {
    const updated = tickets.map(t => t.id === id ? { ...t, status: newStatus } : t);
    setTickets(updated);
    localStorage.setItem('supportTickets', JSON.stringify(updated));
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Mới':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Đang xử lý':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Đã xử lý':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Tất cả' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Quản lý Hỗ Trợ Khách Hàng" />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6 shrink-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Hỗ trợ khách hàng</h1>
              <p className="text-sm text-gray-500 font-medium">Theo dõi và xử lý các yêu cầu hỗ trợ từ độc giả thư viện.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Mã ticket, tên..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-full focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] text-sm shadow-sm bg-white"
                />
              </div>

              {/* Status Filter */}
              <div className="relative inline-block">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-full pl-10 pr-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm focus:outline-none focus:border-[#0066cc] cursor-pointer"
                >
                  <option value="Tất cả">Trạng thái: Tất cả</option>
                  <option value="Mới">Mới</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã xử lý">Đã xử lý</option>
                </select>
                <Filter size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2 rounded-full font-bold text-sm transition-colors shadow-md whitespace-nowrap"
              >
                <Plus size={18} />
                Tạo ticket mới
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 flex flex-col flex-1 shadow-sm overflow-hidden min-h-0">
            {/* Table */}
            <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                  <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                    <th className="px-6 py-5">MÃ TICKET</th>
                    <th className="px-6 py-5">KHÁCH HÀNG</th>
                    <th className="px-6 py-5">TIÊU ĐỀ / PHÂN LOẠI</th>
                    <th className="px-6 py-5">TRẠNG THÁI</th>
                    <th className="px-6 py-5 text-right">THỜI GIAN</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700">
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                        Không tìm thấy ticket hỗ trợ nào.
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((ticket, index) => (
                      <tr 
                        key={ticket.id || index} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                        onClick={() => navigate(`/support/${ticket.id.replace('#', '')}`)}
                      >
                        <td className="px-6 py-5 font-bold text-gray-500">{ticket.id}</td>
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0 shadow-inner">
                                 {ticket.customerInitials}
                              </div>
                              <span className="font-bold text-gray-900">{ticket.customerName}</span>
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <p className="font-bold text-gray-900 mb-0.5">{ticket.title}</p>
                           <p className="text-[11px] text-gray-500 font-medium">{ticket.category}</p>
                        </td>
                        
                        {/* Status select dropdown */}
                        <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-block">
                            <select
                              value={ticket.status}
                              onChange={(e) => handleToggleStatus(ticket.id, e.target.value)}
                              className={`appearance-none outline-none cursor-pointer text-xs font-bold rounded-full px-3 py-1.5 pr-8 border transition-colors ${getStatusStyle(ticket.status)}`}
                            >
                              <option value="Mới">Mới</option>
                              <option value="Đang xử lý">Đang xử lý</option>
                              <option value="Đã xử lý">Đã xử lý</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                              <ChevronDown size={14} className="text-gray-500" />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-right text-gray-500 font-bold">
                          {ticket.time}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500 bg-white shrink-0">
              <span className="font-medium">Hiển thị 1-{filteredTickets.length} trên tổng số {filteredTickets.length} ticket</span>
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
