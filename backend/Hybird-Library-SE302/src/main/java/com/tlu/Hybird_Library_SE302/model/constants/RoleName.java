package com.tlu.Hybird_Library_SE302.model.constants;

import com.fasterxml.jackson.annotation.JsonValue;

public enum RoleName {
    ADMIN ("Quản lý"),
    LIBRARIAN ("Thủ thư"),
    GUEST ("Khách"),
    READER ("Độc giả");

    private final String description;
    RoleName(String description){
        this.description = description;
    }

    @JsonValue
    public String getDescription(){
        return this.description;
    }
}
