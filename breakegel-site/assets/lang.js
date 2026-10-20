// Choix de la langue : préférence enregistrée, sinon langue du navigateur (français ou anglais).
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var nav = (navigator.language || 'en').toLowerCase();
  var lang = saved || (nav.indexOf('fr') === 0 ? 'fr' : 'en');

  function apply(l) {
    root.lang = l;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('on', el.getAttribute('data-lang') === l);
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set') === l ? 'true' : 'false');
    });
    var title = document.querySelector('meta[name="title-' + l + '"]');
    if (title) document.title = title.getAttribute('content');
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-set');
        try { localStorage.setItem('lang', l); } catch (e) {}
        apply(l);
      });
    });
  });
})();
