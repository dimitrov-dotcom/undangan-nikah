// Countdown timer to 10 Jan 2026 14:00 local time
function updateCountdown() {
  const targetDate = new Date('2026-01-10T14:00:00');
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('countdown-days').textContent = '00';
    document.getElementById('countdown-hours').textContent = '00';
    document.getElementById('countdown-minutes').textContent = '00';
    document.getElementById('countdown-seconds').textContent = '00';
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
  document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Copy nomor rekening handler
const copyBtn = document.getElementById('copy-btn');
const nomorRekening = "138701000926530";

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(nomorRekening).then(() => {
    copyBtn.textContent = "Tersalin!";
    copyBtn.style.backgroundColor = "#b0894a";
    setTimeout(() => {
      copyBtn.textContent = "Salin";
      copyBtn.style.backgroundColor = "#ccc";
    }, 2500);
  }).catch(() => {
    alert("Gagal menyalin nomor rekening. Silakan salin secara manual.");
  });
});

// RSVP & Ucapan Form
const form = document.getElementById('form-ucapan');
const ucapanList = document.getElementById('ucapan-list');
const totalUcapan = document.getElementById('total-ucapan');

// Simulasi data awal ucapan
let ucapanData = [
  { nama: 'April Iakuan', status: 'Hadir', ucapan: 'Masya Allah selamat sayangku akhirnya sold out juga Samawah till jannah cintaku 🤲 love you more 🥰❤️', waktu: '3 hari, 22 jam yang lalu' },
  { nama: 'Zahra', status: 'Hadir', ucapan: 'Masyaallah, Akhirnya 😁 nanti ku suruh mamaku yg datang, soalnya sementara di pinggir jga 🤲😘😍 peluk jauh kaka', waktu: '1 minggu yang lalu' },
  { nama: 'Desi', status: 'Hadir', ucapan: 'Maa Shaa Allah dilancarkan sampai hari H Kaka cantikkuu 🥺🤍🤍🌻', waktu: '1 minggu yang lalu' },
  { nama: 'Kimia 2012', status: 'Hadir', ucapan: 'Alhamdulillah dan selamat ripda\nSemoga dilancarkan semuanya dan setelah menikah menjadi keluarga yang sakinah mawadah warahmah', waktu: '1 minggu yang lalu' }
];

// Render awal ucapan
function renderUcapan() {
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
      <small style="opacity:0.6;font-size:0.8rem;">${escapeHtml(u.waktu)}</small>
    `;
    ucapanList.appendChild(item);
  });
  totalUcapan.textContent = `${ucapanData.length} Ucapan`;
}

// Escape HTML for safety
function escapeHtml(text) {
  const p = document.createElement('p');
  p.textContent = text;
  return p.innerHTML;
}

renderUcapan();

// Form submit handler
form.addEventListener('submit', e => {
  e.preventDefault();
  const nama = form.nama.value.trim();
  const status = form.status.value;
  const ucapanText = form.ucapan.value.trim();

  if (!nama || !status || !ucapanText) {
    alert("Mohon isi semua kolom dengan lengkap.");
    return;
  }

  const newUcapan = {
    nama,
    status,
    ucapan: ucapanText,
    waktu: 'Baru saja'
  };

  ucapanData.unshift(newUcapan);
  renderUcapan();

  form.reset();
  form.status.selectedIndex = 0;

