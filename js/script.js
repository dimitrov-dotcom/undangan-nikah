function openInvite(){
  document.getElementById("opening").style.display = "none";
  document.getElementById("main").style.display = "block";

  // scroll ke atas dulu
  window.scrollTo(0,0);

  // HERO animation
  const hero = document.querySelector(".hero");
  if(hero){
    setTimeout(() => {
      hero.classList.add("show");
    }, 300);
  }

  // play music
  const music = document.getElementById("music");
  if(music){
    music.play().catch(()=>{});
  }
}

// NAMA TAMU
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");
if(guest){
  document.getElementById("guest").innerText = guest.replace(/\+/g," ");
}

// COUNTDOWN
const targetDate = new Date("2026-01-12T09:00:00").getTime();
const countdown = document.getElementById("countdown");

setInterval(()=>{
  const now = new Date().getTime();
  const diff = targetDate - now;

  if(diff <= 0){
    countdown.innerHTML = "Hari Bahagia Telah Tiba 🤍";
    return;
  }

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);

  countdown.innerHTML = `${d} Hari ${h} Jam ${m} Menit`;
},1000);

// AUTO SCROLL GALLERY (AMAN)
const gallery = document.getElementById("gallery");
let scrollPos = 0;

setInterval(()=>{
  if(!gallery) return;

  scrollPos += 240;
  if(scrollPos >= gallery.scrollWidth - gallery.clientWidth){
    scrollPos = 0;
  }

  gallery.scrollTo({
    left: scrollPos,
    behavior: "smooth"
  });
}, 3500);
