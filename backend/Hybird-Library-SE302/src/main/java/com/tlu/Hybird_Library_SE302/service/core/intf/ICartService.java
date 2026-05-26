package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CartResp;
import java.util.List;
public interface ICartService {
    List<CartResp> getAllCarts();
    CartResp getCartById(int id);
    CartResp getCartByUserId(int userId);
    CartResp createCart(CreateCartReq request);
    CartResp updateCart(int id, UpdateCartReq request);
    void deleteCart(int id);
}