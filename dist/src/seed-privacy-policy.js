/**
 * Seed Privacy Policy Page (Chính Sách Bảo Mật) Data into Strapi
 *
 * Usage:
 *   STRAPI_API_TOKEN=<your-token> npx tsx src/seed-privacy-policy.ts
 */
const PP_STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const PP_API_TOKEN = process.env.STRAPI_API_TOKEN || "";
async function updateSingleType(apiSlug, data) {
    const res = await fetch(`${PP_STRAPI_URL}/api/${apiSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${PP_API_TOKEN}` },
        body: JSON.stringify({ data }),
    });
    if (!res.ok) {
        console.error(`✗ Failed: ${apiSlug}:`, await res.text());
        return;
    }
    console.log(`✓ Updated: ${apiSlug}`);
}
async function main() {
    if (!PP_API_TOKEN) {
        console.error("❌ STRAPI_API_TOKEN required.");
        process.exit(1);
    }
    console.log("\n━━━ Seeding Privacy Policy Page ━━━\n");
    const noiDung = `
<h2>1. Giới thiệu</h2>
<p>Chào mừng bạn đến với Timeso ("chúng tôi", "của chúng tôi"). Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng ứng dụng và dịch vụ của Timeso.</p>

<h2>2. Thông tin chúng tôi thu thập</h2>
<h3>2.1. Thông tin bạn cung cấp trực tiếp</h3>
<ul>
  <li><strong>Thông tin tài khoản:</strong> Họ tên, email, số điện thoại, mật khẩu khi đăng ký.</li>
  <li><strong>Thông tin doanh nghiệp:</strong> Tên cửa hàng, địa chỉ, ngành nghề kinh doanh.</li>
  <li><strong>Thông tin nhân sự:</strong> Dữ liệu nhân viên bao gồm tên, chức vụ, lịch làm việc, chấm công.</li>
  <li><strong>Thông tin thanh toán:</strong> Thông tin gói dịch vụ và phương thức thanh toán.</li>
</ul>

<h3>2.2. Thông tin tự động thu thập</h3>
<ul>
  <li><strong>Dữ liệu thiết bị:</strong> Loại thiết bị, hệ điều hành, phiên bản ứng dụng.</li>
  <li><strong>Dữ liệu vị trí:</strong> Vị trí GPS khi sử dụng tính năng chấm công (chỉ khi được cho phép).</li>
  <li><strong>Dữ liệu sử dụng:</strong> Thời gian truy cập, tính năng được sử dụng, tương tác trong ứng dụng.</li>
  <li><strong>Cookies và công nghệ theo dõi:</strong> Để cải thiện trải nghiệm người dùng.</li>
</ul>

<h2>3. Mục đích sử dụng thông tin</h2>
<p>Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:</p>
<ul>
  <li>Cung cấp, duy trì và cải thiện dịch vụ Timeso.</li>
  <li>Xử lý đăng ký tài khoản và xác thực người dùng.</li>
  <li>Quản lý chấm công, ca làm việc và tính lương tự động.</li>
  <li>Phân tích dữ liệu nhân sự và đề xuất AI thông minh.</li>
  <li>Gửi thông báo, cập nhật và hỗ trợ khách hàng.</li>
  <li>Đảm bảo an ninh và phòng chống gian lận.</li>
  <li>Tuân thủ các nghĩa vụ pháp lý.</li>
</ul>

<h2>4. Chia sẻ thông tin</h2>
<p>Chúng tôi <strong>không bán</strong> thông tin cá nhân của bạn cho bên thứ ba. Thông tin chỉ được chia sẻ trong các trường hợp:</p>
<ul>
  <li><strong>Với sự đồng ý của bạn:</strong> Khi bạn cho phép chia sẻ thông tin.</li>
  <li><strong>Đối tác dịch vụ:</strong> Các nhà cung cấp hỗ trợ vận hành (hosting, thanh toán, phân tích) — chỉ được truy cập thông tin cần thiết và phải tuân thủ chính sách bảo mật.</li>
  <li><strong>Yêu cầu pháp lý:</strong> Khi được yêu cầu bởi cơ quan chức năng có thẩm quyền.</li>
  <li><strong>Bảo vệ quyền lợi:</strong> Để bảo vệ quyền, tài sản và an toàn của Timeso và người dùng.</li>
</ul>

<h2>5. Bảo mật dữ liệu</h2>
<p>Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ dữ liệu của bạn:</p>
<ul>
  <li>Mã hóa dữ liệu trong quá trình truyền tải (SSL/TLS).</li>
  <li>Mã hóa dữ liệu lưu trữ tại nghỉ (encryption at rest).</li>
  <li>Kiểm soát truy cập nghiêm ngặt dựa trên vai trò.</li>
  <li>Giám sát và cảnh báo an ninh 24/7.</li>
  <li>Sao lưu dữ liệu định kỳ và kế hoạch phục hồi thảm họa.</li>
</ul>

<h2>6. Quyền của bạn</h2>
<p>Bạn có các quyền sau đối với thông tin cá nhân của mình:</p>
<ul>
  <li><strong>Quyền truy cập:</strong> Xem và tải xuống dữ liệu cá nhân.</li>
  <li><strong>Quyền chỉnh sửa:</strong> Cập nhật thông tin không chính xác.</li>
  <li><strong>Quyền xóa:</strong> Yêu cầu xóa tài khoản và dữ liệu liên quan.</li>
  <li><strong>Quyền hạn chế xử lý:</strong> Giới hạn cách chúng tôi sử dụng dữ liệu.</li>
  <li><strong>Quyền chuyển dữ liệu:</strong> Nhận bản sao dữ liệu ở định dạng có thể đọc được.</li>
  <li><strong>Quyền phản đối:</strong> Phản đối việc xử lý dữ liệu cho mục đích tiếp thị.</li>
</ul>
<p>Để thực hiện các quyền trên, vui lòng liên hệ: <a href="mailto:privacy@timeso.vn">privacy@timeso.vn</a></p>

<h2>7. Lưu trữ dữ liệu</h2>
<p>Chúng tôi lưu trữ dữ liệu cá nhân trong suốt thời gian bạn sử dụng dịch vụ và thêm một khoảng thời gian hợp lý sau khi ngừng sử dụng, phù hợp với yêu cầu pháp lý và mục đích kinh doanh hợp pháp.</p>

<h2>8. Thông tin trẻ em</h2>
<p>Dịch vụ Timeso không dành cho người dưới 16 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em. Nếu phát hiện, dữ liệu sẽ được xóa ngay lập tức.</p>

<h2>9. Thay đổi chính sách</h2>
<p>Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi quan trọng sẽ được thông báo qua ứng dụng hoặc email. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi đồng nghĩa với việc bạn chấp nhận chính sách mới.</p>

<h2>10. Liên hệ</h2>
<p>Nếu bạn có câu hỏi hoặc yêu cầu về chính sách bảo mật, vui lòng liên hệ:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:privacy@timeso.vn">privacy@timeso.vn</a></li>
  <li><strong>Hotline:</strong> 1900-xxxx</li>
  <li><strong>Địa chỉ:</strong> [Địa chỉ công ty Timeso]</li>
</ul>
  `.trim();
    await updateSingleType("chinh-sach-bao-mat", {
        seo: {
            tieu_de: "Chính Sách Bảo Mật - Timeso",
            mo_ta: "Chính sách bảo mật của Timeso — cam kết bảo vệ thông tin cá nhân và dữ liệu của người dùng với các tiêu chuẩn bảo mật cao nhất.",
        },
        tieu_de: "Chính Sách Bảo Mật",
        noi_dung: noiDung,
        ngay_cap_nhat: "2026-02-08",
    });
    console.log("\n✅ Privacy Policy page seeded successfully!");
}
main().catch(console.error);
