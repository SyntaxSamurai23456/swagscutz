// Basic helpers
const byId = id => document.getElementById(id);
const q = s => document.querySelector(s);
const qAll = s => Array.from(document.querySelectorAll(s));

// MOBILE NAV
const mobileToggle = q("#mobileToggle");
const nav = q(".nav");
mobileToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
  mobileToggle.classList.toggle("active");
});

// YEAR
document.addEventListener("DOMContentLoaded", ()=> {
  const y = new Date().getFullYear();
  const yEl = document.getElementById("year");
  const y2 = document.getElementById("year2");
  if(yEl) yEl.textContent = y;
  if(y2) y2.textContent = y;
});

// SCROLL REVEAL
const revealElems = qAll(".card, .section, .split, .menu-category");
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add("reveal");
      obs.unobserve(e.target);
    }
  });
},{threshold: 0.18});

revealElems.forEach(el => {
  el.classList.add("is-hidden");
  io.observe(el);
});

// HERO PARALLAX (video moves subtly)
const heroVideo = q(".hero-video");
window.addEventListener("scroll", () => {
  const sc = window.scrollY;
  if(heroVideo) heroVideo.style.transform = `translateY(${sc * 0.18}px) scale(1.02)`;
});

// MENU FILTERS & SEARCH (menu.html)
(function menuFilters(){
  const filters = qAll(".mfilter");
  const allCategories = qAll(".menu-category");
  const search = q("#menuSearch");

  const applyFilter = (cat) => {
    allCategories.forEach(sec => {
      if(cat === 'all' || sec.dataset.cat === cat) sec.style.display = '';
      else sec.style.display = 'none';
    });
    filters.forEach(f => f.classList.toggle('active', f.dataset.cat === cat));
  };

  filters.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.cat));
  });

  if(search){
    search.addEventListener('input', (e) => {
      const term = e.target.value.trim().toLowerCase();
      if(!term){
        allCategories.forEach(sec=>sec.style.display='');
        return;
      }
      allCategories.forEach(sec=>{
        let any = false;
        const items = sec.querySelectorAll('.item');
        items.forEach(it=>{
          const text = it.innerText.toLowerCase();
          const match = text.includes(term);
          it.style.display = match ? '' : 'none';
          if(match) any = true;
        });
        sec.style.display = any ? '' : 'none';
      });
    });
  }
})();

// Menu Highlights small filter (index.html)
(function highlightFilters(){
  const filters = qAll(".filter");
  const cards = qAll(".card");
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      cards.forEach(c => {
        if(cat === 'all' || c.dataset.cat === cat) c.style.display = '';
        else c.style.display = 'none';
      });
    });
  });
})();

