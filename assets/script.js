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

