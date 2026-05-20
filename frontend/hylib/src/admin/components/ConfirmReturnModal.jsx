import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function ConfirmReturnModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 ">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <HelpCircle size={32} className="text-[#0056b3]" />
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">Người đã trả sách chưa?</h2>
          <p className="text-sm text-gray-500">
            Hành động này sẽ cập nhật trạng thái yêu cầu thành "Đã trả" và ghi nhận vào hệ thống.
          </p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50/50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#0056b3] rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
