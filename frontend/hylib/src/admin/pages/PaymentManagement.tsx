import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Eye, Edit2, Trash2, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import FeeSchedules from '../components/FeeSchedules';
import PaymentHistory from '../components/PaymentHistory';
import CreateInvoiceModal from '../components/CreateInvoiceModal';
import EditInvoiceModal from '../components/EditInvoiceModal';
import InvoiceDetailsModal from '../components/InvoiceDetailsModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

interface Invoice {
  id: number;
  invoiceCode: string;
  userName: string;
  feeType: string;
  amount: number;
  paymentMethod: string;
  status: string;
  date: string;
  notes?: string;
}

export default function PaymentManagement() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState('Danh sách Hóa đơn');
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateFeeModalOpen, setIsCreateFeeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/invoices')
      .then(response => setInvoices(response.data))
      .catch(error => {
        console.error("Error fetching invoices:", error);
        // Fallback mock data
        setInvoices([
          { id: 1, invoiceCode: '#INV-2023-001', userName: 'Nguyễn Văn A', feeType: 'Mượn sách', amount: 50000, paymentMethod: 'Chuyển khoản', status: 'Đã thanh toán', date: '2023-10-24', notes: '' },
          { id: 2, invoiceCode: '#INV-2023-002', userName: 'Trần Thị B', feeType: 'Phạt trễ hạn', amount: 15000, paymentMethod: 'Tiền mặt', status: 'Chưa thanh toán', date: '2023-10-25', notes: 'Trễ 3 ngày' },
          { id: 3, invoiceCode: '#INV-2023-003', userName: 'Lê Văn C', feeType: 'Gói thành viên VIP', amount: 300000, paymentMethod: 'Thẻ tín dụng', status: 'Đã thanh toán', date: '2023-10-26', notes: 'Gói 1 năm' }
        ]);
      });
  }, []);

  const getFeeTypeStyle = (type: string) => {
    return 'border-gray-200 text-gray-700 bg-gray-50';
  };

  const handleEditClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsEditModalOpen(true);
  };

  const handleViewClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteModalOpen(true);
  };

  const handleAddInvoice = (newInvoice: any) => {
    const invoiceWithId = { ...newInvoice, id: Date.now() }; // Mock ID
    setInvoices([invoiceWithId, ...invoices]);
  };

  const handleUpdateInvoice = (updatedInvoice: any) => {
    setInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
  };

  const handleConfirmDelete = () => {
    if (selectedInvoice) {
      setInvoices(invoices.filter(inv => inv.id !== selectedInvoice.id));
    }
  };

  const handleToggleStatus = (id: number, newStatus: string) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: newStatus } : inv));
  };

  const getStatusStyle = (status: string) => {
    return status === 'Đã thanh toán' 
      ? 'bg-green-50 text-green-700 border-green-200' 
      : 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Quản lý Hóa Đơn và Thanh Toán" />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán</h1>
            
            <div className="flex justify-between items-center mt-4">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 gap-8">
                {['Danh sách Hóa đơn', 'Cấu hình Biểu phí', 'Lịch sử Thay đổi'].map(tab => (
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

              {/* Controls aligned perfectly on the right */}
              <div className="flex items-center gap-3">
                {activeTab !== 'Lịch sử Thay đổi' && (
                  <button 
                    onClick={() => {
                      if (activeTab === 'Cấu hình Biểu phí') {
                        setIsCreateFeeModalOpen(true);
                      } else {
                        setIsCreateModalOpen(true);
                      }
                    }}
                    className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2 rounded-full font-bold text-sm transition-colors shadow-md flex items-center gap-2"
                  >
                    <Plus size={18} />
                    {activeTab === 'Cấu hình Biểu phí' ? 'Thêm biểu phí mới' : 'Tạo hóa đơn mới'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
             {activeTab === 'Danh sách Hóa đơn' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
                  <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead className="sticky top-0 z-10 bg-white shadow-sm">
                        <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                          <th className="px-6 py-5">MÃ HÓA ĐƠN</th>
                          <th className="px-6 py-5">TÊN NGƯỜI DÙNG</th>
                          <th className="px-6 py-5">LOẠI PHÍ</th>
                          <th className="px-6 py-5 text-right">SỐ TIỀN (VND)</th>
                          <th className="px-6 py-5">PHƯƠNG THỨC</th>
                          <th className="px-6 py-5">TRẠNG THÁI</th>
                          <th className="px-6 py-5 text-center">THAO TÁC</th>
                        </tr>
                      </thead>
                      <tbody className="text-[13px] text-gray-700">
                        {invoices.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
                              Không tìm thấy hóa đơn nào.
                            </td>
                          </tr>
                        ) : (
                          invoices.map((invoice) => (
                            <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                              <td className="px-6 py-5 font-bold text-gray-500">{invoice.invoiceCode}</td>
                              <td className="px-6 py-5 font-bold text-gray-900">{invoice.userName}</td>
                              <td className="px-6 py-5">
                                <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getFeeTypeStyle(invoice.feeType)}`}>
                                  {invoice.feeType}
                                </span>
                              </td>
                              <td className="px-6 py-5 font-bold text-gray-900 text-right">{invoice.amount.toLocaleString()}</td>
                              <td className="px-6 py-5 text-gray-500 font-medium">{invoice.paymentMethod}</td>
                              
                              {/* Status select dropdown */}
                              <td className="px-6 py-5">
                                <div className="relative inline-block">
                                  <select
                                    value={invoice.status}
                                    onChange={(e) => handleToggleStatus(invoice.id, e.target.value)}
                                    className={`appearance-none outline-none cursor-pointer text-xs font-bold rounded-full px-3 py-1.5 pr-8 border transition-colors ${getStatusStyle(invoice.status)}`}
                                  >
                                    <option value="Đã thanh toán">Đã thanh toán</option>
                                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                    <ChevronDown size={14} className="text-gray-500" />
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-5">
                                <div className="flex items-center justify-center gap-3 text-gray-400">
                                  <button onClick={() => handleViewClick(invoice)} className="hover:text-gray-600 transition-colors" title="Chi tiết"><Eye size={18} /></button>
                                  <button onClick={() => handleEditClick(invoice)} className="hover:text-gray-600 transition-colors" title="Sửa"><Edit2 size={16} /></button>
                                  <button onClick={() => handleDeleteClick(invoice)} className="hover:text-red-500 transition-colors" title="Xóa"><Trash2 size={16} /></button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500 bg-white shrink-0">
                    <span>Hiển thị 1-{invoices.length} trên tổng số {invoices.length} hóa đơn</span>
                  </div>
                </div>
             )}
             
             {activeTab === 'Cấu hình Biểu phí' && (
                <FeeSchedules 
                  isCreateOpen={isCreateFeeModalOpen}
                  onCloseCreate={() => setIsCreateFeeModalOpen(false)}
                />
             )}

             {activeTab === 'Lịch sử Thay đổi' && (
                <PaymentHistory />
             )}
          </div>
        </div>
      </main>

      <CreateInvoiceModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSave={handleAddInvoice}
      />
      
      {selectedInvoice && (
        <>
          <EditInvoiceModal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            invoice={selectedInvoice}
            onSave={handleUpdateInvoice}
          />
          
          <InvoiceDetailsModal 
            isOpen={isDetailsModalOpen} 
            onClose={() => setIsDetailsModalOpen(false)} 
            invoice={selectedInvoice}
          />

          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
}
