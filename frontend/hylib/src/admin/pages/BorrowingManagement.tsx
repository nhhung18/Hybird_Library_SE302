import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Globe, Store, CheckCircle2, XCircle, ChevronDown, Plus } from 'lucide-react';
import CreateBorrowRequestModal from '../components/CreateBorrowRequestModal';
import ConfirmReturnModal from '../components/ConfirmReturnModal';
import CancelDetailsModal from '../components/CancelDetailsModal';
import RejectReasonModal from '../components/RejectReasonModal';
import { BorrowRecord, ApprovalStatus, BorrowStatus, ReceiveMethod, ShipmentStatus, Shipment } from '../../types';
import { borrowApi } from '../../api/borrowApi';
import { shipmentApi } from '../../api/shipmentApi';

export default function BorrowingManagement() {
  const [activeTab, setActiveTab] = useState('Yêu cầu mới');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmReturnOpen, setIsConfirmReturnOpen] = useState(false);
  const [selectedReturnId, setSelectedReturnId] = useState<number | null>(null);
  const [isCancelDetailsOpen, setIsCancelDetailsOpen] = useState(false);
  const [selectedCancelRequest, setSelectedCancelRequest] = useState<BorrowRecord | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRejectRequest, setSelectedRejectRequest] = useState<BorrowRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [records, setRecords] = useState<BorrowRecord[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);

  const tabs = ['Yêu cầu mới', 'Đang mượn', 'Đã trả', 'Đã hủy', 'Đang giao sách'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [borrowResponse, shipmentResponse] = await Promise.all([
        borrowApi.getAllBorrowRecords(),
        shipmentApi.getAllShipments()
      ]);
      setRecords(Array.isArray(borrowResponse) ? borrowResponse : []);
      setShipments(Array.isArray(shipmentResponse) ? shipmentResponse : []);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const newRequests = records.filter(r => r.approvalStatus === ApprovalStatus.PENDING);
  const borrowing = records.filter(r => r.approvalStatus === ApprovalStatus.APPROVED && (r.borrowStatus === BorrowStatus.BORROWING || r.borrowStatus === BorrowStatus.OVERDUE));
  const returned = records.filter(r => r.borrowStatus === BorrowStatus.RETURNED || r.borrowStatus === BorrowStatus.AUTO_RETURNED);
  const cancelled = records.filter(r => r.approvalStatus === ApprovalStatus.REJECTED);
  const delivering = shipments.filter(s => s.shipmentStatus !== ShipmentStatus.DELIVERED && s.shipmentStatus !== ShipmentStatus.FAILED && s.shipmentStatus !== ShipmentStatus.RETURNED_TO_LIB);

  const handleCreateRequest = async (newRequest: any) => {
    // Integrate creation when backend creates records
    fetchData();
  };

  const handleApprove = async (request: BorrowRecord) => {
    try {
      const updated = { ...request, approvalStatus: ApprovalStatus.APPROVED, borrowStatus: BorrowStatus.BORROWING };
      await borrowApi.updateBorrowRecord(request.id, updated);
      fetchData();
    } catch (error) {
      console.error('Approval failed', error);
    }
  };

  const handleRejectClick = (request: BorrowRecord) => {
    setSelectedRejectRequest(request);
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = async (reason: string) => {
    if (!selectedRejectRequest) return;
    try {
      const updated = { ...selectedRejectRequest, approvalStatus: ApprovalStatus.REJECTED };
      // Real backend might need a reason field
      await borrowApi.updateBorrowRecord(selectedRejectRequest.id, updated);
      fetchData();
    } catch (error) {
      console.error('Reject failed', error);
    }
    setIsRejectModalOpen(false);
    setSelectedRejectRequest(null);
  };

  const handleReturnClick = (id: number) => {
    setSelectedReturnId(id);
    setIsConfirmReturnOpen(true);
  };

  const handleConfirmReturn = async () => {
    if (selectedReturnId === null) return;
    try {
      const request = records.find(r => r.id === selectedReturnId);
      if (request) {
        const updated = { ...request, borrowStatus: BorrowStatus.RETURNED };
        await borrowApi.updateBorrowRecord(selectedReturnId, updated);
        fetchData();
      }
    } catch (error) {
      console.error('Return failed', error);
    }
    setIsConfirmReturnOpen(false);
    setSelectedReturnId(null);
  };

  const handleViewCancelDetails = (request: BorrowRecord) => {
    setSelectedCancelRequest(request);
    setIsCancelDetailsOpen(true);
  };

  const handleToggleDeliveringStatus = async (id: number, newStatus: string) => {
    try {
      const shipment = shipments.find(s => s.id === id);
      if (shipment) {
        await shipmentApi.updateShipment(id, { ...shipment, shipmentStatus: newStatus as ShipmentStatus });
        fetchData();
      }
    } catch (error) {
      console.error('Status update failed', error);
    }
  };

  const getAvatarInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredData = (data: any[]) => data.filter(item => 
    item.id?.toString().includes(searchQuery) || 
    item.user?.userName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.book?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNewRequestsTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead className="sticky top-0 z-10 bg-white shadow-sm">
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ ĐƠN</th>
          <th className="px-6 py-5">NGƯỜI MƯỢN</th>
          <th className="px-6 py-5">SÁCH</th>
          <th className="px-6 py-5">HÌNH THỨC</th>
          <th className="px-6 py-5">NGÀY YÊU CẦU</th>
          <th className="px-6 py-5 text-center">THAO TÁC</th>
        </tr>
      </thead>
      <tbody className="text-[13px] text-gray-700">
        {filteredData(newRequests).length === 0 ? (
          <tr>
            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">Không tìm thấy yêu cầu nào.</td>
          </tr>
        ) : (
          filteredData(newRequests).map((row: BorrowRecord, index) => (
            <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
              <td className="px-6 py-6 font-bold text-gray-500">REQ-{row.id}</td>
              <td className="px-6 py-6 font-bold text-gray-900">{row.user?.userName || 'N/A'}</td>
              <td className="px-6 py-6 text-gray-700">{row.book?.title || 'N/A'}</td>
              <td className="px-6 py-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold bg-white text-gray-700 shadow-sm">
                  {row.receiveMethod === ReceiveMethod.HOME_PICKUP ? <Globe size={14} className="text-gray-500"/> : <Store size={14} className="text-gray-500"/>}
                  {row.receiveMethod === ReceiveMethod.HOME_PICKUP ? 'Online' : 'Offline'}
                </span>
              </td>
              <td className="px-6 py-6 text-gray-500 font-medium">{formatDateTime(row.borrowDate)}</td>
              <td className="px-6 py-6 text-center">
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <button onClick={() => handleApprove(row)} className="text-green-600 hover:text-green-700 transition-colors" title="Phê duyệt"><CheckCircle2 size={20} /></button>
                  <button onClick={() => handleRejectClick(row)} className="hover:text-red-500 transition-colors" title="Từ chối"><XCircle size={20} /></button>
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
            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">Không tìm thấy sách nào đang mượn.</td>
          </tr>
        ) : (
          filteredData(borrowing).map((row: BorrowRecord, index) => (
            <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
              <td className="px-6 py-6 font-bold text-gray-500">REQ-{row.id}</td>
              <td className="px-6 py-6 font-bold text-gray-900">{row.user?.userName || 'N/A'}</td>
              <td className="px-6 py-6 text-gray-700 font-bold">{row.book?.title || 'N/A'}</td>
              <td className="px-6 py-6 text-gray-500 font-medium">{formatDateTime(row.borrowDate)}</td>
              <td className={`px-6 py-6 font-bold ${row.borrowStatus === BorrowStatus.OVERDUE ? 'text-red-600' : 'text-gray-800'}`}>
                {formatDateTime(row.dueDate)} {row.borrowStatus === BorrowStatus.OVERDUE && '(Quá hạn)'}
              </td>
              <td className="px-6 py-6 text-center">
                <button onClick={() => handleReturnClick(row.id)} className="text-[#0066cc] hover:text-blue-800 font-bold uppercase text-xs tracking-wider transition-colors hover:underline">
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
          <th className="px-6 py-5 text-center">TRẠNG THÁI</th>
        </tr>
      </thead>
      <tbody className="text-[13px] text-gray-700">
        {filteredData(returned).length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">Không tìm thấy bản ghi.</td>
          </tr>
        ) : (
          filteredData(returned).map((row: BorrowRecord, index) => (
            <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
              <td className="px-6 py-6 font-bold text-gray-500">REQ-{row.id}</td>
              <td className="px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0 bg-[#0066cc]`}>
                    {getAvatarInitials(row.user?.userName)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{row.user?.userName || 'N/A'}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-6 text-gray-800 font-bold">{row.book?.title || 'N/A'}</td>
              <td className="px-6 py-6 text-gray-500 font-medium">{formatDateTime(row.borrowDate)}</td>
              <td className="px-6 py-6 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-700"></span> Đã trả
                </span>
              </td>
            </tr>
          ))
        )}
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
          <th className="px-6 py-5 text-center">TRẠNG THÁI</th>
        </tr>
      </thead>
      <tbody className="text-[13px] text-gray-700">
        {filteredData(cancelled).length === 0 ? (
          <tr>
            <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">Không tìm thấy bản ghi.</td>
          </tr>
        ) : (
          filteredData(cancelled).map((row: BorrowRecord, index) => (
            <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
              <td className="px-6 py-6 font-bold text-gray-500">REQ-{row.id}</td>
              <td className="px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0 shadow-inner">
                    {getAvatarInitials(row.user?.userName)}
                  </div>
                  <p className="font-bold text-gray-900">{row.user?.userName || 'N/A'}</p>
                </div>
              </td>
              <td className="px-6 py-6 text-gray-700 font-bold">{row.book?.title || 'N/A'}</td>
              <td className="px-6 py-6 text-center">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-bold border border-gray-200">Đã hủy</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const renderDeliveringTable = () => (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead className="sticky top-0 z-10 bg-white shadow-sm">
        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
          <th className="px-6 py-5">MÃ GIAO HÀNG</th>
          <th className="px-6 py-5">ĐỘC GIẢ</th>
          <th className="px-6 py-5">SÁCH</th>
          <th className="px-6 py-5">ĐỊA CHỈ</th>
          <th className="px-6 py-5 text-center">TRẠNG THÁI</th>
        </tr>
      </thead>
      <tbody className="text-[13px] text-gray-700">
        {shipments.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">Không tìm thấy giao dịch.</td>
          </tr>
        ) : (
          shipments.map((row: Shipment, index) => (
            <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
              <td className="px-6 py-6 font-bold text-gray-500">SHP-{row.id}</td>
              <td className="px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0 shadow-inner">
                    {getAvatarInitials(row.borrowRecord?.user?.userName)}
                  </div>
                  <p className="font-bold text-gray-900">{row.borrowRecord?.user?.userName || 'N/A'}</p>
                </div>
              </td>
              <td className="px-6 py-6 text-gray-700 font-bold">{row.borrowRecord?.book?.title || 'N/A'}</td>
              <td className="px-6 py-6 text-gray-500 font-medium">{'N/A'}</td>
              <td className="px-6 py-6 text-center">
                <div className="relative inline-block text-left">
                  <select
                    value={row.shipmentStatus}
                    onChange={(e) => handleToggleDeliveringStatus(row.id, e.target.value)}
                    className="appearance-none bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-bold rounded-full px-3 py-1.5 pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-yellow-300"
                  >
                    <option value={ShipmentStatus.WAITING_CONFIRMATION}>Chờ xác nhận</option>
                    <option value={ShipmentStatus.WAITING_FOR_PICKUP}>Chờ lấy hàng</option>
                    <option value={ShipmentStatus.ON_DELIVERY}>Đang giao</option>
                    <option value={ShipmentStatus.DELIVERED}>Giao thành công</option>
                    <option value={ShipmentStatus.FAILED}>Thất bại</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <ChevronDown size={14} className="text-yellow-600" />
                  </div>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Quản lý Mượn Trả Sách" />
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mượn/Trả Sách</h1>
            <div className="flex justify-between items-center mt-4">
              <div className="flex border-b border-gray-200 gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[14px] font-bold transition-all relative ${
                      activeTab === tab ? 'text-[#0066cc]' : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0066cc] rounded-t-full"></span>}
                  </button>
                ))}
              </div>
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
                  <Plus size={18} /> Tạo yêu cầu
                </button>
              </div>
            </div>
          </div>
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

      <CreateBorrowRequestModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateRequest} />
      <ConfirmReturnModal isOpen={isConfirmReturnOpen} onClose={() => setIsConfirmReturnOpen(false)} onConfirm={handleConfirmReturn} />
      <CancelDetailsModal isOpen={isCancelDetailsOpen} onClose={() => setIsCancelDetailsOpen(false)} request={selectedCancelRequest} />
      <RejectReasonModal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} onConfirm={handleConfirmReject} />
    </div>
  );
}
