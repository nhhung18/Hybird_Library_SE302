package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePaymentItemReq {
    private Integer costId;
    private PaymentItemType itemType;
    private BigDecimal amount;
    private String description;
}