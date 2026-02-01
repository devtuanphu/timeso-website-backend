/**
 * Comprehensive Strapi Seed Script - Main Runner
 * Run with: npm run seed
 */

import { createStrapi } from "@strapi/strapi";
import {
  doiTacData,
  thanhVienData,
  khachHangData,
  baiVietData,
  caseStudyData,
  trangChuData,
} from "./seed-data-part1";
import {
  chamCongData,
  sapCaThongMinhData,
  quanLyNhanSuData,
  quanLyDonHangData,
  quanLyTaiSanData,
  veChungToiData,
  tuyenDungData,
  lienHeData,
} from "./seed-data-part2";

async function seed() {
  console.log("🌱 Starting Comprehensive Strapi Seed...\n");

  const app = await createStrapi({ distDir: "./dist" }).load();
  const docs = app.documents;

  // =====================================
  // DELETE EXISTING DATA FIRST
  // =====================================
  console.log("🗑️  Clearing existing data...");

  // Clear collection types
  const doiTacs = await docs("api::doi-tac.doi-tac").findMany({});
  for (const item of doiTacs) {
    await docs("api::doi-tac.doi-tac").delete({ documentId: item.documentId });
  }

  const thanhViens = await docs("api::thanh-vien.thanh-vien").findMany({});
  for (const item of thanhViens) {
    await docs("api::thanh-vien.thanh-vien").delete({ documentId: item.documentId });
  }

  const khachHangs = await docs("api::khach-hang.khach-hang").findMany({});
  for (const item of khachHangs) {
    await docs("api::khach-hang.khach-hang").delete({ documentId: item.documentId });
  }

  const baiViets = await docs("api::bai-viet.bai-viet").findMany({});
  for (const item of baiViets) {
    await docs("api::bai-viet.bai-viet").delete({ documentId: item.documentId });
  }

  const caseStudies = await docs("api::case-study.case-study").findMany({});
  for (const item of caseStudies) {
    await docs("api::case-study.case-study").delete({ documentId: item.documentId });
  }

  // Clear single types
  const singleTypes = [
    "api::trang-chu.trang-chu",
    "api::cham-cong.cham-cong",
    "api::sap-ca-thong-minh.sap-ca-thong-minh",
    "api::quan-ly-nhan-su.quan-ly-nhan-su",
    "api::quan-ly-don-hang.quan-ly-don-hang",
    "api::quan-ly-tai-san.quan-ly-tai-san",
    "api::ve-chung-toi.ve-chung-toi",
    "api::tuyen-dung.tuyen-dung",
    "api::lien-he.lien-he",
  ];

  for (const uid of singleTypes) {
    try {
      const existing = await docs(uid as any).findFirst({});
      if (existing?.documentId) {
        await docs(uid as any).delete({ documentId: existing.documentId });
      }
    } catch {
      // ignore if not found
    }
  }

  console.log("✓ Existing data cleared\n");

  // =====================================
  // COLLECTION TYPES
  // =====================================
  console.log("📦 Seeding Collection Types...");

  console.log("   → Đối Tác (6 items)...");
  for (const item of doiTacData) {
    await docs("api::doi-tac.doi-tac").create({ data: item as any });
  }

  console.log("   → Thành Viên (4 items)...");
  for (const item of thanhVienData) {
    await docs("api::thanh-vien.thanh-vien").create({ data: item as any });
  }

  console.log("   → Khách Hàng (4 items)...");
  for (const item of khachHangData) {
    await docs("api::khach-hang.khach-hang").create({ data: item as any });
  }

  console.log("   → Bài Viết (2 items)...");
  for (const item of baiVietData) {
    await docs("api::bai-viet.bai-viet").create({ data: item as any });
  }

  console.log("   → Case Study (1 item)...");
  for (const item of caseStudyData) {
    await docs("api::case-study.case-study").create({ data: item as any });
  }

  // =====================================
  // SINGLE TYPES
  // =====================================
  console.log("\n📄 Seeding Single Types (with all components)...");

  console.log("   → Trang Chủ (Homepage - full components)...");
  await docs("api::trang-chu.trang-chu").create({ data: trangChuData as any });

  console.log("   → Chấm Công (full components)...");
  await docs("api::cham-cong.cham-cong").create({ data: chamCongData as any });

  console.log("   → Sắp Ca Thông Minh (full components)...");
  await docs("api::sap-ca-thong-minh.sap-ca-thong-minh").create({
    data: sapCaThongMinhData as any,
  });

  console.log("   → Quản Lý Nhân Sự (full components)...");
  await docs("api::quan-ly-nhan-su.quan-ly-nhan-su").create({ data: quanLyNhanSuData as any });

  console.log("   → Quản Lý Đơn Hàng (full components)...");
  await docs("api::quan-ly-don-hang.quan-ly-don-hang").create({ data: quanLyDonHangData as any });

  console.log("   → Quản Lý Tài Sản (full components)...");
  await docs("api::quan-ly-tai-san.quan-ly-tai-san").create({ data: quanLyTaiSanData as any });

  console.log("   → Về Chúng Tôi (full components)...");
  await docs("api::ve-chung-toi.ve-chung-toi").create({ data: veChungToiData as any });

  console.log("   → Tuyển Dụng (full components)...");
  await docs("api::tuyen-dung.tuyen-dung").create({ data: tuyenDungData as any });

  console.log("   → Liên Hệ (full components)...");
  await docs("api::lien-he.lien-he").create({ data: lienHeData as any });

  console.log("\n✅ Comprehensive Seed Completed!");
  console.log("\n📋 Summary:");
  console.log("   - 6 Đối Tác (Partners)");
  console.log("   - 4 Thành Viên (Team Members)");
  console.log("   - 4 Khách Hàng (Testimonials)");
  console.log("   - 2 Bài Viết (Blog Posts)");
  console.log("   - 1 Case Study");
  console.log("   - 9 Single Types with full component data");

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await app.destroy();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
