// Chuyển tab Nội quy / Nộp báo cáo / Chấm điểm (hỗ trợ #noi-quy, #nop-bao-cao, #cham-diem)
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role="tab"]'));
  function show(name, focus) {
    if (!tabs.some(function (t) { return t.dataset.tab === name; })) name = "noi-quy";
    tabs.forEach(function (t) {
      var on = t.dataset.tab === name;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById("p-" + t.dataset.tab).hidden = !on;
      if (on && focus) t.focus();
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () {
      show(t.dataset.tab);
      try { history.replaceState(null, "", "#" + t.dataset.tab); } catch (e) {}
    });
    t.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      show(n.dataset.tab, true);
    });
  });
  show((location.hash || "").slice(1));
  window.addEventListener("hashchange", function () { show(location.hash.slice(1)); });
})();
