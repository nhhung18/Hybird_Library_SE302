package com.g3.hab_lib.controller;

import com.g3.hab_lib.dto.req.UserReq;
import com.g3.hab_lib.service.core.ResponseWrapper;
import com.g3.hab_lib.service.core.intf.IUserService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.filters.AddDefaultCharsetFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    @Autowired
    private IUserService iUserService;

    @GetMapping("customers")
    public ResponseEntity<?> getAllCustomer(Pageable pageable){
        return ResponseEntity.ok (
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.getAllCustomer(pageable))
                        .build()
        );
    }

    @GetMapping("staffs")
    public ResponseEntity<?> getAllStaff(Pageable pageable){
        return ResponseEntity.ok (
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.getAllStaff(pageable))
                        .build()
        );
    }

    @PostMapping()
    public ResponseEntity<?> createUser(@RequestBody UserReq form) throws Exception {
        iUserService.createUser(form);
        return new ResponseEntity<String>("Create User is Successfully", HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) throws Exception {
            return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.deleteUser(id))
                        .build()
            );
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserReq form) throws Exception {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.updateUser(id, form))
                        .build()
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) throws Exception {
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.getUserById(id))
                        .build()
        );
    }
}
