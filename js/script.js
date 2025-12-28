// ================= OPEN INVITATION + MUSIC =================
function openInvite(){
  const opening = document.getElementById("opening");
  const main = document.getElementById("main");
  const music = document.getElementById("music");

  if(opening) opening.style.display = "none";
  if(main) main.style.display = "block";

  if(music){
    music.volume = 0.6;
    music.play().catch(err=>{
      console.log("Music blocked by browser:", err);
    });
  }
}

// ================= NAMA TAMU =================
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");
const guestEl = document.getElementById("guest");

if(guest && guestEl){
  guestEl.innerText = guest.replace(/\+/g," ");
}

// ================= COUNTDOWN =================
const countdown = document.getElementById("countdown");
const targetDate = new Date("2026-01-12T09:00:00").getTime();

if(countdown){
  setInterval(()=>{
    const now = new Date().getTime();
    const diff = targetDate - now;

    if(diff <= 0){
      countdown.innerHTML = "Hari Bahagia Telah Tiba 💍";
      return;
    }

    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);

    countdown.innerHTML = `${d} Hari ${h} Jam ${m} Menit`;
  },1000);
}

// ================= GALLERY SLIDER =================
const track = document.getElementById("sliderTrack");
const dotsContainer = document.getElementById("dots");

if(track && dotsContainer){
  const slides = track.querySelectorAll("img");
  let index = 0;
  let slideInterval;

  // create dots
  slides.forEach((_, i)=>{
    const dot = document.createElement("span");
    if(i === 0) dot.classList.add("active");
    dot.onclick = ()=>moveSlide(i);
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function moveSlide(i){
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d=>d.classList.remove("active"));
    dots[index].classList.add("active");
    resetAutoSlide();
  }

  function autoSlide(){
    index = (index + 1) % slides.length;
    moveSlide(index);
  }

  function resetAutoSlide(){
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 4000);
  }

  // auto start
  slideInterval = setInterval(autoSlide, 4000);

  // swipe support
  let startX = 0;
  track.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e=>{
    let endX = e.changedTouches[0].clientX;
    if(startX - endX > 50) autoSlide();
    if(endX - startX > 50){
      index = (index - 1 + slides.length) % slides.length;
      moveSlide(index);
    }
  });
}
