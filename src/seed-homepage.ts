/**
 * Seed Homepage Data into Strapi (Full Automation)
 *
 * This script:
 * 1. Copies all required images from frontend/public/ directly into Strapi's public/uploads/
 * 2. Registers them in the Strapi database via the Upload API
 * 3. Populates the trang-chu (Homepage) single type with all section data
 *
 * Usage:
 *   STRAPI_API_TOKEN=<your-token> npx tsx src/seed-homepage.ts
 *
 * The script is idempotent — running it multiple times will re-upload and overwrite data.
 */

import * as fs from "fs";
import * as path from "path";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN || "";
const FRONTEND_PUBLIC = path.resolve(__dirname, "../../public");
const UPLOADS_DIR = path.resolve(__dirname, "../public/uploads");

// ─────────────────────────────────────────────
// Helper: Copy file to uploads + register via API
// ─────────────────────────────────────────────
async function uploadFile(
  relativePath: string,
  altText?: string
): Promise<{ id: number; url: string } | null> {
  const srcPath = path.resolve(FRONTEND_PUBLIC, relativePath.replace(/^\//, ""));

  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠ File not found: ${srcPath}`);
    return null;
  }

  // Step 1: Copy file to Strapi's public/uploads/ directory
  const fileName = path.basename(srcPath);
  const destPath = path.join(UPLOADS_DIR, fileName);

  // Ensure uploads directory exists
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  fs.copyFileSync(srcPath, destPath);
  console.log(`  📁 Copied: ${relativePath} → public/uploads/${fileName}`);

  // Step 2: Register with Strapi via upload API
  const fileBuffer = fs.readFileSync(srcPath);
  const fileBlob = new Blob([fileBuffer]);

  const formData = new FormData();
  formData.append("files", fileBlob, fileName);
  if (altText) {
    formData.append("fileInfo", JSON.stringify({ alternativeText: altText, caption: altText }));
  }

  try {
    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`  ✗ API registration failed for ${fileName}:`, err);
      return null;
    }

    const result = await response.json();
    const file = Array.isArray(result) ? result[0] : result;
    console.log(`  ✓ Registered: ${fileName} (id: ${file.id})`);
    return { id: file.id, url: file.url };
  } catch (error) {
    console.error(`  ✗ Upload error for ${fileName}:`, error);
    return null;
  }
}

// ─────────────────────────────────────────────
// Helper: PUT data to Strapi single type
// ─────────────────────────────────────────────
async function updateSingleType(endpoint: string, data: Record<string, unknown>): Promise<boolean> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`✗ Update ${endpoint} failed:`, err);
      return false;
    }

    console.log(`✓ Updated: ${endpoint}`);
    return true;
  } catch (error) {
    console.error(`✗ Update error for ${endpoint}:`, error);
    return false;
  }
}

// ─────────────────────────────────────────────
//  IMAGE MANIFEST — All images needed for homepage
// ─────────────────────────────────────────────
const IMAGE_MANIFEST = {
  // TrustedBy logos (9 SVGs)
  trustedByLogos: [
    {
      path: "images/logos/trusted-by/v2/c94c9d66a6c5cd994e83225d48b135b9c3851b91.svg",
      alt: "Intercom",
    },
    {
      path: "images/logos/trusted-by/v2/df9a7873b986c6deceafcfbabb4d7dfb5ceca3ee.svg",
      alt: "Andreessen Horowitz",
    },
    {
      path: "images/logos/trusted-by/v2/842d53f8c56e7fd468f86965d4bbc956e8ba6c94.svg",
      alt: "Salesforce Ventures",
    },
    {
      path: "images/logos/trusted-by/v2/0f4172f16cb3c4a18d1f854bed6014e3dd99d719.svg",
      alt: "Monzo",
    },
    {
      path: "images/logos/trusted-by/v2/d45c3f24223209f81861868ab08b02298199cbee.svg",
      alt: "GoCardless",
    },
    {
      path: "images/logos/trusted-by/v2/7d498a0e5f7f2d2d71a92f03ce93f6ac1291780c.svg",
      alt: "Snyk",
    },
    {
      path: "images/logos/trusted-by/v2/d5dfa5f455eee90295d80accdb1f5d4830334776.svg",
      alt: "Comply Advantage",
    },
    {
      path: "images/logos/trusted-by/v2/2b47f551906226d330d0c0558ddb7f0aca4f9783.svg",
      alt: "UiPath",
    },
    {
      path: "images/logos/trusted-by/v2/2a9460592ddc37198a26107360528ae8f247a0d5.svg",
      alt: "Deliveroo",
    },
  ],

  // AllInOne module images
  allInOne: [
    {
      path: "images/all-in-one/590d59e746e6e2148986c4d0850c4434393b07c0.png",
      alt: "Timeso Dashboard 1",
    },
    {
      path: "images/all-in-one/a998eb2ed393b08cb42215a71c61c1ac9cc019bb.png",
      alt: "Timeso Dashboard 2",
    },
  ],

  // AI Section
  aiSection: {
    mockup: {
      path: "images/ai-features/6c8d12863128766f14e439931aa6554efe391b38.png",
      alt: "Timeso AI Dashboard",
    },
    icons: [
      {
        path: "images/ai-features/v2/e14180eedc20164e61d19332e203164af616145e.svg",
        alt: "AI Tracking",
      },
      {
        path: "images/ai-features/v2/2f3fc883e9bd51dce429cfe095498b07e655ab60.svg",
        alt: "AI Matching",
      },
      {
        path: "images/ai-features/v2/c54e0c0727a937b17aca19dbe262dae12811c588.svg",
        alt: "AI Insights",
      },
    ],
  },

  // TargetAudience
  targetAudience: [
    {
      path: "images/industries/5335aa5a5b4407aacac944d21dc27ba3d924662d.png",
      alt: "Công ty Dịch vụ/Bán lẻ",
    },
    {
      path: "images/industries/137494bf6ea5d4ae4f904542819ead4ced389612.png",
      alt: "Nhà máy Sản xuất",
    },
    {
      path: "images/industries/409ae12f959767b7ff87251e30bc2f13cae31f46.png",
      alt: "Doanh nghiệp Công nghệ",
    },
    {
      path: "images/industries/b2e778a95e6d251fccc53bb6025a4d2d23da5db4.png",
      alt: "Chuỗi Cửa hàng",
    },
    {
      path: "images/industries/a107e23357b63b9e7c8eee9925beb1c919204abc.png",
      alt: "Công ty Vận hành Lớn",
    },
  ],

  // UserStories
  userStories: [
    {
      path: "images/user-stories/v2/684d51a743fb1e1de2d0be959325e0f386394b7e.svg",
      alt: "Tuyển dụng",
    },
    {
      path: "images/user-stories/v2/04378bfeca771747dc4db9d746155fd18110a80a.svg",
      alt: "Tính lương tự động",
    },
    {
      path: "images/user-stories/v2/c95da694e6dc9fdf0029cd249f94111adb02d48b.svg",
      alt: "Quản lý đơn hàng",
    },
    {
      path: "images/user-stories/v2/4cb621b8a7cf6873ee56c1f8a3c311a7700655d8.svg",
      alt: "Quản lý kho",
    },
  ],

  // Testimonials
  testimonials: {
    avatars: [
      {
        path: "images/testimonials/9d00e17f297cf8e19d4d37b8965aebaf7811f058.png",
        alt: "Mahmud Niloy 1",
      },
      {
        path: "images/testimonials/f1636e25bac66ef56895161ee57e3705824ace9c.png",
        alt: "Mahmud Niloy 2",
      },
    ],
    logo: {
      path: "images/testimonials/b183bc32020423820d400f5916d1188f10822947.svg",
      alt: "Company Logo",
    },
  },

  // CTA
  cta: {
    phone: {
      path: "images/cta/927772feb12cf7bb3461f8731b250063c9238795.png",
      alt: "Timeso Mobile App",
    },
  },
};

// ─────────────────────────────────────────────
// MAIN: Seed all homepage data
// ─────────────────────────────────────────────
async function seedHomepage() {
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║  SEED HOMEPAGE DATA (Full Automation)         ║");
  console.log("║  Copies images → public/uploads + seeds data  ║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  if (!API_TOKEN) {
    console.error("✗ STRAPI_API_TOKEN is required.");
    console.error("  Run: STRAPI_API_TOKEN=<token> npx tsx src/seed-homepage.ts");
    process.exit(1);
  }

  // Ensure uploads dir exists
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  // ── Step 1: Upload all images ──
  console.log("━━━ Step 1/3: Copying & Registering Images ━━━\n");

  // --- TrustedBy logos ---
  console.log("📂 TrustedBy logos:");
  const uploadedLogos: number[] = [];
  for (const logo of IMAGE_MANIFEST.trustedByLogos) {
    const uploaded = await uploadFile(logo.path, logo.alt);
    if (uploaded) uploadedLogos.push(uploaded.id);
  }

  // --- AllInOne images ---
  console.log("\n📂 AllInOne module images:");
  const allInOneImg1 = await uploadFile(
    IMAGE_MANIFEST.allInOne[0].path,
    IMAGE_MANIFEST.allInOne[0].alt
  );
  const allInOneImg2 = await uploadFile(
    IMAGE_MANIFEST.allInOne[1].path,
    IMAGE_MANIFEST.allInOne[1].alt
  );

  // --- AI Section ---
  console.log("\n📂 AI Section images:");
  const aiMockup = await uploadFile(
    IMAGE_MANIFEST.aiSection.mockup.path,
    IMAGE_MANIFEST.aiSection.mockup.alt
  );
  const aiIcons: (number | null)[] = [];
  for (const icon of IMAGE_MANIFEST.aiSection.icons) {
    const uploaded = await uploadFile(icon.path, icon.alt);
    aiIcons.push(uploaded?.id ?? null);
  }

  // --- TargetAudience ---
  console.log("\n📂 TargetAudience images:");
  const targetImages: (number | null)[] = [];
  for (const img of IMAGE_MANIFEST.targetAudience) {
    const uploaded = await uploadFile(img.path, img.alt);
    targetImages.push(uploaded?.id ?? null);
  }

  // --- UserStories ---
  console.log("\n📂 UserStories icons:");
  const storyIcons: (number | null)[] = [];
  for (const icon of IMAGE_MANIFEST.userStories) {
    const uploaded = await uploadFile(icon.path, icon.alt);
    storyIcons.push(uploaded?.id ?? null);
  }

  // --- Testimonials ---
  console.log("\n📂 Testimonial images:");
  const avatar1 = await uploadFile(
    IMAGE_MANIFEST.testimonials.avatars[0].path,
    IMAGE_MANIFEST.testimonials.avatars[0].alt
  );
  const avatar2 = await uploadFile(
    IMAGE_MANIFEST.testimonials.avatars[1].path,
    IMAGE_MANIFEST.testimonials.avatars[1].alt
  );
  const companyLogo = await uploadFile(
    IMAGE_MANIFEST.testimonials.logo.path,
    IMAGE_MANIFEST.testimonials.logo.alt
  );

  // --- CTA ---
  console.log("\n📂 CTA images:");
  const ctaPhone = await uploadFile(IMAGE_MANIFEST.cta.phone.path, IMAGE_MANIFEST.cta.phone.alt);

  const totalUploaded =
    uploadedLogos.length +
    (allInOneImg1 ? 1 : 0) +
    (allInOneImg2 ? 1 : 0) +
    (aiMockup ? 1 : 0) +
    aiIcons.filter(Boolean).length +
    targetImages.filter(Boolean).length +
    storyIcons.filter(Boolean).length +
    (avatar1 ? 1 : 0) +
    (avatar2 ? 1 : 0) +
    (companyLogo ? 1 : 0) +
    (ctaPhone ? 1 : 0);

  console.log(`\n✅ Total images: ${totalUploaded} uploaded & registered\n`);

  // ── Step 2: Build the trang-chu payload ──
  console.log("━━━ Step 2/3: Building Homepage Data Payload ━━━\n");

  const trangChuPayload: Record<string, unknown> = {
    // ─ SEO ─
    seo: {
      tieu_de: "Timeso - Nền tảng Quản lý Nhân sự bằng AI",
      mo_ta:
        "Timeso giúp doanh nghiệp tự động hóa HR bằng AI, từ tuyển dụng đến chấm công và quản lý hiệu suất, giảm giấy tờ để tập trung phát triển nhân tài.",
      tu_khoa: "quản lý nhân sự, chấm công, sắp ca, HR software, timeso, phần mềm nhân sự, AI HR",
    },

    // ─ Hero Section ─
    hero: {
      tieu_de: "Nền tảng quản lý nhân sự bằng",
      mo_ta:
        "Timeso giúp doanh nghiệp tự động hóa HR bằng AI, từ tuyển dụng đến chấm công và quản lý hiệu suất, giảm giấy tờ để tập trung phát triển nhân tài.",
      hien_thi_badges: true,
      app_store_url: "#",
      google_play_url: "#",
    },

    // ─ Trusted By ─
    trusted_by: {
      tieu_de: "Trusted by <b>1000+ Teams</b> across <b>100+ Countries</b>",
      logos: uploadedLogos,
    },

    // ─ Why Choose ─
    why_choose: {
      tieu_de: "Why Choose Timeso?",
      cac_ly_do: [
        { tieu_de: "Triển khai nhanh", mo_ta: "Tải về và dùng ngay!" },
        {
          tieu_de: "Đơn giản cho mọi đối tượng",
          mo_ta: "Giao diện hiện đại trực quan, thân thiện cho cả HR lẫn nhân viên.",
        },
        {
          tieu_de: "Luôn đồng hành cùng bạn",
          mo_ta: "Hỗ trợ 24/7 và onboarding miễn phí cho toàn bộ đội ngũ.",
        },
        {
          tieu_de: "Bảo mật tiêu chuẩn doanh nghiệp",
          mo_ta: "Tuân thủ ISO, mã hóa AES-256 và nhiều lớp bảo vệ dữ liệu.",
        },
      ],
    },

    // ─ All In One ─
    all_in_one: {
      tieu_de: "Mọi tính năng bạn cần",
      tieu_de_phu: "— trong một nền tảng",
      mo_ta: "Tự động hóa quy trình và tối ưu vận hành từ tuyển dụng đến quản lý nhân sự.",
      modules: [
        {
          tieu_de: "Tuyển dụng",
          mo_ta:
            "Tự động lọc CV, đánh giá ứng viên và quản lý toàn bộ quy trình tuyển dụng trên một nền tảng.",
          hinh_anh: allInOneImg1?.id ?? null,
        },
        {
          tieu_de: "Quản lý nhân sự tự động",
          mo_ta:
            "Lưu trữ hồ sơ điện tử, theo dõi hợp đồng – lương – phụ cấp và xử lý onboarding/offboarding tự động.",
          hinh_anh: allInOneImg2?.id ?? null,
        },
        {
          tieu_de: "Chấm công & Theo dõi hiệu suất",
          mo_ta:
            "Chấm công bằng AI (FaceID, GPS, Wi-Fi), phát hiện bất thường và đánh giá KPI theo thời gian thực.",
          hinh_anh: allInOneImg1?.id ?? null,
        },
        {
          tieu_de: "Tạo đơn hàng",
          mo_ta:
            "Timeso giúp cửa hàng tạo đơn nhanh chóng, thanh toán dễ dàng. Quản lý lịch hẹn, đơn hàng một cách rõ ràng.",
          hinh_anh: allInOneImg2?.id ?? null,
        },
        {
          tieu_de: "Quản lý tài sản",
          mo_ta:
            "Theo dõi thiết bị cấp phát, tình trạng sử dụng và lịch sử bàn giao theo từng nhân viên.",
          hinh_anh: allInOneImg1?.id ?? null,
        },
      ],
    },

    // ─ AI Section ─
    ai_section: {
      tieu_de: "AI giúp cửa hàng vận hành nhanh hơn và chính xác hơn",
      hinh_anh: aiMockup?.id ?? null,
      tinh_nang: [
        {
          tieu_de: "AI Tracking",
          mo_ta: "Tự động phát hiện bất thường trong giờ làm, vị trí, và sự sụt giảm hiệu suất.",
          icon: aiIcons[0] ?? null,
        },
        {
          tieu_de: "AI Matching",
          mo_ta: "Phân tích CV chuyên sâu, chấm điểm phù hợp và ưu tiên ứng viên tốt nhất.",
          icon: aiIcons[1] ?? null,
        },
        {
          tieu_de: "AI Insights",
          mo_ta: "Dự đoán năng suất, rủi ro nghỉ việc, và đề xuất tối ưu ca làm.",
          icon: aiIcons[2] ?? null,
        },
      ],
    },

    // ─ Cyan Banner ─
    cyan_banner: {
      tieu_de: "Tăng tốc quản lý với sức mạnh AI",
      tieu_de_phu: "Quản lý nhanh hơn – thông minh hơn với AI",
      thong_ke: [
        { gia_tri: "", hau_to: "", mo_ta: "Chấm công chính xác" },
        { gia_tri: "", hau_to: "", mo_ta: "Tối ưu chi phí nhân sự" },
        { gia_tri: "", hau_to: "", mo_ta: "Phân ca tự động bằng AI" },
        { gia_tri: "", hau_to: "", mo_ta: "Báo cáo hiệu suất tức thì" },
      ],
    },

    // ─ Target Audience ─
    target_audience: {
      tieu_de: "Ai Nên Tin Dùng Timeso",
      doi_tuong: [
        {
          tieu_de: "Công ty Dịch vụ/Bán lẻ",
          mo_ta: "Quản lý ca kíp, lịch làm việc phức tạp tại F&B, bán lẻ, và call center.",
          icon: targetImages[0] ?? null,
        },
        {
          tieu_de: "Nhà máy – Xưởng Sản xuất",
          mo_ta: "Chấm công chính xác và theo dõi hiệu suất làm việc của dây chuyền.",
          icon: targetImages[1] ?? null,
        },
        {
          tieu_de: "Doanh nghiệp Công nghệ/Startup",
          mo_ta: "Hệ thống quản lý nhân sự linh hoạt, dễ mở rộng khi tăng trưởng nhanh.",
          icon: targetImages[2] ?? null,
        },
        {
          tieu_de: "Chuỗi Cửa hàng & Showroom",
          mo_ta: "Quản lý đồng bộ chấm công và ca kíp cho nhân viên tại nhiều điểm bán.",
          icon: targetImages[3] ?? null,
        },
        {
          tieu_de: "Công ty Vận hành Lực lượng Lớn",
          mo_ta: "Quản lý tập trung số lượng lớn nhân viên dịch vụ/ca kíp.",
          icon: targetImages[4] ?? null,
        },
      ],
    },

    // ─ User Stories ─
    user_stories: {
      tieu_de: "User stories",
      mo_ta: "Cách các doanh nghiệp ứng dụng Timeso để tối ưu vận hành mỗi ngày.",
      stories: [
        {
          tieu_de: "Tuyển dụng",
          mo_ta:
            "AI tự động sàng lọc hồ sơ, đánh giá ứng viên và rút ngắn 70% thời gian tuyển dụng cho doanh nghiệp.",
          hinh_anh: storyIcons[0] ?? null,
          mau_nen: "#1570EF",
        },
        {
          tieu_de: "Tính lương tự động",
          mo_ta:
            "Hệ thống AI tính lương chính xác từ dữ liệu chấm công – ca làm, giảm lỗi thủ công và tăng hiệu suất vận hành.",
          hinh_anh: storyIcons[1] ?? null,
          mau_nen: "#45556C",
        },
        {
          tieu_de: "Quản lý đơn hàng",
          mo_ta:
            "AI theo dõi toàn bộ vòng đời đơn hàng, tự động cập nhật trạng thái và tối ưu hiệu suất xử lý.",
          hinh_anh: storyIcons[2] ?? null,
          mau_nen: "#2B7FFF",
        },
        {
          tieu_de: "Quản lý kho",
          mo_ta:
            "Quản lý tồn kho bằng AI, tự động cảnh báo thiếu hàng và tối ưu hiệu suất nhập – xuất mỗi ngày.",
          hinh_anh: storyIcons[3] ?? null,
          mau_nen: "#01BCBC",
        },
      ],
    },

    // ─ Comparison ─
    comparison: {
      tieu_de: "So sánh với cách làm truyền thống",
      mo_ta: "Tự động hóa quy trình và tối ưu vận hành từ tuyển dụng đến quản lý nhân sự.",
      du_lieu: [
        { feature: "Chấm công", traditional: "Dễ lỗi", timeso: "AI + FaceID + GPS" },
        { feature: "Quản lý ca kíp", traditional: "Rời rạc", timeso: "Tự động sắp ca" },
        { feature: "Hồ sơ nhân sự", traditional: "Khó tìm kiếm", timeso: "Hồ sơ điện tử 1 chạm" },
        { feature: "Tính lương", traditional: "Mất 3–5 ngày", timeso: "Tự động, chính xác" },
        { feature: "Hiệu suất", traditional: "Không đo được", timeso: "Báo cáo AI" },
        { feature: "Trợ giúp", traditional: "Chậm trễ", timeso: "AI chat 24/7" },
      ],
    },

    // ─ Pricing ─
    pricing: {
      tieu_de: 'Choose the <span class="text-[#00BAC7] italic">Right Plan!</span>',
      mo_ta:
        "Select from best plans, ensuring a perfect match. Need more or less? Customize your subscription for a seamless fit!",
      goi_gia: [
        {
          ten_goi: "Free",
          gia: "$0",
          don_vi: "/per month",
          mo_ta: "Great for trying out Frames X component and templates.",
          nut_text: "Get Started",
          noi_bat: false,
          tinh_nang: [
            "Design Guidelines",
            "10 Web Components",
            "5 Web Templates",
            "Component Properties",
            "Advanced Security",
          ],
        },
        {
          ten_goi: "Professional",
          gia: "$97",
          don_vi: "/per month",
          mo_ta: "Best for professional freelancers and small teams.",
          nut_text: "Get Started",
          noi_bat: true,
          tinh_nang: [
            "Everything in Free",
            "20 Web Components",
            "15 Web Templates",
            "Variants & Properties",
            "Enhanced Security",
          ],
        },
        {
          ten_goi: "Enterprise",
          gia: "$257",
          don_vi: "/per month",
          mo_ta: "Best for growing large company or enterprise design team.",
          nut_text: "Book a call",
          noi_bat: false,
          tinh_nang: [
            "Design System Foundation",
            "50 Web Components",
            "25 Web Templates",
            "Variants & Properties",
            "Priority Security",
          ],
        },
      ],
    },

    // ─ Testimonials ─
    testimonials: {
      tieu_de: "Khách hàng nói gì về chúng tôi?",
      danh_gia: [
        {
          noi_dung:
            "Giao diện người dùng rất trực quan, giúp việc thực hiện công việc trở nên dễ dàng. Dù là mua bán hay quản lý danh mục tài sản số đa dạng của tôi, mọi thứ đều thuận tiện.",
          ten: "Mahmud Niloy",
          chuc_vu: "Super Admin",
          so_sao: 5,
          avatar: avatar1?.id ?? null,
          logo_cong_ty: companyLogo?.id ?? null,
        },
        {
          noi_dung:
            "Tôi là một Freelancer, và việc quản lý thu nhập từ nhiều nền tảng số khác nhau từng là một rắc rối lớn. Mọi thứ thay đổi cho đến khi tôi khám phá ra Block/Timeso.",
          ten: "Mahmud Niloy",
          chuc_vu: "Super Web Designer",
          so_sao: 5,
          avatar: avatar2?.id ?? null,
          logo_cong_ty: companyLogo?.id ?? null,
        },
        {
          noi_dung:
            "Giao diện người dùng rất trực quan, giúp việc thực hiện công việc trở nên dễ dàng. Dù là mua bán hay quản lý danh mục tài sản số đa dạng của tôi, mọi thứ đều thuận tiện.",
          ten: "Mahmud Niloy",
          chuc_vu: "Super Admin",
          so_sao: 5,
          avatar: avatar1?.id ?? null,
          logo_cong_ty: companyLogo?.id ?? null,
        },
        {
          noi_dung:
            "Tôi là một Freelancer, và việc quản lý thu nhập từ nhiều nền tảng số khác nhau từng là một rắc rối lớn. Mọi thứ thay đổi cho đến khi tôi khám phá ra Block/Timeso.",
          ten: "Mahmud Niloy",
          chuc_vu: "Super Web Designer",
          so_sao: 5,
          avatar: avatar2?.id ?? null,
          logo_cong_ty: companyLogo?.id ?? null,
        },
      ],
    },

    // ─ CTA ─
    cta: {
      tieu_de: "TRẢI NGHIỆM NGAY",
      mo_ta:
        "Dễ dàng theo dõi và tối ưu hiệu suất làm việc của bạn mọi lúc, mọi nơi với bản dùng thử miễn phí.",
      hinh_anh: ctaPhone?.id ?? null,
      app_store_url: "#",
      google_play_url: "#",
    },
  };

  // ── Step 3: Update trang-chu single type ──
  console.log("━━━ Step 3/3: Updating trang-chu Single Type ━━━\n");

  const success = await updateSingleType("trang-chu", trangChuPayload);

  if (success) {
    console.log("\n╔═══════════════════════════════════════════════╗");
    console.log("║  ✅ Homepage data seeded successfully!         ║");
    console.log("║                                               ║");
    console.log("║  Images: copied to public/uploads/ ✓          ║");
    console.log("║  trang-chu: all 12 sections populated ✓       ║");
    console.log("╚═══════════════════════════════════════════════╝\n");
  } else {
    console.error("\n✗ Failed to seed homepage data");
    process.exit(1);
  }
}

seedHomepage().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
