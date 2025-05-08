const API_KEY = '49116dce405efac5bc1ec11e21a87b64'; 
const CITY = 'Stockholm';
const COUNTRY_CODE = 'SE';

const currentWeatherContent = document.getElementById('current-weather-content');
const forecastContent = document.getElementById('forecast-content');

async function getCurrentWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        
        currentWeatherContent.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.7em;">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                     alt="${data.weather[0].description}" 
                     style="width: 48px; height: 48px;">
                <div>
                    <strong>${Math.round(data.main.temp)}°C</strong><br>
                    ${data.weather[0].description}<br>
                    Humidity: ${data.main.humidity}%<br>
                    Wind: ${Math.round(data.wind.speed)} m/s
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        currentWeatherContent.innerHTML = `
            <div class="weather-error">
                <p>Weather data unavailable</p>
                <p class="error-details">Please try again later</p>
            </div>
        `;
    }
}

// Fetch 3-day forecast
async function getForecast() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY_CODE}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Forecast data not available');
        }
        
        const data = await response.json();
        
        const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);
        
        const forecastHTML = dailyForecasts.map(forecast => {
            const date = new Date(forecast.dt * 1000);
            return `
                <li>${date.toLocaleDateString('en-US', { weekday: 'short' })}: <strong>${Math.round(forecast.main.temp)}°C</strong> ${forecast.weather[0].description}</li>
            `;
        }).join('');
        
        forecastContent.innerHTML = `
            <ul class="forecast-list">
                ${forecastHTML}
            </ul>
        `;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        forecastContent.innerHTML = `
            <div class="forecast-error">
                <p>Forecast data unavailable</p>
                <p class="error-details">Please try again later</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getCurrentWeather();
    getForecast();
}); 