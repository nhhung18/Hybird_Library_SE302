package com.library.controller;

import com.library.model.Report;
import com.library.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@CrossOrigin(origins = "http://localhost:5173") // Connects to Vite local server
public class ReportController {

    @Autowired
    private ReportService reportService;

    // Endpoint for "Danh sách Báo cáo chi tiết" table
    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getDetailedReports() {
        List<Report> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    // Endpoint triggered by "Xuất báo cáo" button
    @PostMapping("/reports/export")
    public ResponseEntity<String> triggerReportExport(@RequestParam String filter, @RequestParam String dateRange) {
        reportService.exportReport(dateRange, filter);
        return ResponseEntity.ok("Report generation started");
    }
}
