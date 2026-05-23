import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, ArrowRight, X } from 'lucide-react';

interface FavoritesViewProps {
  books: any[];
  setBooks: React.Dispatch<React.SetStateAction<any[]>>;
  cartBooks: any[];
  setCartBooks: React.Dispatch<React.SetStateAction<any[]>>;
  onNavigateToCart: () => void;
  onBack: () => void;
}

const GenericConfirmModal = ({ isOpen, onClose, onConfirm, message, variant }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
      <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full relative z-10 shadow-2xl">
        <h3 className="text-xl font-bold mb-4">Thông báo</h3>
        <p className="text-gray-500 mb-8">{message}</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-500">Hủy</button>
          <button onClick={onConfirm} className={`flex-1 py-3 rounded-xl font-bold text-white ${variant === 'danger' ? 'bg-red-500' : 'bg-[#0066cc]'}`}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

const FavoritesView = ({ books, setBooks, cartBooks, setCartBooks, onNavigateToCart, onBack }: FavoritesViewProps) => {
  const [filter, setFilter] = useState('Tất cả');
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; message: string; targetId: number | 'all' | 'addAllToCart' | null; variant: 'danger' | 'primary' }>({
    isOpen: false, message: '', targetId: null, variant: 'danger'
  });

  if (books.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-10 pb-20 pt-4 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-8"><Heart size={64} strokeWidth={1.5} /></div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Danh sách yêu thích trống</h2>
        <p className="text-gray-500 mb-10 max-w-sm leading-relaxed font-medium">Bạn chưa có cuốn sách yêu thích nào. Hãy khám phá kho sách khổng lồ của chúng tôi!</p>
      </motion.div>
    );
  }

  const handleConfirmAction = () => {
    if (modalConfig.targetId === 'all') setBooks([]);
    else if (modalConfig.targetId === 'addAllToCart') {
      setCartBooks(prev => {
        const existingTitles = new Set(prev.map(b => b.title));
        const newBooks = books.filter(b => !existingTitles.has(b.title));
        return [...prev, ...newBooks];
      });
      onNavigateToCart();
    } else if (modalConfig.targetId !== null) setBooks(prev => prev.filter(b => b.id !== modalConfig.targetId));
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const filteredBooks = books.filter((book: any) => filter === 'Tất cả' || book.type === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-10 pb-20 pt-4">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-6">
          <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={28} className="text-gray-900" /></button>
          <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">Yêu thích</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setModalConfig({ isOpen: true, message: 'Xác nhận xóa tất cả?', targetId: 'all', variant: 'danger' })} className="px-8 py-2.5 rounded-full border border-gray-200 font-bold text-red-500 hover:bg-red-50 text-sm">Xóa tất cả</button>
          <button onClick={() => setModalConfig({ isOpen: true, message: 'Xác nhận thêm tất cả vào giỏ?', targetId: 'addAllToCart', variant: 'primary' })} className="px-8 py-2.5 rounded-full bg-[#0066cc] text-white font-bold transition-all text-sm active:scale-95 shadow-lg shadow-blue-100">Thêm tất cả</button>
        </div>
      </div>

      <div className="flex items-center space-x-6 mb-10 overflow-x-auto pb-2">
        {['Tất cả', 'Ebook', 'Offline'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === f ? 'bg-gray-900 text-white shadow-xl shadow-gray-200' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>{f}</button>
        ))}
      </div>

      <div className="bg-gray-50/30 rounded-[2rem] overflow-hidden border border-gray-100 mb-12 min-h-[300px]">
        <div className="grid grid-cols-6 px-10 py-5 bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
          <div className="col-span-1">Ảnh</div><div className="col-span-2">Tên sách</div><div className="col-span-2 text-center">Hình thức</div><div className="col-span-1 text-right pr-4">Thao tác</div>
        </div>
        <div className="divide-y divide-gray-100 bg-white">
          {filteredBooks.map((book) => (
            <div key={book.id} className="grid grid-cols-6 px-10 py-6 items-center group hover:bg-gray-50/50 transition-colors">
              <div className="col-span-1"><div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white p-1"><img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" /></div></div>
              <div className="col-span-2"><h4 className="font-bold text-gray-900 group-hover:text-[#0066cc] transition-colors">{book.title}</h4></div>
              <div className="col-span-2 flex justify-center"><span className="px-5 py-1.5 rounded-full bg-blue-50 text-[#0066cc] text-[10px] font-black uppercase tracking-wider border border-blue-100/50">{book.type}</span></div>
              <div className="col-span-1 flex items-center justify-end space-x-6 pr-4">
                <button onClick={() => setModalConfig({ isOpen: true, message: 'Xác nhận xóa cuốn sách này?', targetId: book.id, variant: 'danger' })} className="text-sm font-bold text-red-500 hover:underline">Xóa</button>
                <button onClick={() => { setCartBooks(prev => prev.some(b => b.title === book.title) ? prev : [...prev, book]); onNavigateToCart(); }} className="bg-[#0066cc] text-white px-8 py-2 rounded-lg font-bold text-sm shadow-sm active:scale-95">Thêm</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <GenericConfirmModal isOpen={modalConfig.isOpen} onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} onConfirm={handleConfirmAction} message={modalConfig.message} variant={modalConfig.variant} />
    </motion.div>
  );
};

export default FavoritesView;
