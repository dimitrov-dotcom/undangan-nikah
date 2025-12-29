document.addEventListener("DOMContentLoaded", () => {

  /* OPEN INVITATION */
  const openBtn = document.getElementById("openBtn");
  const opening = document.getElementById("opening");
  const main = document.getElementById("main");
  const music = document.getElementById("music");

  if(openBtn){
    openBtn.addEventListener("click", () => {
      opening.style.display = "none";
      main.style.display = "block";
      window.scrollTo(0,0);

      const hero = document.querySelector(".hero");
      if(hero) hero.classList.add("show");

      if(music){
        music.play().catch(()=>{});
      }
    });
  }

  /* NAMA TAMU */
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("to");
  if(guest){
    document.getElementById("guest").innerText = guest.replace(/\+/g," ");
  }

  /* COUNTDOWN */
  const target = new Date("2026-01-12T09:00:00").getTime();
  const countdown = document.getElementById("countdown");

  setInterval(()=>{
    const diff = target - Date.now();
    if(diff <= 0){
      countdown.innerText = "Hari Bahagia Telah Tiba 🤍";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    countdown.innerText = `${d} Hari ${h} Jam ${m} Menit`;
  },1000);

  /* GALLERY AUTO SLIDE */
  const gallery = document.getElementById("gallery");
  let pos = 0;
  setInterval(()=>{
    if(!gallery) return;
    pos += 240;
    if(pos >= gallery.scrollWidth - gallery.clientWidth) pos = 0;
    gallery.scrollTo({ left: pos, behavior: "smooth" });
  },3500);

  /* PROFILE ANIMATION */
  const cards = document.querySelectorAll(".profile .card");
  window.addEventListener("scroll", ()=>{
    cards.forEach(card=>{
      if(card.getBoundingClientRect().top < window.innerHeight - 100){
        card.classList.add("show");
      }
    });
  });

  /* COPY SAWERAN */
  window.copyText = function(text){
    navigator.clipboard.writeText(text);
    alert("Nomor berhasil disalin 🤍");
  };

  /* KOMENTAR */
  const form = document.getElementById("commentForm");
  const list = document.getElementById("commentList");

  function loadComments(){
    const data = JSON.parse(localStorage.getItem("comments")) || [];
    list.innerHTML = "";
    data.reverse().forEach(c=>{
      const div = document.createElement("div");
      div.className = "comment-item";
      div.innerHTML = `<strong>${c.name}</strong><p>${c.message}</p>`;
      list.appendChild(div);
    });
  }

  if(form){
    form.addEventListener("submit", e=>{
      e.preventDefault();
      const name = document.getElementById("name").value;
      const message = document.getElementById("message").value;
      const data = JSON.parse(localStorage.getItem("comments")) || [];
      data.push({name, message});
      localStorage.setItem("comments", JSON.stringify(data));
      form.reset();
      loadComments();
    });
  }
/* =========================
     DIVIDER SCROLL REVEAL
  ========================= */
  const dividers = document.querySelectorAll(".divider-animate");

  const dividerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.3 });

  dividers.forEach(divider => {
    dividerObserver.observe(divider);
  });
