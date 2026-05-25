package com.tlu.Hybird_Library_SE302.repository;

import com.tlu.Hybird_Library_SE302.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUserAddressRepository extends JpaRepository<UserAddress, Integer> {
    List<UserAddress> findAll;
}
