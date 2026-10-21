/* Все ссылки на оплату — сюда. Пустая строка = ведём в Telegram. */
const BUY_LINKS = {
  pesnya: "",
  "novyi-god": "",
  fotosessiya: "",
  oblozhki: "",
  multik: "",
  rils: "",
  avatar: "",
  marketplace: "",
  sait: "",
  bot: "",
  paket: "",
};

const TELEGRAM_BUY = "https://t.me/tatiana_tandem";

function resolveBuy(slug) {
  const link = BUY_LINKS[slug];
  if (link && String(link).trim()) return { href: link, label: "Купить" };
  return { href: TELEGRAM_BUY, label: "Написать, чтобы купить" };
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-buy]").forEach((el) => {
    const slug = el.getAttribute("data-buy");
    const { href, label } = resolveBuy(slug);
    el.setAttribute("href", href);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
    if (el.dataset.keepLabel !== "true") {
      el.textContent = label;
    }
  });

  const y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  document.querySelectorAll(".faq-item summary").forEach((summary) => {
    summary.addEventListener("click", () => {
      const details = summary.parentElement;
      document.querySelectorAll(".faq-item").forEach((d) => {
        if (d !== details) d.open = false;
      });
    });
  });

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
});
