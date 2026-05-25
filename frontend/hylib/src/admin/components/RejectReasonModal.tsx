import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface RejectReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export default function RejectReasonModal({ isOpen, onClose, onConfirm }: RejectReasonModalProps) {
  const [reason, setReason] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setReason('');
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onConfirm(reason);
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
      <div className={`bg-white rounded-3xl w-[420px] p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col items-center text-center`}>
        {/* Warning Icon Container */}
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 shadow-inner mb-6 mt-4">
          <AlertCircle className="text-red-500" size={28} />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Lý do từ chối</h3>
        <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-6 max-w-[280px]">
          Vui lòng cung cấp lý do huỷ yêu cầu của bạn đọc vào hệ thống.
        </p>

        <form onSubmit={handleConfirm} className="w-full space-y-6 text-left">
          {/* Reason Textarea */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Nội dung từ chối</label>
            <textarea 
              placeholder="Ví dụ: Sách hiện tại không có sẵn tại thư viện..." 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-red-500 transition-all text-sm min-h-[70px] resize-none placeholder-gray-300" 
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-3.5 rounded-full font-bold transition-all text-xs active:scale-95 text-center"
            >
              Hủy
            </button>
            <button 
              type="submit"
              disabled={!reason.trim()}
              className={`flex-1 py-3.5 rounded-full font-bold transition-all text-xs active:scale-95 text-center text-white shadow-md ${
                reason.trim() 
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' 
                  : 'bg-red-300 cursor-not-allowed'
              }`}
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
