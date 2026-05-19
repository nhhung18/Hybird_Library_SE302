import React from 'react';
import { Download, Calendar as CalendarIcon } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ReportTable from '../components/ReportTable';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-900">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Header />
        
        <div className="p-8 max-w-6xl">
          {/* Page Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Báo cáo & Thống kê</h1>
              <p className="text-gray-500 text-sm">Theo dõi hiệu quả hoạt động và xu hướng mượn sách.</p>
            </div>
            <button className="flex items-center gap-2 bg-[#0056b3] hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
              <Download size={16} />
              Xuất báo cáo
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
              {['All', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'].map((filter, i) => (
                <button 
                  key={filter} 
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    i === 0 ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm text-xs font-medium text-gray-600">
              <CalendarIcon size={14} className="text-gray-400"/>
              01 Oct, 2023 - 31 Oct, 2023
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-[300px]">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Xu hướng Mượn sách</h3>
                <p className="text-xs text-gray-500">30 ngày qua</p>
              </div>
              <div className="h-32 bg-blue-50/50 rounded-lg relative mt-4 overflow-hidden border border-blue-100/50 flex items-end">
                  {/* Mocking the SVG path exactly from the image */}
                  <svg className="w-full h-full absolute bottom-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <path d="M0,80 C20,60 30,50 50,80 C70,110 80,40 100,50" fill="none" stroke="#0056b3" strokeWidth="3" />
                  </svg>
                  <div className="p-4 relative z-10 w-full text-left pb-2">
                    <span className="text-[#0056b3] font-bold text-sm bg-white/80 px-2 py-1 rounded">+12.4% vs tháng trước</span>
                  </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center h-[300px]">
              <div className="w-full text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Phân loại Thể loại</h3>
                <p className="text-xs text-gray-500">Theo lượt mượn</p>
              </div>
              <div className="flex-1 flex items-center justify-center w-full mt-4">
                 {/* CSS Donut Chart */}
                 <div className="w-32 h-32 rounded-full border-[12px] border-blue-100 relative">
                    <div className="absolute inset-[-12px] rounded-full border-[12px] border-[#0056b3] border-t-transparent border-l-transparent transform rotate-45"></div>
                 </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-[300px]">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Hoạt động Thành viên</h3>
                <p className="text-xs text-gray-500">Đăng ký mới vs Đang hoạt động</p>
              </div>
              <div className="flex items-end justify-around h-32 mt-4 gap-2 px-2">
                {/* Bar Chart Mockup */}
                <div className="flex flex-col gap-1 w-8 items-center justify-end h-full">
                    <div className="w-full bg-gray-200 rounded-t-sm h-[30%]"></div>
                    <div className="w-full bg-blue-100 rounded-b-sm h-[40%]"></div>
                </div>
                <div className="flex flex-col gap-1 w-8 items-center justify-end h-full">
                    <div className="w-full bg-gray-200 rounded-t-sm h-[40%]"></div>
                    <div className="w-full bg-[#0056b3] rounded-b-sm h-[50%]"></div>
                </div>
                <div className="flex flex-col gap-1 w-8 items-center justify-end h-full">
                    <div className="w-full bg-gray-200 rounded-t-sm h-[20%]"></div>
                    <div className="w-full bg-[#0056b3] rounded-b-sm h-[40%]"></div>
                </div>
                <div className="flex flex-col gap-1 w-8 items-center justify-end h-full">
                    <div className="w-full bg-gray-200 rounded-t-sm h-[60%]"></div>
                    <div className="w-full bg-blue-100 rounded-b-sm h-[30%]"></div>
                </div>
              </div>
            </div>
          </div>

          <ReportTable />
          
        </div>
      </main>
    </div>
  );
}
