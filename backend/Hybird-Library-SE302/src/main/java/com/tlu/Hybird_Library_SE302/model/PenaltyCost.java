package com.tlu.Hybird_Library_SE302.model;

import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.CalculationType;
import com.tlu.Hybird_Library_SE302.model.constants.PenaltyCostName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "penalty_costs")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PenaltyCost extends BaseIdObject {
    
    @Enumerated(EnumType.STRING)
    @Column(name = "penalty_cost_name", unique = true, nullable = false)
    private PenaltyCostName penaltyCostName;

    @Enumerated(EnumType.STRING)
    @Column(name = "calculation_type", nullable = false)
    private CalculationType calculationType;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
