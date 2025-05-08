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
        // Convert Celsius to Fahrenheit
        const tempF = Math.round((data.main.temp * 9/5) + 32);
        const highF = Math.round((data.main.temp_max * 9/5) + 32);
        const lowF = Math.round((data.main.temp_min * 9/5) + 32);
        // Format sunrise/sunset
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        currentWeatherContent.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.7em;">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                     alt="${data.weather[0].description}" 
                     style="width: 48px; height: 48px;">
                <div>
                    <strong>${tempF}°F</strong><br>
                    ${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}<br>
                    High: ${highF}°<br>
                    Low: ${lowF}°<br>
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