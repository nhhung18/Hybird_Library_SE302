import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Plus, Edit, Trash2, ChevronDown, Filter } from 'lucide-react';
import CreatePenaltyModal from '../components/CreatePenaltyModal';
import EditPenaltyModal from '../components/EditPenaltyModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

interface Penalty {
  id: string;
  memberId: string;
  memberName: string;
  bookTitle: string;
  bookIsbn?: string;
  violationType: string;
  amount: number;
  date: string;
  dueDate?: string;
  daysOverdue?: number;
  notes?: string;
  status: string;
}

export default function PenaltyManagement() {
  const navigate = useNavigate();
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [penaltyToDelete, setPenaltyToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  useEffect(() => {
    const saved = localStorage.getItem('libraryPenalties');
    if (saved) {
      setPenalties(JSON.parse(saved));
    } else {
      const mockPenalties: Penalty[] = [
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

  const handleAddPenalty = (formData: any) => {
    const nextNum = penalties.length > 0 ? parseInt(penalties[0].id.split('-')[2]) + 1 : 90;
    const newId = `#PP-2023-${nextNum.toString().padStart(3, '0')}`;

    const newPenalty: Penalty = {
      id: newId,
      memberId: 'N/A',
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

  const handleDeletePenalty = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setPenaltyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (penaltyToDelete) {
      const updated = penalties.filter(p => p.id !== penaltyToDelete);
      setPenalties(updated);
      localStorage.setItem('libraryPenalties', JSON.stringify(updated));
    }
    setIsDeleteModalOpen(false);
    setPenaltyToDelete(null);
  };

  const handleEditPenalty = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const penalty = penalties.find(p => p.id === id);
    if (penalty) {
      setSelectedPenalty(penalty);
      setIsEditModalOpen(true);
    }
  };

  const handleSavePenalty = (id: string, formData: any) => {
    const updated = penalties.map(p => {
      if (p.id === id) {
        return {
          ...p,
          memberName: formData.member,
          bookTitle: formData.book,
          violationType: formData.violationType,
          amount: parseInt(formData.amount),
          date: formData.date,
          notes: formData.notes
        };
      }
      return p;
    });
    setPenalties(updated);
    localStorage.setItem('libraryPenalties', JSON.stringify(updated));
  };

  const handleToggleStatus = (id: string, newStatus: string) => {
    const updated = penalties.map(p => p.id === id ? { ...p, status: newStatus } : p);
    setPenalties(updated);
    localStorage.setItem('libraryPenalties', JSON.stringify(updated));
  };

  const getStatusStyle = (status: string) => {
    return status === 'Chưa nộp' 
      ? 'bg-red-50 text-red-700 border-red-200' 
      : 'bg-green-50 text-green-700 border-green-200';
  };

  const filteredPenalties = penalties.filter(p => {
    const matchesSearch = p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Tất cả' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Quản lý Phiếu Phạt" />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6 shrink-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Phiếu Phạt</h1>
              <p className="text-sm text-gray-500 font-medium">Theo dõi và xử lý các trường hợp vi phạm quy định mượn trả.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã, tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  <option value="Chưa nộp">Chưa nộp</option>
                  <option value="Đã nộp">Đã nộp</option>
                </select>
                <Filter size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 bg-[#0066cc] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#0052a3] transition-colors shadow-md whitespace-nowrap"
              >
                <Plus size={18} />
                Tạo phiếu phạt
              </button>
            </div>
          </div>

          {/* Main Content Table Area */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
              <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="sticky top-0 z-10 bg-white shadow-sm">
                    <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                      <th className="px-6 py-5">MÃ PHIẾU</th>
                      <th className="px-6 py-5">ĐỘC GIẢ</th>
                      <th className="px-6 py-5">LÝ DO PHẠT</th>
                      <th className="px-6 py-5">TÊN SÁCH VI PHẠM</th>
                      <th className="px-6 py-5 text-right">SỐ TIỀN (VND)</th>
                      <th className="px-6 py-5">TRẠNG THÁI</th>
                      <th className="px-6 py-5 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-gray-700">
                    {filteredPenalties.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
                          Không tìm thấy phiếu phạt nào.
                        </td>
                      </tr>
                    ) : (
                      filteredPenalties.map((penalty) => (
                        <tr 
                          key={penalty.id} 
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                          onClick={() => navigate(`/fines/${penalty.id.replace('#', '')}`)}
                        >
                          <td className="px-6 py-5 font-bold text-gray-500">{penalty.id}</td>
                          <td className="px-6 py-5 font-bold text-gray-900">{penalty.memberName}</td>
                          <td className="px-6 py-5 text-gray-800 font-bold">{penalty.violationType}</td>
                          <td className="px-6 py-5 text-gray-500 font-medium">{penalty.bookTitle}</td>
                          <td className="px-6 py-5 font-bold text-gray-900 text-right">{penalty.amount.toLocaleString('en-US')}đ</td>
                          
                          {/* Status select dropdown */}
                          <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                            <div className="relative inline-block">
                              <select
                                value={penalty.status}
                                onChange={(e) => handleToggleStatus(penalty.id, e.target.value)}
                                className={`appearance-none outline-none cursor-pointer text-xs font-bold rounded-full px-3 py-1.5 pr-8 border transition-colors ${getStatusStyle(penalty.status)}`}
                              >
                                <option value="Chưa nộp">Chưa nộp</option>
                                <option value="Đã nộp">Đã nộp</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                <ChevronDown size={14} className="text-gray-500" />
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-center gap-4 text-gray-400">
                              <button 
                                onClick={(e) => handleEditPenalty(e, penalty.id)}
                                className="hover:text-[#0056b3] transition-colors active:scale-95"
                                title="Sửa"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={(e) => handleDeletePenalty(e, penalty.id)}
                                className="hover:text-red-500 transition-colors active:scale-95"
                                title="Xóa"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500 bg-white shrink-0">
                <span>Hiển thị 1-{filteredPenalties.length} trên tổng số {filteredPenalties.length} phiếu phạt</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CreatePenaltyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddPenalty={handleAddPenalty}
      />
      <EditPenaltyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSavePenalty={handleSavePenalty}
        penalty={selectedPenalty}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa phiếu phạt"
        message="Bạn có chắc chắn muốn xóa phiếu phạt này không? Dữ liệu không thể khôi phục."
      />
    </div>
  );
}
