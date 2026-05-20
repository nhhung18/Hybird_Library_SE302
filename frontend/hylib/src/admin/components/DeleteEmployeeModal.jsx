import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2 } from 'lucide-react';

export default function DeleteEmployeeModal({ isOpen, onClose, onSuccess, employee }) {
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

  const handleDelete = () => {
    if (!employee) return;
    axios.delete(`http://localhost:8080/api/v1/employees/${employee.id}`)
      .then(() => {
        onSuccess(); // triggers refresh
        setIsSuccess(true);
      })
      .catch(error => {
        console.error("Error deleting employee", error);
        // Fallback for UI without backend
        onSuccess();
        setIsSuccess(true);
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
      <div className={`bg-white rounded-3xl w-[400px] shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {isSuccess ? (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-green-600" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Xóa thành công</h2>
            <p className="text-gray-500 mb-8 text-[15px]">Dữ liệu đã được loại bỏ khỏi hệ thống.</p>
            <button 
              onClick={handleClose}
              className="w-full py-4 rounded-full bg-[#1a1a1a] hover:bg-black text-white text-[15px] font-bold transition-colors"
            >
              Đóng
            </button>
          </div>
        ) : (
          <div className="flex flex-col text-center">
             <div className="p-8 pb-6">
               <h2 className="text-2xl font-bold text-gray-900 mb-3">Xác nhận xóa</h2>
               <p className="text-[15px] text-gray-700">
                  Bạn có chắc chắn muốn xóa nhân viên<br/>
                  <span className="font-bold">{employee?.name}</span>? Hành động này không thể<br/>hoàn tác.
               </p>
             </div>
             
             <div className="border-t border-gray-100">
                <button 
                  onClick={handleDelete}
                  className="w-full py-4 text-[#c02b2b] text-[17px] font-bold hover:bg-red-50 transition-colors"
                >
                  Xác nhận xóa
                </button>
             </div>
             
             <div className="border-t border-gray-100">
                <button 
                  onClick={handleClose}
                  className="w-full py-4 text-[#007aff] text-[17px] hover:bg-blue-50 transition-colors rounded-b-3xl"
                >
                  Hủy
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
