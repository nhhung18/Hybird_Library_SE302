package com.tlu.Hybird_Library_SE302.model;

import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.RoleName;
import com.tlu.Hybird_Library_SE302.model.constants.UserStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class User extends BaseIdObject {
    @Column(name = "user_name", length = 255, unique = true, nullable = false)
    private String userName;

    @Column(name = "full_name", length = 255, nullable = false)
    private String fullName;

    @Column(name = "email", length = 255, unique = true, nullable = false)
    private String email;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "phone_num", length = 10, nullable = false, unique = true)
    private String phoneNum;

    @Column(name = "avatar_url", length = 255)
    private String avatarUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private RoleName role;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private UserStatus userStatus;

//    public RoleName getRole() {
//        return role;
//    }
//
//    public void setRole(RoleName role) {
//        this.role = role;
//    }

}
