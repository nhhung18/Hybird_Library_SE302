import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2, X } from 'lucide-react';

export default function EditEmployeeModal({ isOpen, onClose, onSuccess, employee }) {
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
      if (employee) {
        setFormData({
          name: employee.name || '',
          email: employee.email || '',
          phone: employee.phone || '',
          role: employee.role || ''
        });
      }
    } else {
      setTimeout(() => setIsVisible(false), 200); // Wait for exit animation
    }
  }, [isOpen, employee]);

  if (!isOpen && !isVisible) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee) return;
    
    axios.put(`http://localhost:8080/api/v1/employees/${employee.id}`, formData)
      .then(response => {
        onSuccess(); // triggers refresh
        setIsSuccess(true);
      })
      .catch(error => console.error("Error updating employee", error));
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Blurred background overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Modal Container */}
      <div className={`bg-white rounded-2xl w-[500px] shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {isSuccess ? (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-green-600" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Chỉnh sửa thành công</h2>
            <p className="text-gray-500 mb-8 text-[15px]">Dữ liệu đã được lưu vào hệ thống.</p>
            <button 
              onClick={handleClose}
              className="w-full py-4 rounded-full bg-[#1a1a1a] hover:bg-black text-white text-[15px] font-bold transition-colors"
            >
              Đóng
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
               <h2 className="text-2xl font-bold text-gray-900">Chỉnh sửa thông tin nhân viên</h2>
               <button onClick={handleClose} className="text-gray-400 hover:text-gray-900 transition-colors">
                 <X size={24} />
               </button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-8">
               <div>
                 <label className="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 uppercase">Họ và tên</label>
                 <input 
                   type="text" 
                   name="name"
                   required
                   value={formData.name}
                   onChange={handleChange}
                   className="w-full border-b border-gray-200 pb-2 text-[15px] focus:outline-none focus:border-[#0056b3] transition-colors"
                 />
               </div>

               <div>
                 <label className="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 uppercase">Email</label>
                 <input 
                   type="email" 
                   name="email"
                   required
                   value={formData.email}
                   onChange={handleChange}
                   className="w-full border-b border-gray-200 pb-2 text-[15px] focus:outline-none focus:border-[#0056b3] transition-colors"
                 />
               </div>

               <div>
                 <label className="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 uppercase">Số điện thoại</label>
                 <input 
                   type="tel" 
                   name="phone"
                   required
                   value={formData.phone}
                   onChange={handleChange}
                   className="w-full border-b border-gray-200 pb-2 text-[15px] focus:outline-none focus:border-[#0056b3] transition-colors"
                 />
               </div>

               <div>
                 <label className="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 uppercase">Phân quyền</label>
                 <select 
                   name="role"
                   required
                   value={formData.role}
                   onChange={handleChange}
                   className="w-full border-b border-gray-200 pb-2 text-[15px] focus:outline-none focus:border-[#0056b3] transition-colors appearance-none bg-transparent"
                 >
                   <option value="THỦ THƯ">Thủ thư</option>
                   <option value="KỸ THUẬT">Kỹ thuật</option>
                   <option value="QTV">QTV</option>
                 </select>
               </div>

               <div className="flex justify-end gap-3 pt-4 bg-[#f8f9fb] -mx-6 -mb-6 px-6 py-5 border-t border-gray-100 rounded-b-2xl">
                 <button 
                   type="button" 
                   onClick={handleClose}
                   className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 bg-white hover:bg-gray-50 transition-colors"
                 >
                   HỦY
                 </button>
                 <button 
                   type="submit" 
                   className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors"
                 >
                   LƯU THAY ĐỔI
                 </button>
               </div>
             </form>
          </div>
        )}
      </div>
    </div>
  );
}
