package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/carts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CartController {
    private final ICartService iCartService;
    @GetMapping
    public ResponseEntity<?> getAllCarts() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartService.getAllCarts()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCartById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartService.getCartById(id)).build());
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getCartByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartService.getCartByUserId(userId)).build());
    }
    @PostMapping
    public ResponseEntity<?> createCart(@RequestBody CreateCartReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iCartService.createCart(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCart(@PathVariable int id, @RequestBody UpdateCartReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartService.updateCart(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCart(@PathVariable int id) {
        iCartService.deleteCart(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}