/**
 * Seed data Part 2 - Single Type Pages (Feature pages)
 * Components properly structured based on schema analysis
 */

// ===== CHẤM CÔNG =====
// Schema: seo, hero, tinh_nang[], da_linh_vuc, why_choose, cta

export const chamCongData = {
  seo: {
    tieu_de: "Chấm Công Thông Minh - Timeso",
    mo_ta: "Hệ thống chấm công đa phương thức: GPS, Face ID, QR Code. Độ chính xác 99.9%.",
    tu_khoa: "chấm công, GPS, Face ID, QR Code, AI",
  },
  hero: {
    tieu_de: "Chấm Công Thông Minh",
    tieu_de_noi_bat: "Đa Phương Thức",
    mo_ta:
      "Hệ thống chấm công hiện đại với GPS, Face ID, QR Code và WiFi. Độ chính xác 99.9%, chống gian lận hoàn toàn.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  // tinh_nang: sections.feature-card[] (tieu_de, danh_sach, mau_nen)
  tinh_nang: [
    {
      tieu_de: "Chấm Công GPS",
      danh_sach: [
        "Xác định vị trí chính xác",
        "Hỗ trợ đa địa điểm",
        "Thiết lập vùng chấm công",
        "Theo dõi lộ trình",
      ],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Chấm Công Face ID",
      danh_sach: [
        "Nhận diện khuôn mặt AI",
        "Độ chính xác 99.9%",
        "Chống gian lận tuyệt đối",
        "Hoạt động offline",
      ],
      mau_nen: "#f0fdf4",
    },
    {
      tieu_de: "Chấm Công QR Code",
      danh_sach: [
        "Mã QR động bảo mật",
        "Quét nhanh 1 giây",
        "Tích hợp thiết bị",
        "Báo cáo real-time",
      ],
      mau_nen: "#fef3c7",
    },
    {
      tieu_de: "Chấm Công WiFi",
      danh_sach: [
        "Kết nối WiFi văn phòng",
        "Tự động check-in/out",
        "Không cần thao tác",
        "Chính xác 100%",
      ],
      mau_nen: "#fce7f3",
    },
  ],
  // da_linh_vuc: sections.da-linh-vuc (tieu_de_phu, tieu_de, thong_ke[])
  da_linh_vuc: {
    tieu_de_phu: "Được tin dùng trong",
    tieu_de: "ĐA LĨNH VỰC",
    thong_ke: [
      { gia_tri: "1000", hau_to: "+", mo_ta: "Doanh nghiệp" },
      { gia_tri: "50", hau_to: "K+", mo_ta: "Người dùng" },
      { gia_tri: "99.9", hau_to: "%", mo_ta: "Độ chính xác" },
    ],
  },
  // why_choose: sections.why-choose (tieu_de, cac_ly_do[])
  why_choose: {
    tieu_de: "Tại sao chọn Chấm Công Timeso?",
    cac_ly_do: [
      { tieu_de: "Đa phương thức", mo_ta: "GPS, Face ID, QR, WiFi - linh hoạt theo nhu cầu" },
      { tieu_de: "Chống gian lận", mo_ta: "AI phát hiện gian lận, chấm hộ" },
      { tieu_de: "Real-time", mo_ta: "Báo cáo và thông báo tức thì" },
      { tieu_de: "Dễ triển khai", mo_ta: "Chỉ cần smartphone, không cần thiết bị đặc biệt" },
    ],
  },
  cta: {
    tieu_de: "Trải nghiệm Chấm Công Thông Minh",
    mo_ta: "Đăng ký dùng thử miễn phí 14 ngày. Không cần thẻ tín dụng.",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

// ===== SẮP CA THÔNG MINH =====

export const sapCaThongMinhData = {
  seo: {
    tieu_de: "Sắp Ca Thông Minh - Timeso",
    mo_ta: "AI tự động sắp xếp lịch làm việc tối ưu. Tiết kiệm 60% thời gian sắp ca.",
    tu_khoa: "sắp ca, lịch làm việc, AI, tự động",
  },
  hero: {
    tieu_de: "Sắp Ca Thông Minh",
    tieu_de_noi_bat: "Tự Động Với AI",
    mo_ta:
      "AI phân tích dữ liệu và tự động sắp xếp lịch làm việc tối ưu cho toàn bộ đội ngũ. Cân bằng công việc, xem xét ngày nghỉ.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  tinh_nang: [
    {
      tieu_de: "AI Đề Xuất Ca Làm",
      danh_sach: [
        "Phân tích kỹ năng nhân viên",
        "Cân bằng công việc",
        "Xem xét ngày nghỉ",
        "Tối ưu hiệu suất",
      ],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Quản Lý Ca Linh Hoạt",
      danh_sach: ["Kéo thả sắp xếp", "Đổi ca dễ dàng", "Phê duyệt nhanh", "Lịch sử thay đổi"],
      mau_nen: "#f0fdf4",
    },
    {
      tieu_de: "Thông Báo Tự Động",
      danh_sach: [
        "Nhắc ca làm việc",
        "Cảnh báo thiếu người",
        "Đề xuất nhân sự",
        "Tích hợp calendar",
      ],
      mau_nen: "#fef3c7",
    },
  ],
  da_linh_vuc: {
    tieu_de_phu: "Tối ưu hóa cho",
    tieu_de: "ĐA NGÀNH NGHỀ",
    thong_ke: [
      { gia_tri: "60", hau_to: "%", mo_ta: "Giảm thời gian sắp ca" },
      { gia_tri: "95", hau_to: "%", mo_ta: "Độ hài lòng nhân viên" },
      { gia_tri: "40", hau_to: "%", mo_ta: "Tăng hiệu suất" },
    ],
  },
  why_choose: {
    tieu_de: "Lợi ích của Sắp Ca AI",
    cac_ly_do: [
      { tieu_de: "Tiết kiệm thời gian", mo_ta: "Giảm 60% thời gian sắp xếp lịch" },
      { tieu_de: "Công bằng hơn", mo_ta: "AI phân bổ đều, không thiên vị" },
      { tieu_de: "Linh hoạt", mo_ta: "Điều chỉnh nhanh khi có thay đổi" },
    ],
  },
  cta: {
    tieu_de: "Trải nghiệm Sắp Ca Thông Minh",
    mo_ta: "Tự động hóa lịch làm việc ngay hôm nay",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

// ===== QUẢN LÝ NHÂN SỰ =====

export const quanLyNhanSuData = {
  seo: {
    tieu_de: "Quản Lý Nhân Sự - Timeso",
    mo_ta: "Giải pháp quản lý nhân sự toàn diện. Hồ sơ, hợp đồng, phúc lợi trên một nền tảng.",
    tu_khoa: "quản lý nhân sự, HR, hồ sơ nhân viên, hợp đồng",
  },
  hero: {
    tieu_de: "Quản Lý Nhân Sự",
    tieu_de_noi_bat: "Toàn Diện & Hiệu Quả",
    mo_ta:
      "Quản lý hồ sơ, hợp đồng, phúc lợi, nghỉ phép trên một nền tảng thống nhất. Số hóa 100% quy trình HR.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  tinh_nang: [
    {
      tieu_de: "Quản Lý Hồ Sơ",
      danh_sach: ["Lưu trữ tập trung", "Tìm kiếm nhanh", "Phân quyền truy cập", "Bảo mật cao"],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Quản Lý Hợp Đồng",
      danh_sach: [
        "Theo dõi hạn hợp đồng",
        "Nhắc gia hạn tự động",
        "Lưu trữ đính kèm",
        "Lịch sử thay đổi",
      ],
      mau_nen: "#f0fdf4",
    },
    {
      tieu_de: "Quản Lý Phúc Lợi",
      danh_sach: ["Bảo hiểm xã hội", "Nghỉ phép", "Thưởng lễ", "Phụ cấp"],
      mau_nen: "#fef3c7",
    },
    {
      tieu_de: "Báo Cáo HR",
      danh_sach: [
        "Dashboard tổng quan",
        "Biến động nhân sự",
        "Cơ cấu tổ chức",
        "Export đa định dạng",
      ],
      mau_nen: "#fce7f3",
    },
  ],
  da_linh_vuc: {
    tieu_de_phu: "Quản lý",
    tieu_de: "TOÀN DIỆN",
    thong_ke: [
      { gia_tri: "10", hau_to: "K+", mo_ta: "Hồ sơ nhân viên" },
      { gia_tri: "100", hau_to: "%", mo_ta: "Số hóa" },
      { gia_tri: "80", hau_to: "%", mo_ta: "Tiết kiệm thời gian" },
    ],
  },
  why_choose: {
    tieu_de: "Lợi ích Quản Lý Nhân Sự số",
    cac_ly_do: [
      { tieu_de: "Số hóa hoàn toàn", mo_ta: "Không còn giấy tờ, tìm kiếm nhanh" },
      { tieu_de: "Bảo mật cao", mo_ta: "Phân quyền chi tiết, audit log" },
      { tieu_de: "Tích hợp đa hệ thống", mo_ta: "API kết nối với payroll, ERP" },
    ],
  },
  cta: {
    tieu_de: "Nâng Cấp Quản Lý Nhân Sự",
    mo_ta: "Số hóa toàn bộ quy trình HR của bạn",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

// ===== QUẢN LÝ ĐƠN HÀNG =====

export const quanLyDonHangData = {
  seo: {
    tieu_de: "Quản Lý Đơn Hàng - Timeso",
    mo_ta: "Theo dõi và phân công đơn hàng cho nhân viên hiệu quả.",
    tu_khoa: "quản lý đơn hàng, phân công, theo dõi",
  },
  hero: {
    tieu_de: "Quản Lý Đơn Hàng",
    tieu_de_noi_bat: "Thông Minh & Real-time",
    mo_ta:
      "Theo dõi và phân công đơn hàng cho nhân viên hiệu quả. GPS tracking, timeline đơn hàng.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  tinh_nang: [
    {
      tieu_de: "Phân Công Đơn Hàng",
      danh_sach: ["Tự động phân công", "Theo khu vực", "Theo kỹ năng", "Cân bằng tải"],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Theo Dõi Tiến Độ",
      danh_sach: ["Real-time tracking", "Cập nhật trạng thái", "GPS vị trí", "Timeline đơn hàng"],
      mau_nen: "#f0fdf4",
    },
    {
      tieu_de: "Báo Cáo Hiệu Suất",
      danh_sach: ["KPI nhân viên", "Thời gian xử lý", "Tỷ lệ hoàn thành", "Đánh giá khách hàng"],
      mau_nen: "#fef3c7",
    },
  ],
  da_linh_vuc: {
    tieu_de_phu: "Áp dụng trong",
    tieu_de: "ĐA NGÀNH NGHỀ",
    thong_ke: [
      { gia_tri: "40", hau_to: "%", mo_ta: "Tăng hiệu suất" },
      { gia_tri: "30", hau_to: "%", mo_ta: "Giảm thời gian" },
      { gia_tri: "95", hau_to: "%", mo_ta: "Khách hài lòng" },
    ],
  },
  cta: {
    tieu_de: "Quản Lý Đơn Hàng Hiệu Quả",
    mo_ta: "Tối ưu quy trình vận hành ngay hôm nay",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

// ===== QUẢN LÝ TÀI SẢN =====

export const quanLyTaiSanData = {
  seo: {
    tieu_de: "Quản Lý Tài Sản - Timeso",
    mo_ta: "Theo dõi và quản lý tài sản công ty: laptop, điện thoại, xe cộ.",
    tu_khoa: "quản lý tài sản, asset management, cấp phát",
  },
  hero: {
    tieu_de: "Quản Lý Tài Sản",
    tieu_de_noi_bat: "Đầy Đủ & Chi Tiết",
    mo_ta:
      "Theo dõi toàn bộ tài sản công ty từ laptop, điện thoại đến xe cộ. Lịch sử cấp phát, bảo trì đầy đủ.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  tinh_nang: [
    {
      tieu_de: "Danh Mục Tài Sản",
      danh_sach: ["Thiết bị điện tử", "Phương tiện", "Đồ nội thất", "Công cụ dụng cụ"],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Theo Dõi Cấp Phát",
      danh_sach: ["Lịch sử cấp phát", "Người đang giữ", "Tình trạng tài sản", "Thu hồi tự động"],
      mau_nen: "#f0fdf4",
    },
    {
      tieu_de: "Bảo Trì & Bảo Dưỡng",
      danh_sach: [
        "Lịch bảo trì định kỳ",
        "Nhắc nhở tự động",
        "Chi phí bảo trì",
        "Lịch sử sửa chữa",
      ],
      mau_nen: "#fef3c7",
    },
  ],
  da_linh_vuc: {
    tieu_de_phu: "Quản lý",
    tieu_de: "MỌI LOẠI TÀI SẢN",
    thong_ke: [
      { gia_tri: "100", hau_to: "K+", mo_ta: "Tài sản quản lý" },
      { gia_tri: "50", hau_to: "%", mo_ta: "Giảm thất thoát" },
      { gia_tri: "90", hau_to: "%", mo_ta: "Độ chính xác" },
    ],
  },
  why_choose: {
    tieu_de: "Lợi ích Quản Lý Tài Sản số",
    cac_ly_do: [
      { tieu_de: "Tra cứu nhanh", mo_ta: "Biết ngay ai đang giữ tài sản" },
      { tieu_de: "Giảm thất thoát", mo_ta: "Theo dõi chi tiết, không mất mát" },
      { tieu_de: "Bảo trì đúng hạn", mo_ta: "Nhắc nhở tự động, kéo dài tuổi thọ" },
    ],
  },
  cta: {
    tieu_de: "Quản Lý Tài Sản Hiệu Quả",
    mo_ta: "Số hóa và theo dõi mọi tài sản công ty",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

// ===== VỀ CHÚNG TÔI =====
// Schema: seo, hero, cau_chuyen (richtext), hinh_cau_chuyen, gia_tri_cot_loi[], doi_ngu (relation), cta

export const veChungToiData = {
  seo: {
    tieu_de: "Về Chúng Tôi - Timeso",
    mo_ta: "Tìm hiểu về Timeso - công ty công nghệ hàng đầu trong lĩnh vực quản lý nhân sự.",
    tu_khoa: "về Timeso, giới thiệu, công ty",
  },
  hero: {
    tieu_de: "Về Chúng Tôi",
    tieu_de_noi_bat: "Timeso",
    mo_ta:
      "Đội ngũ đam mê công nghệ, cam kết mang đến giải pháp quản lý nhân sự tốt nhất cho doanh nghiệp Việt Nam.",
    hien_thi_badges: false,
  },
  cau_chuyen:
    "## Câu Chuyện Của Chúng Tôi\n\nTimeso được thành lập vào năm 2020 bởi nhóm kỹ sư đam mê công nghệ và quản lý nhân sự. Chúng tôi nhận thấy nhiều doanh nghiệp Việt Nam vẫn đang quản lý nhân sự theo cách thủ công, tốn thời gian và dễ sai sót.\n\n## Sứ Mệnh\n\nTimeso cam kết mang đến giải pháp công nghệ tiên tiến, giúp doanh nghiệp Việt Nam tối ưu hóa quy trình quản lý nhân sự, từ đó tập trung vào phát triển kinh doanh.\n\n## Tầm Nhìn\n\nTrở thành nền tảng quản lý nhân sự số 1 Việt Nam và mở rộng ra Đông Nam Á vào năm 2030.",
  // gia_tri_cot_loi: blocks.feature-item[]
  gia_tri_cot_loi: [
    { tieu_de: "Đổi mới sáng tạo", mo_ta: "Không ngừng cải tiến và ứng dụng công nghệ mới" },
    {
      tieu_de: "Khách hàng là trọng tâm",
      mo_ta: "Mọi quyết định đều hướng đến lợi ích khách hàng",
    },
    { tieu_de: "Chất lượng là ưu tiên", mo_ta: "Cam kết chất lượng sản phẩm và dịch vụ" },
    { tieu_de: "Làm việc nhóm", mo_ta: "Hợp tác và hỗ trợ lẫn nhau" },
  ],
  cta: {
    tieu_de: "Gia Nhập Đội Ngũ Timeso",
    mo_ta: "Chúng tôi luôn tìm kiếm những tài năng để cùng nhau phát triển",
  },
};

// ===== TUYỂN DỤNG =====
// Schema: seo, hero, dich_vu (services-grid), da_linh_vuc, thach_thuc (challenges-grid), giai_phap (solutions-grid), why_choose, cta

export const tuyenDungData = {
  seo: {
    tieu_de: "Tuyển Dụng - Timeso",
    mo_ta: "Gia nhập đội ngũ Timeso - nơi tài năng được phát triển và tỏa sáng.",
    tu_khoa: "tuyển dụng, việc làm, Timeso careers",
  },
  hero: {
    tieu_de: "Tuyển Dụng",
    tieu_de_noi_bat: "Cơ Hội Nghề Nghiệp",
    mo_ta:
      "Gia nhập đội ngũ Timeso - nơi tài năng được phát triển và tỏa sáng. Môi trường năng động, phúc lợi hấp dẫn.",
    hien_thi_badges: false,
  },
  da_linh_vuc: {
    tieu_de_phu: "Đội ngũ",
    tieu_de: "TRÊN TOÀN QUỐC",
    thong_ke: [
      { gia_tri: "50", hau_to: "+", mo_ta: "Nhân viên" },
      { gia_tri: "3", hau_to: "", mo_ta: "Văn phòng" },
      { gia_tri: "10", hau_to: "+", mo_ta: "Vị trí đang tuyển" },
    ],
  },
  why_choose: {
    tieu_de: "Phúc Lợi Hấp Dẫn",
    cac_ly_do: [
      { tieu_de: "Lương cạnh tranh", mo_ta: "Top thị trường + thưởng hấp dẫn" },
      { tieu_de: "Bảo hiểm premium", mo_ta: "Bảo hiểm sức khỏe cao cấp cho gia đình" },
      { tieu_de: "Làm việc linh hoạt", mo_ta: "Hybrid, WFH 2 ngày/tuần" },
      { tieu_de: "Phát triển bản thân", mo_ta: "Budget học tập 20 triệu/năm" },
    ],
  },
  cta: {
    tieu_de: "Ứng Tuyển Ngay",
    mo_ta: "Gửi CV của bạn để bắt đầu hành trình cùng Timeso",
  },
};

// ===== LIÊN HỆ =====
// Schema: seo, hero, dia_chi, email, so_dien_thoai, gio_lam_viec, ban_do_url

export const lienHeData = {
  seo: {
    tieu_de: "Liên Hệ - Timeso",
    mo_ta: "Liên hệ với Timeso. Hỗ trợ 24/7 qua hotline 1900 1234 56.",
    tu_khoa: "liên hệ, hỗ trợ, contact, hotline",
  },
  hero: {
    tieu_de: "Liên Hệ",
    tieu_de_noi_bat: "Với Chúng Tôi",
    mo_ta: "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Liên hệ ngay để được tư vấn miễn phí!",
    hien_thi_badges: false,
  },
  dia_chi: "Tầng 10, Tòa nhà ABC Tower, 123 Nguyễn Văn Linh, Quận 7, TP.HCM",
  email: "contact@timeso.vn",
  so_dien_thoai: "1900 1234 56",
  gio_lam_viec: "Thứ 2 - Thứ 6: 8:00 - 18:00\nThứ 7: 8:00 - 12:00\nHotline: 24/7",
  ban_do_url: "https://maps.google.com/?q=10.7285,106.7151",
};
