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
//!TODO Styling elem icon when played next song
//Append song's from playList
function appendPlayList() {
  playList.forEach((el, index) => {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = el.title;
    li.dataset.playListNum = index;
    li.dataset.playListUnicodeContent = `\u2715`; //styling data attribute of ::before elem with unicode Icon of mistake
    playListElem.appendChild(li);
  });
}
//Play song by click on list of item's
function playSongByClick(event) {
  audio.src = playList[event.target.dataset.playListNum].src;
  audio.play();
  event.target.dataset.playListUnicodeContent = `\u2713`; //styling data attribute of ::before elem with unicode Icon of correct
  event.target.style.setProperty('--color-playlist-item',"#2EFF2E")
  playElem.classList.add("pause");
  isPlay = true;
}
playListElem.addEventListener("click", playSongByClick);

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
// when slider thumb is dragged - progressBar.value will be changed-
progressBarElem.addEventListener("input", () => {
  audio.currentTime = progressBarElem.value;
});
appendPlayList();
updateProgressValue();
