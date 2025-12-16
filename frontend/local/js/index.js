// Mock featured books dataset (with display fields)
const booksDatabase = [
  { id: 1, name: 'Nghĩ lớn để thành công', author: 'Donald Trump', image: 'image/book/nghilondethanhcong.jpg', qty: 10, rating: 5.0, reviews: 615},
  { id: 2, name: 'Lãnh đạo khôn ngoan', author: 'KITA BOOKS', image: 'image/book/lanhdaokhongoan.jpg', qty: 5, rating: 3.6, reviews: 120},
  { id: 3, name: 'Tư duy làm giàu', author: 'KITA BOOKS', image: 'image/book/tuduylamgiau.jpg', qty: 2, rating: 4.4, reviews: 67},
  { id: 4, name: 'Đắc Nhân Tâm', author: 'Dale Carnegie', image: 'image/book/dacnhantam.jpg', qty: 0, rating: 4.8, reviews: 500}
];
// favorites persisted in localStorage
let favorites = new Set();
try{
  const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (Array.isArray(saved)) favorites = new Set(saved);
}catch(e){/* ignore parse errors */}

function addToFavorites(id) {
  const book = booksDatabase.find(b => b.id === id);
  if (!book) return;
  if (favorites.has(id)) {
    favorites.delete(id);
    Swal.fire({toast: true, position: 'top-end', icon: 'info', title: `Đã bỏ yêu thích: ${book.name}`, showConfirmButton: false, timer: 1200});
  } else {
    favorites.add(id);
    Swal.fire({toast: true, position: 'top-end', icon: 'success', title: `Đã thêm vào yêu thích: ${book.name}`, showConfirmButton: false, timer: 1200});
  }
  try{ localStorage.setItem('favorites', JSON.stringify(Array.from(favorites))); }catch(e){}
  renderFeaturedBooks();
}

function removeFavorite(id){
  favorites.delete(id);
  try{ localStorage.setItem('favorites', JSON.stringify(Array.from(favorites))); }catch(e){}
  renderFeaturedBooks();
}

function showWishlist(){
  if (!favorites || favorites.size === 0){
    Swal.fire('Danh sách yêu thích trống');
    return;
  }
  const items = booksDatabase.filter(b => favorites.has(b.id)).map(b => `
    <div class="swal-wishlist-item">
      <img src="${b.image}" alt="${b.name}" class="swal-wishlist-thumb" />
      <div class="swal-wishlist-main">
        <div class="swal-wishlist-title">${b.name}</div>
      </div>
      <div class="swal-wishlist-actions">
        <a href="book-details.html?id=${b.id}" class="swal-btn view">Xem</a>
        <button class="swal-btn remove" onclick="removeFavorite(${b.id}); Swal.close(); return false;">Xóa</button>
      </div>
    </div>
  `).join('');
  Swal.fire({
    title: 'Yêu thích của bạn',
    html: `<div style="text-align:left; max-height:300px; overflow:auto;">${items}</div>`,
    width: 600
  });
}

function addToCart(id, name, price = 0, qty = 1) {
  // simple placeholder for demo
  alert(`Yêu cầu mượn sách: ${name || id}`);
}

// Render featured books on page load
function renderFeaturedBooks() {
  const wrapper = document.getElementById('featuredBooksWrapper');
  if (!wrapper) return;
  // simplified card: image, title, rating, borrow button
  wrapper.innerHTML = booksDatabase.map(book => `
    <div class="swiper-slide box product-card">
      <div class="image">
        <a href="book-details.html?id=${book.id}">
          <img src="${book.image}" alt="${book.name}">
        </a>
      </div>
      <div class="content">
        <h3 class="title">${book.name}</h3>
        <div class="rating">⭐ ${book.rating} (${book.reviews})</div>
        <a href="book-details.html?id=${book.id}" class="btn borrow-btn">Xem chi tiết</a>
        <button class="favor-btn" onclick="addToFavorites(${book.id})">
          <i class="${favorites.has(book.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>
    </div>
  `).join('');
  
  // Reinitialize Swiper after rendering
  setTimeout(() => {
    try{
      if (window.featuredSwiper && typeof window.featuredSwiper.update === 'function') window.featuredSwiper.update();
    }catch(e){/* ignore */}
  }, 100);
}

// helper: format price number to VND style
function formatPrice(n){
  if (!n && n !== 0) return '';
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

// Initialize featured books on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function(){
    renderFeaturedBooks();
    const wb = document.getElementById('wishlist-btn');
    if (wb) wb.addEventListener('click', showWishlist);
  });
} else {
  renderFeaturedBooks();
  const wb = document.getElementById('wishlist-btn');
  if (wb) wb.addEventListener('click', showWishlist);
}
