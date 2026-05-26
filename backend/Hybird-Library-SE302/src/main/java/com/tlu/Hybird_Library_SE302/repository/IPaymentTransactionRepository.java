package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface IPaymentTransactionRepository extends JpaRepository<PaymentTransaction, Integer> {
    boolean existsByTransactionCode(String transactionCode);
}