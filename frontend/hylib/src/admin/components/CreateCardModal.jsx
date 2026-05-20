import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

export default function CreateCardModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    owner: '',
    cardType: 'Standard Scholar',
    note: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreate = () => {
    if (!formData.owner) return;
    
    onCreate(formData);
    setFormData({
      owner: '',
      cardType: 'Standard Scholar',
      note: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 ">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-900">Cấp thẻ mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 flex flex-col gap-6">
          
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">NGƯỜI SỞ HỮU</label>
            <div className="relative">
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="Ví dụ: Nguyen Van A"
                className="w-full pb-2 border-b border-gray-200 text-lg focus:outline-none focus:border-blue-500 transition-all text-gray-800"
              />
              <Search className="absolute right-0 top-1 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">LOẠI THẺ</label>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              className="w-full pb-2 border-b border-gray-200 text-lg focus:outline-none focus:border-blue-500 transition-all text-gray-800 bg-transparent appearance-none"
            >
              <option value="Standard Scholar">Standard Scholar</option>
              <option value="Premium Explorer">Premium Explorer</option>
              <option value="Digital">Digital</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">GHI CHÚ</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Thêm ghi chú nếu cần..."
              className="w-full pb-2 border-b border-gray-200 text-lg focus:outline-none focus:border-blue-500 transition-all text-gray-800 resize-none min-h-[80px]"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleCreate}
            className="px-8 py-2.5 text-sm font-bold text-white bg-[#0056b3] rounded-full hover:bg-blue-700 transition-colors shadow-md"
          >
            Cấp thẻ
          </button>
        </div>
      </div>
    </div>
  );
}
