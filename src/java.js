function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayToday = now.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Desember",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let day = days[dayToday];

  return `${month} ${date}, ${year}, ${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5c5db0dc3239cb6542e1902d9da964f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Temperature

function showTemperature(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  let cityName = document.querySelector("#search-city");
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = temperature;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity 💧  ${response.data.main.humidity} %`;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind 💨 ${Math.round(response.data.wind.speed)} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

//City
function search(city) {
  let apiKey = "5c5db0dc3239cb6542e1902d9da964f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

//CurrentPosition

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5c5db0dc3239cb6542e1902d9da964f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", getCurrentCity);

////

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = formatDate(now);

///
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

///
search("Paris");

////
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farenheitTemp);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusTemp = null;

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemp);
}
let celsiusLink = document.querySelector("#celcium");
celsiusLink.addEventListener("click", convertToCelsius);

///
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  
            <div class="col">
              <div class="days">${formatDay(forecastDay.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="40">
              <div class="temp">
              <span class="max-temp">
                ${Math.round(forecastDay.temp.max)}° | </span>
              <span class="min-temp">
                ${Math.round(forecastDay.temp.min)}° </span>
              </div>
            </div>
            
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//Quick Search Kyiv

function doQuickSearchKyiv(event) {
  event.preventDefault();
  let quickSearchBtn = document.querySelector("#quick-search_kyiv");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${quickSearchBtn.innerHTML}`;
  let searchInput = document.querySelector(".input-city");
  searchInput.value = `${quickSearchBtn.innerHTML}`;
  searchInput.value = searchInput.value.trim();
  let apiKey = "5c5db0dc3239cb6542e1902d9da964f5";
  let city = searchInput.value.trim();
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let quickSearchKyiv = document.querySelector("#quick-search_kyiv");
quickSearchKyiv.addEventListener("click", doQuickSearchKyiv);

//Quick Search London

function doQuickSearchLondon(event) {
  event.preventDefault();
  let quickSearchBtn = document.querySelector("#quick-search_london");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${quickSearchBtn.innerHTML}`;
  let searchInput = document.querySelector(".input-city");
  searchInput.value = `${quickSearchBtn.innerHTML}`;
  searchInput.value = searchInput.value.trim();
  let apiKey = "5c5db0dc3239cb6542e1902d9da964f5";
  let city = searchInput.value.trim();
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let quickSearchLondon = document.querySelector("#quick-search_london");
quickSearchLondon.addEventListener("click", doQuickSearchLondon);

//Quick Search New York

function doQuickSearchNewYork(event) {
  event.preventDefault();
  let quickSearchBtn = document.querySelector("#quick-search_NewYork");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${quickSearchBtn.innerHTML}`;
  let searchInput = document.querySelector(".input-city");
  searchInput.value = `${quickSearchBtn.innerHTML}`;
  searchInput.value = searchInput.value.trim();
  let apiKey = "5c5db0dc3239cb6542e1902d9da964f5";
  let city = searchInput.value.trim();
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let quickSearchNewYork = document.querySelector("#quick-search_NewYork");
quickSearchNewYork.addEventListener("click", doQuickSearchNewYork);

//Quick Search Paris

function doQuickSearchParis(event) {
  event.preventDefault();
  let quickSearchBtn = document.querySelector("#quick-search_Paris");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${quickSearchBtn.innerHTML}`;
  let searchInput = document.querySelector(".input-city");
  searchInput.value = `${quickSearchBtn.innerHTML}`;
  searchInput.value = searchInput.value.trim();
  let apiKey = "5c5db0dc3239cb6542e1902d9da964f5";
  let city = searchInput.value.trim();
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let quickSearchParis = document.querySelector("#quick-search_Paris");
quickSearchParis.addEventListener("click", doQuickSearchParis);
