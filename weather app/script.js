const apiKey = "f8ac8a9da7f042fb9ec153501262304";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

async function checkWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();

        document.getElementById("cityName").innerHTML = data.location.name;
        document.getElementById("temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.getElementById("description").innerHTML = data.current.condition.text;
        document.getElementById("humidity").innerHTML = data.current.humidity + "%";
        document.getElementById("wind").innerHTML = data.current.wind_kph + " km/h";

        weatherResult.style.display = "block";
    } catch (error) {
        alert("Enter a valid city name!");
    }
}

searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});

// Allow "Enter" key to trigger search
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
});