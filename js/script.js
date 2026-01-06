document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    });

    // 2. Opening Screen & Music
    const openBtn = document.getElementById('open-btn');
    const opening = document.getElementById('opening');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = musicBtn.querySelector('i');
    let isPlaying = false;

    openBtn.addEventListener('click', () => {
        // Hide Opening
        opening.style.transform = 'translateY(-100%)';
        document.body.classList.remove('noscroll');
        
        // Show Main Content
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);

        // Play Music
        music.play();
        isPlaying = true;
        musicBtn.style.display = 'flex';
    });

    // Music Toggle
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-pause');
        } else {
            music.play();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-music');
        }
        isPlaying = !isPlaying;
    });

    // 3. Init AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // 4. Countdown Timer
    const weddingDate = new Date("Oct 25, 2025 08:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(timer);
            document.querySelector(".countdown-wrapper").innerHTML = "<h3 class='text-gold'>Acara Telah Dimulai!</h3>";
        }
    }, 1000);

    // 5. Swiper Gallery
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });

    // 6. RSVP Form Handler (Redirect to WA)
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;
        const status = document.getElementById('status').value;
        const message = document.getElementById('message').value;

        const text = `Halo, saya ${name}. Saya ingin konfirmasi ${status} dengan jumlah tamu ${guests} orang.%0A%0APesan: ${message}`;
        const waNumber = "6281234567890"; // Ganti dengan nomor WA tujuan
        
        showToast("Membuka WhatsApp...", "info");
        setTimeout(() => {
            window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
        }, 1000);
    });
});

// 7. Copy to Clipboard Function (Global Scope)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Nomor berhasil disalin!", "success");
    }).catch(err => {
        showToast("Gagal menyalin", "error");
    });
}

// 8. Custom Toast Notification (Global Scope)
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fa-check-circle';
    let color = '#D4AF37'; // Gold
    
    if(type === 'info') { icon = 'fa-info-circle'; color = '#2C2C2C'; }
    if(type === 'error') { icon = 'fa-exclamation-circle'; color = 'red'; }

    toast.style.borderLeftColor = color;
    toast.innerHTML = `<i class="fas ${icon}" style="color:${color}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
