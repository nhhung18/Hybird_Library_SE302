import React, { useState, useEffect } from 'react';
import { X, FileEdit, Lock } from 'lucide-react';

export default function EditCardModal({ isOpen, onClose, onSave, card }) {
  const [formData, setFormData] = useState({
    cardType: '',
    status: '',
    note: ''
  });

  useEffect(() => {
    if (card) {
      setFormData({
        cardType: card.cardType,
        status: card.status,
        note: card.note || ''
      });
    }
  }, [card]);

  if (!isOpen || !card) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onSave(card.id, formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#0056b3]">
              <FileEdit size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">Chỉnh sửa thông tin thẻ {card.id}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors self-start">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 flex flex-col gap-6">
          
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">NGƯỜI SỞ HỮU</label>
            <div className="relative bg-gray-50 border border-gray-100 rounded-md">
              <input
                type="text"
                value={card.ownerName}
                readOnly
                className="w-full py-3 px-4 text-lg text-gray-600 bg-transparent focus:outline-none"
              />
              <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">TRẠNG THÁI</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full pb-2 border-b border-gray-200 text-lg focus:outline-none focus:border-blue-500 transition-all text-gray-800 bg-transparent appearance-none"
            >
              <option value="Hoạt động">Hoạt động</option>
              <option value="Bị khóa">Bị khóa</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">GHI CHÚ</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Nhập ghi chú hoặc lý do thay đổi..."
              className="w-full pb-2 border-b border-gray-200 text-lg focus:outline-none focus:border-blue-500 transition-all text-gray-800 resize-none min-h-[60px] placeholder-gray-300"
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
            onClick={handleSave}
            className="px-8 py-2.5 text-sm font-bold text-white bg-[#0056b3] rounded-full hover:bg-blue-700 transition-colors shadow-md"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
