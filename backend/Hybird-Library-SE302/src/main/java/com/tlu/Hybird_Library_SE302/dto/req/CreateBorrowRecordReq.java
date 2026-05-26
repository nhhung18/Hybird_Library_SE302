package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBorrowRecordReq {
    private Integer userId;
    private Integer bookId;
    private LocalDateTime borrowDate;
    private LocalDateTime dueDate;
    private BookType bookType;
    private BorrowStatus borrowStatus;
    private ApprovalStatus approvalStatus;
    private Integer renew;
    private ReceiveMethod receiveMethod;
}