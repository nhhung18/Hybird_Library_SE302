import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Image as ImageIcon, X, ArrowLeft } from 'lucide-react';

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    location: '',
    stock: 1
  });

  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [customPublisher, setCustomPublisher] = useState('');

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem('libraryBooks');
      if (saved) {
        const books = JSON.parse(saved);
        const bookToEdit = books.find((b: any) => b.id.toString() === id);
        if (bookToEdit) {
          setFormData({
            title: bookToEdit.title || '',
            author: bookToEdit.author || '',
            publisher: ['NXB Trẻ', 'NXB Kim Đồng', "O'Reilly Media"].includes(bookToEdit.publisher) ? bookToEdit.publisher : 'Khác',
            location: bookToEdit.location || '',
            stock: bookToEdit.stock || 1
          });
          if (!['NXB Trẻ', 'NXB Kim Đồng', "O'Reilly Media"].includes(bookToEdit.publisher) && bookToEdit.publisher) {
            setCustomPublisher(bookToEdit.publisher);
          }
          setCategories(bookToEdit.categories || []);
          setCoverImage(bookToEdit.coverData || null);
        }
      }
    }
  }, [id]);

  // Handle standard inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle category multi-select logic
  const handleCategoryKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = categoryInput.trim().toUpperCase();
      if (val && !categories.includes(val)) {
        setCategories([...categories, val]);
        setCategoryInput('');
      }
    } else if (e.key === 'Backspace' && categoryInput === '' && categories.length > 0) {
      setCategories(categories.slice(0, -1));
    }
  };

  const removeCategory = (indexToRemove) => {
    setCategories(categories.filter((_, index) => index !== indexToRemove));
  };

  // Handle image upload mock
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.author) {
      alert("Vui lòng nhập tên sách và tác giả.");
      return;
    }

    const saved = localStorage.getItem('libraryBooks');
    const books = saved ? JSON.parse(saved) : [];

    const finalPublisher = formData.publisher === 'Khác' ? customPublisher : formData.publisher;

    const updatedBooks = books.map((b: any) => {
      if (b.id.toString() === id) {
        return {
          ...b,
          title: formData.title,
          author: formData.author,
          publisher: finalPublisher,
          categories: categories.length > 0 ? categories : ['CHƯA PHÂN LOẠI'],
          location: formData.location || 'Chưa xếp kệ',
          stock: parseInt(formData.stock as any) || 1,
          coverData: coverImage
        };
      }
      return b;
    });

    localStorage.setItem('libraryBooks', JSON.stringify(updatedBooks));
    
    // Navigate back to Book Management
    navigate('/books');
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
                    <div className="flex-1">
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
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">NHÀ XUẤT BẢN</label>
                      <div className="flex gap-4">
                        <select
                          name="publisher"
                          value={formData.publisher}
                          onChange={handleChange}
                          className={`pb-3 border-b-2 border-gray-200 text-lg md:text-xl focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium bg-transparent cursor-pointer ${formData.publisher === 'Khác' ? 'w-1/3' : 'w-full'}`}
                        >
                          <option value="" disabled>Chọn nhà xuất bản...</option>
                          <option value="NXB Trẻ">NXB Trẻ</option>
                          <option value="NXB Kim Đồng">NXB Kim Đồng</option>
                          <option value="O'Reilly Media">O'Reilly Media</option>
                          <option value="Khác">Khác</option>
                        </select>
                        {formData.publisher === 'Khác' && (
                          <input
                            type="text"
                            value={customPublisher}
                            onChange={(e) => setCustomPublisher(e.target.value)}
                            placeholder="Nhập tên NXB..."
                            className="w-2/3 pb-3 border-b-2 border-gray-200 text-lg md:text-xl focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium placeholder-gray-400 bg-transparent animate-fade-in"
                            autoFocus
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row 3 - Custom Multi-select */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">THỂ LOẠI (ĐA CHỌN)</label>
                    <div className="w-full pb-3 border-b-2 border-gray-200 focus-within:border-[#0056b3] transition-colors flex flex-wrap gap-2 items-center min-h-[44px]">
                      {categories.map((cat, index) => (
                        <div key={index} className="flex items-center gap-1.5 bg-[#e6f0fa] text-[#0056b3] text-xs font-bold uppercase px-3 py-1.5 rounded-md">
                          {cat}
                          <button 
                            onClick={() => removeCategory(index)}
                            className="text-[#0056b3]/60 hover:text-[#0056b3] hover:bg-[#0056b3]/10 rounded-full p-0.5 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        onKeyDown={handleCategoryKeyDown}
                        placeholder={categories.length === 0 ? "Nhập và nhấn Enter để thêm..." : ""}
                        className="flex-1 min-w-[180px] bg-transparent border-none outline-none text-lg md:text-xl text-gray-900 font-medium placeholder-gray-400"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                       <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200 text-[10px] font-mono">Enter</span> hoặc 
                       <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200 text-[10px] font-mono">,</span> để thêm thể loại
                    </p>
                  </div>

                  {/* Row 4 */}
                  <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex-[2]">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">VỊ TRÍ VẬT LÝ</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="VD: Kệ A, Tầng 2..."
                        className="w-full pb-3 border-b-2 border-gray-200 text-lg md:text-xl focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-medium placeholder-gray-400 bg-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">SỐ LƯỢNG NHẬP</label>
                      <input
                        type="number"
                        min="1"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full pb-3 border-b-2 border-gray-200 text-lg md:text-xl focus:outline-none focus:border-[#0056b3] transition-colors text-gray-900 font-bold bg-transparent"
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
                  Lưu
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
