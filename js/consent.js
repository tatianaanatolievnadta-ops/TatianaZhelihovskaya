/*
 * Баннер cookie: выбор «Принять» или «Только необходимые».
 * Счётчики статистики (например, Яндекс Метрика) запускаются ТОЛЬКО после «Принять».
 * Чтобы подключить Метрику, впишите номер счётчика в YM_ID.
 * Ссылку «Настройки cookie» на любой странице можно сделать так: <a href="#" data-cookie-settings>…</a>
 */
(function () {
  var YM_ID = '';            // номер счётчика Яндекс Метрики, если появится
  var KEY = 'tj-consent-v2'; // 'all' | 'necessary'
  var base = (document.currentScript && document.currentScript.src || '').replace(/js\/consent\.js.*$/, '');

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); localStorage.setItem(KEY + '-at', new Date().toISOString()); } catch (e) {} }

  function loadAnalytics() {
    if (!YM_ID || window.ym) return;
    (function (m, e, t, r, i, k, a) { m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date(); k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a); })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    window.YM_ID = YM_ID;
    window.ym(YM_ID, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true });
  }
  window.tjConsent = { get: get, analyticsAllowed: function () { return get() === 'all'; } };

  var css = '.tjc{position:fixed;z-index:9999;left:max(12px,env(safe-area-inset-left,0px));right:max(12px,env(safe-area-inset-right,0px));bottom:max(12px,env(safe-area-inset-bottom,0px));max-width:420px;margin:0 auto;padding:16px 18px;border-radius:16px;border:1px solid rgba(201,160,99,.5);background:rgba(20,10,10,.97);color:#F3E9DD;font:14px/1.5 Manrope,Nunito,system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.45)}' +
    '@media(min-width:720px){.tjc{left:auto;margin:0}}' +
    '.tjc p{margin:0;color:#F3E9DD}.tjc a{color:#E0C08A;text-decoration:underline;text-underline-offset:2px}' +
    '.tjc-row{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}' +
    '.tjc button{flex:1 1 150px;min-height:44px;border-radius:999px;cursor:pointer;font:700 13px/1.2 Manrope,Nunito,system-ui,sans-serif;padding:10px 14px}' +
    '.tjc .tjc-all{border:0;color:#140A0A;background:linear-gradient(135deg,#C5A070,#E0C08A)}' +
    '.tjc .tjc-min{border:1px solid rgba(224,192,138,.6);color:#F3E9DD;background:transparent}' +
    '.tjc button:focus-visible{outline:3px solid #E0C08A;outline-offset:2px}';

  function show() {
    if (document.querySelector('.tjc')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div');
    d.className = 'tjc'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Согласие на использование cookie');
    d.innerHTML = '<p>Сайт использует cookie и похожие технологии. Необходимые нужны для работы сайта и запоминания вашего выбора. ' +
      'Статистические включаются только с вашего согласия. Подробнее в <a href="' + base + 'cookies.html">политике cookie</a> ' +
      'и <a href="' + base + 'privacy.html">политике обработки персональных данных</a>.</p>' +
      '<div class="tjc-row"><button type="button" class="tjc-min">Только необходимые</button><button type="button" class="tjc-all">Принять все</button></div>';
    document.body.appendChild(d);
    d.querySelector('.tjc-all').onclick = function () { set('all'); d.remove(); loadAnalytics(); };
    d.querySelector('.tjc-min').onclick = function () { set('necessary'); d.remove(); };
  }

  function init() {
    // старое согласие «Понятно» не считается выбором: спрашиваем заново
    try { localStorage.removeItem('tj-cookie-accepted'); } catch (e) {}
    var old = document.getElementById('cookie-banner'); if (old) old.remove();
    var c = get();
    if (c === 'all') loadAnalytics();
    else if (!c) show();
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (a) { e.preventDefault(); try { localStorage.removeItem(KEY); } catch (er) {} show(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
