import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import PenaltyCostModal from '../components/PenaltyCostModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { PenaltyCost } from '../../types';
import { penaltyApi } from '../../api/penaltyApi';

export default function PenaltyManagement() {
  const [penalties, setPenalties] = useState<PenaltyCost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState<PenaltyCost | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [penaltyToDelete, setPenaltyToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchPenalties();
  }, []);

  const fetchPenalties = async () => {
    try {
      const response = await penaltyApi.getAllPenalties();
      if (Array.isArray(response)) {
        setPenalties(response);
      }
    } catch (error) {
      console.error('Failed to fetch penalty costs', error);
    }
  };

  const handleCreate = () => {
    setSelectedPenalty(null);
    setIsModalOpen(true);
  };

  const handleEdit = (penalty: PenaltyCost) => {
    setSelectedPenalty(penalty);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setPenaltyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (penaltyToDelete !== null) {
      try {
        await penaltyApi.deletePenalty(penaltyToDelete);
        fetchPenalties();
      } catch (error) {
        console.error('Failed to delete penalty cost', error);
        alert('Xóa mức phạt thất bại!');
      }
    }
    setIsDeleteModalOpen(false);
    setPenaltyToDelete(null);
  };

  const filteredPenalties = penalties.filter(p => 
    p.penaltyCostName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Cấu hình Mức Phạt" />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cấu Hình Phạt</h1>
            <p className="text-sm text-gray-500 font-medium mb-4">Quản lý các loại vi phạm và mức tiền phạt áp dụng cho độc giả.</p>
            
            <div className="flex justify-between items-center">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Tìm kiếm vi phạm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-all shadow-sm"
                />
              </div>

              <button 
                onClick={handleCreate}
                className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2 rounded-full font-bold transition-colors flex items-center gap-2 text-sm shadow-md whitespace-nowrap"
              >
                <Plus size={18} />
                Thêm mức phạt
              </button>
            </div>
          </div>

          {/* Main Content Table Area */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
              <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="sticky top-0 z-10 bg-white shadow-sm">
                    <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-5 w-16">ID</th>
                      <th className="px-6 py-5">LOẠI VI PHẠM</th>
                      <th className="px-6 py-5">CÁCH TÍNH</th>
                      <th className="px-6 py-5">MỨC PHẠT</th>
                      <th className="px-6 py-5 w-1/3">MÔ TẢ</th>
                      <th className="px-6 py-5 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-gray-700">
                    {filteredPenalties.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium bg-white">
                          Không tìm thấy cấu hình phạt nào.
                        </td>
                      </tr>
                    ) : (
                      filteredPenalties.map((penalty, index) => (
                        <tr key={penalty.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                          <td className="px-6 py-5 font-bold text-gray-500">#{penalty.id}</td>
                          <td className="px-6 py-5 font-bold text-gray-900">
                            {penalty.penaltyCostName}
                          </td>
                          <td className="px-6 py-5 text-gray-600 font-medium">
                            {penalty.calculationType}
                          </td>
                          <td className="px-6 py-5 font-bold text-red-600">
                            {penalty.calculationType.includes('PERCENT') 
                              ? `${penalty.price}% giá bìa`
                              : `${penalty.price.toLocaleString('vi-VN')} đ`
                            }
                          </td>
                          <td className="px-6 py-5 text-gray-500 font-medium">
                            {penalty.description || '-'}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-4 text-gray-400">
                              <button onClick={() => handleEdit(penalty)} className="hover:text-[#0056b3] transition-colors p-1" title="Chỉnh sửa"><Edit2 size={18} /></button>
                              <button onClick={() => handleDelete(penalty.id)} className="hover:text-red-500 transition-colors p-1" title="Xóa"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PenaltyCostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        penaltyCost={selectedPenalty}
        onSave={fetchPenalties}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa Mức Phạt"
        message="Bạn có chắc chắn muốn xóa cấu hình phạt này không? Thao tác không thể hoàn tác."
      />
    </div>
  );
}
