package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/shipments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ShipmentController {
    private final IShipmentService iShipmentService;
    @GetMapping
    public ResponseEntity<?> getAllShipments() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iShipmentService.getAllShipments()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getShipmentById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iShipmentService.getShipmentById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createShipment(@RequestBody CreateShipmentReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iShipmentService.createShipment(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateShipment(@PathVariable int id, @RequestBody UpdateShipmentReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iShipmentService.updateShipment(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShipment(@PathVariable int id) {
        iShipmentService.deleteShipment(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}