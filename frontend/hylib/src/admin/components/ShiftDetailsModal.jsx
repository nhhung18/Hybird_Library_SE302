import React from 'react';
import { X, Clock, MapPin, Users } from 'lucide-react';

export default function ShiftDetailsModal({ shift, onClose }) {
  if (!shift) return null;

  const getLocationStyle = (loc) => {
    switch(loc) {
      case 'Quầy Lễ tân':
        return 'bg-blue-100 text-blue-800';
      case 'Khu Tự học':
        return 'bg-gray-100 text-gray-800';
      case 'Kho sách':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const dayMap = {
    1: 'Thứ 2',
    2: 'Thứ 3',
    3: 'Thứ 4',
    4: 'Thứ 5',
    5: 'Thứ 6',
    6: 'Thứ 7',
    7: 'Chủ nhật'
  };

  return (
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#f8f9fb]">
          <h2 className="text-lg font-bold text-gray-900">Chi tiết ca làm</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          
          <div className="mb-6">
             <span className={`text-xs font-bold px-3 py-1.5 rounded-md uppercase inline-block mb-3 ${getLocationStyle(shift.location)}`}>
               {shift.location}
             </span>
             <h3 className="text-2xl font-bold text-gray-900 mb-1">{shift.title}</h3>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Clock size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{dayMap[shift.dayOfWeek]}, Ca {shift.timeSlot}</p>
                <p className="text-xs text-gray-500">Thời gian quy định cho ca làm việc</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{shift.location}</p>
                <p className="text-xs text-gray-500">Vị trí làm việc chính thức</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
               <Users size={18} className="text-gray-400" />
               <h4 className="text-sm font-bold text-gray-900">Nhân viên trực ca ({shift.assignedEmployees?.length || 0})</h4>
            </div>
            
            {shift.assignedEmployees && shift.assignedEmployees.length > 0 ? (
               <div className="space-y-3">
                 {shift.assignedEmployees.map((employee, idx) => (
                   <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                     <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden shrink-0 shadow-sm">
                       <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${employee.name}`} alt={employee.name} className="w-full h-full object-cover"/>
                     </div>
                     <div>
                       <p className="text-sm font-bold text-gray-900">{employee.name}</p>
                       <p className="text-xs text-gray-500">{employee.employeeId} • {employee.role}</p>
                     </div>
                   </div>
                 ))}
               </div>
            ) : (
               <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg text-center">Chưa có nhân viên nào được phân công.</p>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
