package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.MembershipPlanResp;
import java.util.List;
public interface IMembershipPlanService {
    List<MembershipPlanResp> getAllMembershipPlans();
    MembershipPlanResp getMembershipPlanById(int id);
    MembershipPlanResp createMembershipPlan(CreateMembershipPlanReq request);
    MembershipPlanResp updateMembershipPlan(int id, UpdateMembershipPlanReq request);
    void deleteMembershipPlan(int id);
}