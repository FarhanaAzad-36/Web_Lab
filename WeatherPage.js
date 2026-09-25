// STEP 8: CLIENT STATE MANAGEMENT & LOCAL CACHING
// =================================================

// 1. APPLICATION STATE

let isCentigrade = true;

let weatherCache = null;


// 2. WEATHER CONDITION HELPER

function decodeWMO(code) {

  if (code === 0) {
    return {
      desc: "Clear Sky",
      icon: "☀️"
    };
  }

  if (code <= 3) {
    return {
      desc: "Cloudy",
      icon: "⛅"
    };
  }

  if (code >= 51 && code <= 65) {
    return {
      desc: "Rain",
      icon: "🌧️"
    };
  }

  return {
    desc: "Sunny",
    icon: "☀️"
  };
}


// 3. TEMPERATURE CONVERSION

function formatTemp(centigradeValue) {

  if (isCentigrade) {

    return Math.round(centigradeValue);

  } else {

    // Centigrade to Kelvin
    // K = °C + 273.15

    return Math.round(centigradeValue + 273.15);

  }
}


// DOM Elements

const searchForm =
  document.getElementById('searchForm');

const cityInput =
  document.getElementById('cityInput');

const unitToggle =
  document.getElementById('unitToggle');

const unitDisplay =
  document.getElementById('unitDisplay');

const cityNameEl =
  document.getElementById('cityName');

const countryEl =
  document.getElementById('cityCountry');

const currentTempEl =
  document.getElementById('currentTemp');

const weatherDescEl =
  document.getElementById('weatherDesc');

const weatherIconEl =
  document.getElementById('weatherIcon');

const forecastGridEl =
  document.getElementById('forecastGrid');


// 4. RENDER FUNCTION

function renderWeatherUI() {

  if (!weatherCache) return;

  const {
    location,
    current,
    daily
  } = weatherCache;

  const cond =
    decodeWMO(current.weather_code);


  cityNameEl.textContent =
    location.name;

  countryEl.textContent =
    location.country || "";


  // Render temperature

  currentTempEl.textContent =
    formatTemp(current.temperature_2m);


  unitDisplay.textContent =
    isCentigrade ? "°C" : "K";


  unitToggle.textContent =
    isCentigrade ? "°C" : "K";


  weatherDescEl.textContent =
    cond.desc;

  weatherIconEl.textContent =
    cond.icon;


  // 5-Day Forecast

  forecastGridEl.innerHTML = "";

  for (let i = 0; i < 5; i++) {

    const card =
      document.createElement('div');

    card.className =
      "forecast-card";


    const day =
      new Date(daily.time[i])
        .toLocaleDateString(
          'en-US',
          { weekday: 'short' }
        );


    const maxTemp =
      formatTemp(
        daily.temperature_2m_max[i]
      );


    const minTemp =
      formatTemp(
        daily.temperature_2m_min[i]
      );


    const condition =
      decodeWMO(
        daily.weather_code[i]
      );


    card.innerHTML = `
      <div class="day">${day}</div>

      <div class="icon">
        ${condition.icon}
      </div>

      <div class="temp">
        ${maxTemp}° / ${minTemp}°
      </div>
    `;


    forecastGridEl.appendChild(card);
  }
}


// 5. FETCH WEATHER DATA

async function fetchAndCacheWeather(city) {

  try {

    // Get city coordinates

    const geoUrl =
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;


    const geoRes =
      await fetch(geoUrl);

    const geoData =
      await geoRes.json();


    if (
      !geoData.results ||
      geoData.results.length === 0
    ) {

      throw new Error(
        "City not found"
      );

    }


    const loc =
      geoData.results[0];


    // Get weather forecast

    const forecastUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;


    const res =
      await fetch(forecastUrl);

    const data =
      await res.json();


    // Store API response in cache

    weatherCache = {

      location: loc,

      current: data.current,

      daily: data.daily

    };


    console.info(
      "API data cached in memory. Rendering UI..."
    );


    renderWeatherUI();


  } catch (err) {

    console.error(
      err.message
    );

    alert(
      err.message
    );

  }
}


// 6. EVENT LISTENERS


searchForm.addEventListener(
  'submit',
  (e) => {

    e.preventDefault();

    const city =
      cityInput.value.trim();

    if (city) {

      fetchAndCacheWeather(city);

    }

  }
);


// Centigrade / Kelvin Toggle

unitToggle.addEventListener(
  'click',
  () => {

    isCentigrade =
      !isCentigrade;


    console.log(
      "Switched unit state to:",
      isCentigrade
        ? "Centigrade (°C)"
        : "Kelvin (K)"
    );


    // No API request here

    renderWeatherUI();

  }
);


// Initial load

fetchAndCacheWeather("Dubai");