package com.tlu.Hybird_Library_SE302.dto.req;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCategoryReq {
    private String categoryName;
}