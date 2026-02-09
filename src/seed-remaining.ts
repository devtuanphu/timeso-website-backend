/**
 * Seed Remaining Content Types
 *
 * Seeds: ve-chung-toi, lien-he, trang-case-study, trang-blog,
 *        bai-viet (articles), case-study (collection),
 *        doi-tac, khach-hang, thanh-vien
 *
 * Usage:
 *   STRAPI_URL=http://localhost:1400 STRAPI_API_TOKEN=<token> npx tsx src/seed-remaining.ts
 */

import * as fs from "fs";
import * as path from "path";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN || "";
const FRONTEND_PUBLIC = path.resolve(__dirname, "../public");
const UPLOADS_DIR = path.resolve(__dirname, "../public/uploads");

// ── Helpers ──

async function uploadFile(
  relativePath: string,
  altText?: string
): Promise<{ id: number; url: string } | null> {
  const srcPath = path.resolve(FRONTEND_PUBLIC, relativePath.replace(/^\//, ""));
  if (!fs.existsSync(srcPath)) {
    console.warn(`  ⚠ File not found: ${srcPath}`);
    return null;
  }

  const fileName = path.basename(srcPath);
  const destPath = path.join(UPLOADS_DIR, fileName);
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  fs.copyFileSync(srcPath, destPath);

  const fileBuffer = fs.readFileSync(srcPath);
  const fileBlob = new Blob([fileBuffer]);
  const formData = new FormData();
  formData.append("files", fileBlob, fileName);
  if (altText)
    formData.append("fileInfo", JSON.stringify({ alternativeText: altText, caption: altText }));

  try {
    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      body: formData,
    });
    if (!res.ok) {
      console.error(`  ✗ Upload failed: ${fileName}`);
      return null;
    }
    const result = await res.json();
    const file = Array.isArray(result) ? result[0] : result;
    console.log(`  ✓ Uploaded: ${fileName} (id: ${file.id})`);
    return { id: file.id, url: file.url };
  } catch (e) {
    console.error(`  ✗ Upload error: ${fileName}`, e);
    return null;
  }
}

async function updateSingleType(endpoint: string, data: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_TOKEN}` },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) {
      console.error(`  ✗ Update ${endpoint} failed:`, await res.text());
      return false;
    }
    console.log(`  ✓ Updated: ${endpoint}`);
    return true;
  } catch (e) {
    console.error(`  ✗ Error updating ${endpoint}:`, e);
    return false;
  }
}

async function createCollectionEntry(
  endpoint: string,
  data: Record<string, unknown>
): Promise<{ id: number } | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_TOKEN}` },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error(`  ✗ Create ${endpoint} failed:`, errText);
      return null;
    }
    const result = (await res.json()) as { data?: { id?: number } };
    const id = result?.data?.id;
    return id ? { id } : null;
  } catch (e) {
    console.error(`  ✗ Error creating ${endpoint}:`, e);
    return null;
  }
}

// ══════════════════════════════════════════════
// 1. THÀNH VIÊN (Team Members) - Collection Type
// ══════════════════════════════════════════════
async function seedThanhVien() {
  console.log("\n━━━ Seeding Thành Viên (Team Members) ━━━\n");

  const members = [
    {
      ten: "Nguyễn Văn Minh",
      chuc_vu: "CEO & Co-Founder",
      mo_ta:
        "Hơn 10 năm kinh nghiệm trong lĩnh vực quản lý nhân sự và công nghệ. Từng giữ vị trí quản lý cấp cao tại nhiều công ty công nghệ hàng đầu.",
      avatar_path: "images/about/73b7c2a56de9b2bde5d83664188677534e98ec81.png",
      thu_tu: 1,
    },
    {
      ten: "Trần Thị Hồng",
      chuc_vu: "CTO & Co-Founder",
      mo_ta:
        "Chuyên gia công nghệ với hơn 8 năm kinh nghiệm phát triển phần mềm. Đam mê tạo ra các giải pháp công nghệ thông minh và hiệu quả.",
      avatar_path: "images/about/d6604c8227042bb19de4e5724ae83e5aa40c0cba.png",
      thu_tu: 2,
    },
    {
      ten: "Lê Hoàng Nam",
      chuc_vu: "Head of Product",
      mo_ta:
        "Với nền tảng UX/UI và quản lý sản phẩm, anh đã giúp nhiều sản phẩm công nghệ đạt được thành công trên thị trường.",
      avatar_path: "images/about/84eb357be3124221837868f50d1ecde7fcc75628.png",
      thu_tu: 3,
    },
    {
      ten: "Phạm Minh Châu",
      chuc_vu: "Head of Engineering",
      mo_ta:
        "Kiến trúc sư phần mềm với kinh nghiệm xây dựng hệ thống quy mô lớn, đảm bảo hiệu suất và độ ổn định cho sản phẩm.",
      avatar_path: "images/about/b7e371af19942c45c8233545ea0c54eab9dc30f4.png",
      thu_tu: 4,
    },
  ];

  const memberIds: number[] = [];
  for (const m of members) {
    const avatar = await uploadFile(m.avatar_path, m.ten);
    const result = await createCollectionEntry("thanh-viens", {
      ten: m.ten,
      chuc_vu: m.chuc_vu,
      mo_ta: m.mo_ta,
      avatar: avatar?.id ?? null,
      thu_tu: m.thu_tu,
    });
    if (result) {
      memberIds.push(result.id);
      console.log(`  ✓ Created member: ${m.ten} (id: ${result.id})`);
    }
  }
  return memberIds;
}

// ══════════════════════════════════════════════
// 2. ĐỐI TÁC (Partners) - Collection Type
// ══════════════════════════════════════════════
async function seedDoiTac() {
  console.log("\n━━━ Seeding Đối Tác (Partners) ━━━\n");

  const partners = [
    {
      ten: "FPT Software",
      logo_path: "images/logos/trusted-by/v2/c94c9d66a6c5cd994e83225d48b135b9c3851b91.svg",
      website: "https://fpt.com",
      thu_tu: 1,
    },
    {
      ten: "Viettel Solutions",
      logo_path: "images/logos/trusted-by/v2/df9a7873b986c6deceafcfbabb4d7dfb5ceca3ee.svg",
      website: "https://viettel.com",
      thu_tu: 2,
    },
    {
      ten: "VNG Corporation",
      logo_path: "images/logos/trusted-by/v2/842d53f8c56e7fd468f86965d4bbc956e8ba6c94.svg",
      website: "https://vng.com.vn",
      thu_tu: 3,
    },
    {
      ten: "Momo",
      logo_path: "images/logos/trusted-by/v2/0f4172f16cb3c4a18d1f854bed6014e3dd99d719.svg",
      website: "https://momo.vn",
      thu_tu: 4,
    },
    {
      ten: "Tiki",
      logo_path: "images/logos/trusted-by/v2/d45c3f24223209f81861868ab08b02298199cbee.svg",
      website: "https://tiki.vn",
      thu_tu: 5,
    },
    {
      ten: "Shopee",
      logo_path: "images/logos/trusted-by/v2/7d498a0e5f7f2d2d71a92f03ce93f6ac1291780c.svg",
      website: "https://shopee.vn",
      thu_tu: 6,
    },
    {
      ten: "VinGroup",
      logo_path: "images/logos/trusted-by/v2/d5dfa5f455eee90295d80accdb1f5d4830334776.svg",
      website: "https://vingroup.net",
      thu_tu: 7,
    },
    {
      ten: "Grab Vietnam",
      logo_path: "images/logos/trusted-by/v2/2b47f551906226d330d0c0558ddb7f0aca4f9783.svg",
      website: "https://grab.com",
      thu_tu: 8,
    },
    {
      ten: "Be Group",
      logo_path: "images/logos/trusted-by/v2/2a9460592ddc37198a26107360528ae8f247a0d5.svg",
      website: "https://be.com.vn",
      thu_tu: 9,
    },
  ];

  for (const p of partners) {
    const logo = await uploadFile(p.logo_path, p.ten);
    const result = await createCollectionEntry("doi-tacs", {
      ten: p.ten,
      logo: logo?.id ?? null,
      website: p.website,
      thu_tu: p.thu_tu,
    });
    if (result) console.log(`  ✓ Created partner: ${p.ten}`);
  }
}

// ══════════════════════════════════════════════
// 3. KHÁCH HÀNG (Testimonials) - Collection Type
// ══════════════════════════════════════════════
async function seedKhachHang() {
  console.log("\n━━━ Seeding Khách Hàng (Testimonials) ━━━\n");

  const testimonials = [
    {
      ten: "Nguyễn Thị Mai",
      chuc_vu: "Quản lý chuỗi cửa hàng",
      cong_ty: "The Coffee House",
      noi_dung:
        "Timeso đã giúp chúng tôi tiết kiệm rất nhiều thời gian trong việc quản lý nhân sự. Từ việc chấm công, sắp ca đến tính lương đều được tự động hóa, giảm thiểu sai sót đáng kể.",
      avatar_path: "images/testimonials/9d00e17f297cf8e19d4d37b8965aebaf7811f058.png",
      logo_path: "images/testimonials/b183bc32020423820d400f5916d1188f10822947.svg",
      so_sao: 5,
    },
    {
      ten: "Trần Văn Hùng",
      chuc_vu: "Chủ cửa hàng",
      cong_ty: "Highlands Coffee",
      noi_dung:
        "Trước khi sử dụng Timeso, việc quản lý 30 nhân viên là cả một vấn đề. Giờ đây mọi thứ đều trơn tru, từ việc xếp ca đến theo dõi hiệu suất.",
      avatar_path: "images/testimonials/f1636e25bac66ef56895161ee57e3705824ace9c.png",
      logo_path: "images/testimonials/42406cd0ccd360f8e1b213b9e57282db06656859.svg",
      so_sao: 5,
    },
    {
      ten: "Lê Thị Hương",
      chuc_vu: "HR Manager",
      cong_ty: "Phúc Long Heritage",
      noi_dung:
        "Tính năng AI của Timeso thực sự ấn tượng. Hệ thống tự động đề xuất lịch ca phù hợp, giúp chúng tôi tối ưu chi phí nhân sự đến 30%.",
      avatar_path: "images/about/d6604c8227042bb19de4e5724ae83e5aa40c0cba.png",
      logo_path: "images/testimonials/ea91470cc3a3fcb1545d15259561e0d1dfb49db5.svg",
      so_sao: 5,
    },
  ];

  for (const t of testimonials) {
    const avatar = await uploadFile(t.avatar_path, t.ten);
    const logo = await uploadFile(t.logo_path, t.cong_ty);
    const result = await createCollectionEntry("khach-hangs", {
      ten: t.ten,
      chuc_vu: t.chuc_vu,
      cong_ty: t.cong_ty,
      noi_dung: t.noi_dung,
      avatar: avatar?.id ?? null,
      logo_cong_ty: logo?.id ?? null,
      so_sao: t.so_sao,
    });
    if (result) console.log(`  ✓ Created testimonial: ${t.ten}`);
  }
}

// ══════════════════════════════════════════════
// 4. BÀI VIẾT (Blog Articles) - Collection Type
// ══════════════════════════════════════════════
async function seedBaiViet() {
  console.log("\n━━━ Seeding Bài Viết (Blog Articles) ━━━\n");

  const articles = [
    {
      tieu_de: "5 xu hướng quản lý nhân sự 2025 mà chủ cửa hàng cần biết",
      slug: "5-xu-huong-quan-ly-nhan-su-2025",
      mo_ta:
        "Khám phá 5 xu hướng quản lý nhân sự hàng đầu trong năm 2025 giúp tối ưu hiệu quả và nâng cao trải nghiệm nhân viên.",
      noi_dung: `## Quản lý nhân sự thông minh không chỉ là xu hướng

Trong năm 2025, các cửa hàng và doanh nghiệp nhỏ đang chứng kiến sự thay đổi lớn trong cách quản lý nhân sự. Dưới đây là 5 xu hướng quan trọng nhất:

### 1. AI-Powered Scheduling
Trí tuệ nhân tạo đang thay đổi cách sắp xếp ca làm việc. Thay vì mất hàng giờ để lên lịch thủ công, AI có thể tự động đề xuất lịch ca tối ưu dựa trên dữ liệu lịch sử, nhu cầu khách hàng và khả năng của nhân viên.

### 2. Employee Self-Service
Nhân viên ngày càng mong muốn có quyền tự quản lý lịch làm việc, xin nghỉ phép và xem thông tin lương thưởng trên ứng dụng di động.

### 3. Real-time Analytics
Dữ liệu thời gian thực giúp chủ cửa hàng nhanh chóng nhận ra vấn đề và đưa ra quyết định chính xác hơn.

### 4. Automated Compliance
Tự động theo dõi và đảm bảo tuân thủ các quy định về lao động như giờ làm việc, nghỉ phép, bảo hiểm.

### 5. Integrated Communication
Tích hợp kênh liên lạc nội bộ trong cùng một nền tảng giúp tăng hiệu quả giao tiếp và giảm chi phí sử dụng nhiều công cụ.`,
      tac_gia: "Timeso Team",
      danh_muc: "quan-tri-nhan-su",
      tags: ["quản lý nhân sự", "xu hướng 2025", "AI", "HR Tech"],
      noi_bat: true,
      image_path: "images/case-studies/22e4c682258f224f70841b23f4805d4f91d23c3a.png",
    },
    {
      tieu_de: "Hướng dẫn tối ưu chi phí nhân sự cho chuỗi cửa hàng F&B",
      slug: "toi-uu-chi-phi-nhan-su-chuoi-fb",
      mo_ta:
        "Phương pháp giúp chuỗi cửa hàng F&B giảm 20-30% chi phí nhân sự mà vẫn đảm bảo chất lượng phục vụ.",
      noi_dung: `## Tối ưu chi phí – bài toán muôn thuở

Với ngành F&B, chi phí nhân sự chiếm 25-35% tổng chi phí vận hành. Vậy làm sao để tối ưu mà vẫn đảm bảo chất lượng?

### Phân tích dữ liệu lưu lượng khách hàng
Sử dụng dữ liệu để dự đoán lưu lượng khách theo từng khung giờ, từ đó sắp xếp nhân sự phù hợp.

### Ứng dụng công nghệ chấm công
Hệ thống chấm công tự động giúp loại bỏ tình trạng "chấm hộ" và tính lương chính xác.

### Cross-training nhân viên
Đào tạo nhân viên đa kỹ năng để linh hoạt bố trí khi thiếu người.

### Sử dụng ca linh hoạt
Áp dụng các ca ngắn 4-6 tiếng thay vì ca 8 tiếng cố định, phù hợp với nhu cầu thực tế.`,
      tac_gia: "Timeso Team",
      danh_muc: "quan-tri-nhan-su",
      tags: ["F&B", "chi phí", "chuỗi cửa hàng", "tối ưu"],
      noi_bat: true,
      image_path: "images/case-studies/927772feb12cf7bb3461f8731b250063c9238795.png",
    },
    {
      tieu_de: "AI trong quản lý nhân sự: Cơ hội hay thách thức?",
      slug: "ai-trong-quan-ly-nhan-su",
      mo_ta:
        "Phân tích vai trò của trí tuệ nhân tạo trong lĩnh vực quản lý nhân sự và những tác động đến doanh nghiệp.",
      noi_dung: `## AI đang thay đổi cách chúng ta quản lý con người

Trí tuệ nhân tạo không chỉ là công cụ công nghệ mà đang trở thành đối tác chiến lược trong quản lý nhân sự.

### Ứng dụng AI trong tuyển dụng
AI giúp sàng lọc CV, đánh giá ứng viên và dự đoán khả năng phù hợp với văn hóa công ty.

### Dự đoán nghỉ việc
Mô hình machine learning có thể phân tích các tín hiệu và dự đoán nhân viên có nguy cơ nghỉ việc, giúp chủ doanh nghiệp chủ động có phương án.

### Tối ưu lịch làm việc
AI phân tích patterns và tự đề xuất lịch ca tối ưu, cân bằng giữa nhu cầu kinh doanh và mong muốn của nhân viên.`,
      tac_gia: "Timeso Team",
      danh_muc: "cong-nghe-ai",
      tags: ["AI", "trí tuệ nhân tạo", "HR Tech", "tự động hóa"],
      noi_bat: false,
      image_path: "images/case-studies/622be42b94e6901cc23d215d48e2d110ece6cebe.png",
    },
  ];

  for (const art of articles) {
    const image = await uploadFile(art.image_path, art.tieu_de);
    const result = await createCollectionEntry("bai-viets", {
      tieu_de: art.tieu_de,
      slug: art.slug,
      mo_ta: art.mo_ta,
      noi_dung: art.noi_dung,
      tac_gia: art.tac_gia,
      danh_muc: art.danh_muc,
      tags: art.tags,
      noi_bat: art.noi_bat,
      hinh_dai_dien: image?.id ?? null,
    });
    if (result) console.log(`  ✓ Created article: ${art.tieu_de}`);
  }
}

// ══════════════════════════════════════════════
// 5. CASE STUDY - Collection Type
// ══════════════════════════════════════════════
async function seedCaseStudy() {
  console.log("\n━━━ Seeding Case Study ━━━\n");

  const caseStudies = [
    {
      tieu_de: "The Coffee House: Giảm 40% thời gian quản lý nhân sự với Timeso",
      slug: "the-coffee-house-giam-40-thoi-gian",
      mo_ta:
        "Câu chuyện The Coffee House tối ưu quy trình quản lý hơn 500 nhân viên tại 50+ cửa hàng với Timeso.",
      noi_dung: `## Thách thức

The Coffee House với hơn 50 cửa hàng và 500+ nhân viên, việc quản lý nhân sự theo cách truyền thống trở nên bất khả thi. Chấm công thủ công, sắp ca bằng Excel, tính lương sai sót thường xuyên.

## Giải pháp

Triển khai Timeso cho toàn bộ hệ thống:
- Chấm công tự động bằng nhận diện khuôn mặt
- AI sắp xếp ca thông minh
- Tính lương tự động, chính xác 100%

## Kết quả

- **Giảm 40%** thời gian xử lý nhân sự
- **Tiết kiệm 25%** chi phí lương do giảm sai sót
- **Tăng 35%** sự hài lòng của nhân viên`,
      khach_hang: "The Coffee House",
      nganh: "F&B",
      ket_qua: [
        { label: "Giảm thời gian xử lý", value: "40%" },
        { label: "Tiết kiệm chi phí", value: "25%" },
        { label: "Tăng hài lòng", value: "35%" },
      ],
      image_path: "images/case-studies/0fde196edc3946aa5fa9569f9c8de980a700b345.png",
    },
    {
      tieu_de: "Highlands Coffee: Tự động hóa quy trình HR cho chuỗi 300+ cửa hàng",
      slug: "highlands-coffee-tu-dong-hoa-hr",
      mo_ta: "Highlands Coffee triển khai Timeso để quản lý nhân sự hiệu quả trên quy mô lớn.",
      noi_dung: `## Thách thức

Với hơn 300 cửa hàng trên toàn quốc, Highlands cần một giải pháp đồng bộ và mạnh mẽ để quản lý lực lượng lao động lớn.

## Giải pháp

- Hệ thống quản lý nhân sự tập trung
- Chấm công đa phương thức
- Báo cáo real-time cho từng khu vực

## Kết quả

- **Đồng bộ** quy trình HR toàn quốc
- **Giảm 50%** công việc hành chính
- **ROI** đạt được trong vòng 3 tháng`,
      khach_hang: "Highlands Coffee",
      nganh: "F&B",
      ket_qua: [
        { label: "Đồng bộ toàn quốc", value: "100%" },
        { label: "Giảm công việc hành chính", value: "50%" },
        { label: "Hoàn vốn", value: "3 tháng" },
      ],
      image_path: "images/case-studies/12e428e0998316a6841f644e6991b461febcdf80.png",
    },
    {
      tieu_de: "Phúc Long: Sắp ca thông minh giúp tối ưu chi phí nhân sự",
      slug: "phuc-long-sap-ca-thong-minh",
      mo_ta: "Phúc Long ứng dụng AI của Timeso để sắp ca tối ưu, tiết kiệm chi phí vận hành.",
      noi_dung: `## Thách thức

Phúc Long gặp khó khăn trong việc cân bằng giữa nhu cầu phục vụ khách hàng cao điểm và chi phí nhân sự.

## Giải pháp

Timeso AI phân tích dữ liệu lưu lượng khách và tự đề xuất lịch ca phù hợp cho từng cửa hàng.

## Kết quả

- **Giảm 30%** chi phí nhân sự overtime
- **Tăng 20%** năng suất phục vụ
- **0 phút** mỗi tuần cho việc xếp lịch thủ công`,
      khach_hang: "Phúc Long Heritage",
      nganh: "F&B",
      ket_qua: [
        { label: "Giảm chi phí OT", value: "30%" },
        { label: "Tăng năng suất", value: "20%" },
        { label: "Thời gian xếp lịch", value: "0 phút" },
      ],
      image_path: "images/case-studies/22e4c682258f224f70841b23f4805d4f91d23c3a.png",
    },
  ];

  for (const cs of caseStudies) {
    const image = await uploadFile(cs.image_path, cs.tieu_de);
    const result = await createCollectionEntry("case-studies", {
      tieu_de: cs.tieu_de,
      slug: cs.slug,
      mo_ta: cs.mo_ta,
      noi_dung: cs.noi_dung,
      khach_hang: cs.khach_hang,
      nganh: cs.nganh,
      ket_qua: cs.ket_qua,
      hinh_dai_dien: image?.id ?? null,
    });
    if (result) console.log(`  ✓ Created case study: ${cs.tieu_de}`);
  }
}

// ══════════════════════════════════════════════
// 6. VỀ CHÚNG TÔI - Single Type
// ══════════════════════════════════════════════
async function seedVeChungToi(memberIds: number[]) {
  console.log("\n━━━ Seeding Về Chúng Tôi ━━━\n");

  const storyImage = await uploadFile(
    "images/about/73b7c2a56de9b2bde5d83664188677534e98ec81.png",
    "Câu chuyện Timeso"
  );

  // Upload core value icons
  const icon1 = await uploadFile(
    "images/why-choose/35df67a1bba1a53f805dac9cf1055580f424e36e.svg",
    "Sáng tạo"
  );
  const icon2 = await uploadFile(
    "images/why-choose/706259e242d261fda917b658bedd7f2bb5b912e9.svg",
    "Chất lượng"
  );
  const icon3 = await uploadFile(
    "images/why-choose/550bffc06cf3f26dfdea9ef3b6ab7833848daabe.svg",
    "Tận tâm"
  );

  // Upload CTA image
  const ctaImage = await uploadFile(
    "images/cta/927772feb12cf7bb3461f8731b250063c9238795.png",
    "Timeso CTA"
  );

  await updateSingleType("ve-chung-toi", {
    seo: {
      tieu_de: "Về Chúng Tôi - Timeso",
      mo_ta:
        "Tìm hiểu về Timeso - đội ngũ phát triển giải pháp quản lý nhân sự thông minh hàng đầu Việt Nam.",
      tu_khoa: "Timeso, quản lý nhân sự, về chúng tôi, đội ngũ",
    },
    hero: {
      tieu_de: "Timeso – Giải pháp vượt qua mọi",
      mo_ta:
        "Timeso cung cấp giải pháp quản lý nhân sự và vận hành thông minh cho các cửa hàng, giúp tối ưu quy trình, tiết kiệm thời gian và phát triển bền vững.",
      app_store_url: "https://apps.apple.com/app/timeso",
      google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
    },
    cau_chuyen: `Timeso ra đời từ một câu hỏi đơn giản: "Làm sao để việc quản lý nhân sự và vận hành trở nên nhẹ nhàng hơn cho mọi cửa hàng?"

Trong quá trình làm việc với nhiều cửa hàng và đội ngũ quản lý, chúng tôi nhận ra rằng những phương pháp thủ công không chỉ tốn thời gian mà còn khiến cửa hàng chậm lại.

Chính từ nhu cầu đó, đội ngũ sáng lập Timeso quyết tâm tạo nên một nền tảng thông minh, dễ sử dụng nhưng đủ mạnh để tự động hóa những công việc phức tạp. Chúng tôi tin rằng khi cửa hàng tiết kiệm được thời gian, họ sẽ có nhiều hơn để tập trung vào điều quan trọng nhất: phát triển con người và tạo ra giá trị thật sự.`,
    hinh_cau_chuyen: storyImage?.id ?? null,
    gia_tri_cot_loi: [
      {
        tieu_de: "Sáng Tạo Không Ngừng",
        mo_ta:
          "Chúng tôi liên tục nghiên cứu và phát triển các giải pháp mới, ứng dụng công nghệ tiên tiến nhất để mang đến sản phẩm tốt nhất cho khách hàng.",
        icon: icon1?.id ?? null,
      },
      {
        tieu_de: "Chất Lượng Hàng Đầu",
        mo_ta:
          "Mỗi sản phẩm của Timeso đều trải qua quá trình kiểm thử nghiêm ngặt, đảm bảo chất lượng và độ tin cậy cao nhất cho doanh nghiệp.",
        icon: icon2?.id ?? null,
      },
      {
        tieu_de: "Tận Tâm Phục Vụ",
        mo_ta:
          "Đội ngũ hỗ trợ Timeso luôn sẵn sàng đồng hành cùng khách hàng 24/7, từ triển khai đến vận hành, giải quyết mọi vấn đề nhanh chóng.",
        icon: icon3?.id ?? null,
      },
    ],
    doi_ngu: memberIds,
    cta: {
      tieu_de: "Timeso giúp chủ quán nhỏ vươn tới thành công lớn!",
      mo_ta:
        "Từng trải qua thiếu nhân sự, xoay ca gấp và sai lệch lương thưởng, chúng tôi tạo ra Timeso để giúp quản lý nhân sự, chia ca và tuyển dụng trở nên dễ dàng, minh bạch và hiệu quả hơn cho mọi cửa hàng.",
      hinh_nen: ctaImage?.id ?? null,
      app_store_url: "https://apps.apple.com/app/timeso",
      google_play_url: "https://play.google.com/store/apps/details?id=com.timeso",
    },
  });
}

// ══════════════════════════════════════════════
// 7. LIÊN HỆ - Single Type
// ══════════════════════════════════════════════
async function seedLienHe() {
  console.log("\n━━━ Seeding Liên Hệ ━━━\n");

  await updateSingleType("lien-he", {
    seo: {
      tieu_de: "Liên Hệ - Timeso",
      mo_ta:
        "Liên hệ với Timeso để được tư vấn giải pháp quản lý nhân sự phù hợp cho doanh nghiệp của bạn.",
      tu_khoa: "liên hệ, Timeso, tư vấn, hỗ trợ",
    },
    hero: {
      tieu_de: "Liên hệ với chúng tôi",
      mo_ta:
        "Hãy liên hệ với đội ngũ Timeso để được tư vấn giải pháp phù hợp nhất cho doanh nghiệp của bạn.",
    },
    dia_chi: "Lầu 5, Tòa nhà Innovation Hub\n123 Nguyễn Huệ, Quận 1\nTP. Hồ Chí Minh, Việt Nam",
    email: "contact@timeso.vn",
    so_dien_thoai: "+84 28 3822 6868",
    gio_lam_viec: "Thứ Hai - Thứ Sáu: 8:00 - 18:00",
    ban_do_url: "https://maps.google.com/?q=10.7769,106.7009",
  });
}

// ══════════════════════════════════════════════
// 8. TRANG CASE STUDY - Single Type (page config)
// ══════════════════════════════════════════════
async function seedTrangCaseStudy() {
  console.log("\n━━━ Seeding Trang Case Study ━━━\n");

  await updateSingleType("trang-case-study", {
    seo: {
      tieu_de: "Case Studies - Timeso",
      mo_ta:
        "Khám phá các case study về việc triển khai Timeso tại các doanh nghiệp. Xem kết quả thực tế từ các khách hàng.",
      tu_khoa: "case study, khách hàng, kết quả, Timeso",
    },
    hero: {
      tieu_de: "Case Studies",
      mo_ta: "Khám phá cách Timeso giúp hàng trăm doanh nghiệp tối ưu quản lý nhân sự và vận hành.",
    },
    mo_ta_trang: "Xem các câu chuyện thành công từ khách hàng đã triển khai Timeso.",
  });
}

// ══════════════════════════════════════════════
// 9. TRANG BLOG - Single Type (page config)
// ══════════════════════════════════════════════
async function seedTrangBlog() {
  console.log("\n━━━ Seeding Trang Blog ━━━\n");

  await updateSingleType("trang-blog", {
    seo: {
      tieu_de: "Blog - Timeso",
      mo_ta:
        "Tin tức, hướng dẫn và insights về quản lý nhân sự, chấm công, và các giải pháp HR thông minh từ Timeso.",
      tu_khoa: "blog, tin tức, quản lý nhân sự, HR, Timeso",
    },
    hero: {
      tieu_de: "Blog & Tin Tức",
      mo_ta:
        "Cập nhật những kiến thức mới nhất về quản lý nhân sự, công nghệ HR và các giải pháp kinh doanh thông minh.",
    },
    mo_ta_trang: "Khám phá các bài viết, hướng dẫn và phân tích chuyên sâu từ đội ngũ Timeso.",
  });
}

// ══════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════
async function main() {
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║  SEED REMAINING CONTENT TYPES                ║");
  console.log("║  (ve-chung-toi, lien-he, blog, case-study,   ║");
  console.log("║   doi-tac, khach-hang, thanh-vien, bai-viet)  ║");
  console.log("╚═══════════════════════════════════════════════╝");
  console.log(`\nStrapi URL: ${STRAPI_URL}`);

  if (!API_TOKEN) {
    console.error("❌ Missing STRAPI_API_TOKEN");
    process.exit(1);
  }

  // 1. Collection types first (order matters for relations)
  const memberIds = await seedThanhVien();
  await seedDoiTac();
  await seedKhachHang();
  await seedBaiViet();
  await seedCaseStudy();

  // 2. Single types (some reference collection entries)
  await seedVeChungToi(memberIds);
  await seedLienHe();
  await seedTrangCaseStudy();
  await seedTrangBlog();

  console.log("\n✅ All remaining content types seeded successfully!");
}

main().catch(console.error);
