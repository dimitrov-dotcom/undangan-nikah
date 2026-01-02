/* =====================================================
   DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ================= OPENING ================= */
  const opening = document.getElementById('opening');
  const openBtn = document.getElementById('openBtn');

  if (opening && openBtn) {
    // kunci scroll saat opening
    document.body.style.overflow = 'hidden';

    openBtn.addEventListener('click', () => {
      opening.classList.add('hide');
      document.body.style.overflow = '';
    });
  }

  /* ================= COUNTDOWN ================= */
  function updateCountdown() {
    const targetDate = new Date('2026-01-10T14:00:00');
    const now = new Date();
    const diff = targetDate - now;

    const d = document.getElementById('countdown-days');
    const h = document.getElementById('countdown-hours');
    const m = document.getElementById('countdown-minutes');
    const s = document.getElementById('countdown-seconds');

    if (!d || !h || !m || !s) return;

    if (diff <= 0) {
      d.textContent = h.textContent = m.textContent = s.textContent = "00";
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    d.textContent = String(days).padStart(2, '0');
    h.textContent = String(hours).padStart(2, '0');
    m.textContent = String(minutes).padStart(2, '0');
    s.textContent = String(seconds).padStart(2, '0');
  }

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ================= COPY REKENING ================= */
  const copyBtn = document.getElementById('copy-btn');
  const nomorRekening = "138701000926530";

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(nomorRekening).then(() => {
        copyBtn.textContent = "Tersalin!";
        copyBtn.style.backgroundColor = "#b0894a";
        copyBtn.style.color = "#fff";

        setTimeout(() => {
          copyBtn.textContent = "Salin";
          copyBtn.style.backgroundColor = "#ccc";
          copyBtn.style.color = "#333";
        }, 2500);
      });
    });
  }

  /* ================= RSVP & UCAPAN ================= */
  const form = document.getElementById('form-ucapan');
  const ucapanList = document.getElementById('ucapan-list');
  const totalUcapan = document.getElementById('total-ucapan');

  let ucapanData = [
    {
      nama: 'April Iakuan',
      status: 'Hadir',
      ucapan: 'Masya Allah selamat sayangku 🤲',
      waktu: '3 hari lalu'
    },
    {
      nama: 'Zahra',
      status: 'Hadir',
      ucapan: 'Masyaallah, lancar sampai hari H 🤍',
      waktu: '1 minggu lalu'
    }
  ];

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderUcapan() {
    if (!ucapanList || !totalUcapan) return;

    ucapanList.innerHTML = '';
    ucapanData.forEach(u => {
      const item = document.createElement('div');
      item.className = 'ucapan-item';
      item.innerHTML = `
        <div class="ucapan-head">
          <span class="ucapan-nama">${escapeHtml(u.nama)}</span>
          <span class="ucapan-status">${escapeHtml(u.status)}</span>
        </div>
        <p class="ucapan-text">${escapeHtml(u.ucapan).replace(/\n/g, '<br>')}</p>
        <small style="opacity:.6">${escapeHtml(u.waktu)}</small>
      `;
      ucapanList.appendChild(item);
    });

    totalUcapan.textContent = `${ucapanData.length} Ucapan`;
  }

  renderUcapan();

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const nama = form.nama.value.trim();
      const status = form.status.value;
      const ucapan = form.ucapan.value.trim();

      if (!nama || !status || !ucapan) {
        alert("Mohon lengkapi semua kolom.");
        return;
      }

      ucapanData.unshift({
        nama,
        status,
        ucapan,
        waktu: 'Baru saja'
      });

      renderUcapan();
      form.reset();
      form.status.selectedIndex = 0;
    });
  }

  /* ================= SCROLL REVEAL ================= */
  const revealItems = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(el => revealObserver.observe(el));

});
