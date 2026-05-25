import React, { useState } from 'react';
import { Search, Eye, Edit2, Trash2, Clock, Star, IdCard, Printer } from 'lucide-react';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import FeeDetailsModal from './FeeDetailsModal';
import EditFeeModal from './EditFeeModal';
import CreateFeeModal from './CreateFeeModal';

interface FeeSchedule {
  id: number;
  name: string;
  price: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeeSchedules({ isCreateOpen, onCloseCreate }: { isCreateOpen: boolean; onCloseCreate: () => void }) {
  const [feeSchedules, setFeeSchedules] = useState<FeeSchedule[]>([
    {
      id: 1,
      name: 'Phí trễ hạn',
      price: '2.000đ / ngày',
      description: 'Áp dụng khi trả sách quá hạn quy định',
      icon: <Clock size={18} className="text-red-500" />
    },
    {
      id: 2,
      name: 'Phí thẻ VIP',
      price: '50.000đ / năm',
      description: 'Nâng cấp tài khoản mượn sách không giới hạn',
      icon: <Star size={18} className="text-blue-500" />
    },
    {
      id: 3,
      name: 'Phí làm lại thẻ',
      price: '20.000đ / lần',
      description: 'Cấp lại thẻ thành viên bị mất hoặc hỏng',
      icon: <IdCard size={18} className="text-gray-500" />
    },
    {
      id: 4,
      name: 'Phí in ấn tài liệu',
      price: '500đ / trang',
      description: 'Dịch vụ in ấn tài liệu tham khảo tại thư viện',
      icon: <Printer size={18} className="text-gray-500" />
    }
  ]);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeSchedule | null>(null);

  const handleViewClick = (fee: FeeSchedule) => {
    setSelectedFee(fee);
    setIsDetailsModalOpen(true);
  };

  const handleEditClick = (fee: FeeSchedule) => {
    setSelectedFee(fee);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (fee: FeeSchedule) => {
    setSelectedFee(fee);
    setIsDeleteModalOpen(true);
  };

  const handleAddFee = (newFee: any) => {
    setFeeSchedules([newFee, ...feeSchedules]);
  };

  const handleUpdateFee = (updatedFee: any) => {
    setFeeSchedules(feeSchedules.map(fee => fee.id === updatedFee.id ? updatedFee : fee));
  };

  const handleConfirmDelete = () => {
    if (selectedFee) {
      setFeeSchedules(feeSchedules.filter(fee => fee.id !== selectedFee.id));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm font-sans">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
        <h2 className="text-xl font-bold text-gray-900">Danh sách Biểu phí hiện hành</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Tìm kiếm loại phí..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#0066cc] focus:border-[#0066cc] transition-shadow"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
              <th className="px-6 py-4">TÊN LOẠI PHÍ</th>
              <th className="px-6 py-4">ĐƠN GIÁ</th>
              <th className="px-6 py-4">MÔ TẢ</th>
              <th className="px-6 py-4 text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-700">
            {feeSchedules.map((fee) => (
              <tr key={fee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                <td className="px-6 py-6 font-bold text-gray-900">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                      {fee.icon}
                    </div>
                    <span className="text-sm">{fee.name}</span>
                  </div>
                </td>
                <td className="px-6 py-6 font-bold text-gray-900 whitespace-nowrap">
                  {fee.price}
                </td>
                <td className="px-6 py-6 text-gray-500 font-medium">
                  {fee.description}
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center justify-center gap-4 text-gray-400">
                    <button onClick={() => handleViewClick(fee)} className="hover:text-gray-600 transition-colors" title="Chi tiết"><Eye size={18} /></button>
                    <button onClick={() => handleEditClick(fee)} className="hover:text-gray-600 transition-colors" title="Sửa"><Edit2 size={18} /></button>
                    <button onClick={() => handleDeleteClick(fee)} className="hover:text-red-500 transition-colors" title="Xóa"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateFeeModal
        isOpen={isCreateOpen}
        onClose={onCloseCreate}
        onSave={handleAddFee}
      />

      {selectedFee && (
        <>
          <FeeDetailsModal 
            isOpen={isDetailsModalOpen} 
            onClose={() => setIsDetailsModalOpen(false)} 
            fee={selectedFee}
          />
          
          <EditFeeModal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            fee={selectedFee}
            onSave={handleUpdateFee}
          />
        </>
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
