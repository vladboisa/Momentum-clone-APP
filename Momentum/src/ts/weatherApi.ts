import { getLocalStorageInputValue, setLocalStorageInputValue } from "./localStorage";

const weatherIconElem = document.querySelector(".weather-icon");
const tempElem = document.querySelector(".temperature");
const weatherDescrElem = document.querySelector(".weather-description");
const cityInputElem:HTMLInputElement | null = document.querySelector(".city");
const weatherErrElem = document.querySelector(".weather-error");
const weatherWindElem = document.querySelector(".wind");
const weatherHumidityElem = document.querySelector(".humidity");

cityInputElem?.addEventListener("change", (event) => {
  const eventTarget = event?.target as HTMLInputElement
  const cityInputValue = eventTarget?.value
  if (cityInputValue != undefined) {
    getWeather(cityInputValue);
  }
});
//Check town in localstorage if missing setting in default town `Minsk`
//TODO Refactor Try to minimize code with function err
async function getWeather(
  town = `${
    ((localStorage.getItem("town") !== null) && (localStorage.getItem("town") !== ''))
    ? localStorage.getItem("town")
    : `Minsk`
  }`,
  lang = `ru`
  ) {
  const API_key = `3ca227a7629f53d785660c8f24d59f6d`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&lang=${lang}&appid=${API_key}&units=metric`;
  if (tempElem && weatherDescrElem && weatherWindElem && weatherHumidityElem && weatherIconElem && weatherErrElem != undefined) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        weatherIconElem.classList.add(
          `owf-${data.weather[0].id}-${data.weather[0].icon.substr(2)}` //For day&night icon need delete 2 letter's
          );
      tempElem.textContent = `${Math.floor(data.main.temp)}°C`;
      weatherDescrElem.textContent = data.weather[0].description;
      weatherHumidityElem.textContent = `Humidity: ${data.main.humidity}%`;
      weatherWindElem.textContent = `Wind speed: ${data.wind.speed} m/s`;
      weatherErrElem.classList.remove("error");
      weatherErrElem.textContent = ``;
    } else {
      weatherErrElem.textContent = `${data.message}`;
      weatherErrElem.classList.add("error");
      [tempElem,weatherDescrElem,weatherWindElem,weatherHumidityElem].forEach(elem=>{
        elem.textContent = ``;
      });
      weatherIconElem.className = "weather-icon owf"; //Remove icon of weather by default className
    }
  } catch (err) {
    weatherErrElem.classList.add("error");
    weatherErrElem.textContent = `${err}`;
  }
}
}

getWeather();

if (cityInputElem instanceof HTMLInputElement) {
  // Set local storage before reloaded and closed page
  window.addEventListener("beforeunload", () => {
    setLocalStorageInputValue(cityInputElem,"town")
  }
    );

  // Get local storage before loaded page
  window.addEventListener("load", () => {
    getLocalStorageInputValue(cityInputElem,"town")
  });
  }
