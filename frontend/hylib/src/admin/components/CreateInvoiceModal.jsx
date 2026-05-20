import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CreateInvoiceModal({ isOpen, onClose, onSave }) {
  const [userName, setUserName] = useState('');
  const [feeType, setFeeType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!userName || !feeType || !amount) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    
    const newInvoice = {
      invoiceCode: 'INV-' + Math.floor(1000 + Math.random() * 9000),
      userName,
      feeType,
      amount: parseInt(amount, 10),
      paymentMethod,
      status: 'Chờ xử lý',
      note
    };
    
    onSave(newInvoice);
    onClose();
    
    // reset
    setUserName('');
    setFeeType('');
    setAmount('');
    setPaymentMethod('Chuyển khoản');
    setNote('');
  };

  return (
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-900">Tạo hóa đơn mới</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 bg-white">
          
          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              Tên người dùng
            </label>
            <input 
              type="text" 
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Nhập tên người dùng..."
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              Loại phí
            </label>
            <div className="relative">
              <select 
                value={feeType}
                onChange={e => setFeeType(e.target.value)}
                className="w-full appearance-none bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Chọn loại phí</option>
                <option value="Phí trễ hạn">Phí trễ hạn</option>
                <option value="Phí thẻ VIP">Phí thẻ VIP</option>
                <option value="Phí làm lại thẻ">Phí làm lại thẻ</option>
                <option value="Phí in ấn tài liệu">Phí in ấn tài liệu</option>
                <option value="Mượn sách">Mượn sách</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              Số tiền
            </label>
            <div className="flex items-center border-b border-gray-200 py-2">
              <span className="text-gray-500 mr-2">đ</span>
              <input 
                type="number" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent focus:outline-none text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-3">
              Phương thức thanh toán
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment_method" 
                  value="Tiền mặt"
                  checked={paymentMethod === 'Tiền mặt'}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-[#0056b3] border-gray-300 focus:ring-[#0056b3]" 
                />
                <span className="text-gray-900">Tiền mặt</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="payment_method" 
                  value="Chuyển khoản"
                  checked={paymentMethod === 'Chuyển khoản'}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-[#0056b3] border-gray-300 focus:ring-[#0056b3]" 
                />
                <span className="text-gray-900">Chuyển khoản</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
              Ghi chú
            </label>
            <textarea 
              rows="3" 
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Nhập chi tiết về khoản phí này..."
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            ></textarea>
          </div>

        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-[#0056b3] font-medium text-sm hover:bg-blue-50 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-medium text-sm rounded-full transition-colors shadow-sm"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
