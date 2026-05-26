package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IDamageLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/damage-levels")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DamageLevelController {
    private final IDamageLevelService iDamageLevelService;
    @GetMapping
    public ResponseEntity<?> getAllDamageLevels() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iDamageLevelService.getAllDamageLevels()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDamageLevelById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iDamageLevelService.getDamageLevelById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createDamageLevel(@RequestBody CreateDamageLevelReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iDamageLevelService.createDamageLevel(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDamageLevel(@PathVariable int id, @RequestBody UpdateDamageLevelReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iDamageLevelService.updateDamageLevel(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDamageLevel(@PathVariable int id) {
        iDamageLevelService.deleteDamageLevel(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}