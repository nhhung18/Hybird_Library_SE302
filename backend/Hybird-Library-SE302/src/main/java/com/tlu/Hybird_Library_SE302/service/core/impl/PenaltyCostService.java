package com.tlu.Hybird_Library_SE302.service.core.impl;

import com.tlu.Hybird_Library_SE302.dto.req.CreatePenaltyCostReq;
import com.tlu.Hybird_Library_SE302.dto.req.UpdatePenaltyCostReq;
import com.tlu.Hybird_Library_SE302.dto.resp.PenaltyCostResp;
import com.tlu.Hybird_Library_SE302.model.PenaltyCost;
import com.tlu.Hybird_Library_SE302.repository.IPenaltyCostRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IPenaltyCostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PenaltyCostService implements IPenaltyCostService {

    private final IPenaltyCostRepository iPenaltyCostRepository;

    @Override
    public List<PenaltyCostResp> getAllPenaltyCosts() {
        List<PenaltyCost> penaltyCosts = iPenaltyCostRepository.findAll();
        return penaltyCosts.stream().map(this::mapToPenaltyCostResp).toList();
    }

    @Override
    public PenaltyCostResp getPenaltyCostById(int id) {
        PenaltyCost penaltyCost = iPenaltyCostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phí phạt với ID: " + id));
        return mapToPenaltyCostResp(penaltyCost);
    }

    @Override
    public PenaltyCostResp createPenaltyCost(CreatePenaltyCostReq request) {
        if (iPenaltyCostRepository.existsByPenaltyCostName(request.getPenaltyCostName())) {
            throw new RuntimeException("Tên phí phạt đã tồn tại!");
        }

        PenaltyCost penaltyCost = PenaltyCost.builder()
                .penaltyCostName(request.getPenaltyCostName())
                .calculationType(request.getCalculationType())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();

        PenaltyCost created = iPenaltyCostRepository.save(penaltyCost);
        return mapToPenaltyCostResp(created);
    }

    @Override
    public PenaltyCostResp updatePenaltyCost(int id, UpdatePenaltyCostReq request) {
        PenaltyCost penaltyCost = iPenaltyCostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phí phạt với ID: " + id));

        if (request.getPenaltyCostName() != null && !request.getPenaltyCostName().equals(penaltyCost.getPenaltyCostName())) {
            if (iPenaltyCostRepository.existsByPenaltyCostName(request.getPenaltyCostName())) {
                throw new RuntimeException("Tên phí phạt đã tồn tại!");
            }
            penaltyCost.setPenaltyCostName(request.getPenaltyCostName());
        }

        if (request.getCalculationType() != null) {
            penaltyCost.setCalculationType(request.getCalculationType());
        }

        if (request.getPrice() != null) {
            penaltyCost.setPrice(request.getPrice());
        }

        if (request.getDescription() != null) {
            penaltyCost.setDescription(request.getDescription());
        }

        PenaltyCost updated = iPenaltyCostRepository.save(penaltyCost);
        return mapToPenaltyCostResp(updated);
    }

    @Override
    public void deletePenaltyCost(int id) {
        PenaltyCost penaltyCost = iPenaltyCostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phí phạt với ID: " + id));
        iPenaltyCostRepository.delete(penaltyCost);
    }

    private PenaltyCostResp mapToPenaltyCostResp(PenaltyCost penaltyCost) {
        return PenaltyCostResp.builder()
                .id(penaltyCost.getId())
                .penaltyCostName(penaltyCost.getPenaltyCostName())
                .calculationType(penaltyCost.getCalculationType())
                .price(penaltyCost.getPrice())
                .description(penaltyCost.getDescription())
                .build();
    }
}
