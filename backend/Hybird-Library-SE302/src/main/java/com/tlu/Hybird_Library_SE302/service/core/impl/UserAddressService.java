package com.tlu.Hybird_Library_SE302.service.core.impl;

import com.tlu.Hybird_Library_SE302.dto.req.UpdateUserAddressReq;
import com.tlu.Hybird_Library_SE302.dto.resp.UserAddressResp;
import com.tlu.Hybird_Library_SE302.model.User;
import com.tlu.Hybird_Library_SE302.model.UserAddress;
import com.tlu.Hybird_Library_SE302.repository.IUserAddressRepository;
import com.tlu.Hybird_Library_SE302.repository.IUserRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserAddressService;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAddressService implements IUserAddressService {

    private final IUserAddressRepository iUserAddressRepository;
    private final IUserRepository iUserRepository;

    @Override
    public List<UserAddressResp> getALlUserAddress() {
        List<UserAddress> userAddressList = iUserAddressRepository.findAll();
        return userAddressList.stream().map(this::mapToUserAddressResp).toList();
    }

    @Override
    public UserAddressResp updateUserAddress(int userId, int addressId, UpdateUserAddressReq request) {
        User user = iUserRepository.findById(userId).orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userId))


    }

    private UserAddressResp mapToUserAddressResp(UserAddress userAddress){
        return UserAddressResp.builder()
                        .id(userAddress.getId())
                        .receiverName(userAddress.getReceiverName())
                        .phone(userAddress.getPhone())
                        .addressLine(userAddress.getAddressLine())
                        .ward(userAddress.getWard())
                        .district(userAddress.getDistrict())
                        .city(userAddress.getCity())
                        .isDefault(userAddress.isDefault())
                    .build();
    }
}
