package com.tlu.Hybird_Library_SE302.repository;
import com.tlu.Hybird_Library_SE302.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface ICartRepository extends JpaRepository<Cart, Integer> {
    boolean existsByUserId(Integer userId);
    Optional<Cart> findByUserId(Integer userId);
}