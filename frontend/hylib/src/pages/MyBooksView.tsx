import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Menu, ChevronDown, ChevronRight, X } from 'lucide-react';
import { BorrowedBook } from '../types';

interface MyBooksViewProps {
  books: BorrowedBook[];
  setBooks: React.Dispatch<React.SetStateAction<BorrowedBook[]>>;
  onReturnSuccess: () => void;
  onReadClick: (id: string) => void;
  onRowClick: (id: string) => void;
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
          className="bg-white rounded-[2.5rem] w-full max-w-[440px] overflow-hidden shadow-2xl relative z-10 p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Xác nhận trả sách</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
          </div>
          <p className="text-gray-500 font-medium mb-10 text-lg text-center">Bạn xác nhận muốn hoàn trả cuốn sách này?</p>
          <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 font-bold text-[#0066cc] hover:opacity-80 transition-opacity">Hủy</button>
            <button onClick={onConfirm} className="flex-1 py-4 bg-[#0066cc] text-white font-bold rounded-full shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-95">Xác nhận</button>
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
          className="bg-white rounded-[2.5rem] w-full max-w-[440px] overflow-hidden shadow-2xl relative z-10 p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Thông báo</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
          </div>
          <p className="text-gray-500 font-medium mb-10 text-lg text-center tracking-tight">{message}</p>
          <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 font-bold text-[#0066cc] hover:opacity-80 transition-opacity">Hủy</button>
            <button 
              onClick={onConfirm} 
              className={`flex-1 py-4 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 ${variant === 'primary' ? 'bg-[#0066cc] shadow-blue-100 hover:shadow-blue-200' : 'bg-red-600 shadow-red-100 hover:shadow-red-200'}`}
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
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const filters = ['Tất cả', 'Ebook', 'Offline', 'Đã đến hạn', 'Khả dụng'];

  const handleRenewClick = (bookId: string) => {
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

  const handleReturnClick = (id: string) => {
    setSelectedBookId(id);
    setIsReturnModalOpen(true);
  };

  const handleReturnLocal = () => {
    if (selectedBookId) {
      if (selectedBookId === '4') {
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
    if (activeFilter === 'Đã đến hạn') return book.status.toLowerCase().includes('hạn') || book.status.toLowerCase().includes('trễ');
    if (activeFilter === 'Khả dụng') return book.status === 'Khả dụng' || book.status === 'Bình thường';
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-10 py-12"
    >
      <div className="flex items-center space-x-6 mb-10 relative">
        <button onClick={onBack} className="p-3 hover:bg-white/40 rounded-full transition-colors flex items-center justify-center">
          <ArrowLeft size={28} className="text-gray-900" />
        </button>
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 text-5xl font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
          >
            Sách của tôi
            <ChevronDown size={32} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-4 w-64 glass rounded-2xl shadow-xl border border-white/40 overflow-hidden z-50"
              >
                <div className="py-2">
                  <button className="w-full text-left px-6 py-3 font-bold text-forest bg-white/40">Sách đang mượn</button>
                  <button 
                    onClick={() => onNavigateTo && onNavigateTo('Yêu thích')}
                    className="w-full text-left px-6 py-3 font-medium text-ink hover:bg-white/30 transition-colors"
                  >
                    Sách yêu thích
                  </button>
                  <button 
                    onClick={() => onNavigateTo && onNavigateTo('Giỏ sách')}
                    className="w-full text-left px-6 py-3 font-medium text-ink hover:bg-white/30 transition-colors"
                  >
                    Giỏ sách
                  </button>
                  <button className="w-full text-left px-6 py-3 font-medium text-ink hover:bg-white/30 transition-colors">Lịch sử mượn</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeFilter === filter 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 bg-gray-100 px-6 py-2.5 rounded-full font-bold text-sm text-gray-700 hover:bg-gray-200 transition-all">
          <Menu size={16} />
          <span>Sort By</span>
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-10">
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
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
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
                        return <button key={action} onClick={() => onReadClick(book.id)} className="text-[#0066cc] font-bold hover:underline">Đọc</button>;
                      }
                      if (action === 'Đọc disabled') {
                        return <button key={action} disabled className="text-gray-300 font-bold cursor-not-allowed">Đọc</button>;
                      }
                      if (action === 'Gia hạn') {
                        return (
                          <button 
                            key={action} 
                            onClick={() => handleRenewClick(book.id)}
                            className="bg-[#0066cc] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-95"
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
                            className="bg-[#0066cc] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-95"
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
        <button className="w-10 h-10 bg-[#0066cc] text-white rounded-full flex items-center justify-center font-bold">1</button>
        <button className="w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-full flex items-center justify-center font-medium transition-colors">2</button>
        <button className="w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-full flex items-center justify-center font-medium transition-colors">3</button>
        <button className="w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-full flex items-center justify-center font-medium transition-colors">4</button>
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
