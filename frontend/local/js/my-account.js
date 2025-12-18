// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Vui lòng đăng nhập trước');
        window.location.href = 'index.html';
        return;
    }
    
    loadProfile();
    loadBorrowingList();
    loadFavorites();
    
    // Kiểm tra nếu có parameter section=membership trong URL
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section === 'membership') {
        // Tự động chuyển đến section membership
        const membershipMenuItem = document.querySelector('.menu-item[onclick*="membership"]');
        if (membershipMenuItem) {
            setTimeout(() => {
                membershipMenuItem.click();
            }, 100);
        }
    } else {
        // Kiểm tra nếu section membership đang active
        const membershipSection = document.getElementById('membership');
        if (membershipSection && membershipSection.classList.contains('active')) {
            loadMembershipTier();
        }
    }
});

function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const rankMap = {
        'customer': 'Khách hàng',
        'librarian': 'Thủ thư',
        'admin': 'Admin'
    };
    
    const tierEmojis = { bronze: '🥉', silver: '🥈', gold: '🥇' };
    const tierNames = { bronze: 'Tiêu Chuẩn', silver: 'Bạc', gold: 'Vàng' };
    const hasTier = currentUser.membershipTier && currentUser.status !== 'guest';
    const tier = currentUser.membershipTier;
    
    const borrowHistory = JSON.parse(localStorage.getItem('cart')) || [];
    const userBorrowHistory = borrowHistory.filter(b => b.userEmail === currentUser.email);
    const totalBorrowed = userBorrowHistory.length;
    const currentlyBorrowing = userBorrowHistory.filter(b => b.status !== 'returned').length;
    
    const tierDisplay = hasTier && tier 
        ? `<value style="color: ${tier === 'gold' ? '#ffd700' : tier === 'silver' ? '#c0c0c0' : '#a67c52'};">${tierEmojis[tier]} Hạng ${tierNames[tier]}</value>`
        : `<value style="color: #e74c3c;">❌ Chưa đăng ký</value>`;
    
    document.getElementById('profileCard').innerHTML = `
        <div class="profile-info">
            <div class="info-item">
                <label>Tên</label>
                <value>${currentUser.name}</value>
            </div>
            <div class="info-item">
                <label>Email</label>
                <value>${currentUser.email}</value>
            </div>
            <div class="info-item">
                <label>Địa Chỉ</label>
                <value>${currentUser.address || 'Chưa cập nhật'}</value>
            </div>
            <div class="info-item">
                <label>Loại Tài Khoản</label>
                <value>${rankMap[currentUser.role] || 'Khách hàng'}</value>
            </div>
            <div class="info-item">
                <label>Hạng Thẻ</label>
                ${tierDisplay}
            </div>
            <div class="info-item">
                <label>Tổng Sách Đã Mượn</label>
                <value>${totalBorrowed}</value>
            </div>
            <div class="info-item">
                <label>Đang Mượn</label>
                <value style="color: ${currentlyBorrowing > 0 ? '#f39c12' : '#27ae60'};">${currentlyBorrowing}</value>
            </div>
            <div class="info-item">
                <label>Ngày Tham Gia</label>
                <value>${new Date().toLocaleDateString('vi-VN')}</value>
            </div>
            <div class="info-item" style="grid-column: 1 / -1; margin-top: 1rem;">
                <button onclick="openEditProfileModal()" style="background: #27ae60; color: white; border: none; padding: 0.8rem 2rem; border-radius: 0.4rem; cursor: pointer; font-size: 1rem; font-weight: bold;">✏️ Cập Nhật Thông Tin Cá Nhân</button>
            </div>
        </div>
    `;
}

function loadBorrowingList() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const preOrders = JSON.parse(localStorage.getItem('preOrders')) || [];
    
    // Filter by current user
    const userBorrowing = cart.filter(item => 
        item.status !== 'returned' && 
        item.userEmail === currentUser.email
    );
    const userPreOrders = preOrders.filter(o => 
        o.userEmail === currentUser.email && 
        o.status === 'pending'
    );
    
    const tbody = document.getElementById('borrowingBody');
    const empty = document.getElementById('borrowingEmpty');
    
    if (userBorrowing.length === 0 && userPreOrders.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = 'block';
    } else {
        let html = '';
        
        // Render borrowing list
        html += userBorrowing.map((item, idx) => {
            const today = new Date();
            const dueDate = new Date(item.dueDate);
            const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            const isOverdue = daysLeft < 0;
            const statusClass = item.status === 'pending' ? 'status-pending' : 
                               item.status === 'approved' ? 'status-approved' : 
                               isOverdue ? 'status-overdue' : 'status-approved';
            const statusText = isOverdue ? '⚠️ QUÁ HẠN' :
                              daysLeft <= 3 ? '🔔 SẮP HẾT HẠN' :
                              item.status === 'pending' ? '⏳ Chờ duyệt' : '✓ Đang mượn';
            
            return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.borrowDate || '--'}</td>
                    <td>${item.dueDate || '--'}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>
                        ${item.status === 'approved' ? 
                            `<button onclick="extendBorrow(${idx})" style="background:#3498db; color:white; border:none; padding:0.5rem 1rem; border-radius:0.3rem; cursor:pointer; margin-right:0.5rem;">Gia Hạn</button>` :
                            `<button style="background:#95a5a6; color:white; border:none; padding:0.5rem 1rem; border-radius:0.3rem; cursor:not-allowed;" disabled>Chờ duyệt</button>`
                        }
                    </td>
                </tr>
            `;
        }).join('');
        
        // Render pre-orders
        html += userPreOrders.map((order, idx) => {
            const orderDate = new Date(order.date).toLocaleDateString('vi-VN');
            return `
                <tr style="background:#fff9e6;">
                    <td>${order.bookName} <span style="color:#e67e22; font-weight:bold; font-size:0.85rem;">(Đặt trước)</span></td>
                    <td>${orderDate}</td>
                    <td>--</td>
                    <td><span class="status-badge" style="background:#e67e22; color:white;">📦 Đặt trước</span></td>
                    <td>
                        <button onclick="cancelPreOrderFromAccount(${order.bookId})" style="background:#e74c3c; color:white; border:none; padding:0.5rem 1rem; border-radius:0.3rem; cursor:pointer;">Hủy</button>
                    </td>
                </tr>
            `;
        }).join('');
        
        tbody.innerHTML = html;
        empty.style.display = 'none';
    }
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const grid = document.getElementById('favoritesGrid');
    const empty = document.getElementById('favoritesEmpty');
    
    if (favorites.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'block';
    } else {
        grid.innerHTML = favorites.map(fav => `
            <div style="background:#f9f9f9; padding:1rem; border-radius:0.5rem; text-align:center;">
                <p style="font-weight:bold; margin:0 0 0.5rem 0;">${fav.name}</p>
                <a href="book-details.html?id=${fav.id}" class="btn" style="display:inline-block;">Xem Chi Tiết</a>
            </div>
        `).join('');
        empty.style.display = 'none';
    }
}

function extendBorrow(idx) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const userBorrowing = cart.filter(item => 
        item.status !== 'returned' && 
        item.userEmail === currentUser.email
    );
    const item = userBorrowing[idx];
    
    if (!item) return;
    
    // Check if can extend
    if (item.status !== 'approved') {
        showNotification('Chỉ có thể gia hạn sách đã được duyệt!', 'error');
        return;
    }
    
    const oldDueDate = new Date(item.dueDate);
    const newDueDate = new Date(oldDueDate);
    newDueDate.setDate(newDueDate.getDate() + 14); // Gia hạn 14 ngày
    
    const newDueDateStr = newDueDate.toISOString().split('T')[0];
    
    // Update in cart
    const cartIdx = cart.findIndex(c => 
        c.id === item.id && 
        c.borrowDate === item.borrowDate && 
        c.userEmail === currentUser.email
    );
    
    if (cartIdx !== -1) {
        cart[cartIdx].dueDate = newDueDateStr;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadBorrowingList();
        showNotification('Gia hạn thành công! Hạn trả mới: ' + newDueDateStr);
    }
}

function changePassword(event) {
    event.preventDefault();
    
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('Mật khẩu mới không khớp!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const userIdx = users.findIndex(u => u.email === currentUser.email && u.password === oldPassword);
    if (userIdx === -1) {
        alert('Mật khẩu cũ không đúng!');
        return;
    }
    
    users[userIdx].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('✓ Đổi mật khẩu thành công!');
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function switchSection(sectionId, element) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    element.classList.add('active');
    
    // Load data for section
    if (sectionId === 'borrowing') loadBorrowingList();
    if (sectionId === 'favorites') loadFavorites();
    if (sectionId === 'membership') loadMembershipTier();
}

// Helper function for notifications
function showNotification(message, type = 'success') {
    // Simple notification using alert for now, can be enhanced later
    if (type === 'error') {
        alert('❌ ' + message);
    } else {
        alert('✓ ' + message);
    }
}

function loadMembershipTier() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const hasTier = currentUser.membershipTier && currentUser.status !== 'guest';
    const tier = currentUser.membershipTier || null;
    
    const tierEmojis = { bronze: '🥉', silver: '🥈', gold: '🥇' };
    const tierNames = { bronze: 'Tiêu Chuẩn', silver: 'Bạc', gold: 'Vàng' };
    const tierPrices = { bronze: '500,000₫/năm', silver: '1,000,000₫/năm', gold: '2,000,000₫/năm' };
    
    const currentTierNameEl = document.getElementById('currentTierName');
    const currentMembershipInfo = document.getElementById('currentMembershipInfo');
    const currentMembershipText = document.getElementById('currentMembershipText');
    const tierBronzeBtn = document.getElementById('tierBronzeBtn');
    const cancelTierBtn = document.getElementById('cancelTierBtn');
    
    if (hasTier && tier) {
        // User đã có membership tier
        currentTierNameEl.innerHTML = `${tierEmojis[tier]} Hạng ${tierNames[tier]}`;
        currentTierNameEl.style.color = 'var(--green)';
        
        currentMembershipText.textContent = `${tierEmojis[tier]} Hạng ${tierNames[tier]} - ${tierPrices[tier]}`;
        currentMembershipInfo.style.display = 'block';
        
        // Hiển thị nút hủy gói
        cancelTierBtn.style.display = 'block';
        
        // Cập nhật nút đăng ký
        tierBronzeBtn.textContent = '✓ Đã Đăng Ký';
        tierBronzeBtn.disabled = true;
        tierBronzeBtn.style.background = '#95a5a6';
        tierBronzeBtn.style.cursor = 'not-allowed';
    } else {
        // User chưa có membership tier
        currentTierNameEl.innerHTML = '❌ Chưa Đăng Ký';
        currentTierNameEl.style.color = '#e74c3c';
        
        currentMembershipInfo.style.display = 'none';
        cancelTierBtn.style.display = 'none';
        
        // Hiển thị nút đăng ký
        tierBronzeBtn.textContent = 'Đăng Ký';
        tierBronzeBtn.disabled = false;
        tierBronzeBtn.style.background = '#27ae60';
        tierBronzeBtn.style.cursor = 'pointer';
    }
}

// Hàm đăng ký membership tier
function registerTier(tier) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification('Vui lòng đăng nhập trước!', 'error');
        return;
    }
    
    // Kiểm tra nếu đã có tier
    if (currentUser.membershipTier && currentUser.status !== 'guest') {
        if (!confirm('Bạn đã có thẻ mượn. Bạn có muốn đăng ký lại không?')) {
            return;
        }
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tierNames = { bronze: 'Tiêu Chuẩn', silver: 'Bạc', gold: 'Vàng' };
    
    // Cập nhật người dùng
    currentUser.membershipTier = tier;
    currentUser.status = 'user';
    currentUser.registrationDate = new Date().toISOString().split('T')[0];
    
    // Cập nhật trong danh sách users
    const userIdx = users.findIndex(u => u.email === currentUser.email);
    if (userIdx !== -1) {
        users[userIdx].membershipTier = tier;
        users[userIdx].status = 'user';
        users[userIdx].registrationDate = currentUser.registrationDate;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));
    
    showNotification(`Đăng ký thẻ mượn thành công! Bạn là hạng ${tierNames[tier]}`);
    
    // Reload để cập nhật UI
    loadMembershipTier();
    loadProfile(); // Cập nhật profile để hiển thị tier mới
}

// Hàm hủy membership tier
function cancelTier() {
    if (!confirm('Bạn có chắc chắn muốn hủy gói thẻ mượn? Bạn sẽ không thể mượn sách sau khi hủy.')) {
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification('Vui lòng đăng nhập trước!', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Cập nhật người dùng - chuyển về guest
    currentUser.membershipTier = null;
    currentUser.status = 'guest';
    
    // Cập nhật trong danh sách users
    const userIdx = users.findIndex(u => u.email === currentUser.email);
    if (userIdx !== -1) {
        users[userIdx].membershipTier = null;
        users[userIdx].status = 'guest';
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));
    
    showNotification('Đã hủy gói thẻ mượn thành công!');
    
    // Reload để cập nhật UI
    loadMembershipTier();
    loadProfile(); // Cập nhật profile
}

function changeTier(newTier) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users'));
    
    currentUser.membershipTier = newTier;
    
    // Update in users array
    const userIdx = users.findIndex(u => u.email === currentUser.email);
    if (userIdx !== -1) {
        users[userIdx].membershipTier = newTier;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));
    
    const tierNames = { bronze: 'Tiêu Chuẩn', silver: 'Bạc', gold: 'Vàng' };
    showNotification(`Nâng cấp thành công! Bạn đã chọn hạng ${tierNames[newTier]}`);
    
    loadMembershipTier();
    loadProfile();
}

function logout() {
    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Mở modal cập nhật thông tin cá nhân
function openEditProfileModal() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    document.getElementById('editName').value = currentUser.name || '';
    document.getElementById('editEmail').value = currentUser.email || '';
    document.getElementById('editAddress').value = currentUser.address || '';
    
    document.getElementById('editProfileModal').style.display = 'block';
}

// Đóng modal cập nhật thông tin cá nhân
function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none';
}

// Cập nhật thông tin cá nhân
function updateProfile(event) {
    event.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const newName = document.getElementById('editName').value.trim();
    const newEmail = document.getElementById('editEmail').value.trim();
    const newAddress = document.getElementById('editAddress').value.trim();
    
    if (!newName || !newEmail) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    // Kiểm tra email đã được sử dụng bởi người khác
    if (newEmail !== currentUser.email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.email === newEmail)) {
            showNotification('Email này đã được sử dụng!', 'error');
            return;
        }
    }
    
    // Cập nhật currentUser
    const oldEmail = currentUser.email;
    currentUser.name = newName;
    currentUser.email = newEmail;
    currentUser.address = newAddress;
    
    // Cập nhật trong users array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIdx = users.findIndex(u => u.email === oldEmail);
    if (userIdx !== -1) {
        users[userIdx].name = newName;
        users[userIdx].email = newEmail;
        users[userIdx].address = newAddress;
    }
    
    // Cập nhật lại email trong cart, preOrders nếu email thay đổi
    if (oldEmail !== newEmail) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let preOrders = JSON.parse(localStorage.getItem('preOrders')) || [];
        
        cart = cart.map(item => {
            if (item.userEmail === oldEmail) {
                item.userEmail = newEmail;
            }
            return item;
        });
        
        preOrders = preOrders.map(order => {
            if (order.userEmail === oldEmail) {
                order.userEmail = newEmail;
            }
            return order;
        });
        
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('preOrders', JSON.stringify(preOrders));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));
    
    closeEditProfileModal();
    loadProfile();
    showNotification('Cập nhật thông tin cá nhân thành công!');
}

// Cancel pre-order from account page
function cancelPreOrderFromAccount(bookId) {
    if (!confirm('Bạn có chắc muốn hủy đặt trước sách này?')) {
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    let preOrders = JSON.parse(localStorage.getItem('preOrders')) || [];
    preOrders = preOrders.filter(o => !(o.bookId === bookId && o.userEmail === currentUser.email));
    localStorage.setItem('preOrders', JSON.stringify(preOrders));
    
    showNotification('Đã hủy đặt trước sách thành công!');
    loadBorrowingList(); // Refresh list
}

// Đóng modal khi click ngoài modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('editProfileModal');
    if (modal && event.target === modal) {
        closeEditProfileModal();
    }
});