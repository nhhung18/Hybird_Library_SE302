package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "shipments")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Shipment extends BaseIdObject {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "borrow_record_id", unique = true)
    private BorrowRecord borrowRecord;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "return_record_id", unique = true)
    private ReturnRecord returnRecord;

    @Column(name = "tracking_code", length = 100)
    private String trackingCode;

    @Column(name = "shipping_fee")
    @Builder.Default
    private BigDecimal shippingFee = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "shipment_status")
    @Builder.Default
    private ShipmentStatus shipmentStatus = ShipmentStatus.WAITING_CONFIRMATION;

    @Column(name = "shipped_at")
    private LocalDateTime shippedAt;

    @Column(name = "delivered_at")
    private LocalDateTime deliveredAt;
}