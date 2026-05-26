package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.ReturnRecordResp;
import java.util.List;
public interface IReturnRecordService {
    List<ReturnRecordResp> getAllReturnRecords();
    ReturnRecordResp getReturnRecordById(int id);
    ReturnRecordResp createReturnRecord(CreateReturnRecordReq request);
    ReturnRecordResp updateReturnRecord(int id, UpdateReturnRecordReq request);
    void deleteReturnRecord(int id);
}