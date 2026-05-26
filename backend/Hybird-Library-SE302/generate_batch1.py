import os

base_dir = "/home/hungnguyen/Workspace/University/K2-2526/SE302/mini_project/Hybird_Library_SE302/backend/Hybird-Library-SE302/src/main/java/com/tlu/Hybird_Library_SE302"

directories = [
    "model/constants",
    "model",
    "repository",
    "dto/req",
    "dto/resp",
    "service/core/intf",
    "service/core/impl",
    "controller"
]

for d in directories:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

files = {}

# ================= ENUMS =================
files["model/constants/BookType.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum BookType { EBOOK, PHYSICAL_BOOK, BOTH }"""

files["model/constants/BookCondition.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum BookCondition { GOOD, DAMAGED, LOST }"""

files["model/constants/MembershipPlanName.java"] = """package com.tlu.Hybird_Library_SE302.model.constants;
public enum MembershipPlanName { STANDARD, PREMIUM }"""

# ================= CATEGORY =================
files["model/Category.java"] = """package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "categories")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Category extends BaseIdObject {
    @Column(name = "category_name", length = 255, nullable = false, unique = true)
    private String categoryName;
}"""

files["repository/ICategoryRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ICategoryRepository extends JpaRepository<Category, Integer> {
    boolean existsByCategoryName(String categoryName);
}"""

files["dto/req/CreateCategoryReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCategoryReq {
    private String categoryName;
}"""

files["dto/req/UpdateCategoryReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCategoryReq {
    private String categoryName;
}"""

files["dto/resp/CategoryResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResp {
    private Integer id;
    private String categoryName;
}"""

files["service/core/intf/ICategoryService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.CategoryResp;
import java.util.List;
public interface ICategoryService {
    List<CategoryResp> getAllCategories();
    CategoryResp getCategoryById(int id);
    CategoryResp createCategory(CreateCategoryReq request);
    CategoryResp updateCategory(int id, UpdateCategoryReq request);
    void deleteCategory(int id);
}"""

files["service/core/impl/CategoryService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
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
}"""

files["controller/CategoryController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/categories")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CategoryController {
    private final ICategoryService iCategoryService;
    @GetMapping
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCategoryService.getAllCategories()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCategoryService.getCategoryById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody CreateCategoryReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iCategoryService.createCategory(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable int id, @RequestBody UpdateCategoryReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iCategoryService.updateCategory(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable int id) {
        iCategoryService.deleteCategory(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

# ================= DAMAGE LEVEL =================
files["model/DamageLevel.java"] = """package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
@Entity
@Table(name = "damage_levels")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class DamageLevel extends BaseIdObject {
    @Column(name = "level_name", length = 50, nullable = false, unique = true)
    private String levelName;
    @Column(name = "percent_value", nullable = false)
    private BigDecimal percentValue;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}"""

files["repository/IDamageLevelRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.DamageLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IDamageLevelRepository extends JpaRepository<DamageLevel, Integer> {
    boolean existsByLevelName(String levelName);
}"""

files["dto/req/CreateDamageLevelReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateDamageLevelReq {
    private String levelName;
    private BigDecimal percentValue;
    private String description;
}"""

files["dto/req/UpdateDamageLevelReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateDamageLevelReq {
    private String levelName;
    private BigDecimal percentValue;
    private String description;
}"""

files["dto/resp/DamageLevelResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DamageLevelResp {
    private Integer id;
    private String levelName;
    private BigDecimal percentValue;
    private String description;
}"""

files["service/core/intf/IDamageLevelService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.DamageLevelResp;
import java.util.List;
public interface IDamageLevelService {
    List<DamageLevelResp> getAllDamageLevels();
    DamageLevelResp getDamageLevelById(int id);
    DamageLevelResp createDamageLevel(CreateDamageLevelReq request);
    DamageLevelResp updateDamageLevel(int id, UpdateDamageLevelReq request);
    void deleteDamageLevel(int id);
}"""

files["service/core/impl/DamageLevelService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
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
}"""

files["controller/DamageLevelController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IDamageLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/damage-levels")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DamageLevelController {
    private final IDamageLevelService iDamageLevelService;
    @GetMapping
    public ResponseEntity<?> getAllDamageLevels() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iDamageLevelService.getAllDamageLevels()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDamageLevelById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iDamageLevelService.getDamageLevelById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createDamageLevel(@RequestBody CreateDamageLevelReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iDamageLevelService.createDamageLevel(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDamageLevel(@PathVariable int id, @RequestBody UpdateDamageLevelReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iDamageLevelService.updateDamageLevel(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDamageLevel(@PathVariable int id) {
        iDamageLevelService.deleteDamageLevel(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

# ================= MEMBERSHIP PLAN =================
files["model/MembershipPlan.java"] = """package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.MembershipPlanName;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
@Entity
@Table(name = "membership_plans")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MembershipPlan extends BaseIdObject {
    @Enumerated(EnumType.STRING)
    @Column(name = "plan_name", nullable = false, unique = true)
    private MembershipPlanName planName;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "duration_days", nullable = false)
    private Integer durationDays;
    @Column(name = "max_borrow_books", nullable = false)
    private Integer maxBorrowBooks;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
}"""

files["repository/IMembershipPlanRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.MembershipPlan;
import com.tlu.Hybird_Library_SE302.model.constants.MembershipPlanName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IMembershipPlanRepository extends JpaRepository<MembershipPlan, Integer> {
    boolean existsByPlanName(MembershipPlanName planName);
}"""

files["dto/req/CreateMembershipPlanReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.MembershipPlanName;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMembershipPlanReq {
    private MembershipPlanName planName;
    private BigDecimal price;
    private Integer durationDays;
    private Integer maxBorrowBooks;
    private String description;
    private Boolean isActive;
}"""

files["dto/req/UpdateMembershipPlanReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.MembershipPlanName;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateMembershipPlanReq {
    private MembershipPlanName planName;
    private BigDecimal price;
    private Integer durationDays;
    private Integer maxBorrowBooks;
    private String description;
    private Boolean isActive;
}"""

files["dto/resp/MembershipPlanResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.MembershipPlanName;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MembershipPlanResp {
    private Integer id;
    private MembershipPlanName planName;
    private BigDecimal price;
    private Integer durationDays;
    private Integer maxBorrowBooks;
    private String description;
    private Boolean isActive;
}"""

files["service/core/intf/IMembershipPlanService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.MembershipPlanResp;
import java.util.List;
public interface IMembershipPlanService {
    List<MembershipPlanResp> getAllMembershipPlans();
    MembershipPlanResp getMembershipPlanById(int id);
    MembershipPlanResp createMembershipPlan(CreateMembershipPlanReq request);
    MembershipPlanResp updateMembershipPlan(int id, UpdateMembershipPlanReq request);
    void deleteMembershipPlan(int id);
}"""

files["service/core/impl/MembershipPlanService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
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
}"""

files["controller/MembershipPlanController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
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
}"""

# ================= BOOK =================
files["model/Book.java"] = """package com.tlu.Hybird_Library_SE302.model;
import com.tlu.Hybird_Library_SE302.model.base.BaseIdObject;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import com.tlu.Hybird_Library_SE302.model.constants.BookCondition;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
@Entity
@Table(name = "books")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Book extends BaseIdObject {
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "author")
    private String author;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "publish_year")
    private Integer publishYear;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "book_type", nullable = false)
    private BookType bookType;
    
    @Column(name = "likes", nullable = false)
    @Builder.Default
    private Integer likes = 0;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "`condition`")
    @Builder.Default
    private BookCondition condition = BookCondition.GOOD;
    
    @Column(name = "quantity", nullable = false)
    @Builder.Default
    private Integer quantity = 0;
    
    @Column(name = "book_url")
    private String bookUrl;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "avg_rating", precision = 2, scale = 1)
    @Builder.Default
    private BigDecimal avgRating = BigDecimal.ZERO;
}"""

files["repository/IBookRepository.java"] = """package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IBookRepository extends JpaRepository<Book, Integer> {
}"""

files["dto/req/CreateBookReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import com.tlu.Hybird_Library_SE302.model.constants.BookCondition;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBookReq {
    private String title;
    private String author;
    private String publisher;
    private Integer publishYear;
    private Integer categoryId;
    private String description;
    private BookType bookType;
    private BookCondition condition;
    private Integer quantity;
    private String bookUrl;
    private String imageUrl;
}"""

files["dto/req/UpdateBookReq.java"] = """package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import com.tlu.Hybird_Library_SE302.model.constants.BookCondition;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateBookReq {
    private String title;
    private String author;
    private String publisher;
    private Integer publishYear;
    private Integer categoryId;
    private String description;
    private BookType bookType;
    private BookCondition condition;
    private Integer quantity;
    private String bookUrl;
    private String imageUrl;
}"""

files["dto/resp/BookResp.java"] = """package com.tlu.Hybird_Library_SE302.dto.resp;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import com.tlu.Hybird_Library_SE302.model.constants.BookCondition;
import lombok.*;
import java.math.BigDecimal;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResp {
    private Integer id;
    private String title;
    private String author;
    private String publisher;
    private Integer publishYear;
    private Integer categoryId;
    private String categoryName;
    private String description;
    private BookType bookType;
    private Integer likes;
    private BookCondition condition;
    private Integer quantity;
    private String bookUrl;
    private String imageUrl;
    private BigDecimal avgRating;
}"""

files["service/core/intf/IBookService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.BookResp;
import java.util.List;
public interface IBookService {
    List<BookResp> getAllBooks();
    BookResp getBookById(int id);
    BookResp createBook(CreateBookReq request);
    BookResp updateBook(int id, UpdateBookReq request);
    void deleteBook(int id);
}"""

files["service/core/impl/BookService.java"] = """package com.tlu.Hybird_Library_SE302.service.core.impl;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.BookResp;
import com.tlu.Hybird_Library_SE302.model.Book;
import com.tlu.Hybird_Library_SE302.model.Category;
import com.tlu.Hybird_Library_SE302.repository.IBookRepository;
import com.tlu.Hybird_Library_SE302.repository.ICategoryRepository;
import com.tlu.Hybird_Library_SE302.service.core.intf.IBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
@Service
@RequiredArgsConstructor
public class BookService implements IBookService {
    private final IBookRepository iBookRepository;
    private final ICategoryRepository iCategoryRepository;
    @Override
    public List<BookResp> getAllBooks() {
        return iBookRepository.findAll().stream().map(this::mapToResp).toList();
    }
    @Override
    public BookResp getBookById(int id) {
        Book book = iBookRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sách!"));
        return mapToResp(book);
    }
    @Override
    public BookResp createBook(CreateBookReq request) {
        Category category = iCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục!"));
        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .publisher(request.getPublisher())
                .publishYear(request.getPublishYear())
                .category(category)
                .description(request.getDescription())
                .bookType(request.getBookType())
                .condition(request.getCondition())
                .quantity(request.getQuantity() != null ? request.getQuantity() : 0)
                .bookUrl(request.getBookUrl())
                .imageUrl(request.getImageUrl())
                .likes(0)
                .avgRating(BigDecimal.ZERO)
                .build();
        return mapToResp(iBookRepository.save(book));
    }
    @Override
    public BookResp updateBook(int id, UpdateBookReq request) {
        Book book = iBookRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sách!"));
        if(request.getCategoryId() != null && (book.getCategory() == null || !request.getCategoryId().equals(book.getCategory().getId()))) {
            Category category = iCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục!"));
            book.setCategory(category);
        }
        if(request.getTitle() != null) book.setTitle(request.getTitle());
        if(request.getAuthor() != null) book.setAuthor(request.getAuthor());
        if(request.getPublisher() != null) book.setPublisher(request.getPublisher());
        if(request.getPublishYear() != null) book.setPublishYear(request.getPublishYear());
        if(request.getDescription() != null) book.setDescription(request.getDescription());
        if(request.getBookType() != null) book.setBookType(request.getBookType());
        if(request.getCondition() != null) book.setCondition(request.getCondition());
        if(request.getQuantity() != null) book.setQuantity(request.getQuantity());
        if(request.getBookUrl() != null) book.setBookUrl(request.getBookUrl());
        if(request.getImageUrl() != null) book.setImageUrl(request.getImageUrl());
        return mapToResp(iBookRepository.save(book));
    }
    @Override
    public void deleteBook(int id) {
        Book book = iBookRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sách!"));
        iBookRepository.delete(book);
    }
    private BookResp mapToResp(Book book) {
        return BookResp.builder()
            .id(book.getId())
            .title(book.getTitle())
            .author(book.getAuthor())
            .publisher(book.getPublisher())
            .publishYear(book.getPublishYear())
            .categoryId(book.getCategory() != null ? book.getCategory().getId() : null)
            .categoryName(book.getCategory() != null ? book.getCategory().getCategoryName() : null)
            .description(book.getDescription())
            .bookType(book.getBookType())
            .likes(book.getLikes())
            .condition(book.getCondition())
            .quantity(book.getQuantity())
            .bookUrl(book.getBookUrl())
            .imageUrl(book.getImageUrl())
            .avgRating(book.getAvgRating())
            .build();
    }
}"""

files["controller/BookController.java"] = """package com.tlu.Hybird_Library_SE302.controller;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.service.core.ResponseWrapper;
import com.tlu.Hybird_Library_SE302.service.core.intf.IBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/books")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BookController {
    private final IBookService iBookService;
    @GetMapping
    public ResponseEntity<?> getAllBooks() {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iBookService.getAllBooks()).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable int id) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iBookService.getBookById(id)).build());
    }
    @PostMapping
    public ResponseEntity<?> createBook(@RequestBody CreateBookReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.CREATED).code(201).data(iBookService.createBook(request)).build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable int id, @RequestBody UpdateBookReq request) {
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data(iBookService.updateBook(id, request)).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        iBookService.deleteBook(id);
        return ResponseEntity.ok(ResponseWrapper.builder().status(HttpStatus.OK).code(200).data("Xóa thành công!").build());
    }
}"""

for file_path, content in files.items():
    full_path = os.path.join(base_dir, file_path)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Generated {len(files)} files successfully.")
