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
// PROFILE CARD ANIMATION ON SCROLL
const profileCards = document.querySelectorAll(".profile .card");

const showProfileCards = () => {
  profileCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if(cardTop < triggerPoint){
      card.classList.add("show");
    }
  });
};

window.addEventListener("scroll", showProfileCards);
// COPY SAWERAN
function copyText(text){
  navigator.clipboard.writeText(text);
  alert("Nomor berhasil disalin 🤍");
}

// KOMENTAR LOCAL STORAGE
const form = document.getElementById("commentForm");
const list = document.getElementById("commentList");

function loadComments(){
  const data = JSON.parse(localStorage.getItem("comments")) || [];
  list.innerHTML = "";
  data.reverse().forEach(c => {
    const div = document.createElement("div");
    div.className = "comment-item";
    div.innerHTML = `<strong>${c.name}</strong><p>${c.message}</p>`;
    list.appendChild(div);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const data = JSON.parse(localStorage.getItem("comments")) || [];
  data.push({ name, message });

  localStorage.setItem("comments", JSON.stringify(data));
  form.reset();
  loadComments();
});

loadComments();
/* =========================
   SECTION SCROLL REVEAL
========================= */
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{
  threshold:0.2
});

sections.forEach(section=>{
  section.classList.add("section-animate");
  observer.observe(section);
});

/* =========================
   DIVIDER SCROLL ANIMATION
========================= */
const dividers = document.querySelectorAll(".divider-animate");

const dividerObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{ threshold:0.3 });

dividers.forEach(divider=>{
  dividerObserver.observe(divider);
});
