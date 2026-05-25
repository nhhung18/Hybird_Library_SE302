package com.tlu.Hybird_Library_SE302.repository;

import com.tlu.Hybird_Library_SE302.dto.resp.UserResp;
import com.tlu.Hybird_Library_SE302.model.User;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface IUserRepository extends JpaRepository<User, Integer> {
//    Find Reader and Guest
    @Query("SELECT u FROM User u WHERE u.role = 'GUEST' OR u.role = 'READER'")
    List<User> findAllUser();

//    Find Reader and Guest
    @Query("SELECT u FROM User u WHERE u.role = 'LIBRARIAN'")
    List<User> findAllLibrarian();

    boolean existsByUserName(String userName);
    boolean existsByEmail(String email);
    boolean existsByPhoneNum(String phoneNum);
}
