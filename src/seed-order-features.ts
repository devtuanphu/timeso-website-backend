/**
 * Seed Order Management Features (tinh_nang) into Strapi
 *
 * Usage:
 *   STRAPI_API_TOKEN=<your-token> npx tsx src/seed-order-features.ts
 */

import * as fs from "fs";
import * as path from "path";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN || "";
const FRONTEND_PUBLIC = path.resolve(__dirname, "../public");
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
    console.log(`  ✓ Uploaded: ${fileName} (id: ${file.id})`);
    return { id: file.id, url: file.url };
  } catch (e) {
    console.error(`  ✗ Error:`, e);
    return null;
  }
}

async function main() {
  if (!API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN required.");
    process.exit(1);
  }

  console.log("\n━━━ Seeding Order Management Features ━━━\n");

  // Upload feature images
  const img1 = await uploadFile(
    "figma_assets/22e4c682258f224f70841b23f4805d4f91d23c3a.png",
    "Theo dõi đơn hàng"
  );
  const img2 = await uploadFile(
    "figma_assets/927772feb12cf7bb3461f8731b250063c9238795.png",
    "Đồng bộ nhân viên"
  );
  const img3 = await uploadFile(
    "figma_assets/2fb5e002bbde20b8fcf8bb51fa906026401747e4.png",
    "Cửa hàng nhỏ"
  );

  // First, GET existing data to preserve other fields
  const getRes = await fetch(`${STRAPI_URL}/api/quan-ly-don-hang?pLevel=5`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  const existing = await getRes.json();
  console.log("  ✓ Fetched existing data");

  // Build tinh_nang array
  const tinh_nang = [
    {
      tieu_de: "Theo dõi đơn hàng rõ ràng",
      danh_sach: [
        "Tổng quan của tiến trình đơn, trạng thái hàng đang xử lý trong, thực hiện xong, đơn hàng đã chuẩn bị xong, đơn hàng hoàn tất.",
        "Cửa hàng dễ dàng xem được công điểm và tiến độ xử lý từng khách hàng.",
      ],
      hinh_anh: img1?.id ?? null,
    },
    {
      tieu_de: "Đồng bộ với nhân viên & lịch làm việc",
      danh_sach: [
        "Mỗi đơn gắn rõ người phụ trách.",
        "Tối ưu hóa thời gian phục vụ nhân viên.",
        "Phân bố công việc hợp lý trong ngày.",
      ],
      hinh_anh: img2?.id ?? null,
    },
    {
      tieu_de: "Phù hợp cho cửa hàng nhỏ",
      danh_sach: [
        "Tạo đơn nhanh chóng, dễ dùng, phù hợp cho một đội ngũ nhỏ.",
        "Phù hợp cho một người, một doanh nghiệp.",
        "Phù hợp với Timeso mà không cần thao tác phức tạp.",
      ],
      hinh_anh: img3?.id ?? null,
    },
  ];

  // Update only tinh_nang
  const updateRes = await fetch(`${STRAPI_URL}/api/quan-ly-don-hang`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data: { tinh_nang } }),
  });

  if (!updateRes.ok) {
    console.error("✗ Failed:", await updateRes.text());
    return;
  }

  console.log("\n✅ Order Management features seeded successfully!");
}

main().catch(console.error);
