document.addEventListener("DOMContentLoaded",()=>{

/* OPEN */
const openBtn=document.getElementById("openBtn");
const opening=document.getElementById("opening");
const main=document.getElementById("main");
const music=document.getElementById("music");
const toggle=document.getElementById("musicToggle");

openBtn.onclick=()=>{
  opening.style.display="none";
  main.style.display="block";
  music.play().catch(()=>{});
}

/* MUSIC TOGGLE */
toggle.onclick=()=>{
  if(music.paused){
    music.play();
    toggle.textContent="🔊";
  }else{
    music.pause();
    toggle.textContent="🔇";
  }
}

/* COUNTDOWN */
const target=new Date("2026-01-12 09:00").getTime();
setInterval(()=>{
  const diff=target-Date.now();
  const el=document.getElementById("countdown");
  if(diff<=0){el.textContent="Hari Bahagia ❤️";return;}
  el.textContent=
    Math.floor(diff/86400000)+" Hari "+
    Math.floor(diff%86400000/3600000)+" Jam "+
    Math.floor(diff%3600000/60000)+" Menit";
},1000);

/* SCROLL REVEAL */
const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.2});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

/* QRIS MODAL */
const qrisThumb=document.getElementById("qrisThumb");
const qrisModal=document.getElementById("qrisModal");
const qrisClose=document.getElementById("qrisClose");

qrisThumb.onclick=()=>qrisModal.classList.add("show");
qrisClose.onclick=()=>qrisModal.classList.remove("show");
qrisModal.onclick=e=>{
  if(e.target===qrisModal)qrisModal.classList.remove("show");
}

/* COMMENTS */
const form=document.getElementById("commentForm");
const list=document.getElementById("commentList");

function load(){
  list.innerHTML="";
  JSON.parse(localStorage.getItem("comments")||"[]")
    .forEach(c=>{
      const d=document.createElement("div");
      d.innerHTML=`<strong>${c.name}</strong><br>${c.msg}`;
      list.appendChild(d);
    });
}
form.onsubmit=e=>{
  e.preventDefault();
  const data=JSON.parse(localStorage.getItem("comments")||"[]");
  data.push({name:name.value,msg:message.value});
  localStorage.setItem("comments",JSON.stringify(data));
  form.reset();load();
}
load();

/* GOLD DUST HERO */
const canvas=document.getElementById("heroDust");
const ctx=canvas.getContext("2d");
let w,h;
function resize(){
  w=canvas.width=window.innerWidth;
  h=canvas.height=canvas.parentElement.offsetHeight;
}
window.onresize=resize;resize();

const dots=Array.from({length:60},()=>({
  x:Math.random()*w,
  y:Math.random()*h,
  r:Math.random()*2+1,
  v:Math.random()*0.5+0.2
}));

(function animate(){
  ctx.clearRect(0,0,w,h);
  dots.forEach(d=>{
    ctx.fillStyle="rgba(214,177,94,.7)";
    ctx.beginPath();
    ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
    ctx.fill();
    d.y-=d.v;if(d.y<0)d.y=h;
  });
  requestAnimationFrame(animate);
})();

});
/* =========================
   GALLERY SWIPE
========================= */
const track = document.getElementById("galleryTrack");

if (track) {
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  track.addEventListener("touchend", () => {
    isDragging = false;
    prevTranslate = currentTranslate;
  });
}
