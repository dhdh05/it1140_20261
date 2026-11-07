// Ghép các phần nội dung trong sections/ vào trang (thẻ có data-include)
// Cần mở qua web server (Cloudflare Pages, hoặc chạy thử: python -m http.server)
(function () {
  var slots = Array.prototype.slice.call(document.querySelectorAll("[data-include]"));
  Promise.all(slots.map(function (el) {
    var src = el.getAttribute("data-include");
    return fetch(src).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (html) {
      el.outerHTML = html;
    }, function () {
      el.innerHTML = '<p class="note">Không tải được <code>' + src + '</code>. Mở trang qua web server, không mở trực tiếp file.</p>';
    });
  })).then(function () {
    // Công cụ tạo tên file nằm trong sections/, chỉ chạy sau khi đã ghép xong
    var s = document.createElement("script");
    s.src = "js/filename.js";
    document.body.appendChild(s);
    // Báo cho các script khác (tab Chấm điểm) biết nội dung đã ghép xong
    document.dispatchEvent(new Event("partials:ready"));
  });
})();
