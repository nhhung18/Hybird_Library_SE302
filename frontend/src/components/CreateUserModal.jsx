import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CreateUserModal({ isOpen, onClose, onSave }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountType, setAccountType] = useState('Reader');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!fullName || !email) {
      alert("Vui lòng điền họ tên và email.");
      return;
    }
    
    // Map account type selection to pill label text
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
    onClose();
    
    // reset form
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setAccountType('Reader');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
          <h2 className="text-[22px] font-bold text-gray-900">Thêm người dùng mới</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto space-y-7 bg-white">
          
          <div>
            <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">
              FULL NAME
            </label>
            <input 
              type="text" 
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Nguyen Van A"
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 text-[15px]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">
              EMAIL
            </label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 text-[15px]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">
              PHONE NUMBER
            </label>
            <input 
              type="text" 
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="+84 900 000 000"
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 text-[15px]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">
              ACCOUNT TYPE
            </label>
            <div className="relative">
              <select 
                value={accountType}
                onChange={e => setAccountType(e.target.value)}
                className="w-full appearance-none bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors text-[15px]"
              >
                <option value="Reader">Reader</option>
                <option value="VIP">VIP</option>
                <option value="Guest">Guest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">
              PASSWORD
            </label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border-b border-gray-200 px-0 py-2 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 text-[15px]"
            />
          </div>

        </div>
        
        {/* Footer */}
        <div className="px-8 py-6 bg-[#f3f4f6] flex justify-end gap-3 mt-4">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 border border-gray-300 text-gray-700 font-medium text-[15px] hover:bg-white rounded-full transition-colors bg-transparent"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-medium text-[15px] rounded-full transition-colors shadow-sm"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
