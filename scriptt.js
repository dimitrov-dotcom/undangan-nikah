// OPEN INVITE
function openInvite(){
  document.getElementById("opening").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("music").play();
}

// NAMA TAMU DARI URL
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
    countdown.innerHTML = "Hari Bahagia Telah Tiba 💍";
    return;
  }

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);

  countdown.innerHTML = `${d} Hari ${h} Jam ${m} Menit`;
},1000);
