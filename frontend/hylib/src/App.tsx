import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { LoginModal, RegisterModal, OTPModal, SuccessModal } from './components/AuthModals';

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
  const [activePage, setActivePage] = useState('Khám phá');
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
      setActivePage('Chi tiết sách');
    } else if (notif.targetPage) {
      setActivePage(notif.targetPage);
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
      setActivePage(page);
    }
  };

  const handleBookClick = (id: string) => {
    setSelectedBookId(id);
    setActivePage('Chi tiết sách');
  };

  const handleConfirmBorrow = (paymentMethod: string, amount: string = '30.000 VNĐ') => {
    const currentActiveBorrowed = books.filter(b => b.status !== 'Đã trả sách').length;
    const limit = currentMembershipPlan === 'Premium' ? 999 : 3;

    if (currentActiveBorrowed >= limit) {
      setSuccessMessage(`Bạn đã mượn tối đa ${limit} cuốn sách theo gói ${currentMembershipPlan || 'Standard'}. Hãy trả bớt sách hoặc nâng cấp lên Premium để mượn thêm.`);
      setSuccessConfirmText('Nâng cấp ngay');
      setIsSuccessOpen(true);
      return;
    }

    const successMsg = 'Mượn sách thành công! Vui lòng kiểm tra trạng thái trong mục Sách của tôi.';
    setSuccessConfirmText('Hoàn thành');
    if (paymentMethod === 'Thanh toán qua ngân hàng') {
      setPaymentAmount(amount);
      setPaymentBackPage('Xác nhận mượn');
      setPaymentSuccessMessage(successMsg);
      setActivePage('Thanh toán qua ngân hàng');
    } else {
      setSuccessMessage(successMsg);
      setCartBooks([]);
      setIsSuccessOpen(true);
      setActivePage('Sách của tôi');
    }
  };

  const handleConfirmLateFine = (paymentMethod: string, amount: string, returnMethodChoice: string) => {
    setLateFineReturnMethod(returnMethodChoice);
    const successMsg = 'Trả sách thành công. Cảm ơn bạn đọc!';
    
    if (paymentMethod === 'Thanh toán qua ngân hàng') {
      setPaymentAmount(amount);
      setPaymentBackPage('Nộp phạt');
      setPaymentSuccessMessage(successMsg);
      setActivePage('Thanh toán qua ngân hàng');
    } else {
      setBooks(prev => prev.map(book => book.id === '4' ? { ...book, status: 'Đã trả sách', statusColor: 'text-green-500', actions: ['Trả sách disabled'] } : book));
      setSuccessMessage(successMsg);
      setIsSuccessOpen(true);
      setActivePage('Sách của tôi');
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
    if (paymentBackPage === 'Thẻ thành viên') setActivePage('Thẻ thành viên');
    else setActivePage('Sách của tôi');
  };

  const handleUpgradePlan = (plan: { name: string, price: string }) => {
    setUpgradePlan(plan.name);
    setPaymentAmount(plan.price);
    setPaymentBackPage('Thẻ thành viên');
    setPaymentSuccessMessage(`Nâng cấp gói ${plan.name} thành công!`);
    setSuccessConfirmText('Bắt đầu ngay');
    setActivePage('Thanh toán qua ngân hàng');
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
    setActivePage('Khám phá');
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
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased selection:bg-blue-100 selection:text-[#0066cc]">
      <Sidebar activePage={activePage} setActivePage={handleSetActivePage} onLogoutClick={() => { setIsLoggedIn(false); setActivePage('Khám phá'); }} />
      
      <main className="pl-64 transition-all duration-300">
        <Header 
          onProfileClick={() => {
            if (isLoggedIn) {
              setActivePage('Cài đặt tài khoản');
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
        
        <AnimatePresence mode="wait">
          {activePage === 'Hỗ trợ' ? (
            <SupportView onBack={() => setActivePage('Khám phá')} />
          ) : activePage === 'Sách' ? (
            <BooksView onBookClick={handleBookClick} onBack={() => setActivePage('Khám phá')} searchQuery={searchQuery} />
          ) : activePage === 'Sách của tôi' ? (
            <MyBooksView 
              books={books} 
              setBooks={setBooks} 
              onReturnSuccess={handleReturnSuccess} 
              onReadClick={(id) => { setSelectedBookId(id); setActivePage('Đọc sách'); }} 
              onRowClick={handleBookClick}
              onRenewSuccess={handleRenewSuccess} 
              onLateReturn={() => setActivePage('Nộp phạt')} 
              onBack={() => setActivePage('Khám phá')} 
            />
          ) : activePage === 'Nộp phạt' ? (
            <LateFinePaymentView onBack={() => setActivePage('Sách của tôi')} onConfirm={handleConfirmLateFine} />
          ) : activePage === 'Đọc sách' ? (
            <ReaderView onBack={() => setActivePage('Sách của tôi')} />
          ) : activePage === 'Yêu thích' ? (
            <FavoritesView 
              books={favoriteBooks} 
              setBooks={setFavoriteBooks} 
              cartBooks={cartBooks} 
              setCartBooks={setCartBooks} 
              onNavigateToCart={() => setActivePage('Giỏ sách')} 
              onBack={() => setActivePage('Khám phá')} 
            />
          ) : activePage === 'Giỏ sách' ? (
            <CartView 
              books={cartBooks} 
              setBooks={setCartBooks} 
              onBorrowTrigger={(mode) => {
                setBorrowMode(mode);
                setActivePage('Xác nhận mượn');
              }}
              onBack={() => setActivePage('Khám phá')}
            />
          ) : activePage === 'Thẻ thành viên' ? (
            <MembershipView 
              onUpgrade={handleUpgradePlan} 
              currentPlan={currentMembershipPlan}
              onViewDetail={(plan) => {
                setUpgradePlan(plan);
                setActivePage('Chi tiết thẻ thành viên');
              }}
              onBack={() => setActivePage('Khám phá')}
            />
          ) : activePage === 'Chi tiết thẻ thành viên' ? (
            <MembershipDetailView 
              plan={upgradePlan || 'Standard'} 
              expiryDate={membershipExpiry}
              onBack={() => setActivePage('Thẻ thành viên')} 
              onUpgradePremium={() => {
                setUpgradePlan('Premium');
                setPaymentAmount('300.000 VNĐ');
                setPaymentBackPage('Thẻ thành viên');
                setPaymentSuccessMessage('Nâng cấp thành công!');
                setSuccessConfirmText('Bắt đầu ngay');
                setActivePage('Thanh toán qua ngân hàng');
              }}
              onCancel={() => { setCurrentMembershipPlan(null); setSuccessMessage('Hủy thành công'); setIsSuccessOpen(true); }}
              onRenew={() => {
                const parts = membershipExpiry.split('/');
                setMembershipExpiry(`${parts[0]}/${parts[1]}/${parseInt(parts[2]) + 1}`);
                setSuccessMessage('Gia hạn thành công!');
                setIsSuccessOpen(true);
              }}
            />
          ) : activePage === 'Cài đặt tài khoản' ? (
            <ProfileView onBack={() => setActivePage('Khám phá')} profile={profile} setProfile={setProfile} />
          ) : activePage === 'Chi tiết sách' ? (
            <BookDetailView 
              bookId={selectedBookId || ''} 
              onBack={() => setActivePage('Khám phá')} 
              onStartBorrow={(mode) => { setBorrowMode(mode); setActivePage('Xác nhận mượn'); }} 
              borrowedInfo={books.find(b => b.id === selectedBookId)}
              onRenew={handleRenew}
              onRead={(id) => { setSelectedBookId(id); setActivePage('Đọc sách'); }}
            />
          ) : activePage === 'Xác nhận mượn' ? (
            <BorrowConfirmationView borrowMode={borrowMode} onBack={() => setActivePage('Chi tiết sách')} onConfirm={handleConfirmBorrow} />
          ) : activePage === 'Thanh toán qua ngân hàng' ? (
            <BankPaymentView onBack={() => setActivePage(paymentBackPage)} onComplete={handlePaymentComplete} amount={paymentAmount} />
          ) : (
            <HomeView onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)} isLoggedIn={isLoggedIn} onBookClick={handleBookClick} />
          )}
        </AnimatePresence>
      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }} onRegisterSuccess={() => { setIsRegisterOpen(false); setIsOTPOpen(true); }} />
      <OTPModal isOpen={isOTPOpen} onClose={() => setIsOTPOpen(false)} onBack={() => { setIsOTPOpen(false); setIsRegisterOpen(true); }} onVerifySuccess={() => { setIsLoggedIn(true); setIsOTPOpen(false); setSuccessMessage('Đăng ký thành công!'); setSuccessConfirmText('Khám phá ngay'); setIsSuccessOpen(true); setActivePage('Khám phá'); }} />
      <SuccessModal isOpen={isSuccessOpen} onClose={() => { setIsSuccessOpen(false); }} message={successMessage} confirmText={successConfirmText} />
    </div>
  );
}
