let readersData = [];

let employeesData = [];
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
  renderEmployeeTable();
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

async function loadReaders() {
  try {
    const res = await fetch("http://localhost:8080/api/users/customers");
    const json = await res.json();

    const data = json?.data?.content ?? json;

    if (!Array.isArray(data)) {
      console.error("Dữ liệu API không phải array:", data);
      return;
    }

    if (data.length === 0) {
      // tbody.innerHTML = `<tr><td colspan="8" class="no-data">Hiện không có Khách hoặc Độc giả nào trong hệ thống</td></tr>`;
      console.error("Không có dữ liệu trong hệ thống");
      return;
    }

    // update the shared readersData and re-render (apply current sort)
    readersData = data;
    applyReaderSortAndRender();
  } catch (err) {
    console.error("loadReaders error:", err);
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
    btn.onclick = async function () {
      const id = btn.getAttribute("data-id");

      if (!confirm("Bạn có chắc chắn muốn xóa không?")) return;

      try {
        const res = await fetch(`http://localhost:8080/api/users/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Xóa thành công!");
          this.closest("tr").remove(); // xoá dòng
        } else {
          alert("Xóa thất bại!");
        }
      } catch (err) {
        console.error(err);
        alert("Lỗi kết nối API");
      }
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
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const roleName = document.getElementById("readerRole").value;
    const convertRole = roleName === "GUEST" ? 8 : 9;

    const payload = {
      userName: document.getElementById("username").value,
      fullName: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      roleId: convertRole,
      phoneNum: document.getElementById("phone").value,
      address: document.getElementById("readerAddress").value,
    };

    try {
      const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Nếu API trả về status 200 hoặc 201 → thành công
      if (res.ok) {
        // close modal, reset form, refresh readers list and stats
        try {
          closeModal("readerModal");
        } catch (e) {}
        const formEl = document.getElementById("formCreateReader");
        if (formEl) formEl.reset();
        // reload latest readers from server and update counts
        await loadReaders();
        updateDashboardStats();
        alert("Tạo thành công!");
      } else {
        alert("Tạo thất bại! Nhập lại dữ liệu.");
      }
      const data = await res.json();
      console.log("API trả về:", data);
    } catch (error) {
      console.error(error);
    }
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

async function loadEmployees() {
  try {
    const res = await fetch("http://localhost:8080/api/users/staffs");
    const json = await res.json();

    // API may return { data: { content: [...] } } or directly return an array
    const data = json?.data?.content ?? json;

    if (!Array.isArray(data)) {
      console.error("Dữ liệu API không phải array:", data);
      return;
    }

    // update the shared readersData and re-render
    employeesData = data;
    renderEmployeeTable(employeesData);
  } catch (err) {
    console.error("loadEmployees error:", err);
  }
}

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
                    <button class="action-btn delete" onclick="deleteItem('employee', '${
                      item.id
                    }')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
  });
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
