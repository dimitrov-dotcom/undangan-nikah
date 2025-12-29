document.addEventListener("DOMContentLoaded",()=>{

const openBtn=document.getElementById("openBtn");
const opening=document.getElementById("opening");
const main=document.getElementById("main");
const music=document.getElementById("music");
const musicToggle=document.getElementById("musicToggle");

/* OPEN */
openBtn.addEventListener("click",()=>{
  opening.style.display="none";
  main.style.display="block";
  window.scrollTo(0,0);
  music.play().catch(()=>{});
  musicToggle.classList.add("playing","active");
});

/* MUSIC TOGGLE */
musicToggle.addEventListener("click",()=>{
  if(music.paused){
    music.play().catch(()=>{});
    musicToggle.classList.add("playing","active");
  }else{
    music.pause();
    musicToggle.classList.remove("playing","active");
  }
});

/* COUNTDOWN */
const target=new Date("2026-01-12T09:00:00").getTime();
setInterval(()=>{
  const diff=target-Date.now();
  if(diff<=0)return;
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff/3600000)%24;
  const m=Math.floor(diff/60000)%60;
  document.getElementById("countdown").innerText=`${d} Hari ${h} Jam ${m} Menit`;
},1000);

/* REVEAL */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.2});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

/* QRIS MODAL */
const qrisThumb=document.getElementById("qrisThumb");
const qrisModal=document.getElementById("qrisModal");
const qrisClose=document.getElementById("qrisClose");
qrisThumb.onclick=()=>qrisModal.classList.add("show");
qrisClose.onclick=()=>qrisModal.classList.remove("show");
qrisModal.onclick=e=>{if(e.target===qrisModal)qrisModal.classList.remove("show")};

/* COMMENTS */
const form=document.getElementById("commentForm");
const list=document.getElementById("commentList");
function load(){
  list.innerHTML="";
  (JSON.parse(localStorage.getItem("comments"))||[]).reverse()
    .forEach(c=>list.innerHTML+=`<div><b>${c.name}</b><p>${c.message}</p></div>`);
}
form.addEventListener("submit",e=>{
  e.preventDefault();
  const data=JSON.parse(localStorage.getItem("comments"))||[];
  data.push({name:name.value,message:message.value});
  localStorage.setItem("comments",JSON.stringify(data));
  form.reset();load();
});
load();

});
/* ===============================
   HERO GOLDEN DUST (MUSIC REACTIVE)
================================ */
const hero = document.getElementById("hero");
const canvas = document.getElementById("heroDust");
const ctx = canvas.getContext("2d");
const music = document.getElementById("music");

let w, h, dusts = [];
let musicActive = false;

function resizeHeroDust(){
  w = canvas.width = hero.offsetWidth;
  h = canvas.height = hero.offsetHeight;
}
window.addEventListener("resize", resizeHeroDust);
resizeHeroDust();

music.addEventListener("play", ()=> musicActive = true);
music.addEventListener("pause", ()=> musicActive = false);

class HeroDust{
  constructor(){
    this.reset();
  }
  reset(){
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 2 + 0.6;
    this.speedBase = Math.random() * 0.35 + 0.05;
    this.alphaBase = Math.random() * 0.4 + 0.25;
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle = `rgba(214,177,94,${this.alpha})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update(){
    // 🔥 REAKTIF MUSIK
    this.speed = musicActive ? this.speedBase * 2 : this.speedBase;
    this.alpha = musicActive ? this.alphaBase + 0.35 : this.alphaBase;

    this.y -= this.speed;
    if(this.y < -10){
      this.y = h + 10;
      this.x = Math.random() * w;
    }
    this.draw();
  }
}

// jumlah partikel (aman mobile)
for(let i=0;i<80;i++){
  dusts.push(new HeroDust());
}

function animateHeroDust(){
  ctx.clearRect(0,0,w,h);
  dusts.forEach(d => d.update());
  requestAnimationFrame(animateHeroDust);
}
animateHeroDust();
