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
    }
  ];

  let readerCardData = [
    { id: 'C001', readerId: 'RDR001', readerName: 'Phạm Minh Đức', issueDate: '2024-01-05', expireDate: '2025-01-05', status: 'Hoạt động' }
  ];

  let booksData = [
    { id: 'BK001', title: 'Lập trình JavaScript', author: 'Nguyễn A', publisher: 'NXB Khoa học', year: 2020, quantity: 5 }
  ];

  let paymentData = [
    { id: 'P001', readerId: 'RDR002', readerName: 'Võ Thị Mai', date: '2024-06-01', amount: 50000, reason: 'Phạt quá hạn', status: 'Đã thanh toán' }
  ];

  let shiftData = [
    { id: 'S001', empId: 'EMP002', empName: 'Trần Thị B', date: '2024-12-01', start: '08:00', end: '12:00', status: 'Xác nhận' }
  ];

  let attendanceData = [
    { id: 'A001', empId: 'EMP002', empName: 'Trần Thị B', date: '2024-12-01', checkIn: '08:05', checkOut: '12:00', status: 'Có mặt' }
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
      tbody.innerHTML = `<tr><td colspan="8" class="no-data">Chưa có dữ liệu</td></tr>`;
      return;
    }
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.readerId}</td>
          <td>${escapeHtml(item.readerName)}</td>
          <td>${escapeHtml(item.bookTitle)}</td>
          <td>${item.borrowDate}</td>
          <td>${item.dueDate}</td>
          <td>${item.status}</td>
          <td class="action-icons"><button class="btn-edit" data-id="${item.id}" data-type="borrow">Sửa</button> <button class="btn-delete" data-id="${item.id}" data-type="borrow">Xóa</button></td>
        </tr>`;
    });
    attachEditDeleteEvents('borrow');
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
      tbody.innerHTML = `<tr><td colspan="7" class="no-data">Chưa có dữ liệu</td></tr>`;
      return;
    }
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${escapeHtml(item.readerName)}</td>
          <td>${item.date}</td>
          <td>${item.amount}</td>
          <td>${escapeHtml(item.reason)}</td>
          <td>${item.status}</td>
          <td class="action-icons"><button class="btn-edit" data-id="${item.id}" data-type="payment">Sửa</button> <button class="btn-delete" data-id="${item.id}" data-type="payment">Xóa</button></td>
        </tr>`;
    });
    attachEditDeleteEvents('payment');
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
      const amount = document.getElementById('paymentAmount').value;
      const reason = document.getElementById('paymentReason').value.trim();
      paymentData.push({ id: 'P' + Date.now(), readerId, readerName: (readersData.find(r=>r.id===readerId)||{}).fullName || '', date, amount: parseFloat(amount), reason, status: 'Chưa thanh toán' });
      try{ closeModal('paymentModal'); }catch(e){}
      renderPaymentTable(); alert('Thêm hóa đơn thành công');
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
  }

// --- 5. XỬ LÝ XÓA VÀ CẬP NHẬT ---

function deleteItem(type, id) {
  if (!confirm("Bạn có chắc chắn muốn xóa mục này?")) return;

  if (type === "reader") readersData = readersData.filter((x) => x.id !== id);
  if (type === "employee")
    employeesData = employeesData.filter((x) => x.id !== id);

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
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
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

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("active");
  }
};
