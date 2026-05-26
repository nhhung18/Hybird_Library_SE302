package com.tlu.Hybird_Library_SE302.service.core.intf;

import com.tlu.Hybird_Library_SE302.dto.req.CreateUserAddressReq;
import com.tlu.Hybird_Library_SE302.dto.req.UpdateUserAddressReq;
import com.tlu.Hybird_Library_SE302.dto.resp.UserAddressResp;
import com.tlu.Hybird_Library_SE302.model.UserAddress;

import java.util.List;

public interface IUserAddressService {

    List<UserAddressResp> getALlUserAddress();

    UserAddressResp updateUserAddress(int userId, int addressId, UpdateUserAddressReq request);

    UserAddressResp createUserAddress(int userId, CreateUserAddressReq request);

    void deleteUserAddress(int userId, int addressId);
}
