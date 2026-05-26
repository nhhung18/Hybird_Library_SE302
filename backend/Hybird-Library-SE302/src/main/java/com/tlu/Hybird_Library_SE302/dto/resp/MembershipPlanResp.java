package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.MembershipPlanName;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MembershipPlanResp {
    private Integer id;
    private MembershipPlanName planName;
    private BigDecimal price;
    private Integer durationDays;
    private Integer maxBorrowBooks;
    private String description;
    private Boolean isActive;
}