package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.ShipmentResp;
import java.util.List;
public interface IShipmentService {
    List<ShipmentResp> getAllShipments();
    ShipmentResp getShipmentById(int id);
    ShipmentResp createShipment(CreateShipmentReq request);
    ShipmentResp updateShipment(int id, UpdateShipmentReq request);
    void deleteShipment(int id);
}