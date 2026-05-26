package com.tlu.Hybird_Library_SE302.controller;

import com.tlu.Hybird_Library_SE302.dto.req.CreatePenaltyCostReq;
import com.tlu.Hybird_Library_SE302.dto.req.UpdatePenaltyCostReq;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IPenaltyCostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/penalty-costs")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PenaltyCostController {

    private final IPenaltyCostService iPenaltyCostService;

    @GetMapping()
    public ResponseEntity<?> getAllPenaltyCosts() {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iPenaltyCostService.getAllPenaltyCosts())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPenaltyCostById(@PathVariable int id) {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iPenaltyCostService.getPenaltyCostById(id))
                        .build()
        );
    }

    @PostMapping()
    public ResponseEntity<?> createPenaltyCost(@RequestBody CreatePenaltyCostReq request) {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.CREATED)
                        .code(201)
                        .data(iPenaltyCostService.createPenaltyCost(request))
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePenaltyCost(@PathVariable int id, @RequestBody UpdatePenaltyCostReq request) {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iPenaltyCostService.updatePenaltyCost(id, request))
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePenaltyCost(@PathVariable int id) {
        iPenaltyCostService.deletePenaltyCost(id);
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data("Xóa phí phạt thành công!")
                        .build()
        );
    }
}
