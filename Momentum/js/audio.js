import playList from "./playList.js";

const audio = new Audio();
let isPlay = false;
let songNum = 0;

const playElem = document.querySelector(".play");
const playNextElem = document.querySelector(".play-next");
const playPrevElem = document.querySelector(".play-prev");

function pauseAudio() {
  isPlay = false;
  audio.pause();
  playElem.classList.toggle("pause");
}
function playAudio() {
  audio.src = playList[songNum].src;
  if (!isPlay) {
    isPlay = true;
    audio.play();
    playElem.classList.toggle("pause");
  } else pauseAudio();
}
function playNext() {
  songNum === playList.length ? (songNum = 0) : songNum++;
  playAudio();
}
function playPrev() {
  songNum === 0 ? (songNum = playList.length) : songNum--;
  playAudio();
}

playNextElem.addEventListener("click", playNext);
playPrevElem.addEventListener("click", playPrev);
playElem.addEventListener("click", playAudio);
