const weatherIconElem = document.querySelector(".weather-icon");
const tempElem = document.querySelector(".temperature");
const weatherDescrElem = document.querySelector(".weather-description");
const cityInputElem = document.querySelector(".city");
const weatherErrElem = document.querySelector(".weather-error");
const weatherWindElem = document.querySelector(".wind");
const weatherHumidityElem = document.querySelector(".humidity");

cityInputElem.addEventListener("change", (event) => {
  getWeather(event.target.value);
});
//Check town in localstorage if missing setting in default town `Minsk`
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
  try {
    const res = await fetch(url, { headers: {} });
    const data = await res.json();
    if (res.ok) {
      weatherIconElem.className = "weather-icon owf";
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
      weatherIconElem.className = "weather-icon owf";
      tempElem.textContent = ``;
      weatherDescrElem.textContent = ``;
      weatherWindElem.textContent = ``;
      weatherHumidityElem.textContent = ``;
    }
  } catch (err) {
    weatherErrElem.textContent = `${err}`;
  }
}

getWeather();

function setLocalStorage() {
  localStorage.setItem("town", cityInputElem.value);
}
// Set local storage before reloaded and closed page

window.addEventListener("beforeunload", setLocalStorage);

// Get local storage before loaded page
function getLocalStorage() {
  if (localStorage.getItem("town")) {
    cityInputElem.value = localStorage.getItem("town");
  }
}
window.addEventListener("load", getLocalStorage);
