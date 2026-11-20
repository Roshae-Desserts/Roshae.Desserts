// Scroll motion: hero photo drift and sliding TIRAMISU / ROSHAE bands.
(() => {
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
// smooth-scroll motion: hero photo drifts, TIRAMISU rows slide in opposite directions
if (!reduce) {
  const img = document.getElementById("heroImg");
  const bands = [...document.querySelectorAll(".stack, .rband")].map(el => ({ el, rows: [...el.querySelectorAll("div")] }));
  let tick = false;
  const update = () => {
    const y = scrollY, vh = innerHeight;
    if (img) img.style.transform = "translateY(" + (-Math.min(y, vh) * 0.08) + "px)";
    bands.forEach(({ el, rows }) => {
      const b = el.getBoundingClientRect();
      const p = (vh - b.top) / (vh + b.height);          // 0 → 1 as the band crosses the screen
      rows.forEach(r => { r.style.transform = "translateX(" + (r.dataset.dir * (p - .5) * 30) + "vw)"; });
    });
    tick = false;
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
})();
