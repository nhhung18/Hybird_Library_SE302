package com.tlu.Hybird_Library_SE302.service.core.impl;

import com.tlu.Hybird_Library_SE302.dto.req.CreateUserReq;
import com.tlu.Hybird_Library_SE302.dto.req.UpdateUserReq;
import com.tlu.Hybird_Library_SE302.dto.resp.UserResp;
import com.tlu.Hybird_Library_SE302.model.User;
import com.tlu.Hybird_Library_SE302.model.constants.RoleName;
import com.tlu.Hybird_Library_SE302.model.constants.UserStatus;
import com.tlu.Hybird_Library_SE302.repository.IUserRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final IUserRepository iUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserResp> getAllUser() {
        List<User> userList = iUserRepository.findAllUser();
        return userList.stream().map(this::mapToUserResp).toList();
    }

    @Override
    public UserResp getUserById(int id) {
        User user = iUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + id));
        return mapToUserResp(user);
    }

    @Override
    public UserResp createUser(CreateUserReq request) {
        if (iUserRepository.existsByUserName(request.getUserName())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại!");
        }
        if (iUserRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại!");
        }
        if (iUserRepository.existsByPhoneNum(request.getPhoneNum())) {
            throw new RuntimeException("Số điện thoại đã tồn tại!");
        }

        RoleName role = request.getRole() != null ? request.getRole() : RoleName.GUEST;
        UserStatus status = request.getUserStatus() != null ? request.getUserStatus() : UserStatus.INACTIVE;

        User user = User.builder()
                .userName(request.getUserName())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNum(request.getPhoneNum())
                .avatarUrl(request.getAvatarUrl())
                .role(role)
                .userStatus(status)
                .build();

        User create = iUserRepository.save(user);
        return mapToUserResp(create);
    }

    @Override
    public UserResp updateUser(int id, UpdateUserReq request) {
        User user = iUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + id));

        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (iUserRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email đã tồn tại!");
            }
            user.setEmail(request.getEmail());
        }

        if (request.getPhoneNum() != null && !request.getPhoneNum().equals(user.getPhoneNum())) {
            if (iUserRepository.existsByPhoneNum(request.getPhoneNum())) {
                throw new RuntimeException("Số điện thoại đã tồn tại!");
            }
            user.setPhoneNum(request.getPhoneNum());
        }

        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }

        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }

        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }

        if (request.getUserStatus() != null) {
            user.setUserStatus(request.getUserStatus());
        }

        User updatedUser = iUserRepository.save(user);
        return mapToUserResp(updatedUser);
    }

    @Override
    public void deleteUser(int id) {
        User user = iUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + id));
        iUserRepository.delete(user);
    }

    @Override
    public List<UserResp> getAllLibrarian() {
        List<User> userList = iUserRepository.findAllLibrarian();
        return userList.stream().map(this::mapToUserResp).toList();
    }

    private UserResp mapToUserResp(User user) {
        return UserResp.builder()
                .id(user.getId())
                .userName(user.getUserName())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNum(user.getPhoneNum())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .userStatus(user.getUserStatus())
                .build();
    }
}
