import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add react-router-dom imports
if 'import { Routes, Route, useNavigate, useLocation } from \'react-router-dom\';' not in content:
    content = content.replace("import React, { useState, startTransition } from 'react';", 
                              "import React, { useState, startTransition } from 'react';\nimport { Routes, Route, useNavigate, useLocation } from 'react-router-dom';")

# Remove ViewTransition import
content = re.sub(r'// @ts-ignore\nimport { ViewTransition } from \'react\';\n', '', content)
content = re.sub(r'import { ViewTransition } from \'react\';\n', '', content)

# Define activePage and handleSetActivePage dynamically based on hooks
# We need to find `export default function App() {`
app_start = content.find('export default function App() {')
if app_start != -1:
    # Find the end of `const [activePage, setActivePage] = useState('Khám phá');`
    active_page_idx = content.find("const [activePage, setActivePage] = useState('Khám phá');")
    if active_page_idx != -1:
        # replace it with routing hooks
        replacement = """const navigate = useNavigate();
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
  const activePage = getActivePageName(location.pathname);"""
        content = content[:active_page_idx] + replacement + content[active_page_idx + len("const [activePage, setActivePage] = useState('Khám phá');"):]

# Now replace handleSetActivePage logic
handle_idx = content.find('const handleSetActivePage = (page: string) => {')
if handle_idx != -1:
    end_handle_idx = content.find('};', handle_idx) + 2
    # ensure we got the right block by checking protectedPages inside
    handle_code = content[handle_idx:end_handle_idx]
    
    new_handle_code = """const handleSetActivePage = (page: string) => {
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
  };"""
    content = content[:handle_idx] + new_handle_code + content[end_handle_idx:]


# Replace handleBookClick
book_click_idx = content.find('const handleBookClick = (id: string) => {')
if book_click_idx != -1:
    end_book_click_idx = content.find('};', book_click_idx) + 2
    new_book_click = """const handleBookClick = (id: string) => {
    setSelectedBookId(id);
    navigate(`/books/${id}`);
  };"""
    content = content[:book_click_idx] + new_book_click + content[end_book_click_idx:]

# Handle Notification click
notif_click_idx = content.find('const handleNotificationClick = (notif: Notification) => {')
if notif_click_idx != -1:
    end_notif_click_idx = content.find('};', notif_click_idx) + 2
    new_notif_click = """const handleNotificationClick = (notif: Notification) => {
    if (notif.targetPage === 'Chi tiết sách' && notif.targetId) {
      setSelectedBookId(notif.targetId);
      navigate(`/books/${notif.targetId}`);
    } else if (notif.targetPage) {
      handleSetActivePage(notif.targetPage);
    }
  };"""
    content = content[:notif_click_idx] + new_notif_click + content[end_notif_click_idx:]

# Replace ViewTransition and activePage conditionals with Routes
view_transition_start = content.find('<ViewTransition enter={{')
if view_transition_start != -1:
    view_transition_end = content.find('</ViewTransition>', view_transition_start) + len('</ViewTransition>')
    
    routes_code = """<Routes>
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
        </Routes>"""
    
    content = content[:view_transition_start] + routes_code + content[view_transition_end:]


with open('src/App.tsx', 'w') as f:
    f.write(content)

