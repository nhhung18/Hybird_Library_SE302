package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.BorrowRecordResp;
import java.util.List;
public interface IBorrowRecordService {
    List<BorrowRecordResp> getAllBorrowRecords();
    BorrowRecordResp getBorrowRecordById(int id);
    BorrowRecordResp createBorrowRecord(CreateBorrowRecordReq request);
    BorrowRecordResp updateBorrowRecord(int id, UpdateBorrowRecordReq request);
    void deleteBorrowRecord(int id);
}