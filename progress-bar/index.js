const progress = document.getElementById("progress");
let isInProgress = false;
let reqAniFrameId;

const progressController = document.querySelector(".progress-controller");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

stopButton.disabled = true;
progressController.addEventListener("click", clickHandler);

function clickHandler(e) {
  const id = e.target.id;

  if (id === "start" && !isInProgress) {
    onStart();
  } else if (id === "stop" && isInProgress) {
    onStop();
  } else if (id === "reset") {
    onStop();
    setProgressWidth(0);
  }
}

function onStop() {
  isInProgress = false;
  stopProgress();
}

function onStart() {
  isInProgress = true;
  startButton.disabled = true;
  stopButton.disabled = false;
  startProgress();
}

function startProgress() {
  let progressPercent = 1 + getProgressWidth();

  if (progressPercent < 100) {
    setProgressWidth(progressPercent);
    reqAniFrameId = requestAnimationFrame(startProgress);
  } else {
    setTimeout(stopProgress, 100);
  }
}

function stopProgress() {
  startButton.disabled = false;
  stopButton.disabled = true;
  cancelAnimationFrame(reqAniFrameId);
}

function getProgressWidth() {
  return +progress.style.width.split("%")[0];
}

function setProgressWidth(progressPercent) {
  progress.style.width = progressPercent + "%";
}
