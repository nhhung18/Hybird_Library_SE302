package com.tlu.Hybird_Library_SE302.model;

import com.tlu.Hybird_Library_SE302.model.constants.RoleName;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class Role {
    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private RoleName roleName;
}
