import React, { useState } from 'react';
import { UserPlus, Filter, Download, TrendingUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import EmployeeTable from '../components/EmployeeTable';
import AddEmployeeModal from '../components/AddEmployeeModal';
import DeleteEmployeeModal from '../components/DeleteEmployeeModal';
import EditEmployeeModal from '../components/EditEmployeeModal';

export default function EmployeeManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteEmployeeData, setDeleteEmployeeData] = useState(null);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Header />
        
        <div className="p-8 max-w-6xl">
          {/* Breadcrumbs */}
          <div className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 uppercase">
            Hệ thống <span className="mx-2">&gt;</span> <span className="text-[#0056b3]">Quản lý nhân viên</span>
          </div>

          {/* Page Header */}
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Nhân viên</h1>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-[#0056b3] hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer shadow-sm"
            >
              <UserPlus size={18} />
              Thêm nhân viên mới
            </button>
          </div>

          {/* Filters Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
               <div className="bg-[#f3f4f6] px-4 py-2 rounded-lg text-sm text-gray-600 font-medium flex items-center gap-2 border border-transparent hover:border-gray-300 cursor-pointer transition-colors">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Trạng thái:</span> Tất cả
                  <span className="text-gray-400 text-[10px] ml-1">▼</span>
               </div>
               <div className="bg-[#f3f4f6] px-4 py-2 rounded-lg text-sm text-gray-600 font-medium flex items-center gap-2 border border-transparent hover:border-gray-300 cursor-pointer transition-colors">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Phân quyền:</span> Tất cả quyền
                  <span className="text-gray-400 text-[10px] ml-1">▼</span>
               </div>
            </div>
            <div className="flex gap-4 text-gray-500">
               <button className="hover:text-gray-900 transition-colors"><Filter size={20}/></button>
               <button className="hover:text-gray-900 transition-colors"><Download size={20}/></button>
            </div>
          </div>

          <EmployeeTable 
            refreshTrigger={refreshTrigger} 
            onDelete={(emp) => setDeleteEmployeeData(emp)} 
            onEdit={(emp) => setEditEmployeeData(emp)}
          />

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-6 mt-8">
             <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Tổng số nhân sự</div>
                <div className="flex justify-between items-end">
                   <div className="text-3xl font-bold text-gray-900">24</div>
                   <div className="text-xs font-bold text-green-500">+2 tháng này</div>
                </div>
             </div>
             
             <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Đang trực tuyến</div>
                <div className="flex justify-between items-end">
                   <div className="text-3xl font-bold text-gray-900">08</div>
                   <div className="flex -space-x-2">
                      <img src="https://i.pravatar.cc/150?u=1" className="w-6 h-6 rounded-full border-2 border-white"/>
                      <img src="https://i.pravatar.cc/150?u=2" className="w-6 h-6 rounded-full border-2 border-white"/>
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-800 text-white flex items-center justify-center text-[8px] font-bold">+5</div>
                   </div>
                </div>
             </div>

             <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Hiệu suất mượn trả</div>
                <div className="flex justify-between items-end">
                   <div className="text-3xl font-bold text-gray-900">94%</div>
                   <div className="text-[#0056b3]"><TrendingUp size={20} strokeWidth={2.5}/></div>
                </div>
             </div>

             <div className="rounded-xl p-5 bg-[#004e9c] text-white shadow-sm flex flex-col justify-between">
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-wider mb-2">Phiên bản hệ thống</div>
                <div>
                   <div className="text-2xl font-bold">v1.0</div>
                   <div className="text-[10px] text-blue-200 mt-1">Cập nhật lần cuối: 2h trước</div>
                </div>
             </div>
          </div>
          
        </div>
      </main>

      <AddEmployeeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={handleRefresh} 
      />

      <DeleteEmployeeModal 
        isOpen={!!deleteEmployeeData} 
        onClose={() => setDeleteEmployeeData(null)} 
        onSuccess={handleRefresh}
        employee={deleteEmployeeData}
      />

      <EditEmployeeModal
        isOpen={!!editEmployeeData}
        onClose={() => setEditEmployeeData(null)}
        onSuccess={handleRefresh}
        employee={editEmployeeData}
      />
    </div>
  );
}
