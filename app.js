const apiKey = "2718fcf9bd8838aeb76b3339e551a3b1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");

async function checkWeather(location) {
    try {
        const response = await fetch(apiUrl + location + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        document.querySelector(".location").textContent = data.name;
        document.querySelector(".current-temperature").textContent =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").textContent =
            Math.round(data.wind.speed) + " km/h";
        document.querySelector(".pressure").textContent =
            data.main.pressure + " hPa";
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
