package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentResp {
    private Integer id;
    private Integer borrowRecordId;
    private Integer returnRecordId;
    private String trackingCode;
    private BigDecimal shippingFee;
    private ShipmentStatus shipmentStatus;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
}