import React, { useEffect, useState } from 'react';

interface ExtendCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExtend: (id: string, newDateStr: string) => void;
  card: any;
}

export default function ExtendCardModal({ isOpen, onClose, onExtend, card }: ExtendCardModalProps) {
  const [extendOption, setExtendOption] = useState('+1 tháng');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const getPrice = () => {
    switch(extendOption) {
      case '+1 tháng': return '50.000 VNĐ';
      case '+6 tháng': return '250.000 VNĐ';
      case '+1 năm': return '450.000 VNĐ';
      default: return '0 VNĐ';
    }
  };

  const handleConfirm = () => {
    if (!card) return;
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
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-[450px] p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gia hạn thẻ</h2>
        <p className="text-sm text-gray-500 mb-6">Thực hiện gia hạn cho thẻ {card?.id}.</p>

        <div className="space-y-6">
          {/* Current Expiry Date */}
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Ngày hết hạn cũ</span>
            <span className="text-red-500 font-bold text-lg bg-red-50 border border-red-100 px-3 py-1 rounded-full">{card?.expiryDate}</span>
          </div>

          {/* Renewal options */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-3 uppercase">Thời gian gia hạn</label>
            <div className="flex gap-2">
              {['+1 tháng', '+6 tháng', '+1 năm'].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setExtendOption(option)}
                  className={`flex-1 py-3 px-1 rounded-full font-bold text-xs transition-all border ${
                    extendOption === option 
                      ? 'bg-[#e6f0fa] border-[#0066cc] text-[#0066cc]' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Price details */}
          <div className="flex justify-between items-end border-b border-gray-200 pb-3 pt-2">
            <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Lệ phí tương ứng</span>
            <span className="text-[#0066cc] font-extrabold text-2xl">{getPrice()}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 mt-4">
            <button 
              type="button"
              onClick={onClose} 
              className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-sm"
            >
              Gia hạn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
