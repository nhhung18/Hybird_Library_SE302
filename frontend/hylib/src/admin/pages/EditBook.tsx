import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Book, BookType, BookCondition, Category } from '../../types';
import { bookApi } from '../../api/bookApi';
import { categoryApi } from '../../api/categoryApi';

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      if (Array.isArray(response)) {
        setCategories(response);
      } else {
        // Mock fallback
        setCategories([
          { id: 1, categoryName: 'Công nghệ thông tin' },
          { id: 2, categoryName: 'Khoa học' },
          { id: 3, categoryName: 'Văn học' }
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
      // Mock fallback
      setCategories([
        { id: 1, categoryName: 'Công nghệ thông tin' },
        { id: 2, categoryName: 'Khoa học' },
        { id: 3, categoryName: 'Văn học' }
      ]);
    }
  };

  useEffect(() => {
    if (id) {
      // In a real app, you would fetch the book by ID
      // bookApi.getBookById(id).then(...)
      
      // Fallback for mock environment
      const saved = localStorage.getItem('libraryBooks');
      if (saved) {
        const books = JSON.parse(saved);
        const bookToEdit = books.find((b: any) => b.id.toString() === id);
        if (bookToEdit) {
          setFormData({
            title: bookToEdit.title || '',
            author: bookToEdit.author || '',
            publisher: bookToEdit.publisher || '',
            publishYear: bookToEdit.publishYear || new Date().getFullYear(),
            description: bookToEdit.description || '',
            categoryId: bookToEdit.category?.id || 1,
            bookType: bookToEdit.bookType || BookType.PHYSICAL_BOOK,
            condition: bookToEdit.condition || BookCondition.NEW,
            quantity: bookToEdit.quantity || 1
          });
          setCoverImage(bookToEdit.imageUrl || null);
        }
      }
    }
  }, [id]);

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

  const handleSave = async () => {
    if (!formData.title || !formData.author || !id) {
      alert("Vui lòng nhập tên sách và tác giả.");
      return;
    }

    const category = categories.find(c => c.id === formData.categoryId) || categories[0];

    const updatedBook: Partial<Book> = {
      title: formData.title,
      author: formData.author,
      publisher: formData.publisher,
      publishYear: formData.publishYear,
      description: formData.description,
      category,
      bookType: formData.bookType,
      condition: formData.condition,
      quantity: formData.quantity,
      imageUrl: coverImage || ''
    };

    try {
      await bookApi.updateBook(Number(id), updatedBook);
      navigate('/books');
    } catch (error) {
      console.error('Failed to update book', error);
      alert('Cập nhật sách thất bại! Vui lòng kiểm tra lại.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Header />
        
        <div className="p-10 flex-1 overflow-y-auto flex flex-col items-center">
          
          <div className="w-full max-w-5xl">
            {/* Header section */}
            <div className="mb-8">
              <button 
                onClick={() => navigate('/books')}
                className="flex items-center gap-2 text-gray-500 hover:text-[#0056b3] transition-colors font-bold text-sm mb-4"
              >
                <ArrowLeft size={16} />
                TRỞ VỀ
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Chỉnh sửa sách</h1>
              <p className="text-gray-500 text-sm">Cập nhật thông tin chi tiết cho tài liệu này.</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-8 sm:p-10 flex flex-col md:flex-row md:gap-12">
                
                {/* Left: Image Upload */}
                <div className="w-full md:w-[260px] shrink-0 mb-8 md:mb-0">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">ẢNH BÌA</label>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-[380px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-[#e6f0fa] hover:border-[#0056b3] transition-all cursor-pointer overflow-hidden group relative shadow-sm"
                  >
                    {coverImage ? (
                      <>
                        <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                           <ImageIcon size={28} className="text-white mb-2" />
                           <span className="text-white text-sm font-bold tracking-wide">THAY ĐỔI ẢNH</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#0056b3] group-hover:scale-110 transition-transform">
                          <ImageIcon size={28} />
                        </div>
                        <p className="text-[15px] font-bold text-gray-700 mb-1">
                          Tải ảnh bìa lên
                        </p>
                        <p className="text-[13px] font-medium text-gray-400 leading-relaxed">
                          Click hoặc kéo thả ảnh (PNG, JPG)
                        </p>
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
                <div className="flex-1 flex flex-col gap-8 pt-1">
                  
                  {/* Row 1 */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">TÊN SÁCH</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Nhập tên sách..."
                      className="w-full pb-3 border-b-2 border-gray-200 text-lg md:text-xl focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium placeholder-gray-400 bg-transparent"
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex-[2]">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">TÊN TÁC GIẢ</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Nhập tên tác giả..."
                        className="w-full pb-3 border-b-2 border-gray-200 text-lg md:text-xl focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium placeholder-gray-400 bg-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">NĂM XUẤT BẢN</label>
                      <input
                        type="number"
                        name="publishYear"
                        value={formData.publishYear}
                        onChange={handleChange}
                        className="w-full pb-3 border-b-2 border-gray-200 text-lg md:text-xl focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">NHÀ XUẤT BẢN</label>
                      <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                        placeholder="Nhập tên NXB..."
                        className="w-full pb-3 border-b-2 border-gray-200 text-lg md:text-xl focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium placeholder-gray-400 bg-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">THỂ LOẠI</label>
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="w-full pb-3 border-b-2 border-gray-200 text-lg md:text-xl focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium bg-transparent cursor-pointer"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">MÔ TẢ SÁCH</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Mô tả nội dung..."
                      rows={3}
                      className="w-full pb-3 border-b-2 border-gray-200 text-base focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium placeholder-gray-400 bg-transparent resize-none"
                    />
                  </div>

                  {/* Row 5 */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">ĐỊNH DẠNG</label>
                      <select
                        name="bookType"
                        value={formData.bookType}
                        onChange={handleChange}
                        className="w-full pb-3 border-b-2 border-gray-200 text-base focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium bg-transparent cursor-pointer"
                      >
                        <option value={BookType.PHYSICAL_BOOK}>Sách giấy</option>
                        <option value={BookType.EBOOK}>Sách điện tử</option>
                        <option value={BookType.BOTH}>Cả hai</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">TÌNH TRẠNG</label>
                      <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="w-full pb-3 border-b-2 border-gray-200 text-base focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium bg-transparent cursor-pointer"
                      >
                        <option value={BookCondition.NEW}>Mới</option>
                        <option value={BookCondition.GOOD}>Tốt</option>
                        <option value={BookCondition.FAIR}>Khá</option>
                        <option value={BookCondition.POOR}>Kém</option>
                        <option value={BookCondition.DAMAGED}>Hư hỏng</option>
                        <option value={BookCondition.LOST}>Mất</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">SỐ LƯỢNG</label>
                      <input
                        type="number"
                        min="1"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full pb-3 border-b-2 border-gray-200 text-base focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-bold bg-transparent"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Form Footer */}
              <div className="flex items-center justify-end gap-4 bg-gray-50 p-6 sm:p-8 border-t border-gray-200 mt-6">
                <button
                  onClick={() => navigate('/books')}
                  className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="px-10 py-2.5 text-sm font-bold text-white bg-[#0056b3] rounded-full hover:bg-blue-700 transition-colors shadow-md"
                >
                  Lưu thay đổi
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
