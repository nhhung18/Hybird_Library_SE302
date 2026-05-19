import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

export default function RejectReasonModal({ isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(reason);
    setReason(''); // Reset for next time
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-red-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Lý do từ chối</h2>
              <p className="text-sm text-gray-500 font-medium">Vui lòng cung cấp lý do huỷ yêu cầu</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Nội dung từ chối
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ví dụ: Sách hiện tại không có sẵn tại thư viện..."
            className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all text-gray-700 min-h-[120px] resize-none"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-colors shadow-sm ${reason.trim() ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
          >
            Xác nhận
          </button>
        </div>

      </div>
    </div>
  );
}
