// const booksDatabase = [
//   { id: 1, name: "Đắc Nhân Tâm", author: "Dale Carnegie", category: "Kỹ năng sống", qty: 12, image: "image/book/dacnhantam.jpg", description: "Cuốn sách nổi tiếng nhất về nghệ thuật giao tiếp và thu phục lòng người.", rating: 4.5, reviews: 120 },
//   { id: 2, name: "Lãnh Đạo Khôn Ngoan", author: "Paulo Coelho", category: "Văn học", qty: 8, image: "image/book/lanhdaokhongoan.jpg", description: "Tiểu thuyết về hành trình tìm kiếm ước mơ của một chàng trai trẻ.", rating: 4.8, reviews: 95 },
//   { id: 3, name: "Nghĩ Lớn Để Thành Công", author: "Robert C. Martin", category: "Công nghệ", qty: 5, image: "image/book/nghilondethanhcong.jpg", description: "Hướng dẫn viết code sạch và chuyên nghiệp cho lập trình viên.", rating: 4.9, reviews: 180 },
//   { id: 4, name: "Bí Quyết Trường Thọ", author: "Yuval Noah Harari", category: "Lịch sử", qty: 7, image: "image/book/biquyettruongtho.png", description: "Khám phá lịch sử nhân loại từ quá khứ đến hiện tại.", rating: 4.6, reviews: 150 },
//   { id: 5, name: "Vượt Qua Giông Bão", author: "Napoleon Hill", category: "Kỹ năng sống", qty: 10, image: "image/book/vuotquadongbao-bia.jpg", description: "Bí mật của những người thành công trong kiếm tiền.", rating: 4.5, reviews: 110 },
//   { id: 6, name: "Cội Nguồn Của Hạnh Phúc", author: "Thích Nhất Hạnh", category: "Kỹ năng sống", qty: 8, image: "image/book/CộiNguồnCủaHạnhPhúc.png", description: "Tìm hiểu những điều cơ bản tạo nên hạnh phúc thực sự trong cuộc sống.", rating: 4.7, reviews: 105 },
//   { id: 7, name: "Mặc Kệ Họ", author: "Mark Manson", category: "Kỹ năng sống", qty: 9, image: "image/book/MặcKệHọ.png", description: "Cách sống tự do và có ý nghĩa bằng cách không quan tâm đến ý kiến người khác.", rating: 4.6, reviews: 98 },
//   { id: 8, name: "Người Lạ Với Chính Ta", author: "Marc Levy", category: "Văn học", qty: 6, image: "image/book/NgườiLạVớiChínhTa.png", description: "Một câu chuyện tình yêu động người qua các trang sách.", rating: 4.5, reviews: 87 },
//   { id: 9, name: "Nhẹ Nhàng Mà Sống", author: "BTS Sơn", category: "Kỹ năng sống", qty: 7, image: "image/book/NhẹNhàngMàSống.png", description: "Hướng dẫn sống nhẹ nhàng, tỏa sáng và hạnh phúc mỗi ngày.", rating: 4.4, reviews: 76 },
//   { id: 10, name: "Nơi Vết Thương Anh Sáng Rọi Vào", author: "Minh Thu", category: "Văn học", qty: 5, image: "image/book/NơiVếtThươngAnhSángRọiVào.png", description: "Câu chuyện về sự chữa lành và tìm thấy ánh sáng trong bóng tối.", rating: 4.3, reviews: 64 },
//   { id: 11, name: "Con Đường Chính Trực", author: "M. Scott Peck", category: "Kỹ năng sống", qty: 8, image: "image/book/ConĐườngChínhTrực.png", description: "Hành trình tâm linh đưa bạn trên con đường sự trưởng thành.", rating: 4.5, reviews: 92 },
//   { id: 12, name: "Đường Vào Thiền", author: "Thích Nhất Hạnh", category: "Kỹ năng sống", qty: 6, image: "image/book/ĐườngVàoThiền.png", description: "Những hướng dẫn thiền định giản dị mà sâu sắc cho người mới bắt đầu.", rating: 4.6, reviews: 81 },
//   { id: 13, name: "Phá Vỡ Khuôn Mẫu", author: "Steve Jobs", category: "Kỹ năng sống", qty: 7, image: "image/book/PháVỡKhuônMẫu.png", description: "Các câu chuyện truyền cảm hứng về sự sáng tạo và theo đuổi đam mê.", rating: 4.7, reviews: 103 },
//   { id: 14, name: "Khai Mở Cảm Xúc", author: "Daniel Goleman", category: "Kỹ năng sống", qty: 9, image: "image/book/KhaiMởCảmXúc.png", description: "Khám phá trí thông minh cảm xúc và cách áp dụng nó trong cuộc sống.", rating: 4.8, reviews: 115 },
//   { id: 15, name: "Hạnh Phúc Tuổi Trẻ", author: "Osho", category: "Kỹ năng sống", qty: 8, image: "image/book/HạnhPhúcTuổiTrẻ.png", description: "Những lời khôn ngoan về cách sống hạnh phúc và tự do trong tuổi trẻ.", rating: 4.5, reviews: 89 }
// ];
let currentBook = null;

// Load book details from URL parameter on page load
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get('id'));
  
  if (!bookId) {
    alert('⚠️ ID sách không hợp lệ');
    window.location.href = 'books.html';
    return;
  }
  
  // Find book in database (from script.js)
  if (typeof booksDatabase === 'undefined') {
    alert('❌ Lỗi: Không thể tải dữ liệu sách');
    return;
  }
  
  currentBook = booksDatabase.find(b => b.id === bookId);
  
  if (!currentBook) {
    alert('❌ Sách không tìm thấy');
    window.location.href = 'books.html';
    return;
  }
  
  // Populate book details
  displayBookDetails();
});

function displayBookDetails() {
  if (!currentBook) return;
  
  // Update title and basic info
  document.getElementById('bookTitle').textContent = currentBook.name;
  document.getElementById('bookDescription').textContent = currentBook.description;
  document.title = `${currentBook.name} - HAB Lib`;
  
  // Update quantity
  const qtyElement = document.getElementById('bookQty');
  qtyElement.textContent = currentBook.qty;
  const qtyInput = document.getElementById('qtyInput');
  qtyInput.max = Math.min(currentBook.qty > 0 ? currentBook.qty : 10, 10);
  
  // Update quantity box background based on stock
  const qtyBox = qtyElement.closest('div[style*="background"]');
  if (qtyBox && currentBook.qty === 0) {
    qtyBox.style.background = '#fff3e0'; // Light orange for pre-order
    qtyElement.style.color = '#e67e22';
  } else if (qtyBox && currentBook.qty > 0 && currentBook.qty <= 3) {
    qtyBox.style.background = '#fff9e6'; // Light yellow for low stock
  }
  
  // Update status
  let status, statusColor;
  if (currentBook.qty > 0) {
    status = 'Còn hàng';
    statusColor = 'var(--green)';
  } else if (currentBook.qty === 0) {
    status = 'Có thể đặt trước';
    statusColor = '#e67e22';
  } else {
    status = 'Không khả dụng';
    statusColor = '#e74c3c';
  }
  document.getElementById('metaStatus').textContent = status;
  document.getElementById('metaStatus').style.color = statusColor;
  
  // Update meta info
  document.getElementById('metaAuthor').textContent = currentBook.author;
  document.getElementById('metaCategory').textContent = currentBook.category;
  
  // Update image
  document.getElementById('MainImg').src = currentBook.image;
  document.getElementById('MainImg').alt = currentBook.name;
  
  // Update rating display
  const ratingStars = document.getElementById('ratingStars');
  const fullStars = Math.floor(currentBook.rating);
  const hasHalfStar = currentBook.rating % 1 >= 0.5;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += `<i class="fas fa-star" style="color:#ffa500;"></i>`;
  }
  if (hasHalfStar) {
    stars += `<i class="fas fa-star-half-alt" style="color:#ffa500;"></i>`;
  }
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += `<i class="far fa-star" style="color:#ccc;"></i>`;
  }
  
  ratingStars.innerHTML = stars + ` <strong>${currentBook.rating}</strong>/5 `;
  
  // Update review count from database
  document.getElementById('reviewCount').textContent = `(${currentBook.reviews} đánh giá)`;
  
  // Handle button based on stock quantity
  const borrowBtn = document.querySelector('.actions .btn');
  const cancelBtn = document.getElementById('cancelPreOrderBtn');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const hasPreOrdered = checkIfPreOrdered(currentBook.id, currentUser);
  
  if (currentBook.qty === 0) {
    if (hasPreOrdered) {
      // Already pre-ordered - show gray button and cancel button
      borrowBtn.style.background = '#95a5a6';
      borrowBtn.style.cursor = 'not-allowed';
      borrowBtn.style.opacity = '1';
      borrowBtn.textContent = 'Đã Đặt Trước';
      borrowBtn.onclick = (e) => {
        e.preventDefault();
        if (typeof showNotification !== 'undefined') {
          showNotification('ℹ️ Bạn đã đặt trước sách này rồi!', 'error');
        } else {
          alert('ℹ️ Bạn đã đặt trước sách này rồi!');
        }
      };
      // Show cancel pre-order button
      if (cancelBtn) cancelBtn.style.display = 'inline-block';
    } else {
      // Show pre-order button when out of stock
      borrowBtn.style.background = '#e67e22';
      borrowBtn.style.cursor = 'pointer';
      borrowBtn.style.opacity = '1';
      borrowBtn.textContent = 'Đặt Trước Sách';
      borrowBtn.onclick = (e) => {
        e.preventDefault();
        handlePreOrder();
      };
      // Hide cancel button
      if (cancelBtn) cancelBtn.style.display = 'none';
    }
  } else if (currentBook.qty <= 0) {
    // Completely unavailable
    borrowBtn.style.opacity = '0.5';
    borrowBtn.style.cursor = 'not-allowed';
    borrowBtn.textContent = 'Không Khả Dụng';
    borrowBtn.onclick = (e) => {
      e.preventDefault();
      if (typeof showNotification !== 'undefined') {
        showNotification('❌ Sách không khả dụng', 'error');
      } else {
        alert('❌ Sách không khả dụng');
      }
    };
    // Hide cancel button
    if (cancelBtn) cancelBtn.style.display = 'none';
  } else {
    // Hide cancel button for normal stock
    if (cancelBtn) cancelBtn.style.display = 'none';
  }
}

// Check if user has already pre-ordered this book
function checkIfPreOrdered(bookId, currentUser) {
  if (!currentUser) return false;
  
  const preOrders = JSON.parse(localStorage.getItem('preOrders')) || [];
  return preOrders.some(o => o.bookId === bookId && o.userEmail === currentUser.email && o.status === 'pending');
}

// Handle pre-order functionality
function handlePreOrder() {
  if (!currentBook) {
    alert('⚠️ Lỗi: Không tìm thấy sách');
    return;
  }
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    if (typeof showNotification !== 'undefined') {
      showNotification('⚠️ Vui lòng đăng nhập để đặt trước sách', 'error');
    } else {
      alert('⚠️ Vui lòng đăng nhập để đặt trước sách');
    }
    // Trigger login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.click();
    return;
  }
  
  // Get quantity
  const qty = parseInt(document.getElementById('qtyInput').value) || 1;
  
  // Add to pre-order list
  let preOrders = JSON.parse(localStorage.getItem('preOrders')) || [];
  const existingOrder = preOrders.find(o => o.bookId === currentBook.id && o.userEmail === currentUser.email);
  
  if (existingOrder) {
    existingOrder.qty += qty;
    existingOrder.date = new Date().toISOString();
  } else {
    preOrders.push({
      bookId: currentBook.id,
      bookName: currentBook.name,
      bookImage: currentBook.image,
      userEmail: currentUser.email,
      userName: currentUser.name,
      qty: qty,
      date: new Date().toISOString(),
      status: 'pending'
    });
  }
  
  localStorage.setItem('preOrders', JSON.stringify(preOrders));
  
  // Update button UI to "Đã Đặt Trước"
  const borrowBtn = document.querySelector('.actions .btn');
  if (borrowBtn) {
    borrowBtn.style.background = '#95a5a6';
    borrowBtn.style.cursor = 'not-allowed';
    borrowBtn.textContent = 'Đã Đặt Trước';
    borrowBtn.onclick = (e) => {
      e.preventDefault();
      if (typeof showNotification !== 'undefined') {
        showNotification('ℹ️ Bạn đã đặt trước sách này rồi!', 'error');
      } else {
        alert('ℹ️ Bạn đã đặt trước sách này rồi!');
      }
    };
  }
  
  if (typeof showNotification !== 'undefined') {
    showNotification(`✓ Đã đặt trước ${qty} quyển "${currentBook.name}". Chúng tôi sẽ thông báo khi sách có sẵn!`, 'success');
  } else {
    alert(`✓ Đã đặt trước ${qty} quyển "${currentBook.name}". Chúng tôi sẽ thông báo khi sách có sẵn!`);
  }
  
  // Show cancel button
  const cancelBtn = document.getElementById('cancelPreOrderBtn');
  if (cancelBtn) cancelBtn.style.display = 'inline-block';
}

// Handle cancel pre-order
function handleCancelPreOrder(event) {
  event.preventDefault();
  
  if (!currentBook) {
    alert('⚠️ Lỗi: Không tìm thấy sách');
    return;
  }
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert('⚠️ Vui lòng đăng nhập');
    return;
  }
  
  // Confirm cancellation
  const confirmCancel = confirm('Bạn có chắc muốn hủy đặt trước sách này?');
  if (!confirmCancel) return;
  
  // Remove from pre-orders
  let preOrders = JSON.parse(localStorage.getItem('preOrders')) || [];
  preOrders = preOrders.filter(o => !(o.bookId === currentBook.id && o.userEmail === currentUser.email));
  localStorage.setItem('preOrders', JSON.stringify(preOrders));
  
  // Update button UI back to "Đặt Trước Sách"
  const borrowBtn = document.querySelector('.actions .btn');
  const cancelBtn = document.getElementById('cancelPreOrderBtn');
  
  if (borrowBtn) {
    borrowBtn.style.background = '#e67e22';
    borrowBtn.style.cursor = 'pointer';
    borrowBtn.textContent = 'Đặt Trước Sách';
    borrowBtn.onclick = (e) => {
      e.preventDefault();
      handlePreOrder();
    };
  }
  
  // Hide cancel button
  if (cancelBtn) cancelBtn.style.display = 'none';
  
  if (typeof showNotification !== 'undefined') {
    showNotification(`✓ Đã hủy đặt trước "${currentBook.name}"`, 'success');
  } else {
    alert(`✓ Đã hủy đặt trước "${currentBook.name}"`);
  }
}

// Book details page specific functions
function addToCartFromDetails(event) {
  event.preventDefault();
  
  if (!currentBook) {
    alert('⚠️ Lỗi: Không tìm thấy sách');
    return;
  }
  
  // Check login
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    if (typeof showNotification !== 'undefined') {
      showNotification('⚠️ Vui lòng đăng nhập để mượn sách', 'error');
    } else {
      alert('⚠️ Vui lòng đăng nhập để mượn sách');
    }
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.click();
    return;
  }
  
  if (currentBook.qty <= 0) {
    alert('❌ Sách đã hết');
    return;
  }
  
  const qty = parseInt(document.getElementById('qtyInput').value) || 1;
  
  if (qty > currentBook.qty) {
    alert(`⚠️ Chỉ còn ${currentBook.qty} quyển`);
    return;
  }
  
  // Add to borrowing list (cart) with full information
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Calculate dates
  const today = new Date();
  const borrowDate = today.toISOString().split('T')[0];
  const dueDate = new Date(today.setDate(today.getDate() + 30)).toISOString().split('T')[0]; // 30 days
  
  // Add new borrow request
  cart.push({
    id: currentBook.id,
    name: currentBook.name,
    image: currentBook.image,
    qty: qty,
    borrowDate: borrowDate,
    dueDate: dueDate,
    status: 'pending', // pending, approved, returned
    userEmail: currentUser.email,
    userName: currentUser.name
  });
  
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart badge
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.length;
  
  if (typeof showNotification !== 'undefined') {
    showNotification(`✓ Đã gửi yêu cầu mượn ${qty} quyển "${currentBook.name}". Vui lòng chờ thủ thư duyệt.`, 'success');
  } else {
    alert(`✓ Đã gửi yêu cầu mượn ${qty} quyển "${currentBook.name}". Vui lòng chờ thủ thư duyệt.`);
  }
}

function submitReview(event) {
  event.preventDefault();
  
  if (!currentBook) {
    alert('⚠️ Lỗi: Không tìm thấy sách');
    return;
  }
  
  const rating = document.querySelector('input[name="rate"]:checked');
  const text = document.getElementById('reviewText').value;
  const msg = document.getElementById('reviewMsg');
  
  if (!rating) {
    msg.textContent = '⚠️ Vui lòng chọn số sao';
    msg.style.color = 'orange';
    return;
  }
  
  if (!text.trim()) {
    msg.textContent = '⚠️ Vui lòng viết đánh giá';
    msg.style.color = 'orange';
    return;
  }
  
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!currentUser) {
    msg.textContent = '⚠️ Vui lòng đăng nhập để đánh giá';
    msg.style.color = 'orange';
    return;
  }
  
  reviews.push({
    bookId: currentBook.id,
    rating: parseInt(rating.value),
    text: text,
    date: new Date().toLocaleDateString('vi-VN'),
    user: currentUser.name
  });
  
  localStorage.setItem('reviews', JSON.stringify(reviews));
  msg.textContent = '✓ Cảm ơn đánh giá của bạn!';
  msg.style.color = 'green';
  
  document.querySelectorAll('input[name="rate"]').forEach(el => el.checked = false);
  document.getElementById('reviewText').value = '';
  
  setTimeout(() => msg.textContent = '', 3000);
  
  // Show notification if available from script.js
  if (typeof showNotification !== 'undefined') {
    showNotification('✓ Cảm ơn đánh giá của bạn!', 'success');
  }
}
