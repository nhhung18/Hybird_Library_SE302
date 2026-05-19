import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, ChevronLeft, ChevronRight, Clock, Pencil, Trash2 } from 'lucide-react';
import CreateCardModal from '../components/CreateCardModal';
import ExtendCardModal from '../components/ExtendCardModal';
import EditCardModal from '../components/EditCardModal';
import DeleteCardModal from '../components/DeleteCardModal';

export default function MembershipCardManagement() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('membershipCards');
    if (saved) return JSON.parse(saved);
    return [
      { id: '#ATH-001', ownerName: 'Nguyễn Văn A', ownerInitials: 'A', hasAvatar: true, cardType: 'Premium', expiryDate: '12/12/2024', status: 'Hoạt động' },
      { id: '#ATH-002', ownerName: 'Trần Thị B', ownerInitials: 'B', hasAvatar: true, cardType: 'Standard', expiryDate: '15/06/2023', status: 'Bị khóa' },
      { id: '#ATH-003', ownerName: 'Lê Văn C', ownerInitials: 'LC', hasAvatar: false, cardType: 'Digital', expiryDate: '01/01/2024', status: 'Đã hủy' }
    ];
  });

  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    localStorage.setItem('membershipCards', JSON.stringify(cards));
  }, [cards]);

  const openModal = (type, card = null) => {
    setSelectedCard(card);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedCard(null);
  };

  // Handlers
  const handleCreateCard = (formData) => {
    const newId = `#ATH-00${Math.floor(Math.random() * 10) + 4}`;
    const initials = formData.owner.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    
    // Default expiration is 1 year from now
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const expDate = `${nextYear.getDate().toString().padStart(2, '0')}/${(nextYear.getMonth() + 1).toString().padStart(2, '0')}/${nextYear.getFullYear()}`;

    const newCard = {
      id: newId,
      ownerName: formData.owner,
      ownerInitials: initials,
      hasAvatar: false,
      cardType: formData.cardType,
      expiryDate: expDate,
      status: 'Hoạt động',
      note: formData.note
    };

    setCards([newCard, ...cards]);
    closeModal();
  };

  const handleExtendCard = (id, newExpiryDate) => {
    alert('Gia hạn thành công!');
    setCards(cards.map(c => c.id === id ? { ...c, expiryDate: newExpiryDate } : c));
    closeModal();
  };

  const handleEditCard = (id, formData) => {
    setCards(cards.map(c => c.id === id ? { ...c, cardType: formData.cardType, status: formData.status, note: formData.note } : c));
    closeModal();
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
    closeModal();
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Hoạt động':
        return 'bg-green-100 text-green-700';
      case 'Bị khóa':
        return 'bg-yellow-100 text-yellow-700';
      case 'Đã hủy':
        return 'bg-gray-200 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fb]">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Header />
        
        <div className="p-10 flex-1 overflow-y-auto flex flex-col">
          {/* Header section */}
          <div className="flex justify-between items-start mb-8 shrink-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Thẻ thành viên</h1>
              <p className="text-gray-500 text-sm">Theo dõi và quản lý vòng đời thẻ thư viện.</p>
            </div>
            
            <button 
              onClick={() => openModal('create')}
              className="bg-[#0056b3] hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-sm"
            >
              Thêm thẻ mới
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 flex flex-col flex-1 shadow-sm overflow-hidden">
            
            {/* Filters */}
            <div className="p-6 flex gap-6 border-b border-gray-100">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">TÌM KIẾM</label>
                <div className="relative">
                  <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Mã thẻ, Tên người dùng..."
                    className="w-full pl-8 pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-shadow text-gray-700"
                  />
                </div>
              </div>
              
              <div className="w-[200px]">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">LOẠI THẺ</label>
                <select className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-shadow text-gray-700 bg-transparent appearance-none">
                  <option>Tất cả</option>
                  <option>Premium</option>
                  <option>Standard</option>
                </select>
              </div>

              <div className="w-[200px]">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">TRẠNG THÁI</label>
                <select className="w-full pb-2 border-b border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-shadow text-gray-700 bg-transparent appearance-none">
                  <option>Tất cả</option>
                  <option>Hoạt động</option>
                  <option>Bị khóa</option>
                  <option>Đã hủy</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white">
                    <th className="px-6 py-5">MÃ THẺ</th>
                    <th className="px-6 py-5">TÊN NGƯỜI DÙNG</th>
                    <th className="px-6 py-5">LOẠI THẺ</th>
                    <th className="px-6 py-5">NGÀY HẾT HẠN</th>
                    <th className="px-6 py-5">TRẠNG THÁI</th>
                    <th className="px-6 py-5 text-right">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-gray-700">
                  {cards.map((card, index) => (
                    <tr key={card.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                      <td className="px-6 py-5 font-bold text-gray-900">{card.id}</td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0">
                               {card.ownerInitials}
                            </div>
                            <span className="font-medium text-gray-800">{card.ownerName}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-gray-600 font-medium">{card.cardType}</td>
                      <td className="px-6 py-5 text-gray-600 font-medium">{card.expiryDate}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold ${getStatusStyle(card.status)}`}>
                          {card.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-3 text-gray-400">
                          <button onClick={() => openModal('extend', card)} className="hover:text-[#0056b3] transition-colors p-1" title="Gia hạn thẻ"><Clock size={18} /></button>
                          <button onClick={() => openModal('edit', card)} className="hover:text-[#0056b3] transition-colors p-1" title="Chỉnh sửa"><Pencil size={18} /></button>
                          <button onClick={() => openModal('delete', card)} className="hover:text-red-600 transition-colors p-1" title="Xóa"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-5 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 bg-white">
              <span className="font-medium">Hiển thị 1 - {cards.length} trong số 120 thẻ</span>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CreateCardModal 
        isOpen={activeModal === 'create'} 
        onClose={closeModal} 
        onCreate={handleCreateCard} 
      />

      <ExtendCardModal 
        isOpen={activeModal === 'extend'} 
        onClose={closeModal} 
        onExtend={handleExtendCard}
        card={selectedCard}
      />

      <EditCardModal 
        isOpen={activeModal === 'edit'} 
        onClose={closeModal} 
        onSave={handleEditCard}
        card={selectedCard}
      />

      <DeleteCardModal 
        isOpen={activeModal === 'delete'} 
        onClose={closeModal} 
        onDelete={handleDeleteCard}
        card={selectedCard}
      />

    </div>
  );
}
