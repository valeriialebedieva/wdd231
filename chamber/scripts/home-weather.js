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
        
        const tempC = Math.round(data.main.temp);
        const highC = Math.round(data.main.temp_max);
        const lowC = Math.round(data.main.temp_min);
       
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        currentWeatherContent.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.7em;">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                     alt="${data.weather[0].description}" 
                     style="width: 48px; height: 48px;">
                <div>
                    <strong>${tempC}°C</strong><br>
                    ${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}<br>
                    High: ${highC}°<br>
                    Low: ${lowC}°<br>
                    Humidity: ${data.main.humidity}%<br>
                    Sunrise: ${sunrise}<br>
                    Sunset: ${sunset}
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
                <li>${date.toLocaleDateString('en-US', { weekday: 'long' })}: <strong>${Math.round(forecast.main.temp)}°C</strong></li>
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