const targetDate = new Date("July 12, 2025 00:00:00");
let namaPanggilan = "Sayang";
let knockCount = 0;
let musicPlaying = false;
let player;
let fingerTimer;

// Load YouTube IFrame Player API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        height: '0', width: '0', videoId: 'uS3XwWlTfA0',
        playerVars: { 'autoplay': 0, 'loop': 1, 'playlist': 'uS3XwWlTfA0' },
        events: { 'onReady': onPlayerReady }
    });
}
function onPlayerReady(event) { player.setVolume(50); }

const teksEjekan = ["Enggak 😜", "Eits gak bisa!", "Gaboleh klik ini!", "Tetep gak bisa wkwk", "Harus klik Mau! 🥺", "Pasti salting ya?"];
const teksSindiran = [
    "Hayo lho mau ngeklik apa? 😏",
    "Tuh kan, tombol 'Mau!' makin gede lho... 👀",
    "Nyerah aja deh, takdirmu klik Mau! 😝",
    "Jangan dipaksa, emang ga bisa diklik wkwk",
    "Gemes banget sih usahanya klik enggak 🤣"
];

const pesanKangen = [
    "Ehem! Katanya kangen, buktinya mana? Sini pc aku sekarang! 😜",
    "I love you more than words can say. Jangan lupa senyum hari ini yaa cintaa! 🥰",
    "Kamu itu kayak bumbu mi instan, kalau gak ada rasanya sepi banget hidup aku.. 🍜❤",
    "Coba cubit pipi kamu sendiri deh, itu titipan peluk online dari aku! 🤭",
    "Aku beruntung banget bisa punya kamu. Jaga kesehatan ya cintaa!"
];

const alasanSayang = [
    "Alasan aku sayang kamu: Karena senyum kamu itu manisnya ngalahin boba instan favorit kita! 🧋",
    "Alasan aku sayang kamu: Sifat random kamu selalu bisa bikin hari-hari sepi aku jadi rame lagi. ☀️",
    "Alasan aku sayang kamu: Kamu itu sabar banget ngadepin tingkah aku yang ajaib ini. 🧸",
    "Alasan aku sayang kamu: Ga ada alasan khusus sih, pokoknya jiwaku udah kekunci di kamu wkwk! 🔐"
];

const listKupon = [
    "🎟️ Kupon Gratis Peluk Sepuasnya (Klaim via WA)",
    "🎟️ Kupon Dibeliin Seblak + Boba Level 5 🧋",
    "🎟️ Kupon Bebas Marah/Ngambek 1 Harian Penuh 🤫",
    "🎟️ Kupon Dituruti 1 Permintaan Random Kamu! ✨",
    "🎟️ Kupon Ditemenin VC Sampai Kamu Ketiduran 💤"
];

const isiSuratRahasia = [
    "Fun Fact: Pas kamu lagi baca teks ini, aku lagi mikirin betapa beruntungnya aku punya kamu. 🤍",
    "Pemberitahuan resmi: Kamu tidak diperbolehkan bosan denganku karena aku sudah kecanduan senyumanmu! 🚔",
    "Kalau kamu lelah hari ini, istirahat ya. Inget, ada aku yang selalu bangga sama semua proses kamu. 🥰"
];

const teksBisikan = ["Kangen ya? 🤭", "I Love Youu 🤍", "Jangan cemberut dong 🌹", "Kamu gemes bgt ✨", "Pikirin aku terus ya! 🥰"];

let ejekanIdx = 0; let alertStep = 0; let gameAttempts = 0; 
let scaleMau = 1.0; let scaleGamau = 1.0; let totalGamauClicks = 0;

function initStars() {
    const container = document.getElementById('starsContainer');
    for(let i=0; i<45; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        const size = Math.random() * 4 + 2 + 'px';
        star.style.width = size; star.style.height = size;
        star.style.setProperty('--duration', Math.random() * 2 + 1 + 's');
        container.appendChild(star);
    }
}
initStars();

setInterval(() => {
    if(Math.random() > 0.4) {
        const bubble = document.createElement('div');
        bubble.classList.add('whisper-bubble');
        bubble.innerText = teksBisikan[Math.floor(Math.random() * teksBisikan.length)];
        bubble.style.left = Math.random() * 80 + 10 + 'vw';
        document.body.appendChild(bubble);
        setTimeout(() => { bubble.remove(); }, 4000);
    }
}, 5000);

function toggleMusic() {
    const status = document.getElementById('musicStatus');
    const icon = document.getElementById('musicIcon');
    if(!musicPlaying && player) {
        player.playVideo(); musicPlaying = true;
        status.innerText = "Musik: On"; icon.classList.add('heart-beat-icon');
    } else if (player) {
        player.pauseVideo(); musicPlaying = false;
        status.innerText = "Musik: Off"; icon.classList.remove('heart-beat-icon');
    }
}

document.body.addEventListener('mousemove', (e) => { if(Math.random() > 0.82) { spawnTrailParticle(e.clientX, e.clientY); } });
document.body.addEventListener('touchmove', (e) => { if(Math.random() > 0.75) { const touch = e.touches[0]; spawnTrailParticle(touch.clientX, touch.clientY); } });

function spawnTrailParticle(x, y) {
    const p = document.createElement('div'); p.classList.add('click-heart');
    const items = ['✨', '🌸', '💖', '⭐', '🎈', '❤️'];
    p.innerHTML = items[Math.floor(Math.random() * items.length)];
    p.style.left = (x - 10) + 'px'; p.style.top = (y - 10) + 'px';
    p.style.fontSize = Math.random() * 14 + 12 + 'px';
    document.body.appendChild(p); setTimeout(() => { p.remove(); }, 700);
}

document.body.addEventListener('click', (e) => {
    if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && !e.target.classList.contains('coupon-card') && e.target.type !== 'range') {
        spawnHeartEffect(e.clientX, e.clientY);
    }
});

function spawnHeartEffect(x, y) {
    const clickHeart = document.createElement('div');
    clickHeart.classList.add('click-heart'); clickHeart.innerHTML = Math.random() > 0.5 ? '🌸' : '💖';
    clickHeart.style.left = x + 'px'; clickHeart.style.top = y + 'px';
    document.body.appendChild(clickHeart); setTimeout(() => { clickHeart.remove(); }, 700);
}

function createFallingParticle() {
    const p = document.createElement('div');
    const rand = Math.random();
    if (rand > 0.6) { p.classList.add('heart'); p.innerHTML = '❤️'; }
    else if (rand > 0.3) { p.classList.add('sakura'); p.innerHTML = '🌸'; }
    else { p.classList.add('sparkle-fall'); p.innerHTML = '✨'; }
    p.style.left = Math.random() * 100 + 'vw'; p.style.animationDuration = Math.random() * 3 + 3 + 's';
    p.style.fontSize = Math.random() * 16 + 12 + 'px';
    document.body.appendChild(p); setTimeout(() => { p.remove(); }, 6000);
}
let fallingInterval = setInterval(createFallingParticle, 400);

function heartBurst(e) {
    const burstCount = 45; 
    const targetX = e ? (e.clientX || window.innerWidth/2) : window.innerWidth/2;
    const targetY = e ? (e.clientY || window.innerHeight/2) : window.innerHeight/2;
    for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div'); burst.classList.add('heart-burst');
        const pool = ['❤️', '💖', '🌸', '✨', '💝', '💘', '⭐'];
        burst.innerHTML = pool[Math.floor(Math.random() * pool.length)];
        burst.style.left = targetX + 'px'; burst.style.top = targetY + 'px';
        const angle = (i / burstCount) * 2 * Math.PI + Math.random(); const speed = Math.random() * 220 + 130;
        burst.style.setProperty('--x', `${Math.cos(angle) * speed}px`); burst.style.setProperty('--y', `${Math.sin(angle) * speed}px`);
        burst.style.fontSize = Math.random() * 20 + 15 + 'px';
        document.body.appendChild(burst); setTimeout(() => { burst.remove(); }, 1000);
    }
}

function playSound(type) {
    const sound = document.getElementById('soundSfx'); const cheer = document.getElementById('cheerSfx');
    if (type === 'pop') { sound.currentTime = 0; sound.play().catch(e => {}); }
    else if (type === 'cheer') { cheer.currentTime = 0; cheer.play().catch(e => {}); }
}

function bukaSurat() {
    if(!musicPlaying) { toggleMusic(); }
    document.getElementById('envelopeScreen').classList.add('hidden');
    document.getElementById('knockCard').classList.remove('hidden');
    clearInterval(fallingInterval); fallingInterval = setInterval(createFallingParticle, 200);
}

function ketokPintu() {
    knockCount++; playSound('pop');
    const fill = document.getElementById('knockFill'); const inst = document.getElementById('knockInstruction'); const btn = document.getElementById('btnKnock');
    fill.style.width = (knockCount / 5) * 100 + '%';
    if(knockCount === 1) inst.innerText = "Lagi, pintunya tebel nih! ✊";
    if(knockCount === 3) inst.innerText = "Dikit lagi kebuka, yang keras! 😤";
    if(knockCount === 4) inst.innerText = "Satu kali lagi sayang... 🫣";
    if(knockCount >= 5) {
        btn.innerText = "TERBUKA! ✨";
        setTimeout(() => {
            document.getElementById('knockCard').classList.add('hidden');
            document.getElementById('passwordCard').classList.remove('hidden');
        }, 600);
    }
}

function verifyPassword() {
    const pin = document.getElementById('secretPin').value;
    if (pin === "1207") {
        playSound('cheer');
        document.getElementById('passwordCard').classList.add('hidden');
        document.getElementById('gameCard').classList.remove('hidden');
    } else {
        playSound('pop');
        const modalGif = document.getElementById('modalGif'); const modalText = document.getElementById('modalText'); const modalBtn = document.getElementById('modalBtn');
        document.getElementById('inputNamaPanggilan').classList.add('hidden'); 
        modalGif.src = "https://media.tenor.com/Y-98N7p7v28AAAAi/cute-cat.gif"; 
        modalText.innerHTML = `Salah kodenya ih! Masa lupa sih? 😤<br><small style="color:#666;">Coba inget-inget tanggal jadian kita...</small>`;
        modalBtn.innerText = "Coba Lagi 🥺";
        modalBtn.setAttribute("onclick", "document.getElementById('customModal').classList.add('hidden'); document.getElementById('inputNamaPanggilan').classList.remove('hidden');");
        document.getElementById('customModal').classList.remove('hidden');
    }
}

function deteksiNamaBohong(el) {
    const kataDilarang = ["ga", "bukan", "siapa", "lu", "kamu", "anda", "no", "nobody", "asing", "jelek"];
    let val = el.value.toLowerCase();
    kataDilarang.forEach(kata => { if(val.includes(kata)) { el.value = "Sayang Tercinta 🤍"; } });
}

function swapGameButtons() {
    gameAttempts++; playSound('pop');
    if (gameAttempts < 5) {
        const btn1 = document.getElementById('gameBtn1'); const btn2 = document.getElementById('gameBtn2');
        const tempText = btn1.innerText; btn1.innerText = btn2.innerText; btn2.innerText = tempText;
        const inst = document.getElementById('gameInstruction');
        const rentetanTeks = ["Eh kok pindah? Serius pilih yang mana? 😜", "Hayo lho, makin bingung kan nyarinya? 😂", "Jangan emosi ya sayang, dikit lagi ketemu wkwk", "Oke oke, ini yang terakhir, buruan klik!"];
        inst.innerText = rentetanTeks[Math.min(gameAttempts - 1, rentetanTeks.length - 1)];
    }
}

function playGame(choice) {
    if (gameAttempts >= 4) {
        document.getElementById('gameCard').classList.add('hidden');
        document.getElementById('customModal').classList.remove('hidden');
    } else { swapGameButtons(); }
}

function submitNama() {
    const inputVal = document.getElementById('inputNamaPanggilan').value;
    namaPanggilan = (inputVal && inputVal.trim() !== "") ? inputVal : "Sayang";
    document.getElementById('customModal').classList.add('hidden');
    document.getElementById('mainCard').classList.remove('hidden');
    document.getElementById('sapaan').innerText = `Hai ${namaPanggilan}... ✨`;
    const btnGamau = document.getElementById('btnGamau'); btnGamau.style.left = "55%"; btnGamau.style.top = "0px";
    mulaiKetik();
}

let index = 0;
function mulaiKetik() {
    const pesanRomantis = `Sejak 12 Juli lalu, hidupku jauh lebih indah karena ada ${namaPanggilan}. Kamu mau kan terus nemenin aku dan bikin aku bahagia selamanya? 🥺👉👈`;
    if (index < pesanRomantis.length) {
        document.getElementById("typewriter").innerHTML += pesanRomantis.charAt(index); index++;
        setTimeout(mulaiKetik, 50);
    } else {
        document.getElementById("actions").classList.remove('hidden');
        document.getElementById("isengComment").classList.remove('hidden');
    }
}

function pindahTombol() {
    playSound('pop'); totalGamauClicks++;
    const btn = document.getElementById('btnGamau'); const btnMau = document.getElementById('btnMau'); const comment = document.getElementById('isengComment');
    if (totalGamauClicks === 5) {
        const modalGif = document.getElementById('modalGif'); const modalText = document.getElementById('modalText'); const modalBtn = document.getElementById('modalBtn');
        modalGif.src = "https://media.tenor.com/7S8Yx1pcc2gAAAAi/funny-cat.gif";
        modalText.innerHTML = `⚠️ <strong>SISTEM ERROR!</strong><br><br>Terdeteksi tingkat gengsi terlalu tinggi. Tombol 'Enggak' disabotase otomatis! 😂`;
        modalBtn.innerText = "Sialan, iya deh... 🙄"; modalBtn.setAttribute("onclick", "document.getElementById('customModal').classList.add('hidden');");
        document.getElementById('customModal').classList.remove('hidden');
    }
    if (totalGamauClicks === 4) {
        comment.innerText = "Eitss, ketuker posisi! Hahaha 😂";
        btn.style.left = '15px'; btnMau.style.left = 'unset'; btnMau.style.right = '15px'; return;
    }
    if (scaleGamau <= 0.35) {
        btn.style.position = "static"; btn.style.transform = "scale(1)"; btn.style.backgroundColor = "#ff4d6d"; btn.style.color = "white";
        btn.innerText = "KANGEN KAMU BANGET! 🥺❤️"; btn.setAttribute("onclick", "terimaCinta(event)");
        comment.innerText = "Nah loh meledak kan tombolnya jadi kangen juga! Hahaha 😜"; return;
    }
    ejekanIdx = (ejekanIdx + 1) % teksEjekan.length; btn.innerText = teksEjekan[ejekanIdx];
    comment.innerText = teksSindiran[Math.floor(Math.random() * teksSindiran.length)];
    scaleMau += 0.30; scaleGamau -= 0.15;
    btnMau.style.transform = `scale(${scaleMau})`; btn.style.transform = `scale(${scaleGamau})`;
    const container = document.getElementById('actions');
    const randomX = Math.floor(Math.random() * (container.clientWidth - btn.clientWidth));
    const randomY = Math.floor((Math.random() - 0.5) * 160);
    btn.style.left = randomX + 'px'; btn.style.top = randomY + 'px';
}

function terimaSogokan() {
    const modalGif = document.getElementById('modalGif'); const modalText = document.getElementById('modalText'); const modalBtn = document.getElementById('modalBtn');
    document.getElementById('inputNamaPanggilan').classList.add('hidden');
    modalGif.src = "https://media.tenor.com/g9VvO_ub70gAAAAi/love-love-you.gif";
    modalText.innerHTML = `Deal ya! Habis ini kita jajan seblak + boba bareng. Sekarang klik tombol di bawah buat lanjut! 😋🧋`;
    modalBtn.innerText = "Yesss, Mau Jajan! 💖"; modalBtn.setAttribute("onclick", "document.getElementById('customModal').classList.add('hidden'); terimaCinta(event);");
    document.getElementById('customModal').classList.remove('hidden');
}

function terimaCinta(e) {
    playSound('cheer'); heartBurst(e);
    setTimeout(() => {
        document.getElementById('mainCard').classList.add('hidden');
        document.getElementById('inputNamaPanggilan').classList.add('hidden');
        const modalGif = document.getElementById('modalGif'); const modalText = document.getElementById('modalText'); const modalBtn = document.getElementById('modalBtn');
        alertStep = 1;
        modalGif.src = "https://media.tenor.com/g9VvO_ub70gAAAAi/love-love-you.gif";
        modalText.innerHTML = `Ciyeee yang klik "Mau!" 😍`; modalBtn.innerText = "Hehehe 😁"; modalBtn.setAttribute("onclick", "nextAlert()");
        document.getElementById('customModal').classList.remove('hidden');
    }, 400); 
}

function nextAlert() {
    const modalGif = document.getElementById('modalGif'); const modalText = document.getElementById('modalText'); const modalBtn = document.getElementById('modalBtn');
    if (alertStep === 1) {
        alertStep = 2; modalGif.src = "https://media.tenor.com/w9UIdSg0f_0AAAAi/mochi-mochi-peach-cat-cat.gif";
        modalText.innerHTML = `Makasih yaaa ${namaPanggilan} udah mau nemenin aku terus~`; modalBtn.innerText = "Sama-samaaa ❤️";
    } else if (alertStep === 2) {
        alertStep = 3; modalGif.src = "https://media.tenor.com/Z8Nbe9V5f8AAAAAi/cute-cat.gif";
        modalText.innerHTML = `I love youuuu more! ❤️`; modalBtn.innerText = "Masuk ke Kuis Lucu 🧠";
    } else if (alertStep === 3) {
        document.getElementById('customModal').classList.add('hidden');
        document.getElementById('quizCard').classList.remove('hidden');
    }
}

function jawabQuiz(opsi) {
    playSound('cheer');
    document.getElementById('quizCard').classList.add('hidden');
    document.getElementById('funnyTitle').innerText = `Detik-detik ${namaPanggilan} Salting... 🤭`;
    document.getElementById('funnyCard').classList.remove('hidden');
}

function bukaPrankScanner() {
    document.getElementById('funnyCard').classList.add('hidden');
    document.getElementById('scanCard').classList.remove('hidden');
    const statusText = document.getElementById('scanStatus');
    setTimeout(() => { statusText.innerText = "Mendeteksi senyuman manis... (98% Terdeteksi) 🌺"; }, 1200);
    setTimeout(() => { statusText.innerText = "Mendeteksi salah tingkah... (100% SALTING BERAT!) 💓"; }, 2500);
    setTimeout(() => { 
        document.getElementById('scanCard').classList.add('hidden');
        document.getElementById('fingerprintCard').classList.remove('hidden');
    }, 4000);
}

function startScanFinger() {
    playSound('pop');
    const status = document.getElementById('fingerStatus');
    status.innerText = "Scanning Aura Keikhlasan... ⏳";
    fingerTimer = setTimeout(() => {
        playSound('cheer');
        status.innerText = "Aura 100% Tulus & Sayang Terdeteksi! ✅";
        setTimeout(() => {
            document.getElementById('fingerprintCard').classList.add('hidden');
            document.getElementById('meterCard').classList.remove('hidden');
        }, 1000);
    }, 2500);
}

function stopScanFinger() {
    clearTimeout(fingerTimer);
    const status = document.getElementById('fingerStatus');
    if(!status.innerText.includes("Terdeteksi")) {
        status.innerText = "Gagal! Tahan tombolnya jangan dilepas ih! ❌";
    }
}

function updateMeter(val) {
    const label = document.getElementById('sliderVal'); const nextBtn = document.getElementById('btnMeterNext');
    if (val < 40) { label.innerText = `Kangen: ${val}% (Dikit banget ih) 🥺`; nextBtn.classList.add('hidden'); }
    else if (val < 80) { label.innerText = `Kangen: ${val}% (Lumayan kangen) 🥰`; nextBtn.classList.add('hidden'); }
    else if (val < 100) { label.innerText = `Kangen: ${val}% (Kangen Banget!) ❤️`; nextBtn.classList.add('hidden'); }
    else {
        label.innerHTML = `Kangen: <strong>1000000% (POL-POLANNYA!) 💥</strong>`;
        nextBtn.classList.remove('hidden'); playSound('cheer'); heartBurst(null);
    }
}

function bukaHalamanSukses() {
    document.getElementById('meterCard').classList.add('hidden');
    document.getElementById('successCard').classList.remove('hidden');
    document.getElementById('floatingSurat').classList.remove('hidden'); 
    setInterval(updateTimer, 1000);
    clearInterval(fallingInterval); setInterval(createFallingParticle, 80); 
    for(let i=2; i<=4; i++) {
        const checked = localStorage.getItem('wish'+i) === 'true';
        document.getElementById('w'+i).checked = checked;
    }
}

function updateTimer() {
    const selisih = new Date() - targetDate;
    const d = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const h = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((selisih % (1000 * 60)) / 1000);
    document.getElementById('loveTimer').innerHTML = `${d} Hari, ${h} Jam, ${m} Menit, ${s} Detik`;
}

function saveWish(id) {
    const checked = document.getElementById('w'+id).checked;
    localStorage.setItem('wish'+id, checked);
    if(checked) { playSound('cheer'); heartBurst(null); }
}

function kasihKejutan() {
    playSound('cheer');
    for(let i=0; i<4; i++) { setTimeout(() => { heartBurst(null); }, i * 200); }
    const teksAcak = pesanKangen[Math.floor(Math.random() * pesanKangen.length)];
    const alasanAcak = alasanSayang[Math.floor(Math.random() * alasanSayang.length)];
    const modalGif = document.getElementById('modalGif'); const modalText = document.getElementById('modalText'); const modalBtn = document.getElementById('modalBtn');
    document.getElementById('inputNamaPanggilan').classList.add('hidden');
    modalGif.src = "https://media.tenor.com/7S8Yx1pcc2gAAAAi/funny-cat.gif";
    modalText.innerHTML = `${teksAcak} <br><br> <small style="color:#ff4d6d; font-weight:bold;">${alasanAcak}</small>`;
    modalBtn.innerText = "Tutup Surat 💖"; modalBtn.setAttribute("onclick", "document.getElementById('customModal').classList.add('hidden')");
    document.getElementById('customModal').classList.remove('hidden');
}

function klaimKupon(e) {
    playSound('cheer'); spawnHeartEffect(e.clientX, e.clientY); heartBurst(null);
    const kuponAcak = listKupon[Math.floor(Math.random() * listKupon.length)];
    const kuponCard = document.getElementById('kuponDigital');
    kuponCard.innerText = kuponAcak; kuponCard.style.background = "linear-gradient(135deg, #4cd137, #44bd32)";
    setTimeout(() => {
        const modalGif = document.getElementById('modalGif'); const modalText = document.getElementById('modalText'); const modalBtn = document.getElementById('modalBtn');
        modalGif.src = "https://media.tenor.com/g9VvO_ub70gAAAAi/love-love-you.gif";
        modalText.innerHTML = `Selamat! Kamu dapat: <br><strong style="color:#ff4d6d; font-size:1.1rem;">${kuponAcak}</strong><br><br><small style="color:#555;">Screenshot kupon ini terus kirim ke WhatsApp aku ya! 😉</small>`;
        modalBtn.innerText = "Simpan Kupon 📑"; modalBtn.setAttribute("onclick", "document.getElementById('customModal').classList.add('hidden')");
        document.getElementById('customModal').classList.remove('hidden');
    }, 500);
}

function bukaSuratRahasia(e) {
    playSound('pop'); spawnHeartEffect(e.clientX, e.clientY);
    const isiAcak = isiSuratRahasia[Math.floor(Math.random() * isiSuratRahasia.length)];
    const modalGif = document.getElementById('modalGif'); const modalText = document.getElementById('modalText'); const modalBtn = document.getElementById('modalBtn');
    modalGif.src = "https://media.tenor.com/w9UIdSg0f_0AAAAi/mochi-mochi-peach-cat-cat.gif";
    modalText.innerHTML = `💘 <strong>Pesan Rahasia Kecil:</strong><br><br>"${isiAcak}"`;
    modalBtn.innerText = "Aww, Meleleh.. 🥰"; modalBtn.setAttribute("onclick", "document.getElementById('customModal').classList.add('hidden');");
    document.getElementById('customModal').classList.remove('hidden');
}
