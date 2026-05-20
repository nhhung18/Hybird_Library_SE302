import React, { useState, useEffect } from 'react';
import { X, User, BookOpen, Star, CheckCircle2 } from 'lucide-react';

export default function UpdateRoleModal({ isOpen, onClose, user, onSave }) {
  const [selectedRole, setSelectedRole] = useState('Reader');

  useEffect(() => {
    if (user) {
      // Map user.type back to 'Guest', 'Reader', 'VIP'
      if (user.type === 'Khách') setSelectedRole('Guest');
      else if (user.type === 'VIP') setSelectedRole('VIP');
      else setSelectedRole('Reader');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    let displayType = 'Độc giả';
    if (selectedRole === 'VIP') displayType = 'VIP';
    else if (selectedRole === 'Guest') displayType = 'Khách';

    onSave({
      ...user,
      type: displayType
    });
    onClose();
  };

  const roles = [
    {
      id: 'Guest',
      title: 'Guest',
      description: 'Quyền truy cập hạn chế, chỉ xem danh mục công khai và tài liệu mượn màng.',
      icon: <User size={20} className={selectedRole === 'Guest' ? "text-[#0056b3]" : "text-gray-600"} />
    },
    {
      id: 'Reader',
      title: 'Reader',
      description: 'Mượn sách cơ bản, sử dụng phòng đọc chung và tham gia các sự kiện thư viện.',
      icon: <BookOpen size={20} className={selectedRole === 'Reader' ? "text-[#0056b3]" : "text-gray-600"} />
    },
    {
      id: 'VIP',
      title: 'VIP',
      description: 'Truy cập toàn bộ tài liệu đặc biệt, phòng đọc riêng tư và mượn sách không giới hạn thời gian.',
      icon: <Star size={20} className={selectedRole === 'VIP' ? "text-[#0056b3]" : "text-gray-600"} />
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
          <h2 className="text-[22px] font-bold text-gray-900">Cập nhật quyền tài khoản</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto bg-white">
          
          {/* User Info Card */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-8">
            <h3 className="font-bold text-lg text-gray-900">{user?.name}</h3>
            <p className="text-gray-500 mt-1">Tài khoản hiện tại: {user?.type === 'Khách' ? 'Guest' : user?.type === 'VIP' ? 'VIP' : 'Reader'}</p>
          </div>

          <p className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-4">CẤP ĐỘ TÀI KHOẢN MỚI</p>

          <div className="space-y-4">
            {roles.map((role) => (
              <div 
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`border rounded-xl p-5 cursor-pointer transition-all ${
                  selectedRole === role.id 
                    ? 'border-[#0056b3] bg-blue-50/30' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex gap-4">
                  <div className="mt-0.5">
                    {role.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-bold text-lg ${selectedRole === role.id ? 'text-[#0056b3]' : 'text-gray-900'}`}>
                        {role.title}
                      </h4>
                      {selectedRole === role.id && (
                        <CheckCircle2 className="text-[#0056b3]" size={20} />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        
        {/* Footer */}
        <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-end gap-3 mt-4">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 border border-gray-300 text-gray-700 font-medium text-[15px] hover:bg-gray-50 rounded-full transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 bg-[#0056b3] hover:bg-blue-700 text-white font-medium text-[15px] rounded-full transition-colors shadow-sm"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
