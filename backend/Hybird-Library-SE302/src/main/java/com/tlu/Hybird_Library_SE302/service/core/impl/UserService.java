package com.tlu.Hybird_Library_SE302.service.core.impl;

import com.tlu.Hybird_Library_SE302.dto.resp.UserResp;
import com.tlu.Hybird_Library_SE302.model.User;
import com.tlu.Hybird_Library_SE302.repository.IUserRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserService;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserService implements IUserService {

    private final IUserRepository iUserRepository;

    public UserService(IUserRepository iUserRepository) {
        this.iUserRepository = iUserRepository;
    }

    @Override
    public List<UserResp> getAllUser() {
        List<User> userList = iUserRepository.findAll();
        return userList.stream().map(user -> UserResp.builder()
                .id(user.getId())
                .userName(user.getUserName())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNum(user.getPhoneNum())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .userStatus(user.getUserStatus()).build()).toList();
    }
}
