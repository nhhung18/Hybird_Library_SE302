import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit2, Trash2, ChevronDown } from 'lucide-react';

interface Employee {
  id: number;
  empCode: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

interface EmployeeTableProps {
  refreshTrigger: number;
  onDelete: (emp: Employee) => void;
  onEdit: (emp: Employee) => void;
  searchQuery: string;
  statusFilter: string;
  roleFilter: string;
}

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'THỦ THƯ':
      return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-full border border-gray-200">{role}</span>;
    case 'KỸ THUẬT':
      return <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-full border border-teal-200">{role}</span>;
    case 'QTV':
      return <span className="px-3 py-1 bg-blue-50 text-[#0066cc] text-[10px] font-bold rounded-full border border-blue-200">{role}</span>;
    default:
      return <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full border border-gray-200">{role}</span>;
  }
};

export default function EmployeeTable({ 
  refreshTrigger, 
  onDelete, 
  onEdit,
  searchQuery,
  statusFilter,
  roleFilter
}: EmployeeTableProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);

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

  const handleToggleStatus = (id: number, newStatus: string) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, status: newStatus } : emp));
  };

  const getStatusStyle = (status: string) => {
    const isOpen = status === 'ĐANG MỞ';
    return isOpen ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200';
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.empCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Tất cả' || emp.status === statusFilter;
    const matchesRole = roleFilter === 'Tất cả' || emp.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col flex-1 shadow-sm overflow-hidden min-h-0">
      <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="sticky top-0 z-10 bg-white shadow-sm">
            <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
              <th className="px-6 py-5">ID Nhân viên</th>
              <th className="px-6 py-5">Thông tin nhân viên</th>
              <th className="px-6 py-5">Liên hệ</th>
              <th className="px-6 py-5">Phân quyền</th>
              <th className="px-6 py-5">Trạng thái</th>
              <th className="px-6 py-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-700">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">
                  Không tìm thấy nhân viên nào.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                  <td className="px-6 py-5 text-gray-400 font-bold">{emp.empCode}</td>
                  <td className="px-6 py-5">
                     <div>
                        <div className="font-bold text-gray-900 mb-0.5">{emp.name}</div>
                        <div className="text-[11px] text-gray-400 font-medium">{emp.email}</div>
                     </div>
                  </td>
                  <td className="px-6 py-5 text-gray-600 font-bold">{emp.phone}</td>
                  <td className="px-6 py-5">{getRoleBadge(emp.role)}</td>
                  
                  {/* Status dropbox select */}
                  <td className="px-6 py-5">
                    <div className="relative inline-block">
                      <select
                        value={emp.status}
                        onChange={(e) => handleToggleStatus(emp.id, e.target.value)}
                        className={`appearance-none outline-none cursor-pointer text-xs font-bold rounded-full px-3 py-1.5 pr-8 border transition-colors ${getStatusStyle(emp.status)}`}
                      >
                        <option value="ĐANG MỞ">ĐANG MỞ</option>
                        <option value="ĐÃ KHÓA">ĐÃ KHÓA</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <ChevronDown size={14} className="text-gray-500" />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                     <div className="flex items-center justify-center gap-4 text-gray-400">
                        <button onClick={() => onEdit(emp)} className="hover:text-gray-600 transition-colors" title="Sửa thông tin"><Edit2 size={18}/></button>
                        <button onClick={() => onDelete(emp)} className="hover:text-red-500 transition-colors" title="Xoá nhân viên"><Trash2 size={18}/></button>
                     </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white shrink-0">
         <div className="text-xs text-gray-500 font-medium">Đang hiển thị {filteredEmployees.length} nhân viên</div>
      </div>
    </div>
  );
}
