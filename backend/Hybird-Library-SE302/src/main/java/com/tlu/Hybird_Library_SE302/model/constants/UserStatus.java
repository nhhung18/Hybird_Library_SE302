package com.tlu.Hybird_Library_SE302.model.constants;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserStatus {
    ACTIVE ("Đã kích hoạt"),
    BANNED ("Đã khóa"),
    INACTIVE ("Chờ kích hoạt");

    private final String description;
    UserStatus(String description){
        this.description = description;
    }

    @JsonValue
    public String getDescription(){
        return this.description;
    }
}
