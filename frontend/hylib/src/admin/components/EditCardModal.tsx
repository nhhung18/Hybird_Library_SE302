import React, { useState, useEffect } from 'react';

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: any) => void;
  card: any;
}

export default function EditCardModal({ isOpen, onClose, onSave, card }: EditCardModalProps) {
  const [formData, setFormData] = useState({
    cardType: '',
    status: '',
    note: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (card) {
      setFormData({
        cardType: card.cardType,
        status: card.status,
        note: card.note || ''
      });
    }
  }, [card]);

  if (!isOpen && !isVisible) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (card) {
      onSave(card.id, formData);
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans`}>
      {/* Blurred background overlay (10% dim) */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`bg-white rounded-3xl w-[450px] p-10 shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Chỉnh sửa thẻ</h2>
        <p className="text-sm text-gray-500 mb-6">Thay đổi thông tin cho thẻ {card?.id}.</p>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Owner (Locked) */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Người sở hữu (Cố định)</label>
            <input 
              type="text" 
              value={card?.ownerName || ''} 
              disabled
              className="w-full border-b border-gray-100 py-2 focus:outline-none text-gray-400 bg-transparent"
            />
          </div>

          {/* Card Type Select */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Loại thẻ</label>
            <select 
              name="cardType"
              value={formData.cardType} 
              onChange={handleChange}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent cursor-pointer"
            >
              <option value="Standard Scholar">Standard Scholar</option>
              <option value="Premium Explorer">Premium Explorer</option>
              <option value="Digital">Digital</option>
            </select>
          </div>

          {/* Status Select */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Trạng thái</label>
            <select 
              name="status"
              value={formData.status} 
              onChange={handleChange}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent cursor-pointer"
            >
              <option value="Hoạt động">Hoạt động</option>
              <option value="Bị khóa">Bị khóa</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>

          {/* Note Textarea */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 tracking-wider mb-2 uppercase">Ghi chú</label>
            <textarea 
              name="note"
              placeholder="Nhập ghi chú hoặc lý do thay đổi..." 
              value={formData.note} 
              onChange={handleChange}
              className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors resize-none min-h-[60px] placeholder-gray-300" 
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 mt-4">
            <button 
              type="button"
              onClick={onClose} 
              className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
