package com.tlu.Hybird_Library_SE302.service.core.impl;

import com.tlu.Hybird_Library_SE302.dto.req.CreateUserAddressReq;
import com.tlu.Hybird_Library_SE302.dto.req.UpdateUserAddressReq;
import com.tlu.Hybird_Library_SE302.dto.resp.UserAddressResp;
import com.tlu.Hybird_Library_SE302.model.User;
import com.tlu.Hybird_Library_SE302.model.UserAddress;
import com.tlu.Hybird_Library_SE302.repository.IUserAddressRepository;
import com.tlu.Hybird_Library_SE302.repository.IUserRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserAddressService;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public UserAddressResp createUserAddress(int userId, CreateUserAddressReq request) {
        User user = iUserRepository.findById(userId).orElseThrow((() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userId)));
        User convertInt = new User();
        convertInt.setId(userId);
        UserAddress userAddress = UserAddress.builder()
                .user(convertInt)
                .receiverName(request.getReceiverName())
                .phone(request.getPhone())
                .addressLine(request.getAddressLine())
                .ward(request.getWard())
                .city(request.getCity())
                .isDefault(request.isDefault())
                .build();

        UserAddress create = iUserAddressRepository.save(userAddress);
        return mapToUserAddressResp(create);
    }

    @Override
    public void deleteUserAddress(int userId, int addressId) {
        UserAddress userAddress = iUserAddressRepository.findById(addressId).orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ với ID: " + addressId));
        User user = iUserRepository.findById(userId).orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userId));

        iUserAddressRepository.delete(userAddress);
    }

    @Override
    public UserAddressResp updateUserAddress(int userId, int addressId, UpdateUserAddressReq request) {
        UserAddress userAddress = iUserAddressRepository.findById(addressId).orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ với ID: " + addressId));
        User user = iUserRepository.findById(userId).orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userId));

        if(request.getReceiverName() != null){
            userAddress.setReceiverName(request.getReceiverName());
        }

        if(request.getPhone() != null){
            userAddress.setPhone(request.getPhone());
        }

        if(request.getAddressLine() != null){
            userAddress.setAddressLine(request.getAddressLine());
        }

        if(request.getWard() != null){
            userAddress.setWard(request.getWard());
        }

        if(request.isDefault() == true || request.isDefault() == false){
            userAddress.setDefault(request.isDefault());
        }

        UserAddress updateUserAddress = iUserAddressRepository.save(userAddress);
        return mapToUserAddressResp(updateUserAddress);
    }

    private UserAddressResp mapToUserAddressResp(UserAddress userAddress){
        return UserAddressResp.builder()
                        .id(userAddress.getId())
                        .user(userAddress.getUser())
                        .receiverName(userAddress.getReceiverName())
                        .phone(userAddress.getPhone())
                        .addressLine(userAddress.getAddressLine())
                        .ward(userAddress.getWard())
                        .city(userAddress.getCity())
                        .isDefault(userAddress.isDefault())
                    .build();
    }
}
