// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', fetchWeatherByCity);

// Event listener for the location button
document.getElementById('location-btn').addEventListener('click', fetchWeatherByLocation);

// Function to fetch weather by city name
function fetchWeatherByCity() {
    const city = document.getElementById('city-input').value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    const apiKey = '515c7441a46bd28034736c5f552cc8dd'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
}

// Function to fetch weather by user's current location
function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const apiKey = '515c7441a46bd28034736c5f552cc8dd'; // Replace with your OpenWeatherMap API key
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchWeather(url);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Function to fetch weather data from the API
function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeatherData(data);
            } else {
                alert('City not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data.');
        });
}

// Function to update the weather data on the page
function updateWeatherData(data) {
    // Update city name and date/time
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    const date = new Date();
    document.getElementById('current-date').textContent = date.toLocaleString();

    // Update weather icon
    const iconCode = data.weather[0].icon;
    document.getElementById('main-icon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('main-icon').alt = data.weather[0].description;

    // Update temperature and condition
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('condition').textContent = data.weather[0].description;

    // Update wind speed and humidity
    document.getElementById('wind-speed').textContent = `${data.wind.speed} km/h`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
}
