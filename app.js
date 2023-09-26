const apiKey = "2718fcf9bd8838aeb76b3339e551a3b1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");

async function checkWeather(){
    const response = await fetch(apiUrl + "Wroclaw" + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".location").innerHTML = data.name;
    document.querySelector(".current-temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
}

checkWeather();
// searchBtn.addEventListener("click", ()=>{
//     checkWeather(searchBox.value);
// })
