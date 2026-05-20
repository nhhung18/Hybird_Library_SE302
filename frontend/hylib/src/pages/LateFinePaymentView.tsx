import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronDown, CreditCard, HelpCircle } from 'lucide-react';

interface LateFinePaymentViewProps {
  onBack: () => void;
  onConfirm: (paymentMethod: string, amount: string, returnMethod: string) => void;
}

const LateFinePaymentView = ({ onBack, onConfirm }: LateFinePaymentViewProps) => {
  const [paymentMethod, setPaymentMethod] = useState('Thanh toán qua ngân hàng');
  const [returnMethod, setReturnMethod] = useState('Trả tại thư viện');
  const [showPaymentMenu, setShowPaymentMenu] = useState(false);
  const [showReturnMenu, setShowReturnMenu] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-7xl mx-auto px-10 py-12">
      <div className="flex items-center space-x-6 mb-12">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
          <ArrowLeft size={28} className="text-gray-900" />
        </button>
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Nộp phạt trễ hạn</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Thông tin trả sách</h2>
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80" alt="Book" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Thiền OSHO</h3>
                  <p className="text-gray-500 font-medium">Trễ trả 2 ngày</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Số tiền phạt</p>
                  <p className="text-2xl font-bold text-red-500">10.000 VNĐ</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Phí ship (nếu có)</p>
                  <p className="text-2xl font-bold text-gray-900">30.000 VNĐ</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Hình thức trả sách</h2>
            <div className="relative">
              <button 
                onClick={() => setShowReturnMenu(!showReturnMenu)}
                className="w-full bg-[#f0f4f9] rounded-2xl px-8 py-5 font-bold text-gray-900 text-lg flex items-center justify-between"
              >
                <span>{returnMethod}</span>
                <ChevronDown size={24} className={`transition-transform ${showReturnMenu ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showReturnMenu && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20">
                    {['Trả tại thư viện', 'ĐVVC qua lấy (Trong Hà Nội)'].map((method) => (
                      <button key={method} onClick={() => { setReturnMethod(method); setShowReturnMenu(false); }} className={`w-full text-left px-8 py-5 text-lg font-bold hover:bg-gray-50 ${returnMethod === method ? 'text-[#0066cc]' : 'text-gray-600'}`}>
                        {method}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#1a1c20] text-white rounded-[2.5rem] p-10 shadow-xl">
            <h2 className="text-2xl font-bold mb-8">Tổng cộng</h2>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center text-gray-400 font-medium"><span>Số tiền phạt</span><span className="text-white font-bold">10.000 VNĐ</span></div>
              <div className="flex justify-between items-center text-gray-400 font-medium"><span>Phí vận chuyển</span><span className="text-white font-bold">{returnMethod === 'Trả tại thư viện' ? '0 VNĐ' : '30.000 VNĐ'}</span></div>
              <div className="h-[1px] bg-white/10" />
              <div className="flex justify-between items-center"><span className="text-xl font-bold">Thanh toán</span><span className="text-3xl font-bold text-[#0066cc]">{returnMethod === 'Trả tại thư viện' ? '10.000 VNĐ' : '40.000 VNĐ'}</span></div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">PHƯƠNG THỨC THANH TOÁN</p>
                <button 
                  onClick={() => setShowPaymentMenu(!showPaymentMenu)}
                  className="w-full bg-white/5 rounded-2xl px-6 py-4 font-bold text-white text-sm flex items-center justify-between border border-white/10"
                >
                  <span>{paymentMethod}</span>
                  <ChevronDown size={18} />
                </button>
                <AnimatePresence>
                  {showPaymentMenu && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 right-0 bottom-full mb-2 bg-[#25282c] rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-20">
                      {['Thanh toán qua ngân hàng', 'Thanh toán tiền mặt'].map((method) => (
                        <button key={method} onClick={() => { setPaymentMethod(method); setShowPaymentMenu(false); }} className="w-full text-left px-6 py-4 text-sm font-bold hover:bg-white/5 text-gray-300">
                          {method}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => onConfirm(paymentMethod, returnMethod === 'Trả tại thư viện' ? '10.000 VNĐ' : '40.000 VNĐ', returnMethod)}
                className="w-full bg-[#0066cc] text-white py-5 rounded-[2rem] font-bold shadow-xl shadow-blue-900/20 hover:bg-blue-600 active:scale-95 transition-all text-lg"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-[2rem] p-8 border border-blue-100 flex items-start space-x-4">
            <HelpCircle className="text-[#0066cc] shrink-0 mt-0.5" size={20} />
            <p className="text-sm font-medium text-gray-600 leading-relaxed">Nếu quá hạn 7 ngày không trả, tài khoản sẽ bị tạm khóa cho đến khi hoàn thành nghĩa vụ. Vui lòng thanh toán đúng hạn.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LateFinePaymentView;
