package com.tlu.Hybird_Library_SE302.repository;

import com.tlu.Hybird_Library_SE302.dto.resp.UserResp;
import com.tlu.Hybird_Library_SE302.model.User;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface IUserRepository extends JpaRepository<User, Integer> {
    List<User> findAll();
}
