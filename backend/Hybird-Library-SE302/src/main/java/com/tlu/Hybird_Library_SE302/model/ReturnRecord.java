package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "return_records")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ReturnRecord extends BaseIdObject {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "borrow_id", nullable = false)
    private BorrowRecord borrowRecord;

    @Column(name = "return_date", nullable = false)
    private LocalDateTime returnDate;

    @Column(name = "return_delay_days", nullable = false)
    @Builder.Default
    private Integer returnDelayDays = 0;

    @Column(name = "fine_amount")
    @Builder.Default
    private BigDecimal fineAmount = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status")
    @Builder.Default
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "damage_level_id")
    private DamageLevel damageLevel;

    @Column(name = "is_lost")
    @Builder.Default
    private Boolean isLost = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "return_method")
    @Builder.Default
    private ReturnMethod returnMethod = ReturnMethod.LIBRARY_RETURN;
}