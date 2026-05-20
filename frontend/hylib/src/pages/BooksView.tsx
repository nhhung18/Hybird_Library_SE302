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
    { id: 'stillness', title: 'The Art of Stillness', author: 'Pico Iyer', image: 'https://picsum.photos/seed/stillness/400/533', copies: 12, likes: '1.2k', status: 'active', category: 'Không viễn tưởng' },
    { id: 'design', title: 'Design Systems', author: 'Alla Kholmatova', image: 'https://picsum.photos/seed/design/400/533', copies: 5, likes: '856', status: 'active', category: 'Khoa học' },
    { id: 'arch', title: 'The Architecture of', author: 'Mary Oliver', image: 'https://picsum.photos/seed/arch/400/533', copies: 0, likes: '2.1k', status: 'out', category: 'Khoa học' },
    { id: 'earth', title: 'A New Earth', author: 'Eckhart Tolle', image: 'https://picsum.photos/seed/earth/400/533', copies: 15, likes: '3.4k', status: 'active', category: 'Không viễn tưởng' },
    { id: 'think', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', image: 'https://picsum.photos/seed/think/400/533', copies: 8, likes: '1.8k', status: 'active', category: 'Khoa học' },
    { id: 'history', title: 'Sapiens', author: 'Yuval Noah Harari', image: 'https://picsum.photos/seed/sapiens/400/533', copies: 3, likes: '5.2k', status: 'active', category: 'Lịch sử' }
  ];

  const filteredBooks = booksData.filter(book => {
    const matchesFilter = filter === 'Tất cả' || (filter === 'Sách đang còn' ? book.copies > 0 : book.category === filter);
    const matchesSearch = searchQuery === '' || book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="px-10 pb-20 pt-4">
      <div className="flex items-center space-x-6 mb-10">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={28} className="text-gray-900" /></button>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {filteredBooks.map((book) => (
          <motion.div key={book.id} whileHover={{ y: -8 }} onClick={() => onBookClick(book.id)} className="group cursor-pointer">
            <div className="relative aspect-[3/4.2] rounded-[2rem] overflow-hidden shadow-lg bg-gray-100 mb-6 transition-shadow group-hover:shadow-2xl">
              <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <button className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm"><Heart size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-2xl text-gray-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{book.title}</h3>
                <p className="text-gray-500 font-medium text-sm mt-1">{book.author}</p>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-400"><span>Còn {book.copies} cuốn</span><span>{book.likes} lượt thích</span></div>
              <button className={`w-full py-3.5 rounded-full font-bold text-sm transition-all ${book.status === 'active' ? 'bg-[#0066cc] text-white shadow-lg shadow-blue-100 hover:shadow-blue-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>{book.status === 'active' ? 'Xem' : 'Đã hết'}</button>
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
