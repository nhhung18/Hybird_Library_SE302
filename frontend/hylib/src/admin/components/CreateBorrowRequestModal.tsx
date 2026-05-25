import React, { useEffect, useState } from 'react';
import { X, Search, Book, Trash2, Calendar, AlignLeft, CheckCircle2 } from 'lucide-react';

interface CreateBorrowRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export default function CreateBorrowRequestModal({ isOpen, onClose, onCreate }: CreateBorrowRequestModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: 'Nguyễn Văn A',
    id: 'MEM-2023-089',
    status: 'Đủ điều kiện (0/5 sách)'
  });

  const [selectedBooks, setSelectedBooks] = useState([
    { id: 1, title: 'Thiết kế lấy người dùng làm trung tâm', author: 'Don Norman', isbn: '978-1234567890' },
    { id: 2, title: 'Nghệ thuật Typography hiện đại', author: 'Ellen Lupton', isbn: '978-0987654321' }
  ]);

  const [pickupDate, setPickupDate] = useState('2023-10-24');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleRemoveBook = (id: number) => {
    setSelectedBooks(selectedBooks.filter(book => book.id !== id));
  };

  const handleCreate = () => {
    const newRequest = {
      id: `BRW-${new Date().getTime().toString().slice(-6)}`,
      user: selectedUser.name,
      date: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      method: 'Offline',
      quantity: `${selectedBooks.length} cuốn`,
      books: selectedBooks
    };
    onCreate(newRequest);
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans p-4`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-full max-w-2xl p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tạo yêu cầu mượn mới</h2>
        <p className="text-sm text-gray-500 mb-6">Thêm sách vào yêu cầu mượn cho độc giả.</p>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-6">
          {/* Reader Search */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Tìm kiếm độc giả</label>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Nhập tên hoặc mã độc giả..."
                className="w-full pl-10 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700 placeholder-gray-300"
              />
            </div>
            
            {/* Selected Reader Card */}
            {selectedUser && (
              <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{selectedUser.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-gray-400 font-semibold">ID: {selectedUser.id}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[11px] font-semibold text-green-600 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-white transition-all shadow-sm">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Book Search */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Tìm và chọn sách</label>
            <div className="relative mb-4">
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Nhập tên sách, tác giả hoặc ISBN..."
                className="w-full pl-10 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700 placeholder-gray-300"
              />
            </div>

            {/* Selected Books List */}
            <div className="flex flex-col gap-3">
              {selectedBooks.map((book) => (
                <div key={book.id} className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shadow-inner text-gray-400 shrink-0">
                      <Book size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-950 leading-tight mb-1">{book.title}</p>
                      <p className="text-[11px] text-gray-400 font-semibold">{book.author} • ISBN: {book.isbn}</p>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveBook(book.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Date & Note */}
          <div className="flex gap-6 mt-2">
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Ngày hẹn lấy sách</label>
              <div className="relative">
                <Calendar className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700 bg-transparent"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Ghi chú (Tùy chọn)</label>
              <div className="relative">
                <AlignLeft className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Thêm hướng dẫn..."
                  className="w-full pl-8 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700 placeholder-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-sm"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
