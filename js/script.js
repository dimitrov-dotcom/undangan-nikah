document.addEventListener("DOMContentLoaded",()=>{

  /* =========================
     OPEN INVITATION
  ========================= */
  const openBtn = document.getElementById("openBtn");
  const opening = document.getElementById("opening");
  const main = document.getElementById("main");
  const hero = document.querySelector(".hero");
  const music = document.getElementById("music");

  if(openBtn){
    openBtn.addEventListener("click",()=>{
      opening.style.display="none";
      main.style.display="block";
      window.scrollTo(0,0);

      if(hero) hero.classList.add("show");
      if(music) music.play().catch(()=>{});
    });
  }

  /* =========================
     GUEST NAME
  ========================= */
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("to");
  if(guest){
    document.getElementById("guest").innerText =
      guest.replace(/\+/g," ");
  }

  /* =========================
     COUNTDOWN
  ========================= */
  const target = new Date("2026-01-12T09:00:00").getTime();
  const countdown = document.getElementById("countdown");

  setInterval(()=>{
    const diff = target - Date.now();
    if(diff <= 0){
      countdown.innerText = "Hari Bahagia 🤍";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    countdown.innerText =
      `${d} Hari ${h} Jam ${m} Menit`;
  },1000);

  /* =========================
     MUSIC TOGGLE BUTTON
  ========================= */
  const btn = document.createElement("div");
  btn.className="music-btn";
  btn.innerHTML="🔊";
  document.body.appendChild(btn);

  let playing=true;
  btn.addEventListener("click",()=>{
    if(!music) return;
    if(playing){
      music.pause();
      btn.innerHTML="🔇";
    }else{
      music.play().catch(()=>{});
      btn.innerHTML="🔊";
    }
    playing=!playing;
  });

});
