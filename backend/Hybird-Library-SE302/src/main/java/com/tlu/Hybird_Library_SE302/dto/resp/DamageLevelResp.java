package com.tlu.Hybird_Library_SE302.dto.resp;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DamageLevelResp {
    private Integer id;
    private String levelName;
    private BigDecimal percentValue;
    private String description;
}