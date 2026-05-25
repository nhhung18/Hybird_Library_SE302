import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Globe, Book, Library, CheckCircle, Clock, 
  ArrowUpRight, TrendingUp, Calendar, AlertTriangle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Dashboard() {
  // Read state dynamically from local storage or use defaults
  const [metrics, setMetrics] = useState({
    totalUsers: 124,
    totalBooks: 245,
    ebookBorrows: 85,
    paperBorrows: 160,
    currentlyBorrowed: 34,
    returnedBooks: 211,
    nearingDeadline: 5
  });

  useEffect(() => {
    try {
      const savedCards = localStorage.getItem('membershipCards');
      const savedBooks = localStorage.getItem('libraryBooks');
      
      const cardsCount = savedCards ? JSON.parse(savedCards).length : 124;
      const booksCount = savedBooks ? JSON.parse(savedBooks).reduce((sum: number, b: any) => sum + (b.stock || 0), 0) : 245;

      setMetrics(prev => ({
        ...prev,
        totalUsers: cardsCount,
        totalBooks: booksCount
      }));
    } catch (e) {
      console.error("Error reading localStorage in Dashboard:", e);
    }
  }, []);

  const cardData = [
    {
      title: "Tổng số người dùng",
      value: metrics.totalUsers,
      change: "+12% tháng này",
      isPositive: true,
      icon: <Users className="text-[#0066cc]" size={22} />,
      bgColor: "bg-blue-50/50 border-blue-100",
      textColor: "text-[#0066cc]"
    },
    {
      title: "Tổng số sách hiện có",
      value: metrics.totalBooks,
      change: "+8 sách mới tuần này",
      isPositive: true,
      icon: <BookOpen className="text-[#2e7d32]" size={22} />,
      bgColor: "bg-green-50/50 border-green-100",
      textColor: "text-[#2e7d32]"
    },
    {
      title: "Sách mượn hình thức Ebook",
      value: metrics.ebookBorrows,
      change: "Chiếm 35% tổng số",
      isPositive: true,
      icon: <Globe className="text-[#008080]" size={22} />,
      bgColor: "bg-teal-50/50 border-teal-100",
      textColor: "text-[#008080]"
    },
    {
      title: "Sách mượn hình thức Sách giấy",
      value: metrics.paperBorrows,
      change: "Chiếm 65% tổng số",
      isPositive: true,
      icon: <Book className="text-[#8e24aa]" size={22} />,
      bgColor: "bg-purple-50/50 border-purple-100",
      textColor: "text-[#8e24aa]"
    },
    {
      title: "Sách đang cho mượn",
      value: metrics.currentlyBorrowed,
      change: "Đang lưu hành bên ngoài",
      isPositive: null,
      icon: <Library className="text-[#ef6c00]" size={22} />,
      bgColor: "bg-orange-50/50 border-orange-100",
      textColor: "text-[#ef6c00]"
    },
    {
      title: "Sách đã trả",
      value: metrics.returnedBooks,
      change: "Tỷ lệ trả đúng hạn 96%",
      isPositive: true,
      icon: <CheckCircle className="text-[#2e7d32]" size={22} />,
      bgColor: "bg-green-50/50 border-green-100",
      textColor: "text-[#2e7d32]"
    },
    {
      title: "Sách sắp đến hạn trả",
      value: metrics.nearingDeadline,
      change: "Cần gửi thông báo nhắc nhở",
      isPositive: false,
      icon: <Clock className="text-[#c62828]" size={22} />,
      bgColor: "bg-red-50/50 border-red-100",
      textColor: "text-[#c62828]"
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb] font-sans text-gray-900">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Tổng quan hệ thống" />
        
        <div className="p-8 flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 overflow-y-auto custom-scrollbar">
          {/* Dashboard Title & Welcome */}
          <div className="flex justify-between items-center shrink-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-display mb-1">Hệ thống Thống kê</h1>
              <p className="text-sm text-gray-500 font-medium">Báo cáo trực quan các hoạt động thư viện thời gian thực.</p>
            </div>
            
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm">
              <Calendar size={14} className="text-gray-400" />
              <span>Hôm nay: {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Grid Layout for Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
              >
                {/* Background decorative soft color */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full ${card.bgColor} translate-x-8 -translate-y-8 opacity-20 group-hover:scale-110 transition-transform duration-300`} />
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{card.title}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.bgColor} shadow-inner`}>
                    {card.icon}
                  </div>
                </div>

                <div className="flex items-baseline gap-2 relative z-10 mb-2">
                  <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{card.value}</span>
                  {card.isPositive !== null && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {card.isPositive ? '↑' : '↓'}
                    </span>
                  )}
                </div>

                <div className="text-[12px] font-medium text-gray-500 relative z-10">
                  {card.change}
                </div>
              </div>
            ))}
          </div>

          {/* Additional visual insights for SaaS aesthetic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[300px]">
            <div className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between lg:col-span-2">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Hiệu suất Hoạt động Tuần này</h3>
                <p className="text-xs text-gray-400 font-medium">Phân tích lượt mượn trả theo thời gian thực.</p>
              </div>
              <div className="h-48 flex items-end justify-between px-4 mt-6 border-b border-gray-100 pb-2">
                {[65, 80, 45, 95, 70, 110, 85].map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 w-8 group">
                    <div 
                      className="w-full bg-[#0066cc]/90 group-hover:bg-[#0066cc] rounded-t-md transition-all duration-300 relative cursor-pointer"
                      style={{ height: `${val * 1.2}px` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold py-1 px-2 rounded whitespace-nowrap transition-all shadow-md">
                        {val} lượt
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Th {idx + 2}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Cảnh báo Quá hạn</h3>
                <p className="text-xs text-gray-400 font-medium">Danh sách các lượt trễ hạn nghiêm trọng.</p>
              </div>
              <div className="space-y-4 my-6 flex-1 overflow-y-auto max-h-[160px] custom-scrollbar pr-1">
                <div className="flex gap-3 items-start border-l-4 border-red-500 pl-3">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">#REQ-2023-001 (Nguyễn Văn A)</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Sách: The Great Gatsby</p>
                    <p className="text-[10px] text-red-600 font-bold mt-1 flex items-center gap-1">
                      <AlertTriangle size={10} /> Quá hạn 2 ngày
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start border-l-4 border-amber-500 pl-3">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">#REQ-2023-112 (Trần Thị B)</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Sách: Design of Everyday Things</p>
                    <p className="text-[10px] text-amber-600 font-bold mt-1 flex items-center gap-1">
                      <Clock size={10} /> Hết hạn ngày mai
                    </p>
                  </div>
                </div>
              </div>
              <button className="w-full text-center text-xs font-bold text-[#0066cc] bg-blue-50/50 hover:bg-blue-50 py-2.5 rounded-xl border border-blue-100 transition-colors">
                Xem tất cả yêu cầu trễ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
