import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Hoàn thành':
      return <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-100">{status}</span>;
    case 'Đang xử lý':
      return <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{status}</span>;
    case 'Lỗi xuất':
      return <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-100">{status}</span>;
    default:
      return null;
  }
};

export default function ReportTable() {
  const [reports, setReports] = useState([
    { id: 1, name: 'Báo cáo Tổng hợp Mượn trả Tháng 10', type: 'Hàng tháng', date: '01/11/2023', status: 'Hoàn thành' },
    { id: 2, name: 'Phân tích Thể loại Xu hướng Quý 3', type: 'Hàng quý', date: '15/10/2023', status: 'Đang xử lý' },
    { id: 3, name: 'Thống kê Hội viên Mới 2023', type: 'Hàng năm', date: '05/01/2024', status: 'Lỗi xuất' }
  ]);

  useEffect(() => {
    // Note: To see data from backend when running Spring Boot, uncomment this:
    // axios.get('http://localhost:8080/api/v1/dashboard/reports')
    //     .then(response => setReports(response.data))
    //     .catch(error => console.error("Error fetching reports:", error));
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-8 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Danh sách Báo cáo chi tiết</h3>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-4">Tên báo cáo</th>
            <th className="px-6 py-4">Loại</th>
            <th className="px-6 py-4">Ngày tạo</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4">Hành động</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {reports.map((report) => (
            <tr key={report.id} className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">
              <td className="px-6 py-5 font-semibold text-gray-900">{report.name}</td>
              <td className="px-6 py-5 text-gray-500">{report.type}</td>
              <td className="px-6 py-5 text-gray-500">{report.date}</td>
              <td className="px-6 py-5">{getStatusBadge(report.status)}</td>
              <td className="px-6 py-5"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
