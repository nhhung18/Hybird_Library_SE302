import React, { useEffect, useState } from 'react';
import { X, FileText, User, BookOpen, Calendar, Info } from 'lucide-react';

interface CancelDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
}

export default function CancelDetailsModal({ isOpen, onClose, request }: CancelDetailsModalProps) {
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
      <div className={`bg-white rounded-3xl w-full max-w-lg shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500">
              <FileText size={18} />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-gray-900">Chi tiết huỷ mượn sách</h2>
              <p className="text-xs text-gray-400 font-semibold">{request?.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">
                <User size={13} className="text-gray-400" />
                Người mượn
              </label>
              <p className="text-sm font-semibold text-gray-800 bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100">
                {request?.user}
              </p>
            </div>
            <div>
              <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">
                <Calendar size={13} className="text-gray-400" />
                Ngày huỷ
              </label>
              <p className="text-sm font-semibold text-gray-800 bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100">
                {request?.date}
              </p>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">
              <BookOpen size={13} className="text-gray-400" />
              Sách yêu cầu
            </label>
            <p className="text-sm font-semibold text-gray-800 bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100">
              {request?.book}
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">
              <Info size={13} className="text-gray-400" />
              Trạng thái & Ghi chú
            </label>
            <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100/60 flex items-start gap-3">
              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-red-100/70 text-red-600 text-[10px] font-bold uppercase tracking-wider">
                Đã huỷ
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-800 leading-tight">Yêu cầu bị từ chối hoặc hủy bỏ</p>
                <p className="text-xs text-red-600 font-semibold mt-1">
                  Lý do: {request?.reason || 'Không có lý do cụ thể.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors shadow-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
