let intervalId = null;
let seconds = 0;
const timeLabel = document.getElementById("timeLabel");
const datePicker = document.getElementById("datePicker");

// Set current date in date picker
const currentDate = new Date().toISOString().split("T")[0];
datePicker.value = currentDate;

// Update time display
function formatTime(sec) {
  const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
  const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

// Async function to start the stopwatch
async function startStopwatch() {
  return new Promise((resolve) => {
    intervalId = setInterval(() => {
      seconds++;
      timeLabel.innerText = formatTime(seconds);
    }, 1000);
    resolve();
  });
}

// Start button click handler
document.getElementById("startBtn").addEventListener("click", async () => {
  if (!intervalId) {
    await startStopwatch();
  }
});

// Stop button click handler
document.getElementById("stopBtn").addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});

// Reset button click handler
document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  seconds = 0;
  timeLabel.innerText = "00:00:00";
});
