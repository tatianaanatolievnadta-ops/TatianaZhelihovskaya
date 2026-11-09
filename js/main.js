document.getElementById("y") && (document.getElementById("y").textContent = new Date().getFullYear());

const els = document.querySelectorAll(".reveal");
function showReveal(el) {
  el.classList.add("visible");
  el.classList.add("is-visible");
}
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          showReveal(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "80px 0px 80px 0px" }
  );
  els.forEach((el) => {
    io.observe(el);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight + 80 && r.bottom > -80) showReveal(el);
  });
  setTimeout(() => els.forEach(showReveal), 1200);
} else {
  els.forEach(showReveal);
}

const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* Multiki viewer: thumbs + prev/next */
(function () {
  const root = document.querySelector("[data-viewer]");
  if (!root) return;
  const video = root.querySelector("#viewer-video");
  const caption = root.querySelector("#viewer-caption");
  const thumbs = [...root.querySelectorAll(".viewer-thumb")];
  if (!video || !thumbs.length) return;

  let i = Math.max(0, thumbs.findIndex((t) => t.classList.contains("is-active")));

  function playAt(idx) {
    i = (idx + thumbs.length) % thumbs.length;
    const t = thumbs[i];
    thumbs.forEach((el) => el.classList.toggle("is-active", el === t));
    video.pause();
    video.poster = t.dataset.poster || "";
    video.src = t.dataset.src;
    video.load();
    if (caption) caption.textContent = t.dataset.title || "";
    video.play().catch(() => {});
  }

  thumbs.forEach((t, idx) => t.addEventListener("click", () => playAt(idx)));
  root.querySelector("[data-prev]")?.addEventListener("click", () => playAt(i - 1));
  root.querySelector("[data-next]")?.addEventListener("click", () => playAt(i + 1));
})();
