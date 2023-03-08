const nameElem = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("name", nameElem.value);
}
// Set local storage before reloaded and closed page
window.addEventListener("beforeunload", setLocalStorage);
// Get local storage before loaded page
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    nameElem.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

export function getTimeOfDay(hours) {
  if (hours < 6) {
    return `night`;
  } else if (hours >= 12 && hours < 18) {
    return `afternoon`;
  } else if (hours >= 18) {
    return `evening`;
  } else return `morning`;
}
export function greetingTimeOfDay(timeOfDay) {
  const greetingElem = document.querySelector(".greeting");
  greetingElem.textContent = `Good ${timeOfDay}`;
}
