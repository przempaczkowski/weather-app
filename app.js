const apiKey = "2718fcf9bd8838aeb76b3339e551a3b1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&";
const searchBox = document.querySelector("#search-input");
const searchBtn = document.querySelector(".search-button");
const locationBtn = document.querySelector(".location-button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherIconUrl = "https://openweathermap.org/img/wn/";
const sotd = document.querySelector(".sotd");

const geoapifyApiKey = "28d1b2009ddf40e58e6798b795316b2d";

function clearFragranceSuggestions() {
  // Check if the sotd element exists
  if (sotd) {
    sotd.innerHTML = ""; // Clear the contents
  }
}
let autocomplete;
// const options = {
//   fields: ['name'],
// };
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-input'));
  

  // Listen for the 'place_changed' event when the user selects a place
  autocomplete.addListener('place_changed', getPlaceDetails);
}

function getPlaceDetails() {
  const place = autocomplete.getPlace(); // Get the selected place
  console.log(place);
  if (!place.geometry) {
    console.error('Place details are not available for this location.');
    return;
  }

  // Extract latitude and longitude from the place object
  const selectedLoLatitude = place.geometry.viewport.mb.lo;
  const selectedHiLatitude = place.geometry.viewport.mb.hi;
  const selectedLoLongitude = place.geometry.viewport.Oa.lo;
  const selectedHiLongitude = place.geometry.viewport.Oa.hi;

  const selectedLatitude = (selectedLoLatitude + selectedHiLatitude) / 2;
  const selectedLongitude = (selectedLoLongitude + selectedHiLongitude) / 2;

  
  console.log('Selected Place:', place.name);
  console.log('Latitude:', selectedLatitude);
  console.log('Longitude:', selectedLongitude);

  const googlePlaceName = place.name;
  

  checkWeather(selectedLatitude, selectedLongitude, googlePlaceName);
  clearFragranceSuggestions();

  
}


// Define your API key
const apiKeyAutocomplete = 'AIzaSyBlwPgpjG1lbPtNNOBGQIhtHrR6wdklKOo';

// Create a script element to load the Google Maps API
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeyAutocomplete}&libraries=places&types=cities&callback=initAutocomplete`;
script.async = true;

// Append the script element to the document's body
document.body.appendChild(script);





// searchBox.addEventListener("keyup", function(event) {
//   autocomplete(event.target.value);
// });

// async function autocomplete(input) {
//   const apiKey = "28d1b2009ddf40e58e6798b795316b2d";
//   const apiUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${apiKey}`;

//   const response = await fetch(apiUrl);
//   const data = await response.json();
//   // console.log(data);
//   const dataList = document.querySelector("#cities");
//   dataList.innerHTML = ""; // Clear the current list

//   // Add each suggestion to the datalist
//   data.features.forEach((item) => {
//     const option = document.createElement("option");
//     const cityName = item.properties.city;
//     const cityLat = item.properties.lat;
//     console.log(cityLat);
//     const cityLon = item.properties;
//     console.log(cityLon);
//     const countryName = item.properties.country;
//     const stateCode = item.properties.state;
//     let optionValue = `${cityName}, ${stateCode}, ${countryName}`;
  
      
//     option.value = optionValue;
//     option.dataset.lat = item.geometry.coordinates[1];
//     option.dataset.lon = item.geometry.coordinates[0];
//     dataList.appendChild(option);
//   });
// }



// function showSuggestions(suggestions) {
//   const dataList = document.querySelector('#cities');
//   dataList.innerHTML = ''; // Clear the previous options

//   suggestions.forEach((suggestion) => {
//     const option = document.createElement('option');
//     option.value = suggestion.properties.formatted;
//     option.addEventListener('click', async () => {
//       const lat = suggestion.properties.lat;
//       const lon = suggestion.properties.lon;
//       await checkWeather(lat, lon);
//       console.log(lat, lon);
//     });
//     dataList.appendChild(option);
//   });
// }
// document.querySelector("#cities").addEventListener("click", function (event) {
//   const selectedOption = event.target;
//   if (selectedOption && selectedOption.value) {
//     const lat = selectedOption.dataset.lat;
//     const lon = selectedOption.dataset.lon;
//     checkWeather(lat, lon);
//   }
// });

locationBtn.addEventListener("click", async function () {
  clearFragranceSuggestions();
    navigator.geolocation.getCurrentPosition(async function locationWeather(location) {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        console.log(latitude, longitude);

        const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
        console.log(reverseGeocodingUrl);

        const result = await fetch(reverseGeocodingUrl);
        const reverseGeocodingData = await result.json();
        console.log(reverseGeocodingData);

        const city = reverseGeocodingData[0].name;
        console.log(city);


        const getCountry = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        console.log(getCountry);

        const resultat = await fetch(getCountry);
        const getCountryCode = await resultat.json();
        console.log(getCountryCode);

        const locationName = (getCountryCode.name);
        console.log(locationName);
        
        
        const countryCode = (getCountryCode.sys.country);
        console.log(countryCode);

        checkWeather(latitude, longitude);
    });
});


async function checkWeather(latitude, longitude, googlePlaceName) {
  const response = await fetch(`${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
  if (response.status === 404) {
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

  const forecast = await fetch(`${forecastApiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`);
  const forecastData = await forecast.json();
  console.log(forecastData);


  // Filter data to include objects with "15:00:00" and "03:00:00" strings
  const filteredData = forecastData.list.filter(day => {
    const dtTxt = day.dt_txt;
    return dtTxt.includes("15:00:00") || dtTxt.includes("03:00:00");
  });

  console.log(filteredData);

  const currentDate = new Date().toISOString().split('T')[0];

  // Filter data to exclude items with today's date
  const filteredDataExcludingToday = filteredData.filter(day => {
    const dtDate = day.dt_txt.split(' ')[0]; // Extract the date part
    return dtDate !== currentDate;
  });

  

  console.log(filteredDataExcludingToday);

  // Current data
  document.querySelector(".location").textContent = googlePlaceName;
  const currentTemp = document.querySelector(".current-temperature");
  currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
  console.log(currentTemp);
  document.querySelector(".wind").textContent = `${Math.round(data.wind.speed)} km/h`;
  document.querySelector(".feels-like").textContent = `${Math.round(data.main.feels_like)}°C`;

  const currentIcon = data.weather[0].icon;
  console.log(currentIcon);
  let showCurrentIcon = `${weatherIconUrl}${currentIcon}@2x.png`;
  console.log(showCurrentIcon);
  document.querySelector(".weather-icon").src = showCurrentIcon;

  const currentTempElement = document.querySelector(".current-temperature");

  fetch('./data.json')
      .then((response) => response.json())
      .then((fragrances) => {
          const currentTemp = parseFloat(currentTempElement.textContent);
          
          // Filter the fragrances that have "fall" in the "season" array
          const fallFragrances = fragrances.filter(fragrance => fragrance.season.includes("Fall"));
  
          // Check if there are any fragrances that match the condition
          if (currentTemp > 0 && currentTemp < 20 && fallFragrances.length > 0) {
              // Randomly choose one fragrance
              const randomIndex = Math.floor(Math.random() * fallFragrances.length);
              const selectedFragrance = fallFragrances[randomIndex];
              const selectedFragranceName = selectedFragrance.name;
              const selectedFragranceSimilar = selectedFragrance.similar.join(' or ');
              console.log("Suggested SOTD: ", selectedFragranceName);
              console.log("Alternatives :", selectedFragranceSimilar);

              const suggestedSotd = document.createElement('h5');
              suggestedSotd.innerHTML = `Suggested SOTD: ${selectedFragranceName}`;
              sotd.appendChild(suggestedSotd);

              const suggestedAlternatives = document.createElement('h6');
              suggestedAlternatives.innerHTML = `Alternatives: ${selectedFragranceSimilar}`;
              sotd.appendChild(suggestedAlternatives);
          } else {
              const suggestedSotd = document.createElement('h5');
              suggestedSotd.innerHTML = "No fragrances with 'Fall' season found.";
              sotd.appendChild(suggestedSotd);
          }
            
      });
  
  


  // Forecasted data
//   document.querySelector(".day1").textContent = forecastData.list[0].dt_txt.split(" ")[0];
  document.querySelector(".day2").textContent = filteredDataExcludingToday[0].dt_txt.split(" ")[0];
  document.querySelector(".day3").textContent = filteredDataExcludingToday[2].dt_txt.split(" ")[0];
  document.querySelector(".day4").textContent = filteredDataExcludingToday[4].dt_txt.split(" ")[0];
  document.querySelector(".day5").textContent = filteredDataExcludingToday[6].dt_txt.split(" ")[0];

  document.querySelector(".max1").textContent = `Max ${Math.round(data.main.temp_max)}°C`;
  document.querySelector(".max2").textContent = `Max ${Math.round(filteredDataExcludingToday[1].main.temp)}°C`;
  document.querySelector(".max3").textContent = `Max ${Math.round(filteredDataExcludingToday[3].main.temp)}°C`;
  document.querySelector(".max4").textContent = `Max ${Math.round(filteredDataExcludingToday[5].main.temp)}°C`;
  document.querySelector(".max5").textContent = `Max ${Math.round(filteredDataExcludingToday[7].main.temp)}°C`;

  document.querySelector(".min1").textContent = `Min ${Math.round(data.main.temp_min)}°C`;
  document.querySelector(".min2").textContent = `Min ${Math.round(filteredDataExcludingToday[0].main.temp)}°C`;
  document.querySelector(".min3").textContent = `Min ${Math.round(filteredDataExcludingToday[2].main.temp)}°C`;
  document.querySelector(".min4").textContent = `Min ${Math.round(filteredDataExcludingToday[4].main.temp)}°C`;
  document.querySelector(".min5").textContent = `Min ${Math.round(filteredDataExcludingToday[6].main.temp)}°C`;

  const ikona = data.weather[0].icon;
  console.log(ikona);
  let ikonaUrl = `${weatherIconUrl}${ikona}@2x.png`;
  console.log(ikonaUrl);
  document.querySelector(".myImg1").src = ikonaUrl;

  const ikona2 = filteredDataExcludingToday[1].weather[0].icon;
  console.log(ikona2);
  let ikonaUrl2 = `${weatherIconUrl}${ikona2}@2x.png`;
  console.log(ikonaUrl2);
  document.querySelector(".myImg2").src = ikonaUrl2;

  const ikona3 = filteredDataExcludingToday[3].weather[0].icon;
  console.log(ikona3);
  let ikonaUrl3 = `${weatherIconUrl}${ikona3}@2x.png`;
  console.log(ikonaUrl3);
  document.querySelector(".myImg3").src = ikonaUrl3;

  const ikona4 = filteredDataExcludingToday[5].weather[0].icon;
  console.log(ikona4);
  let ikonaUrl4 = `${weatherIconUrl}${ikona4}@2x.png`;
  console.log(ikonaUrl4);
  document.querySelector(".myImg4").src = ikonaUrl4;

  const ikona5 = filteredDataExcludingToday[7].weather[0].icon;
  console.log(ikona5);
  let ikonaUrl5 = `${weatherIconUrl}${ikona5}@2x.png`;
  console.log(ikonaUrl5);
  document.querySelector(".myImg5").src = ikonaUrl5;

  document.querySelector(".weather").style.display = "block";
}



// searchBtn.addEventListener("click", () => {
//   clearFragranceSuggestions();
//   const selectedOption = getSelectedOption();
//   checkWeather(selectedOption.dataset.lat, selectedOption.dataset.lon);
// });

// searchBox.addEventListener("click", () => {
//   clearFragranceSuggestions();
//   const selectedOption = getSelectedOption();
//   checkWeather(selectedOption.dataset.lat, selectedOption.dataset.lon);
//   });

// function getSelectedOption() {
//   const inputValue = searchBox.value;
//   const options = document.querySelectorAll("#cities option");
//   return Array.from(options).find(option => option.value === inputValue);
// }

async function checkTypedWeather(location) {
  const response = await fetch(`${apiUrl}` + `q=${location}&appid=${apiKey}`);
  if (response.status === 404) {
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

  const forecast = await fetch(`${forecastApiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`);
  const forecastData = await forecast.json();
  console.log(forecastData);

  // Filter data to include objects with "15:00:00" and "03:00:00" strings
  const filteredData = forecastData.list.filter(day => {
    const dtTxt = day.dt_txt;
    return dtTxt.includes("15:00:00") || dtTxt.includes("03:00:00");
  });

  console.log(filteredData);

  const currentDate = new Date().toISOString().split('T')[0];

  // Filter data to exclude items with today's date
  const filteredDataExcludingToday = filteredData.filter(day => {
    const dtDate = day.dt_txt.split(' ')[0]; // Extract the date part
    return dtDate !== currentDate;
  });

  console.log(filteredDataExcludingToday);

  // Current data
  document.querySelector(".location").textContent = data.name;
  document.querySelector(".current-temperature").textContent = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".wind").textContent = `${Math.round(data.wind.speed)} km/h`;
  document.querySelector(".feels-like").textContent = `${Math.round(data.main.feels_like)}°C`;

  const currentIcon = data.weather[0].icon;
  console.log(currentIcon);
  let showCurrentIcon = `${weatherIconUrl}${currentIcon}@2x.png`;
  console.log(showCurrentIcon);
  document.querySelector(".weather-icon").src = showCurrentIcon;

  const currentTempElement = document.querySelector(".current-temperature");

  fetch('./data.json')
      .then((response) => response.json())
      .then((fragrances) => {
          const currentTemp = parseFloat(currentTempElement.textContent);
          
          // Filter the fragrances that have "fall" in the "season" array
          const fallFragrances = fragrances.filter(fragrance => fragrance.season.includes("Fall"));
  
          // Check if there are any fragrances that match the condition
          if (currentTemp > 0 && currentTemp < 20 && fallFragrances.length > 0) {
              // Randomly choose one fragrance
              const randomIndex = Math.floor(Math.random() * fallFragrances.length);
              const selectedFragrance = fallFragrances[randomIndex];
              const selectedFragranceName = selectedFragrance.name;
              const selectedFragranceSimilar = selectedFragrance.similar.join(' or ');
              console.log("Suggested SOTD: ", selectedFragranceName);
              console.log("Alternatives :", selectedFragranceSimilar);

              const suggestedSotd = document.createElement('h5');
              suggestedSotd.innerHTML = `Suggested SOTD: ${selectedFragranceName}`;
              sotd.appendChild(suggestedSotd);

              const suggestedAlternatives = document.createElement('h6');
              suggestedAlternatives.innerHTML = `Alternatives: ${selectedFragranceSimilar}`;
              sotd.appendChild(suggestedAlternatives);
          } else {
              const suggestedSotd = document.createElement('h5');
              suggestedSotd.innerHTML = "SOTD: No fragrances with 'Winter' season found.";
              sotd.appendChild(suggestedSotd);
          }
            
      });
  
  
  // Forecasted data
  // document.querySelector(".day1").textContent = forecastData.list[0].dt_txt.split(" ")[0];
  document.querySelector(".day2").textContent = filteredDataExcludingToday[0].dt_txt.split(" ")[0];
  document.querySelector(".day3").textContent = filteredDataExcludingToday[2].dt_txt.split(" ")[0];
  document.querySelector(".day4").textContent = filteredDataExcludingToday[4].dt_txt.split(" ")[0];
  document.querySelector(".day5").textContent = filteredDataExcludingToday[6].dt_txt.split(" ")[0];

  document.querySelector(".max1").textContent = `Max ${Math.round(data.main.temp_max)}°C`;
  document.querySelector(".max2").textContent = `Max ${Math.round(filteredDataExcludingToday[1].main.temp)}°C`;
  document.querySelector(".max3").textContent = `Max ${Math.round(filteredDataExcludingToday[3].main.temp)}°C`;
  document.querySelector(".max4").textContent = `Max ${Math.round(filteredDataExcludingToday[5].main.temp)}°C`;
  document.querySelector(".max5").textContent = `Max ${Math.round(filteredDataExcludingToday[7].main.temp)}°C`;

  document.querySelector(".min1").textContent = `Min ${Math.round(data.main.temp_min)}°C`;
  document.querySelector(".min2").textContent = `Min ${Math.round(filteredDataExcludingToday[0].main.temp)}°C`;
  document.querySelector(".min3").textContent = `Min ${Math.round(filteredDataExcludingToday[2].main.temp)}°C`;
  document.querySelector(".min4").textContent = `Min ${Math.round(filteredDataExcludingToday[4].main.temp)}°C`;
  document.querySelector(".min5").textContent = `Min ${Math.round(filteredDataExcludingToday[6].main.temp)}°C`;

  const ikona = data.weather[0].icon;
  console.log(ikona);
  let ikonaUrl = `${weatherIconUrl}${ikona}@2x.png`;
  console.log(ikonaUrl);
  document.querySelector(".myImg1").src = ikonaUrl;

  const ikona2 = filteredDataExcludingToday[1].weather[0].icon;
  console.log(ikona2);
  let ikonaUrl2 = `${weatherIconUrl}${ikona2}@2x.png`;
  console.log(ikonaUrl2);
  document.querySelector(".myImg2").src = ikonaUrl2;

  const ikona3 = filteredDataExcludingToday[3].weather[0].icon;
  console.log(ikona3);
  let ikonaUrl3 = `${weatherIconUrl}${ikona3}@2x.png`;
  console.log(ikonaUrl3);
  document.querySelector(".myImg3").src = ikonaUrl3;

  const ikona4 = filteredDataExcludingToday[5].weather[0].icon;
  console.log(ikona4);
  let ikonaUrl4 = `${weatherIconUrl}${ikona4}@2x.png`;
  console.log(ikonaUrl4);
  document.querySelector(".myImg4").src = ikonaUrl4;

  const ikona5 = filteredDataExcludingToday[7].weather[0].icon;
  console.log(ikona5);
  let ikonaUrl5 = `${weatherIconUrl}${ikona5}@2x.png`;
  console.log(ikonaUrl5);
  document.querySelector(".myImg5").src = ikonaUrl5;

  document.querySelector(".weather").style.display = "block";

  
}

searchBox.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    clearFragranceSuggestions();
    checkTypedWeather(searchBox.value);
  }
});

// searchBox.addEventListener("input", function () {
//   autocomplete(searchBox.value);
// });

searchBtn.addEventListener("click", () => {
  clearFragranceSuggestions();
  checkTypedWeather(searchBox.value);
});
 
