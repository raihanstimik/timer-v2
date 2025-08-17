const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsContainer = document.getElementById('laps').querySelector('ul');

let interval = null;
let time = 0; // in milliseconds
let lapTimes = [];

function updateDisplay() {
    const ms = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const s = totalSeconds % 60;
    const m = Math.floor(totalSeconds / 60);
    display.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
}

function startPause() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        startPauseBtn.textContent = 'Start';
    } else {
        interval = setInterval(() => {
            time += 10;
            updateDisplay();
        }, 10);
        startPauseBtn.textContent = 'Pause';
    }
}

function renderLaps() {
    lapsContainer.innerHTML = '';
    lapTimes.forEach((t, i) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${i + 1}: ${formatTime(t)}`;
        lapsContainer.appendChild(li);
    });
}

function recordLap() {
    lapTimes.push(time);
    renderLaps();
}

function resetTime() {
    clearInterval(interval);
    interval = null;
    time = 0;
    lapTimes = [];
    updateDisplay();
    renderLaps();
    startPauseBtn.textContent = 'Start';
}

function formatTime(t) {
    const ms = t % 1000;
    const totalSeconds = Math.floor(t / 1000);
    const s = totalSeconds % 60;
    const m = Math.floor(totalSeconds / 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
}

startPauseBtn.addEventListener('click', startPause);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetTime);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
            event.preventDefault();
            startPause();
            break;
        case 'r':
            event.preventDefault();
            resetTime();
            break;
        case 'l':
            event.preventDefault();
            recordLap();
            break;
        default:
            break;
    }
});

updateDisplay(); // Set display awal
renderLaps(); // Set lap awal