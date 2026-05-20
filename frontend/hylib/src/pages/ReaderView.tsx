import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, MoreVertical, BookOpen, Settings } from 'lucide-react';

const ReaderView = ({ onBack }: { onBack: () => void }) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 342;

  return (
    <div className="fixed inset-0 z-[100] bg-[#f8fafc] flex flex-col">
      {/* Reader Header */}
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0">
        <div className="flex items-center space-x-8">
          <button onClick={onBack} className="p-3 hover:bg-gray-50 rounded-full transition-colors flex items-center justify-center">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">The Art of Stillness</h2>
            <p className="text-sm font-medium text-gray-400">Pico Iyer</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-4">
            <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="text-gray-500 hover:text-gray-900"><ZoomOut size={18} /></button>
            <span className="text-sm font-bold text-gray-900 min-w-[3rem] text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="text-gray-500 hover:text-gray-900"><ZoomIn size={18} /></button>
          </div>
          <div className="h-8 w-[1px] bg-gray-100" />
          <button className="p-2 text-gray-500 hover:text-gray-900"><Maximize2 size={20} /></button>
          <button className="p-2 text-gray-500 hover:text-gray-900"><Settings size={20} /></button>
          <button className="p-2 text-gray-500 hover:text-gray-900"><MoreVertical size={20} /></button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-auto p-12 flex justify-center bg-[#f1f5f9]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-2xl rounded-sm w-full max-w-4xl p-24 relative min-h-[1200px]"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          <div className="prose prose-slate max-w-none">
            <h1 className="text-center italic mb-16 text-4xl">Chapter 1: The Beauty of Doing Nothing</h1>
            <p className="text-xl leading-relaxed text-gray-700 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-3 first-letter:float-left mb-8">
              It can be the most profound adventure of all, I tell myself as I stand at the window. To go nowhere is as much a part of travel as going somewhere. Sitting still is not just about staying in one place, it's about being focused and being aware.
            </p>
            <p className="text-xl leading-relaxed text-gray-700 mb-8 font-serif italic text-center px-12 py-8 bg-gray-50 rounded-xl my-16">
              "The soul cannot thrive in the absence of silence. It needs rooms of its own, spaces where the noise of the world cannot penetrate."
            </p>
            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              In an age of speed, nothing is so exhilarating as going slow. In an age of distraction, nothing is so luxurious as paying attention. And in an age of constant movement, nothing is so urgent as sitting still.
            </p>
            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              Many of us have the sense that we're leading lives of permanent motion, in which our minds are racing ten yards ahead of our bodies. We're constantly on the verge of missing out on something, and we're always trying to catch up with our own notifications.
            </p>
          </div>
          
          <div className="absolute top-12 left-12 w-12 h-12 border-l-2 border-t-2 border-gray-100" />
          <div className="absolute top-12 right-12 w-12 h-12 border-r-2 border-t-2 border-gray-100" />
          <div className="absolute bottom-12 left-12 w-12 h-12 border-l-2 border-b-2 border-gray-100" />
          <div className="absolute bottom-12 right-12 w-12 h-12 border-r-2 border-b-2 border-gray-100" />
        </motion.div>
      </main>

      {/* Reader Footer Control */}
      <footer className="h-20 bg-white border-t border-gray-100 flex items-center justify-between px-10 shrink-0">
        <div className="flex items-center space-x-4">
          <BookOpen size={20} className="text-[#0066cc]" />
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Progress</span>
        </div>

        <div className="flex items-center space-x-8">
          <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(currentPage / totalPages) * 100}%` }}
              className="h-full bg-[#0066cc]" 
            />
          </div>
          <div className="flex items-center space-x-4">
            <input 
              type="number" 
              value={currentPage}
              onChange={(e) => setCurrentPage(Math.min(totalPages, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-16 h-10 border border-gray-100 rounded-lg text-center font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-100"
            />
            <span className="text-gray-400 font-bold">/</span>
            <span className="text-gray-900 font-bold">{totalPages}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-6 py-2.5 rounded-full font-bold text-sm text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="px-10 py-2.5 bg-[#1a1c20] text-white rounded-full font-bold text-sm shadow-lg hover:shadow-gray-200 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ReaderView;
