import os

base_dir = "/home/hungnguyen/Workspace/University/K2-2526/SE302/mini_project/Hybird_Library_SE302/backend/Hybird-Library-SE302/src/main/java/com/tlu/Hybird_Library_SE302"

files = {}

# ================= ENUMS =================
files["model/constants/BorrowStatus.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum BorrowStatus { BORROWING, RETURNED, AUTO_RETURNED }"""

files["model/constants/ApprovalStatus.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum ApprovalStatus { PENDING, APPROVED, REJECTED }"""

files["model/constants/ReceiveMethod.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum ReceiveMethod { LIBRARY_PICKUP, HOME_PICKUP }"""

files["model/constants/ReturnMethod.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum ReturnMethod { LIBRARY_RETURN, HOME_RETURN }"""

files["model/constants/ShipmentStatus.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum ShipmentStatus { WAITING_CONFIRMATION, WAITING_FOR_PICKUP, ON_DELIVERY, DELIVERED, FAILED, RETURNED_TO_LIB }"""

# ================= BORROW RECORD =================
files["model/BorrowRecord.java"] = """package com.tlu.Hybird_Library_SE302.model;
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
}"""

files["repository/IBorrowRecordRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IBorrowRecordRepository extends JpaRepository<BorrowRecord, Integer> {
}"""

files["dto/req/CreateBorrowRecordReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
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
}"""

files["dto/req/UpdateBorrowRecordReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateBorrowRecordReq {
    private LocalDateTime dueDate;
    private BorrowStatus borrowStatus;
    private ApprovalStatus approvalStatus;
    private Integer renew;
    private ReceiveMethod receiveMethod;
}"""

files["dto/resp/BorrowRecordResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BorrowRecordResp {
    private Integer id;
    private Integer userId;
    private Integer bookId;
    private LocalDateTime borrowDate;
    private LocalDateTime dueDate;
    private BookType bookType;
    private BorrowStatus borrowStatus;
    private ApprovalStatus approvalStatus;
    private Integer renew;
    private ReceiveMethod receiveMethod;
}"""

files["service/core/intf/IBorrowRecordService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.BorrowRecordResp;
import java.util.List;
public interface IBorrowRecordService {
    List<BorrowRecordResp> getAllBorrowRecords();
    BorrowRecordResp getBorrowRecordById(int id);
    BorrowRecordResp createBorrowRecord(CreateBorrowRecordReq request);
    BorrowRecordResp updateBorrowRecord(int id, UpdateBorrowRecordReq request);
    void deleteBorrowRecord(int id);
}"""

files["service/core/impl/BorrowRecordService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
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
}"""

files["controller/BorrowRecordController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IBorrowRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/borrow-records")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BorrowRecordController {
    private final IBorrowRecordService iBorrowRecordService;
    @GetMapping
    public ResponseEntity<?> getAllBorrowRecords() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iBorrowRecordService.getAllBorrowRecords()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getBorrowRecordById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iBorrowRecordService.getBorrowRecordById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createBorrowRecord(@RequestBody CreateBorrowRecordReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iBorrowRecordService.createBorrowRecord(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBorrowRecord(@PathVariable int id, @RequestBody UpdateBorrowRecordReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iBorrowRecordService.updateBorrowRecord(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBorrowRecord(@PathVariable int id) {
        iBorrowRecordService.deleteBorrowRecord(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

# ================= RETURN RECORD =================
files["model/ReturnRecord.java"] = """package com.tlu.Hybird_Library_SE302.model;
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
}"""

files["repository/IReturnRecordRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.ReturnRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IReturnRecordRepository extends JpaRepository<ReturnRecord, Integer> {
}"""

files["dto/req/CreateReturnRecordReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateReturnRecordReq {
    private Integer borrowId;
    private LocalDateTime returnDate;
    private Integer returnDelayDays;
    private BigDecimal fineAmount;
    private ApprovalStatus approvalStatus;
    private Integer damageLevelId;
    private Boolean isLost;
    private ReturnMethod returnMethod;
}"""

files["dto/req/UpdateReturnRecordReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
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
}"""

files["dto/resp/ReturnRecordResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
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
}"""

files["service/core/intf/IReturnRecordService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.ReturnRecordResp;
import java.util.List;
public interface IReturnRecordService {
    List<ReturnRecordResp> getAllReturnRecords();
    ReturnRecordResp getReturnRecordById(int id);
    ReturnRecordResp createReturnRecord(CreateReturnRecordReq request);
    ReturnRecordResp updateReturnRecord(int id, UpdateReturnRecordReq request);
    void deleteReturnRecord(int id);
}"""

files["service/core/impl/ReturnRecordService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.ReturnRecordResp;
import com.tlu.Hybird_Library_SE302.model.ReturnRecord;
import com.tlu.Hybird_Library_SE302.model.BorrowRecord;
import com.tlu.Hybird_Library_SE302.model.DamageLevel;
import com.tlu.Hybird_Library_SE302.repository.IReturnRecordRepository;
import com.tlu.Hybird_Library_SE302.repository.IBorrowRecordRepository;
import com.tlu.Hybird_Library_SE302.repository.IDamageLevelRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IReturnRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
@Service
@RequiredArgsConstructor
public class ReturnRecordService implements IReturnRecordService {
    private final IReturnRecordRepository iReturnRecordRepository;
    private final IBorrowRecordRepository iBorrowRecordRepository;
    private final IDamageLevelRepository iDamageLevelRepository;
    
    @Override
    public List<ReturnRecordResp> getAllReturnRecords() {
        return iReturnRecordRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public ReturnRecordResp getReturnRecordById(int id) {
        ReturnRecord record = iReturnRecordRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu trả!"));
        return mapToResp(record);
    }
    @Override
    public ReturnRecordResp createReturnRecord(CreateReturnRecordReq request) {
        BorrowRecord borrowRecord = iBorrowRecordRepository.findById(request.getBorrowId()).orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu mượn!"));
        DamageLevel damageLevel = null;
        if(request.getDamageLevelId() != null) {
            damageLevel = iDamageLevelRepository.findById(request.getDamageLevelId()).orElse(null);
        }
        
        ReturnRecord record = ReturnRecord.builder()
            .borrowRecord(borrowRecord)
            .returnDate(request.getReturnDate())
            .returnDelayDays(request.getReturnDelayDays() != null ? request.getReturnDelayDays() : 0)
            .fineAmount(request.getFineAmount() != null ? request.getFineAmount() : BigDecimal.ZERO)
            .approvalStatus(request.getApprovalStatus() != null ? request.getApprovalStatus() : com.tlu.Hybird_Library_SE302.model.constants.ApprovalStatus.PENDING)
            .damageLevel(damageLevel)
            .isLost(request.getIsLost() != null ? request.getIsLost() : false)
            .returnMethod(request.getReturnMethod() != null ? request.getReturnMethod() : com.tlu.Hybird_Library_SE302.model.constants.ReturnMethod.LIBRARY_RETURN)
            .build();
        return mapToResp(iReturnRecordRepository.save(record));
    }
    @Override
    public ReturnRecordResp updateReturnRecord(int id, UpdateReturnRecordReq request) {
        ReturnRecord record = iReturnRecordRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu trả!"));
        if(request.getDamageLevelId() != null) {
            DamageLevel damageLevel = iDamageLevelRepository.findById(request.getDamageLevelId()).orElse(null);
            record.setDamageLevel(damageLevel);
        }
        if(request.getReturnDelayDays() != null) record.setReturnDelayDays(request.getReturnDelayDays());
        if(request.getFineAmount() != null) record.setFineAmount(request.getFineAmount());
        if(request.getApprovalStatus() != null) record.setApprovalStatus(request.getApprovalStatus());
        if(request.getIsLost() != null) record.setIsLost(request.getIsLost());
        if(request.getReturnMethod() != null) record.setReturnMethod(request.getReturnMethod());
        return mapToResp(iReturnRecordRepository.save(record));
    }
    @Override
    public void deleteReturnRecord(int id) {
        ReturnRecord record = iReturnRecordRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu trả!"));
        iReturnRecordRepository.delete(record);
    }
    private ReturnRecordResp mapToResp(ReturnRecord record) {
        return ReturnRecordResp.builder()
            .id(record.getId())
            .borrowId(record.getBorrowRecord() != null ? record.getBorrowRecord().getId() : null)
            .returnDate(record.getReturnDate())
            .returnDelayDays(record.getReturnDelayDays())
            .fineAmount(record.getFineAmount())
            .approvalStatus(record.getApprovalStatus())
            .damageLevelId(record.getDamageLevel() != null ? record.getDamageLevel().getId() : null)
            .isLost(record.getIsLost())
            .returnMethod(record.getReturnMethod())
            .build();
    }
}"""

files["controller/ReturnRecordController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IReturnRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/return-records")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReturnRecordController {
    private final IReturnRecordService iReturnRecordService;
    @GetMapping
    public ResponseEntity<?> getAllReturnRecords() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iReturnRecordService.getAllReturnRecords()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getReturnRecordById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iReturnRecordService.getReturnRecordById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createReturnRecord(@RequestBody CreateReturnRecordReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iReturnRecordService.createReturnRecord(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReturnRecord(@PathVariable int id, @RequestBody UpdateReturnRecordReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iReturnRecordService.updateReturnRecord(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReturnRecord(@PathVariable int id) {
        iReturnRecordService.deleteReturnRecord(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

# ================= SHIPMENT =================
files["model/Shipment.java"] = """package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "shipments")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Shipment extends BaseIdObject {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "borrow_record_id", unique = true)
    private BorrowRecord borrowRecord;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "return_record_id", unique = true)
    private ReturnRecord returnRecord;

    @Column(name = "tracking_code", length = 100)
    private String trackingCode;

    @Column(name = "shipping_fee")
    @Builder.Default
    private BigDecimal shippingFee = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "shipment_status")
    @Builder.Default
    private ShipmentStatus shipmentStatus = ShipmentStatus.WAITING_CONFIRMATION;

    @Column(name = "shipped_at")
    private LocalDateTime shippedAt;

    @Column(name = "delivered_at")
    private LocalDateTime deliveredAt;
}"""

files["repository/IShipmentRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IShipmentRepository extends JpaRepository<Shipment, Integer> {
}"""

files["dto/req/CreateShipmentReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateShipmentReq {
    private Integer borrowRecordId;
    private Integer returnRecordId;
    private String trackingCode;
    private BigDecimal shippingFee;
    private ShipmentStatus shipmentStatus;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
}"""

files["dto/req/UpdateShipmentReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateShipmentReq {
    private String trackingCode;
    private BigDecimal shippingFee;
    private ShipmentStatus shipmentStatus;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
}"""

files["dto/resp/ShipmentResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentResp {
    private Integer id;
    private Integer borrowRecordId;
    private Integer returnRecordId;
    private String trackingCode;
    private BigDecimal shippingFee;
    private ShipmentStatus shipmentStatus;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
}"""

files["service/core/intf/IShipmentService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.ShipmentResp;
import java.util.List;
public interface IShipmentService {
    List<ShipmentResp> getAllShipments();
    ShipmentResp getShipmentById(int id);
    ShipmentResp createShipment(CreateShipmentReq request);
    ShipmentResp updateShipment(int id, UpdateShipmentReq request);
    void deleteShipment(int id);
}"""

files["service/core/impl/ShipmentService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.ShipmentResp;
import com.tlu.Hybird_Library_SE302.model.Shipment;
import com.tlu.Hybird_Library_SE302.model.BorrowRecord;
import com.tlu.Hybird_Library_SE302.model.ReturnRecord;
import com.tlu.Hybird_Library_SE302.repository.IShipmentRepository;
import com.tlu.Hybird_Library_SE302.repository.IBorrowRecordRepository;
import com.tlu.Hybird_Library_SE302.repository.IReturnRecordRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
@Service
@RequiredArgsConstructor
public class ShipmentService implements IShipmentService {
    private final IShipmentRepository iShipmentRepository;
    private final IBorrowRecordRepository iBorrowRecordRepository;
    private final IReturnRecordRepository iReturnRecordRepository;
    
    @Override
    public List<ShipmentResp> getAllShipments() {
        return iShipmentRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public ShipmentResp getShipmentById(int id) {
        Shipment record = iShipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy đơn vận chuyển!"));
        return mapToResp(record);
    }
    @Override
    public ShipmentResp createShipment(CreateShipmentReq request) {
        BorrowRecord borrowRecord = request.getBorrowRecordId() != null ? iBorrowRecordRepository.findById(request.getBorrowRecordId()).orElse(null) : null;
        ReturnRecord returnRecord = request.getReturnRecordId() != null ? iReturnRecordRepository.findById(request.getReturnRecordId()).orElse(null) : null;
        
        Shipment record = Shipment.builder()
            .borrowRecord(borrowRecord)
            .returnRecord(returnRecord)
            .trackingCode(request.getTrackingCode())
            .shippingFee(request.getShippingFee() != null ? request.getShippingFee() : BigDecimal.ZERO)
            .shipmentStatus(request.getShipmentStatus() != null ? request.getShipmentStatus() : com.tlu.Hybird_Library_SE302.model.constants.ShipmentStatus.WAITING_CONFIRMATION)
            .shippedAt(request.getShippedAt())
            .deliveredAt(request.getDeliveredAt())
            .build();
        return mapToResp(iShipmentRepository.save(record));
    }
    @Override
    public ShipmentResp updateShipment(int id, UpdateShipmentReq request) {
        Shipment record = iShipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy đơn vận chuyển!"));
        if(request.getTrackingCode() != null) record.setTrackingCode(request.getTrackingCode());
        if(request.getShippingFee() != null) record.setShippingFee(request.getShippingFee());
        if(request.getShipmentStatus() != null) record.setShipmentStatus(request.getShipmentStatus());
        if(request.getShippedAt() != null) record.setShippedAt(request.getShippedAt());
        if(request.getDeliveredAt() != null) record.setDeliveredAt(request.getDeliveredAt());
        return mapToResp(iShipmentRepository.save(record));
    }
    @Override
    public void deleteShipment(int id) {
        Shipment record = iShipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy đơn vận chuyển!"));
        iShipmentRepository.delete(record);
    }
    private ShipmentResp mapToResp(Shipment record) {
        return ShipmentResp.builder()
            .id(record.getId())
            .borrowRecordId(record.getBorrowRecord() != null ? record.getBorrowRecord().getId() : null)
            .returnRecordId(record.getReturnRecord() != null ? record.getReturnRecord().getId() : null)
            .trackingCode(record.getTrackingCode())
            .shippingFee(record.getShippingFee())
            .shipmentStatus(record.getShipmentStatus())
            .shippedAt(record.getShippedAt())
            .deliveredAt(record.getDeliveredAt())
            .build();
    }
}"""

files["controller/ShipmentController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/shipments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ShipmentController {
    private final IShipmentService iShipmentService;
    @GetMapping
    public ResponseEntity<?> getAllShipments() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iShipmentService.getAllShipments()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getShipmentById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iShipmentService.getShipmentById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createShipment(@RequestBody CreateShipmentReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iShipmentService.createShipment(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateShipment(@PathVariable int id, @RequestBody UpdateShipmentReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iShipmentService.updateShipment(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShipment(@PathVariable int id) {
        iShipmentService.deleteShipment(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

for file_path, content in files.items():
    full_path = os.path.join(base_dir, file_path)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Generated {len(files)} files successfully.")
