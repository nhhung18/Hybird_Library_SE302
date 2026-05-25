import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: any) => void;
}

export default function CreateInvoiceModal({ isOpen, onClose, onSave }: CreateInvoiceModalProps) {
  const [userName, setUserName] = useState('');
  const [feeType, setFeeType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản');
  const [note, setNote] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

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
    
    // reset
    setUserName('');
    setFeeType('');
    setAmount('');
    setPaymentMethod('Chuyển khoản');
    setNote('');
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
      <div className={`bg-white rounded-3xl w-[450px] p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tạo hóa đơn mới</h2>
        <p className="text-sm text-gray-500 mb-6">Nhập thông tin chi tiết để tạo hóa đơn thanh toán.</p>

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Tên người dùng</label>
            <input 
              type="text" 
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Nhập tên người dùng..."
              className="w-full bg-white border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 animate-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Loại phí</label>
            <select 
              value={feeType}
              onChange={e => setFeeType(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-blue-500 transition-colors bg-transparent cursor-pointer"
            >
              <option value="">Chọn loại phí</option>
              <option value="Phí trễ hạn">Phí trễ hạn</option>
              <option value="Phí thẻ VIP">Phí thẻ VIP</option>
              <option value="Phí làm lại thẻ">Phí làm lại thẻ</option>
              <option value="Phí in ấn tài liệu">Phí in ấn tài liệu</option>
              <option value="Mượn sách">Mượn sách</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Số tiền</label>
            <div className="flex items-center border-b border-gray-200 py-2">
              <span className="text-gray-400 mr-2 font-semibold">đ</span>
              <input 
                type="number" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-3 uppercase">Phương thức thanh toán</label>
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
                <span className="text-sm font-semibold text-gray-700">Tiền mặt</span>
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
                <span className="text-sm font-semibold text-gray-700">Chuyển khoản</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Ghi chú</label>
            <textarea 
              rows={3} 
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Nhập chi tiết về khoản phí này..."
              className="w-full bg-white border-b border-gray-200 py-2 text-gray-905 focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-gray-300"
            />
          </div>
        
          <div className="flex justify-end gap-3 pt-6 mt-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-bold text-sm rounded-full transition-colors shadow-sm"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
