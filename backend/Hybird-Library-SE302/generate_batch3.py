import os

base_dir = "/home/hungnguyen/Workspace/University/K2-2526/SE302/mini_project/Hybird_Library_SE302/backend/Hybird-Library-SE302/src/main/java/com/tlu/Hybird_Library_SE302"

files = {}

# ================= ENUMS =================
files["model/constants/PaymentStatus.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum PaymentStatus { UNPAID, PAID, REFUNDED, FAILED, PENDING }"""

files["model/constants/PaymentMethod.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum PaymentMethod { CASH, BANKING }"""

files["model/constants/PaymentItemType.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum PaymentItemType { SHIPMENT, LATE_PENALTY, DAMAGED_BOOK, LOST_BOOK, MEMBERSHIP }"""

# ================= PAYMENT TRANSACTION =================
files["model/PaymentTransaction.java"] = """package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "payment_transactions")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaymentTransaction extends BaseIdObject {
    @Column(name = "transaction_code", length = 255, nullable = false, unique = true)
    private String transactionCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @Builder.Default
    private PaymentStatus status = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;
}"""

files["repository/IPaymentTransactionRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IPaymentTransactionRepository extends JpaRepository<PaymentTransaction, Integer> {
    boolean existsByTransactionCode(String transactionCode);
}"""

files["dto/req/CreatePaymentTransactionReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePaymentTransactionReq {
    private String transactionCode;
    private Integer userId;
    private BigDecimal amount;
    private PaymentStatus status;
    private PaymentMethod paymentMethod;
    private LocalDateTime paidAt;
}"""

files["dto/req/UpdatePaymentTransactionReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePaymentTransactionReq {
    private String transactionCode;
    private BigDecimal amount;
    private PaymentStatus status;
    private PaymentMethod paymentMethod;
    private LocalDateTime paidAt;
}"""

files["dto/resp/PaymentTransactionResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentTransactionResp {
    private Integer id;
    private String transactionCode;
    private Integer userId;
    private BigDecimal amount;
    private PaymentStatus status;
    private PaymentMethod paymentMethod;
    private LocalDateTime paidAt;
}"""

files["service/core/intf/IPaymentTransactionService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.PaymentTransactionResp;
import java.util.List;
public interface IPaymentTransactionService {
    List<PaymentTransactionResp> getAllPaymentTransactions();
    PaymentTransactionResp getPaymentTransactionById(int id);
    PaymentTransactionResp createPaymentTransaction(CreatePaymentTransactionReq request);
    PaymentTransactionResp updatePaymentTransaction(int id, UpdatePaymentTransactionReq request);
    void deletePaymentTransaction(int id);
}"""

files["service/core/impl/PaymentTransactionService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.PaymentTransactionResp;
import com.tlu.Hybird_Library_SE302.model.PaymentTransaction;
import com.tlu.Hybird_Library_SE302.model.User;
import com.tlu.Hybird_Library_SE302.repository.IPaymentTransactionRepository;
import com.tlu.Hybird_Library_SE302.repository.IUserRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IPaymentTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class PaymentTransactionService implements IPaymentTransactionService {
    private final IPaymentTransactionRepository iPaymentTransactionRepository;
    private final IUserRepository iUserRepository;
    @Override
    public List<PaymentTransactionResp> getAllPaymentTransactions() {
        return iPaymentTransactionRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public PaymentTransactionResp getPaymentTransactionById(int id) {
        PaymentTransaction pt = iPaymentTransactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch!"));
        return mapToResp(pt);
    }
    @Override
    public PaymentTransactionResp createPaymentTransaction(CreatePaymentTransactionReq request) {
        if(iPaymentTransactionRepository.existsByTransactionCode(request.getTransactionCode())) throw new RuntimeException("Mã giao dịch đã tồn tại!");
        User user = iUserRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("Không tìm thấy user!"));
        PaymentTransaction pt = PaymentTransaction.builder()
            .transactionCode(request.getTransactionCode())
            .user(user)
            .amount(request.getAmount())
            .status(request.getStatus() != null ? request.getStatus() : com.tlu.Hybird_Library_SE302.model.constants.PaymentStatus.PENDING)
            .paymentMethod(request.getPaymentMethod())
            .paidAt(request.getPaidAt())
            .build();
        return mapToResp(iPaymentTransactionRepository.save(pt));
    }
    @Override
    public PaymentTransactionResp updatePaymentTransaction(int id, UpdatePaymentTransactionReq request) {
        PaymentTransaction pt = iPaymentTransactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch!"));
        if(request.getTransactionCode() != null && !request.getTransactionCode().equals(pt.getTransactionCode())) {
            if(iPaymentTransactionRepository.existsByTransactionCode(request.getTransactionCode())) throw new RuntimeException("Mã giao dịch đã tồn tại!");
            pt.setTransactionCode(request.getTransactionCode());
        }
        if(request.getAmount() != null) pt.setAmount(request.getAmount());
        if(request.getStatus() != null) pt.setStatus(request.getStatus());
        if(request.getPaymentMethod() != null) pt.setPaymentMethod(request.getPaymentMethod());
        if(request.getPaidAt() != null) pt.setPaidAt(request.getPaidAt());
        return mapToResp(iPaymentTransactionRepository.save(pt));
    }
    @Override
    public void deletePaymentTransaction(int id) {
        PaymentTransaction pt = iPaymentTransactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch!"));
        iPaymentTransactionRepository.delete(pt);
    }
    private PaymentTransactionResp mapToResp(PaymentTransaction pt) {
        return PaymentTransactionResp.builder()
            .id(pt.getId())
            .transactionCode(pt.getTransactionCode())
            .userId(pt.getUser() != null ? pt.getUser().getId() : null)
            .amount(pt.getAmount())
            .status(pt.getStatus())
            .paymentMethod(pt.getPaymentMethod())
            .paidAt(pt.getPaidAt())
            .build();
    }
}"""

files["controller/PaymentTransactionController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IPaymentTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/payment-transactions")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentTransactionController {
    private final IPaymentTransactionService iPaymentTransactionService;
    @GetMapping
    public ResponseEntity<?> getAllPaymentTransactions() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iPaymentTransactionService.getAllPaymentTransactions()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPaymentTransactionById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iPaymentTransactionService.getPaymentTransactionById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createPaymentTransaction(@RequestBody CreatePaymentTransactionReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iPaymentTransactionService.createPaymentTransaction(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePaymentTransaction(@PathVariable int id, @RequestBody UpdatePaymentTransactionReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iPaymentTransactionService.updatePaymentTransaction(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePaymentTransaction(@PathVariable int id) {
        iPaymentTransactionService.deletePaymentTransaction(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

# ================= PAYMENT ITEM =================
files["model/PaymentItem.java"] = """package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
@Entity
@Table(name = "payment_items")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaymentItem extends BaseIdObject {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_transaction_id", nullable = false)
    private PaymentTransaction paymentTransaction;

    @Column(name = "cost_id")
    private Integer costId;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_type")
    private PaymentItemType itemType;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "description", length = 255)
    private String description;
}"""

files["repository/IPaymentItemRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.PaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IPaymentItemRepository extends JpaRepository<PaymentItem, Integer> {
}"""

files["dto/req/CreatePaymentItemReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePaymentItemReq {
    private Integer paymentTransactionId;
    private Integer costId;
    private PaymentItemType itemType;
    private BigDecimal amount;
    private String description;
}"""

files["dto/req/UpdatePaymentItemReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePaymentItemReq {
    private Integer costId;
    private PaymentItemType itemType;
    private BigDecimal amount;
    private String description;
}"""

files["dto/resp/PaymentItemResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.*;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentItemResp {
    private Integer id;
    private Integer paymentTransactionId;
    private Integer costId;
    private PaymentItemType itemType;
    private BigDecimal amount;
    private String description;
}"""

files["service/core/intf/IPaymentItemService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.PaymentItemResp;
import java.util.List;
public interface IPaymentItemService {
    List<PaymentItemResp> getAllPaymentItems();
    PaymentItemResp getPaymentItemById(int id);
    PaymentItemResp createPaymentItem(CreatePaymentItemReq request);
    PaymentItemResp updatePaymentItem(int id, UpdatePaymentItemReq request);
    void deletePaymentItem(int id);
}"""

files["service/core/impl/PaymentItemService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.PaymentItemResp;
import com.tlu.Hybird_Library_SE302.model.PaymentItem;
import com.tlu.Hybird_Library_SE302.model.PaymentTransaction;
import com.tlu.Hybird_Library_SE302.repository.IPaymentItemRepository;
import com.tlu.Hybird_Library_SE302.repository.IPaymentTransactionRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IPaymentItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class PaymentItemService implements IPaymentItemService {
    private final IPaymentItemRepository iPaymentItemRepository;
    private final IPaymentTransactionRepository iPaymentTransactionRepository;
    @Override
    public List<PaymentItemResp> getAllPaymentItems() {
        return iPaymentItemRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public PaymentItemResp getPaymentItemById(int id) {
        PaymentItem item = iPaymentItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy chi tiết thanh toán!"));
        return mapToResp(item);
    }
    @Override
    public PaymentItemResp createPaymentItem(CreatePaymentItemReq request) {
        PaymentTransaction pt = iPaymentTransactionRepository.findById(request.getPaymentTransactionId()).orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch!"));
        PaymentItem item = PaymentItem.builder()
            .paymentTransaction(pt)
            .costId(request.getCostId())
            .itemType(request.getItemType())
            .amount(request.getAmount())
            .description(request.getDescription())
            .build();
        return mapToResp(iPaymentItemRepository.save(item));
    }
    @Override
    public PaymentItemResp updatePaymentItem(int id, UpdatePaymentItemReq request) {
        PaymentItem item = iPaymentItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy chi tiết thanh toán!"));
        if(request.getCostId() != null) item.setCostId(request.getCostId());
        if(request.getItemType() != null) item.setItemType(request.getItemType());
        if(request.getAmount() != null) item.setAmount(request.getAmount());
        if(request.getDescription() != null) item.setDescription(request.getDescription());
        return mapToResp(iPaymentItemRepository.save(item));
    }
    @Override
    public void deletePaymentItem(int id) {
        PaymentItem item = iPaymentItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy chi tiết thanh toán!"));
        iPaymentItemRepository.delete(item);
    }
    private PaymentItemResp mapToResp(PaymentItem item) {
        return PaymentItemResp.builder()
            .id(item.getId())
            .paymentTransactionId(item.getPaymentTransaction() != null ? item.getPaymentTransaction().getId() : null)
            .costId(item.getCostId())
            .itemType(item.getItemType())
            .amount(item.getAmount())
            .description(item.getDescription())
            .build();
    }
}"""

files["controller/PaymentItemController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IPaymentItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/payment-items")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentItemController {
    private final IPaymentItemService iPaymentItemService;
    @GetMapping
    public ResponseEntity<?> getAllPaymentItems() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iPaymentItemService.getAllPaymentItems()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPaymentItemById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iPaymentItemService.getPaymentItemById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createPaymentItem(@RequestBody CreatePaymentItemReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iPaymentItemService.createPaymentItem(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePaymentItem(@PathVariable int id, @RequestBody UpdatePaymentItemReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iPaymentItemService.updatePaymentItem(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePaymentItem(@PathVariable int id) {
        iPaymentItemService.deletePaymentItem(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

# ================= CART =================
files["model/Cart.java"] = """package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "carts")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Cart extends BaseIdObject {
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
}"""

files["repository/ICartRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface ICartRepository extends JpaRepository<Cart, Integer> {
    boolean existsByUserId(Integer userId);
    Optional<Cart> findByUserId(Integer userId);
}"""

files["dto/req/CreateCartReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCartReq {
    private Integer userId;
}"""

files["dto/req/UpdateCartReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCartReq {
    private Integer userId;
}"""

files["dto/resp/CartResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResp {
    private Integer id;
    private Integer userId;
}"""

files["service/core/intf/ICartService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CartResp;
import java.util.List;
public interface ICartService {
    List<CartResp> getAllCarts();
    CartResp getCartById(int id);
    CartResp getCartByUserId(int userId);
    CartResp createCart(CreateCartReq request);
    CartResp updateCart(int id, UpdateCartReq request);
    void deleteCart(int id);
}"""

files["service/core/impl/CartService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CartResp;
import com.tlu.Hybird_Library_SE302.model.Cart;
import com.tlu.Hybird_Library_SE302.model.User;
import com.tlu.Hybird_Library_SE302.repository.ICartRepository;
import com.tlu.Hybird_Library_SE302.repository.IUserRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CartService implements ICartService {
    private final ICartRepository iCartRepository;
    private final IUserRepository iUserRepository;
    @Override
    public List<CartResp> getAllCarts() {
        return iCartRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public CartResp getCartById(int id) {
        Cart cart = iCartRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng!"));
        return mapToResp(cart);
    }
    @Override
    public CartResp getCartByUserId(int userId) {
        Cart cart = iCartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng của user này!"));
        return mapToResp(cart);
    }
    @Override
    public CartResp createCart(CreateCartReq request) {
        if(iCartRepository.existsByUserId(request.getUserId())) throw new RuntimeException("User đã có giỏ hàng!");
        User user = iUserRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("Không tìm thấy user!"));
        Cart cart = Cart.builder().user(user).build();
        return mapToResp(iCartRepository.save(cart));
    }
    @Override
    public CartResp updateCart(int id, UpdateCartReq request) {
        Cart cart = iCartRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng!"));
        if(request.getUserId() != null && !request.getUserId().equals(cart.getUser().getId())) {
            if(iCartRepository.existsByUserId(request.getUserId())) throw new RuntimeException("User đã có giỏ hàng!");
            User user = iUserRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("Không tìm thấy user!"));
            cart.setUser(user);
        }
        return mapToResp(iCartRepository.save(cart));
    }
    @Override
    public void deleteCart(int id) {
        Cart cart = iCartRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng!"));
        iCartRepository.delete(cart);
    }
    private CartResp mapToResp(Cart cart) {
        return CartResp.builder()
            .id(cart.getId())
            .userId(cart.getUser() != null ? cart.getUser().getId() : null)
            .build();
    }
}"""

files["controller/CartController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/carts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CartController {
    private final ICartService iCartService;
    @GetMapping
    public ResponseEntity<?> getAllCarts() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartService.getAllCarts()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCartById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartService.getCartById(id)).build());
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getCartByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartService.getCartByUserId(userId)).build());
    }
    @PostMapping
    public ResponseEntity<?> createCart(@RequestBody CreateCartReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iCartService.createCart(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCart(@PathVariable int id, @RequestBody UpdateCartReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartService.updateCart(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCart(@PathVariable int id) {
        iCartService.deleteCart(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

# ================= CART ITEM =================
files["model/CartItem.java"] = """package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "cart_items")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CartItem extends BaseIdObject {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Enumerated(EnumType.STRING)
    @Column(name = "book_type", nullable = false)
    private BookType bookType;
}"""

files["repository/ICartItemRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ICartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByCartId(Integer cartId);
}"""

files["dto/req/CreateCartItemReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCartItemReq {
    private Integer cartId;
    private Integer bookId;
    private BookType bookType;
}"""

files["dto/req/UpdateCartItemReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCartItemReq {
    private Integer bookId;
    private BookType bookType;
}"""

files["dto/resp/CartItemResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResp {
    private Integer id;
    private Integer cartId;
    private Integer bookId;
    private BookType bookType;
}"""

files["service/core/intf/ICartItemService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CartItemResp;
import java.util.List;
public interface ICartItemService {
    List<CartItemResp> getAllCartItems();
    CartItemResp getCartItemById(int id);
    List<CartItemResp> getCartItemsByCartId(int cartId);
    CartItemResp createCartItem(CreateCartItemReq request);
    CartItemResp updateCartItem(int id, UpdateCartItemReq request);
    void deleteCartItem(int id);
}"""

files["service/core/impl/CartItemService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CartItemResp;
import com.tlu.Hybird_Library_SE302.model.CartItem;
import com.tlu.Hybird_Library_SE302.model.Cart;
import com.tlu.Hybird_Library_SE302.model.Book;
import com.tlu.Hybird_Library_SE302.repository.ICartItemRepository;
import com.tlu.Hybird_Library_SE302.repository.ICartRepository;
import com.tlu.Hybird_Library_SE302.repository.IBookRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService {
    private final ICartItemRepository iCartItemRepository;
    private final ICartRepository iCartRepository;
    private final IBookRepository iBookRepository;
    @Override
    public List<CartItemResp> getAllCartItems() {
        return iCartItemRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public CartItemResp getCartItemById(int id) {
        CartItem item = iCartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy item!"));
        return mapToResp(item);
    }
    @Override
    public List<CartItemResp> getCartItemsByCartId(int cartId) {
        return iCartItemRepository.findByCartId(cartId).stream().map(this::mapToResp).toList();
    }
    @Override
    public CartItemResp createCartItem(CreateCartItemReq request) {
        Cart cart = iCartRepository.findById(request.getCartId()).orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng!"));
        Book book = iBookRepository.findById(request.getBookId()).orElseThrow(() -> new RuntimeException("Không tìm thấy sách!"));
        CartItem item = CartItem.builder()
            .cart(cart)
            .book(book)
            .bookType(request.getBookType())
            .build();
        return mapToResp(iCartItemRepository.save(item));
    }
    @Override
    public CartItemResp updateCartItem(int id, UpdateCartItemReq request) {
        CartItem item = iCartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy item!"));
        if(request.getBookId() != null) {
            Book book = iBookRepository.findById(request.getBookId()).orElseThrow(() -> new RuntimeException("Không tìm thấy sách!"));
            item.setBook(book);
        }
        if(request.getBookType() != null) item.setBookType(request.getBookType());
        return mapToResp(iCartItemRepository.save(item));
    }
    @Override
    public void deleteCartItem(int id) {
        CartItem item = iCartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy item!"));
        iCartItemRepository.delete(item);
    }
    private CartItemResp mapToResp(CartItem item) {
        return CartItemResp.builder()
            .id(item.getId())
            .cartId(item.getCart() != null ? item.getCart().getId() : null)
            .bookId(item.getBook() != null ? item.getBook().getId() : null)
            .bookType(item.getBookType())
            .build();
    }
}"""

files["controller/CartItemController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/cart-items")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CartItemController {
    private final ICartItemService iCartItemService;
    @GetMapping
    public ResponseEntity<?> getAllCartItems() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartItemService.getAllCartItems()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCartItemById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartItemService.getCartItemById(id)).build());
    }
    @GetMapping("/cart/{cartId}")
    public ResponseEntity<?> getCartItemsByCartId(@PathVariable int cartId) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartItemService.getCartItemsByCartId(cartId)).build());
    }
    @PostMapping
    public ResponseEntity<?> createCartItem(@RequestBody CreateCartItemReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iCartItemService.createCartItem(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCartItem(@PathVariable int id, @RequestBody UpdateCartItemReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCartItemService.updateCartItem(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable int id) {
        iCartItemService.deleteCartItem(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

for file_path, content in files.items():
    full_path = os.path.join(base_dir, file_path)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Generated {len(files)} files successfully.")
