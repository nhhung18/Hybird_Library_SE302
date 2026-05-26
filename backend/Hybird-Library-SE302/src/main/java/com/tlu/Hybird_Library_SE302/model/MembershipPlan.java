package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.MembershipPlanName;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
@Entity
@Table(name = "membership_plans")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MembershipPlan extends BaseIdObject {
    @Enumerated(EnumType.STRING)
    @Column(name = "plan_name", nullable = false, unique = true)
    private MembershipPlanName planName;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "duration_days", nullable = false)
    private Integer durationDays;
    @Column(name = "max_borrow_books", nullable = false)
    private Integer maxBorrowBooks;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
}