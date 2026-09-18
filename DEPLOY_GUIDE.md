# 🚀 Hướng Dẫn Deploy GitHub Profile & 3D Portfolio cho Nguyễn Đức Thịnh

Tài liệu này hướng dẫn chi tiết 2 bước để đưa **GitHub Profile README** và **3D Web Portfolio** lên mạng chạy trực tiếp trên GitHub.

---

## 📌 PHẦN 1: Đưa GitHub Profile README lên GitHub (`Ducthinh015/Ducthinh015`)

GitHub có tính năng đặc biệt: Nếu anh tạo 1 repository trùng tên với username của anh (`Ducthinh015`), file `README.md` trong repo đó sẽ hiển thị làm trang cá nhân chính của anh.

### Các bước thực hiện:
1. Đăng nhập vào [GitHub.com](https://github.com).
2. Nhấn nút **New Repository** (Tạo repo mới).
3. Đặt tên Repository Name đúng chính xác là: **`Ducthinh015`**
4. Chọn chế độ **Public** (Công khai).
5. Tích chọn **Add a README file**.
6. Mở file `README.md` trong thư mục project này, **copy toàn bộ nội dung** và dán thay thế vào file `README.md` trên repo `Ducthinh015` của anh trên GitHub -> Nhấn **Commit Changes**.

👉 Trang chủ `https://github.com/Ducthinh015` của anh sẽ biến thành một Profile ấn tượng với badges, kinh nghiệm thực chiến và GitHub Dynamic Stats!

---

## 📌 PHẦN 2: Deploy 3D Web Portfolio lên GitHub Pages

Anh có 2 cách cực kỳ đơn giản để đưa ứng dụng Web Portfolio 3D lên chạy trên link `https://Ducthinh015.github.io/portfolio` (hoặc custom domain):

---

### 🎨 CÁCH 1: Deploy tự động bằng Lệnh `npm run deploy` (Nhanh nhất & Đễ nhất)

1. Tạo một repository mới tên là `portfolio` trên GitHub (`github.com/new`).
2. Trong thư mục dự án trên máy của anh, mở Terminal / PowerShell và chạy các lệnh sau:

```bash
# 1. Khởi tạo Git (nếu chưa có)
git init
git add .
git commit -m "Initial commit for 3D Portfolio"

# 2. Liên kết với Repository trên GitHub
git branch -M main
git remote add origin https://github.com/Ducthinh015/portfolio.git
git push -u origin main

# 3. Chạy lệnh tự động build và deploy
npm run deploy
```

3. Vào repo `portfolio` trên GitHub -> **Settings** -> **Pages**:
   - Tại mục **Source**, chọn **Deploy from a branch**.
   - Tại mục **Branch**, chọn branch **`gh-pages`** và thư mục **`/(root)`** -> Nhấn **Save**.

🎉 Sau 1-2 phút, trang web Portfolio 3D của anh sẽ live tại: **`https://Ducthinh015.github.io/portfolio`**

---

### ⚙️ CÁCH 2: Deploy tự động bằng GitHub Actions (Tự động mỗi khi Push Code)

Project đã được tích hợp sẵn file cấu hình CI/CD tự động: `.github/workflows/deploy.yml`.

1. Tạo repo `portfolio` trên GitHub và push toàn bộ code lên nhánh `main`.
2. Vào repo trên GitHub -> **Settings** -> **Actions** -> **General** -> Mục **Workflow permissions** -> Chọn **Read and write permissions** -> Nhấn **Save**.
3. Mỗi khi anh push code mới lên GitHub, GitHub Action sẽ tự động build 3D Web Portfolio và đưa lên GitHub Pages cho anh mà không cần gõ lệnh thủ công nào!

---

## 🛠️ Xem trước (Preview) ở máy cá nhân (Local)

Nếu anh muốn chạy thử trên máy của mình trước khi đẩy lên GitHub:

```bash
# Chạy giao diện phát triển
npm run dev
```
Sau đó mở trình duyệt truy cập đường dẫn local hiển thị trên terminal (thường là `http://localhost:5173`).

---

Chúc anh **Nguyễn Đức Thịnh** ứng tuyển thành công và có buổi phỏng vấn ấn tượng! 🚀
