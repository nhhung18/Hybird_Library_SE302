package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CategoryResp;
import java.util.List;
public interface ICategoryService {
    List<CategoryResp> getAllCategories();
    CategoryResp getCategoryById(int id);
    CategoryResp createCategory(CreateCategoryReq request);
    CategoryResp updateCategory(int id, UpdateCategoryReq request);
    void deleteCategory(int id);
}