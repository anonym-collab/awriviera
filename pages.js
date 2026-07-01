/* ===== AW Riviera — moteur bilingue + animations (pages internes) ===== */
function setLang(lang){
  if(!window.I18N || !window.I18N[lang]) return;
  const dict = window.I18N[lang];
  document.documentElement.lang = lang;
  try{ localStorage.setItem('aw_lang', lang); }catch(e){}
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const v = dict[el.getAttribute('data-i18n')];
    if(v == null) return;
    if(el.hasAttribute('data-i18n-html')) el.innerHTML = v; else el.textContent = v;
  });
  document.querySelectorAll('#lang-toggle button').forEach(b=>{
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  // langue mémorisée (partagée avec la page d'accueil)
  let saved = 'fr';
  try{ saved = localStorage.getItem('aw_lang') || 'fr'; }catch(e){}
  setLang(saved);

  // apparition au défilement
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.12, rootMargin:'0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
});
