import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess, onSwitchToRegister }: { isOpen: boolean; onClose: () => void; onLoginSuccess: (email: string) => void; onSwitchToRegister: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLoginSuccess(email);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-white/20 backdrop-blur-xl" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-[440px] glass-panel rounded-[2.5rem] p-10 flex flex-col items-center">
            <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            <h2 className="text-xl font-bold text-gray-900 mb-8 self-start">Đăng nhập</h2>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e3b2b] transition-colors"><User size={18} /></div>
                <input type="text" placeholder="Số điện thoại hoặc Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/50 border border-white/60 rounded-full py-4 pl-14 pr-5 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all text-sm" />
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e3b2b] transition-colors"><Lock size={18} /></div>
                <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/50 border border-white/60 rounded-full py-4 pl-14 pr-12 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end"><button type="button" className="text-[12px] font-bold text-[#1e3b2b] hover:underline">Quên mật khẩu?</button></div>
              <button type="submit" className="w-full bg-[#1e3b2b] text-white py-4 rounded-full font-bold shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 text-sm">Đăng nhập</button>
            </form>
            <p className="mt-8 text-[12px] font-medium text-gray-500">Chưa có tài khoản? <button onClick={onSwitchToRegister} className="text-[#1e3b2b] font-bold hover:underline">Đăng ký ngay</button></p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }: { isOpen: boolean; onClose: () => void; onSwitchToLogin: () => void; onRegisterSuccess: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegisterSuccess();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-white/20 backdrop-blur-xl" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative glass-panel rounded-[2.5rem] p-10 w-full max-w-[440px] flex flex-col items-center">
            <button onClick={onClose} className="absolute right-8 top-8 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full"><X size={20} /></button>
            <h2 className="text-xl font-bold text-gray-900 mb-8 self-start">Đăng ký</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="relative group"><div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e3b2b] transition-colors"><User size={18} /></div><input type="text" placeholder="Họ và Tên" className="w-full bg-white/50 border border-white/60 rounded-full py-4 pl-14 pr-5 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all text-sm" /></div>
              <div className="relative group"><div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e3b2b] transition-colors"><Mail size={18} /></div><input type="text" placeholder="Số điện thoại hoặc Email" className="w-full bg-white/50 border border-white/60 rounded-full py-4 pl-14 pr-5 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all text-sm" /></div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e3b2b] transition-colors"><Lock size={18} /></div>
                <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" className="w-full bg-white/50 border border-white/60 rounded-full py-4 pl-14 pr-12 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e3b2b] transition-colors"><Lock size={18} /></div>
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" className="w-full bg-white/50 border border-white/60 rounded-full py-4 pl-14 pr-12 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all text-sm" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
              <div className="flex items-start space-x-3 pt-2">
                <input type="checkbox" className="mt-1 rounded border-gray-300 text-[#1e3b2b] focus:ring-[#1e3b2b]/20" />
                <p className="text-[12px] font-medium text-gray-500">Tôi đồng ý với các <button type="button" className="text-[#1e3b2b] font-bold hover:underline">Điều khoản</button> và <button type="button" className="text-[#1e3b2b] font-bold hover:underline">Chính sách bảo mật</button></p>
              </div>
              <button type="submit" className="w-full bg-[#1e3b2b] text-white py-4 rounded-full font-bold shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 text-sm mt-4">Đăng ký</button>
            </form>
            <p className="mt-8 text-[12px] font-medium text-gray-500">Đã có tài khoản? <button onClick={onSwitchToLogin} className="text-[#1e3b2b] font-bold hover:underline">Đăng nhập ngay</button></p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const OTPModal = ({ isOpen, onClose, onBack, onVerifySuccess }: { isOpen: boolean; onClose: () => void; onBack: () => void; onVerifySuccess: () => void }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    let interval: any;
    if (isOpen && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) document.getElementById(`otp-${index - 1}`)?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every(d => d !== '')) onVerifySuccess();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-white/20 backdrop-blur-xl" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative glass-panel rounded-[2.5rem] p-10 w-full max-w-[440px] flex flex-col items-center">
            <button onClick={onBack} className="absolute left-8 top-8 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full transition-colors"><ArrowLeft size={18} /></button>
            <div className="mb-10 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Nhập mã xác thực</h2>
              <p className="text-gray-500 text-sm max-w-[280px] mx-auto">Vui lòng nhập mã gồm 6 chữ số vừa được gửi đến email/số điện thoại của bạn.</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full space-y-8">
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input key={index} id={`otp-${index}`} type="text" maxLength={1} value={digit} onChange={(e) => handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} className="w-12 h-14 bg-white/50 border border-white/60 rounded-xl text-center text-lg font-bold text-[#1e3b2b] outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all" />
                ))}
              </div>
              <button type="submit" className="w-full bg-[#1e3b2b] text-white py-4 rounded-full font-bold shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 text-sm">Xác nhận</button>
            </form>
            <p className="mt-8 text-[12px] font-medium text-gray-500">Chưa nhận được mã? <button className="text-[#1e3b2b] font-bold hover:underline">Gửi lại mã ({timer}s)</button></p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import { ArrowLeft } from 'lucide-react';

