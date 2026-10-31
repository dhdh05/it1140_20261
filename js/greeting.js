// Lời chào theo giờ trong ngày + lời chúc ngẫu nhiên
(function () {
  var h = new Date().getHours();
  var hello = h >= 5 && h < 11 ? "Chào buổi sáng!" : h >= 11 && h < 13 ? "Chào buổi trưa!" : h >= 13 && h < 18 ? "Chào buổi chiều!" : h >= 18 && h < 22 ? "Chào buổi tối!" : "Khuya rồi đó!";
  var wishes = h >= 22 || h < 5 ? [
    "Nhớ lưu bài rồi đi ngủ sớm nhé, mai code sẽ dễ hơn.",
    "Bài chưa xong thì để mai làm tiếp, sức khỏe quan trọng hơn."
  ] : [
    "Chúc các bạn một buổi thực hành thật hiệu quả.",
    "Chúc code của bạn chạy đúng ngay từ lần đầu!",
    "Chúc testcase nào cũng xanh lá.",
    "Gặp lỗi đừng nản, đọc kỹ thông báo lỗi là thấy hướng sửa.",
    "Nhớ đặt tên file đúng chuẩn trước khi nộp nhé.",
    "Học vui, code khỏe, nộp bài đúng hạn!"
  ];
  try {
    document.getElementById("greet-h").textContent = hello;
    document.getElementById("greet-w").textContent = wishes[Math.floor(Math.random() * wishes.length)];
  } catch (e) {}
})();
