import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ExtendCardModal({ isOpen, onClose, onExtend, card }) {
  const [extendOption, setExtendOption] = useState('+1 tháng');

  if (!isOpen || !card) return null;

  const getPrice = () => {
    switch(extendOption) {
      case '+1 tháng': return '50.000 VNĐ';
      case '+6 tháng': return '250.000 VNĐ';
      case '+1 năm': return '450.000 VNĐ';
      default: return '0 VNĐ';
    }
  };

  const handleConfirm = () => {
    // Parse the current date and add time based on extendOption
    // Basic date parsing assuming dd/mm/yyyy
    const parts = card.expiryDate.split('/');
    let date = new Date(parts[2], parts[1] - 1, parts[0]);
    
    if (extendOption === '+1 tháng') {
      date.setMonth(date.getMonth() + 1);
    } else if (extendOption === '+6 tháng') {
      date.setMonth(date.getMonth() + 6);
    } else if (extendOption === '+1 năm') {
      date.setFullYear(date.getFullYear() + 1);
    }

    const newDateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    
    onExtend(card.id, newDateStr);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 ">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">MEMBERSHIP RENEWAL</p>
            <h2 className="text-2xl font-bold text-gray-900">Gia hạn thẻ {card.id}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex justify-between items-center">
            <span className="text-gray-600 text-lg">Ngày hết hạn hiện tại</span>
            <span className="text-red-600 font-bold text-xl">{card.expiryDate}</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">THỜI GIAN GIA HẠN</label>
            <div className="flex gap-3">
              {['+1 tháng', '+6 tháng', '+1 năm'].map((option) => (
                <button
                  key={option}
                  onClick={() => setExtendOption(option)}
                  className={`flex-1 py-3 px-2 rounded-full font-bold text-sm transition-all border ${
                    extendOption === option 
                      ? 'bg-[#e6f0fa] border-[#0056b3] text-[#0056b3]' 
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-end border-b border-gray-200 pb-3 pt-4">
            <span className="text-gray-600 text-lg">Số tiền tương ứng</span>
            <span className="text-[#0056b3] font-bold text-3xl">{getPrice()}</span>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 pt-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-8 py-2.5 text-sm font-bold text-white bg-[#0056b3] rounded-full hover:bg-blue-700 transition-colors shadow-md"
          >
            Xác nhận gia hạn
          </button>
        </div>
      </div>
    </div>
  );
}
