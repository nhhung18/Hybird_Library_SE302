package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CategoryResp;
import com.tlu.Hybird_Library_SE302.model.Category;
import com.tlu.Hybird_Library_SE302.repository.ICategoryRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final ICategoryRepository iCategoryRepository;
    @Override
    public List<CategoryResp> getAllCategories() {
        return iCategoryRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public CategoryResp getCategoryById(int id) {
        Category category = iCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục!"));
        return mapToResp(category);
    }
    @Override
    public CategoryResp createCategory(CreateCategoryReq request) {
        if(iCategoryRepository.existsByCategoryName(request.getCategoryName())) throw new RuntimeException("Tên danh mục đã tồn tại!");
        Category category = Category.builder().categoryName(request.getCategoryName()).build();
        return mapToResp(iCategoryRepository.save(category));
    }
    @Override
    public CategoryResp updateCategory(int id, UpdateCategoryReq request) {
        Category category = iCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục!"));
        if(request.getCategoryName() != null && !request.getCategoryName().equals(category.getCategoryName())) {
            if(iCategoryRepository.existsByCategoryName(request.getCategoryName())) throw new RuntimeException("Tên danh mục đã tồn tại!");
            category.setCategoryName(request.getCategoryName());
        }
        return mapToResp(iCategoryRepository.save(category));
    }
    @Override
    public void deleteCategory(int id) {
        Category category = iCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục!"));
        iCategoryRepository.delete(category);
    }
    private CategoryResp mapToResp(Category category) {
        return CategoryResp.builder().id(category.getId()).categoryName(category.getCategoryName()).build();
    }
}