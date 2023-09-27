
const apiKey = "2718fcf9bd8838aeb76b3339e551a3b1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&";
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
        const lat = data.coord.lat;
        console.log(lat);
        const lon = data.coord.lon;
        console.log(lon);
        const cityName = data.name;
        console.log(cityName);

        const forecast = await fetch(forecastApiUrl + `lat=${lat}` + `&lon=${lon}` + `&appid=${apiKey}`);
        const forecastdata = await forecast.json();
        console.log(forecastdata);

        // current data
        document.querySelector(".location").textContent = data.name;
        document.querySelector(".current-temperature").textContent =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").textContent =
            Math.round(data.wind.speed) + " km/h";
        document.querySelector(".feels-like").textContent =
            Math.round(data.main.feels_like) + "°C";

        // forecasted data
        document.querySelector(".day1").textContent = forecastdata.list[5].dt_txt.split(" ")[0];
        document.querySelector(".day2").textContent = forecastdata.list[13].dt_txt.split(" ")[0];
        document.querySelector(".day3").textContent = forecastdata.list[21].dt_txt.split(" ")[0];
        document.querySelector(".day4").textContent = forecastdata.list[29].dt_txt.split(" ")[0];
        document.querySelector(".day5").textContent = forecastdata.list[37].dt_txt.split(" ")[0];

        document.querySelector(".max1").textContent = Math.round(forecastdata.list[5].main.temp_min) + "°C";
        document.querySelector(".max2").textContent = Math.round(forecastdata.list[13].main.temp_min) + "°C";
        document.querySelector(".max3").textContent = Math.round(forecastdata.list[21].main.temp_min) + "°C";
        document.querySelector(".max4").textContent = Math.round(forecastdata.list[29].main.temp_min) + "°C";
        document.querySelector(".max5").textContent = Math.round(forecastdata.list[37].main.temp_min) + "°C";

        document.querySelector(".min1").textContent = Math.round(forecastdata.list[2].main.temp_max) + "°C";
        document.querySelector(".min2").textContent = Math.round(forecastdata.list[10].main.temp_max) + "°C";
        document.querySelector(".min3").textContent = Math.round(forecastdata.list[18].main.temp_max) + "°C";
        document.querySelector(".min4").textContent = Math.round(forecastdata.list[26].main.temp_max) + "°C";
        document.querySelector(".min5").textContent = Math.round(forecastdata.list[34].main.temp_max) + "°C";

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


