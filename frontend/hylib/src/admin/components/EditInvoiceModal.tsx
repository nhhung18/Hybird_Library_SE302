import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
  onSave: (invoice: any) => void;
}

export default function EditInvoiceModal({ isOpen, onClose, invoice, onSave }: EditInvoiceModalProps) {
  const [userName, setUserName] = useState('');
  const [feeType, setFeeType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [status, setStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (invoice) {
      setUserName(invoice.userName || '');
      setFeeType(invoice.feeType || '');
      setAmount(invoice.amount || '');
      setPaymentMethod(invoice.paymentMethod || 'Chuyển khoản');
      setStatus(invoice.status || 'Đã thanh toán');
    }
  }, [invoice]);

  if (!isOpen && !isVisible) return null;

  const handleSave = () => {
    const updatedInvoice = {
      ...invoice,
      userName,
      feeType,
      amount: typeof amount === 'string' ? parseInt(amount.replace(/,/g, ''), 10) : amount,
      paymentMethod,
      status
    };
    onSave(updatedInvoice);
    onClose();
  };

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
          <h2 className="text-[20px] font-bold text-gray-900">Chỉnh sửa hóa đơn</h2>
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
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Tên người dùng</label>
            <input 
              type="text" 
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full bg-white border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Loại phí</label>
            <input 
              type="text" 
              value={feeType}
              onChange={e => setFeeType(e.target.value)}
              className="w-full bg-white border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Số tiền (VNĐ)</label>
              <input 
                type="text" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full bg-white border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Phương thức</label>
              <select 
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-blue-500 transition-colors bg-transparent cursor-pointer"
              >
                <option value="Chuyển khoản">Chuyển khoản</option>
                <option value="Tiền mặt">Tiền mặt</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase mb-2">Trạng thái</label>
            <select 
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-blue-500 transition-colors bg-transparent cursor-pointer"
            >
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đã quá hạn">Đã quá hạn</option>
            </select>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 font-bold text-xs hover:bg-gray-50 rounded-full border border-gray-200 transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-bold text-xs rounded-full transition-colors shadow-sm"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
