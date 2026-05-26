package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.BorrowRecordResp;
import com.tlu.Hybird_Library_SE302.model.BorrowRecord;
import com.tlu.Hybird_Library_SE302.model.Book;
import com.tlu.Hybird_Library_SE302.model.User;
import com.tlu.Hybird_Library_SE302.model.constants.ApprovalStatus;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import com.tlu.Hybird_Library_SE302.model.constants.BorrowStatus;
import com.tlu.Hybird_Library_SE302.model.constants.ReceiveMethod;
import com.tlu.Hybird_Library_SE302.repository.IBorrowRecordRepository;
import com.tlu.Hybird_Library_SE302.repository.IBookRepository;
import com.tlu.Hybird_Library_SE302.repository.IUserRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IBorrowRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.tlu.Hybird_Library_SE302.model.constants.BorrowStatus.BORROWING;

@Service
@RequiredArgsConstructor
public class BorrowRecordService implements IBorrowRecordService {
    private final IBorrowRecordRepository iBorrowRecordRepository;
    private final IUserRepository iUserRepository;
    private final IBookRepository iBookRepository;
    
    @Override
    public List<BorrowRecordResp> getAllBorrowRecords() {
        return iBorrowRecordRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public BorrowRecordResp getBorrowRecordById(int id) {
        BorrowRecord record = iBorrowRecordRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu mượn!"));
        return mapToResp(record);
    }
    @Override
    public BorrowRecordResp createBorrowRecord(CreateBorrowRecordReq request) {
        User user = iUserRepository.findById(request.getUser().getId()).orElseThrow(() -> new RuntimeException("Không tìm thấy user!"));
        Book book = iBookRepository.findById(request.getBook().getId()).orElseThrow(() -> new RuntimeException("Không tìm thấy sách!"));
        if(iBorrowRecordRepository.existsByUser_IdAndBook_IdAndBorrowStatus(request.getUser().getId(), request.getBook().getId(), BORROWING)){
            throw new RuntimeException("Không thể tạo yêu cầu mượn vì đã tồn tại!");
        }
        if (iBorrowRecordRepository.existsByUser_IdAndBook_IdAndBorrowStatus(request.getUser().getId(), request.getBook().getId(), BorrowStatus.REQUESTING)){
            throw new RuntimeException("Không thể tạo yêu cầu mượn vì đã tồn tại!");
        }
        LocalDateTime borrowDate = LocalDateTime.now();

        if (request.getBookType() == BookType.EBOOK){
            BorrowRecord ebookRecord = BorrowRecord.builder()
                    .user(user)
                    .book(book)
                    .borrowDate(borrowDate)
                    .dueDate(borrowDate.plusDays(14))
                    .bookType(request.getBookType())
                    .borrowStatus(BORROWING)
                    .approvalStatus(ApprovalStatus.APPROVED)
                    .renew(0)
                    .receiveMethod(ReceiveMethod.EBOOK)
                    .build();
            return mapToResp(iBorrowRecordRepository.save(ebookRecord));
        }
            BorrowRecord physicalRecord = BorrowRecord.builder()
                    .user(user)
                    .book(book)
                    .borrowDate(borrowDate)
                    .dueDate(borrowDate.plusDays(14))
                    .bookType(request.getBookType())
                    .borrowStatus(request.getBorrowStatus() != null ? request.getBorrowStatus() : BorrowStatus.REQUESTING)
                    .approvalStatus(request.getApprovalStatus() != null ? request.getApprovalStatus() : ApprovalStatus.PENDING)
                    .renew(0)
                    .receiveMethod(request.getReceiveMethod() != null ? request.getReceiveMethod() : ReceiveMethod.LIBRARY_PICKUP)
                    .build();
            iBorrowRecordRepository.save(physicalRecord);
        return mapToResp(iBorrowRecordRepository.save(physicalRecord));
    }
    @Override
    public BorrowRecordResp updateBorrowRecord(int id, UpdateBorrowRecordReq request) {
        BorrowRecord record = iBorrowRecordRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu mượn!"));
        if(request.getDueDate() != null) record.setDueDate(request.getDueDate());
        if(request.getBorrowStatus() != null) record.setBorrowStatus(request.getBorrowStatus());
        if(request.getApprovalStatus() != null) record.setApprovalStatus(request.getApprovalStatus());
        if(request.getRenew() != null) record.setRenew(request.getRenew());
        if(request.getReceiveMethod() != null) record.setReceiveMethod(request.getReceiveMethod());
        return mapToResp(iBorrowRecordRepository.save(record));
    }
    @Override
    public void deleteBorrowRecord(int id) {
        BorrowRecord record = iBorrowRecordRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu mượn!"));
        iBorrowRecordRepository.delete(record);
    }
    private BorrowRecordResp mapToResp(BorrowRecord record) {
        return BorrowRecordResp.builder()
            .id(record.getId())
            .user(record.getUser() != null ? record.getUser() : null)
            .book(record.getBook() != null ? record.getBook() : null)
            .borrowDate(record.getBorrowDate())
            .dueDate(record.getDueDate())
            .bookType(record.getBookType())
            .borrowStatus(record.getBorrowStatus())
            .approvalStatus(record.getApprovalStatus())
            .renew(record.getRenew())
            .receiveMethod(record.getReceiveMethod())
            .build();
    }
}