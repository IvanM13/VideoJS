"use strict"

const videoPanel = document.querySelector("video");
const btnPlay = document.querySelector(".fa-circle-play");
const btnPause = document.querySelector(".fa-circle-pause");
const volumeInput = document.querySelector(".volume");
const timing = document.querySelector(".timing");
const currentTime = document.querySelector(".watch-time");
const fullScreen = document.querySelector(".fa-expand");
const mute = document.querySelector(".fa-volume-xmark");
let prevVolume;

const timeParser = (time) => {
  const minutes = parseInt(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = parseInt(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

btnPlay.addEventListener("click", () => {
    videoPanel.play();
});

btnPause.addEventListener("click", () =>{
    videoPanel.pause();
});

mute.addEventListener("click", () => {
  if (videoPanel.volume !== 0) {
    prevVolume = videoPanel.volume;
    videoPanel.volume = 0;
    volumeInput.value = videoPanel.volume;
    mute.classList.add("red");
  } else {
    videoPanel.volume = prevVolume;
    volumeInput.value = videoPanel.volume;
    mute.classList.remove("red");
  }
});

fullScreen.addEventListener("click", () => videoPanel.requestFullscreen());

videoPanel.addEventListener("timeupdate", () => {
  currentTime.innerHTML = `${timeParser(
    parseInt(videoPanel.currentTime)
  )} / ${timeParser(parseInt(videoPanel.duration))}`;
  timing.value = (videoPanel.currentTime / videoPanel.duration) * 100;
});

volumeInput.addEventListener("input", () => {
  videoPanel.volume = volumeInput.value;
});

timing.addEventListener("input", () => {
  videoPanel.currentTime = (timing.value / 100) * videoPanel.duration;
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      videoPanel.currentTime += 5;
      break;
    case "ArrowLeft":
      videoPanel.currentTime -= 5;
      break;
    case "ArrowUp":
      if (videoPanel.volumeInput <= 0.95) {
        videoPanel.volumeInput += 0.05;
        volumeInput.value = videoPanel.volumeInput;
      } else {
        videoPanel.volumeInput = 1;
        volumeInput.value = videoPanel.volumeInput;
      }
      break;
    case "ArrowDown":
      if (videoPanel.volumeInput >= 0.05) {
        videoPanel.volumeInput -= 0.05;
        volumeInput.value = videoPanel.volumeInput;
      } else {
        videoPanel.volumeInput = 0;
        volumeInput.value = videoPanel.volumeInput;
      }
      break;
  }
});