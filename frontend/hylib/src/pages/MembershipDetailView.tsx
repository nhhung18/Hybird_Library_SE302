import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X } from 'lucide-react';

interface MembershipDetailViewProps {
  plan: string;
  expiryDate: string;
  onBack: () => void;
  onUpgradePremium?: () => void;
  onCancel: () => void;
  onRenew: () => void;
}

const CancelMembershipModal = ({ isOpen, onClose, onConfirm }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-[#e2e8f0] w-full max-w-lg rounded-[2.5rem] p-10 relative z-10 shadow-2xl">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-900"><X size={24} /></button>
          <h3 className="text-xl font-bold text-gray-900 mb-8 px-2">Hủy thẻ thành viên</h3>
          <div className="bg-white/60 rounded-[1.5rem] p-8 mb-10 border border-white/40">
            <p className="font-bold text-gray-900 mb-6">Các quyền lợi sẽ mất:</p>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700 font-medium"><span className="w-4 h-[2px] bg-red-500 mr-3"></span>Phòng học riêng</li>
              <li className="flex items-center text-gray-700 font-medium"><span className="w-4 h-[2px] bg-red-500 mr-3"></span>Mượn sách không giới hạn</li>
            </ul>
          </div>
          <div className="flex items-center justify-between px-2">
            <button onClick={onConfirm} className="text-red-500 font-bold text-xl">Xác nhận hủy</button>
            <button onClick={onClose} className="bg-[#0066cc] text-white px-10 py-4 rounded-full font-bold text-lg">Giữ lại thẻ</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const RenewMembershipModal = ({ isOpen, onClose, onConfirm, plan }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative z-10 shadow-2xl">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400"><X size={24} /></button>
          <h3 className="text-xl font-bold text-gray-900 mb-8">Gia hạn thẻ thành viên</h3>
          <div className="space-y-4 mb-10 text-center">
            <p className="text-gray-500">Kéo dài tư cách thành viên cho hạng thẻ {plan}.</p>
            <p className="text-2xl font-bold text-[#0066cc]">{plan === 'Standard' ? '199.000đ' : '499.000đ'}</p>
          </div>
          <div className="flex items-center justify-center space-x-8">
            <button onClick={onClose} className="text-[#0066cc] font-bold text-xl px-8 py-3">Hủy</button>
            <button onClick={onConfirm} className="bg-[#0066cc] text-white px-12 py-4 rounded-full font-bold text-lg">Xác nhận</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const MembershipDetailView = ({ plan, expiryDate, onBack, onUpgradePremium, onCancel, onRenew }: MembershipDetailViewProps) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);

  const details = plan === 'Standard' ? {
    name: 'Standard', cardNumber: '9876 5432 1000', owner: 'DAO NHU BAO', issueDate: '12/05/2026',
    expiryDate, maxBorrowTime: '14 ngày/lần', maintenanceFee: '199.000đ/năm', maxBooks: '3 cuốn/lần', cardColor: 'bg-[#0066cc]'
  } : {
    name: 'Premium', cardNumber: '1234 5678 9000', owner: 'DAO NHU BAO', issueDate: '12/05/2026',
    expiryDate, maxBorrowTime: 'KHÔNG GIỚI HẠN', maintenanceFee: '499.000đ/năm', maxBooks: 'KHÔNG GIỚI HẠN', cardColor: 'bg-[#1a1c20]'
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-10 pb-20 pt-4 max-w-7xl mx-auto">
      <div className="flex items-center space-x-6 mb-12">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={28} className="text-gray-900" /></button>
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">Chi tiết thẻ</h2>
      </div>

      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100">
        <div className="relative mb-16 px-10">
          <div className={`w-full aspect-[1.8/1] rounded-[2rem] p-12 relative overflow-hidden text-white shadow-2xl ${details.cardColor}`}>
            <div className="flex justify-between items-start relative z-10"><h3 className="text-4xl font-black italic tracking-tighter">Hybird</h3><div className="bg-green-400 text-white text-[10px] font-black px-4 py-1.5 rounded-full">Đang hoạt động</div></div>
            <div className="mt-20 relative z-10">
              <div className="text-6xl font-bold tracking-[0.2em] mb-20 font-mono">{details.cardNumber}</div>
              <div className="flex justify-between items-end">
                <div><p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-50 mb-3">Chủ thẻ</p><p className="text-2xl font-black tracking-widest uppercase">{details.owner}</p></div>
                <div className="text-right"><p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-50 mb-3">Hạng thẻ</p><p className="text-2xl font-black tracking-widest italic">{details.name}</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-12 mb-16 border-b border-gray-100 pb-12">
          <div className="space-y-2"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ngày hết hạn</p><p className="text-xl font-black text-gray-900">{details.expiryDate}</p></div>
          <div className="space-y-2"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phí duy trì</p><p className="text-xl font-black text-gray-900">{details.maintenanceFee}</p></div>
          <div className="space-y-2"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thời gian mượn xách</p><p className="text-xl font-black text-gray-900">{details.maxBorrowTime}</p></div>
          <div className="space-y-2"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gia hạn</p><p className="text-xl font-black text-gray-900">{details.maxBooks}</p></div>
        </div>

        <div className="flex items-center justify-center space-x-8">
          <button onClick={() => setIsCancelModalOpen(true)} className="text-red-500 font-black text-2xl hover:bg-red-50 px-10 py-5 rounded-3xl transition-all">Hủy thẻ</button>
          <button onClick={() => setIsRenewModalOpen(true)} className="bg-white border-2 border-gray-200 text-gray-900 px-10 py-5 rounded-3xl font-black text-2xl hover:bg-gray-50 transition-all">Gia hạn</button>
          {plan === 'Standard' && (
            <button onClick={onUpgradePremium} className="bg-[#0066cc] text-white px-10 py-5 rounded-3xl font-black text-2xl shadow-xl hover:bg-blue-600 transition-all">Nâng cấp Premium</button>
          )}
        </div>
      </div>
      <CancelMembershipModal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} onConfirm={() => { setIsCancelModalOpen(false); onCancel(); }} />
      <RenewMembershipModal isOpen={isRenewModalOpen} onClose={() => setIsRenewModalOpen(false)} plan={plan} onConfirm={() => { setIsRenewModalOpen(false); onRenew(); }} />
    </motion.div>
  );
};

export default MembershipDetailView;
