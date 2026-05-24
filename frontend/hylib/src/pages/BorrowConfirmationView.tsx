import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface BorrowConfirmationViewProps {
  onBack: () => void;
  onConfirm: (paymentMethod: string, amount: string) => void;
  borrowMode: 'ebook' | 'offline';
}

const BorrowConfirmationView = ({ onBack, onConfirm, borrowMode }: BorrowConfirmationViewProps) => {
  const [paymentMethod, setPaymentMethod] = useState('Thanh toán qua ngân hàng');
  const [showPaymentMenu, setShowPaymentMenu] = useState(false);
  const [showDeliveryMenu, setShowDeliveryMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: 'Nguyễn Huy Hùng',
    phone: '090 123 4567',
    email: 'nguyenhung18042005@gmail.com',
    address: 'Kim Giang, Hoàng Mai, Hà Nội'
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'library' | 'shipping'>('library');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-none px-4 md:px-12 lg:px-16 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Xác nhận mượn</h1>
      <div className="space-y-8">
        <div className="glass-panel rounded-[2.5rem] p-10">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Địa chỉ chi tiết</label>
          <div className="bg-white/50 border border-white/60 backdrop-blur-md rounded-2xl px-6 py-4 font-bold text-gray-700 shadow-sm">{userInfo.address}</div>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tóm tắt đơn hàng</h2>
          <div className="flex items-start gap-6 border-b border-gray-50 pb-8 mb-8">
            <div className="w-24 h-32 rounded-xl overflow-hidden bg-gray-100 shadow-md"><img src="https://picsum.photos/seed/stillness/200/300" alt="Book" className="w-full h-full object-cover" /></div>
            <div><h3 className="text-xl font-bold text-gray-900">The Art of Stillness</h3><p className="text-gray-400 font-bold text-sm">Pico Iyer</p></div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center"><span className="text-gray-500 font-medium text-lg">Hình thức</span><span className="text-gray-900 font-bold text-lg">{borrowMode === 'offline' ? 'Offline - Đến thư viện lấy sách' : 'Ebook - Đọc trực tuyến'}</span></div>
            
            {borrowMode === 'offline' && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium text-lg">Hình thức nhận sách</span>
                <div className="relative z-30">
                  <button 
                    type="button"
                    onClick={() => setShowDeliveryMenu(!showDeliveryMenu)} 
                    className="bg-white/50 border border-white/60 backdrop-blur-md rounded-2xl px-6 py-3 font-bold text-gray-900 text-sm flex items-center space-x-3 hover:bg-white/80 transition-all shadow-sm"
                  >
                    <span>{deliveryMethod === 'library' ? 'Tại thư viện' : 'Qua đơn vị vận chuyển'}</span>
                    <ChevronDown size={18} className={`transition-transform ${showDeliveryMenu ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {showDeliveryMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="absolute right-0 top-full mt-3 w-64 glass-panel rounded-2xl shadow-xl overflow-hidden z-20"
                      >
                        {[
                          { key: 'library', label: 'Tại thư viện' },
                          { key: 'shipping', label: 'Qua đơn vị vận chuyển' }
                        ].map((item) => (
                          <button 
                            key={item.key} 
                            type="button"
                            onClick={() => { setDeliveryMethod(item.key as 'library' | 'shipping'); setShowDeliveryMenu(false); }} 
                            className={`w-full text-left px-6 py-4 text-sm font-bold hover:bg-white/80 ${deliveryMethod === item.key ? 'text-[#1e3b2b]' : 'text-gray-600'}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center"><span className="text-gray-500 font-medium text-lg">Số tiền</span><span className="text-green-600 font-bold text-lg">Miễn phí</span></div>
            
            {borrowMode === 'offline' && deliveryMethod === 'shipping' && (
              <div className="flex justify-between items-center"><span className="text-gray-500 font-medium text-lg">Phí vận chuyển</span><span className="text-gray-900 font-bold text-lg">15.000 VNĐ</span></div>
            )}

            <div className="flex justify-between items-center"><span className="text-gray-500 font-medium text-lg">Phương thức thanh toán</span>
            <div className="relative z-20">
                <button type="button" onClick={() => setShowPaymentMenu(!showPaymentMenu)} className="bg-white/50 border border-white/60 backdrop-blur-md rounded-2xl px-6 py-3 font-bold text-gray-900 text-sm flex items-center space-x-3 hover:bg-white/80 transition-all shadow-sm">
                  <span>{paymentMethod}</span><ChevronDown size={18} className={`transition-transform ${showPaymentMenu ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showPaymentMenu && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 bottom-full mb-3 w-64 glass-panel rounded-2xl shadow-xl overflow-hidden z-20">
                      {['Thanh toán qua ngân hàng', 'Thanh toán tiền mặt'].map((method) => (
                        <button key={method} type="button" onClick={() => { setPaymentMethod(method); setShowPaymentMenu(false); }} className={`w-full text-left px-6 py-4 text-sm font-bold hover:bg-white/80 ${paymentMethod === method ? 'text-[#1e3b2b]' : 'text-gray-600'}`}>{method}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
          <div className="flex items-baseline gap-6"><span className="text-3xl font-bold text-gray-900">Tổng cộng</span><span className="text-4xl font-bold text-[#1e3b2b]">{borrowMode === 'offline' && deliveryMethod === 'shipping' ? '15.000 VNĐ' : 'Miễn phí'}</span></div>
          <div className="flex items-center gap-6 w-full md:w-auto">
            <button onClick={onBack} className="flex-1 md:flex-none px-12 py-5 font-bold text-gray-400 hover:text-gray-900 text-lg">Hủy</button>
            <button 
              type="button"
              onClick={() => {
                const amount = borrowMode === 'offline' && deliveryMethod === 'shipping' ? '15.000 VNĐ' : 'Miễn phí';
                onConfirm(paymentMethod, amount);
              }} 
              className="flex-1 md:flex-none bg-[#1e3b2b] text-white px-16 py-5 rounded-full font-bold shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-xl transition-all"
            >
              Xác nhận mượn
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BorrowConfirmationView;
