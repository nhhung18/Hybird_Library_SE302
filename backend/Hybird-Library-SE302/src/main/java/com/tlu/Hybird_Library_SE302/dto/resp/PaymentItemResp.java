package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentItemResp {
    private Integer id;
    private Integer paymentTransactionId;
    private Integer costId;
    private PaymentItemType itemType;
    private BigDecimal amount;
    private String description;
}