package com.tlu.Hybird_Library_SE302.service.core.intf;
import com.tlu.Hybird_Library_SE302.dto.req.*;
import com.tlu.Hybird_Library_SE302.dto.resp.BookResp;
import java.util.List;
public interface IBookService {
    List<BookResp> getAllBooks();
    BookResp getBookById(int id);
    BookResp createBook(CreateBookReq request);
    BookResp updateBook(int id, UpdateBookReq request);
    void deleteBook(int id);
}