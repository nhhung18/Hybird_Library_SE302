import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Filter, Globe, Store, ChevronLeft, ChevronRight, Plus, XCircle, CheckCircle2 } from 'lucide-react';
import CreateBorrowRequestModal from '../components/CreateBorrowRequestModal';
import ConfirmReturnModal from '../components/ConfirmReturnModal';
import CancelDetailsModal from '../components/CancelDetailsModal';
import RejectReasonModal from '../components/RejectReasonModal';

export default function BorrowingManagement() {
  const [activeTab, setActiveTab] = useState('Yêu cầu mới');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmReturnOpen, setIsConfirmReturnOpen] = useState(false);
  const [selectedReturnId, setSelectedReturnId] = useState(null);
  const [isCancelDetailsOpen, setIsCancelDetailsOpen] = useState(false);
  const [selectedCancelRequest, setSelectedCancelRequest] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRejectRequest, setSelectedRejectRequest] = useState(null);

  const tabs = ['Yêu cầu mới', 'Đang mượn', 'Đã trả', 'Đã hủy'];

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
  const [newRequests, setNewRequests] = useState([
    { id: 'BRW-2410-001', user: 'Nguyễn Văn A', date: getFormattedDate(0, 'datetime', '08:30'), method: 'Online', quantity: '3 cuốn' },
    { id: 'BRW-2410-002', user: 'Trần Thị B', date: getFormattedDate(0, 'datetime', '09:15'), method: 'Offline', quantity: '1 cuốn' },
    { id: 'BRW-2410-003', user: 'Lê Văn M', date: getFormattedDate(0, 'datetime', '10:05'), method: 'Online', quantity: '5 cuốn' },
  ]);

  const [borrowing, setBorrowing] = useState([
    { id: '#REQ-2023-001', user: 'Nguyen Van A', book: 'The Great Gatsby', borrowDate: getFormattedDate(-15), dueDate: `${getFormattedDate(-1)} (Quá hạn)`, isOverdue: true },
    { id: '#REQ-2023-045', user: 'Tran Thi B', book: 'Design of Everyday Things', borrowDate: getFormattedDate(-5), dueDate: getFormattedDate(9), isOverdue: false },
    { id: '#REQ-2023-088', user: 'Le Van C', book: 'Sapiens: A Brief History', borrowDate: getFormattedDate(-2), dueDate: getFormattedDate(12), isOverdue: false },
  ]);

  const [returned, setReturned] = useState([
    { id: '#REQ-8901', user: 'Nguyen Linh', userCode: 'USR-042', book: 'Sapiens: A Brief History...', extraBooks: '+1 more', borrowDate: getFormattedDate(-20, 'long'), returnDate: getFormattedDate(-6, 'long') },
    { id: '#REQ-8895', user: 'Tran Anh', userCode: 'USR-115', book: 'The Design of Everyday...', extraBooks: '', borrowDate: getFormattedDate(-22, 'long'), returnDate: getFormattedDate(-8, 'long') },
    { id: '#REQ-8872', user: 'Minh Hoang', userCode: 'USR-088', book: 'Clean Code: A Handbook...', extraBooks: '+2 more', borrowDate: getFormattedDate(-27, 'long'), returnDate: getFormattedDate(-13, 'long') },
  ]);

  const [cancelled, setCancelled] = useState([
    { id: 'REQ-9012', user: 'Michael Kim', book: 'The Design of Everyday Things', date: getFormattedDate(-2, 'long') },
    { id: 'REQ-9015', user: 'Sarah Jenkins', book: 'Thinking, Fast and Slow', date: getFormattedDate(-3, 'long') },
    { id: 'REQ-9018', user: 'David Park', book: 'Clean Code', date: getFormattedDate(-5, 'long') },
  ]);

  // Handlers
  const handleCreateRequest = (newRequest) => {
    setNewRequests([newRequest, ...newRequests]);
  };

  const handleApprove = (request) => {
    setNewRequests(newRequests.filter(r => r.id !== request.id));
    const newBorrowing = {
      id: request.id.replace('BRW', '#REQ'), 
      user: request.user,
      book: request.books ? request.books.map(b => b.title).join(', ') : 'Nhiều sách',
      borrowDate: getFormattedDate(0),
      dueDate: getFormattedDate(14),
      isOverdue: false
    };
    setBorrowing([newBorrowing, ...borrowing]);
  };

  const handleRejectClick = (request) => {
    setSelectedRejectRequest(request);
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = (reason) => {
    if (!selectedRejectRequest) return;
    const request = selectedRejectRequest;
    
    setNewRequests(newRequests.filter(r => r.id !== request.id));
    const newCancelled = {
      id: request.id.replace('BRW-', 'REQ-'),
      user: request.user,
      book: request.books ? request.books.map(b => b.title).join(', ') : 'Nhiều sách',
      date: getFormattedDate(0, 'long'),
      reason: reason
    };
    setCancelled([newCancelled, ...cancelled]);
    setIsRejectModalOpen(false);
    setSelectedRejectRequest(null);
  };

  const handleReturnClick = (id) => {
    setSelectedReturnId(id);
    setIsConfirmReturnOpen(true);
  };

  const handleConfirmReturn = () => {
    const request = borrowing.find(r => r.id === selectedReturnId);
    if (request) {
      setBorrowing(borrowing.filter(r => r.id !== selectedReturnId));
      const newReturned = {
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

  const handleViewCancelDetails = (request) => {
    setSelectedCancelRequest(request);
    setIsCancelDetailsOpen(true);
  };

  const getAvatarInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const renderNewRequestsTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead>
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
      <tbody className="text-[14px] text-gray-700">
        {newRequests.length === 0 && (
          <tr>
            <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
              Không có yêu cầu mới nào.
            </td>
          </tr>
        )}
        {newRequests.map((row, index) => (
          <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
            <td className="px-6 py-6 font-bold text-gray-900">{row.id}</td>
            <td className="px-6 py-6 font-medium text-gray-800">{row.user}</td>
            <td className="px-6 py-6 text-gray-600">{row.date}</td>
            <td className="px-6 py-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 text-xs font-medium bg-white text-gray-700">
                {row.method === 'Online' ? <Globe size={14} className="text-gray-500"/> : <Store size={14} className="text-gray-500"/>}
                {row.method}
              </span>
            </td>
            <td className="px-6 py-6 font-medium text-gray-700">{row.quantity}</td>
            <td className="px-6 py-6">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e6f0fa] text-[#0056b3] text-[11px] font-bold text-center leading-tight">
                Yêu<br/>cầu<br/>mới
              </span>
            </td>
            <td className="px-6 py-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <button 
                  onClick={() => handleApprove(row)}
                  className="text-green-500 hover:text-green-600 transition-colors p-1.5 rounded-full hover:bg-green-50"
                  title="Phê duyệt"
                >
                  <CheckCircle2 size={22} />
                </button>
                <button 
                  onClick={() => handleRejectClick(row)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50"
                  title="Từ chối"
                >
                  <XCircle size={22} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderBorrowingTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead>
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ YÊU CẦU</th>
          <th className="px-6 py-5">ĐỘC GIẢ</th>
          <th className="px-6 py-5">SÁCH</th>
          <th className="px-6 py-5">NGÀY MƯỢN</th>
          <th className="px-6 py-5">HẠN TRẢ</th>
          <th className="px-6 py-5 text-center">THAO TÁC</th>
        </tr>
      </thead>
      <tbody className="text-[14px] text-gray-700">
        {borrowing.length === 0 && (
          <tr>
            <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
              Không có sách nào đang được mượn.
            </td>
          </tr>
        )}
        {borrowing.map((row, index) => (
          <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
            <td className="px-6 py-6 font-bold text-gray-900">{row.id}</td>
            <td className="px-6 py-6 font-medium text-gray-800">{row.user}</td>
            <td className="px-6 py-6 text-gray-700 font-medium">{row.book}</td>
            <td className="px-6 py-6 text-gray-600">{row.borrowDate}</td>
            <td className={`px-6 py-6 font-bold ${row.isOverdue ? 'text-red-600' : 'text-gray-800'}`}>
              {row.dueDate}
            </td>
            <td className="px-6 py-6 text-center">
              <button 
                onClick={() => handleReturnClick(row.id)}
                className="text-[#0056b3] hover:text-blue-800 font-bold uppercase text-xs tracking-wider transition-colors hover:underline"
              >
                TRẢ SÁCH
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderReturnedTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead>
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ YÊU CẦU</th>
          <th className="px-6 py-5">ĐỘC GIẢ</th>
          <th className="px-6 py-5">SÁCH</th>
          <th className="px-6 py-5">NGÀY MƯỢN</th>
          <th className="px-6 py-5">HẠN TRẢ</th>
          <th className="px-6 py-5 text-center">THAO TÁC</th>
        </tr>
      </thead>
      <tbody className="text-[14px] text-gray-700">
        {returned.map((row, index) => (
          <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
            <td className="px-6 py-6 font-bold text-gray-900">{row.id}</td>
            <td className="px-6 py-6">
               <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${index % 3 === 0 ? 'bg-[#0056b3]' : index % 3 === 1 ? 'bg-gray-300 text-gray-700' : 'bg-gray-500'}`}>
                     {getAvatarInitials(row.user)}
                  </div>
                  <div>
                     <p className="font-bold text-gray-900">{row.user}</p>
                     <p className="text-[11px] text-gray-500 mt-0.5">{row.userCode}</p>
                  </div>
               </div>
            </td>
            <td className="px-6 py-6">
               <p className="text-gray-800 font-medium">{row.book}</p>
               {row.extraBooks && <p className="text-[11px] text-gray-400 mt-0.5">{row.extraBooks}</p>}
            </td>
            <td className="px-6 py-6 text-gray-600">{row.borrowDate}</td>
            <td className="px-6 py-6 text-gray-600">{row.returnDate}</td>
            <td className="px-6 py-6 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-xs font-bold border border-[#c8e6c9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></span>
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
      <thead>
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ YÊU CẦU</th>
          <th className="px-6 py-5">ĐỘC GIẢ</th>
          <th className="px-6 py-5">SÁCH</th>
          <th className="px-6 py-5">NGÀY MƯỢN</th>
          <th className="px-6 py-5 text-center">HẠN TRẢ</th>
          <th className="px-6 py-5 text-center">THAO TÁC</th>
        </tr>
      </thead>
      <tbody className="text-[14px] text-gray-700">
        {cancelled.map((row, index) => (
          <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
            <td className="px-6 py-6 font-bold text-gray-900">{row.id}</td>
            <td className="px-6 py-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0">
                     {getAvatarInitials(row.user)}
                  </div>
                  <p className="font-bold text-gray-800">{row.user}</p>
               </div>
            </td>
            <td className="px-6 py-6 text-gray-700 font-medium">{row.book}</td>
            <td className="px-6 py-6 text-gray-600">{row.date}</td>
            <td className="px-6 py-6 text-center">
              <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold border border-gray-200">
                Đã hủy
              </span>
            </td>
            <td className="px-6 py-6 text-center">
              <button 
                onClick={() => handleViewCancelDetails(row)}
                className="text-[#0056b3] hover:text-blue-800 font-bold text-sm transition-colors hover:underline"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="flex h-screen bg-[#f8f9fb]">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Header />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header & Tabs */}
          <div className="mb-6 shrink-0 relative">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Mượn/Trả Sách</h1>
                <p className="text-gray-500 mb-8">Quản lý các yêu cầu mượn và trả sách của thư viện.</p>
              </div>
              
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 bg-[#0056b3] hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-colors shadow-sm"
              >
                <Plus size={18} />
                Tạo yêu cầu
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[15px] font-bold transition-all relative ${
                    activeTab === tab 
                      ? 'text-[#0056b3]' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0056b3] rounded-t-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0 pt-2">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full shadow-sm p-2">
              
              {/* Search & Filter Bar */}
              <div className="p-4 flex justify-between items-center bg-white border-b border-gray-50">
                <div className="relative w-[400px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm mã đơn, người mượn..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 transition-shadow text-gray-700"
                  />
                </div>
                
                <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  <Filter size={16} className="text-gray-500" />
                  Lọc
                </button>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto flex-1">
                 {activeTab === 'Yêu cầu mới' && renderNewRequestsTable()}
                 {activeTab === 'Đang mượn' && renderBorrowingTable()}
                 {activeTab === 'Đã trả' && renderReturnedTable()}
                 {activeTab === 'Đã hủy' && renderCancelledTable()}
              </div>

              {/* Pagination */}
              <div className="p-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 bg-white">
                <button className="flex items-center gap-1.5 hover:text-gray-800 transition-colors font-medium">
                   <ChevronLeft size={16} />
                   Previous
                </button>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0056b3] text-white font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 font-medium transition-colors">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 font-medium transition-colors">3</button>
                  <span className="px-2">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 font-medium transition-colors">15</button>
                </div>
                <button className="flex items-center gap-1.5 hover:text-gray-800 transition-colors font-medium">
                   Next
                   <ChevronRight size={16} />
                </button>
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
