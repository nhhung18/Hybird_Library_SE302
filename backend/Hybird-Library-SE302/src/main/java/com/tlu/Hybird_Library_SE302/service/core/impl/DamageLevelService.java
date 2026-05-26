package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.DamageLevelResp;
import com.tlu.Hybird_Library_SE302.model.DamageLevel;
import com.tlu.Hybird_Library_SE302.repository.IDamageLevelRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IDamageLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class DamageLevelService implements IDamageLevelService {
    private final IDamageLevelRepository iDamageLevelRepository;
    @Override
    public List<DamageLevelResp> getAllDamageLevels() {
        return iDamageLevelRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public DamageLevelResp getDamageLevelById(int id) {
        DamageLevel damageLevel = iDamageLevelRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy mức độ hư hại!"));
        return mapToResp(damageLevel);
    }
    @Override
    public DamageLevelResp createDamageLevel(CreateDamageLevelReq request) {
        if(iDamageLevelRepository.existsByLevelName(request.getLevelName())) throw new RuntimeException("Tên mức độ hư hại đã tồn tại!");
        DamageLevel damageLevel = DamageLevel.builder().levelName(request.getLevelName()).percentValue(request.getPercentValue()).description(request.getDescription()).build();
        return mapToResp(iDamageLevelRepository.save(damageLevel));
    }
    @Override
    public DamageLevelResp updateDamageLevel(int id, UpdateDamageLevelReq request) {
        DamageLevel damageLevel = iDamageLevelRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy mức độ hư hại!"));
        if(request.getLevelName() != null && !request.getLevelName().equals(damageLevel.getLevelName())) {
            if(iDamageLevelRepository.existsByLevelName(request.getLevelName())) throw new RuntimeException("Tên mức độ hư hại đã tồn tại!");
            damageLevel.setLevelName(request.getLevelName());
        }
        if(request.getPercentValue() != null) damageLevel.setPercentValue(request.getPercentValue());
        if(request.getDescription() != null) damageLevel.setDescription(request.getDescription());
        return mapToResp(iDamageLevelRepository.save(damageLevel));
    }
    @Override
    public void deleteDamageLevel(int id) {
        DamageLevel damageLevel = iDamageLevelRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy mức độ hư hại!"));
        iDamageLevelRepository.delete(damageLevel);
    }
    private DamageLevelResp mapToResp(DamageLevel damageLevel) {
        return DamageLevelResp.builder().id(damageLevel.getId()).levelName(damageLevel.getLevelName()).percentValue(damageLevel.getPercentValue()).description(damageLevel.getDescription()).build();
    }
}