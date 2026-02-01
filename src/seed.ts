/**
 * Strapi Seed Script
 * Seeds all content types with sample Vietnamese data
 *
 * Run with: npx ts-node src/seed.ts
 * Or add to package.json: "seed": "ts-node src/seed.ts"
 */

const STRAPI_URL = "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN || "";

interface StrapiResponse {
  data?: { id: number };
  error?: unknown;
}

async function apiCall(
  endpoint: string,
  method: string,
  data?: Record<string, unknown>
): Promise<StrapiResponse> {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  if (data) {
    options.body = JSON.stringify({ data });
  }

  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    console.error(`Error ${endpoint}:`, result);
    return { error: result };
  }
  return result as StrapiResponse;
}

// =====================================
// COLLECTION TYPES SEED DATA
// =====================================

const doiTacData = [
  { ten: "FPT Corporation", website: "https://fpt.com.vn", thu_tu: 1 },
  { ten: "Viettel Group", website: "https://viettel.com.vn", thu_tu: 2 },
  { ten: "VinGroup", website: "https://vingroup.net", thu_tu: 3 },
  { ten: "Masan Group", website: "https://masangroup.com", thu_tu: 4 },
  { ten: "Techcombank", website: "https://techcombank.com.vn", thu_tu: 5 },
  { ten: "VPBank", website: "https://vpbank.com.vn", thu_tu: 6 },
];

const thanhVienData = [
  {
    ten: "Nguyễn Văn An",
    chuc_vu: "CEO & Founder",
    mo_ta: "Hơn 15 năm kinh nghiệm trong lĩnh vực công nghệ và quản trị nhân sự.",
    thu_tu: 1,
  },
  {
    ten: "Trần Thị Bình",
    chuc_vu: "CTO",
    mo_ta: "Chuyên gia công nghệ với background từ Google và Microsoft.",
    thu_tu: 2,
  },
  {
    ten: "Lê Hoàng Cường",
    chuc_vu: "CPO",
    mo_ta: "10+ năm kinh nghiệm phát triển sản phẩm tại các startup unicorn.",
    thu_tu: 3,
  },
  {
    ten: "Phạm Minh Đức",
    chuc_vu: "Head of Engineering",
    mo_ta: "Kỹ sư phần mềm senior với chuyên môn về AI/ML.",
    thu_tu: 4,
  },
];

const khachHangData = [
  {
    ten: "Nguyễn Hoàng Long",
    chuc_vu: "Giám đốc Nhân sự",
    cong_ty: "FPT Software",
    noi_dung:
      "Timeso đã giúp chúng tôi tiết kiệm 60% thời gian quản lý nhân sự. Hệ thống chấm công tự động và báo cáo thông minh thực sự ấn tượng.",
    so_sao: 5,
  },
  {
    ten: "Trần Minh Tuấn",
    chuc_vu: "CEO",
    cong_ty: "Tech Startup ABC",
    noi_dung:
      "Từ khi sử dụng Timeso, việc quản lý đội ngũ 200+ nhân viên trở nên dễ dàng hơn bao giờ hết. Highly recommended!",
    so_sao: 5,
  },
  {
    ten: "Lê Thị Hương",
    chuc_vu: "HR Manager",
    cong_ty: "Công ty XYZ",
    noi_dung:
      "Tính năng sắp ca thông minh của Timeso thực sự tuyệt vời. AI đề xuất lịch làm việc tối ưu cho từng nhân viên.",
    so_sao: 5,
  },
];

const baiVietData = [
  {
    tieu_de: "5 Xu Hướng Quản Trị Nhân Sự 2026",
    slug: "5-xu-huong-quan-tri-nhan-su-2026",
    mo_ta:
      "Khám phá 5 xu hướng quan trọng nhất trong quản trị nhân sự năm 2026 mà doanh nghiệp cần nắm bắt.",
    noi_dung: `
## Giới thiệu

Năm 2026 đánh dấu bước chuyển mình quan trọng trong lĩnh vực quản trị nhân sự. Với sự phát triển mạnh mẽ của AI và công nghệ, cách thức quản lý nhân sự đang thay đổi căn bản.

## 1. AI trong Tuyển Dụng

AI đang cách mạng hóa quy trình tuyển dụng, từ sàng lọc CV đến phỏng vấn tự động.

## 2. Làm Việc Hybrid

Mô hình làm việc kết hợp giữa văn phòng và từ xa tiếp tục là xu hướng chủ đạo.

## 3. Chấm Công Thông Minh

Các giải pháp chấm công AI như Timeso giúp tự động hóa hoàn toàn quy trình.

## 4. Employee Experience

Trải nghiệm nhân viên trở thành ưu tiên hàng đầu của các doanh nghiệp.

## 5. Data-Driven HR

Ra quyết định dựa trên dữ liệu là yêu cầu bắt buộc với HR hiện đại.
    `,
    tac_gia: "Admin Timeso",
    danh_muc: "quan-tri-nhan-su",
    tags: ["HR", "xu hướng", "2026", "AI"],
    noi_bat: true,
    seo: {
      tieu_de: "5 Xu Hướng Quản Trị Nhân Sự 2026 | Timeso Blog",
      mo_ta: "Khám phá 5 xu hướng quan trọng nhất trong quản trị nhân sự năm 2026.",
      tu_khoa: "quản trị nhân sự, HR trends, xu hướng HR 2026",
    },
  },
  {
    tieu_de: "Hướng Dẫn Triển Khai Hệ Thống Chấm Công AI",
    slug: "huong-dan-trien-khai-he-thong-cham-cong-ai",
    mo_ta: "Hướng dẫn chi tiết các bước triển khai hệ thống chấm công AI cho doanh nghiệp.",
    noi_dung: `
## Tại sao cần Chấm Công AI?

Chấm công truyền thống tốn nhiều thời gian và dễ xảy ra sai sót. Hệ thống AI giúp tự động hóa hoàn toàn quy trình này.

## Bước 1: Đánh giá nhu cầu

Xác định số lượng nhân viên, địa điểm làm việc và các yêu cầu đặc thù.

## Bước 2: Chọn giải pháp phù hợp

Timeso cung cấp giải pháp toàn diện với GPS, Face ID và QR Code.

## Bước 3: Triển khai và đào tạo

Quá trình triển khai nhanh chóng trong vòng 1-2 tuần.

## Bước 4: Vận hành và tối ưu

Theo dõi báo cáo và điều chỉnh cấu hình phù hợp với doanh nghiệp.
    `,
    tac_gia: "Admin Timeso",
    danh_muc: "cong-nghe-ai",
    tags: ["chấm công", "AI", "hướng dẫn", "triển khai"],
    noi_bat: false,
    seo: {
      tieu_de: "Hướng Dẫn Triển Khai Chấm Công AI | Timeso Blog",
      mo_ta: "Hướng dẫn chi tiết triển khai hệ thống chấm công AI.",
      tu_khoa: "chấm công AI, triển khai, hướng dẫn",
    },
  },
];

const caseStudyData = [
  {
    tieu_de: "FPT Software - Quản lý 10,000+ nhân viên với Timeso",
    slug: "fpt-software-quan-ly-10000-nhan-vien",
    mo_ta: "Case study về việc FPT Software triển khai Timeso để quản lý hơn 10,000 nhân viên.",
    noi_dung: `
## Thách thức

FPT Software với hơn 10,000 nhân viên tại 20+ địa điểm gặp khó khăn trong việc quản lý chấm công và tính lương.

## Giải pháp

Timeso được triển khai với các tính năng:
- Chấm công GPS đa địa điểm
- Sắp ca tự động bằng AI
- Tích hợp với hệ thống tính lương

## Kết quả

- Giảm 70% thời gian quản lý chấm công
- Tăng 95% độ chính xác dữ liệu
- ROI sau 6 tháng triển khai
    `,
    khach_hang: "FPT Software",
    nganh: "Công nghệ thông tin",
    ket_qua: [
      { label: "Giảm thời gian", value: "70%" },
      { label: "Độ chính xác", value: "95%" },
      { label: "Nhân viên", value: "10,000+" },
    ],
    seo: {
      tieu_de: "FPT Software Case Study | Timeso",
      mo_ta: "Case study triển khai Timeso tại FPT Software.",
      tu_khoa: "FPT Software, case study, chấm công",
    },
  },
];

// =====================================
// SINGLE TYPES SEED DATA
// =====================================

const trangChuData = {
  seo: {
    tieu_de: "Timeso - Giải pháp Quản lý Nhân sự Thông minh",
    mo_ta:
      "Timeso - Nền tảng quản lý nhân sự, chấm công, sắp ca thông minh hàng đầu Việt Nam. Tối ưu hóa vận hành với AI.",
    tu_khoa: "quản lý nhân sự, chấm công, sắp ca, HR software, timeso, phần mềm nhân sự",
  },
  hero: {
    tieu_de: "Giải pháp Quản lý Nhân sự",
    tieu_de_noi_bat: "Thông minh & Toàn diện",
    mo_ta:
      "Timeso giúp doanh nghiệp tối ưu hóa quy trình quản lý nhân sự với công nghệ AI tiên tiến. Chấm công, sắp ca, tính lương - tất cả trong một nền tảng.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  video_url: "https://www.youtube.com/watch?v=example",
  trusted_by: {
    tieu_de: "Được tin dùng bởi hơn 1000+ doanh nghiệp",
  },
  why_choose: {
    tieu_de: "Tại sao chọn Timeso?",
    cac_ly_do: [
      {
        tieu_de: "Tiết kiệm 60% thời gian",
        mo_ta: "Tự động hóa hoàn toàn quy trình chấm công và quản lý nhân sự.",
      },
      {
        tieu_de: "Độ chính xác 99.9%",
        mo_ta: "Công nghệ AI đảm bảo dữ liệu chấm công chính xác tuyệt đối.",
      },
      {
        tieu_de: "Triển khai nhanh",
        mo_ta: "Chỉ mất 1-2 tuần để triển khai và vận hành toàn bộ hệ thống.",
      },
      {
        tieu_de: "Hỗ trợ 24/7",
        mo_ta: "Đội ngũ hỗ trợ khách hàng sẵn sàng 24/7 mọi lúc mọi nơi.",
      },
    ],
  },
  all_in_one: {
    tieu_de: "Tất cả trong một",
    mo_ta: "Quản lý toàn bộ hoạt động nhân sự trên một nền tảng duy nhất.",
    cac_module: [
      {
        tieu_de: "Chấm Công",
        mo_ta: "GPS, Face ID, QR Code",
        duong_dan: "/cham-cong",
      },
      {
        tieu_de: "Sắp Ca Thông Minh",
        mo_ta: "AI tự động sắp xếp ca làm việc",
        duong_dan: "/sap-ca-thong-minh",
      },
      {
        tieu_de: "Quản Lý Nhân Sự",
        mo_ta: "Hồ sơ, hợp đồng, phúc lợi",
        duong_dan: "/quan-ly-nhan-su",
      },
      {
        tieu_de: "Quản Lý Tài Sản",
        mo_ta: "Theo dõi tài sản công ty",
        duong_dan: "/quan-ly-tai-san",
      },
    ],
  },
  ai_section: {
    tieu_de: "Công nghệ AI tiên tiến",
    mo_ta: "Timeso sử dụng AI để tối ưu hóa mọi khía cạnh của quản lý nhân sự.",
    tinh_nang: [
      "Nhận diện khuôn mặt chính xác 99.9%",
      "Dự đoán nhu cầu nhân sự",
      "Phát hiện bất thường tự động",
      "Đề xuất lịch làm việc tối ưu",
    ],
  },
  cyan_banner: {
    tieu_de: "Bắt đầu miễn phí ngay hôm nay",
    mo_ta: "Dùng thử 14 ngày không giới hạn tính năng",
    cta_text: "Đăng ký ngay",
    cta_url: "/lien-he",
  },
  target_audience: {
    tieu_de: "Giải pháp cho mọi quy mô",
    cac_doi_tuong: [
      {
        tieu_de: "Doanh nghiệp vừa và nhỏ",
        mo_ta: "Giải pháp linh hoạt, tiết kiệm chi phí.",
      },
      {
        tieu_de: "Doanh nghiệp lớn",
        mo_ta: "Tùy chỉnh theo yêu cầu, tích hợp sâu.",
      },
      {
        tieu_de: "Chuỗi bán lẻ",
        mo_ta: "Quản lý đa chi nhánh, đa địa điểm.",
      },
      {
        tieu_de: "Nhà máy sản xuất",
        mo_ta: "Quản lý ca kíp, công nhân hiệu quả.",
      },
    ],
  },
  user_stories: {
    tieu_de: "Câu chuyện khách hàng",
    cac_cau_chuyen: [
      {
        ten: "Nguyễn Văn A",
        chuc_vu: "HR Manager, FPT",
        noi_dung: "Timeso giúp chúng tôi tiết kiệm 60% thời gian quản lý.",
      },
      {
        ten: "Trần Thị B",
        chuc_vu: "CEO, Startup XYZ",
        noi_dung: "Ứng dụng trực quan, dễ sử dụng, nhân viên của tôi rất hài lòng.",
      },
    ],
  },
  comparison: {
    tieu_de: "So sánh với giải pháp khác",
    timeso_features: [
      "Chấm công đa phương thức",
      "AI sắp ca tự động",
      "Báo cáo real-time",
      "Hỗ trợ 24/7",
    ],
    competitor_features: [
      "Chỉ hỗ trợ 1-2 phương thức",
      "Sắp ca thủ công",
      "Báo cáo định kỳ",
      "Hỗ trợ giờ hành chính",
    ],
  },
  pricing: {
    tieu_de: "Bảng giá",
    mo_ta: "Chọn gói phù hợp với doanh nghiệp của bạn",
    cac_goi: [
      {
        ten: "Starter",
        gia: "99,000",
        don_vi: "VNĐ/người/tháng",
        tinh_nang: ["Chấm công GPS", "Báo cáo cơ bản", "5 người dùng", "Hỗ trợ email"],
      },
      {
        ten: "Business",
        gia: "199,000",
        don_vi: "VNĐ/người/tháng",
        tinh_nang: [
          "Tất cả tính năng Starter",
          "Face ID",
          "Sắp ca AI",
          "Không giới hạn người dùng",
          "Hỗ trợ 24/7",
        ],
        noi_bat: true,
      },
      {
        ten: "Enterprise",
        gia: "Liên hệ",
        don_vi: "",
        tinh_nang: [
          "Tất cả tính năng Business",
          "Tùy chỉnh theo yêu cầu",
          "Tích hợp API",
          "Account Manager riêng",
        ],
      },
    ],
  },
  testimonials: {
    tieu_de: "Khách hàng nói gì về Timeso?",
  },
  cta: {
    tieu_de: "Sẵn sàng bắt đầu?",
    mo_ta: "Đăng ký ngay để trải nghiệm giải pháp quản lý nhân sự thông minh nhất.",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

const chamCongData = {
  seo: {
    tieu_de: "Chấm Công Thông Minh - Timeso",
    mo_ta:
      "Hệ thống chấm công đa phương thức: GPS, Face ID, QR Code. Tự động hóa hoàn toàn quy trình chấm công.",
    tu_khoa: "chấm công, GPS, Face ID, QR Code, chấm công online",
  },
  hero: {
    tieu_de: "Chấm Công Thông Minh",
    tieu_de_noi_bat: "Đa Phương Thức",
    mo_ta:
      "Hệ thống chấm công hiện đại với GPS, Face ID và QR Code. Chính xác, nhanh chóng, dễ sử dụng.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  tinh_nang: [
    {
      tieu_de: "Chấm Công GPS",
      danh_sach: ["Xác định vị trí chính xác", "Hỗ trợ đa địa điểm", "Cảnh báo ra ngoài vùng"],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Chấm Công Face ID",
      danh_sach: ["Nhận diện khuôn mặt AI", "Độ chính xác 99.9%", "Chống gian lận"],
      mau_nen: "#f0fdf4",
    },
    {
      tieu_de: "Chấm Công QR Code",
      danh_sach: ["Quét mã nhanh chóng", "Tạo mã động", "Bảo mật cao"],
      mau_nen: "#fefce8",
    },
  ],
  da_linh_vuc: {
    tieu_de_phu: "Được tin dùng trong",
    tieu_de: "ĐA LĨNH VỰC",
    thong_ke: [
      { gia_tri: "1000", hau_to: "+", mo_ta: "Doanh nghiệp" },
      { gia_tri: "50", hau_to: "K+", mo_ta: "Người dùng" },
      { gia_tri: "99.9", hau_to: "%", mo_ta: "Độ chính xác" },
    ],
  },
  why_choose: {
    tieu_de: "Tại sao chọn Chấm Công Timeso?",
    cac_ly_do: [
      { tieu_de: "Chính xác tuyệt đối", mo_ta: "Công nghệ AI đảm bảo dữ liệu." },
      { tieu_de: "Dễ sử dụng", mo_ta: "Giao diện trực quan, dễ thao tác." },
      { tieu_de: "Báo cáo real-time", mo_ta: "Theo dõi trực tiếp mọi lúc." },
      { tieu_de: "Tích hợp lương", mo_ta: "Đồng bộ dữ liệu tính lương." },
    ],
  },
  cta: {
    tieu_de: "Trải nghiệm Chấm Công Thông Minh",
    mo_ta: "Đăng ký dùng thử miễn phí 14 ngày",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

const sapCaThongMinhData = {
  seo: {
    tieu_de: "Sắp Ca Thông Minh - Timeso",
    mo_ta: "AI tự động sắp xếp lịch làm việc tối ưu. Giảm 60% thời gian phân ca, tối ưu nguồn lực.",
    tu_khoa: "sắp ca, lịch làm việc, AI, phân ca tự động",
  },
  hero: {
    tieu_de: "Sắp Ca Thông Minh",
    tieu_de_noi_bat: "Tự Động Với AI",
    mo_ta:
      "AI phân tích và tự động sắp xếp lịch làm việc tối ưu. Tiết kiệm thời gian, tối ưu nguồn lực.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  tinh_nang: [
    {
      tieu_de: "AI Đề Xuất Ca Làm",
      danh_sach: [
        "Phân tích kỹ năng nhân viên",
        "Cân bằng khối lượng công việc",
        "Tối ưu chi phí OT",
      ],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Cảnh Báo Thông Minh",
      danh_sach: ["Phát hiện thiếu người", "Cảnh báo xung đột ca", "Thông báo tự động"],
      mau_nen: "#f0fdf4",
    },
  ],
  da_linh_vuc: {
    tieu_de_phu: "Tối ưu hóa cho",
    tieu_de: "ĐA NGÀNH NGHỀ",
    thong_ke: [
      { gia_tri: "60", hau_to: "%", mo_ta: "Giảm thời gian sắp ca" },
      { gia_tri: "30", hau_to: "%", mo_ta: "Giảm chi phí OT" },
      { gia_tri: "95", hau_to: "%", mo_ta: "Độ hài lòng nhân viên" },
    ],
  },
  why_choose: {
    tieu_de: "Ưu điểm của Sắp Ca Timeso",
    cac_ly_do: [
      { tieu_de: "Tự động hoàn toàn", mo_ta: "AI làm việc 24/7 cho bạn." },
      { tieu_de: "Linh hoạt", mo_ta: "Điều chỉnh theo nhu cầu thực tế." },
      { tieu_de: "Công bằng", mo_ta: "Phân bổ đều đặn cho nhân viên." },
      { tieu_de: "Tiết kiệm", mo_ta: "Giảm chi phí vận hành đáng kể." },
    ],
  },
  cta: {
    tieu_de: "Trải nghiệm Sắp Ca Thông Minh",
    mo_ta: "Tự động hóa lịch làm việc ngay hôm nay",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

const quanLyNhanSuData = {
  seo: {
    tieu_de: "Quản Lý Nhân Sự - Timeso",
    mo_ta: "Giải pháp quản lý nhân sự toàn diện: hồ sơ, hợp đồng, phúc lợi, đánh giá hiệu suất.",
    tu_khoa: "quản lý nhân sự, HR, hồ sơ nhân viên, hợp đồng lao động",
  },
  hero: {
    tieu_de: "Quản Lý Nhân Sự",
    tieu_de_noi_bat: "Toàn Diện & Hiệu Quả",
    mo_ta: "Quản lý hồ sơ, hợp đồng, phúc lợi và đánh giá hiệu suất nhân viên trên một nền tảng.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  tinh_nang: [
    {
      tieu_de: "Quản Lý Hồ Sơ",
      danh_sach: ["Lưu trữ tập trung", "Tìm kiếm nhanh chóng", "Bảo mật cao"],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Quản Lý Hợp Đồng",
      danh_sach: ["Theo dõi hạn hợp đồng", "Nhắc nhở tự động", "Xuất báo cáo"],
      mau_nen: "#f0fdf4",
    },
  ],
  da_linh_vuc: {
    tieu_de_phu: "Phù hợp cho",
    tieu_de: "MỌI LOẠI HÌNH DOANH NGHIỆP",
    thong_ke: [
      { gia_tri: "100", hau_to: "%", mo_ta: "Số hóa hồ sơ" },
      { gia_tri: "50", hau_to: "%", mo_ta: "Giảm thời gian tìm kiếm" },
      { gia_tri: "0", hau_to: "", mo_ta: "Mất mát dữ liệu" },
    ],
  },
  why_choose: {
    tieu_de: "Lợi ích Quản Lý Nhân Sự Timeso",
    cac_ly_do: [
      { tieu_de: "Tập trung dữ liệu", mo_ta: "Mọi thông tin một nơi." },
      { tieu_de: "Tự động nhắc nhở", mo_ta: "Không bỏ lỡ deadline." },
      { tieu_de: "Phân quyền linh hoạt", mo_ta: "Kiểm soát truy cập." },
      { tieu_de: "Báo cáo thông minh", mo_ta: "Insight hữu ích cho HR." },
    ],
  },
  cta: {
    tieu_de: "Nâng Cấp Quản Lý Nhân Sự",
    mo_ta: "Số hóa toàn bộ quy trình HR của bạn",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

const quanLyDonHangData = {
  seo: {
    tieu_de: "Quản Lý Đơn Hàng - Timeso",
    mo_ta: "Theo dõi và quản lý đơn hàng hiệu quả. Tích hợp với quy trình vận hành.",
    tu_khoa: "quản lý đơn hàng, order management, theo dõi đơn hàng",
  },
  hero: {
    tieu_de: "Quản Lý Đơn Hàng",
    tieu_de_noi_bat: "Thông Minh",
    mo_ta: "Theo dõi và quản lý đơn hàng hiệu quả, tích hợp liền mạch với quy trình vận hành.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  tinh_nang: [
    {
      tieu_de: "Theo Dõi Đơn Hàng",
      danh_sach: ["Cập nhật real-time", "Lịch sử đầy đủ", "Thông báo tự động"],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Phân Công Nhân Viên",
      danh_sach: ["Giao việc tự động", "Theo dõi tiến độ", "Đánh giá hiệu suất"],
      mau_nen: "#f0fdf4",
    },
  ],
  da_linh_vuc: {
    tieu_de_phu: "Áp dụng trong",
    tieu_de: "ĐA NGÀNH NGHỀ",
    thong_ke: [
      { gia_tri: "40", hau_to: "%", mo_ta: "Tăng hiệu suất xử lý" },
      { gia_tri: "90", hau_to: "%", mo_ta: "Độ hài lòng khách hàng" },
      { gia_tri: "24", hau_to: "/7", mo_ta: "Theo dõi liên tục" },
    ],
  },
  cta: {
    tieu_de: "Quản Lý Đơn Hàng Hiệu Quả",
    mo_ta: "Tối ưu quy trình vận hành ngay hôm nay",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

const quanLyTaiSanData = {
  seo: {
    tieu_de: "Quản Lý Tài Sản - Timeso",
    mo_ta: "Theo dõi và quản lý tài sản công ty hiệu quả. Kiểm kê, bảo trì, phân bổ.",
    tu_khoa: "quản lý tài sản, asset management, kiểm kê tài sản",
  },
  hero: {
    tieu_de: "Quản Lý Tài Sản",
    tieu_de_noi_bat: "Đầy Đủ & Chi Tiết",
    mo_ta:
      "Theo dõi toàn bộ tài sản công ty từ laptop đến xe cộ. Kiểm kê, bảo trì, phân bổ dễ dàng.",
    hien_thi_badges: true,
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
  tinh_nang: [
    {
      tieu_de: "Theo Dõi Tài Sản",
      danh_sach: ["Mã QR cho từng tài sản", "Lịch sử sử dụng", "Vị trí hiện tại"],
      mau_nen: "#f0f9ff",
    },
    {
      tieu_de: "Lịch Bảo Trì",
      danh_sach: ["Nhắc nhở tự động", "Theo dõi chi phí", "Lịch sử bảo trì"],
      mau_nen: "#f0fdf4",
    },
  ],
  da_linh_vuc: {
    tieu_de_phu: "Quản lý hiệu quả",
    tieu_de: "MỌI LOẠI TÀI SẢN",
    thong_ke: [
      { gia_tri: "100", hau_to: "%", mo_ta: "Số hóa tài sản" },
      { gia_tri: "30", hau_to: "%", mo_ta: "Giảm thất lạc" },
      { gia_tri: "20", hau_to: "%", mo_ta: "Tiết kiệm chi phí" },
    ],
  },
  why_choose: {
    tieu_de: "Lợi ích Quản Lý Tài Sản",
    cac_ly_do: [
      { tieu_de: "Kiểm kê nhanh chóng", mo_ta: "Quét QR là xong." },
      { tieu_de: "Không thất lạc", mo_ta: "Theo dõi vị trí liên tục." },
      { tieu_de: "Bảo trì đúng hạn", mo_ta: "Tự động nhắc nhở." },
      { tieu_de: "Báo cáo chi tiết", mo_ta: "Giá trị, khấu hao đầy đủ." },
    ],
  },
  cta: {
    tieu_de: "Quản Lý Tài Sản Hiệu Quả",
    mo_ta: "Số hóa và theo dõi mọi tài sản",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

const veChungToiData = {
  seo: {
    tieu_de: "Về Chúng Tôi - Timeso",
    mo_ta: "Tìm hiểu về Timeso - công ty công nghệ hàng đầu trong lĩnh vực quản lý nhân sự.",
    tu_khoa: "về Timeso, giới thiệu, đội ngũ, lịch sử",
  },
  hero: {
    tieu_de: "Về Chúng Tôi",
    tieu_de_noi_bat: "Timeso",
    mo_ta:
      "Chúng tôi là đội ngũ đam mê công nghệ, cam kết mang đến giải pháp quản lý nhân sự tốt nhất.",
    hien_thi_badges: false,
  },
  cau_chuyen: `
## Câu Chuyện Của Chúng Tôi

Timeso được thành lập vào năm 2020 bởi một nhóm kỹ sư từng làm việc tại các công ty công nghệ hàng đầu.

### Tầm Nhìn

Chúng tôi tin rằng mọi doanh nghiệp, dù lớn hay nhỏ, đều xứng đáng có được công cụ quản lý nhân sự hiện đại và hiệu quả.

### Sứ Mệnh

Giúp doanh nghiệp tối ưu hóa quy trình quản lý nhân sự, tiết kiệm thời gian và chi phí, tập trung vào những gì quan trọng nhất - con người.

### Giá Trị Cốt Lõi

- **Khách hàng là trung tâm**: Mọi quyết định đều hướng đến lợi ích khách hàng.
- **Đổi mới không ngừng**: Liên tục cải tiến sản phẩm và công nghệ.
- **Minh bạch và trung thực**: Xây dựng niềm tin qua hành động.
- **Teamwork**: Thành công đến từ sự hợp tác.
  `,
  gia_tri_cot_loi: [
    { tieu_de: "Khách hàng là trung tâm", mo_ta: "Mọi quyết định hướng đến lợi ích khách hàng." },
    { tieu_de: "Đổi mới không ngừng", mo_ta: "Liên tục cải tiến sản phẩm và công nghệ." },
    { tieu_de: "Minh bạch trung thực", mo_ta: "Xây dựng niềm tin qua hành động." },
    { tieu_de: "Teamwork", mo_ta: "Thành công đến từ sự hợp tác." },
  ],
  cta: {
    tieu_de: "Gia Nhập Đội Ngũ Timeso",
    mo_ta: "Chúng tôi luôn tìm kiếm những tài năng xuất sắc",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

const tuyenDungData = {
  seo: {
    tieu_de: "Tuyển Dụng - Timeso",
    mo_ta: "Gia nhập đội ngũ Timeso. Khám phá các vị trí tuyển dụng và cơ hội nghề nghiệp.",
    tu_khoa: "tuyển dụng, việc làm, cơ hội nghề nghiệp, Timeso careers",
  },
  hero: {
    tieu_de: "Tuyển Dụng",
    tieu_de_noi_bat: "Cơ Hội Nghề Nghiệp",
    mo_ta: "Gia nhập đội ngũ Timeso - nơi tài năng được phát triển và đam mê được thực hiện.",
    hien_thi_badges: false,
  },
  dich_vu: {
    tieu_de: "Quyền Lợi Nhân Viên",
    cac_dich_vu: [
      { tieu_de: "Lương cạnh tranh", mo_ta: "Top 20% thị trường" },
      { tieu_de: "Làm việc linh hoạt", mo_ta: "Remote-friendly" },
      { tieu_de: "Bảo hiểm cao cấp", mo_ta: "Cho bạn và gia đình" },
      { tieu_de: "Team building", mo_ta: "Du lịch hàng năm" },
    ],
  },
  da_linh_vuc: {
    tieu_de_phu: "Đội ngũ",
    tieu_de: "TRÊN TOÀN QUỐC",
    thong_ke: [
      { gia_tri: "100", hau_to: "+", mo_ta: "Thành viên" },
      { gia_tri: "5", hau_to: "", mo_ta: "Văn phòng" },
      { gia_tri: "20", hau_to: "+", mo_ta: "Vị trí đang tuyển" },
    ],
  },
  thach_thuc: {
    tieu_de: "Thử Thách",
    cac_thach_thuc: [
      { tieu_de: "Scale sản phẩm", mo_ta: "Xử lý hàng triệu request mỗi ngày" },
      { tieu_de: "AI/ML", mo_ta: "Phát triển các mô hình AI tiên tiến" },
    ],
  },
  giai_phap: {
    tieu_de: "Quy Trình Ứng Tuyển",
    cac_giai_phap: [
      { tieu_de: "Nộp CV", mo_ta: "Gửi hồ sơ qua form online" },
      { tieu_de: "Phỏng vấn HR", mo_ta: "Trao đổi về văn hóa và kỳ vọng" },
      { tieu_de: "Interview kỹ thuật", mo_ta: "Đánh giá chuyên môn" },
      { tieu_de: "Offer", mo_ta: "Nhận offer và gia nhập team" },
    ],
  },
  why_choose: {
    tieu_de: "Tại sao chọn Timeso?",
    cac_ly_do: [
      { tieu_de: "Công nghệ tiên tiến", mo_ta: "Làm việc với stack hiện đại nhất." },
      { tieu_de: "Đội ngũ tài năng", mo_ta: "Học hỏi từ những người giỏi nhất." },
      { tieu_de: "Văn hóa cởi mở", mo_ta: "Môi trường đề cao sáng tạo." },
      { tieu_de: "Phát triển nhanh", mo_ta: "Cơ hội thăng tiến rõ ràng." },
    ],
  },
  cta: {
    tieu_de: "Ứng Tuyển Ngay",
    mo_ta: "Gửi CV của bạn để bắt đầu hành trình mới",
    app_store_url: "https://apps.apple.com/app/timeso",
    google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
  },
};

const lienHeData = {
  seo: {
    tieu_de: "Liên Hệ - Timeso",
    mo_ta: "Liên hệ với Timeso. Chúng tôi sẵn sàng hỗ trợ bạn 24/7.",
    tu_khoa: "liên hệ, hỗ trợ, contact, Timeso support",
  },
  hero: {
    tieu_de: "Liên Hệ",
    tieu_de_noi_bat: "Với Chúng Tôi",
    mo_ta: "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ ngay!",
    hien_thi_badges: false,
  },
  dia_chi: "Tầng 10, Tòa nhà ABC Tower, 123 Nguyễn Văn Linh, Quận 7, TP.HCM",
  email: "contact@timeso.vn",
  so_dien_thoai: "1900 1234 56",
  gio_lam_viec: "Thứ 2 - Thứ 6: 8:00 - 18:00\nThứ 7: 8:00 - 12:00\nChủ nhật: Nghỉ",
  ban_do_url: "https://maps.google.com/?q=10.7285,106.7151",
};

// =====================================
// MAIN SEED FUNCTION
// =====================================

async function seed() {
  console.log("🌱 Starting Strapi seed...\n");

  if (!API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN is required. Set it as environment variable.");
    console.log("   Run: export STRAPI_API_TOKEN=your_token_here");
    process.exit(1);
  }

  // Seed Collection Types
  console.log("📦 Seeding Collection Types...");

  console.log("   → Đối Tác...");
  for (const item of doiTacData) {
    await apiCall("doi-tacs", "POST", item);
  }

  console.log("   → Thành Viên...");
  for (const item of thanhVienData) {
    await apiCall("thanh-viens", "POST", item);
  }

  console.log("   → Khách Hàng...");
  for (const item of khachHangData) {
    await apiCall("khach-hangs", "POST", item);
  }

  console.log("   → Bài Viết...");
  for (const item of baiVietData) {
    await apiCall("bai-viets", "POST", item);
  }

  console.log("   → Case Study...");
  for (const item of caseStudyData) {
    await apiCall("case-studies", "POST", item);
  }

  // Seed Single Types
  console.log("\n📄 Seeding Single Types...");

  console.log("   → Trang Chủ...");
  await apiCall("trang-chu", "PUT", trangChuData);

  console.log("   → Chấm Công...");
  await apiCall("cham-cong", "PUT", chamCongData);

  console.log("   → Sắp Ca Thông Minh...");
  await apiCall("sap-ca-thong-minh", "PUT", sapCaThongMinhData);

  console.log("   → Quản Lý Nhân Sự...");
  await apiCall("quan-ly-nhan-su", "PUT", quanLyNhanSuData);

  console.log("   → Quản Lý Đơn Hàng...");
  await apiCall("quan-ly-don-hang", "PUT", quanLyDonHangData);

  console.log("   → Quản Lý Tài Sản...");
  await apiCall("quan-ly-tai-san", "PUT", quanLyTaiSanData);

  console.log("   → Về Chúng Tôi...");
  await apiCall("ve-chung-toi", "PUT", veChungToiData);

  console.log("   → Tuyển Dụng...");
  await apiCall("tuyen-dung", "PUT", tuyenDungData);

  console.log("   → Liên Hệ...");
  await apiCall("lien-he", "PUT", lienHeData);

  console.log("\n✅ Seed completed!");
  console.log("\n⚠️  Note: Remember to PUBLISH all content in Strapi Admin.");
}

seed().catch(console.error);
