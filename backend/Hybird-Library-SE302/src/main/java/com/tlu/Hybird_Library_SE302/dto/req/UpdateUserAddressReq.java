package com.tlu.Hybird_Library_SE302.dto.req;

import com.tlu.Hybird_Library_SE302.model.User;
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
public class UpdateUserAddressReq {
    private User user;
    private String receiverName;
    private String phone;
    private String addressLine;
    private String ward;
    private String city;
    private boolean isDefault;
}
