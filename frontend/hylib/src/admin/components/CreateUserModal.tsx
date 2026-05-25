import React, { useEffect, useState } from 'react';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
}

export default function CreateUserModal({ isOpen, onClose, onSave }: CreateUserModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountType, setAccountType] = useState('Reader');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Vui lòng điền họ tên và email.");
      return;
    }
    
    let displayType = 'Độc giả';
    if (accountType === 'VIP') displayType = 'VIP';
    else if (accountType === 'Guest') displayType = 'Khách';

    const newUser = {
      id: '#USR-' + Math.floor(100 + Math.random() * 900),
      name: fullName,
      email: email,
      type: displayType,
      date: new Date().toLocaleDateString('en-GB'),
      isActive: true
    };
    
    onSave(newUser);
    
    // reset form
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setAccountType('Reader');
    setPassword('');
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-[450px] p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thêm người dùng</h2>
        <p className="text-sm text-gray-500 mb-6">Tạo tài khoản thành viên đọc sách mới trong hệ thống.</p>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Họ và tên</label>
            <input 
              type="text" 
              placeholder="Ví dụ: Nguyễn Văn A" 
              value={fullName} 
              onChange={e => setFullName(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300" 
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Email</label>
            <input 
              type="email" 
              placeholder="example@athenaeum.vn" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300" 
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Số điện thoại</label>
            <input 
              type="tel" 
              placeholder="090 123 4567" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300" 
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Loại tài khoản</label>
            <select 
              value={accountType} 
              onChange={e => setAccountType(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent cursor-pointer"
            >
              <option value="Reader">Reader</option>
              <option value="VIP">VIP</option>
              <option value="Guest">Guest</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Mật khẩu</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300" 
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 mt-4">
            <button 
              type="button"
              onClick={onClose} 
              className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
