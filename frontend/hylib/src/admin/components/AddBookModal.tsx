import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Book, BookType, BookCondition, Category } from '../../types';
import { bookApi } from '../../api/bookApi';
import { categoryApi } from '../../api/categoryApi';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void; // call fetchBooks after saving
}

export default function AddBookModal({ isOpen, onClose, onSave }: AddBookModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishYear: new Date().getFullYear(),
    description: '',
    categoryId: 1,
    bookType: BookType.PHYSICAL_BOOK,
    condition: BookCondition.NEW,
    quantity: 1
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      fetchCategories();
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      if (Array.isArray(response)) {
        setCategories(response);
      } else {
        setCategories([
          { id: 1, categoryName: 'Công nghệ thông tin' },
          { id: 2, categoryName: 'Khoa học' },
          { id: 3, categoryName: 'Văn học' }
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
      setCategories([
        { id: 1, categoryName: 'Công nghệ thông tin' },
        { id: 2, categoryName: 'Khoa học' },
        { id: 3, categoryName: 'Văn học' }
      ]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'publishYear' || name === 'quantity' || name === 'categoryId' ? Number(value) : value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      alert("Vui lòng nhập tên sách và tác giả.");
      return;
    }

    const category = categories.find(c => c.id === formData.categoryId) || categories[0];

    const newBook: Partial<Book> = {
      title: formData.title,
      author: formData.author,
      publisher: formData.publisher,
      publishYear: formData.publishYear,
      description: formData.description,
      category,
      bookType: formData.bookType,
      condition: formData.condition,
      quantity: formData.quantity,
      imageUrl: coverImage || '',
      bookUrl: '',
      likes: 0,
      avgRating: 0
    };

    try {
      await bookApi.createBook(newBook as Omit<Book, "id">);
      
      // Reset form
      setFormData({
        title: '', author: '', publisher: '', publishYear: new Date().getFullYear(),
        description: '', categoryId: 1, bookType: BookType.PHYSICAL_BOOK, condition: BookCondition.NEW, quantity: 1
      });
      setCoverImage(null);
      
      onSave(); // Trigger fetchBooks
      onClose();
    } catch (error) {
      console.error('Failed to create book', error);
      alert('Tạo sách thất bại! Vui lòng kiểm tra lại.');
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} font-sans`}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className={`bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative transition-all duration-300 ease-out transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Thêm sách mới</h2>
          <p className="text-sm text-gray-500">Nhập thông tin chi tiết cho tài liệu mới vào hệ thống.</p>
        </div>

        {/* Form Body - Scrollable */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Image Upload */}
            <div className="w-full md:w-[220px] shrink-0 mb-8 md:mb-0">
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-3">ẢNH BÌA</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-[320px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-[#e6f0fa] hover:border-[#0056b3] transition-all cursor-pointer overflow-hidden group relative shadow-sm"
              >
                {coverImage ? (
                  <>
                    <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                       <ImageIcon size={28} className="text-white mb-2" />
                       <span className="text-white text-xs font-bold tracking-wide">THAY ĐỔI ẢNH</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-[#0056b3] group-hover:scale-110 transition-transform">
                      <ImageIcon size={24} />
                    </div>
                    <p className="text-[13px] font-bold text-gray-700 mb-1">Tải ảnh bìa lên</p>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                style={{ display: 'none' }}
              />
            </div>

            {/* Right: Form Inputs */}
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">TÊN SÁCH</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nhập tên sách..."
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">TÊN TÁC GIẢ</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Nhập tên tác giả..."
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">NĂM XUẤT BẢN</label>
                  <input
                    type="number"
                    name="publishYear"
                    value={formData.publishYear}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">NHÀ XUẤT BẢN</label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    placeholder="Nhập tên NXB..."
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">THỂ LOẠI</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent cursor-pointer text-sm font-medium"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">MÔ TẢ SÁCH</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Mô tả nội dung..."
                  rows={2}
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors placeholder-gray-300 text-sm font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">ĐỊNH DẠNG</label>
                  <select
                    name="bookType"
                    value={formData.bookType}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent cursor-pointer text-sm font-medium"
                  >
                    <option value={BookType.PHYSICAL_BOOK}>Sách giấy</option>
                    <option value={BookType.EBOOK}>Sách điện tử</option>
                    <option value={BookType.BOTH}>Cả hai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">TÌNH TRẠNG</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent cursor-pointer text-sm font-medium"
                  >
                    <option value={BookCondition.NEW}>Mới</option>
                    <option value={BookCondition.GOOD}>Tốt</option>
                    <option value={BookCondition.FAIR}>Khá</option>
                    <option value={BookCondition.POOR}>Kém</option>
                    <option value={BookCondition.DAMAGED}>Hư hỏng</option>
                    <option value={BookCondition.LOST}>Mất</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">SỐ LƯỢNG</label>
                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#0056b3] transition-colors bg-transparent text-sm font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-100 bg-gray-50 rounded-b-3xl shrink-0">
          <button 
            type="button"
            onClick={onClose} 
            className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave} 
            className="px-6 py-2.5 rounded-full bg-[#0056b3] hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-md"
          >
            Lưu sách
          </button>
        </div>

      </div>
    </div>
  );
}
