import React, { useEffect, useState } from 'react';
import { X, Search, Book, Trash2, Calendar, CheckCircle2, RefreshCw, Camera } from 'lucide-react';
import { ReceiveMethod } from '../../types';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export default function CreateRequestModal({ isOpen, onClose, onCreate }: CreateRequestModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'borrow' | 'return'>('borrow');

  // BORROW STATE
  const [searchUserStr, setSearchUserStr] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchBookStr, setSearchBookStr] = useState('');
  const [selectedBooks, setSelectedBooks] = useState<any[]>([]);
  const [pickupDate, setPickupDate] = useState('');
  const [receiveMethod, setReceiveMethod] = useState<ReceiveMethod>(ReceiveMethod.LIBRARY_PICKUP);

  // RETURN STATE
  const [searchReturnUserStr, setSearchReturnUserStr] = useState('');
  const [selectedReturnUser, setSelectedReturnUser] = useState<any>(null);
  const [activeBorrowRecords, setActiveBorrowRecords] = useState<any[]>([]);
  const [selectedRecordsToReturn, setSelectedRecordsToReturn] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Reset form on open
      setActiveTab('borrow');
      setSearchUserStr('');
      setSelectedUser(null);
      setSearchBookStr('');
      setSelectedBooks([]);
      setPickupDate(new Date().toISOString().split('T')[0]);
      setReceiveMethod(ReceiveMethod.LIBRARY_PICKUP);

      setSearchReturnUserStr('');
      setSelectedReturnUser(null);
      setActiveBorrowRecords([]);
      setSelectedRecordsToReturn([]);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  const handleCreate = () => {
    if (activeTab === 'borrow') {
      const newRequest = {
        type: 'borrow',
        userId: selectedUser?.id,
        books: selectedBooks.map(b => b.id),
        receiveMethod,
        dueDate: pickupDate
      };
      onCreate(newRequest);
    } else {
      const newRequest = {
        type: 'return',
        userId: selectedReturnUser?.id,
        returnRecords: selectedRecordsToReturn.map(r => r.id),
      };
      onCreate(newRequest);
    }
    onClose();
  };

  // Mock User Search (For UI demonstration)
  const handleUserSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, isReturn: boolean) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const mockUser = {
        name: isReturn ? searchReturnUserStr : searchUserStr,
        id: Math.floor(Math.random() * 1000),
        status: 'Đủ điều kiện'
      };
      if (isReturn) {
        setSelectedReturnUser(mockUser);
        // Mock finding active borrow records
        setActiveBorrowRecords([
          { id: 101, bookTitle: 'Sách mẫu 1', borrowDate: '2023-10-01', dueDate: '2023-10-15' },
          { id: 102, bookTitle: 'Sách mẫu 2', borrowDate: '2023-10-02', dueDate: '2023-10-16' }
        ]);
        setSearchReturnUserStr('');
      } else {
        setSelectedUser(mockUser);
        setSearchUserStr('');
      }
    }
  };

  const handleBookSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchBookStr) {
      e.preventDefault();
      setSelectedBooks([...selectedBooks, {
        id: Math.floor(Math.random() * 1000),
        title: searchBookStr,
        author: 'Tác giả chưa rõ',
        isbn: '123-456-789'
      }]);
      setSearchBookStr('');
    }
  };

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;
    let isComponentMounted = true;

    if (isScanning && activeTab === 'return') {
      const initScanner = setTimeout(() => {
        if (!isComponentMounted) return;
        try {
          scanner = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
          );

          scanner.render(
            (decodedText) => {
              if (scanner) {
                scanner.clear().then(() => {
                  if (isComponentMounted) {
                    setIsScanning(false);
                    const mockUser = {
                      name: 'Người dùng (Quét QR)',
                      id: 'USR-SCAN',
                      status: 'Đủ điều kiện'
                    };
                    setSelectedReturnUser(mockUser);

                    const mockRecord = {
                      id: 999,
                      bookTitle: `Sách quét được: ${decodedText}`,
                      borrowDate: '2023-10-01',
                      dueDate: '2023-10-15'
                    };

                    setActiveBorrowRecords([mockRecord]);
                    setSelectedRecordsToReturn([mockRecord]);
                  }
                }).catch(console.error);
              }
            },
            (error) => { }
          );
        } catch (e) {
          console.error("Scanner init error:", e);
        }
      }, 50);

      return () => {
        isComponentMounted = false;
        clearTimeout(initScanner);
        if (scanner) {
          try {
            scanner.clear().catch(console.error);
          } catch (e) { }
        }
      };
    }
  }, [isScanning, activeTab]);

  const toggleRecordSelection = (record: any) => {
    const exists = selectedRecordsToReturn.find(r => r.id === record.id);
    if (exists) {
      setSelectedRecordsToReturn(selectedRecordsToReturn.filter(r => r.id !== record.id));
    } else {
      setSelectedRecordsToReturn([...selectedRecordsToReturn, record]);
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans p-4`}>
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className={`bg-white rounded-3xl w-full max-w-2xl p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} flex flex-col overflow-hidden`}>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tạo Ghi Nhận Mới</h2>

        {/* Centered Camera Pop-up Modal */}
        <div className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-[2px] transition-all duration-300 ease-in-out ${isScanning ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md relative flex flex-col items-center mx-4 transition-transform duration-300 ${isScanning ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Quét Mã QR</h3>
            <p className="text-xs text-gray-500 mb-6 text-center font-medium">Đặt mã QR sách trước ống kính để quét tự động</p>

            <div id="qr-reader" className="w-full rounded-2xl overflow-hidden border border-gray-100 shadow-inner"></div>

            <button
              onClick={() => setIsScanning(false)}
              className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-full transition-colors uppercase mt-6 shadow-sm tracking-wider"
            >
              Đóng Camera
            </button>
          </div>
        </div>

        {/* Custom Tab Toggle */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-8 shrink-0 relative">
          <button
            onClick={() => setActiveTab('borrow')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-300 z-10 ${activeTab === 'borrow' ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Ghi nhận Mượn sách
          </button>
          <button
            onClick={() => setActiveTab('return')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-300 z-10 ${activeTab === 'return' ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Ghi nhận Trả sách
          </button>
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#0056b3] rounded-full transition-transform duration-300 ease-in-out shadow-sm ${activeTab === 'return' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`}
          ></div>
        </div>

        <div className="space-y-6 h-[420px] overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-6">

          {activeTab === 'borrow' && (
            <>
              {/* Reader Search */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Tìm kiếm độc giả</label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchUserStr}
                    onChange={(e) => setSearchUserStr(e.target.value)}
                    onKeyDown={(e) => handleUserSearchKeyDown(e, false)}
                    placeholder="Nhập mã hoặc email và nhấn Enter..."
                    className="w-full pl-10 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700 placeholder-gray-300"
                  />
                </div>
                {selectedUser && (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-sm">
                        {selectedUser.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-900">{selectedUser.name}</p>
                        <p className="text-[11px] text-blue-600 font-semibold mt-0.5">ID: {selectedUser.id}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedUser(null)} className="text-blue-400 hover:text-blue-700 p-1.5 rounded-full hover:bg-white transition-all shadow-sm"><X size={16} /></button>
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
                    value={searchBookStr}
                    onChange={(e) => setSearchBookStr(e.target.value)}
                    onKeyDown={handleBookSearchKeyDown}
                    placeholder="Nhập tên sách, ISBN và nhấn Enter..."
                    className="w-full pl-10 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700 placeholder-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  {selectedBooks.map((book) => (
                    <div key={book.id} className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-gray-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0"><Book size={20} /></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-950 mb-1">{book.title}</p>
                          <p className="text-[11px] text-gray-400 font-semibold">{book.author} • {book.isbn}</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedBooks(selectedBooks.filter(b => b.id !== book.id))} className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Receive Method & Date */}
              <div className="grid grid-cols-2 gap-6 mt-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Hạn trả sách</label>
                  <div className="relative">
                    <Calendar className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full pl-8 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700 bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Cách nhận sách</label>
                  <select value={receiveMethod} onChange={(e) => setReceiveMethod(e.target.value as ReceiveMethod)} className="w-full py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 font-medium cursor-pointer">
                    <option value={ReceiveMethod.LIBRARY_PICKUP}>Tại thư viện</option>
                    <option value={ReceiveMethod.HOME_PICKUP}>Đơn vị vận chuyển (Home)</option>
                    <option value={ReceiveMethod.EBOOK}>Đọc online (Ebook)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'return' && (
            <>
              {/* Return Flow User Search & Camera */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-[11px] font-bold text-gray-600 tracking-wider uppercase">Tìm kiếm mã đơn mượn</label>
                  <button
                    onClick={() => setIsScanning(!isScanning)}
                    className="flex items-center gap-1.5 text-[12px] font-bold text-[#0056b3] hover:text-[#004494] transition-colors"
                  >
                    <Camera size={14} /> Quét thông tin sách
                  </button>
                </div>

                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchReturnUserStr}
                    onChange={(e) => setSearchReturnUserStr(e.target.value)}
                    onKeyDown={(e) => handleUserSearchKeyDown(e, true)}
                    placeholder="Nhập mã hoặc email và nhấn Enter..."
                    className="w-full pl-10 pr-4 py-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-700 placeholder-gray-300"
                  />
                </div>
                {selectedReturnUser && (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-sm">
                        {selectedReturnUser.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-emerald-900">{selectedReturnUser.name}</p>
                        <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">ID: {selectedReturnUser.id}</p>
                      </div>
                    </div>
                    <button onClick={() => { setSelectedReturnUser(null); setActiveBorrowRecords([]); setSelectedRecordsToReturn([]); }} className="text-emerald-500 hover:text-emerald-700 p-1.5 rounded-full hover:bg-white transition-all shadow-sm"><X size={16} /></button>
                  </div>
                )}
              </div>

              {/* Active Borrow Records List */}
              {selectedReturnUser && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-3 uppercase flex items-center gap-2">
                    <RefreshCw size={14} className="text-blue-500" /> Các đơn đang mượn
                  </label>
                  {activeBorrowRecords.length === 0 ? (
                    <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl text-center">
                      <p className="text-gray-500 text-sm font-medium">Độc giả này không có cuốn sách nào đang mượn.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {activeBorrowRecords.map((record) => {
                        const isSelected = selectedRecordsToReturn.some(r => r.id === record.id);
                        return (
                          <div
                            key={record.id}
                            onClick={() => toggleRecordSelection(record)}
                            className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${isSelected ? 'bg-blue-50 border-blue-200 shadow-inner' : 'bg-white border-gray-100 shadow-sm hover:border-gray-200'}`}
                          >
                            <div>
                              <p className={`text-sm font-bold mb-1 ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>{record.bookTitle}</p>
                              <p className={`text-[11px] font-medium ${isSelected ? 'text-blue-700' : 'text-gray-500'}`}>Hạn trả: {record.dueDate}</p>
                            </div>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                              {isSelected && <CheckCircle2 size={14} className="text-white" />}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>

        <div className="flex justify-end gap-3 pt-6 mt-4">
          <button onClick={onClose} className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors">
            Hủy
          </button>
          <button onClick={handleCreate} className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-sm">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
