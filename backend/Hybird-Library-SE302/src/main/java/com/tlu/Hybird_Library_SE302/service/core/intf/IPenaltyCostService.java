package com.tlu.Hybird_Library_SE302.service.core.intf;

import com.tlu.Hybird_Library_SE302.dto.req.CreatePenaltyCostReq;
import com.tlu.Hybird_Library_SE302.dto.req.UpdatePenaltyCostReq;
import com.tlu.Hybird_Library_SE302.dto.resp.PenaltyCostResp;

import java.util.List;

public interface IPenaltyCostService {
    List<PenaltyCostResp> getAllPenaltyCosts();
    PenaltyCostResp getPenaltyCostById(int id);
    PenaltyCostResp createPenaltyCost(CreatePenaltyCostReq request);
    PenaltyCostResp updatePenaltyCost(int id, UpdatePenaltyCostReq request);
    void deletePenaltyCost(int id);
}
