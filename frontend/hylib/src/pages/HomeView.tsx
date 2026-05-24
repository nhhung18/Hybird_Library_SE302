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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const HomeView = ({ onLoginClick, onRegisterClick, isLoggedIn, onBookClick }: HomeViewProps) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="show"
    exit={{ opacity: 0, transition: { duration: 0.3 } }}
    className="pb-32"
  >
    {/* HERO SECTION - EDITORIAL SPREAD */}
    <section className="px-4 md:px-12 lg:px-16 pt-20 pb-32 flex flex-col md:flex-row items-center min-h-[80vh]">
      <motion.div className="flex-1 pr-16 z-10" variants={fadeUpItem}>
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-[1px] bg-ink"></div>
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold">Featured Volume</span>
        </div>
        <h2 className="font-display text-8xl text-ink leading-[0.9] mb-8 tracking-tighter">
          The Art of <br /> <span className="italic font-light">Stillness</span>
        </h2>
        <p className="text-ink/60 text-lg max-w-md leading-relaxed mb-12 font-light">
          A compelling exploration into the quiet moments that define our modern existence.
          Photography and prose intertwined to create a masterpiece of reflection.
        </p>
        <div className="flex items-center space-x-8">
          <button
            onClick={isLoggedIn ? () => onBookClick('stillness') : onRegisterClick}
            className="bg-[#1e3b2b] text-white px-12 py-4 rounded-full font-bold shadow-lg shadow-[#1e3b2b]/20 hover:shadow-xl hover:-translate-y-1 transition-all text-sm uppercase tracking-widest"
          >
            {isLoggedIn ? "Read Volume" : "Subscribe to Read"}
          </button>
          <button
            onClick={isLoggedIn ? undefined : onLoginClick}
            className="text-ink font-medium hover:text-forest transition-colors flex items-center space-x-3 group"
          >
            {isLoggedIn ? (
              <>
                <span className="border-b border-ink/20 pb-1 group-hover:border-forest/50 transition-colors">Save to Collection</span>
              </>
            ) : (
              <span className="border-b border-ink/20 pb-1 hover:border-ink transition-colors">Sign In</span>
            )}
          </button>
        </div>
      </motion.div>

      <motion.div className="flex-1 flex justify-end relative" variants={fadeUpItem}>
        <div className="relative group cursor-pointer w-full max-w-[480px]" onClick={() => onBookClick('stillness')}>
          <div className="aspect-[3/4] relative z-10 overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] rounded-[2.5rem] bg-ink/5">
            <img
              src="https://picsum.photos/seed/stillness/800/1066"
              alt="The Art of Stillness"
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
              <span className="text-sand/70 font-sans text-xs tracking-[0.2em] uppercase mb-2">By Pico Iyer</span>
              <span className="text-sand font-display italic text-3xl">View Details</span>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-full h-full border border-ink/10 rounded-[2.5rem] -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
          <div className="absolute top-12 -left-12 w-24 h-24 bg-terra rounded-full mix-blend-multiply blur-2xl opacity-40"></div>
        </div>
      </motion.div>
    </section>

    {/* CURATED SELECTIONS */}
    <motion.section className="py-32 px-4 md:px-12 lg:px-16 border-t border-ink/10" variants={fadeUpItem}>
      <div className="flex items-end justify-between mb-20">
        <div>
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-terra mb-4 block">Curated For You</span>
          <h2 className="font-display text-5xl text-ink">Selected <span className="italic">Volumes</span></h2>
        </div>
        <button className="flex items-center space-x-4 text-ink hover:text-forest transition-colors group pb-2 border-b border-ink/20 hover:border-forest">
          <span className="font-medium text-sm tracking-wide uppercase">View the Archive</span>
          <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {[
          { id: 'form-function', title: 'Form & Function', author: 'E. Harrison', image: 'https://picsum.photos/seed/abstract/400/533', year: '2025', type: 'Sách giấy' },
          { id: 'whitespace', title: 'Whitespace', author: 'M. Chen', image: 'https://picsum.photos/seed/minimal/400/533', year: '2024', type: 'Ebook' },
          { id: 'northern-lights', title: 'Northern Lights', author: 'A. Jensen', image: 'https://picsum.photos/seed/lights/400/533', year: '2026', type: 'Sách giấy' },
          { id: 'botanic', title: 'Botanic', author: 'S. Rivera', image: 'https://picsum.photos/seed/plant/400/533', year: '2023', type: 'Ebook' },
        ].map((book, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group cursor-pointer flex flex-col p-3 glass-panel rounded-[2.5rem] transition-all hover:-translate-y-2 hover:shadow-xl"
            onClick={() => onBookClick(book.id)}
          >
            <div className="relative aspect-[3/4.2] overflow-hidden bg-ink/5 mb-6 rounded-3xl">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-ink shadow-sm">
                {book.type}
              </div>
            </div>
            <div className="flex justify-between items-start px-2 pb-2">
              <div>
                <h3 className="font-display font-bold text-xl text-ink mb-1 group-hover:italic transition-all">{book.title}</h3>
                <p className="text-ink/50 font-sans text-xs uppercase tracking-widest">{book.author}</p>
              </div>
              <span className="text-[10px] font-mono text-ink/40 bg-ink/5 px-2 py-1 rounded-lg">{book.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>

    {/* EXPLORE CATEGORIES */}
    <motion.section className="px-4 md:px-12 lg:px-16 py-20 bg-ink text-sand" variants={fadeUpItem}>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-5xl mb-16 font-light">Explore <span className="italic">Collections</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Architecture', stats: '342 volumes', image: 'https://picsum.photos/seed/library/800/800' },
            { title: 'Fine Art', stats: '128 volumes', image: 'https://picsum.photos/seed/art/800/800' },
            { title: 'Philosophy', stats: '256 volumes', image: 'https://picsum.photos/seed/science/800/800' },
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              className="bg-ink relative group cursor-pointer aspect-square overflow-hidden flex items-center justify-center rounded-[2.5rem] m-2"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-700 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 text-center p-8 transition-transform duration-500 group-hover:scale-105">
                <h3 className="font-display text-3xl italic mb-3">{cat.title}</h3>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-sand/60">{cat.stats}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  </motion.div>
);

export default HomeView;
