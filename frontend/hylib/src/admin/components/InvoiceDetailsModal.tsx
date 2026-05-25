import React, { useEffect, useState } from 'react';
import { X, FileText, Banknote } from 'lucide-react';

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
}

export default function InvoiceDetailsModal({ isOpen, onClose, invoice }: InvoiceDetailsModalProps) {
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
      <div className={`bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0056b3]">
              <FileText size={18} />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900">Chi tiết hóa đơn</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto bg-white flex-1 max-h-[50vh] space-y-6">
          {/* Invoice Number & Status */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">Mã hóa đơn</p>
              <h3 className="text-2xl font-bold text-gray-900">{invoice?.invoiceCode || 'INV-2023-001'}</h3>
            </div>
            <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold ${invoice?.status === 'Đã thanh toán' ? 'bg-blue-50 text-[#0056b3] border border-blue-100' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${invoice?.status === 'Đã thanh toán' ? 'bg-[#0056b3]' : 'bg-gray-400'}`}></span>
              {invoice?.status || 'Đã thanh toán'}
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2 pl-1">Người dùng</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0056b3] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {invoice?.userName ? invoice.userName.split(' ').map((n: string) => n[0]).join('').slice(0, 3) : 'NVA'}
                </div>
                <span className="text-sm font-semibold text-gray-800">{invoice?.userName || 'Nguyễn Văn A'}</span>
              </div>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2 pl-1">Ngày lập</p>
              <p className="text-sm font-semibold text-gray-800 pt-1.5">Oct 24, 2023</p>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2 pl-1">Loại phí</p>
              <p className="text-sm font-semibold text-gray-800 pt-1.5">{invoice?.feeType || 'Mượn sách'}</p>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2 pl-1">Thanh toán</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 pt-1.5">
                <Banknote size={16} className="text-gray-400" />
                {invoice?.paymentMethod || 'Tiền mặt'}
              </div>
            </div>
          </div>

          {/* Item Breakdown */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3 pl-1">Chi tiết khoản phí</p>
            
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex justify-between items-center bg-gray-50/50 px-5 py-3 border-b border-gray-200">
                <span className="text-xs font-bold text-gray-500">Mô tả chi tiết</span>
                <span className="text-xs font-bold text-gray-500">Thành tiền</span>
              </div>
              
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                  <p className="text-sm font-semibold text-gray-800">The Great Gatsby</p>
                  <p className="text-xs text-gray-400 font-semibold mt-1">Phí mượn sách (7 ngày)</p>
                </div>
                <p className="text-sm font-semibold text-gray-800">25,000 VNĐ</p>
              </div>

              <div className="px-5 py-4 flex justify-between items-center bg-white">
                <div>
                  <p className="text-sm font-semibold text-gray-800">1984</p>
                  <p className="text-xs text-gray-400 font-semibold mt-1">Phí mượn sách (7 ngày)</p>
                </div>
                <p className="text-sm font-semibold text-gray-800">25,000 VNĐ</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Section */}
        <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-800">Tổng cộng</span>
          <span className="text-2xl font-bold text-[#0056b3]">
            {invoice?.amount ? `${invoice.amount.toLocaleString()} VNĐ` : '50,000 VNĐ'}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-200 text-gray-705 font-bold text-xs hover:bg-gray-50 rounded-full transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
