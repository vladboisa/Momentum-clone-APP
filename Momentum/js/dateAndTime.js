import { getTimeOfDay, greetingTimeOfDay } from "./greeting.js";
const dateElem = document.querySelector(".date");
const optionsForLocaleDate = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "GMT",
};
function showDate(dateTimeObj) {
  const currentDate = dateTimeObj.toLocaleDateString(
    "ru-RU",
    optionsForLocaleDate
  );
  dateElem.textContent = currentDate;
}
const timeElem = document.querySelector(".time");
function showTime() {
  const dateTimeObj = new Date();
  const currentTime = dateTimeObj.toLocaleTimeString();
  timeElem.textContent = currentTime;
  greetingTimeOfDay(getTimeOfDay(dateTimeObj.getHours()));
  showDate(dateTimeObj);
  // Recursive refresh of a time by setTimeot
  setTimeout(showTime, 1000);
}
showTime();
