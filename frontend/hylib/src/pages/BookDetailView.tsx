import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Library, 
  Clock, 
  History, 
  HelpCircle, 
  Sparkles, 
  User, 
  X
} from 'lucide-react';
import { BorrowedBook } from '../types';

interface BookDetailViewProps {
  onBack: () => void;
  bookId: string;
  onStartBorrow: (mode: 'ebook' | 'offline') => void;
  borrowedInfo?: BorrowedBook;
  onRenew?: (id: string) => void;
  onRead?: (id: string) => void;
}

const BorrowModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: (mode: 'ebook' | 'offline') => void }) => {
  const [borrowMode, setBorrowMode] = useState<'ebook' | 'offline'>('ebook');
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-white rounded-[2.5rem] w-full max-w-[440px] overflow-hidden shadow-2xl relative z-10 p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-900">Thông báo</h3>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
            </div>
            <p className="text-gray-500 font-medium mb-10 text-lg">Hãy lựa chọn hình thức bạn muốn mượn!</p>
            <div className="mb-12">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">HÌNH THỨC</p>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setBorrowMode('ebook')} className={`flex items-center justify-center space-x-3 py-4 rounded-3xl border transition-all font-bold text-base ${borrowMode === 'ebook' ? 'border-[#0066cc] bg-blue-50 text-[#0066cc] ring-1 ring-[#0066cc]' : 'border-gray-100 text-gray-400 hover:border-gray-300'}`}>
                  <span>Ebook</span>
                </button>
                <button onClick={() => setBorrowMode('offline')} className={`flex items-center justify-center space-x-3 py-4 rounded-3xl border transition-all font-bold text-base ${borrowMode === 'offline' ? 'border-[#0066cc] bg-blue-50 text-[#0066cc] ring-1 ring-[#0066cc]' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}>
                  <span>Offline</span>
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={onClose} className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-900 transition-colors">Hủy</button>
              <button onClick={() => onConfirm(borrowMode)} className="flex-1 py-4 bg-[#0066cc] text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-95">Xác nhận</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const GenericConfirmModal = ({ isOpen, onClose, onConfirm, message, confirmText, variant = 'primary' }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-white rounded-[2.5rem] w-full max-w-[440px] overflow-hidden shadow-2xl relative z-10 p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Thông báo</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-400" /></button>
          </div>
          <p className="text-gray-500 font-medium mb-10 text-lg text-center tracking-tight">{message}</p>
          <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 font-bold text-[#0066cc] hover:opacity-80 transition-opacity">Hủy</button>
            <button onClick={onConfirm} className={`flex-1 py-4 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 ${variant === 'primary' ? 'bg-[#0066cc] shadow-blue-100 hover:shadow-blue-200' : 'bg-red-600 shadow-red-100 hover:shadow-red-200'}`}>{confirmText}</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const BookDetailView = ({ onBack, bookId, onStartBorrow, borrowedInfo, onRenew, onRead }: BookDetailViewProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [localReviews, setLocalReviews] = useState([
    { name: 'Phạm Mai Phương', date: '2 ngày trước', content: 'Một cuốn sách thực sự thay đổi cuộc đời. Cách Pico Iyer mô tả sức mạnh của sự tĩnh lặng trong thế giới bận rộn của chúng ta vừa mang tính thơ mộng vừa thiết thực.', rating: 5 },
    { name: 'Lê Việt Anh', date: '1 tuần trước', content: 'Được viết rất hay và đầy sức gợi mở. Đây là một cuốn sách ngắn nhưng chứa đựng rất nhiều ý nghĩa.', rating: 5 }
  ]);

  const handleReviewSubmit = () => {
    if (!reviewText.trim()) return;
    setLocalReviews(prev => [{ name: 'Bạn', date: 'Vừa xong', content: reviewText, rating: 5 }, ...prev]);
    setReviewText('');
  };
  
  const bookTitle = borrowedInfo?.title || "The Art of Stillness";
  const bookAuthor = borrowedInfo?.author || "Pico Iyer";
  const bookImage = borrowedInfo?.image || "https://picsum.photos/seed/stillness/800/1067";
  const bookType = borrowedInfo?.type || "Online";
  const expiryDate = borrowedInfo?.expiryDate || "27-5-2026";
  const renewCount = borrowedInfo?.renewCount || "0/2";

  const handleRenewConfirm = () => {
    if (onRenew && borrowedInfo) onRenew(borrowedInfo.id);
    setIsRenewModalOpen(false);
  };

  const recommendations = [
    { title: 'Design Systems', author: 'Alla Kholmatova', image: 'https://picsum.photos/seed/ds/400/533' },
    { title: 'The Architecture of Art', author: 'Marcus Frings', image: 'https://picsum.photos/seed/archart/400/533' },
    { title: 'Minimalism', author: 'Joshua Fields', image: 'https://picsum.photos/seed/min/400/533' },
    { title: 'Deep Work', author: 'Cal Newport', image: 'https://picsum.photos/seed/work/400/533' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white min-h-screen">
      <div className="px-10 pt-8 pb-4">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Quay lại</span>
        </button>
      </div>

      <section className="px-10 py-12 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
        <div className="w-full max-w-[450px] shrink-0">
          <div className="aspect-[3/4] bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] p-0 border border-gray-100 overflow-hidden relative group">
            <img src={bookImage} alt={bookTitle} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none"></div>
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/10 to-transparent"></div>
          </div>
        </div>

        <div className="flex-1 max-w-3xl text-center lg:text-left">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#0066cc] text-[10px] font-black uppercase tracking-wider mb-8 border border-blue-100/50 shadow-sm shadow-blue-50">
              <div className="w-1.5 h-1.5 bg-[#0066cc] rounded-full mr-2"></div>
              Khả dụng (Ebook/Offline)
            </span>
            <h1 className="text-6xl font-bold text-gray-900 mb-3 tracking-tight leading-[1.1]">{bookTitle}</h1>
            <p className="text-2xl font-bold text-gray-400 mb-10">{bookAuthor}</p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm font-bold">
              <div className="flex items-center space-x-2"><Star size={18} className="fill-yellow-400 text-yellow-400" /><span>5.0</span><span className="text-gray-400">(342)</span></div>
              <div className="flex items-center space-x-2 group cursor-pointer"><Heart size={18} className="text-red-500 fill-red-500" /><span className="text-gray-400">1.2k lượt thích</span></div>
              <div className="flex items-center space-x-2"><Library size={18} className="text-gray-400" /><span className="text-gray-400">Còn 12 cuốn</span></div>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
            A compelling and thoughtful exploration of finding peace in a fast-paced world. Pico Iyer investigates the lives of people who have made a life seeking stillness.
          </p>

          {borrowedInfo && (
            <div className="bg-[#f0f4f9] rounded-3xl p-8 mb-12 max-w-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600"><HelpCircle size={18} className="text-[#0066cc]" /> <span className="font-bold">Hình thức mượn hiện tại:</span><span className="text-[#0066cc] font-black">{bookType}</span></div>
                <div className="flex items-center space-x-3 text-gray-600"><Clock size={18} className="text-[#0066cc]" /> <span className="font-bold">Ngày hết hạn:</span><span className="text-red-500 font-black">{expiryDate}</span></div>
                <div className="flex items-center space-x-3 text-gray-600"><History size={18} className="text-[#0066cc]" /> <span className="font-bold">Số lần gia hạn:</span><span className="text-gray-900 font-black">{renewCount}</span></div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            {borrowedInfo ? (
              <>
                <button onClick={() => onRead && onRead(bookId)} className="bg-[#0066cc] text-white px-14 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">Đọc ngay</button>
                <button onClick={() => setIsRenewModalOpen(true)} disabled={renewCount === '2/2'} className={`px-14 py-4 rounded-full font-bold border-2 transition-all active:scale-95 ${renewCount === '2/2' ? 'border-gray-100 text-gray-300' : 'border-gray-100 text-gray-900 hover:bg-gray-50'}`}>Gia hạn</button>
              </>
            ) : (
              <button onClick={() => setIsBorrowModalOpen(true)} className="bg-[#0066cc] text-white px-14 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">Mượn ngay</button>
            )}
            <button onClick={() => setIsLiked(!isLiked)} className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${isLiked ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-100 text-[#0066cc]'}`}><Heart size={22} className={isLiked ? 'fill-red-500' : ''} /></button>
          </div>
        </div>
      </section>

      <section className="px-10 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">Đánh giá của độc giả</h2>
        <div className="mb-12 relative">
          <textarea placeholder="Viết đánh giá của bạn" value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="w-full bg-white border border-gray-100 rounded-[2rem] p-8 min-h-[180px] shadow-sm outline-none font-medium text-gray-700 resize-none transition-all" />
          <button onClick={handleReviewSubmit} className="absolute bottom-6 right-8 bg-[#0066cc] text-white px-10 py-3 rounded-2xl font-bold transition-all active:scale-95">Gửi</button>
        </div>
        <div className="space-y-6">
          {localReviews.map((review, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-8 border border-gray-50 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#f0f4f9] rounded-full flex items-center justify-center text-[#0066cc]"><User size={20} /></div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                </div>
                <span className="text-sm font-bold text-gray-400">{review.date}</span>
              </div>
              <p className="text-gray-600 leading-relaxed font-normal text-lg">{review.content}</p>
            </div>
          ))}
        </div>
      </section>

      <BorrowModal isOpen={isBorrowModalOpen} onClose={() => setIsBorrowModalOpen(false)} onConfirm={(mode) => { setIsBorrowModalOpen(false); onStartBorrow(mode); }} />
      <GenericConfirmModal isOpen={isRenewModalOpen} onClose={() => setIsRenewModalOpen(false)} onConfirm={handleRenewConfirm} message="Xác nhận gia hạn sách?" confirmText="Xác nhận" variant="primary" />
    </motion.div>
  );
};

export default BookDetailView;
