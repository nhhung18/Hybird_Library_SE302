package com.tlu.Hybird_Library_SE302.controller;

import com.tlu.Hybird_Library_SE302.dto.req.UpdateUserAddressReq;
import com.tlu.Hybird_Library_SE302.dto.resp.UserAddressResp;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserAddressService;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user-addresses")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserAddressController {

    private final IUserAddressService iUserAddressService;

    @GetMapping()
    public ResponseEntity<?> getALlUserAddress(){
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserAddressService.getALlUserAddress())
        );
    }

    @PutMapping("/{userId}/update/{addressId}")
    public ResponseEntity<?> updateUserAddress(@PathVariable int userId, @PathVariable int addressId, @RequestBody UpdateUserAddressReq request){
        return ResponseEntity.ok(
                ResponseWrapper.builder()
                        .status(HttpStatus.OK)
                        .code(200)
                        .data(iUserAddressService.updateUserAddress(userId, addressId, request))
        );
    }
}
