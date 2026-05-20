import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CreditCard, HelpCircle } from 'lucide-react';

interface BankPaymentViewProps {
  onBack: () => void;
  onComplete: () => void;
  amount?: string;
}

const BankPaymentView = ({ onBack, onComplete, amount = "30.000 VNĐ" }: BankPaymentViewProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const numericAmount = amount.replace(/\D/g, '');
  const qrData = `330566888|VIB|DAO%20NHU%20BAO|HYBIRD_1608|${numericAmount}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-7xl mx-auto px-10 py-12">
      <div className="flex items-center space-x-6 mb-12">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
          <ArrowLeft size={28} className="text-gray-900" />
        </button>
        <h1 className="text-4xl font-bold text-gray-900">Thanh toán qua ngân hàng</h1>
      </div>

      <div className="bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thông tin thanh toán</h2>
          <div className="space-y-10">
            <div className="pb-6 border-b border-gray-50 flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Số tài khoản</label>
                <p className="text-xl font-bold text-gray-900">330566888</p>
              </div>
              <button onClick={() => handleCopy('330566888', 'stk')} className="flex items-center space-x-2 bg-blue-50 text-[#0066cc] px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100">
                <CreditCard size={14} /><span>{copied === 'stk' ? 'Đã chép' : 'Copy'}</span>
              </button>
            </div>
            <div className="pb-6 border-b border-gray-50"><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Chủ tài khoản</label><p className="text-xl font-bold text-gray-900 uppercase">DAO NHU BAO</p></div>
            <div className="pb-6 border-b border-gray-50 flex items-center justify-between">
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Nội dung chuyển khoản</label><p className="text-xl font-bold text-gray-900">HYBIRD_1608</p></div>
              <button onClick={() => handleCopy('HYBIRD_1608', 'nd')} className="flex items-center space-x-2 bg-blue-50 text-[#0066cc] px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100">
                <CreditCard size={14} /><span>{copied === 'nd' ? 'Đã chép' : 'Copy'}</span>
              </button>
            </div>
            <div><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Số tiền</label><p className="text-4xl font-bold text-[#0066cc]">{amount}</p></div>
          </div>
        </div>

        <div className="w-full lg:w-[450px] flex flex-col items-center justify-center space-y-8">
          <div className="p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrData}`} alt="Payment QR" className="w-[300px] h-[300px]" />
          </div>
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex items-start space-x-4">
            <HelpCircle className="text-[#0066cc] shrink-0 mt-0.5" size={20} /><p className="text-sm font-medium text-gray-600">Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống tự động cập nhật.</p>
          </div>
          <button onClick={handleComplete} disabled={isProcessing} className={`w-full py-5 rounded-[2rem] font-bold text-xl transition-all shadow-xl shadow-blue-100 ${isProcessing ? 'bg-gray-100 text-gray-400' : 'bg-[#0066cc] text-white hover:bg-blue-600 active:scale-95'}`}>
            {isProcessing ? 'Đang xác nhận...' : 'Tôi đã chuyển khoản'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BankPaymentView;
