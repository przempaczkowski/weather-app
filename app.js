
const apiKey = "2718fcf9bd8838aeb76b3339e551a3b1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(location) {
    
        const response = await fetch(apiUrl + location + `&appid=${apiKey}`);
        if (response.status == '404') {
            alert("City not found, try again. English letters only. You can try to use country code, for example: London, US");
        }
        console.log(response);
        const data = await response.json();
        console.log(data);
        document.querySelector(".location").textContent = data.name;
        document.querySelector(".current-temperature").textContent =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").textContent =
            Math.round(data.wind.speed) + " km/h";
        document.querySelector(".pressure").textContent =
            data.main.pressure + " hPa";

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

        
    document.querySelector(".weather").style.display = "block";

        
    }        

searchBox.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


