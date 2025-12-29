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
