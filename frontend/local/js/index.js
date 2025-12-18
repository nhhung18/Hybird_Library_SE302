// ==========================================
// QL GIỎ SÁCH - BOOK CART MANAGEMENT
// ==========================================

// Load cart from localStorage
let cart = [];

function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!Array.isArray(cart)) cart = [];
  } catch (e) {
    cart = [];
  }
}

function saveCart() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (e) {
    console.error('Error saving cart:', e);
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const totalBooks = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalBooks;
    badge.style.display = totalBooks > 0 ? 'inline-block' : 'none';
  }
}

// ==========================================
// 1. XEM SÁCH TRONG GIỎ (View Cart)
// ==========================================
function renderCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  
  if (!cartItemsDiv) return;
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p style="text-align:center; padding:2rem; color: #999;">📚 Giỏ sách trống</p>';
    if (cartFooter) cartFooter.style.display = 'none';
    updateCartBadge();
    return;
  }
  
  const html = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Tên Sách</th>
          <th>Số Lượng</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map((item, idx) => `
          <tr class="cart-item-row">
            <td class="book-name">${item.name}</td>
            <td class="quantity-cell">
              <div class="quantity-control">
                <button class="qty-btn" onclick="updateQuantity(${idx}, -1)" title="Giảm">−</button>
                <input type="number" value="${item.qty}" min="1" max="10" onchange="setQuantity(${idx}, this.value)" class="qty-input" />
                <button class="qty-btn" onclick="updateQuantity(${idx}, 1)" title="Tăng">+</button>
              </div>
            </td>
            <td class="actions-cell">
              <button class="btn-remove" onclick="removeFromCart(${idx})" title="Xóa">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  
  cartItemsDiv.innerHTML = html;
  if (cartFooter) cartFooter.style.display = 'block';
  updateCartBadge();
}

// ==========================================
// 2. CẬP NHẬT SỐ LƯỢNG (Update Quantity)
// ==========================================
function updateQuantity(idx, delta) {
  if (idx < 0 || idx >= cart.length) return;
  const newQty = cart[idx].qty + delta;
  if (newQty >= 1 && newQty <= 10) {
    cart[idx].qty = newQty;
    saveCart();
    renderCart();
  }
}

function setQuantity(idx, value) {
  if (idx < 0 || idx >= cart.length) return;
  const qty = parseInt(value, 10);
  if (qty >= 1 && qty <= 10) {
    cart[idx].qty = qty;
    saveCart();
    renderCart();
  }
}

// ==========================================
// 3. XÓA SÁCH TRONG GIỎ (Remove from Cart)
// ==========================================
function removeFromCart(idx) {
  if (idx < 0 || idx >= cart.length) return;
  
  const bookName = cart[idx].name;
  
  Swal.fire({
    title: 'Xóa sách?',
    text: `Bạn có chắc muốn xóa "${bookName}" khỏi giỏ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#27ae60',
    cancelButtonColor: '#999',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      cart.splice(idx, 1);
      saveCart();
      renderCart();
      Swal.fire({
        icon: 'success',
        title: 'Đã xóa!',
        text: `"${bookName}" đã được xóa khỏi giỏ`,
        timer: 1500
      });
    }
  });
}

// ==========================================
// 4. YÊU CẦU MƯỢN SÁCH (Submit Borrow Request)
// ==========================================
function submitBorrowRequest() {
  if (cart.length === 0) {
    Swal.fire('Lỗi', 'Giỏ sách trống!', 'error');
    return;
  }
  
  // Get current user
  let currentUser = null;
  try {
    const userStr = localStorage.getItem('currentUser');
    currentUser = userStr ? JSON.parse(userStr) : null;
  } catch (e) {}
  
  if (!currentUser || !currentUser.id) {
    Swal.fire({
      title: 'Chưa đăng nhập',
      text: 'Vui lòng đăng nhập để yêu cầu mượn sách',
      icon: 'warning',
      confirmButtonColor: '#27ae60'
    });
    return;
  }
  
  // Prepare borrow data
  const totalBooks = cart.reduce((sum, item) => sum + item.qty, 0);
  const borrowData = {
    readerId: currentUser.id,
    readerName: currentUser.fullName || 'Unknown',
    items: [...cart],
    totalBooks: totalBooks,
    requestDate: new Date().toISOString().split('T')[0],
    status: 'Chờ duyệt',
    notes: ''
  };
  
  // Save to preOrders or borrowRequests
  let preOrders = [];
  try {
    const stored = localStorage.getItem('preOrders');
    preOrders = stored ? JSON.parse(stored) : [];
  } catch (e) {}
  
  if (!Array.isArray(preOrders)) preOrders = [];
  
  const newOrder = {
    id: 'BO' + Date.now(),
    ...borrowData
  };
  
  preOrders.push(newOrder);
  try {
    localStorage.setItem('preOrders', JSON.stringify(preOrders));
  } catch (e) {}
  
  // Clear cart and close modal
  cart = [];
  saveCart();
  renderCart();
  closeCart();
  
  Swal.fire({
    icon: 'success',
    title: 'Gửi Thành Công!',
    html: `<p>Yêu cầu mượn đã được gửi đến thư viện</p>
           <p style="font-size: 0.9rem; color: #666; margin-top: 1rem;">
             📋 <strong>Mã yêu cầu:</strong> ${newOrder.id}<br/>
             📚 <strong>Số sách:</strong> ${totalBooks}<br/>
             ⏳ <strong>Trạng thái:</strong> Chờ duyệt
           </p>
           <p style="font-size: 0.85rem; color: #999; margin-top: 1rem;">
             Thủ thư sẽ xem xét và phê duyệt trong vòng 24 giờ
           </p>`,
    confirmButtonColor: '#27ae60'
  });
}

// ==========================================
// CART MODAL FUNCTIONS
// ==========================================
function openCart() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.add('active');
    renderCart();
  }
}

function closeCart() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// ==========================================
// ADD TO CART (from other pages)
// ==========================================
function addToCart(id, name, qty = 1) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    cart.push({ id, name, qty });
  }
  saveCart();
  updateCartBadge();
  
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: `✓ Thêm vào giỏ: ${name}`,
    showConfirmButton: false,
    timer: 1200
  });
}

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  updateCartBadge();
  
  // Bind cart button
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openCart();
    });
  }
  
  // Bind close on modal overlay click
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeCart();
      }
    });
  }

  // Initialize notifications
  loadNotifications();
  updateNotificationBadge();
  
  // Bind notification button
  const notificationBtn = document.getElementById('notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openNotifications();
    });
  }
  
  // Bind close on notification modal overlay click
  const notificationModal = document.getElementById('notificationModal');
  if (notificationModal) {
    notificationModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeNotifications();
      }
    });
  }

  // Add mock notifications for demo
  addMockNotifications();
});

// ==========================================
// NOTIFICATION MANAGEMENT
// ==========================================

let notifications = [];

function loadNotifications() {
  try {
    notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    if (!Array.isArray(notifications)) notifications = [];
  } catch (e) {
    notifications = [];
  }
}

function saveNotifications() {
  try {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (e) {
    console.error('Error saving notifications:', e);
  }
}

function updateNotificationBadge() {
  const badge = document.getElementById('notification-badge');
  if (badge) {
    const unreadCount = notifications.filter(n => !n.read).length;
    badge.innerText = unreadCount;
    badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
  }
}

function addNotification(title, message, type = 'info', icon = '📬') {
  const notification = {
    id: 'notif_' + Date.now(),
    title: title,
    message: message,
    type: type,
    icon: icon,
    read: false,
    createdAt: new Date().toLocaleString('vi-VN'),
    timestamp: Date.now()
  };
  
  notifications.unshift(notification);
  saveNotifications();
  updateNotificationBadge();
  renderNotifications();
  
  return notification;
}

function addMockNotifications() {
  // Clear old notifications and add fresh ones
  notifications = [];
  
  addNotification(
    'Yêu cầu mượn được duyệt',
    'Yêu cầu mượn 3 cuốn sách của bạn đã được duyệt. Vui lòng đến thư viện lấy sách.',
    'success',
    '✅'
  );
  addNotification(
    'Thông báo hết hạn sách',
    'Sách "Lập trình JavaScript" sắp hết hạn vào ngày 25/12/2025. Vui lòng gia hạn hoặc trả sách.',
    'warning',
    '⏰'
  );
  addNotification(
    'Thông báo nộp tiền',
    'Bạn có 1 hóa đơn chưa thanh toán: 150,000đ cho phí cấp thẻ. Vui lòng thanh toán trong 7 ngày.',
    'warning',
    '💰'
  );
  addNotification(
    'Hệ thống bảo trì',
    'Thư viện sẽ bảo trì hệ thống vào ngày 20/12/2025 từ 22:00 đến 06:00 sáng hôm sau.',
    'info',
    '🔧'
  );
  addNotification(
    'Sách mới được thêm',
    'Sách "Clean Code" và "Design Patterns" vừa được thêm vào thư viện. Hãy khám phá ngay!',
    'info',
    '📚'
  );
  addNotification(
    'Nhắc nhở đặt lạc hạn sách',
    'Sách "Python cơ bản" của bạn sẽ hết hạn trong 3 ngày nữa. Hãy gia hạn ngay để tiếp tục sử dụng.',
    'warning',
    '⏳'
  );
  addNotification(
    'Thanh toán thành công',
    'Thanh toán phí cấp thẻ 200,000đ vào lúc 14:30 ngày 18/12/2025 đã được xác nhận.',
    'success',
    '✔️'
  );
  addNotification(
    'Sách được trả thành công',
    'Sách "Giới thiệu về Thuật toán" đã được ghi nhận là trả vào 10:15 sáng nay.',
    'success',
    '📖'
  );
  addNotification(
    'Yêu cầu gia hạn được duyệt',
    'Yêu cầu gia hạn cho sách "Web Development" đã được duyệt. Hạn sử dụng được kéo dài đến 25/01/2026.',
    'success',
    '🔄'
  );
}


function renderNotifications() {
  const notificationList = document.getElementById('notificationList');
  const notificationFooter = document.getElementById('notificationFooter');
  
  if (!notificationList) return;
  
  if (notifications.length === 0) {
    notificationList.innerHTML = '<p style="text-align:center; padding:2rem; color: #999;">📭 Không có thông báo</p>';
    if (notificationFooter) notificationFooter.style.display = 'none';
    return;
  }
  
  const html = `
    <div class="notification-items">
      ${notifications.map((notif, idx) => `
        <div class="notification-item ${notif.read ? 'read' : 'unread'}" onclick="markAsRead('${notif.id}')">
          <div class="notif-icon">${notif.icon}</div>
          <div class="notif-content">
            <h4 class="notif-title">${notif.title}</h4>
            <p class="notif-message">${notif.message}</p>
            <small class="notif-time">${notif.createdAt}</small>
          </div>
          <button class="btn-notif-delete" onclick="deleteNotification('${notif.id}', event)" title="Xóa">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `).join('')}
    </div>
  `;
  
  notificationList.innerHTML = html;
  if (notificationFooter) notificationFooter.style.display = 'block';
}

function markAsRead(notifId) {
  const notif = notifications.find(n => n.id === notifId);
  if (notif) {
    notif.read = true;
    saveNotifications();
    updateNotificationBadge();
    renderNotifications();
  }
}

function deleteNotification(notifId, event) {
  if (event) event.stopPropagation();
  
  notifications = notifications.filter(n => n.id !== notifId);
  saveNotifications();
  updateNotificationBadge();
  renderNotifications();
}

function clearAllNotifications() {
  Swal.fire({
    title: 'Xóa tất cả thông báo?',
    text: 'Hành động này không thể hoàn tác',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#999',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      notifications = [];
      saveNotifications();
      updateNotificationBadge();
      renderNotifications();
      Swal.fire({
        icon: 'success',
        title: 'Đã xóa!',
        text: 'Tất cả thông báo đã được xóa',
        timer: 1500
      });
    }
  });
}

function openNotifications() {
  const modal = document.getElementById('notificationModal');
  if (modal) {
    modal.classList.add('active');
    renderNotifications();
  }
}

function closeNotifications() {
  const modal = document.getElementById('notificationModal');
  if (modal) {
    modal.classList.remove('active');
  }
}
