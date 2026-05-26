package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
@Entity
@Table(name = "damage_levels")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class DamageLevel extends BaseIdObject {
    @Column(name = "level_name", length = 50, nullable = false, unique = true)
    private String levelName;
    @Column(name = "percent_value", nullable = false)
    private BigDecimal percentValue;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}