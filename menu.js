// Dữ liệu sản phẩm đầy đủ cho menu
const menuProducts = {
  coffee: [
    {
      name: "Cafe sữa đá",
      price: 25000,
      img: "./image/cafe_sua_da.png",
      desc: "Cà phê đậm đà pha phin cùng sữa đặc thơm béo",
    },
    {
      name: "Cafe đen",
      price: 20000,
      img: "./image/cafe_den.png",
      desc: "Cà phê nguyên chất 100%, vị đắng đậm đà",
    },
    {
      name: "Cafe phin",
      price: 25000,
      img: "./image/cafe_phin.png",
      desc: "Cà phê phin truyền thống, thơm lừng",
    },
    {
      name: "Cafe Latte",
      price: 25000,
      img: "./image/cafe_latte.png",
      desc: "Espresso kết hợp sữa tươi đánh bông",
    },
    {
      name: "Cafe Sữa",
      price: 25000,
      img: "./image/cafe_sua.png",
      desc: "Cà phê đen hòa quyện sữa đặc",
    },
    {
      name: "Cafe nâu",
      price: 20000,
      img: "./image/cafe_nau.png",
      desc: "Cà phê nâu thơm ngon, béo ngậy",
    },
    {
      name: "Cafe phô mai muối",
      price: 40000,
      img: "./image/cafe_pho_mai_muoi.png",
      desc: "Lớp kem phô mai muối béo ngậy",
    },
    {
      name: "Cafe muối",
      price: 30000,
      img: "./image/cafe_muoi.png",
      desc: "Đặc sản Huế với lớp kem muối mặn mà",
    },
  ],
  sinhto: [
    {
      name: "Sinh tố dâu",
      price: 35000,
      img: "./image/st_dau.jpg",
      desc: "Dâu tây tươi xay nhuyễn cùng sữa đặc",
    },
    {
      name: "Sinh tố bơ",
      price: 35000,
      img: "./image/st_bo.png",
      desc: "Bơ sáp chín mềm xay cùng sữa tươi",
    },
    {
      name: "Sinh tố đào",
      price: 35000,
      img: "./image/st_dao.png",
      desc: "Đào tươi ngọt thanh xay cùng sữa chua",
    },
    {
      name: "Sinh tố chuối",
      price: 30000,
      img: "./image/st_chuoi.png",
      desc: "Chuối chín kết hợp sữa tươi",
    },
    {
      name: "Sinh tố táo",
      price: 30000,
      img: "./image/st_tao.png",
      desc: "Táo xanh tươi mát xay cùng sữa chua",
    },
    {
      name: "Sinh tố xoài",
      price: 30000,
      img: "./image/st_xoai.png",
      desc: "Xoài cát chín vàng thơm lừng",
    },
    {
      name: "Sinh tố việt quất",
      price: 30000,
      img: "./image/st_viet_quat.png",
      desc: "Việt quất tươi giàu chất chống oxy hóa",
    },
  ],
  trasua: [
    {
      name: "Trà sữa Matcha Latte",
      price: 28000,
      img: "./image/ts_matcha_latte.png",
      desc: "Bột trà xanh Nhật Bản cao cấp",
    },
    {
      name: "Trà sữa Socola",
      price: 28000,
      img: "./image/ts_socola.png",
      desc: "Bột cacao nguyên chất hòa quyện trà đen",
    },
    {
      name: "Trà sữa dâu tây",
      price: 30000,
      img: "./image/ts_dau_tay.png",
      desc: "Dâu tây tươi ngọt chua hấp dẫn",
    },
    {
      name: "Trà sữa kem trứng",
      price: 25000,
      img: "./image/ts_kem_trung.png",
      desc: "Lớp kem trứng béo ngậy phủ trên trà sữa",
    },
    {
      name: "Trà sữa việt quất",
      price: 30000,
      img: "./image/ts_viet_quat.png",
      desc: "Việt quất tươi giàu chất chống oxy hóa",
    },
    {
      name: "Trà sữa khoai môn",
      price: 20000,
      img: "./image/ts_khoai_mon.png",
      desc: "Khoai môn tím thơm bùi xay nhuyễn",
    },
    {
      name: "Trà sữa bạc hà",
      price: 20000,
      img: "./image/ts_bac_ha.png",
      desc: "Bạc hà tươi the mát, dễ chịu",
    },
    {
      name: "Trà sữa Kiwi",
      price: 25000,
      img: "./image/ts_kiwi.png",
      desc: "Kiwi xanh tươi giàu vitamin C",
    },
    {
      name: "Trà sữa Ô long",
      price: 20000,
      img: "./image/ts_o_long.png",
      desc: "Trà ô long Đài Loan thượng hạng",
    },
  ],
  nuocep: [
    {
      name: "Nước ép dưa hấu",
      price: 20000,
      img: "./image/dua_hau.png",
      desc: "Dưa hấu tươi 100%, giải nhiệt cơ thể",
    },
    {
      name: "Nước ép cam",
      price: 20000,
      img: "./image/cam.jpg",
      desc: "Cam sành tươi giàu vitamin C",
    },
    {
      name: "Nước ép chanh dây",
      price: 25000,
      img: "./image/chanh_day.png",
      desc: "Chanh dây tím tươi giàu chất xơ",
    },
    {
      name: "Nước ép dưa lưới",
      price: 25000,
      img: "./image/dua_luoi.png",
      desc: "Dưa lưới tươi ngọt thanh",
    },
    {
      name: "Nước ép thơm",
      price: 18000,
      img: "./image/thom.png",
      desc: "Dứa tươi giàu enzyme bromelain",
    },
    {
      name: "Nước ép cà rốt",
      price: 15000,
      img: "./image/ca_rot.png",
      desc: "Cà rốt tươi giàu beta-carotene",
    },
  ],
  travi: [
    {
      name: "Trà dâu tằm",
      price: 20000,
      img: "./image/tra_dau_tam.png",
      desc: "Dâu tằm tươi màu tím bắt mắt",
    },
    {
      name: "Trà bạc hà",
      price: 18000,
      img: "./image/tra_bac_ha.png",
      desc: "Bạc hà tươi the mát, dễ chịu",
    },
    {
      name: "Trà đào cam sả",
      price: 22000,
      img: "./image/dao_sa.png",
      desc: "Đào ngọt, cam chua, sả thơm",
    },
    {
      name: "Trà đào",
      price: 18000,
      img: "./image/tra_dao.png",
      desc: "Đào tươi ngọt thanh",
    },
    {
      name: "Trà dâu tây",
      price: 22000,
      img: "./image/tra_dau.png",
      desc: "Dâu tây tươi chua ngọt",
    },
    {
      name: "Trà chanh nha đam",
      price: 18000,
      img: "./image/nha_dam.png",
      desc: "Chanh tươi kết hợp nha đam",
    },
    {
      name: "Trà chanh",
      price: 18000,
      img: "./image/tra_chanh.png",
      desc: "Chanh tươi thanh mát",
    },
  ],
  doanvat: [
    {
      name: "Hạt hướng dương",
      price: 10000,
      img: "./image/huong_duong.png",
      desc: "Hạt hướng dương rang chín thơm ngon",
    },
    {
      name: "Phô mai que",
      price: 40000,
      img: "./image/pho_mai_que.png",
      desc: "Phô mai que chiên giòn, kéo sợi",
    },
    {
      name: "Xúc xích",
      price: 35000,
      img: "./image/xuc_xich.png",
      desc: "Xúc xích Đức nướng thơm ngon",
    },
    {
      name: "Lạp xưởng",
      price: 45000,
      img: "./image/lap_xuong.png",
      desc: "Lạp xưởng truyền thống đậm đà",
    },
    {
      name: "Tôm viên chiên",
      price: 40000,
      img: "./image/tom_vien.png",
      desc: "Tôm viên chiên giòn dai ngọt",
    },
    {
      name: "Cá viên chiên",
      price: 35000,
      img: "./image/ca_vien.png",
      desc: "Cá viên chiên vàng giòn",
    },
    {
      name: "Bò viên chiên",
      price: 45000,
      img: "./image/bo_vien.png",
      desc: "Bò viên chiên đậm đà",
    },
    {
      name: "Nem chua rán",
      price: 35000,
      img: "./image/nem.png",
      desc: "Nem chua rán giòn tan",
    },
    {
      name: "Bò khô",
      price: 50000,
      img: "./image/bo_kho.png",
      desc: "Bò khô dai dai đậm đà",
    },
    {
      name: "Đùi gà chiên KFC",
      price: 60000,
      img: "./image/dui_ga.png",
      desc: "Đùi gà chiên giòn tan",
    },
    {
      name: "Cánh gà chiên",
      price: 55000,
      img: "./image/canh_ga.png",
      desc: "Cánh gà chiên vàng giòn",
    },
    {
      name: "Bánh gối chiên",
      price: 55000,
      img: "./image/banh_goi.png",
      desc: "Bánh gối chiên vỏ giòn nhân thịt",
    },
    {
      name: "Khoai tây chiên lắc phô mai",
      price: 35000,
      img: "./image/khoai_tay_lac_pho_mai.png",
      desc: "Khoai tây chiên lắc phô mai thơm béo",
    },
    {
      name: "Khoai tây chiên",
      price: 30000,
      img: "./image/khoai_tay.png",
      desc: "Khoai tây chiên vàng giòn",
    },
    {
      name: "Khoai lang chiên",
      price: 30000,
      img: "./image/khoai_lang.png",
      desc: "Khoai lang chiên ngọt tự nhiên",
    },
    {
      name: "Hotdog xúc xích phô mai",
      price: 40000,
      img: "./image/hotdog.png",
      desc: "Hotdog xúc xích phô mai béo ngậy",
    },
  ],
  banhngot: [
    {
      name: "Bánh FLAN",
      price: 25000,
      img: "./image/flan.png",
      desc: "Bánh FLAN mềm mịn thơm béo",
    },
    {
      name: "Bánh ngọt",
      price: 20000,
      img: "./image/banh_ngot.png",
      desc: "Bánh ngọt đa dạng hương vị",
    },
    {
      name: "Bánh Panna Cotta",
      price: 20000,
      img: "./image/cotta.png",
      desc: "Panna Cotta kem sữa mịn màng",
    },
    {
      name: "Bánh Cookies",
      price: 20000,
      img: "./image/cookies.png",
      desc: "Cookies giòn tan thơm bơ",
    },
    {
      name: "Tiramisu",
      price: 25000,
      img: "./image/tiramisu.png",
      desc: "Tiramisu kem mascarpone béo ngậy",
    },
    {
      name: "Bánh Muffin",
      price: 25000,
      img: "./image/muffin.png",
      desc: "Muffin mềm xốp thơm bơ",
    },
    {
      name: "Bánh Mì",
      price: 25000,
      img: "./image/banh_mi.png",
      desc: "Bánh mì tươi giòn bên ngoài",
    },
    {
      name: "Bánh Macaron",
      price: 25000,
      img: "./image/macaron.png",
      desc: "Macaron Pháp màu sắc bắt mắt",
    },
    {
      name: "Bánh Mousse Cake",
      price: 25000,
      img: "./image/cake.png",
      desc: "Mousse Cake bông xốp mịn màng",
    },
    {
      name: "Bánh Cheese Cake",
      price: 25000,
      img: "./image/cheese.png",
      desc: "Cheese Cake phô mai béo ngậy",
    },
  ],
  combodoanvat: [
    {
      name: "Combo đồ ăn vặt 1",
      price: 65000,
      img: "./image/anvat_1.png",
      desc: "Gà rán + Phô mai que + Khoai tây chiên + Nước ngọt",
    },
    {
      name: "Combo đồ ăn vặt 2",
      price: 75000,
      img: "./image/anvat_2.png",
      desc: "Bò khô + Hạt hướng dương + Nem chua rán + Trà đào",
    },
    {
      name: "Combo đồ ăn vặt 3",
      price: 85000,
      img: "./image/anvat_3.png",
      desc: "Tôm viên + Cá viên + Bò viên + Sốt mayonnaise",
    },
    {
      name: "Combo đồ ăn vặt 4",
      price: 65000,
      img: "./image/anvat_4.png",
      desc: "Bánh gối + Hotdog + Khoai lang chiên + Nước tương",
    },
  ],
  combodouong: [
    {
      name: "Combo đồ uống 1",
      price: 45000,
      img: "./image/douong_1.png",
      desc: "Trà đào + Bánh ngọt",
    },
    {
      name: "Combo đồ uống 2",
      price: 55000,
      img: "./image/douong_2.png",
      desc: "Trà chanh nha đam + Bánh FLAN",
    },
    {
      name: "Combo đồ uống 3",
      price: 55000,
      img: "./image/douong_3.png",
      desc: "Trà chanh + Bánh Cookies",
    },
    {
      name: "Combo đồ uống 4",
      price: 55000,
      img: "./image/douong_4.png",
      desc: "Cafe sữa + Cafe đen",
    },
    {
      name: "Combo đồ uống 5",
      price: 55000,
      img: "./image/douong_5.png",
      desc: "Trà sữa bạc hà + Trà sữa Socola + Trà sữa Ô long",
    },
    {
      name: "Combo đồ uống 6",
      price: 55000,
      img: "./image/douong_6.png",
      desc: "Cafe sữa đá + Cafe Latte",
    },
  ],
  combo: [
    {
      name: "Combo 1",
      price: 60000,
      img: "./image/combo_1.png",
      desc: "1 đồ uống + 1 đồ ăn vặt (tùy chọn)",
    },
    {
      name: "Combo 2",
      price: 60000,
      img: "./image/combo_2.png",
      desc: "2 đồ uống + 2 đồ ăn vặt + 1 bánh ngọt",
    },
    {
      name: "Combo 3",
      price: 60000,
      img: "./image/combo_3.png",
      desc: "4 đồ uống + 3 đồ ăn vặt + 2 bánh ngọt",
    },
  ],
};

function displayMenu() {
  const categories = [
    "coffee",
    "sinhto",
    "trasua",
    "nuocep",
    "travi",
    "doanvat",
    "banhngot",
    "combodoanvat",
    "combodouong",
    "combo",
  ];

  categories.forEach((cat) => {
    const grid = document.getElementById(`${cat}-grid`);
    if (grid && menuProducts[cat]) {
      grid.innerHTML = menuProducts[cat]
        .map(
          (product) => `
        <div class="menu-item">
          <img class="menu-item-img" src="${product.img}" alt="${product.name}" onerror="this.src='image/logo.jpg'">
          <div class="menu-item-info">
            <h3 style="cursor: pointer; color: #4b2e2b;" onclick="goToProduct('${product.name}', '${product.price}', '${product.img}', '${product.category}')">${product.name}</h3>
            <div class="price">${product.price.toLocaleString()}đ</div>
            <p class="desc">${product.desc}</p>
          </div>
          <button class="menu-item-btn" onclick="addToCart('${product.name}', ${product.price})">+</button>
        </div>
      `,
        )
        .join("");
    }
  });
}

// Chuyển đến sản phẩm trên trang chủ
function goToProduct(productName, productPrice, productImg, category) {
  // Lưu thông tin vào localStorage
  localStorage.setItem(
    "openProductDetail",
    JSON.stringify({
      name: productName,
      price: productPrice,
      img: productImg,
      category: category,
    }),
  );

  // Chuyển đến trang chủ
  window.location.href = "trang_chu.html";
}

// Chuyển đến danh mục trên trang chủ
function goToCategory(categoryName) {
  localStorage.setItem("scrollToCategory", categoryName);
  window.location.href = "trang_chu.html";
}

// Khởi tạo menu
document.addEventListener("DOMContentLoaded", () => {
  displayMenu();
  // Cập nhật số lượng giỏ hàng nếu có
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
});
