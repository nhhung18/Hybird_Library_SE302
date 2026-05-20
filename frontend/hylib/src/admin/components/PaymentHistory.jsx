import React from 'react';
import { Calendar, Filter, Download, Bot, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaymentHistory() {
  const historyData = [
    {
      id: 1,
      time: '14:30',
      date: '10 Th10, 2023',
      user: {
        name: 'Nguyễn Tuấn Anh',
        role: 'Quản trị viên',
        isBot: false,
        seed: 'Tuan'
      },
      action: 'Cập nhật',
      actionType: 'update',
      target: 'Biểu phí Trễ hạn',
      details: (
        <span>
          <span className="line-through text-gray-400 mr-2">5,000đ/ngày</span>
          <span className="font-medium text-gray-900">10,000đ/ngày</span>
        </span>
      )
    },
    {
      id: 2,
      time: '09:15',
      date: '09 Th10, 2023',
      user: {
        name: 'Trần Minh Thư',
        role: 'Kế toán trưởng',
        isBot: false,
        seed: 'Thu'
      },
      action: 'Xóa',
      actionType: 'delete',
      target: 'Mã Giảm giá #SUMMER23',
      details: 'Xóa mã giảm giá 20% phí làm thẻ thành viên do hết hạn chiến dịch.'
    },
    {
      id: 3,
      time: '16:45',
      date: '08 Th10, 2023',
      user: {
        name: 'Eleanor Vance',
        role: 'Head Librarian',
        isBot: false,
        seed: 'Eleanor'
      },
      action: 'Tạo mới',
      actionType: 'create',
      target: 'Hóa đơn #HD-9021',
      details: 'Xuất hóa đơn đền bù sách mất cho thành viên Nguyễn Văn C. Giá trị: 250,000đ.'
    },
    {
      id: 4,
      time: '08:00',
      date: '05 Th10, 2023',
      user: {
        name: 'Hệ thống AutoPay',
        role: 'Tự động',
        isBot: true
      },
      action: 'Cập nhật',
      actionType: 'update',
      target: 'Trạng thái Hóa đơn',
      details: 'Hàng loạt (45 hóa đơn): Chuyển từ "Chờ xử lý" sang "Đã quá hạn".'
    }
  ];

  const getActionStyle = (type) => {
    switch (type) {
      case 'update':
      case 'create':
        return 'bg-blue-100 text-blue-700';
      case 'delete':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Calendar size={16} className="text-gray-500" />
            7 Ngày qua
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} className="text-gray-500" />
            Bộ lọc
          </button>
        </div>
        
        <button className="flex items-center gap-2 text-sm font-bold text-[#0056b3] hover:text-blue-800 transition-colors">
          <Download size={16} />
          Xuất báo cáo
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">THỜI GIAN</th>
                <th className="px-6 py-4">NGƯỜI THỰC HIỆN</th>
                <th className="px-6 py-4">HÀNH ĐỘNG</th>
                <th className="px-6 py-4">ĐỐI TƯỢNG</th>
                <th className="px-6 py-4 w-[35%]">CHI TIẾT THAY ĐỔI</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {historyData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 whitespace-nowrap">
                    <p className="font-bold text-gray-900">{item.time}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      {item.user.isBot ? (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                          <Bot size={20} className="text-gray-500" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.user.seed}`} alt={item.user.name} className="w-full h-full object-cover"/>
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900">{item.user.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.user.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-[11px] font-bold ${getActionStyle(item.actionType)}`}>
                      {item.action}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-bold text-gray-900">
                    {item.target}
                  </td>
                  <td className="px-6 py-6 text-gray-600 leading-relaxed">
                    {item.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500 bg-white">
          <span>Hiển thị 1 - 4 của 128 kết quả</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0056b3] text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 font-medium transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 font-medium transition-colors">3</button>
            <span>...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
