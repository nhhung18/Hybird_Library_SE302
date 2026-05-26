package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.PaymentItemResp;
import java.util.List;
public interface IPaymentItemService {
    List<PaymentItemResp> getAllPaymentItems();
    PaymentItemResp getPaymentItemById(int id);
    PaymentItemResp createPaymentItem(CreatePaymentItemReq request);
    PaymentItemResp updatePaymentItem(int id, UpdatePaymentItemReq request);
    void deletePaymentItem(int id);
}