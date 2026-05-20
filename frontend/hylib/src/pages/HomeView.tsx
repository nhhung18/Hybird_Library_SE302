import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  isLoggedIn: boolean;
  onBookClick: (id: string) => void;
  key?: string;
}

const HomeView = ({ onLoginClick, onRegisterClick, isLoggedIn, onBookClick }: HomeViewProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <section className="px-10 py-12 flex items-center">
      <div className="flex-1 pr-12">
        <span className="text-[#0066cc] font-bold text-xs tracking-widest uppercase mb-4 block">SÁCH MỚI</span>
        <h2 className="text-7xl font-bold text-gray-900 leading-[1.1] mb-8">
          The Art of <br /> Stillness
        </h2>
        <p className="text-gray-500 text-lg max-w-md leading-relaxed mb-10">
          A compelling exploration into the quiet moments that define our modern existence. 
          Photography and prose intertwined to create a masterpiece of reflection.
        </p>
        <div className="flex items-center space-x-8">
          <button 
            onClick={isLoggedIn ? () => onBookClick('stillness') : onRegisterClick}
            className="bg-[#0066cc] text-white px-10 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 text-sm"
          >
            {isLoggedIn ? "Đọc Ngay" : "Đăng ký để đọc"}
          </button>
          <button 
            onClick={isLoggedIn ? undefined : onLoginClick}
            className="text-[#0066cc] font-bold hover:opacity-80 transition-opacity flex items-center space-x-2"
          >
            {isLoggedIn ? (
              <>
                <Heart size={18} />
                <span>Thêm vào mục yêu thích</span>
              </>
            ) : "Đăng nhập"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative group cursor-pointer" onClick={() => onBookClick('stillness')}>
          <div className="w-[320px] h-[640px] bg-white rounded-[3.5rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10 border-[10px] border-gray-50/50">
            <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-gray-900 border-2 border-gray-100 relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-20"></div>
               <img 
                 src="https://picsum.photos/seed/stillness/600/1200" 
                 alt="The Art of Stillness"
                 className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center bg-black/20 backdrop-blur-[2px]">
                  <h3 className="text-2xl font-serif mb-2 font-medium">The Art of Stillness</h3>
                  <div className="w-12 h-[1px] bg-white/50 mb-4"></div>
                  <p className="text-[10px] opacity-70 uppercase tracking-[0.3em] font-medium">Pico Iyer</p>
               </div>
            </div>
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] h-24 bg-black/5 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>

    <section className="bg-[#1a1c20] py-24 px-10 rounded-[3.5rem] mx-4 mb-20 text-white shadow-2xl">
      <div className="flex items-end justify-between mb-16">
        <div>
          <h2 className="text-4xl font-bold mb-3">Đề xuất cho bạn</h2>
          <p className="text-gray-400 font-medium">Được chọn lọc phù hợp với bạn</p>
        </div>
        <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group px-4 py-2 rounded-full border border-white/10 hover:bg-white/5">
          <span className="font-bold text-sm">Xem tất cả</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { id: 'form-function', title: 'Form & Function', author: 'E. Harrison', image: 'https://picsum.photos/seed/abstract/400/533' },
          { id: 'whitespace', title: 'Whitespace', author: 'M. Chen', image: 'https://picsum.photos/seed/minimal/400/533' },
          { id: 'northern-lights', title: 'Northern Lights', author: 'A. Jensen', image: 'https://picsum.photos/seed/lights/400/533' },
          { id: 'botanic', title: 'Botanic', author: 'S. Rivera', image: 'https://picsum.photos/seed/plant/400/533' },
        ].map((book, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -12 }}
            className="space-y-5 cursor-pointer group"
            onClick={() => onBookClick(book.id)}
          >
            <div className="aspect-[3/4.2] rounded-[1.5rem] overflow-hidden shadow-2xl bg-gray-800 transition-transform duration-500">
              <img 
                src={book.image} 
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1 group-hover:text-blue-400 transition-colors">{book.title}</h3>
              <p className="text-gray-500 font-medium text-sm">{book.author}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="px-10 pb-24">
      <h2 className="text-5xl font-bold mb-16 text-gray-900 tracking-tight">Explore Categories</h2>
      
      <div className="grid grid-cols-3 gap-8 auto-rows-[340px]">
        {[
          { title: 'Caa', stats: '342 Curated volumes', image: 'https://picsum.photos/seed/library/800/600', size: 'col-span-2' },
          { title: 'Fine Art', stats: '128 Curated volumes', image: 'https://picsum.photos/seed/art/600/600', size: 'col-span-1' },
          { title: 'Science', stats: '', image: 'https://picsum.photos/seed/science/600/600', size: 'col-span-1' },
          { title: 'Travel & Exploration', stats: '', image: 'https://picsum.photos/seed/nature/1200/600', size: 'col-span-2 text-dark' },
        ].map((cat, idx) => (
          <div 
            key={idx}
            className={`${cat.size} relative rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500`}
          >
            <img 
              src={cat.image} 
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-white text-3xl font-bold mb-2 transition-transform duration-500 group-hover:-translate-y-1">{cat.title}</h3>
              {cat.stats && <p className="text-white/80 text-sm font-semibold tracking-wide">{cat.stats}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

export default HomeView;
