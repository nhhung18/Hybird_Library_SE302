import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface ShiftRequest {
  id: number;
  requesterName: string;
  requesterInitials: string;
  requesterColor: string;
  substituteName: string;
  oldShift: string;
  newShift: string;
  reason: string;
}

export default function ShiftExchangeRequests() {
  // Mock data matching the screenshot
  const [requests, setRequests] = useState<ShiftRequest[]>([
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
      requesterColor: 'bg-gray-400',
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
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleAction = (id: number) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const filteredRequests = requests.filter(req => 
    req.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.substituteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-6 overflow-hidden flex flex-col h-full shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex justify-between items-center shrink-0">
        <h2 className="text-base font-bold text-gray-900">Yêu cầu Đang chờ Xét duyệt</h2>
        <div className="relative w-64">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm yêu cầu..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-full focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="sticky top-0 z-10 bg-white shadow-sm">
            <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
              <th className="px-6 py-5">Người yêu cầu</th>
              <th className="px-6 py-5">Người nhận thay</th>
              <th className="px-6 py-5">Ca cũ</th>
              <th className="px-6 py-5">Ca mới</th>
              <th className="px-6 py-5">Lý do</th>
              <th className="px-6 py-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-700">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">
                  Không còn yêu cầu đổi ca nào cần xử lý.
                </td>
              </tr>
            ) : (
              filteredRequests.map((req) => (
                <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${req.requesterColor}`}>
                        {req.requesterInitials}
                      </div>
                      <span className="font-bold text-gray-900">{req.requesterName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-bold text-gray-900">{req.substituteName}</td>
                  <td className="px-6 py-5 text-gray-500 font-medium">{req.oldShift}</td>
                  <td className="px-6 py-5 text-gray-500 font-medium">{req.newShift}</td>
                  <td className="px-6 py-5 text-gray-500 font-medium max-w-[150px] truncate" title={req.reason}>
                    {req.reason}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => handleAction(req.id)}
                        className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-4 py-1.5 rounded-full font-bold text-xs transition-colors shadow-sm"
                      >
                        Phê duyệt
                      </button>
                      <button 
                        onClick={() => handleAction(req.id)}
                        className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-1.5 rounded-full font-bold text-xs transition-colors"
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
      <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 bg-white shrink-0">
        <span>Đang hiển thị {filteredRequests.length} yêu cầu</span>
      </div>
    </div>
  );
}
