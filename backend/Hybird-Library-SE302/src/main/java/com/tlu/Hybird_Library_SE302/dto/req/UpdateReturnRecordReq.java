package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateReturnRecordReq {
    private Integer returnDelayDays;
    private BigDecimal fineAmount;
    private ApprovalStatus approvalStatus;
    private Integer damageLevelId;
    private Boolean isLost;
    private ReturnMethod returnMethod;
}