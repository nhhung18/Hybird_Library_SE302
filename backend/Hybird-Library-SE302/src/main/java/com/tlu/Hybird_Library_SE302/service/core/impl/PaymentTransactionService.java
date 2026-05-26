package com.tlu.Hybird_Library_SE302.service.core.impl;
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
}