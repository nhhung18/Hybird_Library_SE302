import React, { useState, useEffect } from 'react';
import { Eye, Edit2, Trash2, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { PaymentTransaction, PaymentStatus } from '../../types';
import { paymentApi } from '../../api/paymentApi';

export default function PaymentManagement() {
  const [invoices, setInvoices] = useState<PaymentTransaction[]>([]);
  const [activeTab, setActiveTab] = useState('Danh sách Hóa đơn');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await paymentApi.getAllPayments();
      if (Array.isArray(response)) {
        setInvoices(response);
      }
    } catch (error) {
      console.error('Failed to fetch payments', error);
    }
  };

  const handleToggleStatus = async (id: number, newStatus: string) => {
    try {
      const invoice = invoices.find(inv => inv.id === id);
      if (invoice) {
        await paymentApi.updatePayment(id, { ...invoice, status: newStatus as PaymentStatus });
        fetchPayments();
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === PaymentStatus.PAID) return 'bg-green-50 text-green-700 border-green-200';
    if (status === PaymentStatus.PENDING) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (status === PaymentStatus.FAILED) return 'bg-red-50 text-red-700 border-red-200';
    if (status === PaymentStatus.REFUNDED) return 'bg-gray-50 text-gray-700 border-gray-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
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
            <p className="text-sm text-gray-500 font-medium mb-4">Quản lý các giao dịch thanh toán từ độc giả.</p>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
              <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="sticky top-0 z-10 bg-white shadow-sm">
                    <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                      <th className="px-6 py-5 w-20">ID</th>
                      <th className="px-6 py-5">MÃ GIAO DỊCH</th>
                      <th className="px-6 py-5">ĐỘC GIẢ</th>
                      <th className="px-6 py-5 text-right">SỐ TIỀN (VND)</th>
                      <th className="px-6 py-5 text-center">PHƯƠNG THỨC</th>
                      <th className="px-6 py-5 text-center">NGÀY TT</th>
                      <th className="px-6 py-5 text-center">TRẠNG THÁI</th>
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
                          <td className="px-6 py-5 font-bold text-gray-500">#{invoice.id}</td>
                          <td className="px-6 py-5 font-bold text-gray-900">{invoice.transactionCode}</td>
                          <td className="px-6 py-5 font-bold text-gray-900">{invoice.user?.userName || 'N/A'}</td>
                          <td className="px-6 py-5 font-bold text-blue-700 text-right">{invoice.amount.toLocaleString()} đ</td>
                          <td className="px-6 py-5 text-gray-500 font-medium text-center">{invoice.paymentMethod}</td>
                          <td className="px-6 py-5 text-gray-500 font-medium text-center">
                            {invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString('vi-VN') : 'Chưa TT'}
                          </td>
                          <td className="px-6 py-5 text-center">
                            <div className="relative inline-block text-left">
                              <select
                                value={invoice.status}
                                onChange={(e) => handleToggleStatus(invoice.id, e.target.value)}
                                className={`appearance-none outline-none cursor-pointer text-[11px] font-bold rounded-full px-3 py-1.5 pr-8 border transition-colors ${getStatusStyle(invoice.status)}`}
                              >
                                {Object.values(PaymentStatus).map(status => (
                                  <option key={status} value={status}>{status}</option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                <ChevronDown size={14} className="text-gray-500" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500 bg-white shrink-0">
                <span>Hiển thị 1-{invoices.length} trên tổng số {invoices.length} giao dịch</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
