import React, { useState, startTransition } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Components
import Header from './components/Header';
import { LoginModal, RegisterModal, OTPModal } from './components/AuthModals';
import { ToastNotification } from './components/ToastNotification';

// Pages
import HomeView from './pages/HomeView';
import SupportView from './pages/SupportView';
import BooksView from './pages/BooksView';
import MyBooksView from './pages/MyBooksView';
import FavoritesView from './pages/FavoritesView';
import CartView from './pages/CartView';
import MembershipView from './pages/MembershipView';
import MembershipDetailView from './pages/MembershipDetailView';
import ProfileView from './pages/ProfileView';
import BookDetailView from './pages/BookDetailView';
import LateFinePaymentView from './pages/LateFinePaymentView';
import ReaderView from './pages/ReaderView';
import BankPaymentView from './pages/BankPaymentView';
import BorrowConfirmationView from './pages/BorrowConfirmationView';

// Types
import { Notification, UserProfile, Book, BorrowedBook } from './types';

import AdminApp from './admin/App';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getActivePageName = (path: string) => {
    if (path === '/') return 'Khám phá';
    if (path === '/support') return 'Hỗ trợ';
    if (path === '/books') return 'Sách';
    if (path.startsWith('/books/')) return 'Chi tiết sách';
    if (path === '/my-books') return 'Sách của tôi';
    if (path === '/favorites') return 'Yêu thích';
    if (path === '/cart') return 'Giỏ sách';
    if (path === '/membership') return 'Thẻ thành viên';
    if (path === '/membership/detail') return 'Chi tiết thẻ thành viên';
    if (path === '/profile') return 'Cài đặt tài khoản';
    if (path === '/payment/fine') return 'Nộp phạt';
    if (path.startsWith('/reader/')) return 'Đọc sách';
    if (path === '/payment/bank') return 'Thanh toán qua ngân hàng';
    if (path === '/borrow-confirm') return 'Xác nhận mượn';
    return 'Khám phá';
  };
  const activePage = getActivePageName(location.pathname);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Đăng nhập thành công!');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [borrowMode, setBorrowMode] = useState<'ebook' | 'offline'>('ebook');
  const [paymentAmount, setPaymentAmount] = useState('30.000 VNĐ');
  const [paymentBackPage, setPaymentBackPage] = useState('Xác nhận mượn');
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState('Mượn thành công!');
  const [lateFineReturnMethod, setLateFineReturnMethod] = useState('Trả tại thư viện');
  const [upgradePlan, setUpgradePlan] = useState<string | null>(null);
  const [successConfirmText, setSuccessConfirmText] = useState('Hoàn thành');
  const [currentMembershipPlan, setCurrentMembershipPlan] = useState<string | null>(null);
  const [membershipExpiry, setMembershipExpiry] = useState('12/05/2027');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: '1', 
      title: 'Hết hạn vào ngày mai', 
      message: 'Cuốn "The Art of Stillness" của bạn sẽ hết hạn vào ngày mai. Hãy gia hạn hoặc trả sách ngay.', 
      time: '2 phút trước', 
      isRead: false,
      type: 'warning',
      targetPage: 'Sách của tôi'
    },
    { 
      id: '2', 
      title: 'Yêu cầu được chấp nhận', 
      message: 'Yêu cầu mượn cuốn "Design Systems" đã thành công. Bạn có thể bắt đầu đọc ngay.', 
      time: '1 giờ trước', 
      isRead: false,
      type: 'success',
      targetPage: 'Sách của tôi'
    },
    { 
      id: '3', 
      title: 'Sách mới trong kho', 
      message: 'Cuốn "A New Earth" vừa cập bến. Khám phá nội dung ngay để không bỏ lỡ.', 
      time: '5 giờ trước', 
      isRead: true,
      type: 'info',
      targetPage: 'Chi tiết sách',
      targetId: 'earth'
    },
  ]);

  const handleNotificationClick = (notif: Notification) => {
    if (notif.targetPage === 'Chi tiết sách' && notif.targetId) {
      setSelectedBookId(notif.targetId);
      navigate(`/books/${notif.targetId}`);
    } else if (notif.targetPage) {
      handleSetActivePage(notif.targetPage);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // User Profile State
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'ĐÀO NHƯ BẢO',
    email: 'a48009@thanglong.edu.vn',
    phone: '0325 784 777',
    birthDate: '01/01/1990',
    address: '123 Đường Sách, Quận 1, TP.HCM',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&h=256&auto=format&fit=crop'
  });

  const [favoriteBooks, setFavoriteBooks] = useState<any[]>([
    { id: 1, title: 'The Art of Stillness', image: 'https://picsum.photos/seed/stillness/100/100', type: 'Ebook' },
    { id: 2, title: 'Thinking, Fast and Slow', image: 'https://picsum.photos/seed/think/100/100', type: 'Offline' },
  ]);

  const [cartBooks, setCartBooks] = useState<any[]>([
    { id: 1, title: 'The Art of Stillness', image: 'https://picsum.photos/seed/stillness/100/100', type: 'Ebook' },
    { id: 2, title: 'Thinking, Fast and Slow', image: 'https://picsum.photos/seed/think/100/100', type: 'Offline' },
  ]);

  const [books, setBooks] = useState<BorrowedBook[]>([
    {
      id: '1',
      image: 'https://picsum.photos/seed/stillness/400/533',
      title: 'The Art of Stillness',
      author: 'Pico Iyer',
      type: 'Ebook',
      expiryDate: '12-6-2026',
      renewCount: '0/2',
      status: 'Bình thường',
      statusColor: 'text-gray-900',
      actions: ['Đọc', 'Gia hạn']
    },
    {
      id: '2',
      image: 'https://picsum.photos/seed/minimal/400/533',
      title: 'Whitespace',
      author: 'M. Chen',
      type: 'Offline',
      expiryDate: '15-6-2026',
      renewCount: '1/2',
      status: 'Sắp hết hạn',
      statusColor: 'text-[#ff9500]',
      actions: ['Trả sách']
    },
    {
      id: '3',
      image: 'https://picsum.photos/seed/design/400/533',
      title: 'Design Systems',
      author: 'Alla Kholmatova',
      type: 'Ebook',
      expiryDate: '20-6-2026',
      renewCount: '2/2',
      status: 'Khả dụng',
      statusColor: 'text-gray-900',
      actions: ['Đọc']
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
      title: 'Thiền OSHO',
      author: 'Nguyễn Huy Hùng',
      type: 'Offline',
      expiryDate: '8-6-2026',
      renewCount: '2/2',
      status: 'Trễ trả 2 ngày',
      statusColor: 'text-red-500',
      actions: ['Trả sách']
    }
  ]);

  const handleSetActivePage = (page: string) => {
    const protectedPages = ['Sách của tôi', 'Yêu thích', 'Giỏ sách', 'Thẻ thành viên', 'Cài đặt tài khoản'];
    if (!isLoggedIn && protectedPages.includes(page)) {
      setIsLoginOpen(true);
    } else {
      const pageToPath: Record<string, string> = {
        'Khám phá': '/',
        'Hỗ trợ': '/support',
        'Sách': '/books',
        'Sách của tôi': '/my-books',
        'Yêu thích': '/favorites',
        'Giỏ sách': '/cart',
        'Thẻ thành viên': '/membership',
        'Chi tiết thẻ thành viên': '/membership/detail',
        'Cài đặt tài khoản': '/profile',
        'Chi tiết sách': `/books/${selectedBookId || 'default'}`,
        'Nộp phạt': '/payment/fine',
        'Đọc sách': `/reader/${selectedBookId || 'default'}`,
        'Thanh toán qua ngân hàng': '/payment/bank',
        'Xác nhận mượn': '/borrow-confirm',
      };
      navigate(pageToPath[page] || '/');
    }
  };

  const handleBookClick = (id: string) => {
    setSelectedBookId(id);
    navigate(`/books/${id}`);
  };

  const handleConfirmBorrow = (paymentMethod: string, amount: string = '30.000 VNĐ') => {
    const currentActiveBorrowed = books.filter(b => b.status !== 'Đã trả sách').length;
    // Tạm tắt chức năng check limit để test chuyển trang BankPaymentView
    // const limit = currentMembershipPlan === 'Premium' ? 999 : 3;
    // if (currentActiveBorrowed >= limit) {
    //   setSuccessMessage(`Bạn đã mượn tối đa ${limit} cuốn sách theo gói ${currentMembershipPlan || 'Standard'}. Hãy trả bớt sách hoặc nâng cấp lên Premium để mượn thêm.`);
    //   setSuccessConfirmText('Nâng cấp ngay');
    //   setIsSuccessOpen(true);
    //   return;
    // }

    const successMsg = 'Mượn sách thành công! Vui lòng kiểm tra trạng thái trong mục Sách của tôi.';
    setSuccessConfirmText('Hoàn thành');
    if (paymentMethod === 'Thanh toán qua ngân hàng') {
      setPaymentAmount(amount);
      setPaymentBackPage('Xác nhận mượn');
      setPaymentSuccessMessage(successMsg);
      handleSetActivePage('Thanh toán qua ngân hàng');
    } else {
      setSuccessMessage(successMsg);
      setCartBooks([]);
      setIsSuccessOpen(true);
      handleSetActivePage('Sách của tôi');
    }
  };

  const handleConfirmLateFine = (paymentMethod: string, amount: string, returnMethodChoice: string) => {
    setLateFineReturnMethod(returnMethodChoice);
    const successMsg = 'Trả sách thành công. Cảm ơn bạn đọc!';
    
    if (paymentMethod === 'Thanh toán qua ngân hàng') {
      setPaymentAmount(amount);
      setPaymentBackPage('Nộp phạt');
      setPaymentSuccessMessage(successMsg);
      handleSetActivePage('Thanh toán qua ngân hàng');
    } else {
      setBooks(prev => prev.map(book => book.id === '4' ? { ...book, status: 'Đã trả sách', statusColor: 'text-green-500', actions: ['Trả sách disabled'] } : book));
      setSuccessMessage(successMsg);
      setIsSuccessOpen(true);
      handleSetActivePage('Sách của tôi');
    }
  };

  const handlePaymentComplete = () => {
    if (paymentBackPage === 'Nộp phạt') {
      setBooks(prev => prev.map(book => book.id === '4' ? { ...book, status: 'Đã trả sách', statusColor: 'text-green-500', actions: ['Trả sách disabled'] } : book));
    } else if (paymentBackPage === 'Thẻ thành viên') {
      setCurrentMembershipPlan(upgradePlan);
    } else {
      setCartBooks([]);
    }
    setSuccessMessage(paymentSuccessMessage);
    setIsSuccessOpen(true);
    if (paymentBackPage === 'Thẻ thành viên') handleSetActivePage('Thẻ thành viên');
    else handleSetActivePage('Sách của tôi');
  };

  const handleUpgradePlan = (plan: { name: string, price: string }) => {
    setUpgradePlan(plan.name);
    setPaymentAmount(plan.price);
    setPaymentBackPage('Thẻ thành viên');
    setPaymentSuccessMessage(`Nâng cấp gói ${plan.name} thành công!`);
    setSuccessConfirmText('Bắt đầu ngay');
    handleSetActivePage('Thanh toán qua ngân hàng');
  };

  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    if (email === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setSuccessMessage('Đăng nhập thành công!');
    setSuccessConfirmText('Khám phá ngay');
    setIsSuccessOpen(true);
    handleSetActivePage('Khám phá');
  };

  const handleReturnSuccess = (customMessage?: string) => {
    setSuccessMessage(customMessage || 'Trả trên hệ thống thành công! Cảm ơn bạn đọc!');
    setIsSuccessOpen(true);
  };

  const handleRenewSuccess = () => {
    setSuccessMessage('Gia hạn thành công!');
    setIsSuccessOpen(true);
  };

  const handleRenew = (id: string) => {
    setBooks(prev => prev.map(book => {
      if (book.id === id) {
        const currentCount = parseInt(book.renewCount.split('/')[0]);
        if (currentCount < 2) {
          const nextCount = currentCount + 1;
          return {
            ...book,
            renewCount: `${nextCount}/2`,
            expiryDate: nextCount === 1 ? '15-6-2026' : '30-6-2026',
            actions: nextCount === 2 ? book.actions.filter(a => a !== 'Gia hạn') : book.actions
          };
        }
      }
      return book;
    }));
    handleRenewSuccess();
  };

  if (isAdmin) {
    return <AdminApp />;
  }

  return (
    <div className="min-h-screen bg-sand font-sans text-ink antialiased selection:bg-forest/20 selection:text-forest relative">
      <div className="bg-noise"></div>
      
      <main className="transition-all duration-300 w-full">
        <Header 
          activePage={activePage}
          setActivePage={handleSetActivePage}
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setIsLoginOpen(true)}
          onRegisterClick={() => setIsRegisterOpen(true)}
          onProfileClick={() => {
            if (isLoggedIn) {
              handleSetActivePage('Cài đặt tài khoản');
            } else {
              setIsLoginOpen(true);
            }
          }} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          markAsRead={markAsRead}
          clearAllNotifications={clearAllNotifications}
          onNotificationClick={handleNotificationClick}
          onBookClick={handleBookClick}
        />
        
        <Routes>
          <Route path="/support" element={<SupportView onBack={() => handleSetActivePage('Khám phá')} />} />
          <Route path="/books" element={<BooksView onBookClick={handleBookClick} onBack={() => handleSetActivePage('Khám phá')} searchQuery={searchQuery} />} />
          <Route path="/my-books" element={<MyBooksView books={books} setBooks={setBooks} onReturnSuccess={handleReturnSuccess} onReadClick={(id) => { setSelectedBookId(id); handleSetActivePage('Đọc sách'); }} onRowClick={handleBookClick} onRenewSuccess={handleRenewSuccess} onLateReturn={() => handleSetActivePage('Nộp phạt')} onNavigateTo={(page) => handleSetActivePage(page)} onBack={() => handleSetActivePage('Khám phá')} />} />
          <Route path="/payment/fine" element={<LateFinePaymentView onBack={() => handleSetActivePage('Sách của tôi')} onConfirm={handleConfirmLateFine} />} />
          <Route path="/reader/:id" element={<ReaderView onBack={() => handleSetActivePage('Sách của tôi')} />} />
          <Route path="/favorites" element={<FavoritesView books={favoriteBooks} setBooks={setFavoriteBooks} cartBooks={cartBooks} setCartBooks={setCartBooks} onNavigateToCart={() => handleSetActivePage('Giỏ sách')} onBack={() => handleSetActivePage('Khám phá')} />} />
          <Route path="/cart" element={<CartView books={cartBooks} setBooks={setCartBooks} onBorrowTrigger={(mode) => { setBorrowMode(mode); handleSetActivePage('Xác nhận mượn'); }} onBack={() => handleSetActivePage('Khám phá')} />} />
          <Route path="/membership" element={<MembershipView onUpgrade={handleUpgradePlan} currentPlan={currentMembershipPlan} onViewDetail={(plan) => { setUpgradePlan(plan); handleSetActivePage('Chi tiết thẻ thành viên'); }} onBack={() => handleSetActivePage('Khám phá')} />} />
          <Route path="/membership/detail" element={<MembershipDetailView plan={upgradePlan || 'Standard'} expiryDate={membershipExpiry} onBack={() => handleSetActivePage('Thẻ thành viên')} onUpgradePremium={() => { setUpgradePlan('Premium'); setPaymentAmount('300.000 VNĐ'); setPaymentBackPage('Thẻ thành viên'); setPaymentSuccessMessage('Nâng cấp thành công!'); setSuccessConfirmText('Bắt đầu ngay'); handleSetActivePage('Thanh toán qua ngân hàng'); }} onCancel={() => { setCurrentMembershipPlan(null); setSuccessMessage('Hủy thành công'); setIsSuccessOpen(true); }} onRenew={() => { const parts = membershipExpiry.split('/'); setMembershipExpiry(`${parts[0]}/${parts[1]}/${parseInt(parts[2]) + 1}`); setSuccessMessage('Gia hạn thành công!'); setIsSuccessOpen(true); }} />} />
          <Route path="/profile" element={<ProfileView onBack={() => handleSetActivePage('Khám phá')} profile={profile} setProfile={setProfile} />} />
          <Route path="/books/:id" element={<BookDetailView bookId={selectedBookId || ''} onBack={() => handleSetActivePage('Khám phá')} onStartBorrow={(mode) => { setBorrowMode(mode); handleSetActivePage('Xác nhận mượn'); }} borrowedInfo={books.find(b => b.id === selectedBookId)} onRenew={handleRenew} onRead={(id) => { setSelectedBookId(id); handleSetActivePage('Đọc sách'); }} />} />
          <Route path="/borrow-confirm" element={<BorrowConfirmationView borrowMode={borrowMode} onBack={() => handleSetActivePage('Chi tiết sách')} onConfirm={handleConfirmBorrow} />} />
          <Route path="/payment/bank" element={<BankPaymentView onBack={() => handleSetActivePage(paymentBackPage)} onComplete={handlePaymentComplete} amount={paymentAmount} />} />
          <Route path="/" element={<HomeView onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)} isLoggedIn={isLoggedIn} onBookClick={handleBookClick} />} />
        </Routes>
      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }} onRegisterSuccess={() => { setIsRegisterOpen(false); setIsOTPOpen(true); }} />
      <OTPModal isOpen={isOTPOpen} onClose={() => setIsOTPOpen(false)} onBack={() => { setIsOTPOpen(false); setIsRegisterOpen(true); }} onVerifySuccess={() => { setIsLoggedIn(true); setIsOTPOpen(false); setSuccessMessage('Đăng ký thành công!'); setSuccessConfirmText('Khám phá ngay'); setIsSuccessOpen(true); handleSetActivePage('Khám phá'); }} />
      <ToastNotification isOpen={isSuccessOpen} onClose={() => { setIsSuccessOpen(false); }} message={successMessage} />
    </div>
  );
}
