// Valentine Terminal Unlock – ABU x MISKI 2026
const typewriter = document.getElementById('typewriter');
const inputArea  = document.getElementById('input-area');
const abuInput   = document.getElementById('abu-zodiac');
const miskiInput = document.getElementById('miski-zodiac');
const submitBtn  = document.getElementById('submit-btn');
const checking   = document.getElementById('checking-msg');
// Music elements
const musicControls = document.getElementById('music-controls');
const musicToggle   = document.getElementById('music-toggle');
const audio         = document.getElementById('bg-music');

let isMusicPlaying = false;

// Optional: start at low volume so it's romantic/not overwhelming
audio.volume = 0.3;  // 30% — feel free to change to 0.2 or 0.4 later

let isTyping = false;

function typeText(text, speed = 50) {
    return new Promise(resolve => {
        if (isTyping) return;
        isTyping = true;
        let i = 0;
        typewriter.innerHTML += '> ';
        const interval = setInterval(() => {
            if (i < text.length) {
                typewriter.innerHTML += text.charAt(i);
                i++;
                typewriter.scrollIntoView({ behavior: 'smooth', block: 'end' });
            } else {
                clearInterval(interval);
                isTyping = false;
                resolve();
            }
        }, speed);
    });
}

function blinkAndClear(times = 3, delay = 400) {
    let count = 0;
    const original = typewriter.innerHTML;
    const blink = setInterval(() => {
        count++;
        typewriter.style.opacity = (count % 2 === 0) ? '1' : '0';
        if (count >= times * 2) {
            clearInterval(blink);
            typewriter.innerHTML = '';
            typewriter.style.opacity = '1';
        }
    }, delay);
}
function launchHeartConfetti() {
    const duration = 4000; // 4 seconds of confetti
    const end = Date.now() + duration;

    (function frame() {
        // Left side hearts
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: Math.random() - 0.2 },
            shapes: ['heart'], // heart shape
            colors: ['#ff4d6d', '#ff88cc', '#dd99ff', '#ffccff', '#ff5faa'],
            ticks: 200
        });

        // Right side hearts
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: Math.random() - 0.2 },
            shapes: ['heart'],
            colors: ['#ff4d6d', '#ff88cc', '#dd99ff', '#ffccff', '#ff5faa'],
            ticks: 200
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
async function checkAccess() {
    const abu   = abuInput.value.trim().toLowerCase();
    const miski = miskiInput.value.trim().toLowerCase();

    submitBtn.disabled = true;
    checking.classList.remove('hidden');

    await new Promise(r => setTimeout(r, 1800));

    checking.classList.add('hidden');
    submitBtn.disabled = false;

    if (abu === 'scorpio' && miski === 'gemini') {
        typewriter.innerHTML = '';
        await typeText('ACCESS GRANTED. ❤️\n\n');
        blinkAndClear(3, 300);
        launchHeartConfetti();
        await new Promise(r => setTimeout(r, 1400));
        await typeText('welcome to my valentine special, my beloved Miski Miski 🥰\n');
        await typeText('> scroll down for a surprise');
        document.body.classList.remove('locked');
        inputArea.classList.add('hidden');
        document.getElementById('music-controls').classList.remove('hidden');
    } else {
        typewriter.innerHTML += '\n\n> Access denied. Try again 💀\n';
        abuInput.value = '';
        miskiInput.value = '';
        abuInput.focus();
    }
}

// Sequence
window.addEventListener('load', async () => {
    await typeText('initializing Valentine Special ABU X MISKI');
    blinkAndClear(3);
    await new Promise(r => setTimeout(r, 1200));
    typewriter.innerHTML = '';
    await typeText('loading memories... but first answer this to grant access:\n');
    inputArea.classList.remove('hidden');
    abuInput.focus();
});

// Enter key support
abuInput.addEventListener('keypress', e => { if (e.key === 'Enter') miskiInput.focus(); });
miskiInput.addEventListener('keypress', e => { if (e.key === 'Enter') checkAccess(); });
submitBtn.addEventListener('click', checkAccess);
// Music toggle functionality
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        audio.pause();
        musicToggle.textContent = 'Play ♡';
    } else {
        audio.play()
            .then(() => {
                musicToggle.textContent = 'Pause ⏸';
            })
            .catch(err => {
                console.log("Play blocked by browser – try tapping again", err);
                // Some browsers require a second tap for audio
                musicToggle.textContent = 'Tap again ♡';
            });
    }
    isMusicPlaying = !isMusicPlaying;
});