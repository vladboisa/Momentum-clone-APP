import {getTimeOfDay} from "./greeting";
import { dateTimeObj } from "./dateAndTime";

const slidePrevBtn = document.querySelector(".slide-prev");
const bodyElem = document.querySelector("body");
const slideNextBtn = document.querySelector(".slide-next");
const MIN_NUMB_OF_IMAGES = 1;
const MAX_NUMB_OF_IMAGES = 20; //*In every season image folder we have 20 max images
let randomImageNumb = getRandomNumbImages();

function getRandomNumbImages() {
  return (
    Math.floor(
      Math.random() * (MAX_NUMB_OF_IMAGES - MIN_NUMB_OF_IMAGES + MIN_NUMB_OF_IMAGES),
    ) + MIN_NUMB_OF_IMAGES
  ); //Max and min includes
}

function preloadBgImages(urlImage: string) {
  const img = new Image();
  img.src = urlImage;
  if (bodyElem != undefined) {
    img.onload = () => {
      bodyElem.style.background = `url('${urlImage}')`;
    };
  }
}

async function setBackgroundBody(
  timeOfDay = getTimeOfDay(dateTimeObj.getHours()),
  randomNumb = randomImageNumb,
) {
  const paddedRandomImgNumb = String(randomNumb).padStart(2, "0"); //If number of image 1digit add '0' for url path
  const moduleAsset = await import(`../assets/img/${timeOfDay}/${paddedRandomImgNumb}.webp`); //Dynamic Vite import for image assets
  const moduleAssetPath: string = moduleAsset.default;
  preloadBgImages(moduleAssetPath);
}

function getSlideNext() {
  randomImageNumb >= MAX_NUMB_OF_IMAGES
    ? (randomImageNumb = MIN_NUMB_OF_IMAGES)
    : randomImageNumb++;
  setBackgroundBody();
}
slideNextBtn?.addEventListener("click", getSlideNext);

function getSlidePrev() {
  randomImageNumb === MIN_NUMB_OF_IMAGES
    ? (randomImageNumb = MAX_NUMB_OF_IMAGES)
    : randomImageNumb--;
  setBackgroundBody();
}
slidePrevBtn?.addEventListener("click", getSlidePrev);
