package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
@Entity
@Table(name = "payment_items")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaymentItem extends BaseIdObject {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_transaction_id", nullable = false)
    private PaymentTransaction paymentTransaction;

    @Column(name = "cost_id")
    private Integer costId;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_type")
    private PaymentItemType itemType;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "description", length = 255)
    private String description;
}