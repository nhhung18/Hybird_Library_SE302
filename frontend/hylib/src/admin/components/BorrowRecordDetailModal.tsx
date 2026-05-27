import React, { useEffect, useState } from 'react';
import { BorrowRecord, BookType, ReceiveMethod } from '../../types';
import { X } from 'lucide-react';

interface BorrowRecordDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: BorrowRecord | null;
}

export default function BorrowRecordDetailModal({ isOpen, onClose, record }: BorrowRecordDetailModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans p-4`}>
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      <div className={`bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden max-h-[90vh]`}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Chi tiết đơn mượn</h2>
        <p className="text-sm text-gray-500 mb-6 font-medium">Mã đơn: <span className="font-bold text-gray-700">#{record?.id || 'N/A'}</span></p>

        {record ? (
          <div className="space-y-5 overflow-y-auto custom-scrollbar pr-2 pb-2">
            
            {/* Độc giả & Sách */}
            <div className="bg-gray-50 p-4 rounded-2xl space-y-4 border border-gray-100">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Độc giả</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                    {record.user?.userName ? record.user.userName.substring(0, 2).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{record.user?.fullName || record.user?.userName || 'N/A'}</p>
                    <p className="text-xs text-gray-500">{record.user?.email || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Sách</p>
                <p className="font-bold text-gray-900 text-sm">{record.book?.title || 'N/A'}</p>
                <p className="text-xs text-gray-500 mt-1">Tác giả: {record.book?.author || 'N/A'}</p>
              </div>
            </div>

            {/* Thời gian */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Ngày mượn</p>
                <p className="font-bold text-gray-900 text-sm">{formatDateTime(record.borrowDate)}</p>
              </div>
              <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Ngày hết hạn</p>
                <p className="font-bold text-red-600 text-sm">{formatDateTime(record.dueDate)}</p>
              </div>
            </div>

            {/* Thông tin khác */}
            <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Trạng thái mượn</p>
                <span className="font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs">
                  {record.borrowStatus === 'BORROWING' ? 'Đang mượn' : 
                   record.borrowStatus === 'RETURNED' ? 'Đã trả' : 
                   record.borrowStatus === 'AUTO_RETURNED' ? 'Tự động trả' : 
                   record.borrowStatus === 'REQUESTING' ? 'Đang yêu cầu' : record.borrowStatus}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Trạng thái phê duyệt</p>
                <span className={`font-medium px-2.5 py-1 rounded-md text-xs ${
                  record.approvalStatus === 'APPROVED' ? 'bg-green-50 text-green-700' :
                  record.approvalStatus === 'REJECTED' ? 'bg-red-50 text-red-700' :
                  'bg-yellow-50 text-yellow-700'
                }`}>
                  {record.approvalStatus === 'APPROVED' ? 'Đã duyệt' : 
                   record.approvalStatus === 'REJECTED' ? 'Từ chối' : 'Chờ duyệt'}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Loại sách</p>
                <p className="font-bold text-gray-900 text-sm">
                  {record.bookType === BookType.EBOOK ? 'Ebook' : 'Sách giấy'}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Cách nhận sách</p>
                <p className="font-bold text-gray-900 text-sm">
                  {record.receiveMethod === ReceiveMethod.EBOOK ? 'Ebook' : 
                   record.receiveMethod === ReceiveMethod.HOME_PICKUP ? 'Giao hàng' : 'Tại thư viện'}
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Gia hạn</p>
                <p className="font-bold text-gray-900 text-sm">{record.renew || 0} lần</p>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex justify-center items-center py-10">
            <p className="text-gray-500 font-medium">Không có thông tin</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-bold text-gray-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
