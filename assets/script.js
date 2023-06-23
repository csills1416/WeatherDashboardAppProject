const apiKey = '11af795699dc87d9506f101730b7ae93'; // Replace with your actual OpenWeatherMap API key
const geocodingApiKey = '11af795699dc87d9506f101730b7ae93'; // Replace with your actual geocoding API key
const cityForm = document.getElementById('city');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecastInfo = document.getElementById('forecast-info');

cityForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getCoordinates(city);
    cityInput.value = '';
  }
});

function getCoordinates(city) {
  const geocodingUrl = `https://api.geocoding-service.com/geocode?address=${encodeURIComponent(city)}&key=${geocodingApiKey}`;

  // Make a request to the geocoding service API to obtain the coordinates for the city
  fetch(geocodingUrl)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK' && data.results.length > 0) {
        const latitude = data.results[0].geometry.lat;
        const longitude = data.results[0].geometry.lng;
        getWeatherData(latitude, longitude);
        saveToSearchHistory(city);
      } else {
        console.log('Error: Unable to retrieve coordinates for the city.');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function getWeatherData(latitude, longitude) {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
      updateCurrentWeather(data);
      updateForecastInfo(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function updateCurrentWeather(weatherData) {
  const currentWeatherInfo = weatherData.list[0];
  const cityName = currentWeatherInfo.name;
  const date = new Date(currentWeatherInfo.dt * 1000).toLocaleDateString();
  const iconCode = currentWeatherInfo.weather[0].icon;
  const temperature = Math.round(currentWeatherInfo.main.temp);
  const humidity = currentWeatherInfo.main.humidity;
  const windSpeed = currentWeatherInfo.wind.speed;

  const currentWeatherHTML = `
    <h3>${cityName} (${date})</h3>
    <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;

  currentWeather.innerHTML = currentWeatherHTML;
}

function updateForecastInfo(weatherData) {
  const forecastItems = weatherData.list.slice(1, 6); // Extract the next 5 forecast items

  let forecastHTML = '';
  forecastItems.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    const iconCode = item.weather[0].icon;
    const temperature = Math.round(item.main.temp);
    const humidity = item.main.humidity;
    const windSpeed = item.wind.speed;

    forecastHTML += `
      <div class="forecast-item">
        <p>${date}</p>
        <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      </div>
    `;
  });
  forecastInfo.innerHTML = forecastHTML;

  displaySearchHistory();
}

function saveToSearchHistory(city) {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  if (searchHistory === null) {
    searchHistory = [];
  }
  searchHistory.push(city);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

  displaySearchHistory();
}

function displaySearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (searchHistory !== null) {
      const searchHistoryList = document.getElementById('search-history');
      searchHistoryList.innerHTML = '';
  
      searchHistory.forEach(city => {
        const searchItem = document.createElement('li');
        searchItem.textContent = city;
        searchItem.addEventListener('click', function() {
          getCoordinates(city);
        });
  
        searchHistoryList.appendChild(searchItem);
      });
    }
  }

displaySearchHistory();