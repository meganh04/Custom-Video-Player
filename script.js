// Selectors
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Safe addEventListener helper
function safeAdd(el, ev, fn) {
  if (el) el.addEventListener(ev, fn);
}

// Event Listeners (only attach when elements exist)
safeAdd(video, "click", toggleVideoStatus);
safeAdd(video, "pause", updatePlayIcon);
safeAdd(video, "play", updatePlayIcon);
safeAdd(video, "timeupdate", updateProgress);
safeAdd(video, "loadedmetadata", updateProgress);

safeAdd(play, "click", toggleVideoStatus);
safeAdd(stop, "click", stopVideo);
safeAdd(progress, "change", setVideoProgress);
safeAdd(progress, "input", setVideoProgress);

// Handlers
function toggleVideoStatus() {
  if (!video) return;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (!play || !video) return;
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

function stopVideo() {
  if (!video) return;
  video.currentTime = 0;
  video.pause();
}

function updateProgress() {
  if (!video || !progress || !timestamp) return;

  if (!isFinite(video.duration) || video.duration === 0) {
    progress.value = 0;
    timestamp.innerHTML = '00:00';
    return;
  }

  const percentage = (video.currentTime / video.duration) * 100;
  progress.value = Math.min(100, Math.max(0, percentage));

  const minutes = Math.floor(video.currentTime / 60);
  const seconds = Math.floor(video.currentTime % 60);
  timestamp.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function setVideoProgress() {
  if (!video || !progress) return;
  const location = (Number(progress.value) * video.duration) / 100;
  if (isFinite(location)) video.currentTime = location;
}
