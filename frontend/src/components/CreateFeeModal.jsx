import React, { useState } from 'react';
import { X, Tag } from 'lucide-react';

export default function CreateFeeModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  if (!isOpen) return null;

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
    onClose();
    
    // reset
    setName('');
    setPrice('');
    setDescription('');
    setIsActive(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-900">Thêm biểu phí mới</h2>
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
              placeholder="Nhập tên loại phí"
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              ĐƠN GIÁ
            </label>
            <div className="flex items-center border-b border-gray-200 py-2">
              <input 
                type="number" 
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent focus:outline-none text-gray-900 text-right pr-2 placeholder:text-gray-400"
              />
              <span className="text-gray-500 font-medium">VNĐ</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              MÔ TẢ
            </label>
            <textarea 
              rows="3" 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Nhập mô tả chi tiết về loại phí..."
              className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-gray-400"
            ></textarea>
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="font-bold text-gray-900">Trạng thái áp dụng</p>
              <p className="text-sm text-gray-500 mt-1">Kích hoạt để áp dụng biểu phí này ngay lập tức.</p>
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

        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 font-medium text-sm hover:bg-gray-100 rounded-full transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-medium text-sm rounded-full transition-colors shadow-sm"
          >
            Thêm mới
          </button>
        </div>
      </div>
    </div>
  );
}
