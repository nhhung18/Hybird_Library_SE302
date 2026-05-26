package com.tlu.Hybird_Library_SE302.model;
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
}