import React, { useEffect, useState } from 'react';
import { X, Tag } from 'lucide-react';

interface CreateFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fee: any) => void;
}

export default function CreateFeeModal({ isOpen, onClose, onSave }: CreateFeeModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleSave = () => {
    if (!name || !price) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    
    const newFee = {
      id: Date.now(),
      name,
      price: price + ' VNĐ',
      description,
      icon: <Tag size={18} className="text-[#0056b3]" />
    };
    
    onSave(newFee);
    
    // reset
    setName('');
    setPrice('');
    setDescription('');
    setIsActive(true);
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
      <div className={`bg-white rounded-3xl w-[450px] p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thêm biểu phí mới</h2>
        <p className="text-sm text-gray-500 mb-6">Nhập thông tin chi tiết để tạo loại biểu phí mới.</p>

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Tên loại phí</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nhập tên loại phí"
              className="w-full bg-white border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Đơn giá</label>
            <div className="flex items-center border-b border-gray-200 py-2">
              <input 
                type="number" 
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent focus:outline-none text-gray-900 text-right pr-2 placeholder:text-gray-300"
              />
              <span className="text-gray-500 font-semibold text-sm">VNĐ</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Mô tả</label>
            <textarea 
              rows={3} 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Nhập mô tả chi tiết về loại phí..."
              className="w-full bg-white border-b border-gray-200 py-2 text-gray-950 focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-gray-300"
            />
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-1">TRẠNG THÁI ÁP DỤNG</p>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Kích hoạt để áp dụng biểu phí này ngay lập tức.</p>
            </div>
            <button 
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative focus:outline-none shrink-0 ${isActive ? 'bg-[#0056b3]' : 'bg-gray-200'}`}
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'}`} 
              />
            </button>
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
              className="px-6 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-bold text-sm rounded-full transition-colors shadow-sm"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
