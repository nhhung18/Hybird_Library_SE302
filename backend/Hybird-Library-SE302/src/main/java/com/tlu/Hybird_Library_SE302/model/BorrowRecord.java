package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "borrow_records")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class BorrowRecord extends BaseIdObject {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "borrow_date", nullable = false)
    private LocalDateTime borrowDate;

    @Column(name = "due_date", nullable = false)
    private LocalDateTime dueDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "book_type", nullable = false)
    private BookType bookType;

    @Enumerated(EnumType.STRING)
    @Column(name = "borrow_status")
    @Builder.Default
    private BorrowStatus borrowStatus = BorrowStatus.BORROWING;

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status")
    @Builder.Default
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    @Column(name = "renew")
    @Builder.Default
    private Integer renew = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "receive_method")
    @Builder.Default
    private ReceiveMethod receiveMethod = ReceiveMethod.LIBRARY_PICKUP;
}