import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, Plus, Book as BookIcon, ChevronDown, Library, Edit, Trash2 } from 'lucide-react';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

interface Book {
  id: number;
  title: string;
  isbn: string;
  author: string;
  categories: string[];
  location: string;
  stock: number;
  coverData?: string;
}

export default function BookManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('libraryBooks');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        title: 'The Design of Everyday Things',
        isbn: '978-0465050659',
        author: 'Don Norman',
        categories: ['THIẾT KẾ', 'UX/UI'],
        location: 'Kệ A2',
        stock: 5
      },
      {
        id: 2,
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        isbn: '978-0132350884',
        author: 'Robert C. Martin',
        categories: ['LẬP TRÌNH'],
        location: 'Kệ C4',
        stock: 12
      },
      {
        id: 3,
        title: 'Pragmatic Programmer',
        isbn: '978-0135957059',
        author: 'Andy Hunt',
        categories: ['LẬP TRÌNH'],
        location: 'Kệ C4',
        stock: 8
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
  }, [books]);

  const handleDeleteBook = (id: number) => {
    setBookToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (bookToDelete !== null) {
      setBooks(books.filter(b => b.id !== bookToDelete));
    }
    setIsDeleteModalOpen(false);
    setBookToDelete(null);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  );

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans text-gray-900">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Header title="Quản lý Kho Sách" />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Header section */}
          <div className="flex justify-between items-center mb-6 shrink-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Kho Sách</h1>
              <p className="text-sm text-gray-500 font-medium">Quản lý và tra cứu toàn bộ danh mục tài liệu.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Tìm kiếm sách, tác giả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-full focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] text-sm shadow-sm transition-all bg-white"
                />
              </div>
              <button 
                onClick={() => navigate('/books/create')}
                className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2 rounded-full font-bold text-sm transition-colors shadow-md"
              >
                <Plus size={18} />
                Thêm sách mới
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 flex flex-col flex-1 shadow-sm overflow-hidden min-h-0">
            {/* Table */}
            <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                  <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                    <th className="px-6 py-5 w-24">ẢNH BÌA</th>
                    <th className="px-6 py-5">TÊN SÁCH</th>
                    <th className="px-6 py-5">TÁC GIẢ</th>
                    <th className="px-6 py-5">THỂ LOẠI</th>
                    <th className="px-6 py-5">VỊ TRÍ</th>
                    <th className="px-6 py-5 text-right">TỒN KHO</th>
                    <th className="px-6 py-5 text-center">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700">
                  {filteredBooks.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
                        Không tìm thấy sách nào trong thư viện.
                      </td>
                    </tr>
                  ) : (
                    filteredBooks.map((book, index) => (
                      <tr key={book.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                        
                        {/* Cover */}
                        <td className="px-6 py-4">
                          <div className="w-12 h-16 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden shrink-0 shadow-sm">
                             {book.coverData ? (
                               <img src={book.coverData} alt="Cover" className="w-full h-full object-cover" />
                             ) : (
                               <BookIcon size={20} className={index % 2 === 0 ? "text-gray-400" : "text-[#0066cc]"} />
                             )}
                          </div>
                        </td>

                        {/* Title & ISBN */}
                        <td className="px-6 py-4">
                           <p className="font-bold text-gray-900 mb-1">{book.title}</p>
                           <p className="text-[11px] text-gray-500 font-medium">ISBN: {book.isbn}</p>
                        </td>

                        {/* Author */}
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {book.author}
                        </td>

                        {/* Categories */}
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {book.categories.map((cat, i) => (
                              <span key={i} className="inline-flex items-center justify-center px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-500 font-medium text-xs uppercase tracking-wide">
                            <Library size={14} className="text-gray-400" />
                            {book.location}
                          </div>
                        </td>

                        {/* Stock */}
                        <td className="px-6 py-4 text-right font-bold text-gray-900">
                          {book.stock}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-3 text-gray-400">
                            <button 
                              onClick={() => navigate(`/books/edit/${book.id}`)}
                              className="hover:text-[#0056b3] transition-colors p-1 active:scale-95"
                              title="Sửa"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteBook(book.id)}
                              className="hover:text-red-500 transition-colors p-1 active:scale-95"
                              title="Xóa"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 bg-white shrink-0">
              <span className="font-medium">Hiển thị 1 - {filteredBooks.length} của {filteredBooks.length} sách</span>
            </div>
          </div>
        </div>
      </main>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa sách"
        message="Bạn có chắc chắn muốn xóa cuốn sách này không? Thao tác này không thể hoàn tác."
      />
    </div>
  );
}
