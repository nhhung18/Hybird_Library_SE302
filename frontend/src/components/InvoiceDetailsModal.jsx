import React from 'react';
import { X, FileText, Banknote } from 'lucide-react';

export default function InvoiceDetailsModal({ isOpen, onClose, invoice }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <FileText className="text-[#0056b3]" size={20} />
            <h2 className="text-xl font-bold text-gray-900">Invoice Details</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto bg-white flex-1">
          
          {/* Invoice Number & Status */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-1">INVOICE NUMBER</p>
              <h3 className="text-3xl font-bold text-gray-900">{invoice?.invoiceCode || 'INV-2023-001'}</h3>
            </div>
            <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium ${invoice?.status === 'Đã thanh toán' ? 'bg-blue-50 text-[#0056b3]' : 'bg-gray-100 text-gray-700'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${invoice?.status === 'Đã thanh toán' ? 'bg-[#0056b3]' : 'bg-gray-400'}`}></span>
              {invoice?.status || 'Đã thanh toán'}
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
              <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-3">CUSTOMER</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0056b3] text-white flex items-center justify-center text-xs font-bold">
                  {invoice?.userName ? invoice.userName.split(' ').map(n => n[0]).join('').slice(0, 3) : 'NVA'}
                </div>
                <span className="font-bold text-gray-900">{invoice?.userName || 'Nguyễn Văn A'}</span>
              </div>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
              <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-3">DATE</p>
              <p className="font-medium text-gray-900">Oct 24, 2023</p>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
              <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-3">FEE TYPE</p>
              <p className="font-medium text-gray-900">{invoice?.feeType || 'Mượn sách'}</p>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100">
              <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-3">PAYMENT METHOD</p>
              <div className="flex items-center gap-2 font-medium text-gray-900">
                <Banknote size={16} className="text-gray-500" />
                {invoice?.paymentMethod || 'Tiền mặt'}
              </div>
            </div>
          </div>

          {/* Item Breakdown */}
          <div>
            <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-4">ITEM BREAKDOWN</p>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex justify-between items-center bg-gray-50/80 px-5 py-3 border-b border-gray-200">
                <span className="text-sm font-bold text-gray-600">Description</span>
                <span className="text-sm font-bold text-gray-600">Amount</span>
              </div>
              
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                  <p className="font-medium text-gray-900">The Great Gatsby</p>
                  <p className="text-sm text-gray-500 mt-1">Borrow Fee (7 Days)</p>
                </div>
                <p className="font-medium text-gray-900">25,000 VNĐ</p>
              </div>

              <div className="px-5 py-4 flex justify-between items-center bg-white">
                <div>
                  <p className="font-medium text-gray-900">1984</p>
                  <p className="text-sm text-gray-500 mt-1">Borrow Fee (7 Days)</p>
                </div>
                <p className="font-medium text-gray-900">25,000 VNĐ</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Section */}
        <div className="px-8 py-5 bg-[#f3f4f6] flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">Total</span>
          <span className="text-3xl font-bold text-[#0056b3]">
            {invoice?.amount ? `${invoice.amount.toLocaleString()} VNĐ` : '50,000 VNĐ'}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-end gap-4">
          <button 
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 rounded-full transition-colors bg-white shadow-sm"
          >
            Download PDF
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-medium text-sm rounded-full transition-colors shadow-sm"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
