/* =========================================================
   ЕДИНАЯ ССЫЛКА ДЛЯ ВСЕХ САЙТОВ
   Вставьте свою ссылку между кавычками — и все кнопки
   «Сайт сделан Татьяной Желиховской», «Записаться» и т.п.
   на всех страницах сразу поведут туда.
   ========================================================= */
window.TATIANA_LINK = "https://tatianaanatolievnadta-ops.github.io/TatianaZhelihovskaya/index.html";

(function () {
  var css = `
  .tz-badge{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;
    display:inline-flex;align-items:center;gap:10px;padding:11px 20px 11px 12px;border-radius:999px;
    background:rgba(12,10,9,.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
    border:1px solid rgba(201,164,92,.55);color:#F4EEE4;text-decoration:none;
    font:500 13px/1 'Manrope',system-ui,sans-serif;letter-spacing:.04em;white-space:nowrap;
    box-shadow:0 10px 40px rgba(0,0,0,.45);transition:transform .35s ease,border-color .35s,background .35s}
  .tz-badge:hover{transform:translateX(-50%) translateY(-3px);border-color:#E3C886;background:rgba(122,20,32,.9)}
  .tz-badge i{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;
    background:linear-gradient(135deg,#E9D29A,#B48A3C);color:#120f0c;font:italic 600 13px/1 'Cormorant Garamond',Georgia,serif}
  .tz-badge b{color:#E3C886;font-weight:600}
  @media(max-width:520px){.tz-badge{font-size:11.5px;padding:9px 14px 9px 9px;bottom:12px}}`;
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

  function apply() {
    if (!document.querySelector('.tz-badge') && !document.body.hasAttribute('data-no-badge')) {
      var a = document.createElement('a');
      a.className = 'tz-badge'; a.setAttribute('data-tl', '');
      a.innerHTML = '<i>TZ</i>Сайт сделан <b>Татьяной Желиховской</b>';
      document.body.appendChild(a);
    }
    document.querySelectorAll('[data-tl]').forEach(function (el) {
      el.href = window.TATIANA_LINK; el.target = '_blank'; el.rel = 'noopener';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
