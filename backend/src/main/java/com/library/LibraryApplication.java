package com.library;

import com.library.model.Employee;
import com.library.model.Shift;
import com.library.model.Invoice;
import com.library.repository.EmployeeRepository;
import com.library.repository.InvoiceRepository;
import com.library.repository.ShiftRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedDatabase(EmployeeRepository employeeRepository, ShiftRepository shiftRepository, InvoiceRepository invoiceRepository) {
		return args -> {
			if (invoiceRepository.count() == 0) {
				invoiceRepository.save(new Invoice("INV-2023-001", "Nguyễn Văn A", "Mượn sách", 50000L, "Tiền mặt", "Đã thanh toán"));
				invoiceRepository.save(new Invoice("INV-2023-002", "Trần Thị B", "Phạt trễ hạn", 120000L, "Chuyển khoản", "Chưa thanh toán"));
				invoiceRepository.save(new Invoice("INV-2023-003", "Lê Văn C", "Gói thành viên VIP", 1500000L, "Chuyển khoản", "Đã thanh toán"));
				invoiceRepository.save(new Invoice("INV-2023-004", "Phạm Thị D", "Mượn sách", 25000L, "-", "Chưa thanh toán"));
				System.out.println("Mock invoice data seeded!");
			}
			if (employeeRepository.count() == 0) {
				Employee emp1 = employeeRepository.save(new Employee(null, "#EMP-2024-001", "Trần Thị Minh", "minh.tran@athenaeum.lib", "090 123 4567", "THỦ THƯ", "ĐANG MỞ"));
				Employee emp2 = employeeRepository.save(new Employee(null, "#EMP-2024-008", "Nguyễn Hoàng Nam", "nam.nh@athenaeum.lib", "091 987 6543", "KỸ THUẬT", "ĐÃ KHÓA"));
				Employee emp3 = employeeRepository.save(new Employee(null, "#EMP-2023-142", "Lê Anh Thư", "thu.la@athenaeum.lib", "098 555 1212", "QTV", "ĐANG MỞ"));
				Employee emp4 = employeeRepository.save(new Employee(null, "#EMP-2024-015", "Phạm Hữu Phước", "phuoc.ph@athenaeum.lib", "093 444 8888", "THỦ THƯ", "ĐANG MỞ"));
				System.out.println("Mock employee data seeded!");

				if (shiftRepository.count() == 0) {
					Shift s1 = new Shift();
					s1.setLocation("Quầy Lễ tân");
					s1.setTitle("Ca Sáng 1");
					s1.setDayOfWeek(1); // Monday
					s1.setTimeSlot("Sáng");
					s1.getAssignedEmployees().add(emp1);
					s1.getAssignedEmployees().add(emp2);
					shiftRepository.save(s1);

					Shift s2 = new Shift();
					s2.setLocation("Khu Tự học");
					s2.setTitle("Giám sát Sáng");
					s2.setDayOfWeek(2); // Tuesday
					s2.setTimeSlot("Sáng");
					s2.getAssignedEmployees().add(emp3);
					shiftRepository.save(s2);

					Shift s3 = new Shift();
					s3.setLocation("Quầy Lễ tân");
					s3.setTitle("Ca Sáng 1");
					s3.setDayOfWeek(3); // Wednesday
					s3.setTimeSlot("Sáng");
					s3.getAssignedEmployees().add(emp1);
					shiftRepository.save(s3);
					
					Shift s4 = new Shift();
					s4.setLocation("Kho sách");
					s4.setTitle("Sắp xếp Sáng");
					s4.setDayOfWeek(5); // Friday
					s4.setTimeSlot("Sáng");
					s4.getAssignedEmployees().add(emp4);
					shiftRepository.save(s4);

					System.out.println("Mock shift data seeded!");
				}
			}
		};
	}
}
