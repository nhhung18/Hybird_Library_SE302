package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IMembershipPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/membership-plans")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MembershipPlanController {
    private final IMembershipPlanService iMembershipPlanService;
    @GetMapping
    public ResponseEntity<?> getAllMembershipPlans() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iMembershipPlanService.getAllMembershipPlans()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getMembershipPlanById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iMembershipPlanService.getMembershipPlanById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createMembershipPlan(@RequestBody CreateMembershipPlanReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iMembershipPlanService.createMembershipPlan(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMembershipPlan(@PathVariable int id, @RequestBody UpdateMembershipPlanReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iMembershipPlanService.updateMembershipPlan(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMembershipPlan(@PathVariable int id) {
        iMembershipPlanService.deleteMembershipPlan(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}