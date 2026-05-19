package com.library.controller;

import com.library.model.Shift;
import com.library.model.Employee;
import com.library.repository.ShiftRepository;
import com.library.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import lombok.Data;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

@RestController
@RequestMapping("/api/v1/shifts")
@CrossOrigin(origins = "http://localhost:5173")
public class ShiftController {

    @Autowired
    private ShiftRepository shiftRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Shift> getAllShifts() {
        return shiftRepository.findAll();
    }

    @PostMapping
    public Shift createShift(@RequestBody ShiftRequest shiftRequest) {
        Shift shift = new Shift();
        shift.setLocation(shiftRequest.getLocation());
        shift.setTitle(shiftRequest.getTitle());
        shift.setDayOfWeek(shiftRequest.getDayOfWeek());
        shift.setTimeSlot(shiftRequest.getTimeSlot());

        Set<Employee> employees = new HashSet<>();
        if (shiftRequest.getEmployeeIds() != null) {
            for (Long empId : shiftRequest.getEmployeeIds()) {
                employeeRepository.findById(empId).ifPresent(employees::add);
            }
        }
        shift.setAssignedEmployees(employees);

        return shiftRepository.save(shift);
    }
}

@Data
class ShiftRequest {
    private String location;
    private String title;
    private Integer dayOfWeek;
    private String timeSlot;
    private List<Long> employeeIds;
}
