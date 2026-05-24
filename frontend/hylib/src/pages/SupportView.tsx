import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, BookOpen, CreditCard, Settings, ChevronDown, Upload, Phone, Mail } from 'lucide-react';

interface SupportViewProps {
  onBack: () => void;
}

const SupportView = ({ onBack }: SupportViewProps) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="px-10 pb-20 pt-8 bg-gray-50/50 min-h-[calc(100vh-80px)]"
  >
    <div className="w-full max-w-none px-4 md:px-12 lg:px-16">
      <div className="flex items-center space-x-6 mb-10">
        <button onClick={onBack} className="p-3 hover:bg-white/50 rounded-full transition-colors flex items-center justify-center shadow-sm border border-white/60 bg-white/50 backdrop-blur-md">
          <ArrowLeft size={28} className="text-gray-900" />
        </button>
        <h2 className="text-4xl font-bold text-gray-900">Chúng tôi có thể giúp gì cho bạn?</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Tài khoản & Thẻ', icon: User, color: 'bg-white/60 text-[#1e3b2b] shadow-sm border border-white/60' },
          { label: 'Mượn & Trả sách', icon: BookOpen, color: 'bg-white/60 text-[#1e3b2b] shadow-sm border border-white/60' },
          { label: 'Thanh toán & Phí phạt', icon: CreditCard, color: 'bg-white/60 text-[#1e3b2b] shadow-sm border border-white/60' },
          { label: 'Sự cố kỹ thuật', icon: Settings, color: 'bg-white/60 text-[#1e3b2b] shadow-sm border border-white/60' },
        ].map((card, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)' }}
            className="glass-panel p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center shadow-sm cursor-pointer group hover:bg-white/60 transition-colors"
          >
            <div className={`w-14 h-14 ${card.color} rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <card.icon size={28} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-gray-900">{card.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 glass-panel rounded-[3rem] p-10 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Gửi yêu cầu hỗ trợ mới</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block">Chủ đề</label>
              <div className="relative">
                <select className="w-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm rounded-full px-6 py-4 appearance-none focus:ring-2 focus:ring-[#1e3b2b]/20 outline-none font-medium text-gray-800 cursor-pointer transition-all">
                  <option>Khiếu nại</option>
                  <option>Góp ý dịch vụ</option>
                  <option>Báo lỗi kỹ thuật</option>
                  <option>Hỗ trợ thẻ thành viên</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block">Nội dung chi tiết</label>
              <textarea 
                placeholder="Vui lòng mô tả chi tiết vấn đề của bạn..."
                className="w-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm rounded-3xl px-6 py-5 min-h-[220px] focus:ring-2 focus:ring-[#1e3b2b]/20 outline-none font-medium text-gray-800 resize-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block">Đính kèm tệp</label>
              <div className="border-2 border-dashed border-[#1e3b2b]/20 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-white/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-[#1e3b2b]" size={24} />
                </div>
                <p className="font-bold text-gray-900 mb-1">Kéo thả tệp vào đây hoặc nhấn để tải lên</p>
                <p className="text-sm font-medium text-gray-400">Hỗ trợ định dạng: JPG, PNG, PDF (Tối đa 5MB)</p>
              </div>
            </div>

            <button className="w-full bg-[#1e3b2b] text-white py-4 rounded-full font-bold text-lg shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 mt-4">
              Gửi yêu cầu
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-10 shadow-sm sticky top-28">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Thông tin liên hệ</h3>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/60 backdrop-blur-sm shadow-sm border border-white/60 text-[#1e3b2b] rounded-full flex items-center justify-center shrink-0">
                <Phone size={22} strokeWidth={2.5} />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Hotline 24/7</p>
                <p className="text-xl font-bold text-gray-900">+84 325784777</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/60 backdrop-blur-sm shadow-sm border border-white/60 text-[#1e3b2b] rounded-full flex items-center justify-center shrink-0">
                <Mail size={22} strokeWidth={2.5} />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Email Hỗ trợ</p>
                <p className="text-lg font-bold text-gray-900 break-all leading-tight">A48009@thanglong.edu.vn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default SupportView;
