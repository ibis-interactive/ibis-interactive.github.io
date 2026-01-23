;(function(){
  const DEFAULT_LANG = 'es';

  function getUrlLang(){
    try{ const p = new URLSearchParams(window.location.search); return p.get('lang'); }catch(e){return null}
  }

  function applyTranslations(data){
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      const key = el.getAttribute('data-i18n');
      if(!key) return;
      const val = data.hasOwnProperty(key) ? data[key] : null;
      if(val !== null && val !== undefined){
        if(el.hasAttribute('data-i18n-html')){
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });
  }

  function loadLang(lang){
    if(!lang) lang = DEFAULT_LANG;
    fetch('/assets/i18n/' + lang + '.json', {cache: 'no-cache'})
      .then(function(r){ if(!r.ok) throw new Error('Missing translations'); return r.json(); })
      .then(function(data){ applyTranslations(data); document.documentElement.lang = lang; })
      .catch(function(){ if(lang !== DEFAULT_LANG) loadLang(DEFAULT_LANG); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    const urlLang = getUrlLang();
    const saved = localStorage.getItem('site_lang');
    const lang = urlLang || saved || DEFAULT_LANG;
    loadLang(lang);

    document.querySelectorAll('.lang-switch').forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        const l = el.getAttribute('data-lang');
        if(!l) return;
        localStorage.setItem('site_lang', l);
        loadLang(l);
      });
    });
  });
})();
