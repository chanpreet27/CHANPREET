
/* LOADER */
window.addEventListener('load', () => { setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1400); });

/* CURSOR */
const dot = document.getElementById('cursorDot'), ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
(function animRing(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing); })();
document.querySelectorAll('a,button,.proj-card,.skill-category').forEach(el => {
  el.addEventListener('mouseenter',()=>{ring.style.width='60px';ring.style.height='60px';ring.style.opacity='.4';});
  el.addEventListener('mouseleave',()=>{ring.style.width='36px';ring.style.height='36px';ring.style.opacity='.6';});
});

/* NAVBAR */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{ navbar.classList.toggle('scrolled',scrollY>60); document.getElementById('backTop').classList.toggle('show',scrollY>400); },{passive:true});

/* HAMBURGER */
function toggleMenu(){ document.getElementById('navLinks').classList.toggle('open'); }
function closeMenu(){ document.getElementById('navLinks').classList.remove('open'); }

/* TYPED TITLE */
const titles=['AI Researcher & Product Builder','CS Undergraduate @ DU','RAG & Intelligent Systems','Independent Builder'];
let ti=0,ci=0,del=false;
const tyEl=document.getElementById('typedTitle');
function typeLoop(){
  const cur=titles[ti];
  if(del){ tyEl.textContent=cur.slice(0,--ci); if(!ci){del=false;ti=(ti+1)%titles.length;setTimeout(typeLoop,400);return;} }
  else { tyEl.textContent=cur.slice(0,++ci); if(ci===cur.length){del=true;setTimeout(typeLoop,1800);return;} }
  setTimeout(typeLoop,del?60:110);
}
setTimeout(typeLoop,1200);

/* MARQUEE */
const chips1=[{i:'🔍',t:'RAG Systems'},{i:'🐍',t:'Python'},{i:'🧠',t:'Iterative Chunking'},{i:'🤖',t:'Computer Vision'},{i:'🌐',t:'React'},{i:'⚡',t:'Gemini API'},{i:'📊',t:'RAGAS Evaluation'},{i:'🛠️',t:'Ollama Cloud'},{i:'💻',t:'Systems Design'},{i:'🎯',t:'NLP'},{i:'✨',t:'Prompt Engineering'},{i:'⚙️',t:'Automation'}];
const chips2=[{i:'🎓',t:'University of Delhi'},{i:'📂',t:'Git & GitHub'},{i:'🐧',t:'Ubuntu & WSL'},{i:'🚀',t:'CS.AI Platform'},{i:'🔒',t:'Steganography'},{i:'🚦',t:'Traffic Mind AI'},{i:'🖥️',t:'180.OS Project'},{i:'📝',t:'Technical Writing'},{i:'🔮',t:'AI Agents'},{i:'☁️',t:'Vercel & Supabase'},{i:'🌍',t:'Open Source'}];
function buildTrack(id,arr){ const t=document.getElementById(id); t.innerHTML=[...arr,...arr,...arr].map(c=>`<div class="marquee-item"><div class="marquee-chip"><span>${c.i}</span>${c.t}</div></div>`).join(''); }
buildTrack('track1',chips1); buildTrack('track2',chips2);

/* SCROLL REVEAL */
const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{rootMargin:'0px 0px -60px 0px',threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* SKILL BARS */
const bObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.skill-fill').forEach(b=>b.style.width=b.dataset.pct+'%');}),{threshold:.3});
document.querySelectorAll('.skill-category').forEach(el=>bObs.observe(el));

/* STAGGER */
document.querySelectorAll('.skills-grid .skill-category,.projects-grid .proj-card,.ach-grid .ach-item,.edu-grid .edu-card,.timeline .exp-item').forEach((el,i)=>el.style.transitionDelay=(i*.08)+'s');

/* HERO GLOW parallax */
const heroGlow=document.getElementById('heroGlow');
window.addEventListener('mousemove',e=>{
  if(!heroGlow)return;
  const x=(e.clientX/innerWidth-.5)*60, y=(e.clientY/innerHeight-.5)*60;
  heroGlow.style.transform=`translate(calc(-50% + ${x}px),calc(-50% + ${y}px))`;
},{passive:true});

