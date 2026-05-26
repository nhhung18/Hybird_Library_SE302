package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.MembershipPlanResp;
import com.tlu.Hybird_Library_SE302.model.MembershipPlan;
import com.tlu.Hybird_Library_SE302.repository.IMembershipPlanRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IMembershipPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class MembershipPlanService implements IMembershipPlanService {
    private final IMembershipPlanRepository iMembershipPlanRepository;
    @Override
    public List<MembershipPlanResp> getAllMembershipPlans() {
        return iMembershipPlanRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public MembershipPlanResp getMembershipPlanById(int id) {
        MembershipPlan plan = iMembershipPlanRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy gói hội viên!"));
        return mapToResp(plan);
    }
    @Override
    public MembershipPlanResp createMembershipPlan(CreateMembershipPlanReq request) {
        if(iMembershipPlanRepository.existsByPlanName(request.getPlanName())) throw new RuntimeException("Tên gói hội viên đã tồn tại!");
        MembershipPlan plan = MembershipPlan.builder()
            .planName(request.getPlanName())
            .price(request.getPrice())
            .durationDays(request.getDurationDays())
            .maxBorrowBooks(request.getMaxBorrowBooks())
            .description(request.getDescription())
            .isActive(request.getIsActive() != null ? request.getIsActive() : true)
            .build();
        return mapToResp(iMembershipPlanRepository.save(plan));
    }
    @Override
    public MembershipPlanResp updateMembershipPlan(int id, UpdateMembershipPlanReq request) {
        MembershipPlan plan = iMembershipPlanRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy gói hội viên!"));
        if(request.getPlanName() != null && !request.getPlanName().equals(plan.getPlanName())) {
            if(iMembershipPlanRepository.existsByPlanName(request.getPlanName())) throw new RuntimeException("Tên gói hội viên đã tồn tại!");
            plan.setPlanName(request.getPlanName());
        }
        if(request.getPrice() != null) plan.setPrice(request.getPrice());
        if(request.getDurationDays() != null) plan.setDurationDays(request.getDurationDays());
        if(request.getMaxBorrowBooks() != null) plan.setMaxBorrowBooks(request.getMaxBorrowBooks());
        if(request.getDescription() != null) plan.setDescription(request.getDescription());
        if(request.getIsActive() != null) plan.setIsActive(request.getIsActive());
        return mapToResp(iMembershipPlanRepository.save(plan));
    }
    @Override
    public void deleteMembershipPlan(int id) {
        MembershipPlan plan = iMembershipPlanRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy gói hội viên!"));
        iMembershipPlanRepository.delete(plan);
    }
    private MembershipPlanResp mapToResp(MembershipPlan plan) {
        return MembershipPlanResp.builder().id(plan.getId()).planName(plan.getPlanName()).price(plan.getPrice()).durationDays(plan.getDurationDays()).maxBorrowBooks(plan.getMaxBorrowBooks()).description(plan.getDescription()).isActive(plan.getIsActive()).build();
    }
}