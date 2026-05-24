package com.tlu.Hybird_Library_SE302.dto.resp;

import com.tlu.Hybird_Library_SE302.model.constants.RoleName;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResp {
    private int id;
    private String userName;
    private String fullName;
    private String email;
    private String phoneNum;
    private String avatarUrl;
    private RoleName role;
    private String userStatus;

}
