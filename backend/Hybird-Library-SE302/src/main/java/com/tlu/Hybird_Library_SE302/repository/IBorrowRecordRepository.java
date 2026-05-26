package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IBorrowRecordRepository extends JpaRepository<BorrowRecord, Integer> {
}