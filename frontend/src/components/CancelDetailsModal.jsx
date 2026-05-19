import React from 'react';
import { X, FileText, User, BookOpen, Calendar, Info } from 'lucide-react';

export default function CancelDetailsModal({ isOpen, onClose, request }) {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Chi tiết huỷ mượn sách</h2>
              <p className="text-sm text-gray-500 font-medium">{request.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <User size={14} />
                Người mượn
              </label>
              <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                {request.user}
              </p>
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Calendar size={14} />
                Ngày huỷ
              </label>
              <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-100">
                {request.date}
              </p>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <BookOpen size={14} />
              Sách yêu cầu
            </label>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-sm font-medium text-gray-900 leading-relaxed">
                {request.book}
              </p>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <Info size={14} />
              Trạng thái & Ghi chú
            </label>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex items-start gap-3">
              <div className="mt-0.5">
                 <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                   Đã huỷ
                 </span>
              </div>
              <div>
                 <p className="text-sm font-medium text-gray-900">Yêu cầu đã bị từ chối/huỷ bỏ</p>
                 <p className="text-sm text-gray-600 mt-1">
                   Lý do: {request.reason || 'Không có lý do cụ thể.'}
                 </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
