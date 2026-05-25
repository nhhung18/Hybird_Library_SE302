import React, { useEffect, useState } from 'react';
import { X, Search, Calendar as CalendarIcon } from 'lucide-react';

interface EditPenaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePenalty: (id: string, formData: any) => void;
  penalty: any;
}

export default function EditPenaltyModal({ isOpen, onClose, onSavePenalty, penalty }: EditPenaltyModalProps) {
  const [formData, setFormData] = useState({
    member: '',
    book: '',
    violationType: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (penalty) {
        setFormData({
          member: penalty.memberName || '',
          book: penalty.bookTitle || '',
          violationType: penalty.violationType || 'Quá hạn trả sách',
          amount: penalty.amount ? penalty.amount.toString() : '',
          date: penalty.date || new Date().toISOString().split('T')[0],
          notes: penalty.notes || ''
        });
      }
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen, penalty]);

  if (!isOpen && !isVisible) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.member || !formData.book || !formData.violationType || !formData.amount) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }
    
    onSavePenalty(penalty.id, formData);
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Chỉnh sửa phiếu phạt</h2>
        <p className="text-sm text-gray-500 mb-6">Cập nhật thông tin phiếu phạt vi phạm quy định thư viện.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Thành viên (ID hoặc tên)</label>
                <div className="relative">
                  <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="member"
                    value={formData.member}
                    onChange={handleChange}
                    placeholder="Nhập ID hoặc tên thành viên..."
                    className="w-full pl-8 py-2 border-b border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium placeholder-gray-300 bg-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Sách (Tiêu đề hoặc ISBN)</label>
                <div className="relative">
                  <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="book"
                    value={formData.book}
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề hoặc ISBN..."
                    className="w-full pl-8 py-2 border-b border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium placeholder-gray-300 bg-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Loại vi phạm</label>
                <select
                  name="violationType"
                  value={formData.violationType}
                  onChange={handleChange}
                  className="w-full py-2 border-b border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium bg-transparent cursor-pointer"
                  required
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
                <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Số tiền phạt (VND)</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full pr-12 py-2 border-b border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium placeholder-gray-300 bg-transparent"
                    required
                  />
                  <span className="absolute right-0 text-gray-400 font-semibold text-xs">VND</span>
                </div>
              </div>
            </div>

            <div className="w-1/2 pr-3">
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Ngày lập phiếu</label>
              <div className="relative">
                <CalendarIcon size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-8 py-2 border-b border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Ghi chú / Mô tả chi tiết</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Nhập chi tiết về tình trạng sách hoặc lý do phạt..."
                rows={3}
                className="w-full py-2 border-b border-gray-200 focus:border-[#0056b3] focus:outline-none transition-colors text-sm font-medium resize-none placeholder-gray-300 bg-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-sm"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
