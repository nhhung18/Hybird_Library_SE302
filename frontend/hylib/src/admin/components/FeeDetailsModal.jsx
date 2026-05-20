import React from 'react';
import { X, FileText } from 'lucide-react';

export default function FeeDetailsModal({ isOpen, onClose, fee }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <FileText className="text-[#0056b3]" size={20} />
            <h2 className="text-xl font-bold text-gray-900">Chi tiết biểu phí</h2>
          </div>
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
            <p className="font-bold text-gray-900 text-lg">{fee?.name || ''}</p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              ĐƠN GIÁ
            </label>
            <p className="font-bold text-[#0056b3] text-xl">{fee?.price || ''}</p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              MÔ TẢ
            </label>
            <p className="text-gray-700 leading-relaxed">{fee?.description || ''}</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#0056b3] hover:bg-blue-700 text-white font-medium text-sm rounded-full transition-colors shadow-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
