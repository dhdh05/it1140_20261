/* Tab Chấm điểm: tick lỗi + bài tự luyện → ra điểm, copy điểm/phản hồi dán vào Teams.
   Chạy sau khi js/include.js ghép xong sections/cham-diem.html. */
document.addEventListener("partials:ready", () => {
  const $ = id => document.getElementById(id);
  if (!$("p-cham-diem")) return;
  /* ---------- khoá tab: so mã băm SHA-256 của chuỗi nhập ---------- */
  const LOCK = "1a0f564ddc6039457b2fb26b3d6a316c15eba20a886449847c3210c35821a693";
  const UKEY = "it1140-cd-open";
  const sha256 = async t => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)))]
    .map(b => b.toString(16).padStart(2, "0")).join("");
  function unlock() { $("cd-lock").hidden = true; $("cd-body").hidden = false; }
  try { if (sessionStorage.getItem(UKEY) === LOCK) unlock(); } catch (e) {}
  $("cd-lock").addEventListener("submit", async e => {
    e.preventDefault();
    let ok = false;
    try { ok = (await sha256($("cd-pass").value)) === LOCK; } catch (err) {}
    $("cd-pass").value = "";
    if (!ok) { $("cd-lock-err").hidden = false; return; }
    try { sessionStorage.setItem(UKEY, LOCK); } catch (err) {}
    unlock();
  });

  const num = x => String(Math.round(x * 100) / 100);
  const SKEY = "it1140-tinhdiem-settings";

  let settings = { ...DEFAULT_SETTINGS };
  try { Object.assign(settings, JSON.parse(localStorage.getItem(SKEY)) || {}); } catch (e) {}
  let buoi = BUOI[0];
  try { buoi = BUOI.find(b => b.id === localStorage.getItem("it1140-tinhdiem-tab")) || buoi; } catch (e) {}
  let m = { ex: {} };

  function toast(msg) {
    const t = $("cd-toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toast.h); toast.h = setTimeout(() => (t.hidden = true), 1600);
  }

  /* ---------- vẽ giao diện ---------- */
  function renderTabs() {
    $("cd-tabs").innerHTML = BUOI.map(b =>
      `<button type="button" data-b="${b.id}" aria-pressed="${b === buoi}">${b.id}</button>`).join("");
  }
  function valueOf(e) {
    if (e.kind === "half") return "½";
    if (e.kind === "zero") return "0đ";
    return "−" + num(settings[e.key]);
  }
  function renderErrors() {
    $("cd-errs").innerHTML = ERRORS.map(e =>
      `<label class="cd-toggle ${e.kind}"><input type="checkbox" data-f="${e.id}"${e.group ? ` data-group="${e.group}"` : ""}${m[e.id] ? " checked" : ""}>
        <span class="cd-label">${e.label}</span><span class="cd-val">${valueOf(e)}</span></label>`).join("");
  }
  function renderEx() {
    $("cd-topic").textContent = buoi.title;
    $("cd-exlist").innerHTML = buoi.ex.map(([k, t]) =>
      `<label class="cd-ex"><input type="checkbox" data-ex="${k}"${m.ex[k] ? " checked" : ""}>
        <span class="cd-ex-num">${k}</span><span class="cd-ex-name">${t}</span></label>`).join("");
  }
  function renderSettings() {
    $("cd-settings").innerHTML = SETTING_FIELDS.map(([k, label]) =>
      `<label><span>${label}</span><input type="number" step="0.05" min="0" data-k="${k}" value="${settings[k] ?? ""}"></label>`).join("") +
      `<label><span>Thiếu 1 file: chia đôi cả điểm cộng</span>
        <select data-k="halfAll"><option value="1"${settings.halfAll ? " selected" : ""}>Có</option><option value="0"${settings.halfAll ? "" : " selected"}>Không</option></select></label>
       <div><button class="cd-btn" id="cd-default" type="button">Khôi phục mặc định</button></div>`;
  }

  /* ---------- tính và hiển thị điểm ---------- */
  function feedbackLines(r) {
    if (m.cheat) return [`Báo cáo ${buoi.id}: 0 điểm do gian lận.`];
    const L = [];
    const errs = ERRORS.filter(e => e.key && m[e.id]);
    if (errs.length) {
      L.push("Lỗi bị trừ điểm:");
      errs.forEach(e => L.push(`- ${e.fb || e.label} (−${num(settings[e.key])})`));
    }
    if (m.half) L.push("- Thiếu 1 trong 2 file (.pdf/.zip) nên chỉ được nửa số điểm.");
    const ex = buoi.ex.filter(([k]) => m.ex[k]).map(([k]) => k);
    if (ex.length) L.push(m.ai
      ? `Bài tự luyện ${ex.join(", ")} có dấu hiệu lạm dụng AI nên không được cộng điểm.`
      : `Bài tự luyện được cộng: ${ex.join(", ")} (+${num(r.cong)}).`);
    if (!L.length) L.push("Báo cáo đạt yêu cầu.");
    return L;
  }
  function syncAll() {
    const n = buoi.ex.filter(([k]) => m.ex[k]).length;
    const all = $("cd-exall");
    all.checked = n === buoi.ex.length;
    all.indeterminate = n > 0 && n < buoi.ex.length;
  }
  function update() {
    syncAll();
    const r = computeScore(m, buoi, settings);
    $("cd-buoi").textContent = buoi.id;
    $("cd-final").textContent = num(r.final);
    $("cd-tru").textContent = r.tru ? "−" + num(r.tru) : "0";
    $("cd-cong").textContent = r.cong ? "+" + num(r.cong) : "0";
    $("cd-flag").textContent = r.flag;
    $("cd-score").dataset.state = m.cheat ? "zero" : m.half ? "half" : r.final >= Number(settings.base) ? "good" : r.tru ? "minus" : "";
    $("cd-note").value = feedbackLines(r).join("\n");
    $("cd-base").textContent = num(settings.base);
    $("cd-bonus").textContent = `+${num(settings.bonus)} / bài`;
    return r;
  }
  function renderAll() { renderTabs(); renderErrors(); renderEx(); $("cd-ai").checked = !!m.ai; update(); }

  /* ---------- sự kiện ---------- */
  $("cd-tabs").addEventListener("click", e => {
    const b = e.target.closest("[data-b]"); if (!b) return;
    buoi = BUOI.find(x => x.id === b.dataset.b);
    try { localStorage.setItem("it1140-tinhdiem-tab", buoi.id); } catch (err) {}
    m = { ex: {} };                    // đổi buổi = chấm bài mới
    renderAll();
  });
  document.querySelector(".cd-main").addEventListener("change", e => {
    const t = e.target;
    if (t.closest("#cd-settings")) return;
    if (t.dataset.f) {
      m[t.dataset.f] = t.checked;
      // các mức trong cùng nhóm chỉ chọn được 1 (vd. thiếu ảnh từ 3 bài −2 / 1–2 bài −0.5)
      if (t.checked && t.dataset.group) document.querySelectorAll(`#cd-errs input[data-group="${t.dataset.group}"]`).forEach(o => {
        if (o !== t) { o.checked = false; m[o.dataset.f] = false; }
      });
    }
    else if (t.dataset.ex) m.ex[t.dataset.ex] = t.checked;
    else if (t.id === "cd-ai") m.ai = t.checked;
    else if (t.id === "cd-exall") { buoi.ex.forEach(([k]) => (m.ex[k] = t.checked)); renderEx(); }
    else return;
    update();
  });
  $("cd-settings").addEventListener("input", e => {
    const k = e.target.dataset.k; if (!k) return;
    const v = e.target.value;
    settings[k] = k === "halfAll" ? v === "1" : (v === "" ? (k === "cap" ? null : 0) : Number(v));
    try { localStorage.setItem(SKEY, JSON.stringify(settings)); } catch (err) {}
    renderErrors(); update();
  });
  $("cd-settings").addEventListener("click", e => {
    if (e.target.id !== "cd-default") return;
    settings = { ...DEFAULT_SETTINGS };
    try { localStorage.removeItem(SKEY); } catch (err) {}
    renderSettings(); renderErrors(); update();
  });

  async function copy(text, msg, html) {
    try {
      if (html && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({
          "text/plain": new Blob([text], { type: "text/plain" }),
          "text/html": new Blob([html], { type: "text/html" }) })]);
      } else await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); ta.remove();
    }
    toast(msg);
  }
  $("cd-copyscore").addEventListener("click", () => { const r = update(); copy(num(r.final), `Đã copy điểm ${num(r.final)}`); });
  // copy kèm HTML để Teams hiện dấu đầu dòng và xuống dòng đúng
  function toHtml(text) {
    const esc = t => t.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    let out = "", inList = false;
    for (const line of text.split("\n")) {
      if (line.startsWith("- ")) { if (!inList) { out += "<ul>"; inList = true; } out += `<li>${esc(line.slice(2))}</li>`; }
      else { if (inList) { out += "</ul>"; inList = false; } if (line.trim()) out += `<p>${esc(line)}</p>`; }
    }
    return out + (inList ? "</ul>" : "");
  }
  $("cd-copynote").addEventListener("click", () => { const t = $("cd-note").value; copy(t, "Đã copy phản hồi", toHtml(t)); });

  function reset() {
    m = { ex: {} }; renderAll();
    $("p-cham-diem").scrollIntoView({ behavior: "smooth", block: "start" });
    toast("Sẵn sàng chấm bài tiếp theo");
  }
  $("cd-reset").addEventListener("click", reset);
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape" || $("p-cham-diem").hidden || $("cd-body").hidden) return;      // chỉ khi đang ở tab Chấm điểm và đã mở khoá
    if (e.target.closest("input[type=number], select, textarea")) return;
    reset();
  });

  renderSettings();
  renderAll();
});
