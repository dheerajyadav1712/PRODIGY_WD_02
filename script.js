// Stopwatch Variables
let startTime = 0, elapsedTime = 0, stopwatchInterval;
let running = false, lapCounter = 1;

// Start Stopwatch
function startStopwatch() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10);
        running = true;
    }
}

// Pause Stopwatch
function pauseStopwatch() {
    if (running) {
        clearInterval(stopwatchInterval);
        elapsedTime = Date.now() - startTime;
        running = false;
    }
}

// Reset Stopwatch
function resetStopwatch() {
    clearInterval(stopwatchInterval);
    document.getElementById("stopwatchDisplay").innerText = "00:00:00.000";
    document.getElementById("laps").innerHTML = "";
    running = false;
    startTime = 0;
    elapsedTime = 0;
    lapCounter = 1;
}

// Update Stopwatch Display
function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    let milliseconds = (elapsedTime % 1000).toString().padStart(3, '0');
    let seconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0');
    let minutes = Math.floor((elapsedTime / 60000) % 60).toString().padStart(2, '0');
    let hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');

    document.getElementById("stopwatchDisplay").innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Add Lap Functionality
function lapTime() {
    if (!running) return;
    let lapText = document.getElementById("stopwatchDisplay").innerText;
    let lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${lapCounter}: ${lapText}`;
    document.getElementById("laps").appendChild(lapItem);
    lapCounter++;
}

// Function to Update Live Clock & Date
function updateLiveClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    let clockText = `${hours}:${minutes}:${seconds} ${ampm}`;
    let dateText = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    document.getElementById("headerClock").innerText = clockText;
    document.getElementById("headerDate").innerText = dateText;
}

// Update Clock Every Second
setInterval(updateLiveClock, 1000);
updateLiveClock();

// Section Navigation
function showSection(sectionId) {
    document.querySelectorAll('.box').forEach(box => box.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

// Show Stopwatch by Default
showSection('stopwatch');
