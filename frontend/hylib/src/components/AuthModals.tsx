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
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center border border-white/50">
            <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
            <h2 className="text-xl font-bold text-gray-900 mb-8 self-start">Đăng nhập</h2>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0066cc] transition-colors"><User size={18} /></div>
                <input type="text" placeholder="Số điện thoại hoặc Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#f0f4f9] border-none rounded-2xl py-4 pl-14 pr-5 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 text-sm" />
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0066cc] transition-colors"><Lock size={18} /></div>
                <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#f0f4f9] border-none rounded-2xl py-4 pl-14 pr-12 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end"><button type="button" className="text-[12px] font-bold text-[#0066cc] hover:underline">Quên mật khẩu?</button></div>
              <button type="submit" className="w-full bg-[#0066cc] text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95 text-sm">Đăng nhập</button>
            </form>
            <div className="w-full flex items-center my-8"><div className="flex-1 h-[1px] bg-gray-100"></div><span className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Hoặc đăng nhập bằng</span><div className="flex-1 h-[1px] bg-gray-100"></div></div>
            <div className="w-full space-y-3">
              <button className="w-full border border-gray-100 py-3.5 rounded-2xl flex items-center justify-center space-x-3 hover:bg-gray-50 transition-all font-bold text-sm text-gray-700">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale opacity-70" alt="Google" /><span>Google</span>
              </button>
              <button className="w-full border border-gray-100 py-3.5 rounded-2xl flex items-center justify-center space-x-3 hover:bg-gray-50 transition-all font-bold text-sm text-gray-700">
                <div className="w-4 h-4 rounded bg-[#1877f2] flex items-center justify-center"><span className="text-white text-[10px] font-black">f</span></div><span>Facebook</span>
              </button>
            </div>
            <p className="mt-8 text-[12px] font-medium text-gray-500">Chưa có tài khoản? <button onClick={onSwitchToRegister} className="text-[#0066cc] font-bold hover:underline">Đăng ký ngay</button></p>
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
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 w-full max-w-[440px] shadow-2xl flex flex-col items-center border border-white/50">
            <button onClick={onClose} className="absolute right-8 top-8 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full"><X size={20} /></button>
            <h2 className="text-xl font-bold text-gray-900 mb-8 self-start">Đăng ký</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="relative group"><div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0066cc]"><User size={18} /></div><input type="text" placeholder="Họ và Tên" className="w-full bg-[#f0f4f9] border-none rounded-2xl py-4 pl-14 pr-5 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 text-sm" /></div>
              <div className="relative group"><div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0066cc]"><Mail size={18} /></div><input type="text" placeholder="Số điện thoại hoặc Email" className="w-full bg-[#f0f4f9] border-none rounded-2xl py-4 pl-14 pr-5 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 text-sm" /></div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0066cc]"><Lock size={18} /></div>
                <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" className="w-full bg-[#f0f4f9] border-none rounded-2xl py-4 pl-14 pr-12 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0066cc]"><Lock size={18} /></div>
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" className="w-full bg-[#f0f4f9] border-none rounded-2xl py-4 pl-14 pr-12 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 text-sm" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
              <div className="flex items-start space-x-3 pt-2">
                <input type="checkbox" className="mt-1 rounded border-gray-300 text-[#0066cc]" />
                <p className="text-[12px] font-medium text-gray-500">Tôi đồng ý với các <button type="button" className="text-[#0066cc] hover:underline">Điều khoản</button> và <button type="button" className="text-[#0066cc] hover:underline">Chính sách bảo mật</button></p>
              </div>
              <button type="submit" className="w-full bg-[#0066cc] text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95 text-sm mt-4">Đăng ký</button>
            </form>
            <p className="mt-8 text-[12px] font-medium text-gray-500">Đã có tài khoản? <button onClick={onSwitchToLogin} className="text-[#0066cc] font-bold hover:underline">Đăng nhập ngay</button></p>
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
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 w-full max-w-[440px] shadow-2xl flex flex-col items-center border border-white/50">
            <button onClick={onBack} className="absolute left-8 top-8 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full transition-colors"><ArrowLeft size={18} /></button>
            <div className="mb-10 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Nhập mã xác thực</h2>
              <p className="text-gray-500 text-sm max-w-[280px] mx-auto">Vui lòng nhập mã gồm 6 chữ số vừa được gửi đến email/số điện thoại của bạn.</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full space-y-8">
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input key={index} id={`otp-${index}`} type="text" maxLength={1} value={digit} onChange={(e) => handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} className="w-12 h-14 bg-[#f0f4f9] border-none rounded-xl text-center text-lg font-bold text-[#0066cc] outline-none focus:ring-2 focus:ring-[#0066cc]/20 transition-all" />
                ))}
              </div>
              <button type="submit" className="w-full bg-[#0066cc] text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95 text-sm">Xác nhận</button>
            </form>
            <p className="mt-8 text-[12px] font-medium text-gray-500">Chưa nhận được mã? <button className="text-[#0066cc] font-bold hover:underline">Gửi lại mã ({timer}s)</button></p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import { ArrowLeft } from 'lucide-react';

