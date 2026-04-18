// =====================
// BANNER QUẢNG CÁO CHUYỂN ĐỘNG
// =====================
let currentBanner = 0;
let bannerInterval;
const bannerSlides = document.querySelectorAll(".banner-slide");
const dots = document.querySelectorAll(".dot");

function showBanner(index) {
  if (!bannerSlides.length) return;

  // Xóa active của tất cả slide
  bannerSlides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Xử lý vòng lặp
  if (index >= bannerSlides.length) currentBanner = 0;
  if (index < 0) currentBanner = bannerSlides.length - 1;

  // Active slide mới
  bannerSlides[currentBanner].classList.add("active");
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
  }, 5000); // Chuyển slide mỗi 5 giây
}

// Khởi tạo banner khi trang load
function initBanner() {
  if (bannerSlides.length > 0) {
    showBanner(0);
    resetBannerInterval();
  }
}

// =====================
// CHUYỂN ĐẾN DANH MỤC TỪ BANNER/ƯU ĐÃI
// =====================
function goToCategory(categoryName) {
  const menuItems = document.querySelectorAll(".menu-trai li");

  const categoryMap = {
    coffee: "Coffee",
    sinhto: "Sinh tố",
    trasua: "Trà sữa",
    nuocep: "Nước ép",
    travi: "Trà vị",
    doanvat: "Đồ ăn vặt",
    banhngot: "Bánh ngọt",
    combodoanvat: "Combo đồ ăn vặt",
    combodouong: "Combo đồ uống",
    combo: "Combo",
    all: null,
  };

  const targetText = categoryMap[categoryName];

  if (targetText) {
    const targetItem = Array.from(menuItems).find((item) =>
      item.innerText.includes(targetText),
    );
    if (targetItem) {
      targetItem.click();
    }
  } else if (categoryName === "all") {
    menuItems.forEach((item) => item.classList.remove("active-category"));
    document.querySelectorAll(".sanpham").forEach((product) => {
      product.style.display = "block";
    });
  }

  const productGrid = document.querySelector(".luoi-sanpham");
  if (productGrid) {
    setTimeout(() => {
      productGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
}

// =====================
// BIẾN TOÀN CỤC
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = null;
let currentQuantity = 1;

// =====================
// HÀM VOUCHER
// =====================

// Lấy lịch sử đơn hàng của user
function getUserOrderHistory() {
  let allOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  if (!currentUser) return 0;
  return allOrders.filter((order) => order.userEmail === currentUser.email)
    .length;
}

// Voucher theo số lượng sản phẩm
function getQuantityVoucher(cartItems) {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalQuantity >= 5) {
    return {
      id: "bulk_5",
      name: "🎁 Mua nhiều giảm giá",
      description: "Giảm 10% cho đơn hàng từ 5 sản phẩm",
      discount: 10,
    };
  }
  return null;
}

// Voucher khách hàng thân thiết
function getLoyaltyVoucher() {
  const purchaseCount = getUserOrderHistory();
  if (purchaseCount >= 10) {
    return {
      id: "loyalty_10",
      name: "👑 Khách hàng thân thiết",
      description: "Giảm 20% cho đơn hàng này",
      discount: 20,
    };
  } else if (purchaseCount >= 5) {
    return {
      id: "loyalty_5",
      name: "⭐ Khách hàng trung thành",
      description: "Giảm 10% cho đơn hàng này",
      discount: 10,
    };
  }
  return null;
}

// Voucher theo ngày/giờ đặc biệt
function getSpecialDateVoucher() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const dayOfWeek = now.getDay();

  // Ngày lễ
  if (month === 2 && day === 14)
    return { id: "valentine", name: "💝 Valentine Special", discount: 15 };
  if (month === 3 && day === 8)
    return { id: "womens_day", name: "🌹 Quốc tế Phụ nữ", discount: 20 };
  if (month === 4 && day === 30)
    return { id: "liberation", name: "🎉 Giải phóng miền Nam", discount: 25 };
  if (month === 5 && day === 1)
    return { id: "labor_day", name: "🇻🇳 Quốc tế Lao động", discount: 20 };
  if (month === 9 && day === 2)
    return { id: "national_day", name: "🎆 Quốc khánh 2/9", discount: 25 };
  if (month === 12 && day >= 20 && day <= 25)
    return { id: "christmas", name: "🎄 Giáng Sinh", discount: 25 };

  // Giờ vàng
  if (hour >= 7 && hour <= 9)
    return { id: "golden_morning", name: "⏰ Giờ vàng sáng", discount: 15 };
  if (hour >= 14 && hour <= 16)
    return { id: "golden_afternoon", name: "⏰ Giờ vàng chiều", discount: 10 };
  if (hour >= 20 && hour <= 22)
    return { id: "golden_evening", name: "⏰ Giờ vàng tối", discount: 12 };

  // Cuối tuần
  if (dayOfWeek === 0 || dayOfWeek === 6)
    return { id: "weekend", name: "🎉 Cuối tuần vui vẻ", discount: 10 };

  return null;
}

// Lấy voucher tốt nhất
function getBestVoucher(cartItems, subtotal) {
  const vouchers = [];

  const qtyVoucher = getQuantityVoucher(cartItems);
  const loyaltyVoucher = getLoyaltyVoucher();
  const dateVoucher = getSpecialDateVoucher();

  if (qtyVoucher) vouchers.push(qtyVoucher);
  if (loyaltyVoucher) vouchers.push(loyaltyVoucher);
  if (dateVoucher) vouchers.push(dateVoucher);

  if (vouchers.length === 0) return null;
  return vouchers.reduce(
    (best, curr) => (curr.discount > best.discount ? curr : best),
    vouchers[0],
  );
}

// Tính tiền giảm
function calculateDiscount(subtotal, voucher) {
  if (!voucher) return 0;
  return Math.floor((subtotal * voucher.discount) / 100);
}

// =====================
// DỮ LIỆU MÔ TẢ CHI TIẾT CHO 75 SẢN PHẨM
// =====================
const productDetails = {
  // ===== COFFEE (8 sản phẩm) =====
  "Cafe sữa đá": {
    desc: "☕ Cafe sữa đá là thức uống truyền thống của Việt Nam. Cà phê sữa đá đậm đà được pha bằng phin, kết hợp với sữa đặc thơm béo và đá viên mát lạnh.",
    ingredients: "Cà phê Robusta, sữa đặc, đá viên",
    nutrition: "Calo: ~120kcal | Caffein: ~100mg",
  },
  "Cafe đen": {
    desc: "☕ Cafe đen là cà phê nguyên chất 100%, không pha sữa, không đường.",
    ingredients: "Cà phê Robusta nguyên chất, nước sôi",
    nutrition: "Calo: ~5kcal | Caffein: ~120mg",
  },
  "Cafe phin": {
    desc: "☕ Cafe phin - Hương vị cà phê Việt Nam truyền thống.",
    ingredients: "Cà phê Robusta, nước nóng (pha phin)",
    nutrition: "Calo: ~5kcal | Caffein: ~110mg",
  },
  "Cafe Latte": {
    desc: "☕ Cafe Latte là sự kết hợp hoàn hảo giữa espresso Ý và sữa tươi đánh bông.",
    ingredients: "Espresso, sữa tươi, foam sữa",
    nutrition: "Calo: ~180kcal | Caffein: ~80mg",
  },
  "Cafe Sữa": {
    desc: "🥥 Cafe Sữa - Sự kết hợp giữa cà phê đen đậm đà và sữa đặc béo ngậy.",
    ingredients: "Cà phê đen, sữa đặc, đá",
    nutrition: "Calo: ~200kcal | Caffein: ~90mg",
  },
  "Cafe nâu": {
    desc: "🥥 Cafe nâu - Sự kết hợp giữa cà phê đen đậm đà và sữa đặc béo ngậy.",
    ingredients: "Cà phê nâu, sữa đặc, đá",
    nutrition: "Calo: ~200kcal | Caffein: ~90mg",
  },
  "Cafe phô mai muối": {
    desc: "🧂 Cafe phô mai muối - Lớp kem muối mặn mà cùng lớp phô mai béo ngậy.",
    ingredients: "Cà phê đen, kem muối, sữa",
    nutrition: "Calo: ~150kcal | Caffein: ~95mg",
  },
  "Cafe muối": {
    desc: "🧂 Cafe muối - Đặc sản của Huế với lớp kem muối mặn mà, béo ngậy.",
    ingredients: "Cà phê đen, kem muối, sữa",
    nutrition: "Calo: ~150kcal | Caffein: ~95mg",
  },

  // ===== SINH TỐ (7 sản phẩm) =====
  "Sinh tố dâu": {
    desc: "🍓 Sinh tố dâu được làm từ dâu tây tươi nhập khẩu, xay nhuyễn cùng sữa đặc và đá viên.",
    ingredients: "Dâu tây tươi, sữa đặc, đá viên, đường",
    nutrition: "Calo: ~150kcal | Vitamin C: 70mg",
  },
  "Sinh tố bơ": {
    desc: "🥑 Sinh tố bơ được làm từ bơ sáp chín mềm, xay cùng sữa đặc và sữa tươi.",
    ingredients: "Bơ sáp, sữa đặc, sữa tươi, đá",
    nutrition: "Calo: ~280kcal | Chất béo tốt: 15g",
  },
  "Sinh tố đào": {
    desc: "🍑 Sinh tố đào được làm từ đào tươi nhập khẩu, xay cùng sữa chua và mật ong.",
    ingredients: "Đào tươi, sữa chua, mật ong, đá",
    nutrition: "Calo: ~130kcal | Vitamin A: 15%",
  },
  "Sinh tố chuối": {
    desc: "🍌 Sinh tố chuối được làm từ chuối chín thơm ngọt, kết hợp với sữa tươi và sữa chua.",
    ingredients: "Chuối chín, sữa tươi, sữa chua, mật ong",
    nutrition: "Calo: ~200kcal | Kali: 400mg",
  },
  "Sinh tố táo": {
    desc: "🍎 Sinh tố táo được làm từ táo xanh tươi mát, xay cùng sữa chua và gừng tươi.",
    ingredients: "Táo xanh, sữa chua, gừng, mật ong",
    nutrition: "Calo: ~120kcal | Chất xơ: 5g",
  },
  "Sinh tố xoài": {
    desc: "🥭 Sinh tố xoài được làm từ xoài cát chín vàng, xay nhuyễn cùng sữa đặc và sữa tươi.",
    ingredients: "Xoài cát, sữa đặc, sữa tươi, đá",
    nutrition: "Calo: ~170kcal | Vitamin C: 60mg",
  },
  "Sinh tố việt quất": {
    desc: "🫐 Sinh tố việt quất được chắt lọc từ những quả việt quất tím lịm, xay nhuyễn cùng sữa đặc và sữa tươi.",
    ingredients: "Việt quất, sữa đặc, sữa tươi, đá",
    nutrition: "Calo: ~170kcal | Vitamin C: 60mg",
  },

  // ===== TRÀ SỮA (9 sản phẩm) =====
  "Trà sữa Matcha Latte": {
    desc: "🍵 Trà sữa Matcha Latte được làm từ bột trà xanh Nhật Bản cao cấp.",
    ingredients: "Bột matcha Nhật, sữa tươi, trân châu",
    nutrition: "Calo: ~220kcal | Chất chống oxy hóa: Cao",
  },
  "Trà sữa Socola": {
    desc: "🍫 Trà sữa Socola được làm từ bột cacao nguyên chất, hòa quyện cùng trà đen và sữa tươi.",
    ingredients: "Bột cacao, trà đen, sữa tươi, trân châu",
    nutrition: "Calo: ~250kcal | Theobromine: 50mg",
  },
  "Trà sữa dâu tây": {
    desc: "🍓 Trà sữa dâu tây được làm từ dâu tây tươi, kết hợp cùng trà sữa thơm ngon.",
    ingredients: "Dâu tây tươi, trà đen, sữa, trân châu",
    nutrition: "Calo: ~200kcal | Vitamin C: 50mg",
  },
  "Trà sữa kem trứng": {
    desc: "🥚 Trà sữa kem trứng - Đặc sản đến từ Đài Loan với lớp kem trứng béo ngậy.",
    ingredients: "Trà đen, sữa, kem trứng, trân châu",
    nutrition: "Calo: ~300kcal | Protein: 8g",
  },
  "Trà sữa việt quất": {
    desc: "🫐 Trà sữa việt quất được làm từ quả việt quất tươi, giàu chất chống oxy hóa.",
    ingredients: "Việt quất, trà đen, sữa, trân châu",
    nutrition: "Calo: ~210kcal | Anthocyanin: Cao",
  },
  "Trà sữa khoai môn": {
    desc: "🍠 Trà sữa khoai môn được làm từ khoai môn tím thơm bùi, xay nhuyễn cùng trà sữa.",
    ingredients: "Khoai môn tím, trà đen, sữa, trân châu",
    nutrition: "Calo: ~230kcal | Chất xơ: 4g",
  },
  "Trà sữa bạc hà": {
    desc: "🌿 Trà sữa bạc hà được làm từ lá bạc hà tươi, kết hợp cùng trà đen và sữa.",
    ingredients: "Bạc hà tươi, trà đen, sữa, trân châu",
    nutrition: "Calo: ~180kcal | Tốt cho tiêu hóa",
  },
  "Trà sữa Kiwi": {
    desc: "🥝 Trà sữa Kiwi được làm từ kiwi xanh tươi, giàu vitamin C.",
    ingredients: "Kiwi xanh, trà đen, sữa, trân châu",
    nutrition: "Calo: ~190kcal | Vitamin C: 90mg",
  },
  "Trà sữa Ô long": {
    desc: "🍃 Trà sữa Ô long được pha từ trà ô long Đài Loan thượng hạng.",
    ingredients: "Trà ô long Đài Loan, sữa tươi, trân châu",
    nutrition: "Calo: ~200kcal | Chất chống oxy hóa: Cao",
  },

  // ===== NƯỚC ÉP (6 sản phẩm) =====
  "Nước ép dưa hấu": {
    desc: "🍉 Nước ép dưa hấu 100% từ trái dưa hấu tươi, không đường, không chất bảo quản.",
    ingredients: "Dưa hấu tươi (100%)",
    nutrition: "Calo: ~60kcal | Lycopene: 10mg",
  },
  "Nước ép cam": {
    desc: "🍊 Nước ép cam được vắt từ cam sành tươi, giữ nguyên vị chua ngọt tự nhiên.",
    ingredients: "Cam sành tươi (100%)",
    nutrition: "Calo: ~70kcal | Vitamin C: 80mg",
  },
  "Nước ép chanh dây": {
    desc: "🟡 Nước ép chanh dây được làm từ chanh dây tím tươi, giàu vitamin A, C và chất xơ.",
    ingredients: "Chanh dây tím, đường, nước",
    nutrition: "Calo: ~80kcal | Chất xơ: 5g",
  },
  "Nước ép dưa lưới": {
    desc: "🍈 Nước ép dưa lưới được làm từ dưa lưới tươi, vị chua thanh, thơm nhẹ.",
    ingredients: "Dưa lưới tươi, đường, nước",
    nutrition: "Calo: ~65kcal | Vitamin C: 70mg",
  },
  "Nước ép thơm": {
    desc: "🍍 Nước ép thơm (dứa) được làm từ dứa tươi ngọt thanh, giàu enzyme bromelain.",
    ingredients: "Dứa tươi (100%)",
    nutrition: "Calo: ~75kcal | Bromelain: Cao",
  },
  "Nước ép cà rốt": {
    desc: "🥕 Nước ép cà rốt được ép từ cà rốt tươi, giàu beta-carotene, vitamin A.",
    ingredients: "Cà rốt tươi (100%)",
    nutrition: "Calo: ~55kcal | Vitamin A: 200%",
  },

  // ===== TRÀ VỊ (6 sản phẩm) =====
  "Trà dâu tằm": {
    desc: "🍓 Trà dâu tằm được làm từ dâu tằm tươi, kết hợp cùng trà nền thơm nhẹ.",
    ingredients: "Dâu tằm tươi, trà nền, đường",
    nutrition: "Calo: ~85kcal | Vitamin C: 50mg",
  },
  "Trà bạc hà": {
    desc: "🌿 Trà bạc hà được pha từ lá bạc hà tươi, có vị the mát, dễ chịu.",
    ingredients: "Lá bạc hà tươi, nước nóng",
    nutrition: "Calo: ~5kcal | Tốt cho tiêu hóa",
  },
  "Trà đào cam sả": {
    desc: "🍑 Trà đào cam sả là sự kết hợp hài hòa giữa vị ngọt thanh của đào, chua nhẹ của cam và hương thơm của sả.",
    ingredients: "Đào, cam, sả, trà nền",
    nutrition: "Calo: ~90kcal | Vitamin C: 40mg",
  },
  "Trà đào": {
    desc: "🍑 Trà đào là thức uống thanh mát với vị ngọt tự nhiên từ đào tươi.",
    ingredients: "Đào tươi, trà nền, đường",
    nutrition: "Calo: ~80kcal | Chất chống oxy hóa",
  },
  "Trà chanh nha đam": {
    desc: "🍋 Trà chanh nha đam là thức uống thanh lọc cơ thể với vị chua của chanh và nha đam giòn mát.",
    ingredients: "Chanh tươi, nha đam, trà nền, mật ong",
    nutrition: "Calo: ~70kcal | Tốt cho da",
  },
  "Trà chanh": {
    desc: "🍋 Trà chanh là thức uống đơn giản nhưng thanh mát, dễ làm.",
    ingredients: "Chanh tươi, trà nền, đường",
    nutrition: "Calo: ~60kcal | Vitamin C: 30mg",
  },

  // ===== ĐỒ ĂN VẶT (16 sản phẩm) =====
  "Hạt hướng dương": {
    desc: "🌻 Hạt hướng dương được rang chín thơm ngon, giòn tan.",
    ingredients: "Hạt hướng dương, muối",
    nutrition: "Calo: ~580kcal/100g | Vitamin E: 35mg",
  },
  "Phô mai que": {
    desc: "🧀 Phô mai que được làm từ phô mai cao cấp, chiên giòn vàng ruộm, béo ngậy.",
    ingredients: "Phô mai Mozzarella, bột chiên xù",
    nutrition: "Calo: ~350kcal/100g | Canxi: 500mg",
  },
  "Xúc xích": {
    desc: "🌭 Xúc xích Đức thơm ngon, được nướng trên than hồng, da giòn.",
    ingredients: "Thịt heo, gia vị, vỏ collagen",
    nutrition: "Calo: ~280kcal/100g | Protein: 12g",
  },
  "Lạp xưởng": {
    desc: "🥓 Lạp xưởng truyền thống được làm từ thịt heo xay nhuyễn, tẩm ướp gia vị đặc biệt.",
    ingredients: "Thịt heo, mỡ, gia vị, đường",
    nutrition: "Calo: ~450kcal/100g | Protein: 15g",
  },
  "Tôm viên chiên": {
    desc: "🍤 Tôm viên chiên được làm từ tôm tươi xay nhuyễn, viên tròn, chiên giòn vàng.",
    ingredients: "Tôm tươi, bột mì, gia vị",
    nutrition: "Calo: ~220kcal/100g | Protein: 14g",
  },
  "Cá viên chiên": {
    desc: "🐟 Cá viên chiên được làm từ thịt cá tươi, xay nhuyễn, viên tròn và chiên giòn.",
    ingredients: "Thịt cá tươi, bột mì, gia vị",
    nutrition: "Calo: ~200kcal/100g | Omega-3: Tốt",
  },
  "Bò viên chiên": {
    desc: "🥩 Bò viên chiên được làm từ thịt bò xay, viên tròn, chiên vàng.",
    ingredients: "Thịt bò, bột mì, gia vị",
    nutrition: "Calo: ~250kcal/100g | Sắt: 2mg",
  },
  "Nem chua rán": {
    desc: "🍢 Nem chua rán là món ăn vặt quen thuộc, được bọc bột chiên giòn.",
    ingredients: "Nem chua, bột chiên, gia vị",
    nutrition: "Calo: ~300kcal/100g | Protein: 10g",
  },
  "Bò khô": {
    desc: "🥩 Bò khô được làm từ thịt bò thượng hạng, tẩm ướp gia vị đặc biệt, sấy khô vừa ăn.",
    ingredients: "Thịt bò, gia vị, ớt, sả",
    nutrition: "Calo: ~350kcal/100g | Protein: 30g",
  },
  "Đùi gà chiên KFC": {
    desc: "🍗 Đùi gà chiên kiểu KFC với lớp da giòn tan, thịt bên trong mềm ngọt.",
    ingredients: "Đùi gà tươi, bột chiên, gia vị",
    nutrition: "Calo: ~320kcal/100g | Protein: 18g",
  },
  "Cánh gà chiên": {
    desc: "🍗 Cánh gà chiên vàng giòn, thịt ngọt mềm, được tẩm ướp gia vị đậm đà.",
    ingredients: "Cánh gà tươi, bột chiên, gia vị",
    nutrition: "Calo: ~300kcal/100g | Protein: 16g",
  },
  "Bánh gối chiên": {
    desc: "🥟 Bánh gối chiên có vỏ giòn tan, nhân thịt bên trong thơm ngon.",
    ingredients: "Bột mì, thịt heo, nấm mèo, gia vị",
    nutrition: "Calo: ~280kcal/100g | Protein: 10g",
  },
  "Khoai tây chiên lắc phô mai": {
    desc: "🍟 Khoai tây chiên lắc phô mai được làm từ khoai tây tươi cắt sợi, chiên giòn và lắc đều với bột phô mai.",
    ingredients: "Khoai tây, bột phô mai, dầu ăn",
    nutrition: "Calo: ~350kcal/100g | Carbs: 40g",
  },
  "Khoai tây chiên": {
    desc: "🍟 Khoai tây chiên vàng ươm, giòn rụm, được chiên từ dầu thực vật nguyên chất.",
    ingredients: "Khoai tây, dầu ăn, muối",
    nutrition: "Calo: ~320kcal/100g | Kali: 400mg",
  },
  "Khoai lang chiên": {
    desc: "🍠 Khoai lang chiên được làm từ khoai lang mật vàng ươm, chiên giòn, vị ngọt tự nhiên.",
    ingredients: "Khoai lang, dầu ăn",
    nutrition: "Calo: ~280kcal/100g | Vitamin A: 100%",
  },
  "Hotdog xúc xích phô mai": {
    desc: "🌭 Hotdog xúc xích phô mai kết hợp xúc xích thơm ngon, phô mai béo ngậy bên trong.",
    ingredients: "Xúc xích phô mai, bánh mì, sốt cà chua, sốt mayonnaise",
    nutrition: "Calo: ~380kcal | Protein: 12g",
  },

  // ===== BÁNH NGỌT (10 sản phẩm) =====
  "Bánh FLAN": {
    desc: "🍮 Bánh FLAN mềm mịn, thơm béo, vị ngọt dịu nhẹ, ăn kèm đá bào và cà phê đắng.",
    ingredients: "Trứng, sữa tươi, đường, vani",
    nutrition: "Calo: ~150kcal/phần | Protein: 5g",
  },
  "Bánh ngọt": {
    desc: "🍰 Bánh ngọt đa dạng hương vị, mềm xốp, thơm ngon, thích hợp cho bữa trà chiều.",
    ingredients: "Bột mì, trứng, đường, bơ, sữa",
    nutrition: "Calo: ~350kcal/100g | Carbs: 45g",
  },
  "Bánh Panna Cotta": {
    desc: "🍮 Panna Cotta là món tráng miệng Ý với lớp kem sữa mịn màng, béo ngậy.",
    ingredients: "Kem tươi, sữa tươi, đường, gelatin, vani",
    nutrition: "Calo: ~250kcal/phần | Canxi: 100mg",
  },
  "Bánh Cookies": {
    desc: "🍪 Bánh Cookies giòn tan, thơm bơ, với những hạt socola hoặc hạt điều bên trong.",
    ingredients: "Bột mì, bơ, đường, trứng, socola chip",
    nutrition: "Calo: ~480kcal/100g | Chất béo: 25g",
  },
  Tiramisu: {
    desc: "🍰 Tiramisu là món bánh Ý với lớp kem mascarpone béo ngậy, hương vị cà phê đậm đà.",
    ingredients: "Mascarpone, cà phê, trứng, đường, bánh ladyfinger",
    nutrition: "Calo: ~400kcal/phần | Caffein: 20mg",
  },
  "Bánh Muffin": {
    desc: "🧁 Bánh Muffin mềm xốp, thơm bơ, nhiều hương vị như socola, việt quất, chuối.",
    ingredients: "Bột mì, bơ, trứng, đường, sữa",
    nutrition: "Calo: ~350kcal/phần | Carbs: 45g",
  },
  "Bánh Mì": {
    desc: "🥖 Bánh Mì tươi giòn tan bên ngoài, mềm bên trong. Có thể ăn kèm với bơ, mứt.",
    ingredients: "Bột mì, men nở, muối, nước",
    nutrition: "Calo: ~265kcal/100g | Carbs: 50g",
  },
  "Bánh Macaron": {
    desc: "🍬 Bánh Macaron là bánh ngọt Pháp sang trọng với lớp vỏ giòn, nhân mềm mịn.",
    ingredients: "Bột hạnh nhân, đường, lòng trắng trứng, nhân kem",
    nutrition: "Calo: ~120kcal/cái | Đường: 10g",
  },
  "Bánh Mousse Cake": {
    desc: "🍰 Bánh Mousse Cake có lớp mousse bông xốp, mịn màng, kết hợp với đế bánh bông lan.",
    ingredients: "Kem tươi, trứng, đường, gelatin, trái cây",
    nutrition: "Calo: ~320kcal/phần | Chất béo: 20g",
  },
  "Bánh Cheese Cake": {
    desc: "🍰 Bánh Cheese Cake với lớp phô mai béo ngậy, mịn màng, đế bánh giòn tan.",
    ingredients: "Cream cheese, trứng, đường, bánh quy, bơ",
    nutrition: "Calo: ~380kcal/phần | Canxi: 150mg",
  },

  // ===== COMBO ĐỒ ĂN VẶT (4 sản phẩm) =====
  "Combo đồ ăn vặt 1": {
    desc: "🍱 Combo đồ ăn vặt 1 gồm: Gà rán + Phô mai que + Khoai tây chiên + Nước ngọt.",
    ingredients: "Gà rán, phô mai que, khoai tây chiên, nước ngọt",
    nutrition: "Calo: ~850kcal | Tiết kiệm 20%",
  },
  "Combo đồ ăn vặt 2": {
    desc: "🍱 Combo đồ ăn vặt 2 gồm: Bò khô + Hạt hướng dương + Nem chua rán + Trà đào.",
    ingredients: "Bò khô, hạt hướng dương, nem chua rán, trà đào",
    nutrition: "Calo: ~600kcal | Tiết kiệm 10%",
  },
  "Combo đồ ăn vặt 3": {
    desc: "🍱 Combo đồ ăn vặt 3 gồm: Tôm viên chiên + Cá viên chiên + Bò viên chiên + Sốt mayonnaise.",
    ingredients: "Tôm viên, cá viên, bò viên, sốt mayonnaise",
    nutrition: "Calo: ~700kcal | Protein: 30g",
  },
  "Combo đồ ăn vặt 4": {
    desc: "🍱 Combo đồ ăn vặt 4 gồm: Bánh gối chiên + Hotdog + Khoai lang chiên + Nước tương.",
    ingredients: "Bánh gối chiên, hotdog, khoai lang chiên, nước tương",
    nutrition: "Calo: ~750kcal | Tiết kiệm 15%",
  },

  // ===== COMBO ĐỒ UỐNG (6 sản phẩm) =====
  "Combo đồ uống 1": {
    desc: "🥤 Combo đồ uống 1: Trà đào. Phù hợp với nhóm 2 người.",
    ingredients: "Trà đào",
    nutrition: "Calo: ~440kcal | Tiết kiệm 15%",
  },
  "Combo đồ uống 2": {
    desc: "🥤 Combo đồ uống 2: Trà chanh nha đam. Phù hợp cho nhóm 2 người.",
    ingredients: "Trà chanh nha đam",
    nutrition: "Calo: ~500kcal | Tiết kiệm 10%",
  },
  "Combo đồ uống 3": {
    desc: "🥤 Combo đồ uống 3: Trà chanh. Phù hợp với nhóm 3 người.",
    ingredients: "Trà chanh",
    nutrition: "Calo: ~450kcal | Vitamin: Cao",
  },
  "Combo đồ uống 4": {
    desc: "🥤 Combo đồ uống 4: Cafe sữa + Cafe đen. Phù hợp cho nhóm 3 người.",
    ingredients: "Cafe sữa, Cafe đen",
    nutrition: "Calo: ~440kcal | Tiết kiệm 15%",
  },
  "Combo đồ uống 5": {
    desc: "🥤 Combo đồ uống 5 gồm: Trà sữa bạc hà + Trà sữa Socola + Trà sữa Ô long.",
    ingredients: "Trà sữa bạc hà, Trà sữa Socola, Trà sữa Ô long",
    nutrition: "Calo: ~450kcal | Vitamin: Cao",
  },
  "Combo đồ uống 6": {
    desc: "🥤 Combo đồ uống 6 gồm: Cafe sữa đá + Cafe Latte.",
    ingredients: "Cafe sữa đá, Cafe Latte",
    nutrition: "Calo: ~500kcal | Tiết kiệm 10%",
  },

  // ===== COMBO (3 sản phẩm) =====
  "Combo 1": {
    desc: "🍱 Combo 1 dành cho 1 người: 1 đồ uống + 1 đồ ăn vặt (tùy chọn).",
    ingredients: "1 đồ uống + 1 đồ ăn vặt",
    nutrition: "Tiết kiệm 10% | Linh hoạt lựa chọn",
  },
  "Combo 2": {
    desc: "🍱 Combo 2 dành cho 2 người: 2 đồ uống + 2 đồ ăn vặt + 1 bánh ngọt.",
    ingredients: "2 đồ uống + 2 đồ ăn vặt + 1 bánh ngọt",
    nutrition: "Tiết kiệm 15% | Phù hợp hẹn hò",
  },
  "Combo 3": {
    desc: "🍱 Combo 3 dành cho 4 người: 4 đồ uống + 3 đồ ăn vặt + 2 bánh ngọt.",
    ingredients: "4 đồ uống + 3 đồ ăn vặt + 2 bánh ngọt",
    nutrition: "Tiết kiệm 20% | Tiệc nhẹ cùng bạn bè",
  },
};

const defaultDetail = {
  desc: "✨ Sản phẩm chất lượng cao, nguyên liệu tươi ngon, chế biến theo công thức đặc biệt của Nbreak.",
  ingredients: "Nguyên liệu tự nhiên, tươi ngon, đảm bảo vệ sinh",
  nutrition: "Thông tin dinh dưỡng sẽ được cập nhật",
};

// =====================
// KHỞI TẠO
// =====================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Website khởi động");
  updateCartCount();
  assignCategoriesToProducts();
  updateCategoryCounts();
  attachProductClickEvents();
  setupCategoryFilter();
  setupDropdownMenu();
  setupSearch();
  setupSeasonEffect();
  initBanner();
  updateUserInterface();
});

// =====================
// GÁN CATEGORY CHO SẢN PHẨM
// =====================
function assignCategoriesToProducts() {
  const products = document.querySelectorAll(".sanpham");
  const categoryMapping = [
    { range: [0, 7], category: "coffee" },
    { range: [8, 14], category: "sinhto" },
    { range: [15, 23], category: "trasua" },
    { range: [24, 29], category: "nuocep" },
    { range: [30, 36], category: "travi" },
    { range: [37, 52], category: "doanvat" },
    { range: [53, 62], category: "banhngot" },
    { range: [63, 66], category: "combodoanvat" },
    { range: [67, 72], category: "combodouong" },
    { range: [73, 75], category: "combo" },
  ];
  products.forEach((p, index) => {
    const mapping = categoryMapping.find(
      (m) => index >= m.range[0] && index <= m.range[1],
    );
    p.dataset.category = mapping ? mapping.category : "other";
  });
}

// =====================
// CẬP NHẬT SỐ LƯỢNG SẢN PHẨM TRÊN MENU
// =====================
function updateCategoryCounts() {
  const products = document.querySelectorAll(".sanpham");
  let counts = {
    coffee: 0,
    sinhto: 0,
    trasua: 0,
    nuocep: 0,
    travi: 0,
    doanvat: 0,
    banhngot: 0,
    combodoanvat: 0,
    combodouong: 0,
    combo: 0,
  };
  products.forEach((p) => {
    const cat = p.dataset.category;
    if (counts[cat] !== undefined) counts[cat]++;
  });

  const menuMap = [
    { text: "Coffee", category: "coffee" },
    { text: "Sinh tố", category: "sinhto" },
    { text: "Trà sữa", category: "trasua" },
    { text: "Nước ép", category: "nuocep" },
    { text: "Trà vị", category: "travi" },
    { text: "Đồ ăn vặt", category: "doanvat" },
    { text: "Bánh ngọt", category: "banhngot" },
    { text: "Combo đồ ăn vặt", category: "combodoanvat" },
    { text: "Combo đồ uống", category: "combodouong" },
    { text: "Combo", category: "combo" },
  ];

  const menuItems = document.querySelectorAll(".menu-trai li");
  menuMap.forEach((map, index) => {
    if (menuItems[index]) {
      const count = counts[map.category] || 0;
      menuItems[index].innerHTML =
        `${map.text} <span class="count-product">(${count})</span>`;
    }
  });
}

// =====================
// LỌC DANH MỤC (MENU TRÁI)
// =====================
function setupCategoryFilter() {
  const menuItems = document.querySelectorAll(".menu-trai li");
  const categoryMap = {
    Coffee: "coffee",
    "Sinh tố": "sinhto",
    "Trà sữa": "trasua",
    "Nước ép": "nuocep",
    "Trà vị": "travi",
    "Đồ ăn vặt": "doanvat",
    "Bánh ngọt": "banhngot",
    "Combo đồ ăn vặt": "combodoanvat",
    "Combo đồ uống": "combodouong",
    Combo: "combo",
  };

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((li) => li.classList.remove("active-category"));
      item.classList.add("active-category");
      const text = item.innerText.split("(")[0].trim();
      const category = categoryMap[text] || "all";
      document.querySelectorAll(".sanpham").forEach((product) => {
        product.style.display =
          category === "all" || product.dataset.category === category
            ? "block"
            : "none";
      });
    });
  });
}

// =====================
// DROPDOWN MENU (HEADER)
// =====================
function setupDropdownMenu() {
  const dropdownLinks = document.querySelectorAll(".dropdown-content a");
  const linkMap = {
    coffee: "Coffee",
    sinhto: "Sinh tố",
    trasua: "Trà sữa",
    nuocep: "Nước ép",
    travi: "Trà vị",
    doanvat: "Đồ ăn vặt",
    banhngot: "Bánh ngọt",
    combodoanvat: "Combo đồ ăn vặt",
    combodouong: "Combo đồ uống",
    combo: "Combo",
  };

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.getAttribute("data-category");
      const targetText = linkMap[category];
      if (targetText) {
        const menuItems = document.querySelectorAll(".menu-trai li");
        const targetItem = Array.from(menuItems).find((item) =>
          item.innerText.includes(targetText),
        );
        if (targetItem) targetItem.click();
      }
    });
  });
}

// =====================
// TÌM KIẾM
// =====================
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch();
    });
  }
}

function performSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;
  const term = searchInput.value.toLowerCase().trim();
  const products = document.querySelectorAll(".sanpham");
  let found = false;

  if (term === "") {
    products.forEach((p) => (p.style.display = "block"));
    showToast("🔍 Hiển thị tất cả sản phẩm");
    return;
  }

  products.forEach((product) => {
    const name = product
      .querySelector(".sanpham-info div:first-child")
      ?.innerText.toLowerCase();
    if (name && name.includes(term)) {
      product.style.display = "block";
      found = true;
    } else {
      product.style.display = "none";
    }
  });
  showToast(
    found
      ? `🔍 Tìm thấy sản phẩm cho "${term}"`
      : `🔍 Không tìm thấy "${term}"`,
  );
}

function handleSearch(event) {
  if (event.key === "Enter") {
    performSearch();
  }
}

// =====================
// POPUP CHI TIẾT SẢN PHẨM
// =====================
function attachProductClickEvents() {
  document.querySelectorAll(".sanpham").forEach((product) => {
    const nameEl = product.querySelector(".sanpham-info div:first-child");
    if (nameEl) {
      nameEl.style.cursor = "pointer";
      nameEl.style.fontWeight = "bold";
      nameEl.onclick = () => {
        const name = nameEl.innerText;
        const price = parseInt(
          product.querySelector(".price").innerText.replace(/[^\d]/g, ""),
        );
        const img = product.querySelector(".sanpham-anh").src;
        const category = product.dataset.category;
        openProductDetail(name, price, img, category);
      };
    }
  });
}

function openProductDetail(name, price, img, category) {
  currentProduct = { name, price, img, category };
  currentQuantity = 1;
  const detail = productDetails[name] || defaultDetail;

  document.getElementById("detail-product-name").innerText = name;
  document.getElementById("detail-product-img").src = img;
  document.getElementById("detail-product-price").innerHTML =
    price.toLocaleString();
  document.getElementById("detail-product-desc").innerHTML = detail.desc;
  document.getElementById("detail-quantity").innerText = currentQuantity;

  const extraHtml = `<div class="detail-section"><h3>🥗 Thành phần</h3><p>${detail.ingredients}</p></div>
                     <div class="detail-section"><h3>📊 Dinh dưỡng</h3><p>${detail.nutrition}</p></div>`;
  const descDiv = document.getElementById("detail-product-desc");
  if (!descDiv.innerHTML.includes("Thành phần")) descDiv.innerHTML += extraHtml;

  loadSuggestedProducts(name, category);

  const popup = document.getElementById("product-detail-popup");
  popup.style.display = "flex";

  popup.onclick = function (event) {
    if (event.target === popup) {
      closeProductDetail();
    }
  };
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

function closeProductDetail() {
  document.getElementById("product-detail-popup").style.display = "none";
  currentProduct = null;
}

function addDetailToCart() {
  if (!currentProduct) return;
  for (let i = 0; i < currentQuantity; i++)
    addToCart(currentProduct.name, currentProduct.price);
  closeProductDetail();
  showToast(
    `✅ Đã thêm ${currentQuantity} ${currentProduct.name} vào giỏ hàng!`,
  );
}

function loadSuggestedProducts(productName, category) {
  const products = document.querySelectorAll(".sanpham");
  const suggestions = [];

  products.forEach((product) => {
    const name = product.querySelector(
      ".sanpham-info div:first-child",
    )?.innerText;
    const productCategory = product.dataset.category;

    if (productCategory === category && name !== productName) {
      const priceText = product.querySelector(".price")?.innerText;
      const price = parseInt(priceText?.replace(/[^\d]/g, ""));
      const img = product.querySelector(".sanpham-anh")?.src;

      if (name && price && img) {
        suggestions.push({ name, price, img, category: productCategory });
      }
    }
  });

  const grid = document.getElementById("suggested-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (suggestions.length === 0) {
    grid.innerHTML =
      '<p style="text-align:center; color:#999; grid-column: 1/-1;">✨ Chưa có sản phẩm gợi ý</p>';
    return;
  }

  suggestions.slice(0, 5).forEach((s) => {
    const div = document.createElement("div");
    div.className = "suggested-item";
    div.style.cssText =
      "background:#f9f9f9; border-radius:12px; padding:10px; text-align:center; cursor:pointer; transition:0.3s;";
    div.onclick = () => openProductDetail(s.name, s.price, s.img, s.category);
    div.onmouseenter = () => (div.style.transform = "translateY(-3px)");
    div.onmouseleave = () => (div.style.transform = "translateY(0)");

    div.innerHTML = `
      <img src="${s.img}" alt="${s.name}" style="width:100%; height:100px; object-fit:cover; border-radius:8px; margin-bottom:8px;">
      <div style="font-weight:bold; font-size:13px; color:#4b2e2b;">${s.name}</div>
      <div style="color:#e67e22; font-size:12px; margin-top:5px;">${s.price.toLocaleString()}đ</div>
    `;
    grid.appendChild(div);
  });
}

// =====================
// GIỎ HÀNG
// =====================
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
  saveCart();
  showToast(`✅ Đã thêm ${name} vào giỏ hàng!`);
  updateCartCount();
}

function removeFromCart(name) {
  const item = cart.find((p) => p.name === name);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) cart = cart.filter((p) => p.name !== name);
    saveCart();
    showToast(`📦 Đã xoá ${name} ra khỏi giỏ hàng`);
    updateCartCount();
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
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
// CHECKOUT
// =====================
function openCheckout() {
  if (cart.length === 0) {
    showToast("🛒 Giỏ hàng trống! Hãy thêm sản phẩm trước khi thanh toán.");
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
        <button onclick="removeCheckoutItem('${item.name}')" style="background:#e74c3c; color:white; border:none; border-radius:5px; padding:2px 8px; cursor:pointer;">Xóa</button>
      </div>
    `;
  });

  const bestVoucher = getBestVoucher(cart, total);
  const discountAmount = calculateDiscount(total, bestVoucher);
  const finalTotal = total - discountAmount;

  let voucherHtml = "";
  if (bestVoucher) {
    voucherHtml = `
      <div style="background: #e8f5e9; padding: 10px; border-radius: 8px; margin: 10px 0;">
        <div style="display: flex; justify-content: space-between;">
          <span><strong>🎉 ${bestVoucher.name}</strong><br><small>${bestVoucher.description || `Giảm ${bestVoucher.discount}%`}</small></span>
          <span style="color: #e67e22; font-weight: bold;">-${discountAmount.toLocaleString()}đ</span>
        </div>
      </div>
    `;
  }

  totalEl.innerHTML = `
    <div style="margin: 10px 0;">Tạm tính: <strong>${total.toLocaleString()}đ</strong></div>
    ${voucherHtml}
    <div style="font-size: 20px; margin-top: 15px;">Tổng cộng: <strong style="color: #e67e22;">${finalTotal.toLocaleString()}đ</strong></div>
  `;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    const nameInput = document.getElementById("customer-name");
    const phoneInput = document.getElementById("customer-phone");
    const addressInput = document.getElementById("customer-address");
    if (nameInput && !nameInput.value) nameInput.value = currentUser.name || "";
    if (phoneInput && !phoneInput.value)
      phoneInput.value = currentUser.phone || "";
    if (addressInput && !addressInput.value)
      addressInput.value = currentUser.address || "";
  }

  document.getElementById("checkout-popup").style.display = "flex";
}

function closeCheckout() {
  document.getElementById("checkout-popup").style.display = "none";
}

function removeCheckoutItem(name) {
  cart = cart.filter((item) => item.name !== name);
  saveCart();
  updateCartCount();
  openCheckout();
}

function confirmOrder() {
  const name = document.getElementById("customer-name")?.value;
  const phone = document.getElementById("customer-phone")?.value;
  const address = document.getElementById("customer-address")?.value;

  if (!name || !phone || !address) {
    showToast("⚠️ Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  const bestVoucher = getBestVoucher(cart, total);
  const discountAmount = calculateDiscount(total, bestVoucher);
  const finalTotal = total - discountAmount;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const order = {
    id: "#" + Date.now().toString().slice(-8),
    date: new Date().toLocaleString(),
    items: [...cart],
    total: finalTotal,
    originalTotal: total,
    customer: { name, phone, address },
    userEmail: currentUser ? currentUser.email : "guest",
    status: "pending",
    voucher: bestVoucher
      ? {
          name: bestVoucher.name,
          discount: bestVoucher.discount,
          saved: discountAmount,
        }
      : null,
  };

  const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
  orders.push(order);
  localStorage.setItem("orderHistory", JSON.stringify(orders));

  cart = [];
  saveCart();
  updateCartCount();
  closeCheckout();

  document.getElementById("display-name").innerText = name;
  document.getElementById("display-phone").innerText = phone;
  document.getElementById("display-address").innerText = address;
  document.getElementById("success-popup").style.display = "block";

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

  showToast(`🎉 Đặt hàng thành công! Mã đơn: ${order.id}`);

  if (typeof addNotification === "function") {
    addNotification(
      "✅ Đặt hàng thành công!",
      `Đơn hàng ${order.id} đã được xác nhận. Cảm ơn bạn đã mua sắm tại Nbreak!`,
      "order",
    );
  }
}

function closeSuccessPopup() {
  document.getElementById("success-popup").style.display = "none";
}

function closeSuccessPopupOnOutside(event) {
  if (event.target === document.getElementById("success-popup")) {
    closeSuccessPopup();
  }
}

// =====================
// CẬP NHẬT GIAO DIỆN NGƯỜI DÙNG
// =====================
function updateUserInterface() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const accountText = document.getElementById("account-text");
  const dropdownUsername = document.getElementById("dropdown-username");
  const dropdownEmail = document.getElementById("dropdown-email");
  const loginLogoutText = document.getElementById("login-logout-text");

  if (currentUser) {
    if (accountText)
      accountText.innerText = currentUser.name || currentUser.email;
    if (dropdownUsername)
      dropdownUsername.innerText = currentUser.name || currentUser.email;
    if (dropdownEmail) dropdownEmail.innerText = currentUser.email;
    if (loginLogoutText)
      loginLogoutText.innerHTML =
        '<i class="fa-solid fa-right-from-bracket"></i> Đăng xuất';
  } else {
    if (accountText) accountText.innerText = "Tài khoản";
    if (dropdownUsername) dropdownUsername.innerText = "Khách hàng";
    if (dropdownEmail) dropdownEmail.innerText = "Chưa đăng nhập";
    if (loginLogoutText)
      loginLogoutText.innerHTML =
        '<i class="fa-solid fa-right-to-bracket"></i> Đăng nhập';
  }
}

// =====================
// HIỆU ỨNG MÙA
// =====================
function setupSeasonEffect() {
  const month = new Date().getMonth() + 1;
  let icon = month <= 3 ? "🌸" : month <= 7 ? "☀️" : month <= 10 ? "🍂" : "❄️";
  setInterval(() => {
    const el = document.createElement("div");
    el.className = "falling-item";
    el.innerHTML = icon;
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = Math.random() * 20 + 10 + "px";
    el.style.animationDuration = Math.random() * 3 + 5 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 8000);
  }, 1000);
}

// =====================
// HOTLINE
// =====================
document.querySelectorAll(".nut-hotline").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      alert("📞 Liên hệ Nbreak: 0123 456 789");
    }
  });
});

// =====================
// XỬ LÝ KHI CHUYỂN TỪ MENU SANG TRANG CHỦ
// =====================
function checkAndOpenProductFromMenu() {
  const productData = localStorage.getItem("openProductDetail");
  if (productData) {
    localStorage.removeItem("openProductDetail");
    const product = JSON.parse(productData);
    setTimeout(() => {
      const categoryMap = {
        coffee: "Coffee",
        sinhto: "Sinh tố",
        trasua: "Trà sữa",
        nuocep: "Nước ép",
        travi: "Trà vị",
        doanvat: "Đồ ăn vặt",
        banhngot: "Bánh ngọt",
        combodoanvat: "Combo đồ ăn vặt",
        combodouong: "Combo đồ uống",
        combo: "Combo",
      };
      const menuText = categoryMap[product.category];
      if (menuText) {
        const menuItems = document.querySelectorAll(".menu-trai li");
        const targetItem = Array.from(menuItems).find((item) =>
          item.innerText.includes(menuText),
        );
        if (targetItem) targetItem.click();
      }
      setTimeout(() => {
        openProductDetail(
          product.name,
          product.price,
          product.img,
          product.category,
        );
      }, 300);
    }, 200);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkAndOpenProductFromMenu();
});
