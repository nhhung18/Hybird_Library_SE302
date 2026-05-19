import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditFeeModal({ isOpen, onClose, fee, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (fee) {
      setName(fee.name || '');
      setPrice(fee.price || '');
      setDescription(fee.description || '');
    }
  }, [fee]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-900">Chỉnh sửa Biểu phí</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 bg-white">
          
          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              TÊN LOẠI PHÍ
            </label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              ĐƠN GIÁ
            </label>
            <input 
              type="text" 
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              MÔ TẢ
            </label>
            <textarea 
              rows="3" 
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            ></textarea>
          </div>

        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 rounded-full transition-colors bg-white shadow-sm"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#0056b3] hover:bg-blue-700 text-white font-medium text-sm rounded-full transition-colors shadow-sm"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
