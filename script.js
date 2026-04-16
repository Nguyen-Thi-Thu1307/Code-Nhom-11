// =====================
// BIẾN TOÀN CỤC
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = null;
let currentQuantity = 1;

// =====================
// DỮ LIỆU MÔ TẢ CHI TIẾT CHO TỪNG SẢN PHẨM
// =====================
const productDetails = {
  // ===== COFFEE (6 sản phẩm) =====
  "Cafe sữa đá": {
    desc: "☕ **Cafe sữa đá** là thức uống truyền thống của Việt Nam. Cà phê Robusta đậm đà được pha bằng phin, kết hợp với sữa đặc thơm béo và đá viên mát lạnh. Thức uống mang đến hương vị đắng nhẹ, ngọt dịu, rất thích hợp để khởi đầu ngày mới hoặc thư giãn cùng bạn bè.",
    ingredients: "Cà phê Robusta, sữa đặc, đá viên",
    nutrition: "Calo: ~120kcal | Caffein: ~100mg",
  },
  "Cafe đen": {
    desc: "☕ **Cafe đen** là cà phê nguyên chất 100%, không pha sữa, không đường. Hạt cà phê được rang xay kỹ lưỡng, pha bằng phin truyền thống, giữ trọn vị đắng đậm đà, thơm lừng và hậu vị kéo dài.",
    ingredients: "Cà phê Robusta nguyên chất, nước sôi",
    nutrition: "Calo: ~5kcal | Caffein: ~120mg",
  },
  "Cafe phin": {
    desc: "☕ **Cafe phin** - Hương vị cà phê Việt Nam truyền thống. Cà phê được ủ chậm qua phin nhôm, từng giọt cà phê đen sánh, thơm lừng rơi xuống ly, tạo nên thức uống đậm đà, tinh tế.",
    ingredients: "Cà phê Robusta, nước nóng (pha phin)",
    nutrition: "Calo: ~5kcal | Caffein: ~110mg",
  },
  "Cafe Latte": {
    desc: "☕ **Cafe Latte** là sự kết hợp hoàn hảo giữa espresso Ý và sữa tươi đánh bông. Lớp foam mịn màng trên cùng tạo cảm giác nhẹ nhàng, béo ngậy. Hương vị hài hòa giữa cà phê và sữa.",
    ingredients: "Espresso, sữa tươi, foam sữa",
    nutrition: "Calo: ~180kcal | Caffein: ~80mg",
  },
  "Cafe Sữa dừa": {
    desc: "🥥 **Cafe Sữa dừa** - Sự kết hợp độc đáo giữa cà phê đen đậm đà và nước cốt dừa béo ngậy. Hương thơm của dừa quyện cùng vị cà phê tạo nên thức uống thơm ngon, lạ miệng.",
    ingredients: "Cà phê đen, nước cốt dừa, sữa đặc, đá",
    nutrition: "Calo: ~200kcal | Caffein: ~90mg",
  },
  "Cafe muối": {
    desc: "🧂 **Cafe muối** - Đặc sản của Huế. Lớp kem muối mặn mà, béo ngậy phủ trên cà phê đen đậm đà, tạo nên hương vị độc đáo khó quên.",
    ingredients: "Cà phê đen, kem muối, sữa",
    nutrition: "Calo: ~150kcal | Caffein: ~95mg",
  },

  // ===== SINH TỐ (6 sản phẩm) =====
  "Sinh tố dâu": {
    desc: "🍓 **Sinh tố dâu** được làm từ dâu tây tươi nhập khẩu, xay nhuyễn cùng sữa đặc và đá viên. Thức uống có màu hồng tự nhiên, vị chua ngọt thanh mát, giàu vitamin C.",
    ingredients: "Dâu tây tươi, sữa đặc, đá viên, đường",
    nutrition: "Calo: ~150kcal | Vitamin C: 70mg",
  },
  "Sinh tố bơ": {
    desc: "🥑 **Sinh tố bơ** được làm từ bơ sáp chín mềm, xay cùng sữa đặc và sữa tươi. Thức uống béo ngậy, thơm bùi, rất bổ dưỡng và tốt cho tim mạch.",
    ingredients: "Bơ sáp, sữa đặc, sữa tươi, đá",
    nutrition: "Calo: ~280kcal | Chất béo tốt: 15g",
  },
  "Sinh tố đào": {
    desc: "🍑 **Sinh tố đào** được làm từ đào tươi nhập khẩu, xay cùng sữa chua và mật ong. Hương vị ngọt thanh, thơm nhẹ, giúp giải nhiệt và làm đẹp da.",
    ingredients: "Đào tươi, sữa chua, mật ong, đá",
    nutrition: "Calo: ~130kcal | Vitamin A: 15%",
  },
  "Sinh tố chuối": {
    desc: "🍌 **Sinh tố chuối** được làm từ chuối chín thơm ngọt, kết hợp với sữa tươi và sữa chua. Thức uống bổ dưỡng, giàu kali, tốt cho tiêu hóa.",
    ingredients: "Chuối chín, sữa tươi, sữa chua, mật ong",
    nutrition: "Calo: ~200kcal | Kali: 400mg",
  },
  "Sinh tố táo": {
    desc: "🍎 **Sinh tố táo** được làm từ táo xanh tươi mát, xay cùng sữa chua và gừng tươi. Hương vị chua nhẹ, thơm mát, giúp thanh lọc cơ thể.",
    ingredients: "Táo xanh, sữa chua, gừng, mật ong",
    nutrition: "Calo: ~120kcal | Chất xơ: 5g",
  },
  "Sinh tố xoài": {
    desc: "🥭 **Sinh tố xoài** được làm từ xoài cát chín vàng, xay nhuyễn cùng sữa đặc và sữa tươi. Thức uống có màu vàng bắt mắt, vị ngọt thanh, thơm lừng.",
    ingredients: "Xoài cát, sữa đặc, sữa tươi, đá",
    nutrition: "Calo: ~170kcal | Vitamin C: 60mg",
  },

  // ===== TRÀ SỮA (9 sản phẩm) =====
  "Trà sữa Matcha Latte": {
    desc: "🍵 **Trà sữa Matcha Latte** được làm từ bột trà xanh Nhật Bản cao cấp, kết hợp với sữa tươi béo ngậy. Hương vị trà xanh thanh mát, hậu vị ngọt nhẹ, rất tốt cho sức khỏe.",
    ingredients: "Bột matcha Nhật, sữa tươi, trân châu",
    nutrition: "Calo: ~220kcal | Chất chống oxy hóa: Cao",
  },
  "Trà sữa Socola": {
    desc: "🍫 **Trà sữa Socola** được làm từ bột cacao nguyên chất, hòa quyện cùng trà đen và sữa tươi. Thức uống có vị đắng nhẹ của socola, ngọt dịu của trà sữa.",
    ingredients: "Bột cacao, trà đen, sữa tươi, trân châu",
    nutrition: "Calo: ~250kcal | Theobromine: 50mg",
  },
  "Trà sữa dâu tằm": {
    desc: "🍓 **Trà sữa dâu tằm** được làm từ dâu tằm tươi, kết hợp cùng trà sữa thơm ngon. Màu sắc tím bắt mắt, vị chua ngọt tự nhiên.",
    ingredients: "Dâu tằm tươi, trà đen, sữa, trân châu",
    nutrition: "Calo: ~200kcal | Vitamin C: 50mg",
  },
  "Trà sữa kem trứng": {
    desc: "🥚 **Trà sữa kem trứng** - Đặc sản đến từ Đài Loan. Lớp kem trứng béo ngậy, mịn màng phủ trên trà sữa thơm ngon.",
    ingredients: "Trà đen, sữa, kem trứng, trân châu",
    nutrition: "Calo: ~300kcal | Protein: 8g",
  },
  "Trà sữa việt quất": {
    desc: "🫐 **Trà sữa việt quất** được làm từ quả việt quất tươi, giàu chất chống oxy hóa. Hương vị chua ngọt hài hòa cùng trà sữa béo ngậy.",
    ingredients: "Việt quất, trà đen, sữa, trân châu",
    nutrition: "Calo: ~210kcal | Anthocyanin: Cao",
  },
  "Trà sữa khoai môn": {
    desc: "🍠 **Trà sữa khoai môn** được làm từ khoai môn tím thơm bùi, xay nhuyễn cùng trà sữa. Màu sắc tím đẹp mắt, vị bùi bùi, thơm ngon.",
    ingredients: "Khoai môn tím, trà đen, sữa, trân châu",
    nutrition: "Calo: ~230kcal | Chất xơ: 4g",
  },
  "Trà sữa bạc hà": {
    desc: "🌿 **Trà sữa bạc hà** được làm từ lá bạc hà tươi, kết hợp cùng trà đen và sữa. Thức uống có vị the mát, dễ chịu, giúp thanh lọc cơ thể.",
    ingredients: "Bạc hà tươi, trà đen, sữa, trân châu",
    nutrition: "Calo: ~180kcal | Tốt cho tiêu hóa",
  },
  "Trà sữa Kiwi": {
    desc: "🥝 **Trà sữa Kiwi** được làm từ kiwi xanh tươi, giàu vitamin C. Hương vị chua ngọt đặc trưng, kết hợp cùng trà sữa béo ngậy.",
    ingredients: "Kiwi xanh, trà đen, sữa, trân châu",
    nutrition: "Calo: ~190kcal | Vitamin C: 90mg",
  },
  "Trà sữa Ô long": {
    desc: "🍃 **Trà sữa Ô long** được pha từ trà ô long Đài Loan thượng hạng, hương thơm nhẹ nhàng, thanh tao. Kết hợp cùng sữa tươi béo ngậy.",
    ingredients: "Trà ô long Đài Loan, sữa tươi, trân châu",
    nutrition: "Calo: ~200kcal | Chất chống oxy hóa: Cao",
  },

  // ===== NƯỚC ÉP (6 sản phẩm) =====
  "Nước ép dưa hấu": {
    desc: "🍉 **Nước ép dưa hấu** 100% từ trái dưa hấu tươi, không đường, không chất bảo quản. Giàu vitamin A, C và lycopene, giúp giải nhiệt cơ thể.",
    ingredients: "Dưa hấu tươi (100%)",
    nutrition: "Calo: ~60kcal | Lycopene: 10mg",
  },
  "Nước ép cam": {
    desc: "🍊 **Nước ép cam** được vắt từ cam sành tươi, giữ nguyên vị chua ngọt tự nhiên. Giàu vitamin C, tăng sức đề kháng, làm đẹp da.",
    ingredients: "Cam sành tươi (100%)",
    nutrition: "Calo: ~70kcal | Vitamin C: 80mg",
  },
  "Nước ép chanh dây": {
    desc: "🟡 **Nước ép chanh dây** được làm từ chanh dây tím tươi, giàu vitamin A, C và chất xơ. Hương vị chua chua, ngọt ngọt, giúp thanh lọc cơ thể.",
    ingredients: "Chanh dây tím, đường, nước",
    nutrition: "Calo: ~80kcal | Chất xơ: 5g",
  },
  "Nước ép chanh lưới": {
    desc: "🍈 **Nước ép chanh lưới** được làm từ chanh lưới tươi, vị chua thanh, thơm nhẹ, rất giàu vitamin C và chất chống oxy hóa.",
    ingredients: "Chanh lưới tươi, đường, nước",
    nutrition: "Calo: ~65kcal | Vitamin C: 70mg",
  },
  "Nước ép thơm": {
    desc: "🍍 **Nước ép thơm** (dứa) được làm từ dứa tươi ngọt thanh, giàu enzyme bromelain tốt cho tiêu hóa, giúp giảm viêm và tăng cường miễn dịch.",
    ingredients: "Dứa tươi (100%)",
    nutrition: "Calo: ~75kcal | Bromelain: Cao",
  },
  "Nước ép cà rốt": {
    desc: "🥕 **Nước ép cà rốt** được ép từ cà rốt tươi, giàu beta-carotene, vitamin A tốt cho mắt, da và hệ miễn dịch.",
    ingredients: "Cà rốt tươi (100%)",
    nutrition: "Calo: ~55kcal | Vitamin A: 200%",
  },

  // ===== TRÀ VỊ (6 sản phẩm) =====
  "Trà bạc hà": {
    desc: "🌿 **Trà bạc hà** được pha từ lá bạc hà tươi, có vị the mát, dễ chịu. Giúp giảm căng thẳng, tốt cho tiêu hóa và hơi thở thơm mát.",
    ingredients: "Lá bạc hà tươi, nước nóng",
    nutrition: "Calo: ~5kcal | Tốt cho tiêu hóa",
  },
  "Trà đào cam sả": {
    desc: "🍑 **Trà đào cam sả** là sự kết hợp hài hòa giữa vị ngọt thanh của đào, chua nhẹ của cam và hương thơm của sả. Thức uống giải nhiệt tuyệt vời.",
    ingredients: "Đào, cam, sả, trà nền",
    nutrition: "Calo: ~90kcal | Vitamin C: 40mg",
  },
  "Trà đào": {
    desc: "🍑 **Trà đào** là thức uống thanh mát với vị ngọt tự nhiên từ đào tươi, kết hợp cùng trà nền thơm nhẹ. Rất thích hợp để thư giãn.",
    ingredients: "Đào tươi, trà nền, đường",
    nutrition: "Calo: ~80kcal | Chất chống oxy hóa",
  },
  "Trà dâu": {
    desc: "🍓 **Trà dâu** được làm từ dâu tây tươi, kết hợp cùng trà nền tạo nên thức uống có màu hồng đẹp mắt, vị chua ngọt hấp dẫn.",
    ingredients: "Dâu tây tươi, trà nền, đường",
    nutrition: "Calo: ~85kcal | Vitamin C: 50mg",
  },
  "Trà chanh nha đam": {
    desc: "🍋 **Trà chanh nha đam** là thức uống thanh lọc cơ thể tuyệt vời. Vị chua của chanh kết hợp với nha đam giòn mát, rất tốt cho làn da.",
    ingredients: "Chanh tươi, nha đam, trà nền, mật ong",
    nutrition: "Calo: ~70kcal | Tốt cho da",
  },
  "Trà chanh": {
    desc: "🍋 **Trà chanh** là thức uống đơn giản nhưng thanh mát, dễ làm. Vị chua của chanh kết hợp với vị ngọt nhẹ của đường, rất giải khát.",
    ingredients: "Chanh tươi, trà nền, đường",
    nutrition: "Calo: ~60kcal | Vitamin C: 30mg",
  },

  // ===== ĐỒ ĂN VẶT (16 sản phẩm) =====
  "Hạt hướng dương": {
    desc: "🌻 **Hạt hướng dương** được rang chín thơm ngon, giòn tan. Giàu vitamin E, chất béo tốt, rất thích hợp để nhâm nhi khi xem phim hoặc trò chuyện cùng bạn bè.",
    ingredients: "Hạt hướng dương, muối",
    nutrition: "Calo: ~580kcal/100g | Vitamin E: 35mg",
  },
  "Phô mai que": {
    desc: "🧀 **Phô mai que** được làm từ phô mai cao cấp, chiên giòn vàng ruộm, béo ngậy, kéo sợi dai dai. Món ăn vặt được giới trẻ yêu thích.",
    ingredients: "Phô mai Mozzarella, bột chiên xù",
    nutrition: "Calo: ~350kcal/100g | Canxi: 500mg",
  },
  "Xúc xích": {
    desc: "🌭 **Xúc xích** Đức thơm ngon, được nướng trên than hồng, da giòn, thịt bên trong mềm ngọt. Ăn kèm tương ớt hoặc tương cà.",
    ingredients: "Thịt heo, gia vị, vỏ collagen",
    nutrition: "Calo: ~280kcal/100g | Protein: 12g",
  },
  "Lạp xưởng": {
    desc: "🥓 **Lạp xưởng** truyền thống được làm từ thịt heo xay nhuyễn, tẩm ướp gia vị đặc biệt, chiên thơm hoặc hấp đều ngon.",
    ingredients: "Thịt heo, mỡ, gia vị, đường",
    nutrition: "Calo: ~450kcal/100g | Protein: 15g",
  },
  "Tôm viên chiên": {
    desc: "🍤 **Tôm viên chiên** được làm từ tôm tươi xay nhuyễn, viên tròn, chiên giòn vàng. Thịt tôm dai ngọt, thơm ngon khó cưỡng.",
    ingredients: "Tôm tươi, bột mì, gia vị",
    nutrition: "Calo: ~220kcal/100g | Protein: 14g",
  },
  "Cá viên chiên": {
    desc: "🐟 **Cá viên chiên** được làm từ thịt cá tươi, xay nhuyễn, viên tròn và chiên giòn. Vị cá ngọt tự nhiên, dai dai, rất hấp dẫn.",
    ingredients: "Thịt cá tươi, bột mì, gia vị",
    nutrition: "Calo: ~200kcal/100g | Omega-3: Tốt",
  },
  "Bò viên chiên": {
    desc: "🥩 **Bò viên chiên** được làm từ thịt bò xay, viên tròn, chiên vàng. Thịt bò dai ngon, đậm đà, thích hợp làm món nhậu.",
    ingredients: "Thịt bò, bột mì, gia vị",
    nutrition: "Calo: ~250kcal/100g | Sắt: 2mg",
  },
  "Nem chua rán": {
    desc: "🍢 **Nem chua rán** là món ăn vặt quen thuộc. Nem chua được bọc bột chiên giòn, chấm cùng tương ớt cay cay, chua chua.",
    ingredients: "Nem chua, bột chiên, gia vị",
    nutrition: "Calo: ~300kcal/100g | Protein: 10g",
  },
  "Bò khô": {
    desc: "🥩 **Bò khô** được làm từ thịt bò thượng hạng, tẩm ướp gia vị đặc biệt, sấy khô vừa ăn. Dai dai, đậm đà, thích hợp nhâm nhi.",
    ingredients: "Thịt bò, gia vị, ớt, sả",
    nutrition: "Calo: ~350kcal/100g | Protein: 30g",
  },
  "Đùi gà chiên KFC": {
    desc: "🍗 **Đùi gà chiên** kiểu KFC với lớp da giòn tan, thịt bên trong mềm ngọt, được tẩm ướp gia vị đặc biệt. Món ăn được mọi lứa tuổi yêu thích.",
    ingredients: "Đùi gà tươi, bột chiên, gia vị",
    nutrition: "Calo: ~320kcal/100g | Protein: 18g",
  },
  "Cánh gà chiên": {
    desc: "🍗 **Cánh gà chiên** vàng giòn, thịt ngọt mềm, được tẩm ướp gia vị đậm đà. Thích hợp làm món khai vị hoặc ăn chơi.",
    ingredients: "Cánh gà tươi, bột chiên, gia vị",
    nutrition: "Calo: ~300kcal/100g | Protein: 16g",
  },
  "Sủi cảo chiên": {
    desc: "🥟 **Sủi cảo chiên** có vỏ giòn tan, nhân thịt bên trong thơm ngon, đậm đà. Chấm cùng nước tương hoặc tương ớt rất hấp dẫn.",
    ingredients: "Bột mì, thịt heo, nấm mèo, gia vị",
    nutrition: "Calo: ~280kcal/100g | Protein: 10g",
  },
  "Khoai tây chiên lắc phô mai": {
    desc: "🍟 **Khoai tây chiên lắc phô mai** được làm từ khoai tây tươi cắt sợi, chiên giòn và lắc đều với bột phô mai thơm béo. Món ăn gây nghiện!",
    ingredients: "Khoai tây, bột phô mai, dầu ăn",
    nutrition: "Calo: ~350kcal/100g | Carbs: 40g",
  },
  "Khoai tây chiên": {
    desc: "🍟 **Khoai tây chiên** vàng ươm, giòn rụm, được chiên từ dầu thực vật nguyên chất. Món ăn vặt kinh điển không thể thiếu.",
    ingredients: "Khoai tây, dầu ăn, muối",
    nutrition: "Calo: ~320kcal/100g | Kali: 400mg",
  },
  "Khoai lang chiên": {
    desc: "🍠 **Khoai lang chiên** được làm từ khoai lang mật vàng ươm, chiên giòn, vị ngọt tự nhiên, bùi bùi. Món ăn vặt lành mạnh hơn khoai tây.",
    ingredients: "Khoai lang, dầu ăn",
    nutrition: "Calo: ~280kcal/100g | Vitamin A: 100%",
  },
  "Hotdog xúc xích phô mai": {
    desc: "🌭 **Hotdog xúc xích phô mai** là sự kết hợp hoàn hảo giữa xúc xích thơm ngon, phô mai béo ngậy bên trong, bánh mì mềm và các loại sốt.",
    ingredients: "Xúc xích phô mai, bánh mì, sốt cà chua, sốt mayonnaise",
    nutrition: "Calo: ~380kcal | Protein: 12g",
  },

  // ===== BÁNH NGỌT (10 sản phẩm) =====
  "Bánh FLAN": {
    desc: "🍮 **Bánh FLAN** mềm mịn, thơm béo, vị ngọt dịu nhẹ, ăn kèm đá bào và cà phê đắng tạo nên hương vị khó quên.",
    ingredients: "Trứng, sữa tươi, đường, vani",
    nutrition: "Calo: ~150kcal/phần | Protein: 5g",
  },
  "Bánh ngọt": {
    desc: "🍰 **Bánh ngọt** đa dạng hương vị, mềm xốp, thơm ngon, thích hợp cho bữa trà chiều hoặc làm quà tặng.",
    ingredients: "Bột mì, trứng, đường, bơ, sữa",
    nutrition: "Calo: ~350kcal/100g | Carbs: 45g",
  },
  "Bánh Panna Cotta": {
    desc: "🍮 **Panna Cotta** là món tráng miệng Ý với lớp kem sữa mịn màng, béo ngậy, thường được ăn kèm với sốt trái cây.",
    ingredients: "Kem tươi, sữa tươi, đường, gelatin, vani",
    nutrition: "Calo: ~250kcal/phần | Canxi: 100mg",
  },
  "Bánh Cookies": {
    desc: "🍪 **Bánh Cookies** giòn tan, thơm bơ, với những hạt socola hoặc hạt điều bên trong. Thích hợp nhâm nhi cùng trà nóng.",
    ingredients: "Bột mì, bơ, đường, trứng, socola chip",
    nutrition: "Calo: ~480kcal/100g | Chất béo: 25g",
  },
  Tiramisu: {
    desc: "🍰 **Tiramisu** là món bánh Ý nổi tiếng với lớp kem mascarpone béo ngậy, xốp cùng hương vị cà phê đậm đà và lớp bột cacao phủ trên cùng.",
    ingredients: "Mascarpone, cà phê, trứng, đường, bánh ladyfinger",
    nutrition: "Calo: ~400kcal/phần | Caffein: 20mg",
  },
  "Bánh Muffin": {
    desc: "🧁 **Bánh Muffin** mềm xốp, thơm bơ, có nhiều hương vị khác nhau như socola, việt quất, chuối. Thích hợp cho bữa sáng.",
    ingredients: "Bột mì, bơ, trứng, đường, sữa",
    nutrition: "Calo: ~350kcal/phần | Carbs: 45g",
  },
  "Bánh Mì": {
    desc: "🥖 **Bánh Mì** tươi giòn tan bên ngoài, mềm bên trong. Có thể ăn kèm với bơ, mứt hoặc làm bánh mì kẹp.",
    ingredients: "Bột mì, men nở, muối, nước",
    nutrition: "Calo: ~265kcal/100g | Carbs: 50g",
  },
  "Bánh Macaron": {
    desc: "🍬 **Bánh Macaron** là loại bánh ngọt Pháp sang trọng với lớp vỏ giòn, nhân mềm mịn, nhiều màu sắc và hương vị.",
    ingredients: "Bột hạnh nhân, đường, lòng trắng trứng, nhân kem",
    nutrition: "Calo: ~120kcal/cái | Đường: 10g",
  },
  "Bánh Mousse Cake": {
    desc: "🍰 **Bánh Mousse Cake** có lớp mousse bông xốp, mịn màng, kết hợp với đế bánh bông lan mềm. Hương vị đa dạng như dâu, socola, matcha.",
    ingredients: "Kem tươi, trứng, đường, gelatin, trái cây",
    nutrition: "Calo: ~320kcal/phần | Chất béo: 20g",
  },
  "Bánh Cheese Cake": {
    desc: "🍰 **Bánh Cheese Cake** (Bánh phô mai) với lớp phô mai béo ngậy, mịn màng, đế bánh giòn tan. Có hai loại: nướng và không nướng.",
    ingredients: "Cream cheese, trứng, đường, bánh quy, bơ",
    nutrition: "Calo: ~380kcal/phần | Canxi: 150mg",
  },

  // ===== COMBO ĐỒ ĂN VẶT (5 sản phẩm) =====
  "Combo đồ ăn vặt 1": {
    desc: "🍱 **Combo đồ ăn vặt 1** bao gồm: Khoai tây chiên + Xúc xích + Nước ngọt. Phù hợp cho 1 người ăn nhẹ.",
    ingredients: "Khoai tây chiên, xúc xích, nước ngọt",
    nutrition: "Calo: ~550kcal | Tiết kiệm 15%",
  },
  "Combo đồ ăn vặt 2": {
    desc: "🍱 **Combo đồ ăn vặt 2** bao gồm: Gà rán + Phô mai que + Khoai tây chiên + Nước ngọt. Combo đầy đủ cho 2 người.",
    ingredients: "Gà rán, phô mai que, khoai tây chiên, nước ngọt",
    nutrition: "Calo: ~850kcal | Tiết kiệm 20%",
  },
  "Combo đồ ăn vặt 3": {
    desc: "🍱 **Combo đồ ăn vặt 3** bao gồm: Bò khô + Hạt hướng dương + Nem chua rán + Trà đào. Thích hợp cho buổi nhậu nhẹ.",
    ingredients: "Bò khô, hạt hướng dương, nem chua rán, trà đào",
    nutrition: "Calo: ~600kcal | Tiết kiệm 10%",
  },
  "Combo đồ ăn vặt 4": {
    desc: "🍱 **Combo đồ ăn vặt 4** bao gồm: Tôm viên chiên + Cá viên chiên + Bò viên chiên + Sốt mayonnaise. Combo viên chiên đủ vị.",
    ingredients: "Tôm viên, cá viên, bò viên, sốt mayonnaise",
    nutrition: "Calo: ~700kcal | Protein: 30g",
  },
  "Combo đồ ăn vặt 5": {
    desc: "🍱 **Combo đồ ăn vặt 5** bao gồm: Sủi cảo chiên + Hotdog xúc xích phô mai + Khoai lang chiên + Nước tương. Combo đa dạng món.",
    ingredients: "Sủi cảo chiên, hotdog, khoai lang chiên, nước tương",
    nutrition: "Calo: ~750kcal | Tiết kiệm 15%",
  },

  // ===== COMBO ĐỒ UỐNG (3 sản phẩm) =====
  "Combo đồ uống 1": {
    desc: "🥤 **Combo đồ uống 1** bao gồm: Trà sữa Matcha Latte + Trà sữa Socola. Phù hợp cho 2 người, tiết kiệm 15%.",
    ingredients: "Trà sữa Matcha Latte, Trà sữa Socola",
    nutrition: "Calo: ~440kcal | Tiết kiệm 15%",
  },
  "Combo đồ uống 2": {
    desc: "🥤 **Combo đồ uống 2** bao gồm: Cafe sữa đá + Cafe Latte + Bánh ngọt. Combo sáng đầy đủ năng lượng.",
    ingredients: "Cafe sữa đá, Cafe Latte, Bánh ngọt",
    nutrition: "Calo: ~500kcal | Tiết kiệm 10%",
  },
  "Combo đồ uống 3": {
    desc: "🥤 **Combo đồ uống 3** bao gồm: Sinh tố bơ + Sinh tố xoài + Trà đào. Combo sinh tố trái cây tươi mát.",
    ingredients: "Sinh tố bơ, sinh tố xoài, trà đào",
    nutrition: "Calo: ~450kcal | Vitamin: Cao",
  },

  // ===== COMBO (3 sản phẩm) =====
  "Combo 1": {
    desc: "🍱 **Combo 1** dành cho 1 người: 1 đồ uống (tùy chọn) + 1 đồ ăn vặt (tùy chọn). Tiết kiệm 10% so với mua lẻ.",
    ingredients: "1 đồ uống + 1 đồ ăn vặt",
    nutrition: "Tiết kiệm 10% | Linh hoạt lựa chọn",
  },
  "Combo 2": {
    desc: "🍱 **Combo 2** dành cho 2 người: 2 đồ uống (tùy chọn) + 2 đồ ăn vặt (tùy chọn) + 1 bánh ngọt. Tiết kiệm 15%.",
    ingredients: "2 đồ uống + 2 đồ ăn vặt + 1 bánh ngọt",
    nutrition: "Tiết kiệm 15% | Phù hợp hẹn hò",
  },
  "Combo 3": {
    desc: "🍱 **Combo 3** dành cho nhóm 4 người: 4 đồ uống (tùy chọn) + 3 đồ ăn vặt (tùy chọn) + 2 bánh ngọt. Tiết kiệm 20%.",
    ingredients: "4 đồ uống + 3 đồ ăn vặt + 2 bánh ngọt",
    nutrition: "Tiết kiệm 20% | Tiệc nhẹ cùng bạn bè",
  },
};

// Mô tả mặc định nếu sản phẩm chưa có
const defaultProductDetail = {
  desc: "✨ Sản phẩm chất lượng cao, nguyên liệu tươi ngon, chế biến theo công thức đặc biệt của Nbreak. Hãy thử ngay hôm nay để cảm nhận hương vị tuyệt vời!",
  ingredients:
    "Nguyên liệu tự nhiên, tươi ngon, đảm bảo vệ sinh an toàn thực phẩm",
  nutrition: "Thông tin dinh dưỡng sẽ được cập nhật sớm nhất",
};

// =====================
// INIT KHI LOAD TRANG
// =====================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Website khởi động");

  createAllPopups();
  updateCartCount();
  assignCategoriesToProducts();
  updateCategoryCounts();
  attachProductClickEvents();
  setupCategoryFilter();
  setupDropdownMenu();
  setupSeasonEffect();
});

// =====================
// CẬP NHẬT SỐ LƯỢNG SẢN PHẨM TRÊN MENU TRÁI
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

  products.forEach((product) => {
    const cat = product.dataset.category;
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
// GÁN CATEGORY CHO SẢN PHẨM
// =====================
function assignCategoriesToProducts() {
  const products = document.querySelectorAll(".sanpham");
  const categoryMapping = [
    { range: [0, 5], category: "coffee" }, // Coffee: 6 sp (0-5)
    { range: [6, 11], category: "sinhto" }, // Sinh tố: 6 sp (6-11)
    { range: [12, 20], category: "trasua" }, // Trà sữa: 9 sp (12-20)
    { range: [21, 26], category: "nuocep" }, // Nước ép: 5 sp (21-26)
    { range: [27, 33], category: "travi" }, // Trà vị: 7 sp (27-33)
    { range: [34, 49], category: "doanvat" }, // Đồ ăn vặt: 16 sp (34-49)
    { range: [50, 59], category: "banhngot" }, // Bánh ngọt: 10 sp (50-59)
    { range: [60, 64], category: "combodoanvat" }, // Combo đồ ăn vặt: 5 sp (60-64)
    { range: [65, 67], category: "combodouong" }, // Combo đồ uống: 3 sp (65-67)
    { range: [68, 70], category: "combo" }, // Combo: 3 sp (68-70)
  ];

  products.forEach((p, index) => {
    const mapping = categoryMapping.find(
      (m) => index >= m.range[0] && index <= m.range[1],
    );
    p.dataset.category = mapping ? mapping.category : "other";
  });
  console.log("Đã gán category cho sản phẩm");
}

// =====================
// LỌC DANH MỤC (MENU TRÁI)
// =====================
function setupCategoryFilter() {
  const menuItems = document.querySelectorAll(".menu-trai li");

  const getCategoryFromText = (text) => {
    if (text.includes("Coffee")) return "coffee";
    if (text.includes("Sinh tố")) return "sinhto";
    if (text.includes("Trà sữa")) return "trasua";
    if (text.includes("Nước ép")) return "nuocep";
    if (text.includes("Trà vị")) return "travi";
    if (text.includes("Đồ ăn vặt")) return "doanvat";
    if (text.includes("Bánh ngọt")) return "banhngot";
    if (text.includes("Combo đồ ăn vặt")) return "combodoanvat";
    if (text.includes("Combo đồ uống")) return "combodouong";
    if (text.includes("Combo")) return "combo";
    return "all";
  };

  menuItems.forEach((item) => {
    item.removeEventListener("click", item._clickHandler);

    const handler = () => {
      menuItems.forEach((li) => li.classList.remove("active-category"));
      item.classList.add("active-category");

      const text = item.innerText;
      const category = getCategoryFromText(text);

      const products = document.querySelectorAll(".sanpham");
      products.forEach((product) => {
        const productCat = product.dataset.category;
        if (category === "all" || productCat === category) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    };

    item._clickHandler = handler;
    item.addEventListener("click", handler);
  });

  document
    .querySelectorAll(".sanpham")
    .forEach((p) => (p.style.display = "block"));
}

// =====================
// DROPDOWN MENU (HEADER) - LIÊN KẾT VỚI MENU TRÁI
// =====================
function setupDropdownMenu() {
  const dropdownLinks = document.querySelectorAll(".dropdown-content a");

  // Ánh xạ từ text trong dropdown sang text trong menu trái
  const categoryMap = {
    Coffee: "Coffee",
    "Đồ uống khác": "Trà sữa",
    "Trà sữa": "Trà sữa",
    "Đồ ăn vặt": "Đồ ăn vặt",
    Combo: "Combo",
  };

  dropdownLinks.forEach((link) => {
    // Xóa sự kiện cũ để tránh trùng lặp
    link.removeEventListener("click", link._dropdownHandler);

    const handler = (e) => {
      e.preventDefault();
      const dropdownText = link.innerText.trim();
      const targetMenuText = categoryMap[dropdownText];

      console.log(
        "Dropdown click:",
        dropdownText,
        "-> Tìm menu:",
        targetMenuText,
      );

      if (targetMenuText) {
        const menuItems = document.querySelectorAll(".menu-trai li");

        // Tìm item trong menu trái có text chứa targetMenuText
        const targetItem = Array.from(menuItems).find((item) =>
          item.innerText.includes(targetMenuText),
        );

        if (targetItem) {
          console.log("Tìm thấy menu item:", targetItem.innerText);
          // Kích hoạt click vào menu trái
          targetItem.click();

          // Cuộn đến danh sách sản phẩm
          setTimeout(() => {
            const grid = document.querySelector(".luoi-sanpham");
            if (grid) {
              grid.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        } else {
          console.log("Không tìm thấy menu item cho:", targetMenuText);
        }
      }
    };

    link._dropdownHandler = handler;
    link.addEventListener("click", handler);
  });
}

// =====================
// MỞ POPUP CHI TIẾT SẢN PHẨM
// =====================
function openProductDetail(name, price, img, category) {
  currentProduct = { name, price, img, category };
  currentQuantity = 1;

  // Lấy thông tin chi tiết của sản phẩm
  const detail = productDetails[name] || defaultProductDetail;

  document.getElementById("detail-product-name").innerText = name;
  document.getElementById("detail-product-img").src = img;
  document.getElementById("detail-product-price").innerHTML =
    price.toLocaleString() + "đ";
  document.getElementById("detail-product-desc").innerHTML = detail.desc;
  document.getElementById("detail-quantity").innerText = currentQuantity;

  // Thêm phần thành phần và dinh dưỡng nếu có
  let extraInfo = "";
  if (detail.ingredients) {
    extraInfo += `<div class="detail-section"><h3>🥗 Thành phần</h3><p>${detail.ingredients}</p></div>`;
  }
  if (detail.nutrition) {
    extraInfo += `<div class="detail-section"><h3>📊 Giá trị dinh dưỡng</h3><p>${detail.nutrition}</p></div>`;
  }

  // Thêm extra info vào desc nếu chưa có
  const descContainer = document.getElementById("detail-product-desc");
  if (extraInfo && !descContainer.innerHTML.includes("Thành phần")) {
    descContainer.innerHTML = detail.desc + extraInfo;
  }

  // Ẩn phần size options (đã bỏ)
  const sizeOptions = document.querySelector(".size-options");
  if (sizeOptions) sizeOptions.style.display = "none";

  // Ẩn phần tùy chọn đặc biệt
  const optionsPanel = document.getElementById("product-options-panel");
  if (optionsPanel) optionsPanel.style.display = "none";

  // Load sản phẩm gợi ý
  loadSuggestedProducts(name, category);

  // Hiển thị popup
  document.getElementById("product-detail-popup").style.display = "flex";
}

// =====================
// GẮN SỰ KIỆN CLICK VÀO TÊN SẢN PHẨM
// =====================
function attachProductClickEvents() {
  const products = document.querySelectorAll(".sanpham");

  products.forEach((product) => {
    const nameEl = product.querySelector(".sanpham-info div:first-child");
    if (nameEl) {
      nameEl.style.cursor = "pointer";
      nameEl.style.fontWeight = "bold";
      nameEl.style.transition = "color 0.3s";
      nameEl.onmouseenter = () => (nameEl.style.color = "#e67e22");
      nameEl.onmouseleave = () => (nameEl.style.color = "#333");
      nameEl.onclick = () => {
        const name = nameEl.innerText;
        const priceText = product.querySelector(".price").innerText;
        const price = parseInt(priceText.replace(/[^\d]/g, ""));
        const img = product.querySelector(".sanpham-anh").src;
        const category = product.dataset.category;
        openProductDetail(name, price, img, category);
      };
    }
  });
}

// =====================
// THÊM VÀO GIỎ TỪ POPUP
// =====================
function addDetailToCart() {
  if (!currentProduct) return;

  for (let i = 0; i < currentQuantity; i++) {
    addToCart(currentProduct.name, currentProduct.price);
  }

  closeProductDetail();
  showToast(`✅ Đã thêm ${currentQuantity} ${currentProduct.name} vào giỏ!`);
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

function loadSuggestedProducts(productName, category) {
  const products = document.querySelectorAll(".sanpham");
  const suggestions = [];

  products.forEach((p) => {
    const name = p.querySelector(".sanpham-info div:first-child")?.innerText;
    if (p.dataset.category === category && name !== productName) {
      const priceText = p.querySelector(".price")?.innerText;
      const price = parseInt(priceText?.replace(/[^\d]/g, "0"));
      const img = p.querySelector(".sanpham-anh")?.src;
      suggestions.push({ name, price, img, category: p.dataset.category });
    }
  });

  const grid = document.getElementById("suggested-grid");
  if (!grid) return;
  grid.innerHTML = "";

  suggestions.slice(0, 4).forEach((s) => {
    const div = document.createElement("div");
    div.className = "suggested-item";
    div.onclick = () => openProductDetail(s.name, s.price, s.img, s.category);
    div.innerHTML = `
      <img src="${s.img}" alt="${s.name}">
      <div class="name">${s.name}</div>
      <div class="price">${s.price.toLocaleString()}đ</div>
    `;
    grid.appendChild(div);
  });
}

// =====================
// TẠO POPUP
// =====================
function createAllPopups() {
  if (!document.getElementById("checkout-popup")) createCheckoutPopup();
  if (!document.getElementById("success-popup")) createSuccessPopup();
  if (!document.getElementById("product-detail-popup"))
    createProductDetailPopup();
}

function createCheckoutPopup() {
  const html = `
    <div id="checkout-popup" class="popup">
      <div class="popup-content">
        <span onclick="closeCheckout()" style="float:right; font-size:28px; cursor:pointer;">&times;</span>
        <h2>🛒 Xác nhận đơn hàng</h2>
        <hr>
        <div id="checkout-items" style="max-height:250px; overflow-y:auto;"></div>
        <h3 id="checkout-total" style="color:#e67e22; text-align:right;"></h3>
        
        <!-- PHẦN CHỌN HÌNH THỨC NHẬN HÀNG -->
        <div style="margin: 15px 0; padding: 10px; background: #f5f5f5; border-radius: 10px;">
          <h4 style="margin: 0 0 10px 0; color: #4b2e2b;">📦 Hình thức nhận hàng</h4>
          <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer; padding: 8px; background: white; border-radius: 8px;">
            <input type="radio" name="delivery" value="pickup" checked onchange="toggleDeliveryForm()">
            <span>🏪 Đến tận nơi lấy (207 Giải Phóng, Hà Nội)</span>
          </label>
          <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 8px; background: white; border-radius: 8px;">
            <input type="radio" name="delivery" value="shipping" onchange="toggleDeliveryForm()">
            <span>🚚 Giao hàng tận nơi (Phí ship: dưới 3km miễn phí, trên 3km: 25.000đ)</span>
          </label>
        </div>
        
        <!-- Phần thông tin giao hàng (chỉ hiện khi chọn giao hàng) -->
        <div id="shipping-info" style="display: none; margin: 10px 0; padding: 10px; background: #fff9f0; border-radius: 8px; border: 1px solid #ffb7c5;">
          <h4 style="margin: 0 0 10px 0; color: #4b2e2b;">📍 Thông tin giao hàng</h4>
          <input type="text" id="customer-name" placeholder="Họ tên người nhận" style="width:100%; padding:8px; margin:5px 0; border:1px solid #ddd; border-radius:5px;">
          <input type="tel" id="customer-phone" placeholder="Số điện thoại" style="width:100%; padding:8px; margin:5px 0; border:1px solid #ddd; border-radius:5px;">
          <input type="text" id="customer-address" placeholder="Địa chỉ nhận hàng" style="width:100%; padding:8px; margin:5px 0; border:1px solid #ddd; border-radius:5px;">
          
          <!-- Chọn khoảng cách -->
          <label style="margin-top: 10px; display: block;">📏 Khoảng cách từ cửa hàng:</label>
          <select id="delivery-distance" style="width:100%; padding:8px; margin:5px 0; border:1px solid #ddd; border-radius:5px;" onchange="updateShippingFee()">
            <option value="0">Dưới 3km (Miễn phí ship)</option>
            <option value="25000">Từ 3km - 10km (Phí ship: 25.000đ)</option>
            <option value="35000">Trên 10km (Phí ship: 35.000đ)</option>
          </select>
          
          <div id="shipping-fee-display" style="margin-top: 10px; padding: 8px; background: #e8f5e9; border-radius: 8px; text-align: center;">
            💰 Phí ship: <strong id="shipping-fee-amount">0đ</strong>
          </div>
        </div>
        
        <!-- Phần thông tin nhận tại quầy -->
        <div id="pickup-info" style="margin: 10px 0; padding: 10px; background: #e8f5e9; border-radius: 8px;">
          <h4 style="margin: 0 0 5px 0; color: #2e7d32;">🏪 Nhận tại cửa hàng</h4>
          <p style="margin: 0; font-size: 13px;">📍 207 Giải Phóng, Phường Bạch Mai, Hà Nội</p>
          <p style="margin: 5px 0 0 0; font-size: 13px;">⏰ 7:00 - 22:00 tất cả các ngày</p>
        </div>
        
        <div style="margin:10px 0">
          <label><input type="radio" name="payment" value="cod" checked onclick="toggleQR(false)"> 💵 Thanh toán khi nhận hàng</label>
          <label style="margin-left:15px"><input type="radio" name="payment" value="bank" onclick="toggleQR(true)"> 💳 Chuyển khoản</label>
        </div>
        
        <div id="qr-container" style="display:none; text-align:center;">
          <img id="qr-image" style="width:150px;">
          <p>STK: 0338909486 - MB Bank</p>
        </div>
        
        <button onclick="confirmOrder()" style="background:#4b2e2b; color:white; padding:12px; border:none; border-radius:8px; width:100%; cursor:pointer; font-weight:bold;">✅ Xác nhận đặt hàng</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", html);
}

function createProductDetailPopup() {
  const html = `
    <div id="product-detail-popup" class="product-detail-popup" onclick="if(event.target===this)closeProductDetail()">
      <div class="product-detail-content">
        <span class="product-detail-close" onclick="closeProductDetail()">&times;</span>
        <div class="product-detail-inner">
          <div class="product-detail-image">
            <img id="detail-product-img" src="" alt="Ảnh sản phẩm" style="width:100%;border-radius:15px;object-fit:cover;max-height:300px;">
          </div>
          <div class="product-detail-info">
            <h2 id="detail-product-name"></h2>
            <div class="product-detail-price" id="detail-product-price"></div>
            <div class="product-detail-desc" id="detail-product-desc"></div>
            <div class="size-options" style="display:none;"></div>
            <div id="product-options-panel" style="display:none;"></div>
            <div class="quantity-selector">
              <label>Số lượng:</label>
              <div class="quantity-control">
                <button onclick="decreaseDetailQty()">−</button>
                <span id="detail-quantity">1</span>
                <button onclick="increaseDetailQty()">+</button>
              </div>
            </div>
            <button class="add-to-cart-detail" onclick="addDetailToCart()">🛒 Thêm vào giỏ hàng</button>
          </div>
        </div>
        <div class="suggested-products">
          <h4>✨ Có thể bạn cũng thích</h4>
          <div class="suggested-grid" id="suggested-grid"></div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", html);
}
 
function createSuccessPopup() {
  const html = `
    <div id="success-popup" class="popup" style="display:none;">
      <div class="popup-content" style="text-align:center; padding:30px;">
        <div style="font-size:60px; margin-bottom:10px;">🎉</div>
        <h2 style="color:#2e7d32; margin-bottom:5px;">Đặt hàng thành công!</h2>
        <p style="color:#666; margin-bottom:20px;">Cảm ơn bạn đã tin tưởng Nbreak ☕</p>
 
        <div style="background:#f9f9f9; border-radius:12px; padding:15px; text-align:left; font-size:14px; line-height:2;">
          <div><strong>👤 Tên:</strong> <span id="display-name"></span></div>
          <div><strong>📞 Điện thoại:</strong> <span id="display-phone"></span></div>
          <div><strong>📍 Địa chỉ:</strong> <span id="display-address"></span></div>
          <div><strong>🚚 Giao hàng:</strong> <span id="display-delivery"></span></div>
          <div><strong>💰 Phí ship:</strong> <span id="display-shipping"></span></div>
          <div><strong>💳 Thanh toán:</strong> <span id="display-payment"></span></div>
          <div style="margin-top:10px; padding-top:10px; border-top:1px solid #eee;">
            <strong style="font-size:16px; color:#e67e22;">💵 Tổng cộng: <span id="display-total"></span></strong>
          </div>
        </div>
 
        <p style="color:#999; font-size:13px; margin-top:15px;">
          Tự động đóng sau <strong id="countdown-timer">10</strong> giây
        </p>
        <button
          onclick="closeSuccessPopup()"
          style="background:#4b2e2b; color:white; padding:12px 30px; border:none; border-radius:8px; font-size:15px; cursor:pointer; font-weight:bold; margin-top:5px;">
          ✅ Đóng
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", html);
}
 
function closeSuccessPopup() {
  const popup = document.getElementById("success-popup");
  if (popup) popup.style.display = "none";
}

function updateShippingFee() {
  const distanceSelect = document.getElementById("delivery-distance");
  const feeDisplay = document.getElementById("shipping-fee-amount");
  if (distanceSelect && feeDisplay) {
    const fee = parseInt(distanceSelect.value) || 0;
    feeDisplay.innerText = fee.toLocaleString() + "đ";
  }
}

function toggleDeliveryForm() {
  const deliveryMethod = document.querySelector(
    'input[name="delivery"]:checked',
  )?.value;
  const shippingInfo = document.getElementById("shipping-info");
  const pickupInfo = document.getElementById("pickup-info");

  if (deliveryMethod === "shipping") {
    if (shippingInfo) shippingInfo.style.display = "block";
    if (pickupInfo) pickupInfo.style.display = "none";
    // Cập nhật phí ship mặc định
    updateShippingFee();
  } else {
    if (shippingInfo) shippingInfo.style.display = "none";
    if (pickupInfo) pickupInfo.style.display = "block";
  }
}

// =====================
// GIỎ HÀNG
// =====================
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    el.innerText = total;
  }
}

function addToCart(name, price) {
  const item = cart.find((p) => p.name === name);
  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });
  saveCart();
  showToast(`✅ Đã thêm ${name} vào giỏ hàng!`);
  updateCartCount();
}

function removeFromCart(name, price) {
  const item = cart.find((p) => p.name === name);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      cart = cart.filter((p) => p.name !== name);
    }
    saveCart();
    showToast(`📦 Đã xoá sản phẩm ${name} ra khỏi giỏ hàng!`);
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
  toast.className = "toast";
  toast.innerText = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// =====================
// CHECKOUT
// =====================
function openCheckout() {
  if (cart.length === 0) {
    showToast("🛒 Giỏ hàng trống!");
    return;
  }

  const popup = document.getElementById("checkout-popup");
  const list = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const sub = item.price * item.quantity;
    total += sub;
    list.innerHTML += `
      <div style="display:flex; justify-content:space-between; margin-bottom:10px; align-items:center;">
        <span style="flex:2; font-size:13px;">${item.name}</span>
        <div style="flex:1; text-align:center;">
          <button onclick="decreaseQty('${item.name.replace(/'/g, "\\'")}')" style="width:28px; height:28px; cursor:pointer;">-</button>
          <span style="margin:0 8px;">${item.quantity}</span>
          <button onclick="increaseQty('${item.name.replace(/'/g, "\\'")}')" style="width:28px; height:28px; cursor:pointer;">+</button>
        </div>
        <span style="flex:1; text-align:right;">${sub.toLocaleString()}đ</span>
      </div>
    `;
  });

  totalEl.innerText = "Tổng: " + total.toLocaleString() + "đ";
  popup.style.display = "block";
}

function closeCheckout() {
  document.getElementById("checkout-popup").style.display = "none";
  const codRadio = document.querySelector('input[name="payment"][value="cod"]');
  if (codRadio) codRadio.checked = true;
  toggleQR(false);
}

function increaseQty(name) {
  const item = cart.find((p) => p.name === name);
  if (item) {
    item.quantity++;
    saveCart();
    updateCartCount();
    openCheckout();
  }
}

function decreaseQty(name) {
  const item = cart.find((p) => p.name === name);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      cart = cart.filter((p) => p.name !== name);
    }
    saveCart();
    updateCartCount();
    openCheckout();
  }
}
function confirmOrder() {
  const deliveryMethod = document.querySelector(
    'input[name="delivery"]:checked',
  )?.value;

  let name,
    phone,
    address,
    shippingFee = 0;
  let deliveryText = "";
  let total = 0;

  // Tính tổng tiền hàng
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  if (deliveryMethod === "shipping") {
    name = document.getElementById("customer-name")?.value;
    phone = document.getElementById("customer-phone")?.value;
    address = document.getElementById("customer-address")?.value;

    // Lấy phí ship từ select
    const distanceSelect = document.getElementById("delivery-distance");
    if (distanceSelect && distanceSelect.selectedIndex >= 0) {
      shippingFee = parseInt(distanceSelect.value) || 0;
    }

    if (!name || !phone || !address) {
      showToast("⚠️ Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    const feeText =
      shippingFee === 0 ? "Miễn phí" : shippingFee.toLocaleString() + "đ";
    deliveryText = `🚚 Giao hàng tận nơi<br>  📍 ${address}<br>  💰 Phí ship: ${feeText}`;
  } else {
    // Đến lấy tại cửa hàng
    name = document.getElementById("customer-name")?.value || "Khách hàng";
    phone = document.getElementById("customer-phone")?.value || "0338909486";
    address = "207 Giải Phóng, Hà Nội";

    deliveryText = `🏪 Nhận tại cửa hàng<br>  📍 207 Giải Phóng, Hà Nội`;
  }

  const payment = document.querySelector(
    'input[name="payment"]:checked',
  )?.value;
  const paymentText =
    payment === "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản ngân hàng";

  const finalTotal = total + shippingFee;

  closeCheckout();

  // Cập nhật nội dung popup thành công
  const displayName = document.getElementById("display-name");
  const displayPhone = document.getElementById("display-phone");
  const displayAddress = document.getElementById("display-address");
  const displayPayment = document.getElementById("display-payment");
  const displayDelivery = document.getElementById("display-delivery");
  const displayTotal = document.getElementById("display-total");
  const displayShipping = document.getElementById("display-shipping");

  if (displayName) displayName.innerText = name;
  if (displayPhone) displayPhone.innerText = phone;
  if (displayAddress) displayAddress.innerText = address;
  if (displayPayment) displayPayment.innerText = paymentText;
  if (displayDelivery) displayDelivery.innerHTML = deliveryText;
  if (displayTotal) displayTotal.innerText = finalTotal.toLocaleString() + "đ";
  if (displayShipping)
    displayShipping.innerText = shippingFee.toLocaleString() + "đ";

  document.getElementById("success-popup").style.display = "block";

  // Đếm ngược tự động đóng
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

  // Xóa giỏ hàng
  cart = [];
  saveCart();
  updateCartCount();
}

function toggleQR(show) {
  const container = document.getElementById("qr-container");
  const img = document.getElementById("qr-image");
  if (show && cart.length > 0) {
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    img.src = `https://img.vietqr.io/image/MB-0338909486-compact.png?amount=${total}&addInfo=Nbreak`;
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
}

function scrollToProductGrid() {
  const grid = document.querySelector(".luoi-sanpham");
  if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
}

// =====================
// HIỆU ỨNG MÙA
// =====================
function setupSeasonEffect() {
  const month = new Date().getMonth() + 1;
  let icon = month <= 4 ? "🌸" : month <= 7 ? "☀️" : month <= 10 ? "🍂" : "❄️";
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
