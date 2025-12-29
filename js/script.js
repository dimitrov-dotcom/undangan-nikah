document.addEventListener("DOMContentLoaded",()=>{

const openBtn=document.getElementById("openBtn");
const opening=document.getElementById("opening");
const main=document.getElementById("main");
const hero=document.getElementById("hero");
const music=document.getElementById("music");
const toggle=document.getElementById("musicToggle");

openBtn.onclick=()=>{
  opening.style.display="none";
  main.style.display="block";
  hero.classList.add("show");
  music.play().catch(()=>{});
};

toggle.onclick=()=>{
  if(music.paused){
    music.play();
    toggle.textContent="🔊";
  }else{
    music.pause();
    toggle.textContent="🔇";
  }
};

/* NAMA TAMU */
const params=new URLSearchParams(location.search);
const guest=params.get("to");
if(guest){
  document.getElementById("guest").innerText=guest.replace(/\+/g," ");
}

/* COUNTDOWN */
const target=new Date("2026-01-12T09:00:00").getTime();
setInterval(()=>{
  const cd=document.getElementById("countdown");
  const diff=target-Date.now();
  if(diff<=0){cd.innerText="Hari Bahagia 🤍";return;}
  cd.innerText=
  `${Math.floor(diff/86400000)} Hari ${Math.floor(diff/3600000)%24} Jam ${Math.floor(diff/60000)%60} Menit`;
},1000);

/* COMMENT */
const form=document.getElementById("commentForm");
const list=document.getElementById("commentList");

function loadComments(){
  const data=JSON.parse(localStorage.getItem("comments"))||[];
  list.innerHTML="";
  data.forEach(c=>{
    const d=document.createElement("div");
    d.innerHTML=`<b>${c.name}</b><p>${c.message}</p>`;
    d.style.marginBottom="12px";
    list.appendChild(d);
  });
}
form.onsubmit=e=>{
  e.preventDefault();
  const data=JSON.parse(localStorage.getItem("comments"))||[];
  data.push({name:name.value,message:message.value});
  localStorage.setItem("comments",JSON.stringify(data));
  form.reset();
  loadComments();
};
loadComments();

/* SCROLL REVEAL */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
},{threshold:.2});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

});
const qrisThumb = document.getElementById("qrisThumb");
const qrisModal = document.getElementById("qrisModal");
const qrisClose = document.getElementById("qrisClose");

if(qrisThumb){
qrisThumb.addEventListener("click",()=>{
qrisModal.classList.add("show");
document.body.style.overflow = "hidden";
});
}

if(qrisClose){
qrisClose.addEventListener("click",()=>{
qrisModal.classList.remove("show");
document.body.style.overflow = "";
});
}

if(qrisModal){
qrisModal.addEventListener("click",(e)=>{
if(e.target === qrisModal){
qrisModal.classList.remove("show");
document.body.style.overflow = "";
}
});

