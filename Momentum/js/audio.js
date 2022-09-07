import playList from "./playList.js";

const audio = new Audio();
let isPlay = false;
let songNum = 0;
audio.src = playList[songNum].src;

const playElem = document.querySelector(".play");
const playNextElem = document.querySelector(".play-next");
const playPrevElem = document.querySelector(".play-prev");
const playListElem = document.querySelector(".play-list");
const progressBarElem = document.querySelector(".player-progressbar");
const progressBarCurrentTimeElem = document.querySelector(
  ".player-currenttime"
);
const progressBarDurationElem = document.querySelector(".player-duration");

function appendPlayList() {
  playList.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = el.title;
    playListElem.appendChild(li);
  });
}
function pauseAudio() {
  isPlay = false;
  audio.pause();
  playElem.classList.remove("pause");
}
function playAudio() {
  if (!isPlay) {
    isPlay = true;
    audio.play();
    playElem.classList.add("pause");
  } else pauseAudio();
}
function playNext() {
  songNum === playList.length - 1 ? (songNum = 0) : songNum++;
  isPlay = false;
  audio.src = playList[songNum].src;
  playAudio();
}
function playPrev() {
  songNum === 0 ? (songNum = playList.length - 1) : songNum--;
  isPlay = false;
  audio.src = playList[songNum].src;
  playAudio();
}
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}
function updateProgressValue() {
  progressBarElem.max = audio.duration;
  progressBarElem.value = audio.currentTime;
  progressBarCurrentTimeElem.innerHTML = formatTime(
    Math.floor(audio.currentTime)
  );
  progressBarDurationElem.innerHTML = formatTime(
    Math.floor(isNaN(audio.duration) ? 0 : audio.duration)
  );
  setTimeout(updateProgressValue, 500);
}

playNextElem.addEventListener("click", playNext);
playPrevElem.addEventListener("click", playPrev);
playElem.addEventListener("click", playAudio);
// automatically play the next song at the end of the audio object's duration
audio.addEventListener("ended", playNext);
// function where progressBar.value is changed when slider thumb is dragged
progressBarElem.addEventListener("input", (e) => {
  audio.currentTime = progressBarElem.value;
});
appendPlayList();
updateProgressValue();
