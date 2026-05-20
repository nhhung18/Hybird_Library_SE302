import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, CheckCircle2 } from 'lucide-react';

export default function PenaltyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [penalty, setPenalty] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('libraryPenalties');
    if (saved) {
      const penalties = JSON.parse(saved);
      const found = penalties.find(p => p.id === `#${id}`);
      setPenalty(found);
    }
  }, [id]);

  if (!penalty) {
    return <div className="p-10">Loading...</div>;
  }

  const handlePayment = () => {
    setShowConfirmModal(true);
  };

  const confirmPayment = () => {
    const saved = localStorage.getItem('libraryPenalties');
    if (saved) {
      const penalties = JSON.parse(saved);
      const updated = penalties.map(p => 
        p.id === penalty.id ? { ...p, status: 'Đã nộp' } : p
      );
      localStorage.setItem('libraryPenalties', JSON.stringify(updated));
      setPenalty({ ...penalty, status: 'Đã nộp' });
    }
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* Top Navbar specifically for detail page */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate('/fines')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Penalty List
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Printer size={16} />
          In biên lai
        </button>
      </div>

      <div className="flex-1 p-8 flex justify-center">
        <div className="w-full max-w-5xl">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Chi tiết Phiếu phạt {penalty.id}</h1>
            <p className="text-gray-500">Review and process penalty details.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6 w-full">
              {/* Violator Information */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Violator Information</h2>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">MEMBER NAME</label>
                    <div className="text-sm font-bold text-gray-900">{penalty.memberName}</div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">MEMBER ID</label>
                    <div className="text-sm text-gray-700">{penalty.memberId || 'N/A'}</div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">EMAIL</label>
                    <div className="text-sm text-gray-700">user@example.com</div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">PHONE</label>
                    <div className="text-sm text-gray-700">+84 123 456 789</div>
                  </div>
                </div>
              </div>

              {/* Violation Details */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Violation Details</h2>
                
                <div className="mb-6">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">BOOK TITLE</label>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center shrink-0 border border-gray-200">
                      <div className="w-6 h-8 border-2 border-gray-400 rounded-sm"></div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm mb-1">{penalty.bookTitle}</div>
                      <div className="text-xs text-gray-500">ISBN: {penalty.bookIsbn || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">VIOLATION TYPE</label>
                    <span className="inline-block px-2.5 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">{penalty.violationType}</span>
                  </div>
                  {penalty.daysOverdue && (
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">DAYS OVERDUE</label>
                      <div className="text-sm font-bold text-gray-900">{penalty.daysOverdue} Days</div>
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">ISSUE DATE</label>
                    <div className="text-sm text-gray-700">{penalty.date}</div>
                  </div>
                  {penalty.dueDate && (
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">DUE DATE</label>
                      <div className="text-sm text-gray-700">{penalty.dueDate}</div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">NOTES</label>
                  <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-700 border border-gray-100">
                    {penalty.notes || 'No additional notes provided.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Payment Summary */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Summary</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{penalty.violationType}</span>
                    <span className="font-bold text-gray-900">{penalty.amount.toLocaleString()} VND</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider w-16 leading-tight">TOTAL AMOUNT DUE</span>
                  <span className="text-3xl font-bold text-[#0056b3]">{penalty.amount.toLocaleString()} <span className="text-xl">VND</span></span>
                </div>

                {penalty.status === 'Chưa nộp' ? (
                  <button 
                    onClick={handlePayment}
                    className="w-full py-3 bg-[#0056b3] text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors flex justify-center items-center gap-2 shadow-sm"
                  >
                    <CheckCircle2 size={18} />
                    Ghi nhận thanh toán
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full py-3 bg-gray-100 text-gray-400 rounded-full font-bold text-sm cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    Đã thanh toán
                  </button>
                )}

                <p className="text-xs text-gray-400 text-center mt-4">
                  Record this penalty as paid once funds are received.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0056b3]">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Xác nhận người dùng đã nộp?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Bạn có chắc chắn muốn ghi nhận người dùng đã nộp phạt số tiền <strong>{penalty.amount.toLocaleString()} VND</strong>?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
              >
                Hủy
              </button>
              <button 
                onClick={confirmPayment}
                className="flex-1 py-2.5 rounded-full font-bold text-white bg-[#0056b3] hover:bg-blue-700 transition-colors shadow-sm text-sm"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
