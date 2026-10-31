# Thực hành IT1140 (kỳ 20261)

Trang tĩnh: nội quy lớp học và hướng dẫn nộp báo cáo thực hành.

```
index.html        khung trang: tiêu đề, thanh tab, chân trang
sections/         nội dung từng phần, mỗi phần một file
  noi-quy.html                 tab 01 Nội quy lớp học
  nop-bao-cao/0-tong-quan.html tab 02: phần mở đầu + 2 file cần nộp
  nop-bao-cao/1-...6-...html   tab 02: từng bước 1 → 6
css/style.css     giao diện, màu sắc
js/greeting.js    lời chào theo giờ + lời chúc
js/tabs.js        chuyển tab Nội quy / Nộp báo cáo
js/include.js     ghép các file trong sections/ vào trang
js/filename.js    công cụ tạo tên file chuẩn
img/              ảnh minh họa (header, footer, Thonny, hệ thống)
```

Sửa nội dung: mở file tương ứng trong `sections/`, tìm đoạn chữ cần sửa. Thêm bước mới: tạo file trong `sections/nop-bao-cao/` rồi thêm một dòng `data-include` trong `index.html`.

Chạy thử trên máy: trang ghép nội dung bằng `fetch`, nên không mở trực tiếp file `index.html` được. Chạy `python -m http.server` trong thư mục này rồi mở http://localhost:8000.

Ngày cập nhật nằm ở cuối `index.html`.

Deploy: Cloudflare Pages → Connect to Git → chọn repo này, Framework preset **None**, Build command để trống, Build output directory `/`. Mỗi lần push lên `main` sẽ tự deploy lại.
