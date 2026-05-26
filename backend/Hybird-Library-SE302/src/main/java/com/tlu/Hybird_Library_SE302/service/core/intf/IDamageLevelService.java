package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.DamageLevelResp;
import java.util.List;
public interface IDamageLevelService {
    List<DamageLevelResp> getAllDamageLevels();
    DamageLevelResp getDamageLevelById(int id);
    DamageLevelResp createDamageLevel(CreateDamageLevelReq request);
    DamageLevelResp updateDamageLevel(int id, UpdateDamageLevelReq request);
    void deleteDamageLevel(int id);
}