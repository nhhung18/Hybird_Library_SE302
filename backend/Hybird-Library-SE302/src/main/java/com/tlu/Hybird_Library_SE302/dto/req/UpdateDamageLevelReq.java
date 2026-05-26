package com.tlu.Hybird_Library_SE302.dto.req;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateDamageLevelReq {
    private String levelName;
    private BigDecimal percentValue;
    private String description;
}