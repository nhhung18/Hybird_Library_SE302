import React, { useState } from 'react';
import { X, CloudUpload } from 'lucide-react';

export default function CreateTicketModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerId: '',
    title: '',
    category: '',
    topic: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreate = () => {
    // Basic validation
    if (!formData.customerName || !formData.title || !formData.category) return;
    
    onCreate(formData);
    setFormData({
      customerName: '',
      customerId: '',
      title: '',
      category: '',
      topic: '',
      description: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Tạo Thẻ Hỗ Trợ Mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[75vh] flex flex-col gap-6">
          
          {/* Row 1 */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">TÊN KHÁCH HÀNG</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Nhập tên khách hàng..."
                className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">MÃ KHÁCH HÀNG</label>
              <input
                type="text"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                placeholder="Nhập mã khách hàng..."
                className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">TIÊU ĐỀ</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề..."
                className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">PHÂN LOẠI</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 bg-transparent appearance-none"
              >
                <option value="" disabled>Chọn phân loại...</option>
                <option value="Lỗi hệ thống">Lỗi hệ thống</option>
                <option value="Thông tin / Quy định">Thông tin / Quy định</option>
                <option value="Góp ý">Góp ý</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">CHỦ ĐỀ</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Nhập chủ đề hỗ trợ..."
              className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">MÔ TẢ CHI TIẾT</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
              className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700 min-h-[120px] resize-none"
            />
          </div>

          {/* Row 5 - Drag Drop */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">ĐÍNH KÈM TÙY CHỌN</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
              <CloudUpload size={28} className="text-gray-400 mb-2" />
              <p className="text-sm font-medium">Kéo thả file hoặc nhấp để tải lên</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-100 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-[#0056b3] bg-white hover:bg-gray-50 transition-colors"
          >
            Hủy Bỏ
          </button>
          <button
            onClick={handleCreate}
            className="px-8 py-2.5 text-sm font-bold text-white bg-[#0056b3] rounded-full hover:bg-blue-700 transition-colors shadow-md"
          >
            Tạo Thẻ
          </button>
        </div>
      </div>
    </div>
  );
}
