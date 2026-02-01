/**
 * Seed data Part 1 - Collection types and Trang Chu
 * Components properly structured based on schema analysis
 */

// ===== COLLECTION TYPES =====

export const doiTacData = [
  { ten: "FPT Corporation", website: "https://fpt.com.vn", thu_tu: 1 },
  { ten: "Viettel Group", website: "https://viettel.com.vn", thu_tu: 2 },
  { ten: "VinGroup", website: "https://vingroup.net", thu_tu: 3 },
  { ten: "Masan Group", website: "https://masangroup.com", thu_tu: 4 },
  { ten: "Techcombank", website: "https://techcombank.com.vn", thu_tu: 5 },
  { ten: "VPBank", website: "https://vpbank.com.vn", thu_tu: 6 },
];

export const thanhVienData = [
  {
    ten: "Nguyễn Văn An",
    chuc_vu: "CEO & Founder",
    mo_ta: "15+ năm kinh nghiệm trong lĩnh vực công nghệ và quản trị doanh nghiệp.",
    thu_tu: 1,
  },
  {
    ten: "Trần Thị Bình",
    chuc_vu: "CTO",
    mo_ta: "Chuyên gia công nghệ với nền tảng từ Google và Microsoft.",
    thu_tu: 2,
  },
  {
    ten: "Lê Hoàng Cường",
    chuc_vu: "CPO",
    mo_ta: "10+ năm kinh nghiệm phát triển sản phẩm B2B.",
    thu_tu: 3,
  },
  {
    ten: "Phạm Minh Đức",
    chuc_vu: "Head of Engineering",
    mo_ta: "Chuyên môn sâu về AI/ML và hệ thống phân tán.",
    thu_tu: 4,
  },
];

export const khachHangData = [
  {
    ten: "Nguyễn Hoàng Long",
    chuc_vu: "Giám đốc Nhân sự",
    cong_ty: "FPT Software",
    noi_dung: "Timeso đã giúp chúng tôi tiết kiệm 60% thời gian quản lý nhân sự mỗi tháng.",
    so_sao: 5,
  },
  {
    ten: "Trần Minh Tuấn",
    chuc_vu: "CEO",
    cong_ty: "Tech Startup ABC",
    noi_dung: "Với Timeso, việc quản lý 200+ nhân viên trở nên đơn giản hơn bao giờ hết.",
    so_sao: 5,
  },
  {
    ten: "Lê Thị Hương",
    chuc_vu: "HR Manager",
    cong_ty: "Công ty XYZ",
    noi_dung: "Tính năng sắp ca AI thực sự ấn tượng và chính xác.",
    so_sao: 5,
  },
  {
    ten: "Võ Đình Nam",
    chuc_vu: "Operations Director",
    cong_ty: "Retail Chain",
    noi_dung: "Chấm công GPS chính xác, dễ triển khai cho chuỗi cửa hàng.",
    so_sao: 4,
  },
];

export const baiVietData = [
  {
    tieu_de: "5 Xu Hướng Quản Trị Nhân Sự 2026",
    slug: "5-xu-huong-quan-tri-nhan-su-2026",
    mo_ta: "Khám phá 5 xu hướng quan trọng nhất trong quản trị nhân sự năm 2026.",
    noi_dung:
      "## Giới thiệu\n\nNăm 2026 đánh dấu bước chuyển mình quan trọng trong lĩnh vực quản trị nhân sự.\n\n## 1. AI trong Tuyển Dụng\n\nTrí tuệ nhân tạo đang cách mạng hóa quy trình tuyển dụng.",
    tac_gia: "Admin Timeso",
    noi_bat: true,
    seo: {
      tieu_de: "5 Xu Hướng HR 2026 | Timeso Blog",
      mo_ta: "Khám phá 5 xu hướng HR quan trọng nhất 2026",
      tu_khoa: "HR, xu hướng, quản trị nhân sự",
    },
  },
  {
    tieu_de: "Hướng Dẫn Triển Khai Chấm Công AI",
    slug: "huong-dan-trien-khai-cham-cong-ai",
    mo_ta: "Hướng dẫn chi tiết từng bước triển khai hệ thống chấm công AI.",
    noi_dung:
      "## Tại sao cần Chấm Công AI?\n\nHệ thống chấm công AI giúp tiết kiệm thời gian và tăng độ chính xác.",
    tac_gia: "Admin Timeso",
    noi_bat: false,
    seo: {
      tieu_de: "Hướng Dẫn Chấm Công AI | Timeso Blog",
      mo_ta: "Hướng dẫn triển khai hệ thống chấm công AI",
      tu_khoa: "chấm công, AI, hướng dẫn",
    },
  },
];

export const caseStudyData = [
  {
    tieu_de: "FPT Software - Quản lý 10,000+ nhân viên",
    slug: "fpt-software-quan-ly-10000-nhan-vien",
    mo_ta: "Case study triển khai Timeso tại FPT Software với hơn 10,000 nhân viên.",
    noi_dung:
      "## Thách thức\n\nVới hơn 10,000 nhân viên tại 20+ địa điểm, FPT Software cần giải pháp quản lý nhân sự đồng bộ.",
    khach_hang: "FPT Software",
    nganh: "Công nghệ",
    seo: {
      tieu_de: "FPT Software Case Study | Timeso",
      mo_ta: "Case study triển khai Timeso tại FPT Software",
      tu_khoa: "FPT, case study, 10000 nhân viên",
    },
  },
];

// ===== TRANG CHỦ (Homepage) - All components =====

export const trangChuData = {
  // SEO (shared.seo-meta)
  seo: {
    tieu_de: "Timeso - Giải pháp Quản lý Nhân sự Thông minh",
    mo_ta:
      "Nền tảng quản lý nhân sự, chấm công, sắp ca thông minh hàng đầu Việt Nam với công nghệ AI.",
    tu_khoa: "quản lý nhân sự, chấm công, sắp ca, HR software, Timeso",
  },
  // Hero (sections.hero-section)
  hero: {
    tieu_de: "Nền tảng quản lý",
    tieu_de_noi_bat: "nhân sự bằng AI",
    mo_ta:
      "Timeso giúp doanh nghiệp tự động hóa HR bằng AI, từ tuyển dụng đến chấm công và quản lý hiệu suất, giảm giấy tờ để tập trung phát triển nhân tài.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  // hero_video: Upload via Strapi Admin (media type)
  // Trusted By (sections.trusted-by)
  trusted_by: {
    tieu_de: "Được tin dùng bởi hơn 1000+ doanh nghiệp",
  },
  // Why Choose (sections.why-choose) - has nested blocks.feature-item
  why_choose: {
    tieu_de: "Tại sao chọn Timeso?",
    cac_ly_do: [
      {
        tieu_de: "Tiết kiệm 60% thời gian",
        mo_ta: "Tự động hóa hoàn toàn quy trình chấm công và quản lý nhân sự.",
      },
      {
        tieu_de: "Độ chính xác 99.9%",
        mo_ta: "Công nghệ AI và Face ID đảm bảo dữ liệu chấm công chính xác tuyệt đối.",
      },
      {
        tieu_de: "Triển khai nhanh 1-2 tuần",
        mo_ta: "Đội ngũ hỗ trợ tận tình giúp bạn triển khai nhanh chóng.",
      },
      { tieu_de: "Hỗ trợ 24/7", mo_ta: "Đội ngũ hỗ trợ khách hàng sẵn sàng mọi lúc mọi nơi." },
    ],
  },
  // All In One (sections.all-in-one) - has nested blocks.all-in-one-module
  all_in_one: {
    tieu_de: "Tất cả trong một",
    tieu_de_phu: "Giải pháp toàn diện",
    mo_ta: "Quản lý toàn bộ hoạt động nhân sự trên một nền tảng duy nhất.",
    modules: [
      {
        tieu_de: "Chấm Công",
        mo_ta: "GPS, Face ID, QR Code - đa phương thức chấm công",
        link: "/cham-cong",
      },
      {
        tieu_de: "Sắp Ca Thông Minh",
        mo_ta: "AI tự động sắp xếp ca làm việc tối ưu",
        link: "/sap-ca-thong-minh",
      },
      {
        tieu_de: "Quản Lý Nhân Sự",
        mo_ta: "Hồ sơ, hợp đồng, phúc lợi - quản lý toàn diện",
        link: "/quan-ly-nhan-su",
      },
      {
        tieu_de: "Quản Lý Tài Sản",
        mo_ta: "Theo dõi tài sản công ty chi tiết",
        link: "/quan-ly-tai-san",
      },
      {
        tieu_de: "Quản Lý Đơn Hàng",
        mo_ta: "Phân công và theo dõi đơn hàng hiệu quả",
        link: "/quan-ly-don-hang",
      },
    ],
  },
  // AI Section (sections.ai-section) - has nested blocks.feature-item
  ai_section: {
    tieu_de: "Công nghệ AI",
    tieu_de_noi_bat: "tiên tiến nhất",
    mo_ta: "Timeso sử dụng AI thế hệ mới để tối ưu hóa mọi khía cạnh của quản lý nhân sự.",
    tinh_nang: [
      { tieu_de: "Nhận diện khuôn mặt", mo_ta: "Độ chính xác 99.9%, chống gian lận chấm công" },
      {
        tieu_de: "Dự đoán nhu cầu nhân sự",
        mo_ta: "Phân tích dữ liệu lịch sử để dự báo chính xác",
      },
      { tieu_de: "Phát hiện bất thường", mo_ta: "Tự động cảnh báo khi có dữ liệu bất thường" },
      { tieu_de: "Đề xuất lịch tối ưu", mo_ta: "AI sắp xếp lịch làm việc hiệu quả nhất" },
    ],
  },
  // Cyan Banner (sections.cyan-banner) - has nested blocks.stat-item
  cyan_banner: {
    tieu_de: "Bắt đầu miễn phí",
    tieu_de_phu: "ngay hôm nay",
    thong_ke: [
      { gia_tri: "1000", hau_to: "+", mo_ta: "Doanh nghiệp tin dùng" },
      { gia_tri: "50", hau_to: "K+", mo_ta: "Người dùng hoạt động" },
      { gia_tri: "99.9", hau_to: "%", mo_ta: "Uptime hệ thống" },
    ],
  },
  // Target Audience (sections.target-audience) - has nested blocks.target-audience-item
  target_audience: {
    tieu_de: "Giải pháp cho mọi quy mô",
    mo_ta: "Timeso phù hợp với mọi loại hình doanh nghiệp",
    doi_tuong: [
      { tieu_de: "Doanh nghiệp vừa và nhỏ", mo_ta: "Giải pháp linh hoạt, chi phí hợp lý." },
      { tieu_de: "Doanh nghiệp lớn", mo_ta: "Tùy chỉnh theo yêu cầu, tích hợp hệ thống." },
      { tieu_de: "Chuỗi bán lẻ", mo_ta: "Quản lý đa chi nhánh, đa địa điểm dễ dàng." },
      { tieu_de: "Nhà máy sản xuất", mo_ta: "Quản lý ca kíp, công nhân 24/7." },
    ],
  },
  // User Stories (sections.user-stories) - has nested blocks.user-story
  user_stories: {
    tieu_de: "Câu chuyện thành công",
    mo_ta: "Xem cách các doanh nghiệp đã thành công với Timeso",
    stories: [
      {
        tieu_de: "FPT Software",
        mo_ta: "Tiết kiệm 70% thời gian quản lý 10,000 nhân viên",
        link: "/case-study/fpt-software",
      },
      {
        tieu_de: "Vinamilk",
        mo_ta: "Tăng 95% độ chính xác chấm công toàn quốc",
        link: "/case-study/vinamilk",
      },
      {
        tieu_de: "Thế Giới Di Động",
        mo_ta: "Quản lý 2,000+ cửa hàng hiệu quả",
        link: "/case-study/tgdd",
      },
    ],
  },
  // Comparison (sections.comparison)
  comparison: {
    tieu_de: "So sánh với giải pháp khác",
    mo_ta: "Timeso vượt trội hơn các giải pháp truyền thống",
    du_lieu: {
      headers: ["Tính năng", "Timeso", "Giải pháp khác"],
      rows: [
        ["Chấm công đa phương thức", "✓", "Hạn chế"],
        ["AI sắp ca tự động", "✓", "✗"],
        ["Báo cáo real-time", "✓", "Định kỳ"],
        ["Hỗ trợ 24/7", "✓", "Giờ hành chính"],
        ["Tích hợp API", "✓", "Hạn chế"],
      ],
    },
  },
  // Pricing (sections.pricing-section) - has nested blocks.pricing-plan
  pricing: {
    tieu_de: "Bảng giá minh bạch",
    mo_ta: "Chọn gói phù hợp với quy mô doanh nghiệp của bạn",
    goi_gia: [
      {
        ten_goi: "Starter",
        gia: "99,000",
        don_vi: "VNĐ/người/tháng",
        mo_ta: "Dành cho doanh nghiệp nhỏ",
        tinh_nang: ["Chấm công GPS", "Báo cáo cơ bản", "5 người dùng", "Hỗ trợ email"],
        noi_bat: false,
        nut_text: "Bắt đầu",
      },
      {
        ten_goi: "Business",
        gia: "199,000",
        don_vi: "VNĐ/người/tháng",
        mo_ta: "Phổ biến nhất cho SME",
        tinh_nang: [
          "Tất cả Starter",
          "Face ID",
          "Sắp ca AI",
          "Không giới hạn người dùng",
          "Hỗ trợ 24/7",
        ],
        noi_bat: true,
        nut_text: "Dùng thử miễn phí",
      },
      {
        ten_goi: "Enterprise",
        gia: "Liên hệ",
        don_vi: "",
        mo_ta: "Dành cho doanh nghiệp lớn",
        tinh_nang: [
          "Tất cả Business",
          "Tùy chỉnh theo yêu cầu",
          "Tích hợp API",
          "Account Manager riêng",
          "SLA 99.9%",
        ],
        noi_bat: false,
        nut_text: "Liên hệ tư vấn",
      },
    ],
  },
  // Testimonials (sections.testimonials) - has nested blocks.testimonial-item
  testimonials: {
    tieu_de: "Khách hàng nói gì về Timeso?",
    danh_gia: [
      {
        noi_dung:
          "Timeso đã giúp chúng tôi tiết kiệm 60% thời gian quản lý nhân sự mỗi tháng. Thật tuyệt vời!",
        ten: "Nguyễn Văn A",
        chuc_vu: "HR Director, FPT Software",
        so_sao: 5,
      },
      {
        noi_dung: "Ứng dụng trực quan, dễ sử dụng. Nhân viên của tôi rất hài lòng với trải nghiệm.",
        ten: "Trần Thị B",
        chuc_vu: "CEO, Startup XYZ",
        so_sao: 5,
      },
      {
        noi_dung:
          "Tính năng sắp ca AI thực sự thay đổi cách chúng tôi vận hành. Không còn đau đầu mỗi tuần!",
        ten: "Lê Văn C",
        chuc_vu: "Operations Manager, Retail Chain",
        so_sao: 5,
      },
    ],
  },
  // CTA (sections.cta-section)
  cta: {
    tieu_de: "Sẵn sàng bắt đầu?",
    mo_ta:
      "Đăng ký ngay để trải nghiệm giải pháp quản lý nhân sự thông minh nhất Việt Nam. Dùng thử miễn phí 14 ngày!",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};
