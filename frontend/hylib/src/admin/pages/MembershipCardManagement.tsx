import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search, ChevronDown, Clock, Pencil, Trash2, Filter } from 'lucide-react';
import CreateCardModal from '../components/CreateCardModal';
import ExtendCardModal from '../components/ExtendCardModal';
import EditCardModal from '../components/EditCardModal';
import DeleteCardModal from '../components/DeleteCardModal';

interface MembershipCard {
  id: string;
  ownerName: string;
  ownerInitials: string;
  hasAvatar: boolean;
  cardType: string;
  expiryDate: string;
  status: string;
  note?: string;
}

export default function MembershipCardManagement() {
  const [cards, setCards] = useState<MembershipCard[]>(() => {
    const saved = localStorage.getItem('membershipCards');
    if (saved) return JSON.parse(saved);
    return [
      { id: '#ATH-001', ownerName: 'Nguyễn Văn A', ownerInitials: 'A', hasAvatar: true, cardType: 'Premium', expiryDate: '12/12/2024', status: 'Hoạt động' },
      { id: '#ATH-002', ownerName: 'Trần Thị B', ownerInitials: 'B', hasAvatar: true, cardType: 'Standard', expiryDate: '15/06/2023', status: 'Bị khóa' },
      { id: '#ATH-003', ownerName: 'Lê Văn C', ownerInitials: 'LC', hasAvatar: false, cardType: 'Digital', expiryDate: '01/01/2024', status: 'Đã hủy' }
    ];
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<MembershipCard | null>(null);
  const [filterType, setFilterType] = useState<string>('Tất cả');
  const [filterStatus, setFilterStatus] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('membershipCards', JSON.stringify(cards));
  }, [cards]);

  const openModal = (type: string, card: MembershipCard | null = null) => {
    setSelectedCard(card);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedCard(null);
  };

  // Handlers
  const handleCreateCard = (formData: any) => {
    const newId = `#ATH-00${Math.floor(Math.random() * 10) + 4}`;
    const initials = formData.owner.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
    
    // Default expiration is 1 year from now
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const expDate = `${nextYear.getDate().toString().padStart(2, '0')}/${(nextYear.getMonth() + 1).toString().padStart(2, '0')}/${nextYear.getFullYear()}`;

    const newCard: MembershipCard = {
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

  const handleExtendCard = (id: string, newExpiryDate: string) => {
    setCards(cards.map(c => c.id === id ? { ...c, expiryDate: newExpiryDate } : c));
    closeModal();
  };

  const handleEditCard = (id: string, formData: any) => {
    setCards(cards.map(c => c.id === id ? { ...c, cardType: formData.cardType, status: formData.status, note: formData.note } : c));
    closeModal();
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
    closeModal();
  };

  const handleToggleStatus = (id: string, newStatus: string) => {
    setCards(cards.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Hoạt động':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Bị khóa':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Đã hủy':
        return 'bg-gray-50 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          card.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'Tất cả' || card.cardType === filterType;
    const matchesStatus = filterStatus === 'Tất cả' || card.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Quản lý Thẻ thành viên" />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thẻ thành viên</h1>
            
            <div className="flex justify-between items-center">
              <div className="flex-1"></div>
              <div className="flex gap-3 items-center">
                {/* Search input */}
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm thẻ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-all shadow-sm"
                  />
                </div>

                {/* Filter Loại Thẻ */}
                <div className="relative inline-block">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-full pl-10 pr-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm focus:outline-none focus:border-[#0066cc] cursor-pointer"
                  >
                    <option value="Tất cả">Loại: Tất cả</option>
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                    <option value="Digital">Digital</option>
                  </select>
                  <Filter size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>

                {/* Filter Trạng Thái */}
                <div className="relative inline-block">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-full pl-10 pr-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm focus:outline-none focus:border-[#0066cc] cursor-pointer"
                  >
                    <option value="Tất cả">Trạng thái: Tất cả</option>
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Bị khóa">Bị khóa</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                  <Filter size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>

                <button 
                  onClick={() => openModal('create')}
                  className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2 rounded-full font-medium transition-colors flex items-center gap-2 text-sm shadow-md whitespace-nowrap"
                >
                  Thêm thẻ mới
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Table Area */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
              <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="sticky top-0 z-10 bg-white shadow-sm">
                    <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-5">MÃ THẺ</th>
                      <th className="px-6 py-5">TÊN NGƯỜI DÙNG</th>
                      <th className="px-6 py-5">LOẠI THẺ</th>
                      <th className="px-6 py-5">NGÀY HẾT HẠN</th>
                      <th className="px-6 py-5">TRẠNG THÁI</th>
                      <th className="px-6 py-5 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-gray-700">
                    {filteredCards.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium bg-white">
                          Không tìm thấy thẻ thành viên nào.
                        </td>
                      </tr>
                    ) : (
                      filteredCards.map((card, index) => (
                        <tr key={card.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                          <td className="px-6 py-5 font-bold text-gray-500">{card.id}</td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0 shadow-inner">
                                {card.ownerInitials}
                              </div>
                              <span className="font-bold text-gray-900">{card.ownerName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-gray-600 font-bold">{card.cardType}</td>
                          <td className="px-6 py-5 text-gray-500 font-medium">{card.expiryDate}</td>
                          
                          {/* Status Dropdown */}
                          <td className="px-6 py-5">
                            <div className="relative inline-block">
                              <select
                                value={card.status}
                                onChange={(e) => handleToggleStatus(card.id, e.target.value)}
                                className={`appearance-none outline-none cursor-pointer text-xs font-bold rounded-full px-3 py-1.5 pr-8 border transition-colors ${getStatusStyle(card.status)}`}
                              >
                                <option value="Hoạt động">Hoạt động</option>
                                <option value="Bị khóa">Bị khóa</option>
                                <option value="Đã hủy">Đã hủy</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                <ChevronDown size={14} className="text-gray-500" />
                              </div>
                            </div>
                          </td>

                          {/* Action Buttons */}
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-4 text-gray-400">
                              <button onClick={() => openModal('extend', card)} className="hover:text-gray-600 transition-colors" title="Gia hạn thẻ"><Clock size={18} /></button>
                              <button onClick={() => openModal('edit', card)} className="hover:text-gray-600 transition-colors" title="Chỉnh sửa"><Pencil size={18} /></button>
                              <button onClick={() => openModal('delete', card)} className="hover:text-red-500 transition-colors" title="Xóa"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500 bg-white">
                <span>Hiển thị 1 đến {filteredCards.length} trong số {filteredCards.length} thẻ thành viên</span>
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

      {selectedCard && (
        <>
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
        </>
      )}
    </div>
  );
}
