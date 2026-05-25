package com.tlu.Hybird_Library_SE302.dto.req;

import com.tlu.Hybird_Library_SE302.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserAddressReq {
    private User user;
    private String receiverName;
    private String phone;
    private String addressLine;
    private String ward;
    private String district;
    private String city;
    private boolean isDefault;
}
