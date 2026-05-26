package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CartItemResp;
import com.tlu.Hybird_Library_SE302.model.CartItem;
import com.tlu.Hybird_Library_SE302.model.Cart;
import com.tlu.Hybird_Library_SE302.model.Book;
import com.tlu.Hybird_Library_SE302.repository.ICartItemRepository;
import com.tlu.Hybird_Library_SE302.repository.ICartRepository;
import com.tlu.Hybird_Library_SE302.repository.IBookRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService {
    private final ICartItemRepository iCartItemRepository;
    private final ICartRepository iCartRepository;
    private final IBookRepository iBookRepository;
    @Override
    public List<CartItemResp> getAllCartItems() {
        return iCartItemRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public CartItemResp getCartItemById(int id) {
        CartItem item = iCartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy item!"));
        return mapToResp(item);
    }
    @Override
    public List<CartItemResp> getCartItemsByCartId(int cartId) {
        return iCartItemRepository.findByCartId(cartId).stream().map(this::mapToResp).toList();
    }
    @Override
    public CartItemResp createCartItem(CreateCartItemReq request) {
        Cart cart = iCartRepository.findById(request.getCartId()).orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng!"));
        Book book = iBookRepository.findById(request.getBookId()).orElseThrow(() -> new RuntimeException("Không tìm thấy sách!"));
        CartItem item = CartItem.builder()
            .cart(cart)
            .book(book)
            .bookType(request.getBookType())
            .build();
        return mapToResp(iCartItemRepository.save(item));
    }
    @Override
    public CartItemResp updateCartItem(int id, UpdateCartItemReq request) {
        CartItem item = iCartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy item!"));
        if(request.getBookId() != null) {
            Book book = iBookRepository.findById(request.getBookId()).orElseThrow(() -> new RuntimeException("Không tìm thấy sách!"));
            item.setBook(book);
        }
        if(request.getBookType() != null) item.setBookType(request.getBookType());
        return mapToResp(iCartItemRepository.save(item));
    }
    @Override
    public void deleteCartItem(int id) {
        CartItem item = iCartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy item!"));
        iCartItemRepository.delete(item);
    }
    private CartItemResp mapToResp(CartItem item) {
        return CartItemResp.builder()
            .id(item.getId())
            .cartId(item.getCart() != null ? item.getCart().getId() : null)
            .bookId(item.getBook() != null ? item.getBook().getId() : null)
            .bookType(item.getBookType())
            .build();
    }
}