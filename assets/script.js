const apiKey = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const cityForm = document.getElementById('city');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecastInfo = document.getElementById('forecast-info');

cityForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = cityInput.ariaValueMax.trim();
    if (city !== '') {
        GeolocationCoordinates(city);
        cityInput.value - '';
    }
});

function getCoordinates(city) {
    const geocodingApiKey = ''; 
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