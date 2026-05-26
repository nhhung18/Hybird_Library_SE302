import React, { useState, useEffect } from 'react';
import { MembershipPlan, MembershipPlanName } from '../../types';
import { membershipApi } from '../../api/membershipApi';

interface MembershipPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: MembershipPlan | null;
  onSave: () => void;
}

export default function MembershipPlanModal({ isOpen, onClose, plan, onSave }: MembershipPlanModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    planName: MembershipPlanName.BASIC,
    price: 0,
    durationDays: 30,
    maxBorrowBooks: 3,
    description: '',
    isActive: true
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (plan) {
        setFormData({
          planName: plan.planName,
          price: plan.price,
          durationDays: plan.durationDays,
          maxBorrowBooks: plan.maxBorrowBooks,
          description: plan.description || '',
          isActive: plan.isActive
        });
      } else {
        setFormData({
          planName: MembershipPlanName.BASIC,
          price: 0,
          durationDays: 30,
          maxBorrowBooks: 3,
          description: '',
          isActive: true
        });
      }
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen, plan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'durationDays' || name === 'maxBorrowBooks' ? Number(value) : value
      }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (plan) {
        await membershipApi.updateMembershipPlan(plan.id, formData);
      } else {
        await membershipApi.createMembershipPlan(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save membership plan', error);
      alert('Lưu cấu hình thất bại! Vui lòng kiểm tra lại.');
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans`}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className={`bg-white rounded-3xl w-full max-w-xl flex flex-col shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{plan ? 'Cập nhật Gói Thành Viên' : 'Thêm Gói Thành Viên'}</h2>
          <p className="text-sm text-gray-500">Thiết lập cấu hình quyền lợi và mức giá cho gói đăng ký.</p>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex flex-col gap-6">
            
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">TÊN GÓI (PLAN NAME)</label>
              <select
                name="planName"
                value={formData.planName}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent cursor-pointer text-sm font-medium"
              >
                {Object.values(MembershipPlanName).map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">GIÁ (VNĐ)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent text-sm font-bold text-blue-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">THỜI HẠN (NGÀY)</label>
                <input
                  type="number"
                  name="durationDays"
                  value={formData.durationDays}
                  onChange={handleChange}
                  min="1"
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">SÁCH MƯỢN TỐI ĐA</label>
              <input
                type="number"
                name="maxBorrowBooks"
                value={formData.maxBorrowBooks}
                onChange={handleChange}
                min="1"
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">MÔ TẢ GÓI</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập chi tiết quyền lợi..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300 text-sm font-medium resize-none mt-1"
              />
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer select-none">
                Kích hoạt (Khả dụng trên hệ thống)
              </label>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-100 bg-gray-50 rounded-b-3xl shrink-0">
          <button 
            type="button"
            onClick={onClose} 
            className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave} 
            className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-md"
          >
            Lưu thay đổi
          </button>
        </div>

      </div>
    </div>
  );
}
