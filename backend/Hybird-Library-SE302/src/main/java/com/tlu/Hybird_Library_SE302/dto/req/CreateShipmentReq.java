package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateShipmentReq {
    private Integer borrowRecordId;
    private Integer returnRecordId;
    private String trackingCode;
    private BigDecimal shippingFee;
    private ShipmentStatus shipmentStatus;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
}