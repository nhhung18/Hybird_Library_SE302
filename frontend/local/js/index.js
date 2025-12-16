// // Mock featured books dataset (with display fields)
// const booksDatabase = [
//   { id: 1, name: 'Nghĩ lớn để thành công', author: 'Donald Trump', image: 'image/book/nghilondethanhcong.jpg', qty: 10, rating: 5.0, reviews: 615},
//   { id: 2, name: 'Lãnh đạo khôn ngoan', author: 'KITA BOOKS', image: 'image/book/lanhdaokhongoan.jpg', qty: 5, rating: 3.6, reviews: 120},
//   { id: 3, name: 'Tư duy làm giàu', author: 'KITA BOOKS', image: 'image/book/tuduylamgiau.jpg', qty: 2, rating: 4.4, reviews: 67},
//   { id: 4, name: 'Đắc Nhân Tâm', author: 'Dale Carnegie', image: 'image/book/dacnhantam.jpg', qty: 0, rating: 4.8, reviews: 500}
// ];
// // favorites persisted in localStorage (array of ids)
// let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
// if (!Array.isArray(favorites)) favorites = [];
// // simple cart store
// let cart = JSON.parse(localStorage.getItem('cart') || '[]');
// if (!Array.isArray(cart)) cart = [];

// function addToFavorites(id) {
//   const book = booksDatabase.find(b => b.id === id);
//   if (!book) return;
//   const idx = favorites.indexOf(id);
//   if (idx === -1) {
//     favorites.push(id);
//     Swal.fire({toast: true, position: 'top-end', icon: 'success', title: `Đã thêm vào yêu thích: ${book.name}`, showConfirmButton: false, timer: 1200});
//   } else {
//     favorites.splice(idx, 1);
//     Swal.fire({toast: true, position: 'top-end', icon: 'info', title: `Đã bỏ yêu thích: ${book.name}`, showConfirmButton: false, timer: 1200});
//   }
//   try{ localStorage.setItem('favorites', JSON.stringify(favorites)); }catch(e){}
//   renderFeaturedBooks();
// }

// function removeFavorite(id){
//   favorites.delete(id);
//   try{ localStorage.setItem('favorites', JSON.stringify(Array.from(favorites))); }catch(e){}
//   renderFeaturedBooks();
// }

// function showWishlist(){
//   if (!favorites || favorites.size === 0){
//     Swal.fire('Danh sách yêu thích trống');
//     return;
//   }
//   const items = booksDatabase.filter(b => favorites.has(b.id)).map(b => `
//     <div class="swal-wishlist-item">
//       <img src="${b.image}" alt="${b.name}" class="swal-wishlist-thumb" />
//       <div class="swal-wishlist-main">
//         <div class="swal-wishlist-title">${b.name}</div>
//       </div>
//       <div class="swal-wishlist-actions">
//         <a href="book-details.html?id=${b.id}" class="swal-btn view">Xem</a>
//         <button class="swal-btn remove" onclick="removeFavorite(${b.id}); Swal.close(); return false;">Xóa</button>
//       </div>
//     </div>
//   `).join('');
//   Swal.fire({
//     title: 'Yêu thích của bạn',
//     html: `<div style="text-align:left; max-height:300px; overflow:auto;">${items}</div>`,
//     width: 600
//   });
// }

// function addToCart(id, name, price = 0, qty = 1) {
//   const book = booksDatabase.find(b => b.id === id);
//   const itemName = name || (book && book.name) || `Sách ${id}`;
//   const idx = cart.findIndex(c => c.id === id);
//   if (idx >= 0) {
//     cart[idx].qty += qty;
//   } else {
//     cart.push({ id, name: itemName, qty, price });
//   }
//   try { localStorage.setItem('cart', JSON.stringify(cart)); } catch(e) {}
//   // toast feedback using SweetAlert2 if available, else alert fallback
//   if (window.Swal && Swal.fire) {
//     Swal.fire({
//       toast: true,
//       position: 'top-end',
//       icon: 'success',
//       title: `Đã thêm "${itemName}" vào giỏ`,
//       showConfirmButton: false,
//       timer: 1400
//     });
//   } else {
//     alert(`Đã thêm "${itemName}" vào giỏ`);
//   }
// }

// // Render featured books on page load
// function renderFeaturedBooks() {
//   const wrapper = document.getElementById('featuredBooksWrapper');
//   if (!wrapper) return;
//   // simplified card: image, title, rating, borrow button
//   wrapper.innerHTML = booksDatabase.map(book => {
//     const isFav = favorites && Array.isArray(favorites) && favorites.includes(book.id);
//     const btnClass = isFav ? 'favor-btn liked' : 'favor-btn';
//     const iconClass = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
//     return `
//     <div class="swiper-slide box product-card">
//       <div class="image">
//         <a href="book-details.html?id=${book.id}">
//           <img src="${book.image}" alt="${book.name}">
//         </a>
//       </div>
//       <div class="content">
//         <h3 class="title">${book.name}</h3>
//         <div class="rating" style="font-size:1.05rem; font-weight:600;">⭐ ${book.rating} (${book.reviews})</div>
//         <div class="btn-row">
//           <a href="book-details.html?id=${book.id}" class="btn borrow-btn">Xem chi tiết</a>
//           <button
//             class="btn add-to-cart"
//             title="Thêm vào giỏ"
//             aria-label="Thêm vào giỏ"
//             data-id="${book.id}"
//             data-name="${book.name}"
//             data-price="0">
//             <i class="fa-solid fa-cart-shopping"></i>
//           </button>
//         </div>
//         <button title="Yêu thích" class="${btnClass}" onclick="handleHeartClick(this, ${book.id}); return false;" aria-label="Yêu thích" aria-pressed="${isFav? 'true':'false'}" style="margin-top:0.5rem;">
//           <i class="${iconClass}"></i>
//         </button>
//       </div>
//     </div>
//     `;
//   }).join('');

//   window.handleHeartClick = function(btn, id){
//     if (!btn) return;
//     addToFavorites(id);
//     const isNowFav = favorites && Array.isArray(favorites) && favorites.includes(id);
//     const icon = btn.querySelector('i');
//     if (isNowFav) {
//       btn.classList.add('liked'); if (icon) icon.className = 'fa-solid fa-heart';
//     } else {
//       btn.classList.remove('liked'); if (icon) icon.className = 'fa-regular fa-heart';
//     }
//   };
  
//   // Reinitialize Swiper after rendering
//   setTimeout(() => {
//     try{
//       if (window.featuredSwiper && typeof window.featuredSwiper.update === 'function') window.featuredSwiper.update();
//     }catch(e){/* ignore */}
//   }, 100);
// }

// // helper: format price number to VND style
// function formatPrice(n){
//   if (!n && n !== 0) return '';
//   return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
// }

// // Initialize featured books on DOMContentLoaded
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', function(){
//     renderFeaturedBooks();
//     const wb = document.getElementById('wishlist-btn');
//     if (wb) wb.addEventListener('click', showWishlist);
//   });
// } else {
//   renderFeaturedBooks();
//   const wb = document.getElementById('wishlist-btn');
//   if (wb) wb.addEventListener('click', showWishlist);
// }
