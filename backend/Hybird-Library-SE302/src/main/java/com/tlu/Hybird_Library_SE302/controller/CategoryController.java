package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/categories")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CategoryController {
    private final ICategoryService iCategoryService;
    @GetMapping
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCategoryService.getAllCategories()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCategoryService.getCategoryById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody CreateCategoryReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iCategoryService.createCategory(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable int id, @RequestBody UpdateCategoryReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCategoryService.updateCategory(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable int id) {
        iCategoryService.deleteCategory(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}