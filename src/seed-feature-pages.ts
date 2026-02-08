/**
 * Seed Feature Pages Data into Strapi (5 pages)
 *
 * Pages: quan-ly-nhan-su, cham-cong, sap-ca-thong-minh, quan-ly-don-hang, quan-ly-tai-san
 *
 * Usage:
 *   STRAPI_API_TOKEN=<your-token> npx tsx src/seed-feature-pages.ts
 */

import * as fs from "fs";
import * as path from "path";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN || "";
const FRONTEND_PUBLIC = path.resolve(__dirname, "../public");
const UPLOADS_DIR = path.resolve(__dirname, "../public/uploads");

// ── Helper: Copy file to uploads + register via API ──
async function uploadFile(
  relativePath: string,
  altText?: string
): Promise<{ id: number; url: string } | null> {
  const srcPath = path.resolve(FRONTEND_PUBLIC, relativePath.replace(/^\//, ""));

  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠ File not found: ${srcPath}`);
    return null;
  }

  const fileName = path.basename(srcPath);
  const destPath = path.join(UPLOADS_DIR, fileName);

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  fs.copyFileSync(srcPath, destPath);
  console.log(`  📁 Copied: ${relativePath} → public/uploads/${fileName}`);

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

// ── Helper: Update single type via REST API ──
async function updateSingleType(apiSlug: string, data: Record<string, unknown>) {
  const url = `${STRAPI_URL}/api/${apiSlug}`;
  const body = JSON.stringify({ data });

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body,
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`✗ Failed to update ${apiSlug}:`, err);
    return;
  }

  console.log(`✓ Updated: ${apiSlug}`);
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════
async function main() {
  if (!API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN is required.");
    process.exit(1);
  }

  console.log("\n╔═══════════════════════════════════════════════╗");
  console.log("║  Seeding Feature Pages Data into Strapi       ║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  // ── Step 1: Upload shared images ──
  console.log("━━━ Step 1: Uploading Images ━━━\n");

  // Hero images for each page
  console.log("📂 Hero images:");
  const hrHeroImg = await uploadFile(
    "figma_assets/e5cdb3bf6163b94e35b1793feba180e15ba1ccd0.png",
    "Quản lý nhân sự hero"
  );
  const attendanceHeroImg = await uploadFile(
    "figma_assets/e8c319bd8f21d8adccc55871dd5f19444f498af7.png",
    "Chấm công hero"
  );
  const attendanceFeature1Img = await uploadFile(
    "figma_assets/921e6cc61bedd673112e65a4e2276974bbfea3aa.png",
    "Chấm công feature 1"
  );
  const attendanceFeature2Img = await uploadFile(
    "figma_assets/96e33c5f95eab3e4b2fb914ad8d4898e0f0e3297.png",
    "Chấm công feature 2"
  );
  const schedulingHeroImg = await uploadFile(
    "figma_assets/3d4deb506f9fd18b409cb0aafaf717ea62928e41.png",
    "Sắp ca hero"
  );
  const orderHeroImg = await uploadFile(
    "figma_assets/f39d24ee2279b11358426c47a3f20d748d9bfa5a.png",
    "Đơn hàng hero"
  );
  const assetHeroImg = await uploadFile(
    "figma_assets/9c2595df78e94d7405bb4b531ceb329dbb04e509.png",
    "Tài sản hero"
  );

  // CTA image (shared)
  console.log("\n📂 CTA images:");
  const ctaImage = await uploadFile(
    "images/recruitment/0fde196edc3946aa5fa9569f9c8de980a700b345.png",
    "CTA image"
  );

  // DaLinhVuc images
  console.log("\n📂 DaLinhVuc images:");
  const daLinhVucImages = [];
  const dlvPaths = [
    "images/recruitment/c29b80739a21e6e6f8454883c205bbe7ec0bece7.png",
    "images/recruitment/302e714f58fb2257078dca46e95644f6aba9f063.png",
    "images/recruitment/cba621839bc1ea790ec7c154187f1ea99c30bcaf.png",
    "images/recruitment/092303d6b5d08b91913494a824974d41576925b6.png",
    "images/recruitment/59aa5e0633c5fca8d22df2512de0f75309adbc61.png",
    "images/recruitment/66056b79e40cf5f1996db88693618e15b5821922.png",
    "images/recruitment/4209405a7a0ff7ca7d106c8406eb08ad095ed876.png",
    "images/recruitment/4c59d259432e0ebbba2d36665b07b30807b01fed.png",
    "images/recruitment/ee7c6dcf45a3ab37da88ff4c8e46e7253921d18c.png",
  ];

  for (const p of dlvPaths) {
    const img = await uploadFile(p, "DaLinhVuc");
    if (img) daLinhVucImages.push(img.id);
  }

  // WhyChoose background images
  console.log("\n📂 WhyChoose background images:");
  const schedulingWhyBg = await uploadFile(
    "figma_assets/928c2c2cdc67a507253902630c28d4919917d32c.png",
    "Scheduling why choose bg"
  );
  const assetWhyBg = await uploadFile(
    "figma_assets/68937d368169e6dd5d1307e63a2509097b9d3014.png",
    "Asset why choose bg"
  );

  const totalImages =
    [
      hrHeroImg,
      attendanceHeroImg,
      attendanceFeature1Img,
      attendanceFeature2Img,
      schedulingHeroImg,
      orderHeroImg,
      assetHeroImg,
      ctaImage,
      schedulingWhyBg,
      assetWhyBg,
    ].filter(Boolean).length + daLinhVucImages.length;

  console.log(`\n✅ Total images: ${totalImages} uploaded & registered\n`);

  // ── Common sections ──
  const sharedDaLinhVuc = {
    tieu_de_phu: "Phát triển ứng dụng",
    tieu_de: "ĐA LĨNH VỰC",
    thong_ke: [
      { gia_tri: "12", hau_to: "", mo_ta: "Ngành nghề áp dụng từ bán lẻ, F&B đến sản xuất" },
      { gia_tri: "30", hau_to: "%", mo_ta: "Tăng hiệu suất vận hành HR trung bình" },
      { gia_tri: "5000", hau_to: "+", mo_ta: "Nhân viên được quản lý và chấm công bằng AI" },
    ],
    hinh_anh: daLinhVucImages,
  };

  const sharedCta = (title: string, subtitle: string) => ({
    tieu_de: title,
    mo_ta: subtitle,
    hinh_anh: ctaImage?.id ?? null,
    mau_nen: "#E6FEFF",
    app_store_url: "#",
    google_play_url: "#",
  });

  // ═══════════════════════════════════════════════
  // Step 2: Seed each page
  // ═══════════════════════════════════════════════
  console.log("━━━ Step 2: Seeding Page Data ━━━\n");

  // ── 1. Quản lý nhân sự ──
  console.log("📄 Seeding: quan-ly-nhan-su");
  await updateSingleType("quan-ly-nhan-su", {
    seo: {
      tieu_de: "Quản Lý Nhân Sự - Timeso",
      mo_ta:
        "Giải pháp quản lý nhân sự toàn diện: hồ sơ nhân viên, phân quyền, đánh giá hiệu suất và báo cáo thông minh.",
    },
    hero: {
      tieu_de: "Quản lý nhân sự thông minh với AI Timeso",
      mo_ta:
        "Timeso ứng dụng AI để tự động xử lý quy trình nhân sự, từ ca làm, theo dõi hiệu suất đến tính lương. Mọi thao tác đều được tính giản để cửa hàng vận hành mượt mà và hiện đại.",
      app_store_url: "#",
      google_play_url: "#",
    },
    tinh_nang: [
      {
        tieu_de: "Tính lương tự động và chính xác",
        danh_sach: [
          "Tự động tính lương từ dữ liệu chấm công thực tế, AI phát hiện gian lận và chấm công bất thường, giảm sai sót và đảm bảo công bằng.",
        ],
      },
      {
        tieu_de: "Theo Dõi & Dự Báo Nhân Sự",
        danh_sach: [
          "Phân tích dữ liệu nhân sự, dự báo nhu cầu nhân viên theo từng thời điểm và cảnh báo bất thường để nhà quản lý chủ động xử lý.",
        ],
      },
      {
        tieu_de: "AI Quản Lý Nhân Sự",
        danh_sach: [
          "Theo dõi hiệu suất, giờ làm và báo cáo ngay trên một nền tảng, giúp cửa hàng tối ưu quy trình và nâng cao năng suất.",
        ],
      },
    ],
    da_linh_vuc: sharedDaLinhVuc,
    why_choose: {
      tieu_de: "Lý do nên chọn Timeso?",
      cac_ly_do: [
        { tieu_de: "Giải pháp quản lý toàn diện, tiết kiệm thời gian" },
        { tieu_de: "Tính năng vượt trội, giúp tối ưu hóa mọi quy trình" },
        { tieu_de: "AI đề xuất & quản lý nhân viên thông minh" },
        { tieu_de: "Đảm bảo sự phát triển bền vững" },
      ],
    },
    cta: sharedCta("TẢI MIỄN PHÍ NGAY", "Trải nghiệm giải pháp quản lý nhân sự 4.0 từ Timeso"),
  });

  // ── 2. Chấm công ──
  console.log("📄 Seeding: cham-cong");
  await updateSingleType("cham-cong", {
    seo: {
      tieu_de: "Chấm Công - Timeso",
      mo_ta:
        "Hệ thống chấm công tự động bằng QR & GPS. Theo dõi giờ làm, hiệu suất nhân viên theo thời gian thực.",
    },
    hero: {
      tieu_de: "Chấm Công & AI Theo Dõi Hiệu Suất",
      mo_ta:
        "Hệ thống Timeso theo dõi giờ làm, công suất và hiệu suất liên tục của từng nhân viên theo thời gian thực, giúp bạn nhanh chóng nắm bắt biến động, tối ưu quy trình và giảm thiểu sai sót trong quản lý.",
      app_store_url: "#",
      google_play_url: "#",
    },
    tinh_nang: [
      {
        tieu_de: "Chấm công tự động bằng QR & GPS",
        danh_sach: [
          "Ghi nhận giờ làm chính xác tại đúng vị trí, hạn chế gian lận và tránh chấm công hộ.",
          "Dữ liệu được đồng bộ theo thời gian thực, giúp quản lý nắm bắt tình trạng nhân sự mọi lúc.",
        ],
        mau_nen: "#b7ffff",
        hinh_anh: attendanceFeature1Img?.id ?? null,
      },
      {
        tieu_de: "Giảm sai sót – Tăng minh bạch – Theo dõi hiệu suất theo thời gian thực",
        danh_sach: [
          "Tự động tổng hợp giờ làm, ca làm và hiệu suất của từng nhân viên trên một hệ thống duy nhất.",
          "Mọi thay đổi được cập nhật tức thì, đảm bảo quy trình vận hành nhanh chóng và chính xác.",
        ],
        mau_nen: "#f5f5f5",
        hinh_anh: attendanceFeature2Img?.id ?? null,
      },
    ],
    da_linh_vuc: sharedDaLinhVuc,
    why_choose: {
      tieu_de: "Lý do nên chọn Timeso?",
      cac_ly_do: [
        { tieu_de: "Giải Pháp Quản Lý Nhân Sự Toàn Diện" },
        { tieu_de: "Tự Động Hóa Quy Trình Tuyển Dụng" },
        { tieu_de: "Quản Lý Ca Làm Thông Minh" },
        { tieu_de: "Tính Lương Chính Xác & Minh Bạch" },
      ],
    },
    cta: sharedCta("TẢI MIỄN PHÍ NGAY", "Mọi lúc mọi nơi – chấm công dễ dàng."),
  });

  // ── 3. Sắp ca thông minh ──
  console.log("📄 Seeding: sap-ca-thong-minh");
  await updateSingleType("sap-ca-thong-minh", {
    seo: {
      tieu_de: "Sắp Ca Thông Minh - Timeso",
      mo_ta:
        "AI tối ưu lịch làm việc theo nhu cầu thực tế: giảm thiếu người, hạn chế trùng ca và tiết kiệm đến 60% thời gian sắp ca thủ công.",
    },
    hero: {
      tieu_de: "Tự động hóa phân ca — Vận hành mượt hơn mỗi ngày",
      mo_ta:
        "AI tối ưu lịch làm việc theo nhu cầu thực tế: giảm thiếu người, hạn chế trùng ca và tiết kiệm đến 60% thời gian sắp ca thủ công.",
      app_store_url: "#",
      google_play_url: "#",
    },
    tinh_nang: [],
    da_linh_vuc: sharedDaLinhVuc,
    why_choose: {
      tieu_de: "Lý do nên chọn Timeso?",
      hinh_nen: schedulingWhyBg?.id ?? null,
      cac_ly_do: [
        { tieu_de: "Giảm 50–60% thời gian phân ca lỗi trùng ca, thiếu ca" },
        { tieu_de: "Tối ưu chi phí nhân sự theo giờ cao điểm" },
        { tieu_de: "Tăng sự chủ động của nhân viên" },
        { tieu_de: "Minh bạch dữ liệu – dễ dàng đối soát" },
      ],
    },
    cta: sharedCta("TẢI MIỄN PHÍ NGAY", "Quản lý ca làm thông minh – mọi lúc mọi nơi."),
  });

  // ── 4. Quản lý đơn hàng ──
  console.log("📄 Seeding: quan-ly-don-hang");
  await updateSingleType("quan-ly-don-hang", {
    seo: {
      tieu_de: "Quản Lý Đơn Hàng - Timeso",
      mo_ta:
        "Timeso giúp cửa hàng tạo và quản lý đơn hàng nhanh chóng, theo dõi đơn rõ ràng, tránh nhầm lẫn và phục vụ đúng thời gian.",
    },
    hero: {
      tieu_de: "Quản Lý Đơn Hàng",
      mo_ta:
        "Timeso giúp cửa hàng tạo và quản lý đơn hàng nhanh chóng. Khi khách đến, nhân viên chỉ cần bấm tạo đơn và đặt lịch phục vụ cho khách ngay trên hệ thống, giúp theo dõi đơn rõ ràng, tránh nhầm lẫn và phục vụ đúng thời gian.",
      app_store_url: "#",
      google_play_url: "#",
    },
    tinh_nang: [],
    da_linh_vuc: sharedDaLinhVuc,
    cta: sharedCta("Start your free trial", "Personal performance tracking made easy."),
  });

  // ── 5. Quản lý tài sản ──
  console.log("📄 Seeding: quan-ly-tai-san");
  await updateSingleType("quan-ly-tai-san", {
    seo: {
      tieu_de: "Quản Lý Tài Sản - Timeso",
      mo_ta:
        "Timeso giúp bạn theo dõi tài sản, thiết bị và kho hàng một cách rõ ràng và chính xác.",
    },
    hero: {
      tieu_de: "Quản Lý Tài Sản Thông Minh & Chính Xác",
      mo_ta:
        "Timeso giúp bạn theo dõi tài sản, thiết bị và kho hàng một cách rõ ràng và chính xác. Mọi thay đổi đều được cập nhật theo thời gian thực, giúp giảm thất thoát và tối ưu chi phí vận hành.",
      app_store_url: "#",
      google_play_url: "#",
    },
    tinh_nang: [],
    da_linh_vuc: sharedDaLinhVuc,
    why_choose: {
      tieu_de: "Lý do nên chọn Timeso?",
      hinh_nen: assetWhyBg?.id ?? null,
      cac_ly_do: [
        { tieu_de: "Giải pháp quản lý toàn diện, tiết kiệm thời gian" },
        { tieu_de: "Tính năng vượt trội, giúp tối ưu hóa mọi quy trình" },
        { tieu_de: "Tối ưu hóa hiệu suất nhân viên" },
        { tieu_de: "Đảm bảo sự phát triển bền vững" },
      ],
    },
    cta: sharedCta("TẢI MIỄN PHÍ NGAY", "Quản lý tài sản & kho thông minh – mọi lúc mọi nơi."),
  });

  console.log("\n╔═══════════════════════════════════════════════╗");
  console.log("║  ✅ Feature pages seeded successfully!         ║");
  console.log("║                                               ║");
  console.log("║  Pages: 5 single types populated ✓            ║");
  console.log("╚═══════════════════════════════════════════════╝");
}

main().catch(console.error);
