/**
 * Seed Recruitment Page (Tuyển Dụng) Data into Strapi
 *
 * Usage:
 *   STRAPI_API_TOKEN=<your-token> npx tsx src/seed-recruitment.ts
 */

import * as fs from "fs";
import * as path from "path";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN || "";
const FRONTEND_PUBLIC = path.resolve(__dirname, "../../public");
const UPLOADS_DIR = path.resolve(__dirname, "../public/uploads");

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
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  console.log(`  📁 Copied: ${relativePath}`);

  const fileBuffer = fs.readFileSync(srcPath);
  const formData = new FormData();
  formData.append("files", new Blob([fileBuffer]), fileName);
  if (altText) {
    formData.append("fileInfo", JSON.stringify({ alternativeText: altText, caption: altText }));
  }
  try {
    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      body: formData,
    });
    if (!res.ok) {
      console.error(`  ✗ Upload failed: ${await res.text()}`);
      return null;
    }
    const result = await res.json();
    const file = Array.isArray(result) ? result[0] : result;
    console.log(`  ✓ Registered: ${fileName} (id: ${file.id})`);
    return { id: file.id, url: file.url };
  } catch (e) {
    console.error(`  ✗ Error:`, e);
    return null;
  }
}

async function updateSingleType(apiSlug: string, data: Record<string, unknown>) {
  const res = await fetch(`${STRAPI_URL}/api/${apiSlug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_TOKEN}` },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    console.error(`✗ Failed: ${apiSlug}:`, await res.text());
    return;
  }
  console.log(`✓ Updated: ${apiSlug}`);
}

async function main() {
  if (!API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN required.");
    process.exit(1);
  }

  console.log("\n╔═══════════════════════════════════════════════╗");
  console.log("║  Seeding Recruitment Page (Tuyển Dụng)        ║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  // ── Upload images ──
  console.log("━━━ Uploading Images ━━━\n");

  const dashboardImg = await uploadFile(
    "images/recruitment/85b42fc8e141b80565f28cff8ba1d70ac8e47064.png",
    "Dashboard"
  );
  const challengeImg = await uploadFile(
    "images/recruitment/e2944d07e911aa0580feeda675a549795c0a1050.png",
    "Challenges"
  );
  const ctaImg = await uploadFile(
    "images/recruitment/0fde196edc3946aa5fa9569f9c8de980a700b345.png",
    "CTA"
  );

  // Solution images
  const solImgs = [];
  const solPaths = [
    "images/recruitment/63f9c370d89f6ecb68865811f101ebbc846a18ee.png",
    "images/recruitment/897695a710a8051c0701021981372d346a8fbdeb.png",
    "images/recruitment/050e03a0a2974b760dfd0a4a69db80f85e288205.png",
    "images/recruitment/4df5e2403700710633eda3ae95d759e0d4a6a3a2.png",
    "images/recruitment/7ba69e17447d538fd39a723b8cab2ad13056eb31.png",
    "images/recruitment/203f29c8b05dd366c331565d4460cb115df17c18.png",
  ];
  for (const p of solPaths) {
    solImgs.push(await uploadFile(p, "Solution"));
  }

  // Why Choose icons (SVGs)
  const whyIcons = [];
  const whyPaths = [
    "images/recruitment/bdd84670688d8fcad11fa3c0afc58b9eb83ef0da.svg",
    "images/recruitment/0ddeff3440393d0b8a0d19fa4138aabbc5ff222e.svg",
    "images/recruitment/b88f98ffab648935ccc0acfe4752efd0d5d23db3.svg",
  ];
  for (const p of whyPaths) {
    whyIcons.push(await uploadFile(p, "Why Choose icon"));
  }

  // DaLinhVuc images (reuse from feature pages)
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
  const dlvImgs: number[] = [];
  for (const p of dlvPaths) {
    const img = await uploadFile(p, "DaLinhVuc");
    if (img) dlvImgs.push(img.id);
  }

  // ── Seed data ──
  console.log("\n━━━ Seeding Recruitment Page ━━━\n");

  await updateSingleType("tuyen-dung", {
    seo: {
      tieu_de: "Tuyển Dụng - Timeso",
      mo_ta:
        "Tự động hóa tuyển dụng từ lọc hồ sơ đến phỏng vấn. Giúp doanh nghiệp thu hút và tuyển chọn nhân tài nhanh chóng.",
    },
    hero: {
      tieu_de: "Timeso - Giải Pháp Chấm Dứt Nỗi Lo Tuyển Dụng",
      mo_ta:
        "Tự động hóa tuyển dụng từ lọc hồ sơ đến phỏng vấn, Giúp doanh nghiệp thu hút và tuyển chọn nhân tài nhanh chóng – hiệu quả với công nghệ AI phỏng vấn và đánh giá ứng viên. Timeso giúp các đối tác kinh doanh tự động, giống như một nền tảng HR bạn cần.",
      app_store_url: "#",
      google_play_url: "#",
    },
    dich_vu: {
      tieu_de_phu: "Dịch vụ",
      tieu_de: "DỊCH VỤ TIMESO CUNG CẤP",
      mo_ta:
        "Timeso giúp bạn tự động hóa toàn bộ quy trình tuyển dụng, tối ưu thời gian – giảm chi phí – nâng cao chất lượng ứng viên, từ đó xây dựng đội ngũ nhân sự mạnh mẽ hơn.",
      hinh_anh: dashboardImg?.id ?? null,
      dich_vu: [
        {
          tieu_de: "Tự động hoá quy trình tuyển dụng",
          mo_ta: "Giảm tài quy trình rườm rà nhiều công đoạn, giảm chi phí tuyển dụng tối đa",
        },
        {
          tieu_de: "Phỏng vấn trực tiếp qua video trực tiếp trên app",
          mo_ta: "Tiết kiệm thời gian và tăng hiệu quả đánh giá ứng viên.",
        },
        {
          tieu_de: "Lọc hồ sơ nhanh chóng",
          mo_ta: "Dễ dàng tìm kiếm & đề xuất ứng viên phù hợp nhất.",
        },
        {
          tieu_de: "Dễ theo dõi ứng viên",
          mo_ta: "Quản lý thông tin ứng viên đầy đủ và hiệu quả hơn.",
        },
        {
          tieu_de: "Tối ưu hoá quy trình tuyển dụng",
          mo_ta: "Đảm bảo quy trình tuyển dụng diễn ra dễ dàng và công bằng.",
        },
        {
          tieu_de: "Quản lý đội ngũ nhân sự",
          mo_ta: "Hỗ trợ xây dựng đội ngũ mạnh mẽ từ nền tảng tuyển dụng.",
        },
      ],
    },
    da_linh_vuc: {
      tieu_de_phu: "Phát triển ứng dụng",
      tieu_de: "ĐA LĨNH VỰC",
      thong_ke: [
        { gia_tri: "12", hau_to: "", mo_ta: "Ngành nghề áp dụng từ bán lẻ, F&B đến sản xuất" },
        { gia_tri: "30", hau_to: "%", mo_ta: "Tăng hiệu suất vận hành HR trung bình" },
        { gia_tri: "5000", hau_to: "+", mo_ta: "Nhân viên được quản lý và chấm công bằng AI" },
      ],
      hinh_anh: dlvImgs,
    },
    thach_thuc: {
      tieu_de: "Tại sao tuyển dụng luôn khó khăn?",
      hinh_anh: challengeImg?.id ?? null,
      thach_thuc: [
        { tieu_de: "Lọc CV thủ công", mo_ta: "Xem hồ sơ từng cái, tốn thời gian và dễ sót." },
        {
          tieu_de: "Ứng viên ảo quá nhiều",
          mo_ta: "Nộp CV nhưng không phản hồi, không đến phỏng vấn.",
        },
        { tieu_de: "Phản hồi chậm", mo_ta: "Mất cơ hội giữ người." },
        { tieu_de: "Ứng viên bỏ phỏng vấn", mo_ta: "Thiếu tương tác, quên lịch và dễ bỏ cuộc." },
        { tieu_de: "Vòng phỏng vấn thiếu thống nhất", mo_ta: "Khó tìm đúng người." },
        {
          tieu_de: "Tuyển dụng tốn thời gian",
          mo_ta: "Quy trình nhiều bước, thiếu công cụ tự động hỗ trợ.",
        },
      ],
    },
    giai_phap: {
      tieu_de_phu: "Giải pháp",
      tieu_de: "Giải Pháp Tuyển Dụng Tối Ưu Từ Timeso",
      mo_ta:
        "Timeso tự động hóa toàn bộ quy trình tuyển dụng — từ đăng tin, lọc hồ sơ đến phỏng vấn video — giúp doanh nghiệp tiết kiệm thời gian, chi phí và tuyển đúng người nhanh hơn.",
      giai_phap: [
        {
          tieu_de: "Tự động hóa quy trình tuyển dụng",
          mo_ta: "Đăng tin, lọc và theo dõi ứng viên hoàn toàn tự động, giảm việc thủ công cho HR.",
          icon: solImgs[0]?.id ?? null,
        },
        {
          tieu_de: "Phỏng vấn trực tiếp trong app",
          mo_ta:
            "Phỏng vấn từ xa ngay trong ứng dụng, đánh giá ứng viên hiệu quả mà không cần gặp trực tiếp.",
          icon: solImgs[1]?.id ?? null,
        },
        {
          tieu_de: "AI lọc hồ sơ và đề xuất thông minh",
          mo_ta: "Tự động phân loại và ưu tiên hồ sơ giúp tìm đúng ứng viên phù hợp nhanh hơn.",
          icon: solImgs[2]?.id ?? null,
        },
        {
          tieu_de: "Quy trình hiện đại đơn giản",
          mo_ta:
            "Mọi bước tuyển dụng được chuẩn hóa và tự động hóa, giảm sai sót và tăng minh bạch.",
          icon: solImgs[3]?.id ?? null,
        },
        {
          tieu_de: "Theo dõi ứng viên dễ dàng",
          mo_ta: "Cập nhật tiến độ, ghi chú và trạng thái ứng viên trên một hệ thống thống nhất.",
          icon: solImgs[4]?.id ?? null,
        },
        {
          tieu_de: "Xây dựng đội ngũ mạnh mẽ",
          mo_ta:
            "Kết nối tuyển dụng – chấm công – hiệu suất để phát triển đội ngũ ổn định, hiệu quả.",
          icon: solImgs[5]?.id ?? null,
        },
      ],
    },
    why_choose: {
      tieu_de: "Lý do nên chọn timeso?",
      cac_ly_do: [
        {
          tieu_de: "Tiết kiệm thời gian",
          mo_ta: "Giảm 70% thời gian\nlọc hồ sơ và phỏng vấn.",
          icon: whyIcons[0]?.id ?? null,
        },
        {
          tieu_de: "Tiết kiệm chi phí",
          mo_ta: "Cắt giảm chi phí đăng tin\nvà nhân sự tuyển dụng.",
          icon: whyIcons[1]?.id ?? null,
        },
        {
          tieu_de: "Dễ dùng, giao diện hiện đại",
          mo_ta:
            "Giao diện trực quan giúp chủ doanh nghiệp\nvà nhân viên quản lý thao tác dễ dàng,\nkhông cần kiến thức công nghệ nhưng\nvẫn đạt hiệu quả cao.",
          icon: whyIcons[2]?.id ?? null,
        },
      ],
    },
    cta: {
      tieu_de: "TẢI MIỄN PHÍ NGAY",
      mo_ta: "Trải nghiệm giải pháp tuyển dụng 4.0 từ Timeso",
      hinh_anh: ctaImg?.id ?? null,
      mau_nen: "#E6FEFF",
      app_store_url: "#",
      google_play_url: "#",
    },
  });

  console.log("\n✅ Recruitment page seeded successfully!");
}

main().catch(console.error);
