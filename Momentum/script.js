const htmlElem = document.querySelector("html");
const head = document.getElementById("id");
console.log("🚀 ~ file: script.js ~ line 3 ~ head", head.offsetLeft);
let posLeft = 0,
  posTop = 0;
function s() {
  if (posLeft > 200) {
    posLeft = 0;
    posTop += 1;
    head.style.top = `${posTop}px`;
  } else {
    posLeft += 1;
    head.style.left = `${posLeft}px`;
  }
}
let intervalId = setInterval(s, 30);
