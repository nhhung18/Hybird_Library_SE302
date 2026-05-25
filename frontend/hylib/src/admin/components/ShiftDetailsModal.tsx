import React, { useEffect, useState } from 'react';
import { X, Clock, MapPin, Users } from 'lucide-react';

interface ShiftDetailsModalProps {
  shift: any;
  onClose: () => void;
}

export default function ShiftDetailsModal({ shift, onClose }: ShiftDetailsModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (shift) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [shift]);

  if (!shift && !isVisible) return null;

  const getLocationStyle = (loc: string) => {
    switch(loc) {
      case 'Quầy Lễ tân':
        return 'bg-blue-50 text-blue-800 border border-blue-100';
      case 'Khu Tự học':
        return 'bg-gray-50 text-gray-800 border border-gray-100';
      case 'Kho sách':
        return 'bg-gray-50 text-gray-800 border border-gray-100';
      default:
        return 'bg-gray-50 text-gray-800 border border-gray-100';
    }
  };

  const dayMap: { [key: number]: string } = {
    1: 'Thứ 2',
    2: 'Thứ 3',
    3: 'Thứ 4',
    4: 'Thứ 5',
    5: 'Thứ 6',
    6: 'Thứ 7',
    7: 'Chủ nhật'
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${shift ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans p-4`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-full max-w-md shadow-2xl relative transition-all duration-300 ease-out transform ${shift ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
          <h2 className="text-[20px] font-bold text-gray-900">Chi tiết ca làm</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6 overflow-y-auto max-h-[60vh] bg-white">
          <div>
            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase inline-block mb-3 ${getLocationStyle(shift?.location)}`}>
              {shift?.location}
            </span>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{shift?.title}</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Clock size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{dayMap[shift?.dayOfWeek || 1]}, Ca {shift?.timeSlot}</p>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Thời gian quy định cho ca làm việc</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{shift?.location}</p>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Vị trí làm việc chính thức</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
               <Users size={16} className="text-gray-400" />
               <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Nhân viên trực ca ({shift?.assignedEmployees?.length || 0})</h4>
            </div>
            
            {shift?.assignedEmployees && shift.assignedEmployees.length > 0 ? (
               <div className="space-y-3">
                 {shift.assignedEmployees.map((employee: any, idx: number) => (
                   <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-gray-50/50">
                     <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white overflow-hidden shrink-0 shadow-sm">
                       <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${employee.name}`} alt={employee.name} className="w-full h-full object-cover"/>
                     </div>
                     <div>
                       <p className="text-sm font-bold text-gray-950">{employee.name}</p>
                       <p className="text-[11px] text-gray-400 font-semibold">{employee.employeeId} • {employee.role}</p>
                     </div>
                   </div>
                 ))}
               </div>
            ) : (
               <p className="text-xs text-gray-400 font-semibold italic bg-gray-50/50 p-4 rounded-2xl text-center border border-gray-100/60">Chưa có nhân viên nào được phân công.</p>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#0056b3] hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
