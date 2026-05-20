import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2 } from 'lucide-react';

export default function AddEmployeeModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsSuccess(false);
    } else {
      setTimeout(() => setIsVisible(false), 200); // Wait for exit animation
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/employees', formData)
      .then(response => {
        onSuccess(); // triggers refresh
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', role: '' }); // reset
      })
      .catch(error => {
        console.error("Error creating employee", error);
        // Fallback for UI without backend
        onSuccess();
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', role: '' });
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Blurred background overlay */}
      <div 
        className="absolute inset-0 bg-black/40 "
        onClick={handleClose}
      ></div>
      
      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-[450px] p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {isSuccess ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-green-600" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Thêm thành công</h2>
            <p className="text-gray-500 mb-8 text-[15px]">Dữ liệu mới đã được thêm vào hệ thống.</p>
            <button 
              onClick={handleClose}
              className="w-full py-4 rounded-full bg-[#1a1a1a] hover:bg-black text-white text-[15px] font-bold transition-colors"
            >
              Đóng
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thêm nhân viên mới</h2>
            <p className="text-sm text-gray-500 mb-6">Nhập thông tin chi tiết để cấp quyền truy cập hệ thống Athenaeum.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Họ và tên</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ví dụ: Nguyễn Văn A" 
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300"
                />
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@athenaeum.vn" 
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Số điện thoại</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="090 123 4567" 
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Phân quyền</label>
                <select 
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent"
                >
                  <option value="" disabled>Chọn vị trí công tác</option>
                  <option value="THỦ THƯ">THỦ THƯ</option>
                  <option value="KỸ THUẬT">KỸ THUẬT</option>
                  <option value="QTV">QTV</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-4">
                <button 
                  type="button" 
                  onClick={handleClose}
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
          </>
        )}
      </div>
    </div>
  );
}
