import * as dateAndTime from "./dateAndTime.js";
import * as greeting from "./greeting.js";
import * as weather from "./weatherApi.js";
import * as quote from "./quote.js";
import * as audio from "./audio.js";

const dateTimeObj = new Date();

function getRandomNumbImages(minNumbOfImages = 1, maxNumbOfImages = 20) {
  minNumbOfImages = Math.ceil(minNumbOfImages);
  maxNumbOfImages = Math.floor(maxNumbOfImages);
  return (
    Math.floor(Math.random() * (maxNumbOfImages - minNumbOfImages + 1)) +
    minNumbOfImages
  ); //Max and min includes
}
const bodyElem = document.querySelector("body");

function preloadBgImages(urlImage) {
  const img = new Image();
  img.src = urlImage;
  img.onload = () => {
    bodyElem.style.backgroundImage = `url('${urlImage}')`;
  };
}
let randomImageNumb = getRandomNumbImages();

async function setBackgroundBody(
  timeOfDay = greeting.getTimeOfDay(dateTimeObj.getHours()),
  randomNumb = randomImageNumb
) {
  const urlPathOfImages = `assets/img/${timeOfDay}/${String(randomNumb).padStart(2, "0")}.webp`; //If number of image 1digit add '0' for url path
  preloadBgImages(urlPathOfImages);
  return urlPathOfImages;
}
setBackgroundBody();
const slideNextBtn = document.querySelector(".slide-next");

function getSlideNext() {
  randomImageNumb >= 20 ? (randomImageNumb = 1) : randomImageNumb++;
  setBackgroundBody();
}
slideNextBtn.addEventListener("click", getSlideNext);
const slidePrevBtn = document.querySelector(".slide-prev");

function getSlidePrev() {
  randomImageNumb === 1 ? (randomImageNumb = 20) : randomImageNumb--;
  setBackgroundBody();
}
slidePrevBtn.addEventListener("click", getSlidePrev);