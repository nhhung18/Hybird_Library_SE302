package com.tlu.Hybird_Library_SE302.controller;

import com.tlu.Hybird_Library_SE302.dto.req.CreateUserReq;
import com.tlu.Hybird_Library_SE302.dto.req.UpdateUserReq;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final IUserService iUserService;

    @GetMapping()
    public ResponseEntity<?> getAllUser() {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.getAllUser())
                        .build()
        );
    }

    @GetMapping("/librarian")
    public ResponseEntity<?> getAllLibrarian() {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.getAllLibrarian())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.getUserById(id))
                        .build()
        );
    }

    @PostMapping()
    public ResponseEntity<?> createUser(@RequestBody CreateUserReq request) {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.CREATED)
                        .code(201)
                        .data(iUserService.createUser(request))
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UpdateUserReq request) {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.updateUser(id, request))
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        iUserService.deleteUser(id);
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data("Xóa người dùng thành công!")
                        .build()
        );
    }
}
