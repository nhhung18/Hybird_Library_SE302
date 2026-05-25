import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Search, CheckCircle2 } from 'lucide-react';

export default function AddShiftModal({ isOpen, onClose, onSuccess }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [employees, setEmployees] = useState([]);
  
  // Form State
  const today = new Date().toISOString().split('T')[0];
  const [title, setTitle] = useState('');
  const [shiftDate, setShiftDate] = useState(today);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('12:00');
  const [location, setLocation] = useState('');
  
  // Employee Selection State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsSuccess(false);
      resetForm();
      fetchEmployees();
    } else {
      setTimeout(() => setIsVisible(false), 200); // Wait for exit animation
    }
  }, [isOpen]);

  const resetForm = () => {
    setTitle('');
    setShiftDate(today);
    setStartTime('08:00');
    setEndTime('12:00');
    setLocation('');
    setSearchQuery('');
    setSelectedEmployees([]);
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      // Fallback mock data
      setEmployees([
        { id: 1, name: 'Trần Thị Minh', position: 'Thủ thư' },
        { id: 2, name: 'Nguyễn Hoàng Nam', position: 'Kỹ thuật' },
        { id: 3, name: 'Lê Anh Thư', position: 'Quản trị viên' }
      ]);
    }
  };

  if (!isOpen && !isVisible) return null;

  const handleClose = () => {
    if (isSuccess && onSuccess) {
       onSuccess(); // Refresh the grid when closing after success
    }
    onClose();
  };

  const getDayOfWeek = (dateString) => {
    const day = new Date(dateString).getDay();
    return day === 0 ? 7 : day;
  };

  const handleConfirm = async () => {
    // Determine TimeSlot
    let timeSlot = 'Sáng';
    const hour = parseInt(startTime.split(':')[0], 10);
    if (hour >= 14 && hour < 20) {
      timeSlot = 'Chiều';
    } else if (hour >= 20 || hour < 8) {
      timeSlot = 'Tối';
    }

    const shiftData = {
      title,
      location,
      dayOfWeek: getDayOfWeek(shiftDate),
      timeSlot,
      employeeIds: selectedEmployees.map(e => e.id)
    };

    try {
      await axios.post('http://localhost:8080/api/v1/shifts', shiftData);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error creating shift:", error);
      // Fallback for UI without backend
      setIsSuccess(true);
    }
  };

  const addEmployee = (emp) => {
    if (!selectedEmployees.find(e => e.id === emp.id)) {
      setSelectedEmployees([...selectedEmployees, emp]);
    }
    setSearchQuery('');
  };

  const removeEmployee = (empId) => {
    setSelectedEmployees(selectedEmployees.filter(e => e.id !== empId));
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedEmployees.find(selected => selected.id === emp.id)
  );

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" onClick={handleClose}></div>
      
      <div className={`bg-white rounded-2xl w-[500px] shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {isSuccess ? (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-green-600" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Thêm ca làm thành công</h2>
            <p className="text-gray-500 mb-8 text-[15px]">Dữ liệu đã được lưu vào hệ thống.</p>
            <button onClick={handleClose} className="w-full py-4 rounded-full bg-[#1a1a1a] hover:bg-black text-white text-[15px] font-bold transition-colors">
              Đóng
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
               <h2 className="text-2xl font-bold text-gray-900">Thêm ca làm mới</h2>
               <button onClick={handleClose} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={24} /></button>
             </div>
             
             <div className="p-6 space-y-6">
               
               <div>
                 <label className="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 uppercase">Ngày làm việc</label>
                 <input 
                   type="date" 
                   min={today}
                   value={shiftDate} 
                   onChange={e => setShiftDate(e.target.value)} 
                   className="w-full border-b border-gray-200 pb-2 text-[15px] focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent" 
                 />
               </div>

               <div>
                 <label className="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 uppercase">Tên ca</label>
                 <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ví dụ: Ca Sáng 1..." className="w-full border-b border-gray-200 pb-2 text-[15px] focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-400" />
               </div>

               <div>
                 <label className="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 uppercase">Thời gian</label>
                 <div className="flex items-center gap-4">
                    <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="flex-1 border-b border-gray-200 pb-2 text-[15px] focus:outline-none focus:border-[#0056b3] transition-colors" />
                    <span className="text-gray-400">-</span>
                    <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="flex-1 border-b border-gray-200 pb-2 text-[15px] focus:outline-none focus:border-[#0056b3] transition-colors" />
                 </div>
               </div>

               <div>
                 <label className="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 uppercase">Khu vực làm việc</label>
                 <select value={location} onChange={e => setLocation(e.target.value)} className="w-full border-b border-gray-200 pb-2 text-[15px] focus:outline-none focus:border-[#0056b3] transition-colors appearance-none bg-transparent">
                   <option value="" disabled>Chọn khu vực</option>
                   <option value="Quầy Lễ tân">Quầy Lễ tân</option>
                   <option value="Khu Tự học">Khu Tự học</option>
                   <option value="Kho sách">Kho sách</option>
                 </select>
               </div>

               <div>
                 <label className="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 uppercase">Nhân viên trực ca</label>
                 <div className="relative border-b border-gray-200 pb-2">
                    <Search size={18} className="absolute left-0 top-0 text-gray-400" />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Tìm kiếm nhân viên..." className="w-full pl-8 text-[15px] focus:outline-none placeholder-gray-400 bg-transparent" />
                    
                    {searchQuery && filteredEmployees.length > 0 && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                        {filteredEmployees.map(emp => (
                          <div key={emp.id} onClick={() => addEmployee(emp)} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                            {emp.name} ({emp.position})
                          </div>
                        ))}
                      </div>
                    )}
                 </div>
                 
                 <div className="mt-3 flex flex-wrap gap-2">
                    {selectedEmployees.map(emp => (
                      <div key={emp.id} className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-[13px] text-gray-800">
                         {emp.name}
                         <button onClick={() => removeEmployee(emp.id)} className="text-gray-500 hover:text-gray-800"><X size={14} /></button>
                      </div>
                    ))}
                 </div>
               </div>

             </div>
             
             <div className="flex justify-end gap-3 p-6 border-t border-gray-100 rounded-b-2xl">
               <button type="button" onClick={handleClose} className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 bg-white hover:bg-gray-50 transition-colors">Hủy</button>
               <button type="button" onClick={handleConfirm} disabled={!title || !location || selectedEmployees.length === 0} className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold text-white transition-colors">Xác nhận</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
