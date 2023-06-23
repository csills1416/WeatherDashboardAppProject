const apiKey = '11af795699dc87d9506f101730b7ae93EY'; // Replace with your actual OpenWeatherMap API key
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
  const geocodingApiKey = '11af795699dc87d9506f101730b7ae93'; // Replace with your actual geocoding API key
  const geocodingUrl = `https://api.geocoding-service.com/geocode?address=${encodeURIComponent(city)}&key=${11af795699dc87d9506f101730b7ae93}`;

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
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${11af795699dc87d9506f101730b7ae93}`;

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

}

function updateForecastInfo(weatherData) {

}

function saveToSearchHistory(city) {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  if (searchHistory === null) {
    searchHistory = [];
  }
  searchHistory.push(city);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function displaySearchHistory() {
 
}