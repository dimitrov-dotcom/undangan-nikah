document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     OPEN INVITATION
  =============================== */
  const openBtn   = document.getElementById("openBtn");
  const opening   = document.getElementById("opening");
  const main      = document.getElementById("main");
  const hero      = document.getElementById("hero");
  const music     = document.getElementById("music");
  const toggle    = document.getElementById("musictoggle");

  if (openBtn && opening && main) {
    openBtn.addEventListener("click", () => {
      opening.style.display = "none";
      main.style.display = "block";
      window.scrollTo(0, 0);

      if (hero) hero.classList.add("show");

      if (music) {
        music.play().catch(() => {});
      }
    });
  }

  /* ===============================
     MUSIC TOGGLE
  =============================== */
  if (toggle && music) {
    toggle.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        toggle.textContent = "🔊";
      } else {
        music.pause();
        toggle.textContent = "🔇";
      }
    });
  }

  /* ===============================
     NAMA TAMU DARI URL
     ?to=Nama+Tamu
  =============================== */
  const params = new URLSearchParams(window.location.search);
  const guest  = params.get("to");
  const guestEl = document.getElementById("guest");

  if (guest && guestEl) {
    guestEl.innerText = guest.replace(/\+/g, " ");
  }

  /* ===============================
     COUNTDOWN
  =============================== */
  const countdown = document.getElementById("countdown");
  const target = new Date("2026-01-12T09:00:00").getTime();

  if (countdown) {
    setInterval(() => {
      const diff = target - Date.now();

      if (diff <= 0) {
        countdown.innerText = "Hari Bahagia 🤍";
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);

      countdown.innerText = `${d} Hari ${h} Jam ${m} Menit`;
    }, 1000);
  }

  /* ===============================
     KOMENTAR (LOCAL STORAGE)
  =============================== */
  const form = document.getElementById("commentForm");
  const list = document.getElementById("commentList");

  function loadComments() {
    if (!list) return;
    const data = JSON.parse(localStorage.getItem("comments")) || [];
    list.innerHTML = "";
    data.forEach(c => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${c.name}</strong><p>${c.message}</p>`;
      div.style.marginBottom = "14px";
      list.appendChild(div);
    });
  }

  if (form) {
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
  }

  loadComments();

  /* ===============================
     SCROLL REVEAL
  =============================== */
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    reveals.forEach(el => observer.observe(el));
  }

  /* ===============================
     QRIS FULLSCREEN MODAL
  =============================== */
  const qrisThumb = document.getElementById("qrisThumb");
  const qrisModal = document.getElementById("qrisModal");
  const qrisClose = document.getElementById("qrisClose");

  if (qrisThumb && qrisModal) {
    qrisThumb.addEventListener("click", () => {
      qrisModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  }

  if (qrisClose && qrisModal) {
    qrisClose.addEventListener("click", () => {
      qrisModal.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  if (qrisModal) {
    qrisModal.addEventListener("click", e => {
      if (e.target === qrisModal) {
        qrisModal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }

});
const bgSections = document.querySelectorAll(".auto-bg");

bgSections.forEach((sec, i)=>{
  sec.setAttribute("data-bg", (i % 3) + 1);
});
