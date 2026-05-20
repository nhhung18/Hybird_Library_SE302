import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Plus } from 'lucide-react';
import CreatePenaltyModal from '../components/CreatePenaltyModal';

const getAvatarUrl = (name) => {
  if (name === 'Nguyễn Văn An') {
    return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80';
  }
  if (name.includes('Bích') || name.includes('Bịch') || name.includes('Thị')) {
    return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80';
  }
  return null;
};

export default function PenaltyManagement() {
  const navigate = useNavigate();
  const [penalties, setPenalties] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Load from localStorage or initialize with some mock data if empty
    const saved = localStorage.getItem('libraryPenalties');
    if (saved) {
      setPenalties(JSON.parse(saved));
    } else {
      const mockPenalties = [
        {
          id: '#PP-2023-089',
          memberId: 'MEM-2023-091',
          memberName: 'Nguyễn Văn An',
          bookTitle: 'Clean Architecture - Robert C. Martin',
          bookIsbn: '978-0134494166',
          violationType: 'Quá hạn trả sách (12 ngày)',
          amount: 120000,
          date: '2023-10-12',
          dueDate: '2023-10-26',
          daysOverdue: 12,
          notes: 'Quá hạn trả sách (12 ngày)',
          status: 'Chưa nộp'
        },
        {
          id: '#PP-2023-088',
          memberId: 'MEM-2023-080',
          memberName: 'Trần Thị Bích',
          bookTitle: 'Design Patterns - Erich Gamma',
          bookIsbn: '978-0201633610',
          violationType: 'Làm rách trang bìa',
          amount: 50000,
          date: '2023-10-10',
          notes: 'Làm rách trang bìa',
          status: 'Đã nộp'
        },
        {
          id: '#PP-2023-087',
          memberId: 'MEM-2023-081',
          memberName: 'Trấn Thị Bịch',
          bookTitle: 'Design Patterns - Erich Gamma',
          bookIsbn: '978-0201633610',
          violationType: 'Làm rách trang bìa',
          amount: 50000,
          date: '2023-10-10',
          notes: 'Làm rách trang bìa',
          status: 'Đã nộp'
        }
      ];
      setPenalties(mockPenalties);
      localStorage.setItem('libraryPenalties', JSON.stringify(mockPenalties));
    }
  }, []);

  const handleAddPenalty = (formData) => {
    // generate ID
    const nextNum = penalties.length > 0 ? parseInt(penalties[0].id.split('-')[2]) + 1 : 90;
    const newId = `#PP-2023-${nextNum.toString().padStart(3, '0')}`;

    const newPenalty = {
      id: newId,
      memberId: 'N/A', // user just types name or ID, we just display it
      memberName: formData.member,
      bookTitle: formData.book,
      violationType: formData.violationType,
      amount: parseInt(formData.amount),
      date: formData.date,
      notes: formData.notes,
      status: 'Chưa nộp'
    };

    const updated = [newPenalty, ...penalties];
    setPenalties(updated);
    localStorage.setItem('libraryPenalties', JSON.stringify(updated));
  };

  const filteredPenalties = penalties.filter(p => {
    const matchesSearch = p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'unpaid' && p.status === 'Chưa nộp') ||
      (filterStatus === 'paid' && p.status === 'Đã nộp');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-[#f8f9fb]">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý Phiếu phạt</h1>
              <p className="text-gray-500 text-sm">Theo dõi và xử lý các trường hợp vi phạm quy định mượn trả.</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-[#0056b3] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={18} />
              Tạo phiếu phạt mới
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã, tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-100 text-sm bg-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${filterStatus === 'all'
                    ? 'bg-[#0056b3] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilterStatus('unpaid')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${filterStatus === 'unpaid'
                    ? 'bg-[#0056b3] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                Chưa nộp
              </button>
              <button
                onClick={() => setFilterStatus('paid')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${filterStatus === 'paid'
                    ? 'bg-[#0056b3] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                Đã nộp
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {/* Table Header like labels */}
            <div className="grid grid-cols-12 gap-4 px-6 text-xs font-bold text-gray-500 uppercase">
              <div className="col-span-2"></div>
              <div className="col-span-3"></div>
              <div className="col-span-4"></div>
              <div className="col-span-2 text-right"></div>
              <div className="col-span-1 text-center"></div>
            </div>

            {/* List */}
            {filteredPenalties.map((penalty) => (
              <div
                key={penalty.id}
                onClick={() => navigate(`/fines/${penalty.id.replace('#', '')}`)}
                className="bg-white px-6 py-4 rounded-2xl border border-gray-200 grid grid-cols-12 gap-4 items-center hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="col-span-2 font-bold text-gray-900 text-sm">
                  {penalty.id}
                </div>

                <div className="col-span-3 flex items-center gap-3">
                  {getAvatarUrl(penalty.memberName) ? (
                    <img
                      src={getAvatarUrl(penalty.memberName)}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                      alt={penalty.memberName}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                      {penalty.memberName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-bold text-gray-900 text-sm">{penalty.memberName}</span>
                </div>

                <div className="col-span-4 flex flex-col">
                  <span className="font-bold text-gray-900 text-sm">{penalty.violationType}</span>
                  <span className="text-gray-500 text-xs mt-0.5">{penalty.bookTitle}</span>
                </div>

                <div className="col-span-2 text-right font-bold text-gray-900 text-lg">
                  {penalty.amount.toLocaleString('en-US')}đ
                </div>

                <div className="col-span-1 flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${penalty.status === 'Chưa nộp'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-gray-100 text-gray-500'
                    }`}>
                    {penalty.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <CreatePenaltyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddPenalty={handleAddPenalty}
      />
    </div>
  );
}
