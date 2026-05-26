package com.tlu.Hybird_Library_SE302.service.core.impl;
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
}