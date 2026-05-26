package com.tlu.Hybird_Library_SE302.dto.resp;
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
}