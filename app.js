
const apiKey = "2718fcf9bd8838aeb76b3339e551a3b1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&";
const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherIconUrl = "https://openweathermap.org/img/wn/"


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
        const forecastData = await forecast.json();
        console.log(forecastData);
        //filtering data so it contains objects including "15:00:00" and "03:00:00" strings
        const filteredData = forecastData.list.filter(day => {
        const dtTxt = day.dt_txt;
        return dtTxt.includes("15:00:00") || dtTxt.includes("03:00:00");
        });
          
        console.log(filteredData);

        const currentDate = new Date().toISOString().split('T')[0];

        // Filter the data to exclude items with today's date
        const filteredDataExcludingToday = filteredData.filter(day => {
        const dtDate = day.dt_txt.split(' ')[0]; // Extract the date part
        return dtDate !== currentDate;
        });

        console.log(filteredDataExcludingToday);

        // current data
        document.querySelector(".location").textContent = data.name;
        document.querySelector(".current-temperature").textContent =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").textContent =
            Math.round(data.wind.speed) + " km/h";
        document.querySelector(".feels-like").textContent =
            Math.round(data.main.feels_like) + "°C";

        const currentIcon = data.weather[0].icon;
        console.log(currentIcon);
        let showCurrentIcon = (weatherIconUrl + `${currentIcon}` + "@2x.png");
        console.log(showCurrentIcon);
        document.querySelector(".weather-icon").src = showCurrentIcon;    

        // forecasted data
        document.querySelector(".day1").textContent = forecastData.list[0].dt_txt.split(" ")[0];
        document.querySelector(".day2").textContent = filteredDataExcludingToday[0].dt_txt.split(" ")[0];
        document.querySelector(".day3").textContent = filteredDataExcludingToday[2].dt_txt.split(" ")[0];
        document.querySelector(".day4").textContent = filteredDataExcludingToday[4].dt_txt.split(" ")[0];
        document.querySelector(".day5").textContent = filteredDataExcludingToday[6].dt_txt.split(" ")[0];

        document.querySelector(".max1").textContent = "Max " + Math.round(data.main.temp_max) + "°C";
        document.querySelector(".max2").textContent = "Max " + Math.round(filteredDataExcludingToday[1].main.temp) + "°C";
        document.querySelector(".max3").textContent = "Max " + Math.round(filteredDataExcludingToday[3].main.temp) + "°C";
        document.querySelector(".max4").textContent = "Max " + Math.round(filteredDataExcludingToday[5].main.temp) + "°C";
        document.querySelector(".max5").textContent = "Max " + Math.round(filteredDataExcludingToday[7].main.temp) + "°C";

        document.querySelector(".min1").textContent = "Min " + Math.round(data.main.temp_min) + "°C";
        document.querySelector(".min2").textContent = "Min " + Math.round(filteredDataExcludingToday[0].main.temp) + "°C";
        document.querySelector(".min3").textContent = "Min " + Math.round(filteredDataExcludingToday[2].main.temp) + "°C";
        document.querySelector(".min4").textContent = "Min " + Math.round(filteredDataExcludingToday[4].main.temp) + "°C";
        document.querySelector(".min5").textContent = "Min " + Math.round(filteredDataExcludingToday[6].main.temp) + "°C";

        
        const ikona = data.weather[0].icon;
        console.log(ikona);
        let ikonaUrl = (weatherIconUrl + `${ikona}` + "@2x.png");
        console.log(ikonaUrl);
        document.querySelector(".myImg1").src = ikonaUrl;

        const ikona2 = filteredDataExcludingToday[1].weather[0].icon;
        console.log(ikona2);
        let ikonaUrl2 = (weatherIconUrl + `${ikona2}` + "@2x.png");
        console.log(ikonaUrl2);
        document.querySelector(".myImg2").src = ikonaUrl2;

        const ikona3 = filteredDataExcludingToday[3].weather[0].icon;
        console.log(ikona3);
        let ikonaUrl3 = (weatherIconUrl + `${ikona3}` + "@2x.png");
        console.log(ikonaUrl3);
        document.querySelector(".myImg3").src = ikonaUrl3;

        const ikona4 = filteredDataExcludingToday[5].weather[0].icon;
        console.log(ikona4);
        let ikonaUrl4 = (weatherIconUrl + `${ikona4}` + "@2x.png");
        console.log(ikonaUrl4);
        document.querySelector(".myImg4").src = ikonaUrl4;

        const ikona5 = filteredDataExcludingToday[7].weather[0].icon;
        console.log(ikona5);
        let ikonaUrl5 = (weatherIconUrl + `${ikona5}` + "@2x.png");
        console.log(ikonaUrl5);
        document.querySelector(".myImg5").src = ikonaUrl5;

        
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


