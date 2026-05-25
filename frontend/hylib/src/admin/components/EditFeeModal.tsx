import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: any;
  onSave: (fee: any) => void;
}

export default function EditFeeModal({ isOpen, onClose, fee, onSave }: EditFeeModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (fee) {
      setName(fee.name || '');
      setPrice(fee.price || '');
      setDescription(fee.description || '');
    }
  }, [fee]);

  if (!isOpen && !isVisible) return null;

  const handleSave = () => {
    const updatedFee = {
      ...fee,
      name,
      price,
      description
    };
    onSave(updatedFee);
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans p-4`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-full max-w-md shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
          <h2 className="text-[20px] font-bold text-gray-900">Chỉnh sửa biểu phí</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6 bg-white overflow-y-auto">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Tên loại phí</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Đơn giá</label>
            <input 
              type="text" 
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full bg-white border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Mô tả</label>
            <textarea 
              rows={3} 
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-white border-b border-gray-200 py-2 text-gray-905 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 font-bold text-xs hover:bg-gray-50 rounded-full border border-gray-200 transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-bold text-xs rounded-full transition-colors shadow-sm"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
