// =====================
// GIỎ HÀNG - HÀM CƠ BẢN
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(name, price) {
  const item = cart.find((p) => p.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`✅ Đã thêm ${name} vào giỏ hàng!`);
  updateCartCount();
}

function removeFromCart(name) {
  const item = cart.find((p) => p.name === name);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) cart = cart.filter((p) => p.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`📦 Đã xoá ${name} khỏi giỏ hàng`);
    updateCartCount();
  }
}

function showToast(msg) {
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
    "background:#10b981; color:white; padding:12px 20px; border-radius:8px; margin-top:5px;";
  toast.innerText = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// =====================
// CHECKOUT - QUAN TRỌNG NHẤT
// =====================
function openCheckout() {
  console.log("openCheckout called");

  if (cart.length === 0) {
    showToast("🛒 Giỏ hàng trống!");
    return;
  }

  const list = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!list || !totalEl) {
    console.error("Không tìm thấy phần tử checkout!");
    return;
  }

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const sub = item.price * item.quantity;
    total += sub;
    list.innerHTML += `
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <span>${item.name} x ${item.quantity}</span>
        <span>${sub.toLocaleString()}đ</span>
      </div>
    `;
  });

  totalEl.innerHTML = `Tổng tiền: <strong style="color:#e67e22;">${total.toLocaleString()}đ</strong>`;

  document.getElementById("checkout-popup").style.display = "flex";
}

function closeCheckout() {
  document.getElementById("checkout-popup").style.display = "none";
}

function confirmOrder() {
  const name = document.getElementById("customer-name")?.value;
  const phone = document.getElementById("customer-phone")?.value;
  const address = document.getElementById("customer-address")?.value;

  if (!name || !phone || !address) {
    showToast("⚠️ Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    showToast("🛒 Giỏ hàng trống!");
    return;
  }

  let total = 0;
  cart.forEach((item) => (total += item.price * item.quantity));

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const order = {
    id: "#" + Date.now().toString().slice(-8),
    date: new Date().toLocaleString(),
    items: cart,
    total: total,
    customer: { name, phone, address },
    userEmail: currentUser ? currentUser.email : "guest",
    status: "pending",
  };

  let orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
  orders.push(order);
  localStorage.setItem("orderHistory", JSON.stringify(orders));

  // Xóa giỏ hàng
  localStorage.setItem("cart", "[]");
  updateCartCount();
  closeCheckout();

  // Hiển thị popup thành công
  document.getElementById("display-name").innerText = name;
  document.getElementById("display-phone").innerText = phone;
  document.getElementById("display-address").innerText = address;
  document.getElementById("success-popup").style.display = "block";

  // Đếm ngược đóng popup
  let countdown = 10;
  const timer = document.getElementById("countdown-timer");
  const interval = setInterval(() => {
    countdown--;
    if (timer) timer.innerText = countdown;
    if (countdown <= 0) {
      clearInterval(interval);
      closeSuccessPopup();
    }
  }, 1000);

  showToast(`🎉 Đặt hàng thành công! Mã: ${order.id}`);
}

function closeSuccessPopup() {
  document.getElementById("success-popup").style.display = "none";
}

function closeSuccessPopupOnOutside(event) {
  if (event.target === document.getElementById("success-popup")) {
    closeSuccessPopup();
  }
}

function toggleQR(show) {
  const qrContainer = document.getElementById("qr-container");
  if (qrContainer) {
    qrContainer.style.display = show ? "block" : "none";
  }
}

// =====================
// CÁC HÀM KHÁC (BANNER, FILTER, SEARCH...)
// =====================
let currentBanner = 0;
let bannerInterval;

function showBanner(index) {
  const slides = document.querySelectorAll(".banner-slide");
  const dots = document.querySelectorAll(".dot");
  if (!slides.length) return;
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  if (index >= slides.length) currentBanner = 0;
  if (index < 0) currentBanner = slides.length - 1;
  slides[currentBanner].classList.add("active");
  if (dots[currentBanner]) dots[currentBanner].classList.add("active");
}

function nextBanner() {
  currentBanner++;
  showBanner(currentBanner);
  resetBannerInterval();
}
function prevBanner() {
  currentBanner--;
  showBanner(currentBanner);
  resetBannerInterval();
}
function goToBanner(index) {
  currentBanner = index;
  showBanner(currentBanner);
  resetBannerInterval();
}

function resetBannerInterval() {
  if (bannerInterval) clearInterval(bannerInterval);
  bannerInterval = setInterval(() => {
    currentBanner++;
    showBanner(currentBanner);
  }, 5000);
}

function initBanner() {
  if (document.querySelectorAll(".banner-slide").length) {
    showBanner(0);
    resetBannerInterval();
  }
}

function goToCategory(category) {
  const productGrid = document.querySelector(".luoi-sanpham");
  if (productGrid) productGrid.scrollIntoView({ behavior: "smooth" });
}

function performSearch() {
  const term = document.getElementById("search-input")?.value.toLowerCase();
  if (!term) return;
  const products = document.querySelectorAll(".sanpham");
  let found = false;
  products.forEach((p) => {
    const name = p
      .querySelector(".sanpham-info div:first-child")
      ?.innerText.toLowerCase();
    if (name && name.includes(term)) {
      p.style.display = "block";
      found = true;
    } else {
      p.style.display = "none";
    }
  });
  showToast(found ? `🔍 Tìm thấy "${term}"` : `🔍 Không tìm thấy "${term}"`);
}

function handleSearch(e) {
  if (e.key === "Enter") performSearch();
}

function openNotifications() {
  alert("🔔 Chức năng đang phát triển");
}
function openProfile() {
  alert("👤 Vui lòng đăng nhập để xem thông tin");
}
function openOrderHistory() {
  window.location.href = "history.html";
}
function openAuthModal() {
  alert("🔐 Vui lòng đăng nhập");
}
function toggleAccountMenu() {
  const dropdown = document.getElementById("account-dropdown");
  if (dropdown) dropdown.classList.toggle("show");
}

// =====================
// KHỞI TẠO
// =====================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Trang chủ khởi động");
  updateCartCount();
  initBanner();

  // Đóng dropdown khi click ra ngoài
  document.addEventListener("click", function (e) {
    const dropdown = document.getElementById("account-dropdown");
    const btn = document.getElementById("account-btn");
    if (
      dropdown &&
      btn &&
      !dropdown.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      dropdown.classList.remove("show");
    }
  });
});

// Popup chi tiết sản phẩm
let currentProduct = null;
let currentQuantity = 1;

function openProductDetail(name, price, img, category) {
  currentProduct = { name, price, img };
  currentQuantity = 1;
  document.getElementById("detail-product-name").innerText = name;
  document.getElementById("detail-product-img").src = img;
  document.getElementById("detail-product-price").innerHTML =
    price.toLocaleString();
  document.getElementById("detail-quantity").innerText = currentQuantity;
  document.getElementById("product-detail-popup").style.display = "flex";
}

function closeProductDetail() {
  document.getElementById("product-detail-popup").style.display = "none";
  currentProduct = null;
}

function increaseDetailQty() {
  currentQuantity++;
  document.getElementById("detail-quantity").innerText = currentQuantity;
}
function decreaseDetailQty() {
  if (currentQuantity > 1) {
    currentQuantity--;
    document.getElementById("detail-quantity").innerText = currentQuantity;
  }
}

function addDetailToCart() {
  if (!currentProduct) return;
  for (let i = 0; i < currentQuantity; i++)
    addToCart(currentProduct.name, currentProduct.price);
  closeProductDetail();
}

function attachProductClickEvents() {
  document.querySelectorAll(".sanpham").forEach((p) => {
    const nameEl = p.querySelector(".sanpham-info div:first-child");
    if (nameEl) {
      nameEl.style.cursor = "pointer";
      nameEl.onclick = () => {
        const name = nameEl.innerText;
        const price = parseInt(
          p.querySelector(".price").innerText.replace(/[^\d]/g, ""),
        );
        const img = p.querySelector(".sanpham-anh").src;
        openProductDetail(name, price, img);
      };
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  attachProductClickEvents();
});
