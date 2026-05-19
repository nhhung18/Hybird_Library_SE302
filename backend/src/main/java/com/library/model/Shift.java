package com.library.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "shifts")
@Data
@NoArgsConstructor
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // e.g. "Quầy Lễ tân", "Khu Tự học", "Kho sách"
    private String location;

    // e.g. "Ca Sáng 1", "Giám sát Sáng"
    private String title;

    // 1=Monday, 2=Tuesday, ..., 7=Sunday
    private Integer dayOfWeek;

    // "MORNING", "AFTERNOON", "EVENING"
    private String timeSlot;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "shift_employee",
        joinColumns = @JoinColumn(name = "shift_id"),
        inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private Set<Employee> assignedEmployees = new HashSet<>();
}
