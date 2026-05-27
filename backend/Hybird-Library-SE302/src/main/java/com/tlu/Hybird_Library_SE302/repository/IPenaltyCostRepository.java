package com.tlu.Hybird_Library_SE302.repository;

import com.tlu.Hybird_Library_SE302.model.PenaltyCost;
import com.tlu.Hybird_Library_SE302.model.constants.PenaltyCostName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IPenaltyCostRepository extends JpaRepository<PenaltyCost, Integer> {
    boolean existsByPenaltyCostName(PenaltyCostName penaltyCostName);
    Optional<PenaltyCost> findByPenaltyCostName(PenaltyCostName penaltyCostName);

}
