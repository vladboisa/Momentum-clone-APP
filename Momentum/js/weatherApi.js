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

async function getWeather(town = "Minsk") {
  const API_key = `3ca227a7629f53d785660c8f24d59f6d`;
  const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${town}&lang=en&appid=${API_key}&units=metric`;
  try {
    const res = await fetch(url, { headers: {} });
    const data = await res.json();
    if (res.ok) {
      weatherIconElem.className = "weather-icon owf";
      weatherIconElem.classList.add(
        `owf-${data.weather[0].id}-${data.weather[0].icon.substr(2)}` //For day&night icon need delete 2 letter's
      );
      tempElem.textContent = `${data.main.temp}°C`;
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
