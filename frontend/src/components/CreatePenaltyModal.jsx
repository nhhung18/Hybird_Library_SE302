import React, { useState } from 'react';
import { X, Search, Calendar as CalendarIcon } from 'lucide-react';

export default function CreatePenaltyModal({ isOpen, onClose, onAddPenalty }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    member: '',
    book: '',
    violationType: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.member || !formData.book || !formData.violationType || !formData.amount) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }
    
    // Simulate auto-calculating something or just returning raw
    onAddPenalty(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Tạo phiếu phạt mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">THÀNH VIÊN (ID HOẶC TÊN)</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="member"
                    value={formData.member}
                    onChange={handleChange}
                    placeholder="Nhập ID hoặc tên thành viên..."
                    className="w-full pl-10 pr-3 py-2.5 border-b-2 border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">SÁCH (TIÊU ĐỀ HOẶC ISBN)</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="book"
                    value={formData.book}
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề hoặc ISBN..."
                    className="w-full pl-10 pr-3 py-2.5 border-b-2 border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">LOẠI VI PHẠM</label>
                <select
                  name="violationType"
                  value={formData.violationType}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border-b-2 border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium bg-transparent cursor-pointer"
                >
                  <option value="" disabled>Chọn loại vi phạm</option>
                  <option value="Quá hạn trả sách">Quá hạn trả sách</option>
                  <option value="Làm rách trang bìa">Làm rách trang bìa</option>
                  <option value="Làm mất sách">Làm mất sách</option>
                  <option value="Hư hỏng sách">Hư hỏng sách</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">SỐ TIỀN PHẠT (VND)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full pr-12 py-2.5 border-b-2 border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium"
                  />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">VND</span>
                </div>
              </div>
            </div>

            <div className="w-1/2 pr-3">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">NGÀY LẬP PHIẾU</label>
              <div className="relative">
                <CalendarIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 border-b-2 border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">GHI CHÚ / MÔ TẢ CHI TIẾT</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Nhập chi tiết về tình trạng sách hoặc lý do phạt..."
                rows="3"
                className="w-full px-3 py-2.5 border-b-2 border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium resize-none"
              ></textarea>
            </div>
            
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-[#0056b3] hover:bg-blue-50 rounded-full transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 text-sm font-bold text-white bg-[#0056b3] rounded-full hover:bg-blue-700 transition-colors shadow-sm"
          >
            Xác nhận tạo phiếu
          </button>
        </div>
      </div>
    </div>
  );
}
