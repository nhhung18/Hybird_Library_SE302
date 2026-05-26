package com.tlu.Hybird_Library_SE302.model;

import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "user_addresses")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserAddress extends BaseIdObject {

    @Column(name = "receiver_name", length = 255, nullable = false)
    private String receiverName;

    @Column(name = "phone", length = 10, nullable = false)
    private String phone;

    @Column(name = "address_line", length = 255, nullable = false)
    private String addressLine;

    @Column(name = "ward", length = 255, nullable = false)
    private String ward;

    @Column(name = "city", length = 255, nullable = false)
    private String city;

    @Column(name = "is_default")
    private boolean isDefault;

    @ManyToOne()
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
