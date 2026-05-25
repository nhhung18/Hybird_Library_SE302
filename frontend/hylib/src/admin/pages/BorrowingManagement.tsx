import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Filter, Globe, Store, ChevronLeft, ChevronRight, Plus, XCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import CreateBorrowRequestModal from '../components/CreateBorrowRequestModal';
import ConfirmReturnModal from '../components/ConfirmReturnModal';
import CancelDetailsModal from '../components/CancelDetailsModal';
import RejectReasonModal from '../components/RejectReasonModal';

interface NewRequest {
  id: string;
  user: string;
  date: string;
  method: string;
  quantity: string;
  books?: any[];
}

interface Borrowing {
  id: string;
  user: string;
  book: string;
  borrowDate: string;
  dueDate: string;
  isOverdue: boolean;
}

interface Returned {
  id: string;
  user: string;
  userCode: string;
  book: string;
  extraBooks: string;
  borrowDate: string;
  returnDate: string;
}

interface Cancelled {
  id: string;
  user: string;
  book: string;
  date: string;
  reason?: string;
}

interface Delivering {
  id: string;
  user: string;
  book: string;
  address: string;
  status: string;
}

export default function BorrowingManagement() {
  const [activeTab, setActiveTab] = useState('Yêu cầu mới');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmReturnOpen, setIsConfirmReturnOpen] = useState(false);
  const [selectedReturnId, setSelectedReturnId] = useState<string | null>(null);
  const [isCancelDetailsOpen, setIsCancelDetailsOpen] = useState(false);
  const [selectedCancelRequest, setSelectedCancelRequest] = useState<any>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRejectRequest, setSelectedRejectRequest] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [delivering, setDelivering] = useState<Delivering[]>([
    { id: 'REQ-1004', user: 'Lê Văn C', book: 'Clean Code', address: '123 Đường A, Quận B, TP.HCM', status: 'Đang giao' }
  ]);

  const tabs = ['Yêu cầu mới', 'Đang mượn', 'Đã trả', 'Đã hủy', 'Đang giao sách'];

  const getFormattedDate = (daysOffset = 0, formatType = 'short', timeStr = '') => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    if (formatType === 'datetime') {
      return `${day}/${month}/${year}, ${timeStr || '08:00'}`;
    } else if (formatType === 'long') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[d.getMonth()]} ${day}, ${year}`;
    }
    return `${day}/${month}/${year}`;
  };

  // State Data
  const [newRequests, setNewRequests] = useState<NewRequest[]>([
    { id: 'BRW-2410-001', user: 'Nguyễn Văn A', date: getFormattedDate(0, 'datetime', '08:30'), method: 'Online', quantity: '3 cuốn' },
    { id: 'BRW-2410-002', user: 'Trần Thị B', date: getFormattedDate(0, 'datetime', '09:15'), method: 'Offline', quantity: '1 cuốn' },
    { id: 'BRW-2410-003', user: 'Lê Văn M', date: getFormattedDate(0, 'datetime', '10:05'), method: 'Online', quantity: '5 cuốn' },
  ]);

  const [borrowing, setBorrowing] = useState<Borrowing[]>([
    { id: '#REQ-2023-001', user: 'Nguyen Van A', book: 'The Great Gatsby', borrowDate: getFormattedDate(-15), dueDate: `${getFormattedDate(-1)} (Quá hạn)`, isOverdue: true },
    { id: '#REQ-2023-045', user: 'Tran Thi B', book: 'Design of Everyday Things', borrowDate: getFormattedDate(-5), dueDate: getFormattedDate(9), isOverdue: false },
    { id: '#REQ-2023-088', user: 'Le Van C', book: 'Sapiens: A Brief History', borrowDate: getFormattedDate(-2), dueDate: getFormattedDate(12), isOverdue: false },
  ]);

  const [returned, setReturned] = useState<Returned[]>([
    { id: '#REQ-8901', user: 'Nguyen Linh', userCode: 'USR-042', book: 'Sapiens: A Brief History...', extraBooks: '+1 more', borrowDate: getFormattedDate(-20, 'long'), returnDate: getFormattedDate(-6, 'long') },
    { id: '#REQ-8895', user: 'Tran Anh', userCode: 'USR-115', book: 'The Design of Everyday...', extraBooks: '', borrowDate: getFormattedDate(-22, 'long'), returnDate: getFormattedDate(-8, 'long') },
    { id: '#REQ-8872', user: 'Minh Hoang', userCode: 'USR-088', book: 'Clean Code: A Handbook...', extraBooks: '+2 more', borrowDate: getFormattedDate(-27, 'long'), returnDate: getFormattedDate(-13, 'long') },
  ]);

  const [cancelled, setCancelled] = useState<Cancelled[]>([
    { id: 'REQ-9012', user: 'Michael Kim', book: 'The Design of Everyday Things', date: getFormattedDate(-2, 'long') },
    { id: 'REQ-9015', user: 'Sarah Jenkins', book: 'Thinking, Fast and Slow', date: getFormattedDate(-3, 'long') },
    { id: 'REQ-9018', user: 'David Park', book: 'Clean Code', date: getFormattedDate(-5, 'long') },
  ]);

  // Handlers
  const handleCreateRequest = (newRequest: any) => {
    setNewRequests([newRequest, ...newRequests]);
  };

  const handleApprove = (request: NewRequest) => {
    setNewRequests(newRequests.filter(r => r.id !== request.id));
    const newBorrowing: Borrowing = {
      id: request.id.replace('BRW', '#REQ'), 
      user: request.user,
      book: request.books ? request.books.map((b: any) => b.title).join(', ') : 'Nhiều sách',
      borrowDate: getFormattedDate(0),
      dueDate: getFormattedDate(14),
      isOverdue: false
    };
    setBorrowing([newBorrowing, ...borrowing]);
  };

  const handleRejectClick = (request: NewRequest) => {
    setSelectedRejectRequest(request);
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = (reason: string) => {
    if (!selectedRejectRequest) return;
    const request = selectedRejectRequest;
    
    setNewRequests(newRequests.filter(r => r.id !== request.id));
    const newCancelled: Cancelled = {
      id: request.id.replace('BRW-', 'REQ-'),
      user: request.user,
      book: request.books ? request.books.map((b: any) => b.title).join(', ') : 'Nhiều sách',
      date: getFormattedDate(0, 'long'),
      reason: reason
    };
    setCancelled([newCancelled, ...cancelled]);
    setIsRejectModalOpen(false);
    setSelectedRejectRequest(null);
  };

  const handleReturnClick = (id: string) => {
    setSelectedReturnId(id);
    setIsConfirmReturnOpen(true);
  };

  const handleConfirmReturn = () => {
    const request = borrowing.find(r => r.id === selectedReturnId);
    if (request) {
      setBorrowing(borrowing.filter(r => r.id !== selectedReturnId));
      const newReturned: Returned = {
        id: request.id,
        user: request.user,
        userCode: 'USR-NEW',
        book: request.book,
        extraBooks: '',
        borrowDate: getFormattedDate(-14, 'long'),
        returnDate: getFormattedDate(0, 'long')
      };
      setReturned([newReturned, ...returned]);
    }
    setIsConfirmReturnOpen(false);
  };

  const handleViewCancelDetails = (request: any) => {
    setSelectedCancelRequest(request);
    setIsCancelDetailsOpen(true);
  };

  const handleToggleDeliveringStatus = (id: string, newStatus: string) => {
    setDelivering(delivering.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const getAvatarInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const filteredData = (data: any[]) => data.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.book && item.book.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderNewRequestsTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead className="sticky top-0 z-10 bg-white shadow-sm">
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ ĐƠN</th>
          <th className="px-6 py-5">NGƯỜI MƯỢN</th>
          <th className="px-6 py-5">NGÀY YÊU CẦU</th>
          <th className="px-6 py-5">HÌNH THỨC</th>
          <th className="px-6 py-5">SỐ LƯỢNG</th>
          <th className="px-6 py-5">TRẠNG THÁI</th>
          <th className="px-6 py-5 text-center">THAO TÁC</th>
        </tr>
      </thead>
      <tbody className="text-[13px] text-gray-700">
        {filteredData(newRequests).length === 0 ? (
          <tr>
            <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
              Không tìm thấy yêu cầu nào.
            </td>
          </tr>
        ) : (
          filteredData(newRequests).map((row, index) => (
            <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
              <td className="px-6 py-6 font-bold text-gray-500">{row.id}</td>
              <td className="px-6 py-6 font-bold text-gray-900">{row.user}</td>
              <td className="px-6 py-6 text-gray-500 font-medium">{row.date}</td>
              <td className="px-6 py-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold bg-white text-gray-700 shadow-sm">
                  {row.method === 'Online' ? <Globe size={14} className="text-gray-500"/> : <Store size={14} className="text-gray-500"/>}
                  {row.method}
                </span>
              </td>
              <td className="px-6 py-6 font-bold text-gray-700">{row.quantity}</td>
              <td className="px-6 py-6">
                <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-blue-50 text-[#0066cc] text-[11px] font-bold border border-blue-200">
                  Yêu cầu mới
                </span>
              </td>
              <td className="px-6 py-6 text-center">
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <button 
                    onClick={() => handleApprove(row)}
                    className="text-green-600 hover:text-green-700 transition-colors"
                    title="Phê duyệt"
                  >
                    <CheckCircle2 size={20} />
                  </button>
                  <button 
                    onClick={() => handleRejectClick(row)}
                    className="hover:text-red-500 transition-colors"
                    title="Từ chối"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const renderBorrowingTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead className="sticky top-0 z-10 bg-white shadow-sm">
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ YÊU CẦU</th>
          <th className="px-6 py-5">ĐỘC GIẢ</th>
          <th className="px-6 py-5">SÁCH</th>
          <th className="px-6 py-5">NGÀY MƯỢN</th>
          <th className="px-6 py-5">HẠN TRẢ</th>
          <th className="px-6 py-5 text-center">THAO TÁC</th>
        </tr>
      </thead>
      <tbody className="text-[13px] text-gray-700">
        {filteredData(borrowing).length === 0 ? (
          <tr>
            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">
              Không tìm thấy sách nào đang mượn.
            </td>
          </tr>
        ) : (
          filteredData(borrowing).map((row, index) => (
            <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
              <td className="px-6 py-6 font-bold text-gray-500">{row.id}</td>
              <td className="px-6 py-6 font-bold text-gray-900">{row.user}</td>
              <td className="px-6 py-6 text-gray-700 font-bold">{row.book}</td>
              <td className="px-6 py-6 text-gray-500 font-medium">{row.borrowDate}</td>
              <td className={`px-6 py-6 font-bold ${row.isOverdue ? 'text-red-600' : 'text-gray-800'}`}>
                {row.dueDate}
              </td>
              <td className="px-6 py-6 text-center">
                <button 
                  onClick={() => handleReturnClick(row.id)}
                  className="text-[#0066cc] hover:text-blue-800 font-bold uppercase text-xs tracking-wider transition-colors hover:underline"
                >
                  TRẢ SÁCH
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const renderReturnedTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead className="sticky top-0 z-10 bg-white shadow-sm">
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ YÊU CẦU</th>
          <th className="px-6 py-5">ĐỘC GIẢ</th>
          <th className="px-6 py-5">SÁCH</th>
          <th className="px-6 py-5">NGÀY MƯỢN</th>
          <th className="px-6 py-5">HẠN TRẢ</th>
          <th className="px-6 py-5 text-center">THAO TÁC</th>
        </tr>
      </thead>
      <tbody className="text-[13px] text-gray-700">
        {filteredData(returned).map((row, index) => (
          <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
            <td className="px-6 py-6 font-bold text-gray-500">{row.id}</td>
            <td className="px-6 py-6">
               <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0 ${index % 3 === 0 ? 'bg-[#0066cc]' : index % 3 === 1 ? 'bg-gray-300 text-gray-700 border border-gray-400' : 'bg-gray-500'}`}>
                     {getAvatarInitials(row.user)}
                  </div>
                  <div>
                     <p className="font-bold text-gray-900">{row.user}</p>
                     <p className="text-[10px] text-gray-400 mt-0.5">{row.userCode}</p>
                  </div>
               </div>
            </td>
            <td className="px-6 py-6">
               <p className="text-gray-800 font-bold">{row.book}</p>
               {row.extraBooks && <p className="text-[10px] text-gray-400 mt-0.5">{row.extraBooks}</p>}
            </td>
            <td className="px-6 py-6 text-gray-500 font-medium">{row.borrowDate}</td>
            <td className="px-6 py-6 text-gray-500 font-medium">{row.returnDate}</td>
            <td className="px-6 py-6 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-700"></span>
                Đã trả
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderCancelledTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead className="sticky top-0 z-10 bg-white shadow-sm">
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ YÊU CẦU</th>
          <th className="px-6 py-5">ĐỘC GIẢ</th>
          <th className="px-6 py-5">SÁCH</th>
          <th className="px-6 py-5">NGÀY MƯỢN</th>
          <th className="px-6 py-5 text-center">TRẠNG THÁI</th>
          <th className="px-6 py-5 text-center">THAO TÁC</th>
        </tr>
      </thead>
      <tbody className="text-[13px] text-gray-700">
        {filteredData(cancelled).map((row, index) => (
          <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
            <td className="px-6 py-6 font-bold text-gray-500">{row.id}</td>
            <td className="px-6 py-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0 shadow-inner">
                     {getAvatarInitials(row.user)}
                  </div>
                  <p className="font-bold text-gray-900">{row.user}</p>
               </div>
            </td>
            <td className="px-6 py-6 text-gray-700 font-bold">{row.book}</td>
            <td className="px-6 py-6 text-gray-500 font-medium">{row.date}</td>
            <td className="px-6 py-6 text-center">
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-bold border border-gray-200">
                Đã hủy
              </span>
            </td>
            <td className="px-6 py-6 text-center">
              <button 
                onClick={() => handleViewCancelDetails(row)}
                className="text-[#0066cc] hover:text-blue-800 font-bold text-sm transition-colors hover:underline"
              >
                Chi tiết
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderDeliveringTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead className="sticky top-0 z-10 bg-white shadow-sm">
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ YÊU CẦU</th>
          <th className="px-6 py-5">ĐỘC GIẢ</th>
          <th className="px-6 py-5">SÁCH</th>
          <th className="px-6 py-5">ĐỊA CHỈ</th>
          <th className="px-6 py-5 text-center">TRẠNG THÁI</th>
        </tr>
      </thead>
      <tbody className="text-[13px] text-gray-700">
        {filteredData(delivering).map((row, index) => (
          <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
            <td className="px-6 py-6 font-bold text-gray-500">{row.id}</td>
            <td className="px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0 shadow-inner">
                  {getAvatarInitials(row.user)}
                </div>
                <p className="font-bold text-gray-900">{row.user}</p>
              </div>
            </td>
            <td className="px-6 py-6 text-gray-700 font-bold">{row.book}</td>
            <td className="px-6 py-6 text-gray-500 font-medium">{row.address}</td>
            
            {/* Status select dropdown */}
            <td className="px-6 py-6 text-center">
              <div className="relative inline-block text-left">
                <select
                  value={row.status}
                  onChange={(e) => handleToggleDeliveringStatus(row.id, e.target.value)}
                  className="appearance-none bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-bold rounded-full px-3 py-1.5 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-yellow-300"
                >
                  <option value="Đang giao">Đang giao</option>
                  <option value="Giao thành công">Giao thành công</option>
                  <option value="Hủy giao">Hủy giao</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <ChevronDown size={14} className="text-yellow-600" />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Quản lý Mượn Trả Sách" />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mượn/Trả Sách</h1>
            
            <div className="flex justify-between items-center mt-4">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[14px] font-bold transition-all relative ${
                      activeTab === tab 
                        ? 'text-[#0066cc]' 
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0066cc] rounded-t-full"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Controls aligned beautifully on the right */}
              <div className="flex items-center gap-3">
                <div className="relative w-60">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-all shadow-sm"
                  />
                </div>
                
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2 rounded-full font-bold text-sm transition-colors shadow-md whitespace-nowrap"
                >
                  <Plus size={18} />
                  Tạo yêu cầu
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
              <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
                 {activeTab === 'Yêu cầu mới' && renderNewRequestsTable()}
                 {activeTab === 'Đang mượn' && renderBorrowingTable()}
                 {activeTab === 'Đã trả' && renderReturnedTable()}
                 {activeTab === 'Đã hủy' && renderCancelledTable()}
                 {activeTab === 'Đang giao sách' && renderDeliveringTable()}
              </div>
            </div>
          </div>
        </div>
      </main>

      <CreateBorrowRequestModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreateRequest} 
      />

      <ConfirmReturnModal 
        isOpen={isConfirmReturnOpen} 
        onClose={() => setIsConfirmReturnOpen(false)} 
        onConfirm={handleConfirmReturn} 
      />

      <CancelDetailsModal
        isOpen={isCancelDetailsOpen}
        onClose={() => setIsCancelDetailsOpen(false)}
        request={selectedCancelRequest}
      />

      <RejectReasonModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleConfirmReject}
      />
    </div>
  );
}
