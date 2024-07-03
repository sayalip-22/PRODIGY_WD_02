let startTime; // Timestamp when the stopwatch starts
let elapsedTime = 0; // Time elapsed in milliseconds
let timerInterval; // Interval instance for updating the stopwatch

function startStopwatch() {
    // Initialize startTime if it's not already set
    if (!startTime) {
        startTime = Date.now() - elapsedTime;
    }
    timerInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
    toggleButtons(true);
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    toggleButtons(false);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = null;
    elapsedTime = 0;
    updateTime();
    toggleButtons(false);
    document.getElementById("laps").innerHTML = '';
}

function recordLap() {
    if (startTime) {
        let lapTime = elapsedTime;
        let lapItem = document.createElement('li');
        lapItem.innerText = formatTime(lapTime);
        document.getElementById("laps").appendChild(lapItem);
    }
}

function updateTime() {
    if (startTime) {
        elapsedTime = Date.now() - startTime;
        document.getElementById("display").innerText = formatTime(elapsedTime);
    }
}

function formatTime(milliseconds) {
    let date = new Date(milliseconds);
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    let centiseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${seconds}.${centiseconds}`;
}

function toggleButtons(running) {
    document.getElementById("startButton").disabled = running;
    document.getElementById("pauseButton").disabled = !running;
    document.getElementById("lapButton").disabled = !running;
}
