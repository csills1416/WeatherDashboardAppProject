const apiKey = '9256e0ebb626bdb6023cfcded73f029f'; // Replace with your actual OpenWeatherMap API key
const cityForm = document.getElementById('city');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecastInfo = document.getElementById('forecast-info');

cityForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeatherData(city);
    cityInput.value = '';
  }
});

function getWeatherData(city) {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
      updateCurrentWeather(data)
      updateForecastInfo(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function updateCurrentWeather(weatherData) {
  const cityName = weatherData.name;
  const date = new Date(weatherData.dt * 1000).toLocaleDateString();
  const iconCode = weatherData.weather[0].icon;
  const temperature = Math.round(weatherData.main.temp);
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;

  const currentWeatherHTML = `
    <h3>${cityName} (${date})</h3>
    <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;

  currentWeather.innerHTML = currentWeatherHTML;
}

function updateForecastInfo(weatherdata) {
  const forecastItems = weatherdata.list.slice(1, 6);

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
