package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IPaymentItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/payment-items")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentItemController {
    private final IPaymentItemService iPaymentItemService;
    @GetMapping
    public ResponseEntity<?> getAllPaymentItems() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iPaymentItemService.getAllPaymentItems()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPaymentItemById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iPaymentItemService.getPaymentItemById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createPaymentItem(@RequestBody CreatePaymentItemReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iPaymentItemService.createPaymentItem(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePaymentItem(@PathVariable int id, @RequestBody UpdatePaymentItemReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iPaymentItemService.updatePaymentItem(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePaymentItem(@PathVariable int id) {
        iPaymentItemService.deletePaymentItem(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}