import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartViewProps {
  books: any[];
  setBooks: React.Dispatch<React.SetStateAction<any[]>>;
  onBorrowTrigger: (mode: 'ebook' | 'offline') => void;
  onBack: () => void;
}

const GenericConfirmModal = ({ isOpen, onClose, onConfirm, message, variant }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
      <div className="glass-panel rounded-[2.5rem] p-8 max-w-sm w-full relative z-10 shadow-2xl">
        <h3 className="text-xl font-bold mb-4">Thông báo</h3>
        <p className="text-gray-500 mb-8">{message}</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-500">Hủy</button>
          <button onClick={onConfirm} className={`flex-1 py-3 rounded-full font-bold text-white shadow-md hover:-translate-y-0.5 transition-all active:scale-95 ${variant === 'danger' ? 'bg-red-500 shadow-red-500/20' : 'bg-[#1e3b2b] shadow-[#1e3b2b]/20'}`}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

const CartView = ({ books, setBooks, onBorrowTrigger, onBack }: CartViewProps) => {
  const [filter, setFilter] = useState('Tất cả');
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; message: string; targetId: number | 'all' | null; variant: 'danger' | 'primary' }>({
    isOpen: false, message: '', targetId: null, variant: 'danger'
  });

  if (books.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-none px-4 md:px-12 lg:px-16 py-12 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-8"><ShoppingBag size={64} strokeWidth={1.5} /></div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Giỏ sách của bạn trống</h2>
        <p className="text-gray-500 mb-10 max-w-sm leading-relaxed font-medium">Có vẻ như bạn chưa chọn cuốn sách nào để mượn. Hãy bắt đầu tìm kiếm những tác phẩm thú vị!</p>
        <button onClick={onBack} className="bg-[#1e3b2b] text-white px-12 py-4 rounded-full font-bold shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">Tiếp tục duyệt sách</button>
      </motion.div>
    );
  }

  const handleConfirmAction = () => {
    if (modalConfig.targetId === 'all') setBooks([]);
    else if (modalConfig.targetId !== null) setBooks(prev => prev.filter(b => b.id !== modalConfig.targetId));
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const filteredBooks = books.filter((book: any) => filter === 'Tất cả' || book.type === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-none px-4 md:px-12 lg:px-16 py-12">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-6">
          <h1 className="text-6xl font-bold text-gray-900 tracking-tight">Giỏ sách</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setModalConfig({ isOpen: true, message: 'Xác nhận xóa tất cả?', targetId: 'all', variant: 'danger' })} className="px-10 py-3 rounded-full border border-white/60 bg-white/50 backdrop-blur-md font-bold text-red-500 hover:bg-white/80 shadow-sm transition-all hover:-translate-y-0.5">Xóa tất cả</button>
          <button onClick={() => books.length > 0 && onBorrowTrigger(books[0].type.toLowerCase() as any)} className="px-10 py-3 rounded-full bg-[#1e3b2b] text-white font-bold shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">Mượn tất cả</button>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-14">
        {['Tất cả', 'Ebook', 'Offline'].map((tab) => (
          <button key={tab} onClick={() => setFilter(tab)} className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${filter === tab ? 'bg-[#1e3b2b] text-white shadow-md shadow-[#1e3b2b]/20' : 'bg-white/50 border border-white/60 text-gray-500 hover:bg-white/80 hover:text-gray-900 backdrop-blur-md'}`}>{tab}</button>
        ))}
      </div>

      <div className="glass-panel rounded-[2.5rem] overflow-hidden mb-12">
        <div className="grid grid-cols-12 px-10 py-6 bg-gray-50/40 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100/60">
          <div className="col-span-2">Ảnh</div><div className="col-span-4 pl-4">Tên sách</div><div className="col-span-3 text-center">Hình thức</div><div className="col-span-3 text-right">Thao tác</div>
        </div>
        <div className="divide-y divide-gray-50">
          {filteredBooks.map((book) => (
            <div key={book.id} className="grid grid-cols-12 px-10 py-8 items-center group hover:bg-gray-50/30 transition-all duration-300">
              <div className="col-span-2"><div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white p-1.5 transition-transform group-hover:scale-105"><img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" /></div></div>
              <div className="col-span-4 pl-4"><h4 className="text-xl font-bold text-gray-900 group-hover:text-[#1e3b2b] transition-colors">{book.title}</h4></div>
              <div className="col-span-3 flex justify-center"><span className="px-6 py-2 rounded-full glass-panel text-[#1e3b2b] text-xs font-black uppercase tracking-wider shadow-sm">{book.type}</span></div>
              <div className="col-span-3 flex items-center justify-end space-x-8">
                <button onClick={() => setModalConfig({ isOpen: true, message: 'Xác nhận xóa cuốn sách này?', targetId: book.id, variant: 'danger' })} className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">Xóa</button>
                <button onClick={() => onBorrowTrigger(book.type.toLowerCase() as any)} className="bg-[#1e3b2b] text-white px-10 py-3 rounded-full font-bold text-sm shadow-md shadow-[#1e3b2b]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0">Mượn</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <GenericConfirmModal isOpen={modalConfig.isOpen} onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} onConfirm={handleConfirmAction} message={modalConfig.message} variant={modalConfig.variant} />
    </motion.div>
  );
};

export default CartView;
