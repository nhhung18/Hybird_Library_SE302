import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Menu, ChevronDown, ChevronRight, X, DivideSquareIcon } from 'lucide-react';
import { BorrowedBook } from '../types';

interface MyBooksViewProps {
  books: BorrowedBook[];
  setBooks: React.Dispatch<React.SetStateAction<BorrowedBook[]>>;
  onReturnSuccess: () => void;
  onReadClick: (id: number) => void;
  onRowClick: (id: number) => void;
  onRenewSuccess: () => void;
  onLateReturn: () => void;
  onNavigateTo?: (page: string) => void;
  onBack: () => void;
}

const ReturnConfirmationModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="glass-panel rounded-[2.5rem] w-full max-w-[440px] overflow-hidden relative z-10 p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Xác nhận trả sách</h3>
            <button onClick={onClose} className="p-1 hover:bg-white/80 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
          </div>
          <p className="text-gray-500 font-medium mb-10 text-lg text-center">Bạn xác nhận muốn hoàn trả cuốn sách này?</p>
          <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 font-bold text-[#1e3b2b] hover:opacity-80 transition-opacity">Hủy</button>
            <button onClick={onConfirm} className="flex-1 py-4 bg-[#1e3b2b] text-white font-bold rounded-full shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">Xác nhận</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const GenericConfirmModal = ({ isOpen, onClose, onConfirm, message, confirmText, variant = 'primary' }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="glass-panel rounded-[2.5rem] w-full max-w-[440px] overflow-hidden relative z-10 p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Thông báo</h3>
            <button onClick={onClose} className="p-1 hover:bg-white/80 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
          </div>
          <p className="text-gray-500 font-medium mb-10 text-lg text-center tracking-tight">{message}</p>
          <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 font-bold text-[#1e3b2b] hover:opacity-80 transition-opacity">Hủy</button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-4 text-white font-bold rounded-full shadow-md hover:-translate-y-0.5 transition-all active:scale-95 ${variant === 'primary' ? 'bg-[#1e3b2b] shadow-[#1e3b2b]/20 hover:shadow-lg' : 'bg-red-500 shadow-red-500/20 hover:shadow-lg'}`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const MyBooksView = ({ books, setBooks, onReturnSuccess, onReadClick, onRowClick, onRenewSuccess, onLateReturn, onNavigateTo, onBack }: MyBooksViewProps) => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const func = ['Yêu thích', 'Giỏ sách', 'Theo dõi đơn sách'];
  const filters = ['Tất cả', 'Ebook', 'Offline', 'Đang mượn', 'Đã đến hạn'];

  const handleRenewClick = (bookId: number) => {
    setSelectedBookId(bookId);
    setIsRenewModalOpen(true);
  };

  const handleRenewConfirm = () => {
    if (!selectedBookId) return;

    setBooks(prev => prev.map(book => {
      if (book.id === selectedBookId) {
        const currentCount = parseInt(book.renewCount.split('/')[0]);
        if (currentCount < 2) {
          const nextCount = currentCount + 1;
          const newRenewCount = `${nextCount}/2`;
          const newActions = nextCount === 2
            ? book.actions.filter(a => a !== 'Gia hạn')
            : book.actions;

          return {
            ...book,
            renewCount: newRenewCount,
            expiryDate: nextCount === 1 ? '15-6-2026' : '30-6-2026',
            actions: newActions
          };
        }
      }
      return book;
    }));
    setIsRenewModalOpen(false);
    setSelectedBookId(null);
    onRenewSuccess();
  };

  const handleReturnClick = (id: number) => {
    setSelectedBookId(id);
    setIsReturnModalOpen(true);
  };

  const handleReturnLocal = () => {
    if (selectedBookId) {
      if (selectedBookId === 4) {
        setIsReturnModalOpen(false);
        onLateReturn();
        return;
      }
      setBooks(prev => prev.map(book => {
        if (book.id === selectedBookId) {
          return {
            ...book,
            status: 'Đã trả sách',
            paymentStatus: 'Đã thanh toán',
            statusColor: 'text-green-500',
            actions: ['Trả sách disabled']
          };
        }
        return book;
      }));
      setIsReturnModalOpen(false);
      setSelectedBookId(null);
      onReturnSuccess();
    }
  };

  const filteredBooks = books.filter(book => {
    if (activeFilter === 'Tất cả') return true;
    if (activeFilter === 'Ebook') return book.type === 'Ebook';
    if (activeFilter === 'Offline') return book.type === 'Offline';
    if (activeFilter === 'Đang mượn') return book.status !== 'Đã trả sách';
    if (activeFilter === 'Đã đến hạn') return book.status.toLowerCase().includes('hạn') || book.status.toLowerCase().includes('trễ');
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-none px-4 md:px-12 lg:px-16 py-12"
    >
      <div className="flex items-center space-x-6 mb-10 relative">
        <div className="flex items-center gap-3 text-5xl font-bold text-gray-900 tracking-tight">
          Sách của tôi
        </div>
      </div>

      {/* Quick Action Navigation (func) */}
      <div className="flex items-center gap-8 mb-6 border-b-2 border-gray-200/60 pb-4">
        {func.map(f => {
          return (
            <button
              key={f}
              onClick={() => onNavigateTo && onNavigateTo(f)}
              className="flex items-center gap-2 text-gray-500 hover:text-[#1e3b2b] font-bold text-sm transition-colors py-1 relative group"
            >
              <span>{f}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${activeFilter === filter
                ? 'bg-[#1e3b2b] text-white shadow-md shadow-[#1e3b2b]/20'
                : 'bg-white/50 border border-white/60 text-gray-500 hover:bg-white/80 hover:text-gray-900 backdrop-blur-md'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 bg-white/50 border border-white/60 backdrop-blur-md px-6 py-2.5 rounded-full font-bold text-sm text-gray-700 hover:bg-white/80 hover:text-gray-900 transition-all shadow-sm">
          <Menu size={16} />
          <span>Sort By</span>
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-x-auto mb-10 w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest w-24">ẢNH</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">TÊN SÁCH</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">HÌNH THỨC</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">HẾT HẠN</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">GIA HẠN</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">TRẠNG THÁI</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredBooks.map((book) => (
              <tr
                key={book.id}
                className="group hover:bg-gray-50/30 transition-colors cursor-pointer"
                onClick={() => onRowClick ? onRowClick(book.id) : null}
              >
                <td className="px-8 py-6">
                  <div className="w-20 h-28 rounded-xl overflow-hidden bg-gray-100 shadow-md group-hover:scale-105 transition-transform">
                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="font-bold text-gray-900 text-lg mb-1">{book.title}</p>
                </td>
                <td className="px-8 py-6">
                  <p className="text-gray-600 font-bold">{book.type}</p>
                </td>
                <td className="px-8 py-6">
                  <p className="text-gray-500 font-medium">{book.expiryDate}</p>
                </td>
                <td className="px-8 py-6">
                  <p className="text-gray-500 font-medium">{book.renewCount}</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <p className={`font-bold text-sm ${book.statusColor || 'text-gray-500'}`}>
                      {book.status}
                    </p>
                    {book.paymentStatus && (
                      <p className={`font-bold text-sm mt-1 ${book.paymentStatus === 'Đã thanh toán' ? 'text-green-500' : 'text-red-500'}`}>
                        {book.paymentStatus}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
                    {book.actions.map(action => {
                      if (action === 'Đọc') {
                        return <button key={action} onClick={() => onReadClick(book.id)} className="text-[#1e3b2b] font-bold hover:underline">Đọc</button>;
                      }
                      if (action === 'Đọc disabled') {
                        return <button key={action} disabled className="text-gray-300 font-bold cursor-not-allowed">Đọc</button>;
                      }
                      if (action === 'Gia hạn') {
                        return (
                          <button
                            key={action}
                            onClick={() => handleRenewClick(book.id)}
                            className="bg-[#1e3b2b] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
                          >
                            Gia hạn
                          </button>
                        );
                      }
                      if (action === 'Trả sách') {
                        return (
                          <button
                            key={action}
                            onClick={() => handleReturnClick(book.id)}
                            className="bg-[#1e3b2b] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
                          >
                            Trả sách
                          </button>
                        );
                      }
                      return null;
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4 py-8">
        <button className="w-10 h-10 bg-[#1e3b2b] text-white shadow-md shadow-[#1e3b2b]/20 rounded-full flex items-center justify-center font-bold">1</button>
        <button className="w-10 h-10 text-gray-500 bg-white/50 border border-white/60 hover:bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center font-medium transition-colors">2</button>
        <button className="w-10 h-10 text-gray-500 bg-white/50 border border-white/60 hover:bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center font-medium transition-colors">3</button>
        <button className="w-10 h-10 text-gray-500 bg-white/50 border border-white/60 hover:bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center font-medium transition-colors">4</button>
        <span className="text-gray-400 px-2 pb-2">...</span>
        <button className="flex items-center gap-2 text-gray-900 font-bold hover:translate-x-1 transition-transform ml-4">
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>

      <ReturnConfirmationModal isOpen={isReturnModalOpen} onClose={() => { setIsReturnModalOpen(false); setSelectedBookId(null); }} onConfirm={handleReturnLocal} />
      <GenericConfirmModal isOpen={isRenewModalOpen} onClose={() => { setIsRenewModalOpen(false); setSelectedBookId(null); }} onConfirm={handleRenewConfirm} message="Xác nhận gia hạn sách?" confirmText="Xác nhận" variant="primary" />
    </motion.div>
  );
};

export default MyBooksView;
