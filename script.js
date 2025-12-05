// Selectors
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Event Listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);

// Handlers
// Play and Pause Video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update the Play/Pause Icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Stop the Video
function stopVideo() {
  // Note: There is not a video.stop(), so let's manually code that logic
  video.currentTime = 0;
  video.pause();
}

// Update the Progress and Timestamp
function updateProgress() {
  console.log("time:", video.currentTime);
  console.log("duration:", video.duration);
  const percentage = (video.currentTime / video.duration) * 100;
  console.log("percentage:", percentage);

  progress.value = percentage;
}

// Compute the minutes
let minutes = Math.floor(video.currentTime / 60);

// Prefix with a zero (0) if the minutes are single digit values
if (minutes < 10) {
  minutes = "0" + String(minutes);
}

// Compute the seconds
let seconds = Math.floor(video.currentTime % 60);

// Prefix with a zero (0) if the seconds are single digit values
if (seconds < 10) {
  seconds = "0" + String(seconds);
}

timestamp.innerHTML = `${minutes}:${seconds}`;

// Set Video Timestamp to Progress
function setVideoProgress() {
  // Compute the location of the video based on the progress value
  const location = (Number(progress.value) * video.duration) / 100;

  // Sync the video's current time to the progress bar's value
  video.currentTime = location;

  // The line above triggers a `timeupdate` event which will invoke the `updateProgress` function
}

progress.addEventListener("input", setVideoProgress);
