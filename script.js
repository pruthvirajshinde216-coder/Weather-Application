async function getWeatherData() {
    const cityName = document.querySelector("#cityInput").value.trim();
    const result = document.querySelector("#dataResult");

    if (cityName === "") {
        result.innerHTML = `<p class="text-danger">Please enter a city name.</p>`;
        return;
    }

    const apiKey = "20dfdbce028d4252a41153357261906";

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
        );

        const data = await response.json();

        result.innerHTML = `
            <h3>${data.location.name}, ${data.location.country}</h3>
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p><b>🌡️ Temperature:</b> ${data.current.temp_c}°C</p>
            <p><b>☁️ Condition:</b> ${data.current.condition.text}</p>
            <p><b>💧 Humidity:</b> ${data.current.humidity}%</p>
            
        `;
    } catch (error) {
        result.innerHTML = `<p class="text-danger">Unable to fetch weather data.</p>`;
        console.error(error);
    }
}

function renderData(data) {
    const result = document.querySelector("#dataResult");

    if (data.cod !== 200) {
        result.innerHTML = `
            <p class="text-danger fw-bold mt-3">
                City not found. Please try again.
            </p>
        `;
        return;
    }

    result.innerHTML = `
        <div class="text-center">
            <h3>${data.name} (<i>${data.sys.country}</i>)</h3>

            <img
                src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                alt="${data.weather[0].description}"
            >

            <p><b>🌡️ Temperature:</b> ${data.main.temp}°C</p>

            <p>
                <b>☁️ ${data.weather[0].main}</b> :
                ${data.weather[0].description}
            </p>

            <p><b>💧 Humidity:</b> ${data.main.humidity}%</p>

            <p><b>🌬️ Wind Speed:</b> ${data.wind.speed} m/s</p>

            <p><b>🤗 Feels Like:</b> ${data.main.feels_like}°C</p>
        </div>
    `;
}

// Search when Enter key is pressed
document.querySelector("#cityInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeatherData();
    }
});