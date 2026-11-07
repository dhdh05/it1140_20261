# Thực hành IT1140 (kỳ 20261)

Trang tĩnh: nội quy lớp học, hướng dẫn nộp báo cáo thực hành và công cụ tính điểm.

```
index.html        khung trang: tiêu đề, thanh tab, chân trang
sections/         nội dung từng phần, mỗi phần một file
  noi-quy.html                 tab 01 Nội quy lớp học
  nop-bao-cao/0-tong-quan.html tab 02: phần mở đầu + 2 file cần nộp
  nop-bao-cao/1-...6-...html   tab 02: từng bước 1 → 6
  cham-diem.html               tab 03 Chấm điểm
css/              giao diện, nạp theo thứ tự 01 → 07
  01-base.css         biến màu, font, kiểu chữ chung
  02-hero-tabs.css    đầu trang, thanh tab
  03-noi-quy.css      tab Nội quy
  04-nop-bao-cao.css  tab Nộp báo cáo (thẻ file, các bước, khung code, công cụ tạo tên, chấm điểm)
  05-theme.css        điện thoại, giao diện sáng tương phản cao, chế độ tối
  06-polish.css       làm đẹp thêm, khung code cuộn ngang
  07-cham-diem.css    tab Chấm điểm
js/greeting.js    lời chào theo giờ + lời chúc
js/tabs.js        chuyển tab Nội quy / Nộp báo cáo / Chấm điểm
js/include.js     ghép các file trong sections/ vào trang
js/filename.js    công cụ tạo tên file chuẩn
js/cham-diem/data.js   các lỗi trừ điểm, bài tự luyện từng buổi, thang điểm mặc định
js/cham-diem/score.js  công thức tính điểm
js/cham-diem/app.js    giao diện tab Chấm điểm, copy, phím Esc để chấm bài tiếp theo
img/              ảnh minh họa (header, footer, Thonny, hệ thống)
```

Sửa nội dung: mở file tương ứng trong `sections/`, tìm đoạn chữ cần sửa. Thêm bước mới: tạo file trong `sections/nop-bao-cao/` rồi thêm một dòng `data-include` trong `index.html`.

Chạy thử trên máy: trang ghép nội dung bằng `fetch`, nên không mở trực tiếp file `index.html` được. Chạy `python -m http.server` trong thư mục này rồi mở http://localhost:8000.

Tab 03 Chấm điểm là công cụ tính điểm dành cho GV/TA, cần mật khẩu để mở.

Sửa mức trừ điểm: sửa cả bảng trong `sections/nop-bao-cao/5-tieu-chi-cham-diem.html` và `js/cham-diem/data.js`.

Ngày cập nhật nằm ở cuối `index.html`.

Deploy: Cloudflare Pages → Connect to Git → chọn repo này, Framework preset **None**, Build command để trống, Build output directory `/`. Mỗi lần push lên `main` sẽ tự deploy lại.
