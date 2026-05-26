package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/cart-items")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CartItemController {
    private final ICartItemService iCartItemService;
    @GetMapping
    public ResponseEntity<?> getAllCartItems() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartItemService.getAllCartItems()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCartItemById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartItemService.getCartItemById(id)).build());
    }
    @GetMapping("/cart/{cartId}")
    public ResponseEntity<?> getCartItemsByCartId(@PathVariable int cartId) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartItemService.getCartItemsByCartId(cartId)).build());
    }
    @PostMapping
    public ResponseEntity<?> createCartItem(@RequestBody CreateCartItemReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iCartItemService.createCartItem(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCartItem(@PathVariable int id, @RequestBody UpdateCartItemReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartItemService.updateCartItem(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable int id) {
        iCartItemService.deleteCartItem(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}