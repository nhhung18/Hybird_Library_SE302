package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.MembershipPlan;
import com.tlu.Hybird_Library_SE302.model.constants.MembershipPlanName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IMembershipPlanRepository extends JpaRepository<MembershipPlan, Integer> {
    boolean existsByPlanName(String planName);
}