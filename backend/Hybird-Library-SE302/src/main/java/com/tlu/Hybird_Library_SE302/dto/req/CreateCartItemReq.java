package com.tlu.Hybird_Library_SE302.dto.req;
import com.tlu.Hybird_Library_SE302.model.constants.BookType;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCartItemReq {
    private Integer cartId;
    private Integer bookId;
    private BookType bookType;
}