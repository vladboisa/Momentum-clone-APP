import { getTimeOfDay, greetingTimeOfDay } from "./greeting";
const dateElem = document.querySelector(".date");
const timeElem = document.querySelector(".time");
const optionsForLocaleDate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "GMT",
};
function showDate(
  dateTimeObj: Date,
  optionsForLocaleDate: Intl.DateTimeFormatOptions,
) {
  const currentDate = dateTimeObj.toLocaleDateString(
    "en-US",
    optionsForLocaleDate,
  );
  if (dateElem != undefined) {
    dateElem.textContent = currentDate;
  }
}
function showTime() {
  const dateTimeObj = new Date();
  const currentTime = dateTimeObj.toLocaleTimeString();
  if (timeElem != undefined) {
    timeElem.textContent = currentTime;
    greetingTimeOfDay(getTimeOfDay(dateTimeObj.getHours()));
    showDate(dateTimeObj, optionsForLocaleDate);
  }
  // Recursive refresh of a time by setTimeot
  setTimeout(showTime, 1000);
}
showTime();
