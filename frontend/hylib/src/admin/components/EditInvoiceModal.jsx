import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditInvoiceModal({ isOpen, onClose, invoice, onSave }) {
  const [userName, setUserName] = useState('');
  const [feeType, setFeeType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (invoice) {
      setUserName(invoice.userName || '');
      setFeeType(invoice.feeType || '');
      setAmount(invoice.amount || '');
      setPaymentMethod(invoice.paymentMethod || 'Chuyển khoản');
      setStatus(invoice.status || 'Đã thanh toán');
    }
  }, [invoice]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-900">Chỉnh sửa Hóa đơn</h2>
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
              CUSTOMER NAME
            </label>
            <input 
              type="text" 
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              FEE TYPE
            </label>
            <input 
              type="text" 
              value={feeType}
              onChange={e => setFeeType(e.target.value)}
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                AMOUNT (VNĐ)
              </label>
              <input 
                type="text" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
                PAYMENT METHOD
              </label>
              <div className="relative">
                <select 
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-full appearance-none bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Chuyển khoản">Chuyển khoản</option>
                  <option value="Tiền mặt">Tiền mặt</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              STATUS
            </label>
            <div className="relative">
              <select 
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full appearance-none bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Đã thanh toán">Đã thanh toán</option>
                <option value="Chờ xử lý">Chờ xử lý</option>
                <option value="Đã quá hạn">Đã quá hạn</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 rounded-full transition-colors bg-white shadow-sm"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-[#0056b3] hover:bg-blue-700 text-white font-medium text-sm rounded-full transition-colors shadow-sm"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
