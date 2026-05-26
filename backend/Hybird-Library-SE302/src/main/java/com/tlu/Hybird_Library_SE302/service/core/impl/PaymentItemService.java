package com.tlu.Hybird_Library_SE302.service.core.impl;
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
}