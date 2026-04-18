// =====================
// HỆ THỐNG VOUCHER - VOUCHER.JS
// =====================

// Danh sách voucher có sẵn
let availableVouchers =
  JSON.parse(localStorage.getItem("availableVouchers")) || [];

// Lịch sử đơn hàng của user
let userOrderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Hàm hiển thị thông báo (nếu chưa có)
function showVoucherToast(msg, isError = false) {
  // Kiểm tra xem đã có hàm showToast chưa
  if (typeof window.showToast === "function") {
    window.showToast(msg, isError);
  } else {
    // Tạo toast tạm thời
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.style.cssText =
        "position:fixed;top:100px;right:20px;z-index:10000;";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.style.cssText = `background:${isError ? "#e74c3c" : "#10b981"}; color:white; padding:12px 20px; border-radius:8px; margin-top:5px; box-shadow:0 2px 10px rgba(0,0,0,0.1);`;
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}

// Hàm đếm số lần mua của user hiện tại
function getUserPurchaseCount() {
  // Cập nhật dữ liệu mới nhất
  userOrderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
  currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  if (!currentUser) return 0;
  return userOrderHistory.filter(
    (order) => order.userEmail === currentUser.email,
  ).length;
}

// Hàm kiểm tra voucher theo số lượng sản phẩm
function getQuantityVoucher(cartItems) {
  if (!cartItems || cartItems.length === 0) return null;

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  if (totalQuantity >= 5) {
    return {
      id: "bulk_5",
      name: "🎁 Mua nhiều giảm giá",
      description: "Giảm 10% cho đơn hàng từ 5 sản phẩm",
      discount: 10,
      type: "percentage",
      minQuantity: 5,
    };
  }
  return null;
}

// Hàm kiểm tra voucher khách hàng thân thiết
function getLoyaltyVoucher() {
  const purchaseCount = getUserPurchaseCount();

  if (purchaseCount >= 10) {
    return {
      id: "loyalty_10",
      name: "👑 Khách hàng thân thiết",
      description: "Giảm 20% cho đơn hàng này",
      discount: 20,
      type: "percentage",
      minOrders: 10,
    };
  } else if (purchaseCount >= 5) {
    return {
      id: "loyalty_5",
      name: "⭐ Khách hàng trung thành",
      description: "Giảm 10% cho đơn hàng này",
      discount: 10,
      type: "percentage",
      minOrders: 5,
    };
  }
  return null;
}

// Hàm kiểm tra voucher theo ngày đặc biệt
function getSpecialDateVoucher() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const dayOfWeek = now.getDay();

  // Ngày lễ đặc biệt
  if (month === 2 && day === 14) {
    return {
      id: "valentine",
      name: "💝 Valentine Special",
      description: "Giảm 15% nhân ngày Valentine",
      discount: 15,
      type: "percentage",
    };
  }
  if (month === 3 && day === 8) {
    return {
      id: "womens_day",
      name: "🌹 Quốc tế Phụ nữ",
      description: "Giảm 20% cho phái đẹp",
      discount: 20,
      type: "percentage",
    };
  }
  if (month === 4 && day === 30) {
    return {
      id: "liberation",
      name: "🎉 Giải phóng miền Nam",
      description: "Giảm 25% chào mừng 30/4",
      discount: 25,
      type: "percentage",
    };
  }
  if (month === 5 && day === 1) {
    return {
      id: "labor_day",
      name: "🇻🇳 Quốc tế Lao động",
      description: "Giảm 20% vinh danh người lao động",
      discount: 20,
      type: "percentage",
    };
  }
  if (month === 9 && day === 2) {
    return {
      id: "national_day",
      name: "🎆 Quốc khánh 2/9",
      description: "Giảm 25% chào mừng Quốc khánh",
      discount: 25,
      type: "percentage",
    };
  }
  if (month === 12 && day >= 20 && day <= 25) {
    return {
      id: "christmas",
      name: "🎄 Giáng Sinh An Lành",
      description: "Giảm 25% mừng Chúa giáng sinh",
      discount: 25,
      type: "percentage",
    };
  }

  // Giờ vàng săn sale
  if (hour >= 7 && hour <= 9) {
    return {
      id: "golden_hour_morning",
      name: "⏰ Giờ vàng buổi sáng",
      description: "Giảm 15% cho đơn hàng từ 7h-9h sáng",
      discount: 15,
      type: "percentage",
    };
  }
  if (hour >= 14 && hour <= 16) {
    return {
      id: "golden_hour_afternoon",
      name: "⏰ Giờ vàng buổi chiều",
      description: "Giảm 10% cho đơn hàng từ 14h-16h",
      discount: 10,
      type: "percentage",
    };
  }
  if (hour >= 20 && hour <= 22) {
    return {
      id: "golden_hour_evening",
      name: "⏰ Giờ vàng buổi tối",
      description: "Giảm 12% cho đơn hàng từ 20h-22h",
      discount: 12,
      type: "percentage",
    };
  }

  // Cuối tuần
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return {
      id: "weekend",
      name: "🎉 Cuối tuần vui vẻ",
      description: "Giảm 10% cho đơn hàng cuối tuần",
      discount: 10,
      type: "percentage",
      minOrder: 100000,
    };
  }

  return null;
}

// Lấy tất cả voucher có thể áp dụng
function getAllAvailableVouchers(cartItems, subtotal) {
  const vouchers = [];

  if (!cartItems || cartItems.length === 0) return vouchers;

  // Voucher theo số lượng sản phẩm
  const quantityVoucher = getQuantityVoucher(cartItems);
  if (quantityVoucher) vouchers.push(quantityVoucher);

  // Voucher khách hàng thân thiết
  const loyaltyVoucher = getLoyaltyVoucher();
  if (loyaltyVoucher) vouchers.push(loyaltyVoucher);

  // Voucher theo ngày/giờ đặc biệt
  const dateVoucher = getSpecialDateVoucher();
  if (dateVoucher) {
    if (!dateVoucher.minOrder || subtotal >= dateVoucher.minOrder) {
      vouchers.push(dateVoucher);
    }
  }

  return vouchers;
}

// Áp dụng voucher tốt nhất (giảm nhiều nhất)
function getBestVoucher(cartItems, subtotal) {
  const vouchers = getAllAvailableVouchers(cartItems, subtotal);

  if (vouchers.length === 0) return null;

  // Tìm voucher có % giảm cao nhất
  return vouchers.reduce((best, current) => {
    return current.discount > best.discount ? current : best;
  }, vouchers[0]);
}

// Tính số tiền giảm
function calculateDiscount(subtotal, voucher) {
  if (!voucher) return 0;
  if (voucher.type === "percentage") {
    return Math.floor((subtotal * voucher.discount) / 100);
  }
  return voucher.discount;
}

// Thêm thông báo khi có voucher mới (gọi sau khi đặt hàng thành công)
function checkAndNotifyNewVoucher() {
  const purchaseCount = getUserPurchaseCount();

  console.log("Kiểm tra voucher - Số lần mua:", purchaseCount);

  if (purchaseCount === 5) {
    showVoucherToast(
      "🎉 Chúc mừng! Bạn đã đạt 5 đơn hàng và nhận được Voucher Khách hàng trung thành (10%)!",
    );
    addVoucherToUser("loyalty_5", "⭐ Khách hàng trung thành", 10);

    // Thêm thông báo vào hệ thống
    if (typeof addNotification === "function") {
      addNotification(
        "🎉 Nhận voucher khách hàng trung thành!",
        "Bạn đã đạt 5 đơn hàng và nhận được voucher giảm 10% cho đơn hàng tiếp theo.",
        "promo",
      );
    }
  } else if (purchaseCount === 10) {
    showVoucherToast(
      "👑 Chúc mừng! Bạn đã đạt 10 đơn hàng và nhận được Voucher Khách hàng thân thiết (20%)!",
    );
    addVoucherToUser("loyalty_10", "👑 Khách hàng thân thiết", 20);

    if (typeof addNotification === "function") {
      addNotification(
        "👑 Nhận voucher khách hàng thân thiết!",
        "Bạn đã đạt 10 đơn hàng và nhận được voucher giảm 20% cho đơn hàng tiếp theo.",
        "promo",
      );
    }
  }
}

// Lưu voucher vào tài khoản user
function addVoucherToUser(voucherId, voucherName, discount) {
  let userVouchers = JSON.parse(localStorage.getItem("userVouchers")) || [];

  // Kiểm tra xem đã có voucher này chưa
  if (!userVouchers.find((v) => v.id === voucherId)) {
    userVouchers.push({
      id: voucherId,
      name: voucherName,
      discount: discount,
      receivedDate: new Date().toLocaleString(),
      used: false,
    });
    localStorage.setItem("userVouchers", JSON.stringify(userVouchers));
    console.log("Đã thêm voucher:", voucherName);
  }
}

// Lấy danh sách voucher của user hiện tại
function getUserVouchers() {
  return JSON.parse(localStorage.getItem("userVouchers")) || [];
}

// Áp dụng voucher user chọn
function applyUserVoucher(voucherId, subtotal) {
  const userVouchers = getUserVouchers();
  const voucher = userVouchers.find((v) => v.id === voucherId && !v.used);

  if (!voucher) return null;

  return {
    id: voucher.id,
    name: voucher.name,
    discount: voucher.discount,
    type: "percentage",
    description: `Giảm ${voucher.discount}% từ voucher ${voucher.name}`,
  };
}

// Đánh dấu voucher đã sử dụng
function markVoucherAsUsed(voucherId) {
  let userVouchers = getUserVouchers();
  const index = userVouchers.findIndex((v) => v.id === voucherId);
  if (index !== -1) {
    userVouchers[index].used = true;
    userVouchers[index].usedDate = new Date().toLocaleString();
    localStorage.setItem("userVouchers", JSON.stringify(userVouchers));
  }
}

// Hiển thị danh sách voucher lên giao diện (nếu có element)
function displayUserVouchers() {
  const container = document.getElementById("user-vouchers-list");
  if (!container) return;

  const vouchers = getUserVouchers();
  const availableVouchers = vouchers.filter((v) => !v.used);

  if (availableVouchers.length === 0) {
    container.innerHTML = '<p style="color:#999;">Bạn chưa có voucher nào</p>';
    return;
  }

  container.innerHTML = availableVouchers
    .map(
      (v) => `
    <div class="voucher-item" style="background:#fff9f0; border:1px solid #e67e22; border-radius:10px; padding:10px; margin-bottom:10px;">
      <div style="font-weight:bold; color:#4b2e2b;">${v.name}</div>
      <div style="font-size:12px; color:#666;">Giảm ${v.discount}%</div>
      <div style="font-size:11px; color:#999;">Nhận ngày: ${v.receivedDate}</div>
      <button onclick="applyVoucherToCart('${v.id}')" style="margin-top:8px; background:#e67e22; color:white; border:none; padding:5px 15px; border-radius:20px; cursor:pointer;">Áp dụng</button>
    </div>
  `,
    )
    .join("");
}

// Áp dụng voucher vào giỏ hàng
function applyVoucherToCart(voucherId) {
  const voucher = getUserVouchers().find((v) => v.id === voucherId && !v.used);
  if (!voucher) {
    showVoucherToast("Voucher không khả dụng!", true);
    return;
  }

  localStorage.setItem("appliedVoucher", JSON.stringify(voucher));
  showVoucherToast(
    `✅ Đã áp dụng voucher ${voucher.name} giảm ${voucher.discount}%!`,
  );

  // Cập nhật lại giỏ hàng nếu đang mở
  if (typeof openCheckout === "function") {
    openCheckout();
  }
}

// Khởi tạo kiểm tra voucher khi load trang
document.addEventListener("DOMContentLoaded", function () {
  // Hiển thị voucher nếu có element
  displayUserVouchers();

  // Kiểm tra và thông báo voucher mới
  checkAndNotifyNewVoucher();
});

console.log("✅ Hệ thống voucher đã sẵn sàng!");
