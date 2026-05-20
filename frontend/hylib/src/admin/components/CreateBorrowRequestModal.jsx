import React, { useState } from 'react';
import { X, Search, Book, Trash2, Calendar, AlignLeft, CheckCircle2 } from 'lucide-react';

export default function CreateBorrowRequestModal({ isOpen, onClose, onCreate }) {
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

  if (!isOpen) return null;

  const handleRemoveBook = (id) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 ">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Tạo yêu cầu mượn mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-6">
          
          {/* Reader Search */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              TÌM KIẾM ĐỘC GIẢ
            </label>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Nhập tên hoặc mã độc giả..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-700"
              />
            </div>
            
            {/* Selected Reader Card */}
            {selectedUser && (
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{selectedUser.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-gray-500">ID: {selectedUser.id}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[11px] font-medium text-green-600 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Book Search */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              TÌM VÀ CHỌN SÁCH
            </label>
            <div className="relative mb-4">
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Nhập tên sách, tác giả hoặc ISBN..."
                className="w-full pl-10 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700"
              />
            </div>

            {/* Selected Books List */}
            <div className="flex flex-col gap-3">
              {selectedBooks.map((book) => (
                <div key={book.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center shadow-inner text-gray-400 shrink-0">
                      <Book size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 leading-tight mb-1">{book.title}</p>
                      <p className="text-[12px] text-gray-500">{book.author} • ISBN: {book.isbn}</p>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveBook(book.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Date & Note */}
          <div className="flex gap-6 mt-2">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                NGÀY HẸN LẤY SÁCH
              </label>
              <div className="relative">
                <Calendar className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                GHI CHÚ (TÙY CHỌN)
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Thêm hướng dẫn..."
                  className="w-full pl-8 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-2.5 text-sm font-medium text-white bg-[#0056b3] rounded-full hover:bg-blue-700 transition-colors shadow-sm"
          >
            Tạo yêu cầu
          </button>
        </div>
      </div>
    </div>
  );
}
