import { playList } from "./playList";

const audio = new Audio(); //instanse for playing audio
let isPlay = false;
let songNum = 0;
audio.src = playList[songNum].src; //Initialize  source of audio element like first elem of playlist
const playElem = document.querySelector(".play");
const playNextElem = document.querySelector(".play-next");
const playPrevElem = document.querySelector(".play-prev");
const playListElem = document.querySelector(".play-list");
const progressBarElem: HTMLInputElement | null = document.querySelector(
  ".player-progressbar",
);
const progressBarCurrentTimeElem = document.querySelector(
  ".player-currenttime",
);
const progressBarDurationElem = document.querySelector(".player-duration");

//* Append song's from playList
function appendPlayList() {
  playList.forEach((el, _index) => {
    const li = document.createElement("li");
    li.dataset.playListNum = String(_index);
    li.classList.add("play-item");
    li.textContent = el.title;
    li.dataset.playListUnicodeContent = `\u2715`; //*styling data attribute of ::before elem with unicode Icon of mistake
    playListElem?.appendChild(li);
  });
}
appendPlayList();
const playItemsNodeList = document.querySelectorAll(".play-item"); //*Find Node list Items after appending

audio.addEventListener("play", () => {
  const currentPlayItem = playItemsNodeList[songNum] as HTMLLIElement;
  setPlayListUnicodeContent(currentPlayItem);
});

//*Check if styling data attribute of ::before elem has unicode Icon of correct
function setPlayListUnicodeContent(htmlLiElementDataset: HTMLLIElement) {
  if (htmlLiElementDataset.dataset.playListUnicodeContent === `\u2713`) {
    return;
  } else {
    htmlLiElementDataset.dataset.playListUnicodeContent = `\u2713`;
    htmlLiElementDataset.style.setProperty("--color-playlist-item", "#2EFF2E");
  }
}
//*Play song by click on list of item's
function playSongByClick(event: Event) {
  if (event !== null && event.target instanceof HTMLLIElement) {
    songNum = Number(event.target.dataset?.playListNum ?? 0);
    audio.src = playList[isNaN(songNum) ? 0 : songNum].src;
    audio.play();
    playElem?.classList.add("pause");
    isPlay = true;
    setPlayListUnicodeContent(event.target);
  }
  return;
}
playListElem?.addEventListener("click", playSongByClick);

function pauseAudio() {
  isPlay = false;
  audio.pause();
  playElem?.classList.remove("pause");
}
function playAudio() {
  if (!isPlay) {
    isPlay = true;
    audio.play();
    playElem?.classList.add("pause");
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
function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds - min * 60);
  return `${min}:${sec < 10 ? `0${sec}` : sec}`; //If Seconds < 10 add 0 before numb of sec
}
function updateProgressValue() {
  if (progressBarElem instanceof HTMLInputElement) {
    progressBarElem.max = String(audio.duration ?? 0);
    progressBarElem.value = String(audio.currentTime ?? 0);
  }
  if (progressBarCurrentTimeElem != undefined) {
    progressBarCurrentTimeElem.textContent = formatTime(
      Math.floor(audio.currentTime),
    );
  }
  if (progressBarDurationElem != undefined) {
    progressBarDurationElem.textContent = formatTime(
      Math.floor(isNaN(audio.duration) ? 0 : audio.duration),
    );
  }
  setTimeout(updateProgressValue, 500);
}
updateProgressValue();
playNextElem?.addEventListener("click", playNext);
playPrevElem?.addEventListener("click", playPrev);
playElem?.addEventListener("click", playAudio);
//* automatically play the next song at the end of the audio object's duration
audio.addEventListener("ended", playNext);
//* when slider thumb is dragged - progressBar.value will be changed-
progressBarElem?.addEventListener("input", () => {
  audio.currentTime = Number(progressBarElem.value ?? 0);
  updateProgressValue();
});
