package com.tlu.Hybird_Library_SE302.service.core;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ResponseWrapper {
    private HttpStatus status;
    private int code;
    private Object data;
}
