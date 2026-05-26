import React, { useState, useEffect } from 'react';
import { PenaltyCost, PenaltyCostName, CalculationType } from '../../types';
import { penaltyApi } from '../../api/penaltyApi';

interface PenaltyCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  penaltyCost: PenaltyCost | null;
  onSave: () => void;
}

export default function PenaltyCostModal({ isOpen, onClose, penaltyCost, onSave }: PenaltyCostModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    penaltyCostName: PenaltyCostName.LATE,
    calculationType: CalculationType.FIXED,
    price: 0,
    description: ''
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (penaltyCost) {
        setFormData({
          penaltyCostName: penaltyCost.penaltyCostName,
          calculationType: penaltyCost.calculationType,
          price: penaltyCost.price,
          description: penaltyCost.description || ''
        });
      } else {
        setFormData({
          penaltyCostName: PenaltyCostName.LATE,
          calculationType: CalculationType.FIXED,
          price: 0,
          description: ''
        });
      }
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen, penaltyCost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (penaltyCost) {
        await penaltyApi.updatePenalty(penaltyCost.id, formData);
      } else {
        await penaltyApi.createPenalty(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save penalty cost', error);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{penaltyCost ? 'Cập nhật Mức Phạt' : 'Thêm Mức Phạt Mới'}</h2>
          <p className="text-sm text-gray-500">Cấu hình chi phí vi phạm cho thư viện.</p>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex flex-col gap-6">
            
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">LOẠI VI PHẠM</label>
              <select
                name="penaltyCostName"
                value={formData.penaltyCostName}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent cursor-pointer text-sm font-medium"
              >
                {Object.values(PenaltyCostName).map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">CÁCH TÍNH</label>
              <select
                name="calculationType"
                value={formData.calculationType}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent cursor-pointer text-sm font-medium"
              >
                {Object.values(CalculationType).map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                MỨC TIỀN / PHẦN TRĂM
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent text-sm font-bold text-red-600"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                (Điền phần trăm ví dụ 50 cho BOOK_PRICE_PERCENT, hoặc tiền VND cho FIXED/PER_DAY)
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">MÔ TẢ</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300 text-sm font-medium resize-none mt-1"
              />
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
