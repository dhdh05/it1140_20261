/* Tính điểm cho 1 sinh viên trong 1 buổi. Trả về { tru, cong, final, flag } */
function computeScore(m, buoi, st) {
  const n = buoi.ex.filter(([k]) => m.ex && m.ex[k]).length;
  const tru = ERRORS.filter(e => e.key && m[e.id]).reduce((s, e) => s + Number(st[e.key] || 0), 0);
  const cong = m.ai ? 0 : n * Number(st.bonus || 0);
  if (m.cheat) return { tru, cong, final: 0, flag: "Gian lận → 0 điểm" };
  const base = Number(st.base);
  let s = m.half
    ? (st.halfAll ? (base - tru + cong) / 2 : (base - tru) / 2 + cong)
    : base - tru + cong;
  if (st.cap !== null && st.cap !== "" && !isNaN(st.cap)) s = Math.min(Number(st.cap), s);
  s = Math.max(0, s);
  return { tru, cong, final: Math.round(s * 100) / 100, flag: m.half ? "Thiếu 1 file → chia đôi" : "" };
}
const fmt = x => (Math.round(x * 100) / 100).toFixed(2);
