let readersData = [
  {
    id: "RDR001",
    userName: "reader01",
    fullName: "Phạm Minh Đức",
    email: "reader01@library.vn",
    phoneNum: "0901111111",
    roleId: "8",
    address: "123 Đường A, TP.HCM",
    createAt: "2024-01-05"
  },
  {
    id: "RDR002",
    userName: "guest01",
    fullName: "Võ Thị Mai",
    email: "guest01@library.vn",
    phoneNum: "0902222222",
    roleId: "9",
    address: "456 Đường B, Hà Nội",
    createAt: "2024-02-10"
  },
  {
    id: "RDR003",
    userName: "reader02",
    fullName: "Hoàng Văn Nam",
    email: "reader02@library.vn",
    phoneNum: "0903333333",
    roleId: "8",
    address: "789 Đường C, Đà Nẵng",
    createAt: "2024-03-15"
  },
  {
    id: "RDR004",
    userName: "guest02",
    fullName: "Trương Thị Hoa",
    email: "guest02@library.vn",
    phoneNum: "0904444444",
    roleId: "9",
    address: "321 Đường D, TP.HCM",
    createAt: "2024-04-20"
  },
  {
    id: "RDR005",
    userName: "reader03",
    fullName: "Đinh Quang Huy",
    email: "reader03@library.vn",
    phoneNum: "0905555555",
    roleId: "8",
    address: "654 Đường E, Cần Thơ",
    createAt: "2024-05-08"
  }
];

let employeesData = [
    {
      id: "EMP001",
      userName: "admin",
      fullName: "Nguyễn Huy Hùng",
      email: "admin@lib.com",
      phoneNum: "0901234567",
      roleId: "1",
      createAt: "2024-01-15"
    },
    {
      id: "EMP002",
      userName: "staff01",
      fullName: "Trần Thị B",
      email: "staff01@library.vn",
      phoneNum: "0912345678",
      roleId: "2",
      createAt: "2024-02-20"
    },
    {
      id: "EMP003",
      userName: "staff02",
      fullName: "Lê Văn C",
      email: "staff02@library.vn",
      phoneNum: "0923456789",
      roleId: "2",
      createAt: "2024-03-10"
    }
  ];
  // Mock datasets for new modules
  let borrowData = [
    {
      id: 'B001',
      readerId: 'RDR001',
      readerName: 'Phạm Minh Đức',
      bookTitle: 'Lập trình JavaScript',
      borrowDate: '2024-10-01',
      dueDate: '2024-10-15',
      status: 'Đang mượn'
    },
    {
      id: 'B002',
      readerId: 'RDR002',
      readerName: 'Võ Thị Mai',
      bookTitle: 'Lập trình Python',
      borrowDate: '2024-12-01',
      dueDate: '2024-12-15',
      status: 'Chờ duyệt'
    }
  ];

  let readerCardData = [
    { id: 'C001', readerId: 'RDR001', readerName: 'Phạm Minh Đức', issueDate: '2024-01-05', expireDate: '2025-01-05', status: 'Hoạt động' }
  ];

  let booksData = [
    { id: 'BK001', title: 'Lập trình JavaScript', author: 'Nguyễn A', publisher: 'NXB Khoa học', year: 2020, quantity: 5 }
  ];

  let paymentData = [
    { id: 'P001', readerId: 'RDR002', readerName: 'Võ Thị Mai', date: '2024-12-01', amount: 50000, type: 'Phạt quá hạn', description: 'Sách trễ 5 ngày', method: 'Tiền mặt', status: 'Đã thanh toán', days_overdue: 5 },
    { id: 'P002', readerId: 'RDR001', readerName: 'Phạm Minh Đức', date: '2024-12-02', amount: 200000, type: 'Mất sách', description: 'Mất sách "Lập trình C++"', method: 'Chuyển khoản', status: 'Đã thanh toán' },
    { id: 'P003', readerId: 'RDR003', readerName: 'Hoàng Văn Nam', date: '2024-12-03', amount: 150000, type: 'Phí cấp thẻ', description: 'Cấp thẻ thư viện mới', method: 'Tiền mặt', status: 'Đã thanh toán' },
    { id: 'P004', readerId: 'RDR004', readerName: 'Trương Thị Hoa', date: '2024-12-05', amount: 0, type: 'Phí photocopy', description: 'In 50 trang', method: 'Chưa thanh toán', status: 'Chưa thanh toán' },
    { id: 'P005', readerId: 'RDR005', readerName: 'Đinh Quang Huy', date: '2024-12-08', amount: 100000, type: 'Phí dịch vụ', description: 'Phí sử dụng phòng học', method: 'Tiền mặt', status: 'Đã thanh toán' }
  ];

  let feeConfigData = [
    { id: 'FC001', type: 'Phạt quá hạn', rate: 10000, unit: 'đồng/ngày', description: 'Phạt cho mỗi ngày trễ hạn' },
    { id: 'FC002', type: 'Mất sách', rate: 100, unit: '%', description: 'Bằng giá sách + 50% phí xử lý' },
    { id: 'FC003', type: 'Hỏng sách', rate: 50, unit: '%', description: 'Bằng 50% giá sách' },
    { id: 'FC004', type: 'Cấp thẻ', rate: 150000, unit: 'đồng', description: 'Phí cấp thẻ mới' },
    { id: 'FC005', type: 'Gia hạn thẻ', rate: 50000, unit: 'đồng', description: 'Phí gia hạn hàng năm' },
    { id: 'FC006', type: 'Photocopy', rate: 1000, unit: 'đồng/trang', description: 'Phí in ấn' },
    { id: 'FC007', type: 'Phòng học nhóm', rate: 50000, unit: 'đồng/giờ', description: 'Phí sử dụng phòng' }
  ];

  let shiftData = [
    { id: 'S001', empId: 'EMP002', empName: 'Trần Thị B', date: '2024-12-01', start: '08:00', end: '12:00', status: 'Xác nhận' }
  ];

  let attendanceData = [
    { id: 'A001', empId: 'EMP002', empName: 'Trần Thị B', date: '2024-12-01', checkIn: '08:05', checkOut: '12:00', status: 'Có mặt' }
  ];

  let penaltyData = [
    { id: 'PEN001', readerId: 'RDR002', readerName: 'Võ Thị Mai', violationType: 'Quá hạn', description: 'Sách "Python cơ bản" trễ 10 ngày', amount: 100000, unit: 'đồng', status: 'Chưa thanh toán', createdDate: '2024-12-01', accountLocked: true, notes: '' },
    { id: 'PEN002', readerId: 'RDR001', readerName: 'Phạm Minh Đức', violationType: 'Mất sách', description: 'Mất sách "Lập trình JavaScript"', amount: 350000, unit: 'đồng', status: 'Đã xử lý', createdDate: '2024-11-25', accountLocked: false, notes: 'Đã thanh toán ngày 2024-12-05' },
    { id: 'PEN003', readerId: 'RDR003', readerName: 'Hoàng Văn Nam', violationType: 'Làm hỏng', description: 'Sách bị rách 20% trang', amount: 80000, unit: 'đồng', status: 'Chưa thanh toán', createdDate: '2024-12-03', accountLocked: false, notes: '' },
    { id: 'PEN004', readerId: 'RDR004', readerName: 'Trương Thị Hoa', violationType: 'Vi phạm nội quy', description: 'Mang đồ ăn vào phòng đọc', amount: 50000, unit: 'đồng', status: 'Chưa thanh toán', createdDate: '2024-12-08', accountLocked: false, notes: '' },
    { id: 'PEN005', readerId: 'RDR005', readerName: 'Đinh Quang Huy', violationType: 'Quá hạn', description: 'Sách trễ 3 ngày', amount: 30000, unit: 'đồng', status: 'Đã xử lý', createdDate: '2024-12-10', accountLocked: false, notes: 'Đã thanh toán' }
  ];

  let violationCategoryData = [
    { id: 'VC001', type: 'Quá hạn', description: 'Trả sách sau hạn quy định', unitPrice: 10000, unit: 'đồng/ngày' },
    { id: 'VC002', type: 'Mất sách', description: 'Mất tài liệu của thư viện', unitPrice: 0, unit: 'Giá sách + 50% phí xử lý' },
    { id: 'VC003', type: 'Làm hỏng', description: 'Làm rách, vẽ vào hoặc hỏng tài liệu', unitPrice: 0, unit: 'Tùy mức độ (20%-100% giá sách)' },
    { id: 'VC004', type: 'Vi phạm nội quy', description: 'Làm ồn, mang đồ ăn, sử dụng thẻ người khác', unitPrice: 50000, unit: 'đồng' }
  ];

// current sort for readers table (none | id | username | fullname | email | role | createAt)
let currentReaderSort = "none";

document.addEventListener("DOMContentLoaded", () => {
  updateDashboardStats(); // Cập nhật số liệu thống kê
  renderAllTables(); // Vẽ tất cả các bảng

  // wire up reader sort control
  const readerSortEl = document.getElementById("readerSort");
  if (readerSortEl) {
    readerSortEl.addEventListener("change", (e) => {
      currentReaderSort = e.target.value;
      applyReaderSortAndRender();
    });
  }

  // try to fetch readers on initial load so the table is populated automatically
  loadReaders();

  // sidebar collapse toggle: restore state and wire button
  const container = document.querySelector(".admin-container");
  const toggleBtn = document.getElementById("sidebarToggle");
  try {
    const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    if (isCollapsed && container) container.classList.add("sidebar-collapsed");
  } catch (e) {}
  if (toggleBtn && container) {
    toggleBtn.addEventListener("click", () => {
      const now = container.classList.toggle("sidebar-collapsed");
      try {
        localStorage.setItem("sidebarCollapsed", now);
      } catch (e) {}
    });
  }

  // internal sidebar collapse button (inside the sidebar)
  const sidebarCollapseBtn = document.getElementById("sidebarCollapse");
  if (sidebarCollapseBtn && container) {
    // set initial direction based on stored state
    try {
      const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
      const icon = sidebarCollapseBtn.querySelector("i");
      if (icon) icon.style.transform = isCollapsed ? "rotate(180deg)" : "none";
    } catch (e) {}

    sidebarCollapseBtn.addEventListener("click", () => {
      const now = container.classList.toggle("sidebar-collapsed");
      try {
        localStorage.setItem("sidebarCollapsed", now);
      } catch (e) {}
      // rotate the chevron to indicate direction
      const icon = sidebarCollapseBtn.querySelector("i");
      if (icon) icon.style.transform = now ? "rotate(180deg)" : "none";
    });
  }
});

function renderAllTables() {
  // always pass the current readersData so renderReaderTable has a defined array
  renderReaderTable(readersData);
  renderEmployeeTable(employeesData);
  renderBorrowTable(borrowData);
  renderReaderCardTable(readerCardData);
  renderBookTable(booksData);
  renderPaymentTable(paymentData);
  renderPenaltyTable(penaltyData);
  renderShiftTable(shiftData);
  renderAttendanceTable(attendanceData);
}

// apply the selected readers sort and re-render
function applyReaderSortAndRender() {
  if (!Array.isArray(readersData)) return renderReaderTable([]);

  if (!currentReaderSort || currentReaderSort === "none") {
    return renderReaderTable(readersData);
  }

  const copy = readersData.slice();
  copy.sort((a, b) => {
    const key = currentReaderSort;
    const va = (a[key] ?? "").toString();
    const vb = (b[key] ?? "").toString();

    if (key === "id") {
      const na = parseInt((va.match(/\d+/) || ["0"])[0], 10);
      const nb = parseInt((vb.match(/\d+/) || ["0"])[0], 10);
      return na - nb;
    }

    if (key === "createAt") {
      const da = Date.parse(va) || 0;
      const db = Date.parse(vb) || 0;
      return db - da; // newest -> oldest
    }

    return va.localeCompare(vb, "vi", { sensitivity: "base" });
  });

  renderReaderTable(copy);
}

function updateDashboardStats() {
  // Đếm số phiếu đang mượn (status = borrowed)
  document.getElementById("stat-readers").innerText = readersData.length;
  document.getElementById("stat-employees").innerText = employeesData.length;
}



// RENDER READERS
// Show readers
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("menu-readers")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const el = this;
      try {
        switchTab("readers", el);
        loadReaders();
      } catch (err) {
        console.error("handle click error:", err);
      }
    });
});

function loadReaders() {
  applyReaderSortAndRender();
  populateReaderSelect(); // Cập nhật danh sách độc giả cho modal penalty
}

function populateReaderSelect() {
  const select = document.getElementById('penaltyReaderId');
  if (select) {
    const currentValue = select.value;
    select.innerHTML = '<option value="">-- Chọn độc giả --</option>';
    readersData.forEach(reader => {
      select.innerHTML += `<option value="${reader.id}">${reader.fullName} (${reader.id})</option>`;
    });
    if (currentValue) select.value = currentValue;
  }
}

function updatePenaltyFields() {
  const penaltyType = document.getElementById('penaltyType').value;
  const violationTypeSelect = document.getElementById('penaltyViolationType');
  const amountLabel = document.getElementById('penaltyAmountLabel');
  
  if (penaltyType === 'auto') {
    violationTypeSelect.value = 'Quá hạn';
    violationTypeSelect.disabled = true;
    amountLabel.innerHTML = 'Số tiền (tự tính: Số ngày trễ × Đơn giá)<span style="color: red">*</span>';
  } else {
    violationTypeSelect.disabled = false;
    amountLabel.innerHTML = 'Số tiền<span style="color: red">*</span>';
  }
}

function renderReaderTable(data = readersData) {
  const tbody = document.querySelector("#readerTable tbody");
  tbody.innerHTML = "";
  // ensure data is an array
  if (!Array.isArray(data)) {
    console.error("renderReaderTable expected array but got", data);
    tbody.innerHTML = `<tr><td colspan="8" class="no-data">Không thể tải danh sách độc giả</td></tr>`;
    return;
  }

  // no-data message when there are zero readers
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="no-data">Hiện không có Khách hoặc Độc giả nào trong hệ thống</td></tr>`;
    return;
  }
  data.forEach((item) => {
    // normalize/format role for display (roleId may be numeric or a string code)
    const rawRole = (item.roleId ?? item.role ?? "").toString();
    let roleLabel;
    switch (rawRole.toLowerCase()) {
      case "8":
        roleLabel = "Độc giả";
        break;
      case "9":
        roleLabel = "Khách";
        break;
      default:
        roleLabel = rawRole || "Không xác định";
    }
    tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td title="${escapeHtml(String(item.userName ?? ""))}">${
      item.userName
    }</td>
                <td title="${escapeHtml(String(item.fullName ?? ""))}">${
      item.fullName
    }</td>
                <td title="${escapeHtml(String(item.email ?? ""))}">${
      item.email
    }</td>
                <td title="${escapeHtml(String(item.phoneNum ?? ""))}">${
      item.phoneNum
    }</td>
                <td title="${escapeHtml(String(roleLabel))}">${roleLabel}</td>
                <td title="${escapeHtml(String(item.createAt ?? ""))}">${
      item.createAt
    }</td>
                <td class="action-icons">
                  <div class="action-buttons">
                    <button class="btn-edit" data-id="${item.id}">Sửa</button>
                    <button class="btn-delete" data-id="${item.id}">Xóa</button>
                  </div>
    </td>
            </tr>`;
  });
  // attach handlers to dynamically created delete buttons
  attachDeleteEvents();
  attachEditEvents();
}

// xử lý ấn nút sửa / xóa
function attachDeleteEvents() {
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.onclick = function () {
      const id = btn.getAttribute("data-id");

      if (!confirm("Bạn có chắc chắn muốn xóa không?")) return;

      // Delete from local readersData
      readersData = readersData.filter((x) => x.id != id);
      
      alert("Xóa thành công!");
      applyReaderSortAndRender();
      updateDashboardStats();
    };
  });
}

function attachEditEvents() {
  document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.onclick = function () {

      // Lấy id từ nút Edit
      const id = btn.getAttribute("data-id");

      // Lấy user từ cache FE (readersData)
      const user = readersData.find(u => u.id == id);
      if (!user) {
        alert("Không tìm thấy người dùng");
        return;
      }

      // Mở modal edit
      openModal("editReaderModal");

    };
  });
}


// Create guest or librarian
document
  .getElementById("formCreateReader")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const roleName = document.getElementById("readerRole").value;
    const convertRole = roleName === "GUEST" ? 9 : 8;

    const userName = document.getElementById("username").value.trim();
    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const phoneNum = document.getElementById("phone").value.trim();
    const address = document.getElementById("readerAddress").value.trim();

    // Validate
    if (!userName || !fullName || !email || !password || !phoneNum) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }

    // Check if username or email already exists
    if (readersData.some(r => r.userName === userName)) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }
    if (readersData.some(r => r.email === email)) {
      alert("Email đã tồn tại!");
      return;
    }

    // Create new user object
    const newUser = {
      id: "READER_" + Date.now(),
      userName: userName,
      fullName: fullName,
      email: email,
      password: password,
      roleId: convertRole,
      phoneNum: phoneNum,
      address: address,
      createAt: new Date().toISOString().split('T')[0]
    };

    // Add to local data
    readersData.push(newUser);

    // close modal, reset form, refresh list and stats
    try {
      closeModal("readerModal");
    } catch (e) {}
    const formEl = document.getElementById("formCreateReader");
    if (formEl) formEl.reset();
    applyReaderSortAndRender();
    updateDashboardStats();
    alert("Tạo thành công!");
  });

// RENDER EMPLOYEE
document.addEventListener("DOMContentLoaded", () => {
  const menuEmp = document.getElementById("menu-employees");
  if (menuEmp) {
    menuEmp.addEventListener("click", function (e) {
      e.preventDefault();
      const el = this;
      try {
        switchTab("employees", el); // hiện khu vực trước
        loadEmployees(); // load dữ liệu (không cần await)
      } catch (err) {
        console.error("handle click error:", err);
      }
    });
  }
});

function renderEmployeeTable(data = employeesData) {
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = "";
  // ensure data is an array
  if (!Array.isArray(data)) {
    console.error("renderReaderTable expected array but got", data);
    tbody.innerHTML = `<tr><td colspan="8" class="no-data">Không thể tải danh sách độc giả</td></tr>`;
    return;
  }

  // no-data message when there are zero employees
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="no-data">Hiện không có nhân sự nào trong hệ thống</td></tr>`;
    return;
  }
  data.forEach((item) => {
    // normalize/format role for display
    const rawRole = (item.roleId ?? item.role ?? "").toString();
    let roleLabel;
    switch (rawRole.toLowerCase()) {
      case "1":
        roleLabel = "Quản lý";
        break;
      case "2":
        roleLabel = "Nhân viên";
        break;
      default:
        roleLabel = rawRole || "Không xác định";
    }
    tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td title="${escapeHtml(String(item.userName ?? ""))}">${
      item.userName
    }</td>
                <td title="${escapeHtml(String(item.fullName ?? ""))}">${
      item.fullName
    }</td>
                <td title="${escapeHtml(String(item.email ?? ""))}">${
      item.email
    }</td>
                <td title="${escapeHtml(String(item.phoneNum ?? ""))}">${
      item.phoneNum
    }</td>
                <td title="${escapeHtml(String(roleLabel))}">${roleLabel}</td>
                <td title="${escapeHtml(String(item.createAt ?? ""))}">${
      item.createAt
    }</td>
                <td class="action-icons">
                  <div class="action-buttons">
                    <button class="btn-edit" data-id="${item.id}">Sửa</button>
                    <button class="btn-delete" data-id="${item.id}">Xóa</button>
                  </div>
            </tr>`;
  });
}

  // --- Additional renderers for new modules ---
  function renderBorrowTable(data = borrowData) {
    const tbody = document.querySelector('#borrowTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" class="no-data">Chưa có dữ liệu</td></tr>`;
      return;
    }
    data.forEach(item => {
      const approveBtn = item.status === 'Chờ duyệt' ? `<button class="btn-approve" data-id="${item.id}">Xác nhận</button>` : '<span style="color: #999;">-</span>';
      tbody.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.readerId}</td>
          <td>${escapeHtml(item.readerName)}</td>
          <td>${escapeHtml(item.bookTitle)}</td>
          <td>${item.borrowDate}</td>
          <td>${item.dueDate}</td>
          <td>${item.status}</td>
          <td class="approve-icons">${approveBtn}</td>
          <td class="action-icons"><button class="btn-edit" data-id="${item.id}" data-type="borrow">Sửa</button> <button class="btn-delete" data-id="${item.id}" data-type="borrow">Xóa</button></td>
        </tr>`;
    });
    attachEditDeleteEvents('borrow');
    attachApproveEvents();
  }

  function approveBorrow(id) {
    const index = borrowData.findIndex(x => x.id === id);
    if (index !== -1 && borrowData[index].status === 'Chờ duyệt') {
      borrowData[index].status = 'Đang mượn';
      renderBorrowTable(borrowData);
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Phê duyệt mượn sách thành công',
        timer: 1500
      });
    }
  }

  function attachApproveEvents() {
    document.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        Swal.fire({
          title: 'Xác nhận phê duyệt?',
          text: 'Bạn muốn phê duyệt yêu cầu mượn sách này?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Có',
          cancelButtonText: 'Không',
          confirmButtonColor: '#27ae60',
          cancelButtonColor: '#999'
        }).then(result => {
          if (result.isConfirmed) {
            approveBorrow(id);
          }
        });
      });
    });
  }

  function renderReaderCardTable(data = readerCardData) {
    const tbody = document.querySelector('#readerCardTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="no-data">Chưa có dữ liệu</td></tr>`;
      return;
    }
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${escapeHtml(item.readerName)} (${item.readerId})</td>
          <td>${item.issueDate}</td>
          <td>${item.expireDate}</td>
          <td>${item.status}</td>
          <td class="action-icons"><button class="btn-edit" data-id="${item.id}" data-type="card">Sửa</button> <button class="btn-delete" data-id="${item.id}" data-type="card">Xóa</button></td>
        </tr>`;
    });
    attachEditDeleteEvents('card');
  }

  function renderBookTable(data = booksData) {
    const tbody = document.querySelector('#bookTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="no-data">Chưa có dữ liệu</td></tr>`;
      return;
    }
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${escapeHtml(item.title)}</td>
          <td>${escapeHtml(item.author)}</td>
          <td>${escapeHtml(item.publisher)}</td>
          <td>${item.year}</td>
          <td>${item.quantity}</td>
          <td class="action-icons"><button class="btn-edit" data-id="${item.id}" data-type="book">Sửa</button> <button class="btn-delete" data-id="${item.id}" data-type="book">Xóa</button></td>
        </tr>`;
    });
    attachEditDeleteEvents('book');
  }

  function renderPaymentTable(data = paymentData) {
    const tbody = document.querySelector('#paymentTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="no-data">Chưa có dữ liệu</td></tr>`;
      return;
    }
    data.forEach(item => {
      const statusClass = item.status === 'Đã thanh toán' ? 'status-paid' : 'status-unpaid';
      const typeColor = getTypeColor(item.type);
      const isUnpaid = item.status === 'Chưa thanh toán';
      
      let actionButtons = '';
      if (isUnpaid) {
        actionButtons = `
          <button class="btn-confirm" onclick="openConfirmPaymentModal('${item.id}', '${escapeHtml(item.readerName)}', '${item.amount}')">✓ Xác nhận</button>
          <button class="btn-cancel-payment" onclick="openCancelPaymentModal('${item.id}', '${escapeHtml(item.readerName)}', '${item.amount}')">✕ Hủy</button>
          <button class="btn-export" onclick="openExportInvoiceModal('${item.id}')">📄 Xuất</button>
        `;
      } else {
        actionButtons = `
          <button class="btn-export" onclick="openExportInvoiceModal('${item.id}')">📄 Xuất</button>
          <button class="btn-delete" data-id="${item.id}" data-type="payment">Xóa</button>
        `;
      }
      
      tbody.innerHTML += `
        <tr>
          <td><strong>${item.id}</strong></td>
          <td>${escapeHtml(item.readerName)}</td>
          <td>${item.date}</td>
          <td><span class="type-badge" style="background: ${typeColor};">${escapeHtml(item.type)}</span></td>
          <td>${escapeHtml(item.description)}</td>
          <td><strong>${item.amount.toLocaleString('vi-VN')} ₫</strong></td>
          <td><span class="status-badge ${statusClass}">${item.status}</span></td>
          <td class="action-icons">${actionButtons}</td>
        </tr>`;
    });
    attachEditDeleteEvents('payment');
  }

  function renderPenaltyTable(data = penaltyData) {
    const tbody = document.querySelector('#penaltyTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="no-data">Chưa có dữ liệu</td></tr>`;
      return;
    }
    
    data.forEach(item => {
      const violationColor = getViolationColor(item.violationType);
      const statusClass = item.status === 'Đã xử lý' ? 'status-completed' : 'status-pending';
      const lockStatus = item.accountLocked ? '<span class="lock-badge"><i class="fa-solid fa-lock"></i> Khóa</span>' : '<span class="unlock-badge"><i class="fa-solid fa-unlock"></i> Mở</span>';
      
      tbody.innerHTML += `
        <tr>
          <td><strong>${item.id}</strong></td>
          <td>${escapeHtml(item.readerName)}</td>
          <td><span class="violation-badge" style="background: ${violationColor};">${escapeHtml(item.violationType)}</span></td>
          <td title="${escapeHtml(item.description)}">${escapeHtml(item.description.substring(0, 30))}...</td>
          <td><strong>${item.amount.toLocaleString('vi-VN')} ${item.unit}</strong></td>
          <td><span class="status-badge ${statusClass}">${item.status}</span></td>
          <td>${lockStatus}</td>
          <td class="action-icons">
            <button class="btn-edit" data-id="${item.id}" data-type="penalty">Chi tiết</button>
            ${item.status !== 'Đã xử lý' ? `<button class="btn-reduce" onclick="openReducePenaltyModal('${item.id}')">Giảm</button>` : ''}

            ${item.status !== 'Đã xử lý' && item.accountLocked ? `<button class="btn-unlock" onclick="toggleAccountLock('${item.id}', false)">Mở khóa</button>` : ''}
            ${item.status === 'Tạm hoãn' && !item.accountLocked ? `<button class="btn-lock" onclick="toggleAccountLock('${item.id}', true)">Khóa</button>` : ''}
            <button class="btn-delete" data-id="${item.id}" data-type="penalty">Xóa</button>
          </td>
        </tr>`;
    });
    attachEditDeleteEvents('penalty');
  }

  function getViolationColor(type) {
    const colors = {
      'Quá hạn': '#e74c3c',
      'Mất sách': '#c0392b',
      'Làm hỏng': '#e67e22',
      'Vi phạm nội quy': '#f39c12'
    };
    return colors[type] || '#95a5a6';
  }

  function openReducePenaltyModal(penaltyId) {
    const penalty = penaltyData.find(p => p.id === penaltyId);
    if (penalty) {
      document.getElementById('reducePenaltyId').value = penalty.id;
      document.getElementById('reducePenaltyCurrentAmount').value = penalty.amount.toLocaleString('vi-VN') + ' ' + penalty.unit;
      document.getElementById('reducePenaltyNewAmount').value = penalty.amount;
      openModal('reducePenaltyModal');
    }
  }



  function toggleAccountLock(penaltyId, shouldLock) {
    const penalty = penaltyData.find(p => p.id === penaltyId);
    if (penalty) {
      penalty.accountLocked = shouldLock;
      const action = shouldLock ? 'khóa' : 'mở khóa';
      Swal.fire({
        title: 'Thành công!',
        text: `Đã ${action} tài khoản ${penalty.readerName}`,
        icon: 'success',
        timer: 1500
      });
      renderPenaltyTable();
    }
  }

  function getTypeColor(type) {
    const colors = {
      'Phạt quá hạn': '#e74c3c',
      'Mất sách': '#e67e22',
      'Hỏng sách': '#f39c12',
      'Cấp thẻ': '#3498db',
      'Gia hạn thẻ': '#2ecc71',
      'Photocopy': '#9b59b6',
      'Phòng học nhóm': '#1abc9c',
      'Phí dịch vụ': '#34495e',
      'Phí photocopy': '#9b59b6'
    };
    return colors[type] || '#95a5a6';
  }

  function renderShiftTable(data = shiftData) {
    const tbody = document.querySelector('#shiftTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="no-data">Chưa có dữ liệu</td></tr>`;
      return;
    }
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${escapeHtml(item.empName)}</td>
          <td>${item.date}</td>
          <td>${item.start}</td>
          <td>${item.end}</td>
          <td>${item.status}</td>
          <td class="action-icons"><button class="btn-edit" data-id="${item.id}" data-type="shift">Sửa</button> <button class="btn-delete" data-id="${item.id}" data-type="shift">Xóa</button></td>
        </tr>`;
    });
    attachEditDeleteEvents('shift');
  }

  function renderAttendanceTable(data = attendanceData) {
    const tbody = document.querySelector('#attendanceTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="no-data">Chưa có dữ liệu</td></tr>`;
      return;
    }
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${escapeHtml(item.empName)}</td>
          <td>${item.date}</td>
          <td>${item.checkIn || ''}</td>
          <td>${item.checkOut || ''}</td>
          <td>${item.status}</td>
          <td class="action-icons"><button class="btn-edit" data-id="${item.id}" data-type="attendance">Sửa</button> <button class="btn-delete" data-id="${item.id}" data-type="attendance">Xóa</button></td>
        </tr>`;
    });
    attachEditDeleteEvents('attendance');
  }

  function deleteRecord(type, id) {
    if (!confirm('Bạn có chắc chắn muốn xóa mục này?')) return;
    switch(type) {
      case 'borrow': borrowData = borrowData.filter(x => x.id !== id); renderBorrowTable(); break;
      case 'card': readerCardData = readerCardData.filter(x => x.id !== id); renderReaderCardTable(); break;
      case 'book': booksData = booksData.filter(x => x.id !== id); renderBookTable(); break;
      case 'payment': paymentData = paymentData.filter(x => x.id !== id); renderPaymentTable(); break;
      case 'shift': shiftData = shiftData.filter(x => x.id !== id); renderShiftTable(); break;
      case 'attendance': attendanceData = attendanceData.filter(x => x.id !== id); renderAttendanceTable(); break;
    }
  }

  function attachEditDeleteEvents(type) {
    document.querySelectorAll(`[data-type="${type}"]`).forEach(btn => {
      if (btn.classList.contains('btn-delete')) {
        btn.onclick = function() {
          const id = btn.getAttribute('data-id');
          deleteRecord(type, id);
        };
      }
      if (btn.classList.contains('btn-edit')) {
        btn.onclick = function() {
          const id = btn.getAttribute('data-id');
          let data;
          switch(type) {
            case 'borrow': data = borrowData.find(x => x.id === id); break;
            case 'card': data = readerCardData.find(x => x.id === id); break;
            case 'book': data = booksData.find(x => x.id === id); break;
            case 'payment': data = paymentData.find(x => x.id === id); break;
            case 'shift': data = shiftData.find(x => x.id === id); break;
            case 'attendance': data = attendanceData.find(x => x.id === id); break;
          }
          if (!data) { alert('Không tìm thấy bản ghi'); return; }
          
          // Map type to modal ID and populate form
          const modalMap = { borrow: 'borrowModal', card: 'readerCardModal', book: 'bookModal', payment: 'paymentModal', shift: 'shiftModal', attendance: 'attendanceModal' };
          openModal(modalMap[type]);
        };
      }
    });
  }

  function handleFormSubmit(event, type) {
    event.preventDefault();
    if (type === 'reader') return; // existing handler manages reader creation

    if (type === 'employee') {
      const name = document.getElementById('empName').value.trim();
      const role = document.getElementById('empRole').value;
      const shift = document.getElementById('empShift').value;
      const newEmp = { id: 'EMP_' + Date.now(), userName: name.replace(/\s+/g,'').toLowerCase(), fullName: name, email: '', phoneNum: '', roleId: '2', createAt: new Date().toISOString().split('T')[0], shift };
      employeesData.push(newEmp);
      try{ closeModal('employeeModal'); }catch(e){}
      renderEmployeeTable(); updateDashboardStats(); alert('Thêm nhân sự thành công');
      return;
    }

    if (type === 'borrow') {
      const readerId = document.getElementById('borrowReaderId').value.trim();
      const bookId = document.getElementById('borrowBookId').value.trim();
      const borrowDate = document.getElementById('borrowDate').value;
      const dueDate = document.getElementById('dueDate').value;
      borrowData.push({ id: 'B' + Date.now(), readerId, readerName: (readersData.find(r=>r.id===readerId)||{}).fullName || '', bookTitle: bookId, borrowDate, dueDate, status: 'Đang mượn' });
      try{ closeModal('borrowModal'); }catch(e){}
      renderBorrowTable(); alert('Tạo phiếu mượn thành công');
      return;
    }

    if (type === 'readerCard') {
      const readerId = document.getElementById('cardReaderId').value.trim();
      const issue = document.getElementById('cardIssueDate').value;
      const expire = document.getElementById('cardExpireDate').value;
      readerCardData.push({ id: 'C' + Date.now(), readerId, readerName: (readersData.find(r=>r.id===readerId)||{}).fullName || '', issueDate: issue, expireDate: expire, status: 'Hoạt động' });
      try{ closeModal('readerCardModal'); }catch(e){}
      renderReaderCardTable(); alert('Cấp thẻ thành công');
      return;
    }

    if (type === 'book') {
      const title = document.getElementById('bookTitle').value.trim();
      const author = document.getElementById('bookAuthor').value.trim();
      const publisher = document.getElementById('bookPublisher').value.trim();
      const year = document.getElementById('bookYear').value;
      const qty = document.getElementById('bookQuantity').value;
      booksData.push({ id: 'BK' + Date.now(), title, author, publisher, year: parseInt(year,10), quantity: parseInt(qty,10) });
      try{ closeModal('bookModal'); }catch(e){}
      renderBookTable(); alert('Thêm sách thành công');
      return;
    }

    if (type === 'payment') {
      const readerId = document.getElementById('paymentReaderId').value.trim();
      const date = document.getElementById('paymentDate').value;
      const paymentType = document.getElementById('paymentType').value.trim();
      const description = document.getElementById('paymentDescription').value.trim();
      const amount = document.getElementById('paymentAmount').value;
      const method = document.getElementById('paymentMethod').value.trim();
      const status = amount > 0 ? 'Đã thanh toán' : 'Chưa thanh toán';
      
      paymentData.push({ 
        id: 'P' + Date.now(), 
        readerId, 
        readerName: (readersData.find(r=>r.id===readerId)||{}).fullName || '', 
        date, 
        type: paymentType,
        description: description,
        amount: parseFloat(amount), 
        method: method,
        status: status
      });
      try{ closeModal('paymentModal'); }catch(e){}
      renderPaymentTable(); 
      Swal.fire({ icon: 'success', title: 'Thành công!', text: 'Thêm hóa đơn thành công', timer: 1500 });
      return;
    }

    if (type === 'shift') {
      const empId = document.getElementById('shiftEmpId').value.trim();
      const date = document.getElementById('shiftDate').value;
      const start = document.getElementById('shiftStart').value;
      const end = document.getElementById('shiftEnd').value;
      shiftData.push({ id: 'S' + Date.now(), empId, empName: (employeesData.find(e=>e.id===empId)||{}).fullName || '', date, start, end, status: 'Mới' });
      try{ closeModal('shiftModal'); }catch(e){}
      renderShiftTable(); alert('Tạo ca làm thành công');
      return;
    }

    if (type === 'attendance') {
      const empId = document.getElementById('attendanceEmpId').value.trim();
      const date = document.getElementById('attendanceDate').value;
      const inTime = document.getElementById('attendanceCheckIn').value;
      const outTime = document.getElementById('attendanceCheckOut').value;
      attendanceData.push({ id: 'A' + Date.now(), empId, empName: (employeesData.find(e=>e.id===empId)||{}).fullName || '', date, checkIn: inTime, checkOut: outTime, status: 'Có mặt' });
      try{ closeModal('attendanceModal'); }catch(e){}
      renderAttendanceTable(); alert('Chấm công thành công');
      return;
    }

    if (type === 'penalty') {
      const penaltyType = document.getElementById('penaltyType').value;
      const readerId = document.getElementById('penaltyReaderId').value.trim();
      const violationType = document.getElementById('penaltyViolationType').value;
      const description = document.getElementById('penaltyDescription').value.trim();
      const amount = parseFloat(document.getElementById('penaltyAmount').value) || 0;
      
      if (!readerId || !violationType || !description || amount <= 0) {
        alert('Vui lòng điền đầy đủ thông tin phiếu phạt');
        return;
      }
      
      const readerName = (readersData.find(r=>r.id===readerId)||{}).fullName || '';
      const newPenalty = {
        id: 'PEN' + Date.now(),
        readerId,
        readerName,
        violationType,
        description,
        amount,
        unit: 'đồng',
        status: 'Chưa thanh toán',
        createdDate: new Date().toISOString().split('T')[0],
        accountLocked: violationType === 'Mất sách' || amount > 200000, // Tự động khóa nếu mất sách hoặc phạt >200k
        notes: ''
      };
      
      penaltyData.push(newPenalty);
      try{ closeModal('penaltyModal'); }catch(e){}
      document.getElementById('penaltyType').value = '';
      document.getElementById('penaltyReaderId').value = '';
      document.getElementById('penaltyViolationType').value = '';
      document.getElementById('penaltyDescription').value = '';
      document.getElementById('penaltyAmount').value = '';
      renderPenaltyTable();
      Swal.fire({ icon: 'success', title: 'Thành công!', text: 'Thêm phiếu phạt cho ' + readerName, timer: 1500 });
      return;
    }

    if (type === 'reducePenalty') {
      const penaltyId = document.getElementById('reducePenaltyId').value;
      const newAmount = parseFloat(document.getElementById('reducePenaltyNewAmount').value) || 0;
      const reason = document.getElementById('reducePenaltyReason').value.trim();
      
      const penaltyIndex = penaltyData.findIndex(p => p.id === penaltyId);
      if (penaltyIndex !== -1) {
        const penalty = penaltyData[penaltyIndex];
        const oldAmount = penalty.amount;
        penalty.amount = newAmount;
        penalty.notes = reason;
        
        try{ closeModal('reducePenaltyModal'); }catch(e){}
        renderPenaltyTable();
        Swal.fire({ 
          icon: 'success', 
          title: 'Giảm phạt thành công!', 
          text: `Từ ${oldAmount.toLocaleString('vi-VN')} đ giảm còn ${newAmount.toLocaleString('vi-VN')} đ`, 
          timer: 1500 
        });
      }
      return;
    }


  }

// --- 5. XỬ LÝ XÓA VÀ CẬP NHẬT ---

function deleteItem(type, id) {
  if (!confirm("Bạn có chắc chắn muốn xóa mục này?")) return;

  if (type === "reader") readersData = readersData.filter((x) => x.id !== id);
  if (type === "employee")
    employeesData = employeesData.filter((x) => x.id !== id);
  if (type === "penalty")
    penaltyData = penaltyData.filter((x) => x.id !== id);
  if (type === "payment")
    paymentData = paymentData.filter((x) => x.id !== id);
  if (type === "borrow")
    borrowData = borrowData.filter((x) => x.id !== id);
  if (type === "book")
    booksData = booksData.filter((x) => x.id !== id);
  if (type === "shift")
    shiftData = shiftData.filter((x) => x.id !== id);
  if (type === "card")
    readerCardData = readerCardData.filter((x) => x.id !== id);
  if (type === "attendance")
    attendanceData = attendanceData.filter((x) => x.id !== id);

  renderAllTables();
  updateDashboardStats();
}

// --- 6. UTILITIES (MODAL & TAB) ---
function switchTab(tabId, element) {
  document
    .querySelectorAll(".section-content")
    .forEach((sec) => sec.classList.remove("active"));
  document
    .querySelectorAll(".menu-item")
    .forEach((item) => item.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  if (element) element.classList.add("active");
}

function openModal(modalId) {
  if (modalId === 'penaltyModal') {
    populateReaderSelect();
  }
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// --- PAYMENT MANAGEMENT NEW FUNCTIONS ---

// 1. Search Payment
function searchPayments() {
  const searchTerm = document.getElementById('paymentSearch').value.toLowerCase();
  const filteredData = paymentData.filter(item => 
    item.readerName.toLowerCase().includes(searchTerm) || 
    item.type.toLowerCase().includes(searchTerm) ||
    item.id.toLowerCase().includes(searchTerm)
  );
  renderPaymentTable(filteredData);
}

// helper to escape html when inserting into title attribute
function escapeHtml(str) {
  return String(str).replace(/[&<>\"']/g, function (s) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[s];
  });
}

// --- PAYMENT MANAGEMENT NEW FUNCTIONS ---

// 1. Search Payment
function searchPayments() {
  const searchTerm = document.getElementById('paymentSearch').value.toLowerCase();
  const filteredData = paymentData.filter(item => 
    item.readerName.toLowerCase().includes(searchTerm) || 
    item.type.toLowerCase().includes(searchTerm) ||
    item.id.toLowerCase().includes(searchTerm)
  );
  renderPaymentTable(filteredData);
}

// 2. Confirm Payment - Open Modal
function openConfirmPaymentModal(paymentId, readerName, amount) {
  document.getElementById('confirmPaymentId').innerText = paymentId;
  document.getElementById('confirmReaderName').innerText = readerName;
  document.getElementById('confirmAmount').innerText = amount.toLocaleString('vi-VN') + ' ₫';
  document.getElementById('confirmPaymentModal').dataset.paymentId = paymentId;
  openModal('confirmPaymentModal');
}

// Execute Confirm Payment
function executeConfirmPayment() {
  const paymentId = document.getElementById('confirmPaymentModal').dataset.paymentId;
  const paymentIndex = paymentData.findIndex(p => p.id === paymentId);
  if (paymentIndex !== -1) {
    paymentData[paymentIndex].status = 'Đã thanh toán';
    closeModal('confirmPaymentModal');
    renderPaymentTable();
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Xác nhận thanh toán thành công',
      timer: 1500
    });
  }
}

// 3. Cancel Payment - Open Modal
function openCancelPaymentModal(paymentId, readerName, amount) {
  document.getElementById('cancelPaymentId').innerText = paymentId;
  document.getElementById('cancelReaderName').innerText = readerName;
  document.getElementById('cancelAmount').innerText = amount.toLocaleString('vi-VN') + ' ₫';
  document.getElementById('cancelReason').value = '';
  document.getElementById('cancelPaymentModal').dataset.paymentId = paymentId;
  openModal('cancelPaymentModal');
}

// Execute Cancel Payment
function executeCancelPayment(event) {
  event.preventDefault();
  const paymentId = document.getElementById('cancelPaymentModal').dataset.paymentId;
  const reason = document.getElementById('cancelReason').value.trim();
  
  const paymentIndex = paymentData.findIndex(p => p.id === paymentId);
  if (paymentIndex !== -1 && reason) {
    paymentData.splice(paymentIndex, 1);
    closeModal('cancelPaymentModal');
    renderPaymentTable();
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Hủy giao dịch thành công\nLý do: ' + reason,
      timer: 1500
    });
  } else {
    alert('Vui lòng nhập lý do hủy');
  }
}

// 4. Export Invoice - Open Modal
function openExportInvoiceModal(paymentId) {
  const payment = paymentData.find(p => p.id === paymentId);
  if (payment) {
    const invoiceHTML = `
      <div class="invoice-row">
        <span>Mã hóa đơn:</span>
        <span><strong>${payment.id}</strong></span>
      </div>
      <div class="invoice-row">
        <span>Độc giả:</span>
        <span>${escapeHtml(payment.readerName)}</span>
      </div>
      <div class="invoice-row">
        <span>Ngày lập:</span>
        <span>${payment.date}</span>
      </div>
      <div class="invoice-row">
        <span>Loại phí:</span>
        <span>${escapeHtml(payment.type)}</span>
      </div>
      <div class="invoice-row">
        <span>Chi tiết:</span>
        <span>${escapeHtml(payment.description)}</span>
      </div>
      <div class="invoice-row">
        <span>Phương thức:</span>
        <span>${escapeHtml(payment.method)}</span>
      </div>
      <div class="invoice-row" style="border-top: 2px solid #27ae60; padding-top: 10px; margin-top: 10px;">
        <span><strong>Tổng tiền:</strong></span>
        <span><strong>${payment.amount.toLocaleString('vi-VN')} ₫</strong></span>
      </div>
      <div class="invoice-row">
        <span>Trạng thái:</span>
        <span><strong style="color: ${payment.status === 'Đã thanh toán' ? '#27ae60' : '#e74c3c'}">${payment.status}</strong></span>
      </div>
    `;
    document.getElementById('invoiceDetails').innerHTML = invoiceHTML;
    document.getElementById('exportInvoiceModal').dataset.paymentId = paymentId;
    openModal('exportInvoiceModal');
  }
}

// Print Invoice
function printInvoice() {
  const printContent = document.querySelector('.invoice-preview').innerHTML;
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>In Biên Lai</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .invoice-header { text-align: center; margin-bottom: 20px; }
          .invoice-header h2 { margin: 0; color: #27ae60; }
          .invoice-details { margin: 20px 0; }
          .invoice-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .invoice-footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 250);
}

// Download Invoice as PDF
function downloadInvoiceAsPDF() {
  const payment = paymentData.find(p => p.id === document.getElementById('exportInvoiceModal').dataset.paymentId);
  if (payment) {
    let csvContent = "Mã hóa đơn,Độc giả,Ngày lập,Loại phí,Chi tiết,Số tiền,Trạng thái\n";
    csvContent += `${payment.id},${payment.readerName},${payment.date},${payment.type},${payment.description},${payment.amount},${payment.status}`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', `invoice_${payment.id}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Hóa đơn đã được tải xuống',
      timer: 1500
    });
  }
}

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("active");
  }
};
