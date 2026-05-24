import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, User, Shield, Bell, History, Camera } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  onBack: () => void;
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-[#1e3b2b]' : 'bg-gray-200'}`}
  >
    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'left-7' : 'left-1'}`} />
  </button>
);

const AccountSettingsView = ({ onBack, profile, setProfile }: ProfileViewProps) => {
  const [activeTab, setActiveTab] = useState('Thông tin cá nhân');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Local state for editing profile
  const [editedProfile, setEditedProfile] = useState<UserProfile>({ ...profile });
  
  const [securitySettings, setSecuritySettings] = useState({
    publicFavorites: true,
    emailReminders: true,
    pushReminders: true,
    newBookAlerts: false,
    workshopAlerts: true
  });

  const handleToggle = (key: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { label: 'Thông tin cá nhân', icon: User },
    { label: 'Bảo mật', icon: Shield },
    { label: 'Cài đặt thông báo', icon: Bell },
    { label: 'Lịch sử mượn sách', icon: History },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setProfile(editedProfile);
      setShowSuccess(true);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-none px-4 md:px-12 lg:px-16 py-12">
      <div className="flex items-center space-x-6 mb-10">
        <button onClick={onBack} className="p-3 hover:bg-white/50 rounded-full transition-colors flex items-center justify-center">
          <ArrowLeft size={28} className="text-gray-900" />
        </button>
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">Cài đặt tài khoản</h2>
      </div>

      <div className="flex gap-12 items-start">
        <div className="w-72 glass-panel rounded-[2.5rem] p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-full transition-all font-bold text-sm ${activeTab === tab.label ? 'bg-white/60 text-[#1e3b2b] shadow-sm' : 'text-gray-500 hover:bg-white/40'}`}
            >
              <tab.icon size={20} strokeWidth={activeTab === tab.label ? 2.5 : 2} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 glass-panel rounded-[3rem] p-12 min-h-[700px] flex flex-col relative">
          {activeTab === 'Thông tin cá nhân' ? (
            <div className="flex-1">
              <div className="flex items-center justify-between mb-16 pb-16 border-b border-gray-100">
                <div className="flex items-center space-x-8">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 ring-2 ring-gray-100">
                      <img src={editedProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-500 hover:text-[#1e3b2b] border border-gray-100">
                      <Camera size={18} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">{editedProfile.fullName}</h3>
                    <span className="inline-block px-4 py-1.5 rounded-lg bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-wider">Độc giả</span>
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-sm">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Loại thẻ: <span className="text-[#1e3b2b] font-bold">Hạng Tiêu Chuẩn</span></p>
                  <p className="text-[11px] font-bold text-gray-500">Ngày hết hạn: <span className="text-gray-900">15/06/2026</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Họ và tên</label>
                  <input type="text" value={editedProfile.fullName || ''} onChange={(e) => setEditedProfile({...editedProfile, fullName: e.target.value})} className="w-full bg-white/50 backdrop-blur-md border border-white/60 rounded-full py-4 px-6 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all shadow-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Email</label>
                  <input type="email" value={editedProfile.email || ''} onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})} className="w-full bg-white/50 backdrop-blur-md border border-white/60 rounded-full py-4 px-6 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all shadow-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Số điện thoại</label>
                  <input type="text" value={editedProfile.phone || ''} onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})} className="w-full bg-white/50 backdrop-blur-md border border-white/60 rounded-full py-4 px-6 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all shadow-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Ngày sinh</label>
                  <input type="text" value={editedProfile.birthDate || ''} onChange={(e) => setEditedProfile({...editedProfile, birthDate: e.target.value})} className="w-full bg-white/50 backdrop-blur-md border border-white/60 rounded-full py-4 px-6 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all shadow-sm" />
                </div>
                <div className="col-span-2 space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Địa chỉ</label>
                  <input type="text" value={editedProfile.address || ''} onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})} className="w-full bg-white/50 backdrop-blur-md border border-white/60 rounded-full py-4 px-6 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#1e3b2b]/20 transition-all shadow-sm" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>Tính năng đang được phát triển</p>
            </div>
          )}

          {activeTab === 'Thông tin cá nhân' && (
            <div className="mt-auto pt-10 flex justify-end space-x-6">
              <button onClick={onBack} className="px-10 py-4 font-bold text-gray-400 hover:text-gray-900 transition-colors">Hủy</button>
              <button onClick={handleSave} className="bg-[#1e3b2b] text-white px-12 py-4 rounded-full font-bold shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all">
                {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setShowSuccess(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              className="glass-panel rounded-[2.5rem] p-10 relative w-[450px] text-center z-10"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-500 text-4xl font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">Cập nhật thành công</h3>
              <p className="text-gray-500 mb-8 text-sm">Thông tin cá nhân của bạn đã được cập nhật thành công trên hệ thống.</p>
              <button 
                onClick={() => {
                  setShowSuccess(false);
                  onBack();
                }}
                className="w-full py-4 rounded-full bg-[#1e3b2b] text-white font-bold transition-colors shadow-md hover:-translate-y-0.5 shadow-[#1e3b2b]/20 hover:shadow-lg active:scale-95"
              >
                Đóng
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccountSettingsView;
