package com.library.service;

import com.library.model.Report;
import com.library.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public void exportReport(String dateRange, String filterType) {
        // Logic to trigger background generation of the PDF/Excel report
        // This corresponds to the "Xuất báo cáo" button on the UI
        System.out.println("Exporting report for range: " + dateRange + " with filter: " + filterType);
    }
}
