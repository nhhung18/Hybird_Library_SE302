import React, { useEffect, useState } from 'react';
import { X, FileText } from 'lucide-react';

interface FeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: any;
}

export default function FeeDetailsModal({ isOpen, onClose, fee }: FeeDetailsModalProps) {
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
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans p-4`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-full max-w-md shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0056b3]">
              <FileText size={18} />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900">Chi tiết biểu phí</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6 bg-white overflow-y-auto max-h-[60vh]">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Tên loại phí</label>
            <p className="font-bold text-gray-900 text-lg leading-tight">{fee?.name || ''}</p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Đơn giá</label>
            <p className="font-bold text-[#0056b3] text-xl">{fee?.price || ''}</p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Mô tả</label>
            <p className="text-sm font-semibold text-gray-700 leading-relaxed bg-gray-50/50 p-4 rounded-2xl border border-gray-100/60">{fee?.description || 'Không có mô tả chi tiết.'}</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-bold text-xs rounded-full transition-colors shadow-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
