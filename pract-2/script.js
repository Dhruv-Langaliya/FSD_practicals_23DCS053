const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherDisplay = document.getElementById('weather-display');

// **IMPORTANT: Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key.**
// For a real application, consider using a backend proxy to hide your API key.
const API_KEY = 'e73dd852d6664c99a301188c90b6850c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.toLowerCase().trim();

    if (city === "") {
        weatherDisplay.innerHTML = '<p class="message">Please enter a city.</p>';
        return;
    }

    weatherDisplay.innerHTML = '<p>Fetching weather data...</p>'; // Loading message

    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`); // &units=metric for Celsius

        if (!response.ok) {
            // Handle HTTP errors (e.g., 404 Not Found, 401 Unauthorized)
            const errorData = await response.json();
            if (response.status === 404) {
                weatherDisplay.innerHTML = `<p class="message">City "${city.charAt(0).toUpperCase() + city.slice(1)}" not found.</p>`;
            } else if (response.status === 401) {
                weatherDisplay.innerHTML = `<p class="message">Authentication error. Please check your API key.</p>`;
            } else {
                weatherDisplay.innerHTML = `<p class="message">Error: ${errorData.message || 'Something went wrong.'}</p>`;
            }
            return;
        }

        const data = await response.json();

        const cityName = data.name;
        const temperature = `${Math.round(data.main.temp)}°C`;
        const condition = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        const feelsLike = `${Math.round(data.main.feels_like)}°C`;
        const humidity = `${data.main.humidity}%`;
        const windSpeed = `${data.wind.speed} m/s`;

        weatherDisplay.innerHTML = `
            <p><span class="city-name">${cityName}</span></p>
            <p class="temperature">${temperature}</p>
            <p>${condition}</p>
            <p>Feels like: ${feelsLike}</p>
            <p>Humidity: ${humidity}</p>
            <p>Wind Speed: ${windSpeed}</p>
        `;

    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherDisplay.innerHTML = '<p class="message">Could not fetch weather data. Please try again later.</p>';
    }
});