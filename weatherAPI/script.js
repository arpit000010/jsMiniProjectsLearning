document.addEventListener("DOMContentLoaded", () =>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info"); 
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "4b717c76f5f411919f74f8f037937d08";


    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) {
            // errorMessage.textContent = "Please enter a city name."; 
            return;
        }

        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch(error){
            showError();
        }

        

    });

    async function fetchWeatherData(city){
        // get the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response =await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data){
        // display the data
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;



        // Unlock the display from hidden
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");

    }

    function showError() {
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
  }


});