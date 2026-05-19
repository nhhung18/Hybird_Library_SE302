import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="text-red-600" size={20} />
          </div>
          <div className="flex-1 mt-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title || 'Xác nhận xóa?'}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {message || 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa mục này không?'}
            </p>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 text-gray-700 font-medium text-sm hover:bg-white rounded-full transition-colors shadow-sm"
          >
            Hủy
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-full transition-colors shadow-sm"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
