/* Tab Chấm điểm: các lỗi trừ điểm, bài tự luyện từng buổi, thang điểm mặc định.
   Muốn thêm/sửa bài tự luyện thì sửa ở đây. */
const ERRORS = [
  { id: "hf",    label: "Header/footer không đạt yêu cầu",        kind: "err",  key: "hf",   fb: "Header/footer không đạt yêu cầu" },
  { id: "img",   label: "Căn chỉnh hình ảnh trong báo cáo không khoa học", kind: "err",  key: "img" },
  { id: "code",  label: "Nội dung code không đúng yêu cầu",       kind: "err",  key: "code" },
  { id: "pre",   label: "Ảnh chạy trên hệ thống chỉ bấm Only precheck (không bấm Chọn)", kind: "err", key: "pre", fb: "Ảnh chạy hệ thống chỉ bấm Only precheck, không bấm Chọn" },
  { id: "fmt",   label: "File nộp ngang hàng với file .zip không phải .pdf (ví dụ nộp .docx, sai định dạng)", kind: "err", key: "fmt", fb: "File nộp ngang hàng với file .zip không phải .pdf, sai định dạng" },
  { id: "name2", label: "Đặt tên file code sai yêu cầu từ 3 file trở lên", kind: "err", key: "name2", group: "codename", fb: "Đặt tên file code sai yêu cầu từ 3 file trở lên" },
  { id: "name05", label: "Đặt tên file code sai yêu cầu ở 1–2 file", kind: "err", key: "name05", group: "codename", fb: "Đặt tên file code sai yêu cầu ở 1–2 file" },
  { id: "zipname", label: "Đặt tên thư mục/file .zip sai yêu cầu", kind: "err", key: "zipname", fb: "Đặt tên thư mục/file .zip sai yêu cầu" },
  { id: "nosys2", label: "Thiếu ảnh chạy trên hệ thống hoặc ảnh chạy trên IDE từ 3 bài trở lên", kind: "err", key: "nosys2", group: "nosys", fb: "Thiếu ảnh chạy trên hệ thống hoặc ảnh chạy trên IDE từ 3 bài trở lên" },
  { id: "nosys05", label: "Thiếu ảnh chạy trên hệ thống hoặc ảnh chạy trên IDE ở 1–2 bài", kind: "err", key: "nosys05", group: "nosys", fb: "Thiếu ảnh chạy trên hệ thống hoặc ảnh chạy trên IDE ở 1–2 bài" },
  { id: "debai", label: "Bài tập tự luyện không có đề bài", kind: "err", key: "debai", fb: "Bài tập tự luyện không ghi đề bài" },
  { id: "late",  label: "Nộp muộn (trừ 1 lần)",                   kind: "err",  key: "late", fb: "Nộp muộn" },
  { id: "half",  label: "Thiếu 1 trong 2 file (.pdf hoặc .zip)",  kind: "half" },
  { id: "cheat", label: "Gian lận",                               kind: "zero" },
];

const BUOI = [
  { id: "BTH01", title: "Cú pháp cơ bản, biểu thức, luồng điều khiển", ex: [
    ["1.5", "Tiền điện theo bậc thang"], ["1.6", "Giải phương trình bậc nhất"],
    ["1.7", "Tổng, trung bình, lớn nhất, nhỏ nhất"], ["1.8", "Bảng cửu chương"],
    ["1.9", "Số ngày trong tháng"], ["1.10", "Đếm chữ số và tính tổng các chữ số"],
    ["1.11", "Dãy Fibonacci"], ["1.12", "UCLN và BCNN"], ["1.13", "Vẽ tam giác sao"]] },
  { id: "BTH02", title: "Hàm và chuỗi", ex: [
    ["2.7", "Nút gốc chữ số"], ["2.8", "Đếm số chẵn bằng hàm"], ["2.9", "Hàm tính lũy thừa"],
    ["2.10", "Đếm số câu"], ["2.11", "Phân loại chuỗi"], ["2.12", "Đếm số lần xuất hiện chuỗi con"]] },
  { id: "BTH03", title: "Chuỗi (tiếp), tuple, list, set, dictionary", ex: [
    ["3.6", "Kiểm tra chuỗi đối xứng"], ["3.7", "Đếm nguyên âm và phụ âm"],
    ["3.8", "Thống kê trong một câu"], ["3.9", "Kiểm tra tính đơn điệu"],
    ["3.10", "Trộn hai dãy đã sắp xếp"], ["3.11", "Trung bình sau khi loại đỉnh"],
    ["3.12", "Xử lý danh sách số"], ["3.13", "Tìm kiếm vị trí xuất hiện"]] },
  { id: "BTH04", title: "Module và tập tin", ex: [
    ["4.6", "Chuẩn hóa văn bản"], ["4.7", "Gộp 2 tệp"], ["4.8", "Bảng điểm dạng CSV"],
    ["4.9", "Lọc và ghi báo cáo"], ["4.10", "Nhật ký nhiệt độ"]] },
];

const DEFAULT_SETTINGS = {
  base: 8.5, hf: 0.5, img: 0.5, code: 0.5, pre: 0.5, nosys2: 2, nosys05: 0.5, debai: 0.5, fmt: 0.5, name2: 2, name05: 0.5, zipname: 2, late: 0.5, bonus: 0.25,
  cap: 10,          // null = không giới hạn
  halfAll: true,    // thiếu file: chia đôi cả điểm cộng
};

const SETTING_FIELDS = [
  ["base",  "Điểm tối đa khi chỉ làm bài trên lớp"],
  ["hf",    "Trừ: Header/footer không đạt yêu cầu"],
  ["img",   "Trừ: Căn chỉnh hình ảnh trong báo cáo không khoa học"],
  ["code",  "Trừ: Nội dung code không đúng yêu cầu"],
  ["pre",   "Trừ: Chỉ bấm Only precheck"],
  ["fmt",   "Trừ: File nộp ngang hàng .zip không phải .pdf"],
  ["name2",   "Trừ: Tên file code sai từ 3 file"],
  ["name05",  "Trừ: Tên file code sai 1–2 file"],
  ["zipname", "Trừ: Tên thư mục .zip sai"],
  ["nosys2",  "Trừ: Thiếu ảnh hệ thống/IDE từ 3 bài"],
  ["nosys05", "Trừ: Thiếu ảnh hệ thống/IDE 1–2 bài"],
  ["debai", "Trừ: Bài tự luyện không có đề bài"],
  ["late",  "Trừ: Nộp muộn"],
  ["bonus", "Cộng: mỗi bài tự luyện"],
  ["cap",   "Điểm trần (để trống = không giới hạn)"],
];
