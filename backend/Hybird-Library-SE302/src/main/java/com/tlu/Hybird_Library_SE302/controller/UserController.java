package com.tlu.Hybird_Library_SE302.controller;

import com.tlu.Hybird_Library_SE302.repository.IUserRepository;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.filters.AddDefaultCharsetFilter;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<?> getAllUser(){
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserService.getAllUser())
                        .build()
        );
    }



}
