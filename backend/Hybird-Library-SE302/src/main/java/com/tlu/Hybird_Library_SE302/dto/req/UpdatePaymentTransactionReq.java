package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePaymentTransactionReq {
    private String transactionCode;
    private BigDecimal amount;
    private PaymentStatus status;
    private PaymentMethod paymentMethod;
    private LocalDateTime paidAt;
}