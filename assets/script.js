const apiKey = '9256e0ebb626bdb6023cfcded73f029f'; // Replace with your actual OpenWeatherMap API key
const cityForm = document.getElementById('city');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecastInfo = document.getElementById('forecast-info');
const searchHistoryList = document.getElementById('search-history');
const clearHistoryBtn = document.getElementById('clear-history-btn');

cityForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeatherData(city);
    cityInput.value = '';
  }
});

function getWeatherData(city) {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
      updateCurrentWeather(data);
      updateForecastInfo(data);
      saveToSearchHistory(city);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function updateCurrentWeather(weatherData) {
  const cityName = weatherData.city.name;
  const date = new Date(weatherData.list[0].dt * 1000).toLocaleDateString();
  const iconCode = weatherData.list[0].weather[0].icon;
  const temperature = Math.round(weatherData.list[0].main.temp);
  const humidity = weatherData.list[0].main.humidity;
  const windSpeed = weatherData.list[0].wind.speed;

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
  const forecastItems = weatherData.list.filter((item, index) => index % 8 === 0).slice(0, 5);

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
}

function saveToSearchHistory(city) {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
  }
}

function displaySearchHistory() {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistoryList.innerHTML = '';

  searchHistory.forEach(city => {
    const searchItem = document.createElement('li');
    searchItem.textContent = city;
    searchItem.addEventListener('click', function() {
      getWeatherData(city);
    });

    searchHistoryList.appendChild(searchItem);
  });

  // Add Clear History button
  const clearHistoryItem = document.createElement('li');
  clearHistoryItem.appendChild(clearHistoryBtn);
  searchHistoryList.appendChild(clearHistoryItem);
}

function clearSearchHistory() {
  localStorage.removeItem('searchHistory');
  displaySearchHistory();
}

clearHistoryBtn.addEventListener('click', clearSearchHistory);

displaySearchHistory();
