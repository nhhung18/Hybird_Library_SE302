package com.tlu.Hybird_Library_SE302.service.core.intf;

import com.tlu.Hybird_Library_SE302.dto.req.CreateUserReq;
import com.tlu.Hybird_Library_SE302.dto.req.UpdateUserReq;
import com.tlu.Hybird_Library_SE302.dto.resp.UserResp;
import com.tlu.Hybird_Library_SE302.model.User;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IUserService {

    List<UserResp> getAllUser();
    UserResp getUserById(int id);
    UserResp createUser(CreateUserReq request);
    UserResp updateUser(int id, UpdateUserReq request);
    void deleteUser(int id);
    List<UserResp> getAllLibrarian();
}
