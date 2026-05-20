import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ShiftExchangeRequests() {
  // Mock data matching the screenshot
  const [requests, setRequests] = useState([
    {
      id: 1,
      requesterName: 'Nguyễn Văn A',
      requesterInitials: 'NT',
      requesterColor: 'bg-blue-600',
      substituteName: 'Trần Thị B',
      oldShift: 'Sáng - T2, 10/10',
      newShift: 'Chiều - T3, 11/10',
      reason: 'Bận việc gia đình đột xuất'
    },
    {
      id: 2,
      requesterName: 'Lê Hoàng M',
      requesterInitials: 'LM',
      requesterColor: 'bg-gray-300',
      substituteName: 'Phạm Văn C',
      oldShift: 'Tối - T4, 12/10',
      newShift: 'Sáng - T5, 13/10',
      reason: 'Lịch học bù trên trường'
    },
    {
      id: 3,
      requesterName: 'Hoàng Thu T',
      requesterInitials: 'HT',
      requesterColor: 'bg-gray-500',
      substituteName: 'Đặng Văn D',
      oldShift: 'Chiều - T6, 14/10',
      newShift: 'Tối - T7, 15/10',
      reason: 'Đi khám sức khỏe định kỳ'
    },
    {
      id: 4,
      requesterName: 'Vũ Kim K',
      requesterInitials: 'VK',
      requesterColor: 'bg-red-200 text-red-800',
      substituteName: 'Bùi Thị E',
      oldShift: 'Sáng - CN, 16/10',
      newShift: 'Chiều - T2, 17/10',
      reason: 'Xe hỏng cần đi sửa'
    }
  ]);

  const handleAction = (id) => {
    // Remove the row when approved or rejected
    setRequests(requests.filter(req => req.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-6 overflow-hidden flex flex-col h-full shadow-sm">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Pending Requests</h2>
        <div className="relative w-72">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search requests..." 
            className="w-full pl-10 pr-4 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-5">Người yêu cầu</th>
              <th className="px-6 py-5">Người nhận thay</th>
              <th className="px-6 py-5">Ca cũ</th>
              <th className="px-6 py-5">Ca mới</th>
              <th className="px-6 py-5">Lý do</th>
              <th className="px-6 py-5">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-700">
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Không còn yêu cầu nào.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${req.requesterColor}`}>
                        {req.requesterInitials}
                      </div>
                      {req.requesterName}
                    </div>
                  </td>
                  <td className="px-6 py-5">{req.substituteName}</td>
                  <td className="px-6 py-5 text-gray-500">{req.oldShift}</td>
                  <td className="px-6 py-5 text-gray-500">{req.newShift}</td>
                  <td className="px-6 py-5 text-gray-500 max-w-[150px] truncate" title={req.reason}>
                    {req.reason}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleAction(req.id)}
                        className="bg-[#0056b3] hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors"
                      >
                        Phê duyệt
                      </button>
                      <button 
                        onClick={() => handleAction(req.id)}
                        className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2 rounded-full font-medium transition-colors"
                      >
                        Từ chối
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500 bg-white">
        <span>Showing {requests.length} requests</span>
        <div className="flex gap-2">
          <button className="p-1 hover:text-gray-900 transition-colors cursor-pointer"><ChevronLeft size={18} /></button>
          <button className="p-1 hover:text-gray-900 transition-colors cursor-pointer"><ChevronRight size={18} /></button>
        </div>
      </div>

    </div>
  );
}
