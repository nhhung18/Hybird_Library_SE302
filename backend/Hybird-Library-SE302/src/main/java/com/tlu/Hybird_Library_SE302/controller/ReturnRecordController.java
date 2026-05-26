package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IReturnRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/return-records")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReturnRecordController {
    private final IReturnRecordService iReturnRecordService;
    @GetMapping
    public ResponseEntity<?> getAllReturnRecords() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iReturnRecordService.getAllReturnRecords()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getReturnRecordById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iReturnRecordService.getReturnRecordById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createReturnRecord(@RequestBody CreateReturnRecordReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iReturnRecordService.createReturnRecord(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReturnRecord(@PathVariable int id, @RequestBody UpdateReturnRecordReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iReturnRecordService.updateReturnRecord(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReturnRecord(@PathVariable int id) {
        iReturnRecordService.deleteReturnRecord(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}