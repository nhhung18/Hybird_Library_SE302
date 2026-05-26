package com.tlu.Hybird_Library_SE302.service.core.impl;
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
}