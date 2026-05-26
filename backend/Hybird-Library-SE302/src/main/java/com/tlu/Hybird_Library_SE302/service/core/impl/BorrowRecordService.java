package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.BorrowRecordResp;
import com.tlu.Hybird_Library_SE302.model.BorrowRecord;
import com.tlu.Hybird_Library_SE302.model.Book;
import com.tlu.Hybird_Library_SE302.model.User;
import com.tlu.Hybird_Library_SE302.repository.IBorrowRecordRepository;
import com.tlu.Hybird_Library_SE302.repository.IBookRepository;
import com.tlu.Hybird_Library_SE302.repository.IUserRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IBorrowRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
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
        User user = iUserRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("Không tìm thấy user!"));
        Book book = iBookRepository.findById(request.getBookId()).orElseThrow(() -> new RuntimeException("Không tìm thấy sách!"));
        
        BorrowRecord record = BorrowRecord.builder()
            .user(user)
            .book(book)
            .borrowDate(request.getBorrowDate())
            .dueDate(request.getDueDate())
            .bookType(request.getBookType())
            .borrowStatus(request.getBorrowStatus() != null ? request.getBorrowStatus() : com.tlu.Hybird_Library_SE302.model.constants.BorrowStatus.BORROWING)
            .approvalStatus(request.getApprovalStatus() != null ? request.getApprovalStatus() : com.tlu.Hybird_Library_SE302.model.constants.ApprovalStatus.PENDING)
            .renew(request.getRenew() != null ? request.getRenew() : 0)
            .receiveMethod(request.getReceiveMethod() != null ? request.getReceiveMethod() : com.tlu.Hybird_Library_SE302.model.constants.ReceiveMethod.LIBRARY_PICKUP)
            .build();
        return mapToResp(iBorrowRecordRepository.save(record));
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
            .userId(record.getUser() != null ? record.getUser().getId() : null)
            .bookId(record.getBook() != null ? record.getBook().getId() : null)
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