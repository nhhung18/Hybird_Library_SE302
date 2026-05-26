package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReturnRecordResp {
    private Integer id;
    private Integer borrowId;
    private LocalDateTime returnDate;
    private Integer returnDelayDays;
    private BigDecimal fineAmount;
    private ApprovalStatus approvalStatus;
    private Integer damageLevelId;
    private Boolean isLost;
    private ReturnMethod returnMethod;
}