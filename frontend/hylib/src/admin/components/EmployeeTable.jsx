import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit2, Trash2 } from 'lucide-react';

const getRoleBadge = (role) => {
  switch (role) {
    case 'THỦ THƯ':
      return <span className="px-3 py-1 bg-gray-200 text-gray-700 text-[10px] font-bold rounded-full">{role}</span>;
    case 'KỸ THUẬT':
      return <span className="px-3 py-1 bg-gray-200 text-gray-700 text-[10px] font-bold rounded-full">{role}</span>;
    case 'QTV':
      return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">{role}</span>;
    default:
      return <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">{role}</span>;
  }
};

const getStatusToggle = (status) => {
  const isOpen = status === 'ĐANG MỞ';
  return (
    <div className="flex items-center gap-2">
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${isOpen ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        {status}
      </span>
      <div className={`w-8 h-4 rounded-full flex items-center p-0.5 ${isOpen ? 'bg-blue-600' : 'bg-gray-300'}`}>
         <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${isOpen ? 'translate-x-4' : 'translate-x-0'}`}></div>
      </div>
    </div>
  );
}

export default function EmployeeTable({ refreshTrigger, onDelete, onEdit }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch from our new Spring Boot endpoint!
    axios.get('http://localhost:8080/api/v1/employees')
        .then(response => setEmployees(response.data))
        .catch(error => {
            console.error("Error fetching employees:", error);
            // Fallback mock data if backend isn't restarted yet
            setEmployees([
              { id: 1, empCode: '#EMP-2024-001', name: 'Trần Thị Minh', email: 'minh.tran@athenaeum.lib', phone: '090 123 4567', role: 'THỦ THƯ', status: 'ĐANG MỞ' },
              { id: 2, empCode: '#EMP-2024-008', name: 'Nguyễn Hoàng Nam', email: 'nam.nh@athenaeum.lib', phone: '091 987 6543', role: 'KỸ THUẬT', status: 'ĐÃ KHÓA' },
              { id: 3, empCode: '#EMP-2023-142', name: 'Lê Anh Thư', email: 'thu.la@athenaeum.lib', phone: '098 555 1212', role: 'QTV', status: 'ĐANG MỞ' },
              { id: 4, empCode: '#EMP-2024-015', name: 'Phạm Hữu Phước', email: 'phuoc.ph@athenaeum.lib', phone: '093 444 8888', role: 'THỦ THƯ', status: 'ĐANG MỞ' },
            ]);
        });
  }, [refreshTrigger]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-6 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#f8f9fb] border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-4">ID Nhân viên</th>
            <th className="px-6 py-4">Thông tin nhân viên</th>
            <th className="px-6 py-4">Liên hệ</th>
            <th className="px-6 py-4">Phân quyền</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4">Thao tác</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">
              <td className="px-6 py-5 text-gray-500 text-xs font-mono">{emp.empCode}</td>
              <td className="px-6 py-5 flex items-center gap-3">
                 <div>
                    <div className="font-bold text-gray-900">{emp.name}</div>
                    <div className="text-xs text-gray-400">{emp.email}</div>
                 </div>
              </td>
              <td className="px-6 py-5 text-gray-600 text-sm">{emp.phone}</td>
              <td className="px-6 py-5">{getRoleBadge(emp.role)}</td>
              <td className="px-6 py-5">{getStatusToggle(emp.status)}</td>
              <td className="px-6 py-5">
                 <div className="flex gap-3 text-gray-400">
                    <button onClick={() => onEdit(emp)} className="hover:text-blue-600 transition-colors"><Edit2 size={16}/></button>
                    <button onClick={() => onDelete(emp)} className="hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                 </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-[#f8f9fb]">
         <div className="text-xs text-gray-500">Đang hiển thị {employees.length} trên 24 nhân viên</div>
         <div className="flex gap-1 text-sm font-medium">
            <button className="px-3 py-1 text-gray-400 hover:text-gray-900">&lt;</button>
            <button className="w-8 h-8 rounded-full bg-[#0056b3] text-white flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-full text-gray-600 hover:bg-gray-200 flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded-full text-gray-600 hover:bg-gray-200 flex items-center justify-center">3</button>
            <button className="px-3 py-1 text-gray-400 hover:text-gray-900">&gt;</button>
         </div>
      </div>
    </div>
  );
}
