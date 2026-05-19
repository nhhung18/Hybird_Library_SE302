package com.library.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type; // e.g., "Hàng tháng", "Hàng quý"

    @Column(nullable = false)
    private LocalDate creationDate;

    @Column(nullable = false)
    private String status; // "Hoàn thành", "Đang xử lý", "Lỗi xuất"
}
