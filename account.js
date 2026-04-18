// =====================
// TÀI KHOẢN NGƯỜI DÙNG - ACCOUNT JS
// =====================

// Lấy thông tin user từ localStorage
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let users = JSON.parse(localStorage.getItem("users")) || [];

// Khởi tạo user mặc định nếu chưa có
function initDefaultUser() {
  if (users.length === 0) {
    users.push(
      {
        id: 1,
        name: "Nguyễn Thị Thu",
        email: "admin@nbreak.com",
        phone: "0338909486",
        password: "123456",
        address: "207 Giải Phóng, Hà Nội",
        role: "user",
      },
      {
        id: 2,
        name: "Quản trị viên",
        email: "owner@nbreak.com",
        phone: "0987654321",
        password: "admin123",
        address: "207 Giải Phóng, Hà Nội",
        role: "admin",
      },
    );
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Cập nhật giao diện theo trạng thái đăng nhập
function updateAccountUI() {
  const accountText = document.getElementById("account-text");
  const dropdownUsername = document.getElementById("dropdown-username");
  const dropdownEmail = document.getElementById("dropdown-email");
  const loginLogoutText = document.getElementById("login-logout-text");
  const loginLogoutBtn = document.getElementById("login-logout-btn");

  // Cập nhật currentUser từ localStorage
  currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  if (currentUser) {
    // Hiển thị tên đầy đủ
    let displayName = currentUser.name || currentUser.email;
    if (displayName.length > 15) {
      displayName = displayName.substring(0, 12) + "...";
    }
    if (accountText) accountText.innerText = displayName;
    if (dropdownUsername) dropdownUsername.innerText = currentUser.name;
    if (dropdownEmail) dropdownEmail.innerText = currentUser.email;
    if (loginLogoutText)
      loginLogoutText.innerHTML =
        '<i class="fa-solid fa-right-from-bracket"></i> Đăng xuất';
    if (loginLogoutBtn) {
      loginLogoutBtn.onclick = (e) => {
        e.preventDefault();
        logout();
      };
    }

    // Thêm link admin nếu là admin
    const adminLink = document.getElementById("admin-link");
    if (currentUser.role === "admin" && !adminLink) {
      const newAdminLink = document.createElement("a");
      newAdminLink.id = "admin-link";
      newAdminLink.href = "admin.html";
      newAdminLink.innerHTML =
        '<i class="fa-solid fa-shield-haltered"></i> Quản trị hệ thống';
      const dropdownDivider = document.querySelector(
        "#account-dropdown .dropdown-divider",
      );
      const loginBtn = document.getElementById("login-logout-btn");
      if (dropdownDivider && loginBtn) {
        dropdownDivider.parentNode.insertBefore(newAdminLink, loginBtn);
      }
    } else if (currentUser.role !== "admin" && adminLink) {
      adminLink.remove();
    }
  } else {
    if (accountText) accountText.innerText = "Tài khoản";
    if (dropdownUsername) dropdownUsername.innerText = "Khách hàng";
    if (dropdownEmail) dropdownEmail.innerText = "Chưa đăng nhập";
    if (loginLogoutText)
      loginLogoutText.innerHTML =
        '<i class="fa-solid fa-right-to-bracket"></i> Đăng nhập';
    if (loginLogoutBtn) {
      loginLogoutBtn.onclick = (e) => {
        e.preventDefault();
        openAuthModal();
      };
    }
    const adminLink = document.getElementById("admin-link");
    if (adminLink) adminLink.remove();
  }
}

// Mở/đóng dropdown tài khoản
function toggleAccountMenu() {
  const dropdown = document.getElementById("account-dropdown");
  if (dropdown) {
    dropdown.classList.toggle("show");
  }
}

// Mở popup đăng nhập/đăng ký
function openAuthModal() {
  const authPopup = document.getElementById("auth-popup");
  if (authPopup) {
    authPopup.style.display = "flex";
    showLoginForm();
  } else {
    window.location.href = "dang_ky.html";
  }
}

function openAuthPopup() {
  openAuthModal();
}

function closeAuthPopup() {
  const authPopup = document.getElementById("auth-popup");
  if (authPopup) {
    authPopup.style.display = "none";
  }
}

function showLoginForm() {
  const loginForm = document.getElementById("auth-login-form");
  const registerForm = document.getElementById("auth-register-form");
  const forgotForm = document.getElementById("auth-forgot-form");
  if (loginForm) loginForm.style.display = "block";
  if (registerForm) registerForm.style.display = "none";
  if (forgotForm) forgotForm.style.display = "none";
}

function showRegisterForm() {
  const loginForm = document.getElementById("auth-login-form");
  const registerForm = document.getElementById("auth-register-form");
  const forgotForm = document.getElementById("auth-forgot-form");
  if (loginForm) loginForm.style.display = "none";
  if (registerForm) registerForm.style.display = "block";
  if (forgotForm) forgotForm.style.display = "none";
}

function showForgotForm() {
  const loginForm = document.getElementById("auth-login-form");
  const registerForm = document.getElementById("auth-register-form");
  const forgotForm = document.getElementById("auth-forgot-form");
  if (loginForm) loginForm.style.display = "none";
  if (registerForm) registerForm.style.display = "none";
  if (forgotForm) forgotForm.style.display = "block";
}

// Đăng nhập
function doLogin() {
  const email = document.getElementById("login-email")?.value;
  const password = document.getElementById("login-password")?.value;

  if (!email || !password) {
    showToast("⚠️ Vui lòng nhập email và mật khẩu!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    currentUser = user;
    updateAccountUI();
    closeAuthPopup();
    showToast(`✅ Chào mừng ${user.name} quay trở lại!`);

    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";

    if (typeof updateCartCount === "function") updateCartCount();
  } else {
    showToast("❌ Email hoặc mật khẩu không đúng!");
  }
}

// Đăng ký
function doRegister() {
  const name = document.getElementById("register-name")?.value;
  const email = document.getElementById("register-email")?.value;
  const phone = document.getElementById("register-phone")?.value;
  const password = document.getElementById("register-password")?.value;
  const confirm = document.getElementById("register-confirm")?.value;

  if (!name || !email || !phone || !password) {
    showToast("⚠️ Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (password !== confirm) {
    showToast("⚠️ Mật khẩu xác nhận không khớp!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find((u) => u.email === email)) {
    showToast("❌ Email đã được đăng ký!");
    return;
  }

  const newUser = {
    id: Date.now(),
    name: name,
    email: email,
    phone: phone,
    password: password,
    address: "",
    role: "user",
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  currentUser = newUser;

  updateAccountUI();
  closeAuthPopup();
  showToast(`🎉 Chúc mừng ${name} đã đăng ký thành công!`);

  document.getElementById("register-name").value = "";
  document.getElementById("register-email").value = "";
  document.getElementById("register-phone").value = "";
  document.getElementById("register-password").value = "";
  document.getElementById("register-confirm").value = "";

  if (typeof updateCartCount === "function") updateCartCount();
}

// Quên mật khẩu
function doForgotPassword() {
  const email = document.getElementById("forgot-email")?.value;

  if (!email) {
    showToast("⚠️ Vui lòng nhập email!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex !== -1) {
    const newPassword = Math.random().toString(36).slice(-8);
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    showToast(
      `📧 Mật khẩu mới của bạn là: ${newPassword}\nVui lòng đăng nhập lại!`,
      5000,
    );
    document.getElementById("forgot-email").value = "";
    showLoginForm();
  } else {
    showToast("❌ Email không tồn tại trong hệ thống!");
  }
}

// Đăng xuất
function logout() {
  const confirmPopup = document.createElement("div");
  confirmPopup.className = "popup";
  confirmPopup.style.display = "flex";
  confirmPopup.style.zIndex = "10002";
  confirmPopup.innerHTML = `
    <div class="popup-content" style="max-width: 350px; text-align: center;">
      <h3 style="color: #4b2e2b;">🔓 Xác nhận đăng xuất</h3>
      <p style="margin: 20px 0;">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?</p>
      <div style="display: flex; gap: 15px; justify-content: center;">
        <button onclick="confirmLogoutAction()" style="background: #4b2e2b; color: white; border: none; padding: 8px 25px; border-radius: 8px; cursor: pointer;">Đăng xuất</button>
        <button onclick="this.closest('.popup').remove()" style="background: #ccc; color: #333; border: none; padding: 8px 25px; border-radius: 8px; cursor: pointer;">Quay lại</button>
      </div>
    </div>
  `;
  document.body.appendChild(confirmPopup);

  confirmPopup.onclick = function (e) {
    if (e.target === confirmPopup) confirmPopup.remove();
  };
}

function confirmLogoutAction() {
  const confirmPopup = document.querySelector(
    ".popup:has(button[onclick='confirmLogoutAction()'])",
  );
  if (confirmPopup) confirmPopup.remove();

  localStorage.removeItem("currentUser");
  currentUser = null;
  updateAccountUI();
  showToast("👋 Đã đăng xuất! Hẹn gặp lại bạn sau.");

  const dropdown = document.getElementById("account-dropdown");
  if (dropdown) dropdown.classList.remove("show");

  location.reload();
}

function handleLoginLogout() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    logout();
  } else {
    openAuthModal();
  }
}

// =====================
// THÔNG TIN CÁ NHÂN (ĐÃ SỬA)
// =====================
function openProfile() {
  console.log("openProfile được gọi");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    showToast("🔐 Vui lòng đăng nhập để xem thông tin cá nhân!");
    openAuthModal();
    return;
  }

  const nameInput = document.getElementById("profile-name");
  const emailInput = document.getElementById("profile-email");
  const phoneInput = document.getElementById("profile-phone");
  const addressInput = document.getElementById("profile-address");
  const profilePopup = document.getElementById("profile-popup");

  if (!nameInput || !emailInput || !phoneInput || !addressInput) {
    console.error("Không tìm thấy các input trong profile popup!");
    showToast("Lỗi: Không tìm thấy form thông tin cá nhân!");
    return;
  }

  if (!profilePopup) {
    console.error("Không tìm thấy profile-popup!");
    showToast("Lỗi: Không tìm thấy popup!");
    return;
  }

  nameInput.value = currentUser.name || "";
  emailInput.value = currentUser.email || "";
  phoneInput.value = currentUser.phone || "";
  addressInput.value = currentUser.address || "";

  profilePopup.style.display = "flex";
  console.log("Profile popup đã hiển thị");
}

function closeProfilePopup() {
  const profilePopup = document.getElementById("profile-popup");
  if (profilePopup) {
    profilePopup.style.display = "none";
  }
}

function saveProfile() {
  console.log("saveProfile được gọi");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    showToast("Vui lòng đăng nhập!");
    openAuthModal();
    return;
  }

  const newName = document.getElementById("profile-name")?.value;
  const newPhone = document.getElementById("profile-phone")?.value;
  const newAddress = document.getElementById("profile-address")?.value;

  if (!newName) {
    showToast("Vui lòng nhập họ tên!");
    return;
  }

  currentUser.name = newName;
  currentUser.phone = newPhone;
  currentUser.address = newAddress;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((u) => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].name = newName;
    users[userIndex].phone = newPhone;
    users[userIndex].address = newAddress;
    localStorage.setItem("users", JSON.stringify(users));
  }

  updateAccountUI();
  closeProfilePopup();
  showToast("✅ Đã cập nhật thông tin cá nhân!");

  setTimeout(() => {
    location.reload();
  }, 1000);
}

// =====================
// ĐƠN MUA - LỊCH SỬ ĐƠN HÀNG
// =====================
function openOrderHistory() {
  console.log("openOrderHistory được gọi");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    showToast("🔐 Vui lòng đăng nhập để xem lịch sử đơn hàng!");
    openAuthModal();
    return;
  }

  window.location.href = "history.html";
}

// Cập nhật lịch sử đơn hàng
function updateOrderHistory() {
  console.log("Cập nhật lịch sử đơn hàng...");

  let orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    let userOrders = orders.filter(
      (order) => order.userEmail === currentUser.email,
    );
    console.log("Số đơn hàng của user:", userOrders.length);

    const orderCountSpan = document.getElementById("order-count");
    if (orderCountSpan) {
      orderCountSpan.innerText = userOrders.length;
    }
  }
}

// Lưu đơn hàng vào lịch sử
function saveOrderToHistory(orderInfo) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

  const newOrder = {
    id: Date.now().toString().slice(-8),
    date: new Date().toLocaleString(),
    total: orderInfo.total,
    items: orderInfo.items,
    status: "pending",
    customer: orderInfo.customer,
    userEmail: currentUser ? currentUser.email : null,
  };

  orderHistory.unshift(newOrder);
  if (orderHistory.length > 50) orderHistory.pop();
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

  if (typeof addNotification === "function") {
    addNotification(
      "✅ Đặt hàng thành công!",
      `Đơn hàng #${newOrder.id} đã được xác nhận. Tổng tiền: ${newOrder.total.toLocaleString()}đ`,
      "order",
    );
  }

  console.log("Đã lưu đơn hàng:", newOrder);
}

// =====================
// THÔNG BÁO
// =====================
function showToast(msg, duration = 3000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText =
      "position:fixed;top:100px;right:20px;z-index:10000;";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.style.cssText =
    "background:#10b981; color:white; padding:12px 20px; border-radius:8px; margin-top:5px; box-shadow:0 2px 10px rgba(0,0,0,0.1);";
  toast.innerText = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// =====================
// ĐÓNG POPUP KHI BẤM RA NGOÀI
// =====================
document.addEventListener("click", function (e) {
  const authPopup = document.getElementById("auth-popup");
  const profilePopup = document.getElementById("profile-popup");
  const dropdown = document.getElementById("account-dropdown");
  const accountBtn = document.getElementById("account-btn");

  if (authPopup && e.target === authPopup) closeAuthPopup();
  if (profilePopup && e.target === profilePopup) closeProfilePopup();
  if (
    dropdown &&
    accountBtn &&
    !accountBtn.contains(e.target) &&
    !dropdown.contains(e.target)
  ) {
    dropdown.classList.remove("show");
  }
});

// =====================
// KHỞI TẠO
// =====================
initDefaultUser();
updateAccountUI();
updateOrderHistory();

// =====================
// XỬ LÝ KHI CHUYỂN TRANG
// =====================
document.addEventListener("DOMContentLoaded", function () {
  updateOrderHistory();
  updateAccountUI();
});
