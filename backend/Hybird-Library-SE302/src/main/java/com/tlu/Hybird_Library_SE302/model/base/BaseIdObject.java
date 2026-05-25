package com.tlu.Hybird_Library_SE302.model.base;

import jakarta.persistence.*;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class BaseIdObject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
}
