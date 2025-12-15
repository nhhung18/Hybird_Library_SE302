package com.g3.hab_lib.service.core.intf;

import com.g3.hab_lib.dto.req.UserReq;
import com.g3.hab_lib.dto.resp.UserResp;
import org.hibernate.boot.models.annotations.internal.ExtendsXmlAnnotation;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {

    Page<UserResp> getAllCustomer(Pageable pageable);

    Page<UserResp> getAllStaff(Pageable pageable);

    UserReq createUser(UserReq form) throws Exception;

    Object deleteUser(int id) throws Exception;

    UserReq updateUser(int id, UserReq form) throws Exception;

    UserReq getUserById(int id) throws Exception;
}
