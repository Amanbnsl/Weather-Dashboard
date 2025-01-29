// script.js
const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather');
const weatherInfo = document.getElementById('weather-info');
const temperatureDisplay = document.getElementById('temperature');
const conditionDisplay = document.getElementById('condition');
const humidityDisplay = document.getElementById('humidity');
const weatherIcon = document.getElementById('weather-icon');

const apiKey = 'a0aeae1280812cfa59b788e86d86c9f6';

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city.trim() !== "") {
        getWeatherData(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            console.error("Error fetching weather data:", data.message);
            weatherInfo.innerHTML = "<p>City not found or error fetching data. Please try again.</p>";
            weatherIcon.src = "";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML = "<p>An error occurred. Please try again later.</p>";
        weatherIcon.src = "";
    }
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const condition = data.weather[0].description;
    const humidity = data.main.humidity;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    temperatureDisplay.textContent = `Temperature: ${temperature}°C`;
    conditionDisplay.textContent = `Condition: ${condition}`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = condition;

    weatherInfo.style.display = "block";
}