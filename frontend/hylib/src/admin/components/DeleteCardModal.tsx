import React, { useEffect, useState } from 'react';

interface DeleteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  card: any;
}

export default function DeleteCardModal({ isOpen, onClose, onDelete, card }: DeleteCardModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-[#eaeaea] rounded-[32px] w-[420px] p-9 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col`}>
        
        {/* Header/Title */}
        <h3 className="text-[20px] font-bold text-gray-900 mb-2 pl-1">
          Thông báo
        </h3>
        
        {/* Message */}
        <p className="text-sm font-semibold text-[#6e7781] leading-relaxed mb-6 pl-1">
          Bạn có chắc chắn muốn xoá thẻ <span className="font-bold text-gray-950">{card?.id}</span> của <span className="font-bold text-gray-950">{card?.ownerName}</span>? Hành động này không thể hoàn tác.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-6">
          <button 
            type="button"
            onClick={onClose} 
            className="text-[15px] font-bold text-[#5c646c] hover:text-gray-950 transition-colors px-2 py-2"
          >
            Hủy
          </button>
          <button 
            type="button"
            onClick={() => {
              if (card) onDelete(card.id);
              onClose();
            }}
            className="bg-[#ff3b30] hover:bg-[#e03126] text-white py-3 px-8 rounded-[20px] font-bold text-[15px] shadow-sm transition-all active:scale-95"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
