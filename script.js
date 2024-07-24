async function getWeather(city) {
    let weatherapi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e1fe1363fa13118c0ff98593a9164d42&units=metric`;
    let weather = await fetch(weatherapi);
    let res = await weather.json();
    return res;
}

async function callWeather() {
    const userName = document.getElementById("input-box").value;
    if (userName.trim() === "") {
        alert("Please enter a city name.");
        return;
    }
    getWeather(userName)
    .then(data => {
        if (data.cod === 200) {
            var weatherDisplay = document.getElementById('weatherDisplay');
            var weatherHtml = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            weatherDisplay.innerHTML = weatherHtml;
        } else {
            alert('City not found. Please enter a valid city name.');
        }
    }).catch(err => {
        console.log(err);
        alert('Error fetching the weather data.');
    });
}
