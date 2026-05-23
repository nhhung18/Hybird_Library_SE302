import React from 'react';
import { Search, Filter, Plus, LayoutList, LayoutGrid, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Dashboard() {
  const books = [
    { id: 'ID4567', name: 'The Art of Stillness', author: 'Pico Iyer', status: 'Có sẵn', statusColor: 'bg-green-100 text-green-700', borrows: 50, rating: 70, image: 'https://picsum.photos/seed/stillness/100/100' },
    { id: 'ID3321', name: 'Design Systems', author: 'Alla Kholmatova', status: 'Đang mượn', statusColor: 'bg-blue-100 text-[#0066cc]', borrows: 45, rating: 44, image: 'https://picsum.photos/seed/design/100/100' },
    { id: 'ID2345', name: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', status: 'Bảo trì', statusColor: 'bg-amber-100 text-amber-700', borrows: 95, rating: 53, image: 'https://picsum.photos/seed/think/100/100' },
    { id: 'ID9980', name: 'A New Earth', author: 'Eckhart Tolle', status: 'Mất', statusColor: 'bg-red-100 text-red-700', borrows: 10, rating: 10, image: 'https://picsum.photos/seed/earth/100/100' },
    { id: 'ID1144', name: 'Sapiens', author: 'Yuval Noah Harari', status: 'Có sẵn', statusColor: 'bg-green-100 text-green-700', borrows: 80, rating: 90, image: 'https://picsum.photos/seed/sapiens/100/100' },
    { id: 'ID0987', name: 'Educated', author: 'Tara Westover', status: 'Đang mượn', statusColor: 'bg-blue-100 text-[#0066cc]', borrows: 170, rating: 0, image: 'https://picsum.photos/seed/educated/100/100' },
    { id: 'ID5467', name: 'Becoming', author: 'Michelle Obama', status: 'Có sẵn', statusColor: 'bg-green-100 text-green-700', borrows: 115, rating: 44, image: 'https://picsum.photos/seed/becoming/100/100' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f9fafb] font-sans text-gray-900">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header title="Quản lý sách" />
        
        <div className="p-8 flex-1 w-full max-w-7xl mx-auto">
          {/* Sub Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <span>Tất cả sách</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text"
                  placeholder="Tìm ID, tên sách..."
                  className="w-64 bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all placeholder-gray-400"
                />
              </div>

              <button className="flex items-center justify-center bg-white border border-gray-200 w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <Filter size={16} />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-[#0066cc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Plus size={16} />
                <span>Thêm sách mới</span>
              </button>
              
              <div className="flex bg-white border border-gray-200 rounded-lg p-0.5">
                <button className="p-1.5 bg-gray-100 text-gray-900 rounded-md shadow-sm">
                  <LayoutList size={16} />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-md transition-colors">
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-white border-b border-gray-200 text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Tên sách</th>
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium flex items-center space-x-1">
                      <span>Trạng thái</span>
                      <ChevronDown size={14} />
                    </th>
                    <th className="px-6 py-4 font-medium flex items-center space-x-1">
                      <span>Tác giả</span>
                      <ChevronDown size={14} />
                    </th>
                    <th className="px-6 py-4 font-medium flex items-center space-x-1">
                      <span>Lượt mượn</span>
                      <ChevronDown size={14} />
                    </th>
                    <th className="px-6 py-4 font-medium">Đánh giá</th>
                    <th className="px-6 py-4 font-medium text-center w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {books.map((book, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img src={book.image} alt={book.name} className="w-8 h-8 rounded object-cover border border-gray-200" />
                          <span className="font-semibold text-gray-900">{book.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{book.id}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${book.statusColor}`}>
                          {book.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{book.author}</td>
                      <td className="px-6 py-4 text-gray-600">{book.borrows}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                book.rating > 60 ? 'bg-green-500' : 
                                book.rating > 30 ? 'bg-amber-500' : 
                                book.rating > 0 ? 'bg-red-500' : 'bg-gray-300'
                              }`} 
                              style={{ width: `${book.rating}%` }}
                            ></div>
                          </div>
                          <span className="font-semibold text-gray-900 w-8">{book.rating}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-gray-400 hover:text-gray-900 transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Results: 1 - 7 of 245</span>
                <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-2 py-1 cursor-pointer hover:bg-gray-50">
                  <span>20</span>
                  <ChevronDown size={14} />
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-md transition-colors"><ChevronLeft size={16} /></button>
                <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors">1</button>
                <button className="w-8 h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-900 font-medium rounded-md">2</button>
                <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors">3</button>
                <span className="text-gray-400 px-1">...</span>
                <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors">7</button>
                <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-md transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
