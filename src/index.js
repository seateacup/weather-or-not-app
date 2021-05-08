//DISPLAY CURRENT DATE//

function formatDate() {
    let now = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[now.getDay()];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let month = months[now.getMonth()];
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    
    let dateDisplay = document.querySelector("h2");
    if (minute < 10) {
        minute = `0${minute}`;
    }
    if (hour >= 13 && hour <= 24) {
        dateDisplay.innerHTML = `${day}, ${month} ${date}, ${hour - 12}:${minute} p.m.`
    } else {
        dateDisplay.innerHTML = `${day}, ${month} ${date}, ${hour}:${minute} a.m.`
    }

    if (hour === 0) {
        hour = "12"
    }
}

formatDate();

//SEARCH BUTTON FUNCTIONS//
//search city//

function updateTemperature(response) {
    let temp = Math.round(response.data.main.temp);
    let h1Element = document.querySelector("#current-header");
    let searchLocation = response.data.name;
    h1Element.innerHTML = `Currently ${temp}°F in ${searchLocation}`;
    let feelsLike = Math.round(response.data.main.feels_like);
    let feelsUpdate = document.querySelector("#feels-temp");
    feelsUpdate.innerHTML = `${feelsLike}°F`
    let maxTemp = Math.round(response.data.main.temp_max);
    let maxUpdate = document.querySelector("#temp-high");
    maxUpdate.innerHTML = `${maxTemp}°F`
    let windSpeed = Math.round(response.data.wind.speed);
    let updateWind = document.querySelector("#wind-speed");
    updateWind.innerHTML = `${windSpeed} MPH`
    let humidity = response.data.main.humidity;
    let updateHumidity = document.querySelector("#humidity");
    updateHumidity.innerHTML = `${humidity}%`
}

function updateLocation(event) {
    event.preventDefault();
    let apiKey = "7cfa0d2aaa29695fdee2ebd04a28582f";
    let cityInput = document.querySelector("#city-input")
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateTemperature);
}

let searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", updateLocation);



//current location//

function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let h1 = document.querySelector("#current-header");
    let yourLocation = response.data.name
    h1.innerHTML = `Currently ${temperature}°F in ${yourLocation}`
    let feelsLike = Math.round(response.data.main.feels_like);
    let feelsUpdate = document.querySelector("#feels-temp");
    feelsUpdate.innerHTML = `${feelsLike}°F`
    let maxTemp = Math.round(response.data.main.temp_max);
    let maxUpdate = document.querySelector("#temp-high");
    maxUpdate.innerHTML = `${maxTemp}°F`
    let windSpeed = Math.round(response.data.wind.speed);
    let updateWind = document.querySelector("#wind-speed");
    updateWind.innerHTML = `${windSpeed} MPH`
    let humidity = response.data.main.humidity;
    let updateHumidity = document.querySelector("#humidity");
    updateHumidity.innerHTML = `${humidity}%`
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "7cfa0d2aaa29695fdee2ebd04a28582f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showTemperature);
}

let currentBtn = document.querySelector("#current-button");
currentBtn.addEventListener("click", navigator.geolocation.getCurrentPosition(showPosition));


//CONVERSION BAR//

function fToC(event) {
    event.preventDefault();
    let temperatureInput = document.querySelector("#temp-input");
    let newTemp = document.querySelector("#converted-temp");
    temperatureInput.Math = (temperatureInput.value - 32) * 5 / 9;
    temperatureInput.Math = Math.round(temperatureInput.Math);
    newTemp.innerHTML = `${temperatureInput.Math}°C`
}

function cToF(event) {
    event.preventDefault();
    let temperatureInput = document.querySelector("#temp-input");
    let newTemp = document.querySelector("#converted-temp");
    temperatureInput.Math = temperatureInput.value * 9 / 5 + 32;
    temperatureInput.Math = Math.round(temperatureInput.Math);
    newTemp.innerHTML = `${temperatureInput.Math}°F`
}

let toC = document.querySelector("#celsius-button");
toC.addEventListener("click", fToC);

let toF = document.querySelector("#farenheit-button");
toF.addEventListener("click", cToF);