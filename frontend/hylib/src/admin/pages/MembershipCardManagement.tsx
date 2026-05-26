import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import MembershipPlanModal from '../components/MembershipPlanModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { MembershipPlan } from '../../types';
import { membershipApi } from '../../api/membershipApi';

export default function MembershipCardManagement() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await membershipApi.getAllMembershipPlans();
      if (Array.isArray(response)) {
        setPlans(response);
      }
    } catch (error) {
      console.error('Failed to fetch membership plans', error);
    }
  };

  const handleCreate = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const handleEdit = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setPlanToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (planToDelete !== null) {
      try {
        await membershipApi.deleteMembershipPlan(planToDelete);
        fetchPlans();
      } catch (error) {
        console.error('Failed to delete membership plan', error);
        alert('Xóa gói thất bại! Gói có thể đang được sử dụng.');
      }
    }
    setIsDeleteModalOpen(false);
    setPlanToDelete(null);
  };

  const handleToggleActive = async (plan: MembershipPlan) => {
    try {
      await membershipApi.updateMembershipPlan(plan.id, { ...plan, isActive: !plan.isActive });
      fetchPlans();
    } catch (error) {
      console.error('Failed to toggle active state', error);
    }
  };

  const filteredPlans = plans.filter(p => 
    p.planName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Quản lý Gói Thành Viên" />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gói Thành Viên</h1>
            <p className="text-sm text-gray-500 font-medium mb-4">Cấu hình các hạng thẻ (Basic, Standard, Premium) dành cho độc giả.</p>
            
            <div className="flex justify-between items-center">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Tìm kiếm gói..."
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
                Thêm gói mới
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
                      <th className="px-6 py-5">TÊN GÓI</th>
                      <th className="px-6 py-5">MỨC GIÁ</th>
                      <th className="px-6 py-5">THỜI HẠN</th>
                      <th className="px-6 py-5 text-center">SÁCH TỐI ĐA</th>
                      <th className="px-6 py-5 text-center">TRẠNG THÁI</th>
                      <th className="px-6 py-5 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-gray-700">
                    {filteredPlans.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium bg-white">
                          Không tìm thấy cấu hình gói nào.
                        </td>
                      </tr>
                    ) : (
                      filteredPlans.map((plan, index) => (
                        <tr key={plan.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                          <td className="px-6 py-5 font-bold text-gray-500">#{plan.id}</td>
                          <td className="px-6 py-5 font-bold text-gray-900">
                            {plan.planName}
                          </td>
                          <td className="px-6 py-5 font-bold text-blue-700">
                            {plan.price.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="px-6 py-5 text-gray-700 font-medium">
                            {plan.durationDays} ngày
                          </td>
                          <td className="px-6 py-5 text-center font-bold text-gray-700">
                            {plan.maxBorrowBooks} cuốn
                          </td>
                          <td className="px-6 py-5 text-center">
                             <button
                               onClick={() => handleToggleActive(plan)}
                               className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${plan.isActive ? 'bg-[#0066cc]' : 'bg-gray-300'}`}
                             >
                               <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${plan.isActive ? 'translate-x-4.5' : 'translate-x-1'}`} style={{ transform: plan.isActive ? 'translateX(18px)' : 'translateX(4px)' }} />
                             </button>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-4 text-gray-400">
                              <button onClick={() => handleEdit(plan)} className="hover:text-[#0056b3] transition-colors p-1" title="Chỉnh sửa"><Edit2 size={18} /></button>
                              <button onClick={() => handleDelete(plan.id)} className="hover:text-red-500 transition-colors p-1" title="Xóa"><Trash2 size={18} /></button>
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

      <MembershipPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
        onSave={fetchPlans}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa Gói Thành Viên"
        message="Bạn có chắc chắn muốn xóa cấu hình này không? Dữ liệu không thể phục hồi sau khi xóa."
      />
    </div>
  );
}
