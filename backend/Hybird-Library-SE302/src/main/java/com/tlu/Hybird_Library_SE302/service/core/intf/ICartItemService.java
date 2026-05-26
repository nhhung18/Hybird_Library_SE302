package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CartItemResp;
import java.util.List;
public interface ICartItemService {
    List<CartItemResp> getAllCartItems();
    CartItemResp getCartItemById(int id);
    List<CartItemResp> getCartItemsByCartId(int cartId);
    CartItemResp createCartItem(CreateCartItemReq request);
    CartItemResp updateCartItem(int id, UpdateCartItemReq request);
    void deleteCartItem(int id);
}