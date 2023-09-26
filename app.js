const apiKey = "2718fcf9bd8838aeb76b3339e551a3b1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(location) {
    // try {
        const response = await fetch(apiUrl + location + `&appid=${apiKey}`);
        // if (!response.ok) {
            // throw new Error("Network response was not ok");
        // }
        const data = await response.json();
        console.log(data);
        document.querySelector(".location").textContent = data.name;
        document.querySelector(".current-temperature").textContent =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").textContent =
            Math.round(data.wind.speed) + " km/h";
        document.querySelector(".pressure").textContent =
            data.main.pressure + " hPa";

    // } catch (error) {
        // console.error("Error fetching weather data:", error);
    // }
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloudy.svg"
        }
        else if(data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "images/lightning.svg"
        }
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/partly-cloudy.svg"
        }
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rainy.svg"
        }
        else if(data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snowing.svg"
        }
        else if(data.weather[0].main == "Mist" || "Smoke" || "Haze" || "Dust" || "Fog" || "Sand" || "Ash" || "Squall" || "Tornado") {
            weatherIcon.src = "images/windy-cloudy.svg"
        }
        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/sunny.svg"
        }
        
    }

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
