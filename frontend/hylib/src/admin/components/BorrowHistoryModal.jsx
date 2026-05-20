import React, { useMemo } from 'react';
import { X } from 'lucide-react';

export default function BorrowHistoryModal({ isOpen, onClose, user }) {
  // Generate dummy data based on user id to make it look different for each user
  const historyData = useMemo(() => {
    if (!user) return [];
    
    // Seed a pseudo-random length based on user id string length or char codes
    const seed = user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
      const status = i === 0 ? "Borrowing" : statuses[statusIndex]; // Make sure at least one is borrowing or just random
      
      const borrowDate = new Date(2023, (seed % 12), (seed % 28) + 1 - (i * 15));
      const dueDate = new Date(borrowDate);
      dueDate.setDate(dueDate.getDate() + 14);
      
      let returnDate = "-";
      if (status === "Returned") {
        const retDate = new Date(dueDate);
        retDate.setDate(retDate.getDate() - (seed % 5)); // Returned a bit early
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
    
    // Sort so most recent is first
    return data.sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate));
  }, [user]);

  if (!isOpen) return null;

  const getStatusStyle = (status) => {
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
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
          <h2 className="text-[22px] font-bold text-gray-900">
            Lịch sử mượn/trả - {user?.name}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh] bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                <th className="px-8 py-5">BOOK TITLE</th>
                <th className="px-6 py-5">BORROW DATE</th>
                <th className="px-6 py-5">DUE DATE</th>
                <th className="px-6 py-5">RETURN DATE</th>
                <th className="px-8 py-5 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-gray-700">
              {historyData.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                  <td className="px-8 py-5 font-bold text-gray-900">{record.title}</td>
                  <td className="px-6 py-5">{record.borrowDate}</td>
                  <td className="px-6 py-5">{record.dueDate}</td>
                  <td className="px-6 py-5">{record.returnDate}</td>
                  <td className="px-8 py-5 text-right">
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
        <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 border border-gray-300 text-gray-700 font-bold text-[14px] hover:bg-gray-50 rounded-full transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
