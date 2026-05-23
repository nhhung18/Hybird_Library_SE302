import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Settings, ChevronDown, Heart, ArrowRight } from 'lucide-react';

interface BooksViewProps {
  onBookClick: (id: string) => void;
  onBack: () => void;
  searchQuery: string;
}

const BooksView = ({ onBookClick, onBack, searchQuery }: BooksViewProps) => {
  const [filter, setFilter] = useState('Tất cả');

  const categories = ['Tất cả', 'Viễn tưởng', 'Không viễn tưởng', 'Khoa học', 'Lịch sử', 'Sách đang còn'];

  const booksData = [
    { id: 'stillness', title: 'The Art of Stillness', author: 'Pico Iyer', image: 'https://picsum.photos/seed/stillness/400/533', copies: 12, likes: '1.2k', status: 'active', category: 'Không viễn tưởng', type: 'Ebook' },
    { id: 'design', title: 'Design Systems', author: 'Alla Kholmatova', image: 'https://picsum.photos/seed/design/400/533', copies: 5, likes: '856', status: 'active', category: 'Khoa học', type: 'Sách giấy' },
    { id: 'arch', title: 'The Architecture of', author: 'Mary Oliver', image: 'https://picsum.photos/seed/arch/400/533', copies: 0, likes: '2.1k', status: 'out', category: 'Khoa học', type: 'Ebook' },
    { id: 'earth', title: 'A New Earth', author: 'Eckhart Tolle', image: 'https://picsum.photos/seed/earth/400/533', copies: 15, likes: '3.4k', status: 'active', category: 'Không viễn tưởng', type: 'Sách giấy' },
    { id: 'think', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', image: 'https://picsum.photos/seed/think/400/533', copies: 8, likes: '1.8k', status: 'active', category: 'Khoa học', type: 'Sách giấy' },
    { id: 'history', title: 'Sapiens', author: 'Yuval Noah Harari', image: 'https://picsum.photos/seed/sapiens/400/533', copies: 3, likes: '5.2k', status: 'active', category: 'Lịch sử', type: 'Ebook' }
  ];

  const filteredBooks = booksData.filter(book => {
    const matchesFilter = filter === 'Tất cả' || (filter === 'Sách đang còn' ? book.copies > 0 : book.category === filter);
    const matchesSearch = searchQuery === '' || book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="px-10 pb-20 pt-4">
      <div className="flex items-center space-x-6 mb-10">
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">Sách</h2>
      </div>

      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${filter === cat ? 'bg-[#1a1c20] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{cat}</button>
          ))}
        </div>
        <button className="flex items-center space-x-2 bg-gray-100 px-5 py-2.5 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-200 transition-colors">
          <Settings size={18} className="rotate-90" /><span>Sort By</span><ChevronDown size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
        {filteredBooks.map((book) => (
          <motion.div key={book.id} whileHover={{ y: -8 }} className="group cursor-pointer p-3 glass rounded-[2.5rem] transition-all hover:glass-dark flex flex-col justify-between">
            <div className="relative aspect-[3/4.2] rounded-3xl overflow-hidden shadow-sm bg-ink/5 mb-4" onClick={() => onBookClick(book.id)}>
              <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-ink shadow-sm">
                {book.type}
              </div>
            </div>
            <div className="space-y-3 px-2 pb-1 flex-1 flex flex-col justify-end">
              <div onClick={() => onBookClick(book.id)}>
                <h3 className="font-display italic font-bold text-xl text-ink tracking-tight leading-tight group-hover:text-forest transition-colors line-clamp-2">{book.title}</h3>
                <p className="text-ink/60 font-medium text-xs mt-1 uppercase tracking-wider">{book.author}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-ink/40 tracking-wider"><span>Còn {book.copies}</span><span>{book.likes} thích</span></div>
              <div className="flex items-center space-x-2 pt-2">
                <button 
                  onClick={() => onBookClick(book.id)}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs transition-all ${book.status === 'active' ? 'bg-forest text-white shadow-md shadow-forest/20 hover:bg-forest/90' : 'bg-ink/5 text-ink/40 cursor-not-allowed'}`}
                >
                  {book.status === 'active' ? 'Xem' : 'Đã hết'}
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="w-11 h-11 bg-ink/5 hover:bg-terra/10 hover:text-terra text-ink/40 rounded-2xl flex items-center justify-center transition-all"
                >
                  <Heart size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-3">
        {[1, 2, 3, 4].map((page) => (
          <button key={page} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${page === 1 ? 'bg-[#0066cc] text-white shadow-md shadow-blue-100' : 'text-gray-500 hover:bg-gray-100'}`}>{page}</button>
        ))}
        <span className="text-gray-400 font-bold px-2">...</span>
        <button className="flex items-center space-x-2 text-gray-900 font-bold text-sm hover:translate-x-1 transition-transform pl-4"><span>Next</span><ArrowRight size={18} /></button>
      </div>
    </motion.div>
  );
};

export default BooksView;
