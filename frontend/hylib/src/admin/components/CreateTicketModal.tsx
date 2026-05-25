import React, { useEffect, useState } from 'react';
import { X, CloudUpload } from 'lucide-react';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export default function CreateTicketModal({ isOpen, onClose, onCreate }: CreateTicketModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerId: '',
    title: '',
    category: '',
    topic: '',
    description: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreate = () => {
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
      <div className={`bg-white rounded-3xl w-full max-w-2xl p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tạo thẻ hỗ trợ mới</h2>
        <p className="text-sm text-gray-500 mb-6">Nhập thông tin chi tiết để tạo yêu cầu hỗ trợ mới.</p>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          {/* Row 1 */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Tên khách hàng</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Nhập tên khách hàng..."
                className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 placeholder-gray-300 bg-transparent animate-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Mã khách hàng</label>
              <input
                type="text"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                placeholder="Nhập mã khách hàng..."
                className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 placeholder-gray-300 bg-transparent"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Tiêu đề</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề..."
                className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 placeholder-gray-300 bg-transparent animate-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Phân loại</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 bg-transparent cursor-pointer"
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
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Chủ đề</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Nhập chủ đề hỗ trợ..."
              className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-800 placeholder-gray-300 bg-transparent animate-none"
            />
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Mô tả chi tiết</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
              className="w-full py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700 min-h-[80px] resize-none placeholder-gray-300 bg-transparent"
            />
          </div>

          {/* Row 5 - Drag Drop */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Đính kèm tùy chọn</label>
            <div className="border border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50/50 transition-all cursor-pointer">
              <CloudUpload size={24} className="text-gray-400 mb-1.5" />
              <p className="text-xs font-semibold">Kéo thả file hoặc nhấp để tải lên</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-md"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
