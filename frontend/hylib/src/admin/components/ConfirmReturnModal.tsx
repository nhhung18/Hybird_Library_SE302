import React, { useEffect, useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface ConfirmReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmReturnModal({ isOpen, onClose, onConfirm }: ConfirmReturnModalProps) {
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
      <div className={`bg-white rounded-3xl w-[400px] p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col items-center text-center`}>
        {/* Help Icon Container */}
        <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-inner mb-6 mt-4">
          <HelpCircle className="text-[#0066cc]" size={28} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Người đã trả sách chưa?</h3>
        
        <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-8 max-w-[280px]">
          Hành động này sẽ cập nhật trạng thái yêu cầu thành "Đã trả" và ghi nhận vào hệ thống.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <button 
            type="button"
            onClick={onClose} 
            className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-3.5 rounded-full font-bold transition-all text-xs active:scale-95"
          >
            Hủy
          </button>
          <button 
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 bg-[#0066cc] hover:bg-blue-700 text-white py-3.5 rounded-full font-bold shadow-md shadow-[#0066cc]/20 transition-all text-xs active:scale-95"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
