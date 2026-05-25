import React, { useState, useEffect } from 'react';
import { User, BookOpen, Star, CheckCircle2 } from 'lucide-react';

interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (user: any) => void;
}

export default function UpdateRoleModal({ isOpen, onClose, user, onSave }: UpdateRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState('Reader');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      if (user.type === 'Khách') setSelectedRole('Guest');
      else if (user.type === 'VIP') setSelectedRole('VIP');
      else setSelectedRole('Reader');
    }
  }, [user, isOpen]);

  if (!isOpen && !isVisible) return null;

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
      description: 'Quyền truy cập hạn chế, chỉ xem danh mục công khai.',
      icon: <User size={18} className={selectedRole === 'Guest' ? "text-[#0066cc]" : "text-gray-400"} />
    },
    {
      id: 'Reader',
      title: 'Reader',
      description: 'Mượn sách cơ bản, sử dụng phòng đọc chung thư viện.',
      icon: <BookOpen size={18} className={selectedRole === 'Reader' ? "text-[#0066cc]" : "text-gray-400"} />
    },
    {
      id: 'VIP',
      title: 'VIP',
      description: 'Phòng đọc riêng tư và mượn sách không giới hạn.',
      icon: <Star size={18} className={selectedRole === 'VIP' ? "text-[#0066cc]" : "text-gray-400"} />
    }
  ];

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-[450px] p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cập nhật quyền hạn</h2>
        <p className="text-sm text-gray-500 mb-6">Thay đổi nhóm quyền người dùng cho {user?.name}.</p>

        <div className="space-y-6">
          {/* Current Group Info */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex justify-between items-center shadow-inner">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">{user?.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
            </div>
            <span className="text-xs font-bold text-[#0066cc] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              {user?.type}
            </span>
          </div>

          {/* Roles list */}
          <div className="space-y-3">
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase">Nhóm quyền mới</label>
            <div className="space-y-2">
              {roles.map((role) => (
                <div 
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`border rounded-2xl p-4 cursor-pointer transition-all flex gap-4 items-start ${
                    selectedRole === role.id 
                      ? 'border-[#0066cc] bg-[#e6f0fa]/40' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="mt-1">
                    {role.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className={`font-bold text-sm ${selectedRole === role.id ? 'text-[#0066cc]' : 'text-gray-800'}`}>
                        {role.title}
                      </h4>
                      {selectedRole === role.id && (
                        <CheckCircle2 className="text-[#0066cc]" size={16} />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 font-semibold mt-0.5 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
              type="button"
              onClick={handleSave} 
              className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-sm"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
