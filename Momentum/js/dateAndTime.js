const timeElem = document.querySelector(".time");
function showTime() {
  const timeObj = new Date();
  const currentTime = timeObj.toLocaleTimeString();
  timeElem.textContent = currentTime;
  // Рекурсивное обновление времени setTimeOut'ом
  setTimeout(showTime, 1000);
}
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "GMT",
};
const dateElem = document.querySelector(".date");
function showDate() {
  const dateObj = new Date();
  const currentDate = dateObj.toLocaleDateString("ru-RU", options);
  dateElem.textContent = currentDate;
}
showTime();
showDate();
