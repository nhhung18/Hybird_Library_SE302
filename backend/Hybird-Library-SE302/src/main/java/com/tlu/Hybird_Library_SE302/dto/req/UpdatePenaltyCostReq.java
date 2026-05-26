package com.tlu.Hybird_Library_SE302.dto.req;

import com.tlu.Hybird_Library_SE302.model.constants.CalculationType;
import com.tlu.Hybird_Library_SE302.model.constants.PenaltyCostName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePenaltyCostReq {
    private PenaltyCostName penaltyCostName;
    private CalculationType calculationType;
    private BigDecimal price;
    private String description;
}
