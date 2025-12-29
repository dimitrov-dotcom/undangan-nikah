kfunction openInvite(){
  document.getElementById("opening").style.display="none";
  document.getElementById("main").style.display="block";
  window.scrollTo(0,0);

  const hero=document.querySelector(".hero");
  if(hero) setTimeout(()=>hero.classList.add("show"),300);

  const music=document.getElementById("music");
  if(music) music.play().catch(()=>{});
}

/* NAMA TAMU */
const params=new URLSearchParams(window.location.search);
const guest=params.get("to");
if(guest){
  document.getElementById("guest").innerText=guest.replace(/\+/g," ");
}

/* COUNTDOWN */
const target=new Date("2026-01-12T09:00:00").getTime();
const countdown=document.getElementById("countdown");

setInterval(()=>{
  const diff=target-new Date().getTime();
  if(diff<=0){
    countdown.innerText="Hari Bahagia Telah Tiba 🤍";
    return;
  }
  const d=Math.floor(diff/86400000);
  const h=Math.floor((diff/3600000)%24);
  const m=Math.floor((diff/60000)%60);
  countdown.innerText=`${d} Hari ${h} Jam ${m} Menit`;
},1000);

/* GALLERY AUTO SLIDE */
const gallery=document.getElementById("gallery");
let pos=0;
setInterval(()=>{
  if(!gallery) return;
  pos+=240;
  if(pos>=gallery.scrollWidth-gallery.clientWidth) pos=0;
  gallery.scrollTo({left:pos,behavior:"smooth"});
},3500);

/* PROFILE CARD ANIMATION */
const cards=document.querySelectorAll(".profile .card");
window.addEventListener("scroll",()=>{
  cards.forEach(c=>{
    if(c.getBoundingClientRect().top<window.innerHeight-100){
      c.classList.add("show");
    }
  });
});

/* COPY SAWERAN */
function copyText(t){
  navigator.clipboard.writeText(t);
  alert("Nomor berhasil disalin 🤍");
}

/* KOMENTAR */
const form=document.getElementById("commentForm");
const list=document.getElementById("commentList");

function loadComments(){
  const data=JSON.parse(localStorage.getItem("comments"))||[];
  list.innerHTML="";
  data.reverse().forEach(c=>{
    const d=document.createElement("div");
    d.className="comment-item";
    d.innerHTML=`<strong>${c.name}</strong><p>${c.message}</p>`;
    list.appendChild(d);
  });
}

if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const name=document.getElementById("name").value;
    const msg=document.getElementById("message").value;
    const data=JSON.parse(localStorage.getItem("comments"))||[];
    data.push({name,message:msg});
    localStorage.setItem("comments",JSON.stringify(data));
    form.reset();
    loadComments();
  });
}
loadComments();

/* SCROLL REVEAL */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
},{threshold:.2});

document.querySelectorAll("section,.divider-animate").forEach(el=>{
  observer.observe(el);
});
