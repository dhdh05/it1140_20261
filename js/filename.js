// Công cụ tạo tên file chuẩn
(function () {
  var ids = ["f-mssv", "f-name", "f-lop", "f-tuan", "f-bc", "f-cau", "f-ky"];
  var el = {};
  ids.forEach(function (id) { el[id] = document.getElementById(id); });
  var out = document.getElementById("out");
  function noAccent(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D"); }
  function camel(name) {
    return noAccent(name).trim().split(/\s+/).filter(Boolean)
      .map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); })
      .join("").replace(/[^A-Za-z0-9]/g, "");
  }
  function val(id, ph) { var v = el[id].value.trim(); return v || ph; }
  function render() {
    var mssv = val("f-mssv", "2026188888").replace(/\s/g, "");
    var name = camel(el["f-name"].value) || "PhungThanhDo";
    var lop = val("f-lop", "768072").replace(/\s/g, "");
    var tuan = String(parseInt(val("f-tuan", "8").replace(/\D/g, ""), 10) || 8);
    var bc = val("f-bc", "1").replace(/\D/g, "") || "1";
    bc = bc.length < 2 ? ("0" + bc) : bc;
    var cau = val("f-cau", "1.2.1").replace(/[^0-9.]/g, "") || "1.2.1";
    var ky = val("f-ky", "20261").replace(/\D/g, "") || "20261";
    var core = mssv + "_" + name + "_IT1140_" + ky + "_" + lop + "_Tuan" + tuan;
    var base = core + "_BTH" + bc;
    var names = [["pdf", base + ".pdf"], ["doc", base + ".docx"], ["zip", base + ".zip"], ["py", "Bai" + cau + "_" + core + ".py"]];
    out.innerHTML = "";
    names.forEach(function (pair) {
      var n = pair[1];
      var row = document.createElement("div"); row.className = "row";
      var ic = document.createElement("span"); ic.className = "ficon " + pair[0]; ic.textContent = pair[0] === "doc" ? "DOC" : pair[0].toUpperCase();
      var t = document.createElement("span"); t.className = "mono"; t.textContent = n;
      var b = document.createElement("button"); b.type = "button"; b.textContent = "Sao chép";
      b.addEventListener("click", function () {
        var done = function () { b.textContent = "Đã chép"; setTimeout(function () { b.textContent = "Sao chép"; }, 1400); };
        var fallback = function () {
          var r = document.createRange(); r.selectNodeContents(t);
          var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
          b.textContent = "Đã chọn, nhấn Ctrl+C";
          setTimeout(function () { b.textContent = "Sao chép"; }, 2000);
        };
        try { navigator.clipboard.writeText(n).then(done, fallback); } catch (e) { fallback(); }
      });
      row.appendChild(ic); row.appendChild(t); row.appendChild(b); out.appendChild(row);
    });
  }
  ids.forEach(function (id) { el[id].addEventListener("input", render); });
  render();
})();
