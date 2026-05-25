import React, { useMemo, useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function BorrowHistoryModal({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: any }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  // Generate dummy data based on user id to make it look different for each user
  const historyData = useMemo(() => {
    if (!user) return [];
    
    const seed = user.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const count = (seed % 4) + 2; // 2 to 5 items
    
    const books = [
      "The Design of Everyday Things",
      "Sapiens: A Brief History of Humankind",
      "Thinking, Fast and Slow",
      "Atomic Habits",
      "Clean Code",
      "1984",
      "To Kill a Mockingbird",
      "The Great Gatsby"
    ];

    const statuses = ["Borrowing", "Returned", "Overdue"];
    
    const data = [];
    for (let i = 0; i < count; i++) {
      const bookIndex = (seed + i * 3) % books.length;
      const statusIndex = (seed + i * 7) % statuses.length;
      const status = i === 0 ? "Borrowing" : statuses[statusIndex];
      
      const borrowDate = new Date(2023, (seed % 12), (seed % 28) + 1 - (i * 15));
      const dueDate = new Date(borrowDate);
      dueDate.setDate(dueDate.getDate() + 14);
      
      let returnDate = "-";
      if (status === "Returned") {
        const retDate = new Date(dueDate);
        retDate.setDate(retDate.getDate() - (seed % 5));
        returnDate = retDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }

      data.push({
        id: i,
        title: books[bookIndex],
        borrowDate: borrowDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        dueDate: dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        returnDate,
        status
      });
    }
    
    return data.sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime());
  }, [user]);

  if (!isOpen && !isVisible) return null;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Borrowing':
        return 'bg-[#0056b3] text-white border-transparent';
      case 'Returned':
        return 'bg-white text-gray-700 border-gray-300';
      case 'Overdue':
        return 'bg-red-100 text-red-600 border-transparent';
      default:
        return 'bg-gray-100 text-gray-700 border-transparent';
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans p-4`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-full max-w-3xl shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
          <h2 className="text-[20px] font-bold text-gray-900">
            Lịch sử mượn/trả - {user?.name}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[50vh] bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                <th className="px-8 py-4">BOOK TITLE</th>
                <th className="px-6 py-4">BORROW DATE</th>
                <th className="px-6 py-4">DUE DATE</th>
                <th className="px-6 py-4">RETURN DATE</th>
                <th className="px-8 py-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {historyData.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors bg-white">
                  <td className="px-8 py-4 font-bold text-gray-900">{record.title}</td>
                  <td className="px-6 py-4">{record.borrowDate}</td>
                  <td className="px-6 py-4">{record.dueDate}</td>
                  <td className="px-6 py-4">{record.returnDate}</td>
                  <td className="px-8 py-4 text-right">
                    <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border ${getStatusStyle(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
