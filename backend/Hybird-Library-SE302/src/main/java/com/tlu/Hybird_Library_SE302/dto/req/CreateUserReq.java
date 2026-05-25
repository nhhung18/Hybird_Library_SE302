package com.tlu.Hybird_Library_SE302.dto.req;

import com.tlu.Hybird_Library_SE302.model.constants.RoleName;
import com.tlu.Hybird_Library_SE302.model.constants.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserReq {
    private String userName;
    private String fullName;
    private String email;
    private String password;
    private String phoneNum;
    private String avatarUrl;
    private RoleName role;
    private UserStatus userStatus;
}
