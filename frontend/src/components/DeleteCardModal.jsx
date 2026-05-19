import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteCardModal({ isOpen, onClose, onDelete, card }) {
  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-2">
          <div className="flex items-center gap-3 text-red-600">
            <AlertTriangle size={24} />
            <h2 className="text-xl font-bold text-gray-900">Xác nhận xoá?</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-gray-600 text-sm">
            Bạn có chắc chắn muốn xoá thẻ <span className="font-bold text-gray-900">{card.id}</span> của <span className="font-bold text-gray-900">{card.ownerName}</span> không? Hành động này không thể hoàn tác.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 pt-2 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="px-5 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
