package com.tlu.Hybird_Library_SE302.dto.resp;

import com.tlu.Hybird_Library_SE302.model.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.objenesis.SpringObjenesis;

@Data
@Builder
public class UserAddressResp {
    private int id;
    private User user;
    private String receiverName;
    private String phone;
    private String addressLine;
    private String ward;
    private String district;
    private String city;
    private boolean isDefault;
}
