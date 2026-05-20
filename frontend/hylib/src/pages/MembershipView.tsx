import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Layout, Monitor, Sparkles, Smartphone, Crown } from 'lucide-react';

interface MembershipViewProps {
  onUpgrade: (plan: { name: string, price: string }) => void;
  onViewDetail: (plan: string) => void;
  currentPlan: string | null;
  onBack: () => void;
}

const MembershipView = ({ onUpgrade, onViewDetail, currentPlan, onBack }: MembershipViewProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-10 pb-20 pt-4">
      <div className="flex items-center space-x-6 mb-12">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
          <ArrowLeft size={28} className="text-gray-900" />
        </button>
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">Thẻ thành viên</h2>
      </div>

      <div className="flex gap-10 max-w-6xl">
        {/* Standard Card */}
        <div className="flex-1 bg-white rounded-[3rem] p-12 shadow-2xl shadow-gray-100 border border-gray-100 flex flex-col">
          <div className="mb-8"><span className="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-wider">Standard</span></div>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Standard Scholar</h3>
          <p className="text-gray-500 font-medium leading-relaxed mb-8 pr-10">Dành cho học sinh, sinh viên cần không gian học tập cơ bản.</p>
          <div className="flex items-baseline space-x-2 mb-12"><span className="text-6xl font-black text-gray-900">199k</span><span className="text-xl font-bold text-gray-400">VND/năm</span></div>
          <div className="space-y-8 mb-16 flex-1">
             <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quyền lợi offline</p>
              <div className="flex items-start space-x-4"><BookOpen size={18} className="mt-1 text-gray-900"/><p className="font-bold text-gray-700 text-sm">Mượn tối đa 3-5 đầu sách</p></div>
              <div className="flex items-start space-x-4"><Layout size={18} className="mt-1 text-gray-900"/><p className="font-bold text-gray-700 text-sm">Sử dụng khu vực đọc chung không giới hạn</p></div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quyền lợi online</p>
              <div className="flex items-start space-x-4"><Monitor size={18} className="mt-1 text-gray-900"/><p className="font-bold text-gray-700 text-sm">Truy cập E-book cơ bản</p></div>
            </div>
          </div>
          {currentPlan === 'Standard' ? (
            <button onClick={() => onViewDetail('Standard')} className="w-full py-5 rounded-[2rem] border-2 border-[#0066cc] text-[#0066cc] font-black text-xl hover:bg-blue-50">Xem thông tin</button>
          ) : (
            <button onClick={() => onUpgrade({ name: 'Standard', price: '199.000 VNĐ' })} className="w-full py-5 rounded-[2rem] border-2 border-[#0066cc] text-[#0066cc] font-black text-xl hover:bg-blue-50">Nâng cấp ngay</button>
          )}
        </div>

        {/* Premium Card */}
        <div className="flex-1 bg-[#1a1c20] rounded-[3rem] p-12 shadow-2xl flex flex-col text-white relative overflow-hidden group">
          <div className="mb-8 relative z-10"><span className="px-4 py-1.5 rounded-lg bg-[#0066cc] text-white text-[10px] font-black uppercase tracking-wider">Premium</span></div>
          <h3 className="text-4xl font-extrabold mb-4 tracking-tight relative z-10">Premium Explorer</h3>
          <p className="text-gray-400 font-medium leading-relaxed mb-8 pr-10 relative z-10">Dành cho người đam mê công nghệ, chuyên gia cần trải nghiệm tối đa.</p>
          <div className="flex items-baseline space-x-2 mb-12 relative z-10"><span className="text-6xl font-black text-white">499k</span><span className="text-xl font-bold text-gray-500">VND/năm</span></div>
          <div className="space-y-8 mb-16 flex-1 relative z-10">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Quyền lợi offline</p>
              <div className="flex items-start space-x-4"><Sparkles size={18} className="mt-1 text-white"/><p className="font-bold text-gray-200 text-sm">Mượn sách không giới hạn</p></div>
              <div className="flex items-start space-x-4"><Monitor size={18} className="mt-1 text-white"/><p className="font-bold text-gray-200 text-sm">Dàn phòng Media Lab</p></div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Quyền lợi online</p>
              <div className="flex items-start space-x-4"><Smartphone size={18} className="mt-1 text-white"/><p className="font-bold text-gray-200 text-sm">Thủ thư số hỗ trợ tra cứu</p></div>
              <div className="flex items-start space-x-4"><Crown size={18} className="mt-1 text-white"/><p className="font-bold text-gray-200 text-sm">Tài khoản VIP đối tác</p></div>
            </div>
          </div>
          <div className="relative z-10">
            {currentPlan === 'Premium' ? (
              <button onClick={() => onViewDetail('Premium')} className="w-full py-5 rounded-[2rem] border-2 border-white/20 text-white font-black text-xl hover:bg-white/5">Xem thông tin</button>
            ) : (
              <button onClick={() => onUpgrade({ name: 'Premium', price: '499.000 VNĐ' })} className="w-full py-5 rounded-[2rem] bg-[#0066cc] text-white font-black text-xl hover:bg-blue-600 shadow-xl shadow-blue-900/20">Nâng cấp ngay</button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MembershipView;
