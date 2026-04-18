// =====================
// THÔNG BÁO - NOTIFICATION JS
// =====================

// Dữ liệu thông báo
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

// ❌ ĐÃ XÓA TOÀN BỘ THÔNG BÁO MẪU - KHÔNG CÒN TỰ ĐỘNG THÊM NỮA
const defaultNotifications = []; // 👈 Để trống, không có thông báo ảo

// Khởi tạo thông báo - KHÔNG THÊM GÌ CẢ
function initNotifications() {
  // Chỉ khởi tạo mảng rỗng nếu chưa có, KHÔNG thêm thông báo mẫu
  if (!localStorage.getItem("notifications")) {
    localStorage.setItem("notifications", JSON.stringify([]));
    notifications = [];
  }
}

// Cập nhật số lượng thông báo chưa đọc
function updateNotificationBadge() {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const badge = document.getElementById("notification-badge");
  if (badge) {
    if (unreadCount > 0) {
      badge.style.display = "inline-block";
      badge.innerText = unreadCount > 99 ? "99+" : unreadCount;
    } else {
      badge.style.display = "none";
    }
  }
}

// Mở popup thông báo
function openNotifications() {
  const existingPopup = document.querySelector(".notification-popup");
  if (existingPopup) {
    existingPopup.remove();
    return;
  }

  // Đảm bảo notifications luôn là mảng
  if (!notifications) notifications = [];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const popup = document.createElement("div");
  popup.className = "notification-popup";
  popup.innerHTML = `
    <div class="notification-header">
      <h3>📢 Thông báo <span style="font-size: 12px; background: #e67e22; padding: 2px 8px; border-radius: 20px;">${unreadCount} mới</span></h3>
      <div>
        <button class="mark-all-read" onclick="markAllNotificationsRead()">Đánh dấu đã đọc</button>
        <button class="close-notification" onclick="this.closest('.notification-popup').remove()">✕</button>
      </div>
    </div>
    <div class="notification-tabs">
      <button class="tab-btn active" onclick="filterNotifications('all')">Tất cả</button>
      <button class="tab-btn" onclick="filterNotifications('order')">📦 Đơn hàng</button>
      <button class="tab-btn" onclick="filterNotifications('promo')">🎁 Khuyến mãi</button>
    </div>
    <div class="notification-list" id="notification-list"></div>
  `;

  document.body.appendChild(popup);

  // Thêm style cho tabs
  const style = document.createElement("style");
  style.textContent = `
    .notification-tabs {
      display: flex;
      border-bottom: 1px solid #eee;
      background: white;
    }
    .tab-btn {
      flex: 1;
      padding: 10px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.3s;
    }
    .tab-btn.active {
      color: #e67e22;
      border-bottom: 2px solid #e67e22;
    }
    .tab-btn:hover:not(.active) {
      background: #f5f5f5;
    }
    .empty-message {
      text-align: center;
      padding: 40px;
      color: #999;
    }
  `;
  document.head.appendChild(style);

  window.currentFilter = "all";
  renderNotificationList();
  popup.style.display = "flex";

  // Đóng khi bấm ra ngoài
  setTimeout(() => {
    const closeHandler = function (e) {
      if (
        !popup.contains(e.target) &&
        !e.target.closest(".nav-item-box")?.innerText.includes("Thông báo") &&
        !e.target.closest(".nav-item")?.innerText.includes("Thông báo")
      ) {
        popup.remove();
        document.removeEventListener("click", closeHandler);
      }
    };
    document.addEventListener("click", closeHandler);
  }, 100);
}

// Lọc thông báo
function filterNotifications(type) {
  window.currentFilter = type;
  // Cập nhật active tab
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.innerText.includes("Tất cả") && type === "all")
      btn.classList.add("active");
    if (btn.innerText.includes("Đơn hàng") && type === "order")
      btn.classList.add("active");
    if (btn.innerText.includes("Khuyến mãi") && type === "promo")
      btn.classList.add("active");
  });
  renderNotificationList();
}

// Hiển thị danh sách thông báo
function renderNotificationList() {
  const container = document.getElementById("notification-list");
  if (!container) return;

  if (!notifications || notifications.length === 0) {
    container.innerHTML = `
      <div class="empty-message">
        📭 Bạn chưa có thông báo nào<br>
        <span style="font-size: 12px;">Khi đặt hàng thành công, thông báo sẽ hiển thị tại đây</span>
      </div>
    `;
    return;
  }

  let filteredNotis = notifications;
  if (window.currentFilter === "order") {
    filteredNotis = notifications.filter((n) => n.type === "order");
  } else if (window.currentFilter === "promo") {
    filteredNotis = notifications.filter((n) => n.type === "promo");
  }

  if (filteredNotis.length === 0) {
    container.innerHTML = `
      <div class="empty-message">
        📭 Không có thông báo nào trong mục này
      </div>
    `;
    return;
  }

  container.innerHTML = filteredNotis
    .map(
      (noti) => `
    <div class="notification-item ${noti.read ? "" : "unread"}" onclick="markNotificationRead(${noti.id})">
      <div class="title">${noti.title}</div>
      <div class="message">${noti.message}</div>
      <div class="time">${noti.time}</div>
      ${getTypeBadge(noti.type)}
    </div>
  `,
    )
    .join("");
}

// Hiển thị badge theo loại thông báo
function getTypeBadge(type) {
  if (type === "order") {
    return '<div style="margin-top: 5px;"><span style="background: #4b2e2b; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px;">📦 Đơn hàng</span></div>';
  }
  if (type === "promo") {
    return '<div style="margin-top: 5px;"><span style="background: #e67e22; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px;">🎁 Khuyến mãi</span></div>';
  }
  return "";
}

// Đánh dấu một thông báo đã đọc
function markNotificationRead(id) {
  const index = notifications.findIndex((n) => n.id === id);
  if (index !== -1) {
    notifications[index].read = true;
    localStorage.setItem("notifications", JSON.stringify(notifications));
    updateNotificationBadge();
    renderNotificationList();
  }
}

// Đánh dấu tất cả đã đọc
function markAllNotificationsRead() {
  notifications.forEach((n) => (n.read = true));
  localStorage.setItem("notifications", JSON.stringify(notifications));
  updateNotificationBadge();
  renderNotificationList();
}

// ✅ Thêm thông báo mới (CHỈ GỌI KHI CÓ HÀNH ĐỘNG THỰC TẾ)
function addNotification(title, message, type = "promo") {
  if (!notifications) notifications = [];

  const newNoti = {
    id: Date.now(),
    title: title,
    message: message,
    time: new Date().toLocaleString(),
    read: false,
    type: type, // "order" hoặc "promo"
  };
  notifications.unshift(newNoti);

  // Giữ tối đa 50 thông báo
  if (notifications.length > 50) notifications.pop();

  localStorage.setItem("notifications", JSON.stringify(notifications));
  updateNotificationBadge();

  // Nếu popup đang mở, cập nhật lại danh sách
  if (document.querySelector(".notification-popup")) {
    renderNotificationList();
  }
}

// Xóa tất cả thông báo
function clearAllNotifications() {
  notifications = [];
  localStorage.setItem("notifications", JSON.stringify(notifications));
  updateNotificationBadge();
  if (document.querySelector(".notification-popup")) {
    renderNotificationList();
  }
}

// Khởi tạo
initNotifications();
updateNotificationBadge();
