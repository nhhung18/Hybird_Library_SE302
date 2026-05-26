package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IBorrowRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/borrow-records")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BorrowRecordController {
    private final IBorrowRecordService iBorrowRecordService;
    @GetMapping
    public ResponseEntity<?> getAllBorrowRecords() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iBorrowRecordService.getAllBorrowRecords()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getBorrowRecordById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iBorrowRecordService.getBorrowRecordById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createBorrowRecord(@RequestBody CreateBorrowRecordReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iBorrowRecordService.createBorrowRecord(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBorrowRecord(@PathVariable int id, @RequestBody UpdateBorrowRecordReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iBorrowRecordService.updateBorrowRecord(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBorrowRecord(@PathVariable int id) {
        iBorrowRecordService.deleteBorrowRecord(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}