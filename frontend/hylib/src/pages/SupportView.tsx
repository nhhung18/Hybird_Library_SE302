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
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center space-x-6 mb-10">
        <button onClick={onBack} className="p-3 hover:bg-white rounded-full transition-colors flex items-center justify-center shadow-sm border border-gray-100 bg-white">
          <ArrowLeft size={28} className="text-gray-900" />
        </button>
        <h2 className="text-4xl font-bold text-gray-900">Chúng tôi có thể giúp gì cho bạn?</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Tài khoản & Thẻ', icon: User, color: 'bg-blue-50 text-[#0066cc]' },
          { label: 'Mượn & Trả sách', icon: BookOpen, color: 'bg-blue-50 text-[#0066cc]' },
          { label: 'Thanh toán & Phí phạt', icon: CreditCard, color: 'bg-blue-50 text-[#0066cc]' },
          { label: 'Sự cố kỹ thuật', icon: Settings, color: 'bg-blue-50 text-[#0066cc]' },
        ].map((card, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)' }}
            className="bg-white p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 cursor-pointer group"
          >
            <div className={`w-14 h-14 ${card.color} rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <card.icon size={28} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-gray-900">{card.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Gửi yêu cầu hỗ trợ mới</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block">Chủ đề</label>
              <div className="relative">
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 appearance-none focus:ring-2 focus:ring-[#0066cc] focus:border-transparent outline-none font-medium text-gray-800 cursor-pointer">
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
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 min-h-[220px] focus:ring-2 focus:ring-[#0066cc] focus:border-transparent outline-none font-medium text-gray-800 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block">Đính kèm tệp</label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-[#0066cc]" size={24} />
                </div>
                <p className="font-bold text-gray-900 mb-1">Kéo thả tệp vào đây hoặc nhấn để tải lên</p>
                <p className="text-sm font-medium text-gray-400">Hỗ trợ định dạng: JPG, PNG, PDF (Tối đa 5MB)</p>
              </div>
            </div>

            <button className="w-full bg-[#0066cc] text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-[0.98] mt-4">
              Gửi yêu cầu
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-28">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Thông tin liên hệ</h3>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-[#0066cc] rounded-full flex items-center justify-center shrink-0">
                <Phone size={22} strokeWidth={2.5} />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Hotline 24/7</p>
                <p className="text-xl font-bold text-gray-900">+84 325784777</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-[#0066cc] rounded-full flex items-center justify-center shrink-0">
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
